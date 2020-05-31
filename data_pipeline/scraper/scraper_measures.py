import multiprocessing
import os
import re
import shutil
import sys
import time
from multiprocessing.dummy import Pool
from time import sleep

import chromedriver_binary  # Adds chromedriver binary to path
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

from dircreator import DirCreator

# Default website wait time.
DEFAULT_SLEEP_TIME = 5
BALLOT_TYPE = 'Ballot Measure'

SEARCH_FORM_ADDRESS = 'https://www.southtechhosting.com/SanJoseCity/CampaignDocsWebRetrieval/Search/SearchByElection.aspx'
SEARCH_TABLE_ID = 'ctl00_GridContent_gridFilers_DXMainTable'
SEARCH_TABLE_XPATH = '//*[@id="ctl00_GridContent_gridFilers_DXMainTable"]'
SEARCH_TABLE_ROW_ID = 'ctl00_GridContent_gridFilers_DXDataRow'
SEARCH_TABLE_ROW_XPATH_CONTAINS = '//*[contains(@id,"ctl00_GridContent_gridFilers_DXDataRow")]'
SEARCH_BUTTON_ID = 'ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers_CD'
SEARCH_TABLE_BALLOT_TYPE_ID = 'ctl00_GridContent_gridFilers_col8'

FORM_TABLE_ROW_XPATH_CONTAINS = '//*[contains(@id,"ctl00_DefaultContent_gridFilingForms_DXDataRow")]'
FORM_TABLE_ROW_ID = 'ctl00_DefaultContent_gridFilingForms_DXDataRow'

ERROR_DIALOG_BUTTON_ID = 'ctl00_GridContent_popupCantContinueDialog_Button1'
EXCEL_LINK_XPATH = '//td[@class="dxgvCommandColumn_Glass dxgv"]//img[@title="Export Transaction Details To Excel"]'
PAGE_ENTRY_XPATH = '//a[@class="dxbButton_Glass dxgvCommandColumnItem_Glass dxgv__cci dxbButtonSys"]'


class SjcWebsite():
    """This class represents an interface to interact with the elements on the SJC website.

    It abstracts away details like "what CSS class does a specific button have", and implementation details of the
    website, while still requiring users to understand how to navigate around the website.
    """

    def navigateToSearchPage(self, driver):
        driver.get(SEARCH_FORM_ADDRESS)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, SEARCH_BUTTON_ID)))

        # Search, which will load up the content on the page.
        # Search terms are left blank, indicating "all content".
        driver.find_element_by_id(SEARCH_BUTTON_ID).click()
        sleep(DEFAULT_SLEEP_TIME)


    # Use the browser back button.
    def clickBackButton(self, driver):
        driver.execute_script("window.history.go(-1)")
        sleep(3)

    # Finds all the Excel files linked on the page and downloads them.
    # First create dict that handles ammendments, to ensure we're only downloading the latest/most accurate
    def downloadExcel(self, driver):
        numFormTableRows = driver.find_elements_by_xpath(FORM_TABLE_ROW_XPATH_CONTAINS)
        downloadExcelRows = {}
        for i in range(len(numFormTableRows)):
            formTable_FormType = driver.find_elements_by_xpath('//*[@id="{}{}"]/td[1]'.format(FORM_TABLE_ROW_ID,i))[0].text
            formTable_FilingPeriod = driver.find_elements_by_xpath('//*[@id="{}{}"]/td[4]'.format(FORM_TABLE_ROW_ID,i))[0].text
            if '-A' in formTable_FormType:
                formTable_FormType = formTable_FormType[:-2]
            uniqueKeyFormId = '{} ~ {}'.format(formTable_FormType,formTable_FilingPeriod)
            if uniqueKeyFormId in downloadExcelRows:
                downloadExcelRows[uniqueKeyFormId].append(i)
            else:
                downloadExcelRows[uniqueKeyFormId] = [i]

        for key,value in downloadExcelRows.items():
            try:
                downloadLinkElement = driver.find_elements_by_xpath('//*[@id="{}{}"]/td[6]/a'.format(FORM_TABLE_ROW_ID,value[0]))[0]
            except IndexError:
                continue
            else:
                downloadLinkElement.click()

    # Returns a boolean.
    def errorDialogExists(self, driver):
        return driver.find_elements_by_id(ERROR_DIALOG_BUTTON_ID)

    def closeErrorDialog(self, driver):
        driver.find_element_by_id(ERROR_DIALOG_BUTTON_ID).click()
        sleep(DEFAULT_SLEEP_TIME)

    # Navigates to the Nth page of the search results.
    def navigateToPage(self, driver, target_page):
        while not '[{}]'.format(target_page) == driver.find_element_by_class_name('dxp-current').text:
            page_elements = driver.find_elements_by_class_name('dxp-num')

            page_nums = []
            for el in page_elements:
                try:
                    page_nums.append(int(el.text))
                except ValueError:
                    pass
            assert page_nums, 'No page nums found to click.'

            # Click on the page that we can click on closest to our target page.
            closest_page = page_nums[0]
            for page in page_nums:
                if abs(target_page - page) < abs(target_page - closest_page):
                    closest_page = page

            driver.find_element(By.XPATH, "//*[text()='{}']".format(closest_page)).click()
            sleep(3)

    # Determine the number of pages of search results present.
    def numPages(self, driver):
        page_elements = driver.find_elements_by_class_name('dxp-num')
        page_nums = []
        for el in page_elements:
            try:
                page_nums.append(int(el.text))
            except ValueError:
                pass
        return max(page_nums)

    # Determines the number of
    def numberOfEntries(self, driver):
        return len(driver.find_elements_by_xpath(PAGE_ENTRY_XPATH))

    def clickEntryIndex(self, driver, index):
        driver.find_elements_by_xpath(PAGE_ENTRY_XPATH)[index].click()
        sleep(DEFAULT_SLEEP_TIME)

    def numTableEntries(self, driver, search_page_num):
        # Loop through all all items in the search table and retrieve the data
        numTableRows = driver.find_elements_by_xpath(SEARCH_TABLE_ROW_XPATH_CONTAINS)
        followTableRowNums = ((search_page_num - 1 ) * 10)
        numTableRowEntries = []
        for i in range(0 + followTableRowNums, len(numTableRows) + followTableRowNums):
            tableData_BallotType = driver.find_elements_by_xpath('//*[@id="{}{}"]/td[9]'.format(SEARCH_TABLE_ROW_ID,i))[0].text
            tableData_SupportOrOppose = driver.find_elements_by_xpath('//*[@id="{}{}"]/td[8]'.format(SEARCH_TABLE_ROW_ID,i))[0].text
            if tableData_BallotType == BALLOT_TYPE and tableData_SupportOrOppose != 'Oppose':
                numTableRowEntries.append(i)
        print("SEARCH TABLE INDEX: {}".format(numTableRowEntries))
        return numTableRowEntries

class Scraper():
    def __init__(self):
        # create data folder in current directory to store files
        self.website = SjcWebsite()
        new_dir = DirCreator()
        new_dir.createFolder()
        self.path_dir = new_dir.changeDirectory()

        options = webdriver.ChromeOptions()
        # options.headless = True
        options.add_argument("--ignore-certificate-errors")
        options.add_argument("--test_type")
        options.add_argument('--no-sandbox')
        options.add_argument('start-maximized')
        options.add_argument('disable-infobars')
        options.add_argument("--disable-extensions")
        plugs = {"enabled": False, "name": "Chrome PDF Viewer"}
        prefs = {"download.default_directory": self.path_dir + "/{}".format(BALLOT_TYPE.replace(' ','_')),
                 'download.prompt_for_download': False,
                 'download.directory_upgrade': True,
                 'safebrowsing.enabled': False,
                 'safebrowsing.disable_download_protection': True,
                 "plugins.plugins_list": [plugs]}
        options.add_experimental_option("prefs", prefs)
        self.driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)


    def scrape(self):
        # Navigate to https://www.southtechhosting.com/SanJoseCity/CampaignDocsWebRetrieval/Search/SearchByElection.aspx
        self.website.navigateToSearchPage(self.driver)

        for search_page_num in range(1, self.website.numPages(self.driver)+1):
            print("PAGE {}".format(search_page_num))
            # Need to navigate to the page upfront so that when we get the number of entries on the page it is accurate.
            self.website.navigateToPage(self.driver, search_page_num)

            for entry_index in self.website.numTableEntries(self.driver, search_page_num):
                # will result in the website bringing us back to page 1.
                self.website.navigateToPage(self.driver, search_page_num)

                self.website.clickEntryIndex(self.driver, entry_index % 10)

                if self.website.errorDialogExists(self.driver):
                    # If there are no forms for a specific entry, we get an error message.
                    self.website.closeErrorDialog(self.driver)
                else:
                    # If there are forms, then we will be brought to the "forms" page.
                    self.website.downloadExcel(self.driver)
                    self.website.clickBackButton(self.driver)


start_time = time.time()
s = Scraper()
s.scrape()
print("--- Finished ---\n---    In    ---\n--- {} ---".format(time.strftime('%H:%M:%S', time.gmtime(time.time() - start_time))))
