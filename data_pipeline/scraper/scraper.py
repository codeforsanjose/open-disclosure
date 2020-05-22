import os
import re
import sys
import chromedriver_binary  # Adds chromedriver binary to path

import shutil
import time
import multiprocessing
from multiprocessing.dummy import Pool
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from time import sleep
from dircreator import DirCreator

# Default website wait time.
DEFAULT_SLEEP_TIME = 5


class SjcWebsite():
    """This class represents an interface to interact with the elements on the SJC website.

    It abstracts away details like "what CSS class does a specific button have", and implementation details of the
    website, while still requiring users to understand how to navigate around the website.
    """
    def navigateToSearchPage(self, driver):
        driver.get(
        "https://www.southtechhosting.com/SanJoseCity/CampaignDocsWebRetrieval/Search/SearchByElection.aspx")
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, 'ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers_CD')))

        # Search, which will load up the content on the page.
        # Search terms are left blank, indicating "all content".
        driver.find_element_by_xpath('//*[@id="ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers_CD"]').click()
        sleep(DEFAULT_SLEEP_TIME)


    # Use the browser back button.
    def clickBackButton(self, driver):
        driver.execute_script("window.history.go(-1)")
        sleep(DEFAULT_SLEEP_TIME)

    # Finds all the Excel files linked on the page and downloads them.
    def downloadExcel(self, driver):
        excel_files = driver.find_elements_by_xpath(
            '//td[@class="dxgvCommandColumn_Glass dxgv"]//img[@title="Export Transaction Details To Excel"]')
        for excel_file in excel_files:
            excel_file.click()

    # Returns a boolean.
    def errorDialogExists(self, driver):
        return driver.find_elements_by_xpath('//*[@id="ctl00_GridContent_popupCantContinueDialog_Button1"]')

    def closeErrorDialog(self, driver):
        driver.find_elements_by_xpath('//*[@id="ctl00_GridContent_popupCantContinueDialog_Button1"]')[0].click()
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
            sleep(DEFAULT_SLEEP_TIME)

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
        return len(driver.find_elements_by_xpath(
            '//a[@class="dxbButton_Glass dxgvCommandColumnItem_Glass dxgv__cci dxbButtonSys"]'))

    def clickEntryIndex(self, driver, index):
        driver.find_elements_by_xpath(
            '//a[@class="dxbButton_Glass dxgvCommandColumnItem_Glass dxgv__cci dxbButtonSys"]')[index].click()
        sleep(DEFAULT_SLEEP_TIME)

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
        prefs = {"download.default_directory": self.path_dir,
                 'download.prompt_for_download': False,
                 'download.directory_upgrade': True,
                 'safebrowsing.enabled': False,
                 'safebrowsing.disable_download_protection': True,
                 "plugins.plugins_list": [plugs]}
        options.add_experimental_option("prefs", prefs)
        self.driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
        # bypass chromedriver headless security
        # self.driver.command_executor._commands["send_command"] = ("POST", '/session/$sessionId/chromium/send_command')
        # params = {'cmd': 'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': self.path_dir}}
        # self.driver.execute("send_command", params)


    def scrape(self):
        # Navigate to https://www.southtechhosting.com/SanJoseCity/CampaignDocsWebRetrieval/Search/SearchByElection.aspx
        self.website.navigateToSearchPage(self.driver)

        for search_page_num in range(1, self.website.numPages(self.driver)+1):
            # Need to navigate to the page upfront so that when we get the number of entries on the page it is accurate.
            self.website.navigateToPage(self.driver, search_page_num)

            # This code downloads every entry on a search results page.
            for entry_index in range(self.website.numberOfEntries(self.driver)):
                # We have to re-navigate to the correct page every time since sometimes, using the 'back' button
                # will result in the website bringing us back to page 1.
                self.website.navigateToPage(self.driver, search_page_num)
                self.website.clickEntryIndex(self.driver, entry_index)

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
print("--- {} seconds ---".format(time.time() - start_time))
