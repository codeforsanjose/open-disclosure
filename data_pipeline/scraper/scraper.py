import os
import time
from time import sleep

from selenium import webdriver

# Currently un-used
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

# import chromedriver_binary  # Adds chromedriver binary to path
from webdriver_manager.chrome import ChromeDriverManager

# Custom python module
# from data_pipeline.scraper.dircreator import DirCreator
# from data_pipeline.scraper.preproccessing import PreProcessing
from dirmanager import DirManager
from preproccessing import PreProcessing


class SjcWebsite:
    """This class represents an interface to interact with the elements on the SJC website.

    It abstracts away details like "what CSS class does a specific button have", and implementation details of the
    website, while still requiring users to understand how to navigate around the website.
    """

    def __init__(self):
        # Selenium parsing variables
        # Do Not Edit, append only
        self.SEARCH_TABLE_ROW_ID = "ctl00_GridContent_gridFilers_DXDataRow"
        self.SEARCH_TABLE_ROW_XPATH_CONTAINS = (
            '//*[contains(@id,"ctl00_GridContent_gridFilers_DXDataRow")]'
        )
        self.SEARCH_BUTTON_ID = "ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers_CD"
        self.SEARCH_TABLE_INDEX_CLICKABLE_ID = "ctl00_GridContent_gridFilers_DXCBtn0Img"

        self.FORM_TABLE_ROW_XPATH_CONTAINS = (
            '//*[contains(@id,"ctl00_DefaultContent_gridFilingForms_DXDataRow")]'
        )
        self.FORM_TABLE_ROW_ID = "ctl00_DefaultContent_gridFilingForms_DXDataRow"
        self.FORM_TABLE_MAIN_TABLE_ID = (
            "ctl00_DefaultContent_gridFilingForms_DXMainTable"
        )

        self.ERROR_DIALOG_BUTTON_ID = (
            "ctl00_GridContent_popupCantContinueDialog_Button1"
        )
        self.PAGE_ENTRY_XPATH = '//a[@class="dxbButton_Glass dxgvCommandColumnItem_Glass dxgv__cci dxbButtonSys"]'

    def navigateToSearchPage(self, driver, SEARCH_FORM_ADDRESS, election_cycle=None):
        driver.get(SEARCH_FORM_ADDRESS)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, self.SEARCH_BUTTON_ID))
        )

        if election_cycle:
            el = driver.find_element_by_id("ctl00_DefaultContent_ASPxRoundPanel1_ASPxDDL_ElectionDate_I");
            el.click()
            election_el = driver.find_element_by_xpath("//*[contains(text(), '{}')]".format(election_cycle))
            election_el.click()
            sleep(3)

        # Search, which will load up the content on the page.
        # Search terms are left blank, indicating "all content".
        driver.find_element_by_id(self.SEARCH_BUTTON_ID).click()

    # Use the browser back button.
    def clickBackButton(self, driver):
        driver.execute_script("window.history.go(-1)")

    def verifySearchTableLoadComplete(self, driver):
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.ID, self.SEARCH_TABLE_INDEX_CLICKABLE_ID)
            )
        )

    def verifyDownloadFormTableLoadComplete(self, driver):
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, self.FORM_TABLE_MAIN_TABLE_ID))
        )

    def downloadExcel(self, driver):
        # Finds all the Excel files linked on the page and downloads them.
        # First create array that handles ammendments, to ensure we're only downloading the latest/most accurate
        numFormTableRows = driver.find_elements_by_xpath(
            self.FORM_TABLE_ROW_XPATH_CONTAINS
        )
        downloadExcelRows = []
        count = 0
        for i in range(len(numFormTableRows)):
            formTable_FormType = driver.find_elements_by_xpath(
                '//*[@id="{}{}"]/td[1]'.format(self.FORM_TABLE_ROW_ID, i)
            )[0].text
            formTable_FilingPeriod = driver.find_elements_by_xpath(
                '//*[@id="{}{}"]/td[4]'.format(self.FORM_TABLE_ROW_ID, i)
            )[0].text
            if "-A" in formTable_FormType:
                formTable_FormType = formTable_FormType[:-2]
            uniqueKeyFormId = "{} ~ {}".format(
                formTable_FormType, formTable_FilingPeriod
            )

            if uniqueKeyFormId not in downloadExcelRows:
                downloadExcelRows.append(uniqueKeyFormId)
                try:
                    downloadLinkElement = driver.find_elements_by_xpath(
                        '//*[@id="{}{}"]/td[6]/a'.format(self.FORM_TABLE_ROW_ID, i)
                    )[0]
                except IndexError:
                    continue
                else:
                    downloadLinkElement.click()
                    count += 1
        print('NUM DOWNLOADS {}'.format(count))
        self.preprocessing.insertColumns(count, self.CANDIDATENAME, self.ELECTIONDATE, self.BALLOTITEM, self.BALLOTTYPE, self.SUPPORT_OPPOSE)

    # Returns a boolean.
    def errorDialogExists(self, driver):
        return driver.find_elements_by_id(self.ERROR_DIALOG_BUTTON_ID)

    def closeErrorDialog(self, driver):
        driver.find_element_by_id(self.ERROR_DIALOG_BUTTON_ID).click()
        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.ID, self.ERROR_DIALOG_BUTTON_ID))
        )

    # Navigates to the Nth page of the search results.
    def navigateToPage(self, driver, target_page):
        try:
            driver.find_element_by_class_name("dxp-current")
        except NoSuchElementException:
            assert target_page == 1, "Page nums will not load if there is only and exactly one page."
            return
        while (
            driver.find_element_by_class_name("dxp-current") and
            not "[{}]".format(target_page)
            == driver.find_element_by_class_name("dxp-current").text
        ):
            page_elements = driver.find_elements_by_class_name("dxp-num")

            page_nums = []
            for el in page_elements:
                try:
                    page_nums.append(int(el.text))
                except ValueError:
                    pass
            assert page_nums, "No page nums found to click."

            # Click on the page that we can click on closest to our target page.
            closest_page = page_nums[0]
            for page in page_nums:
                if abs(target_page - page) < abs(target_page - closest_page):
                    closest_page = page
            driver.find_element(
                By.XPATH, "//*[text()='{}']".format(closest_page)
            ).click()

            # Verify navigation to closest_page before re-entering while loop
            WebDriverWait(driver, 10).until(
                EC.text_to_be_present_in_element(
                    (By.XPATH, '//b[@class="dxp-num dxp-current"]'),
                    "[{}]".format(closest_page),
                )
            )

    # Determine the number of pages of search results present.
    def numPages(self, driver):
        page_elements = driver.find_elements_by_class_name("dxp-num")
        page_nums = []
        for el in page_elements:
            try:
                page_nums.append(int(el.text))
            except ValueError:
                pass
        if not page_nums:
            return 1
        return max(page_nums)

    # Determines the number of
    def numberOfEntries(self, driver):
        return len(driver.find_elements_by_xpath(self.PAGE_ENTRY_XPATH))

    def clickEntryIndex(self, driver, index):
        driver.find_element_by_xpath(
            '//*[@id="ctl00_GridContent_gridFilers_DXCBtn{}"]'.format(index)
        ).click()

    def numTableEntries(self, driver, search_page_num):
        # Loop through all all items in the search table and retrieve the data
        numTableRows = driver.find_elements_by_xpath(
            self.SEARCH_TABLE_ROW_XPATH_CONTAINS
        )
        followTableRowNums = (search_page_num - 1) * 10
        numTableRowEntries = []
        for i in range(0 + followTableRowNums, len(numTableRows) + followTableRowNums):
            numTableRowEntries.append(i)
        return numTableRowEntries

    def extractTableData(self, driver, entry_index):
        tableData_CandNameL = driver.find_elements_by_xpath('//*[@id="{}{}"]/td[4]'.format(self.SEARCH_TABLE_ROW_ID, entry_index))[0].text
        tableData_CandNameF = driver.find_elements_by_xpath('//*[@id="{}{}"]/td[5]'.format(self.SEARCH_TABLE_ROW_ID, entry_index))[0].text

        self.FILERNAME = driver.find_elements_by_xpath('//*[@id="{}{}"]/td[3]'.format(self.SEARCH_TABLE_ROW_ID, entry_index))[0].text
        self.CANDIDATENAME = '{} {}'.format(tableData_CandNameF, tableData_CandNameL)
        print('CANIDATE NAME ->{}<-'.format(self.CANDIDATENAME))

        self.ELECTIONDATE = driver.find_elements_by_xpath('//*[@id="{}{}"]/td[2]'.format(self.SEARCH_TABLE_ROW_ID, entry_index))[0].text
        self.BALLOTITEM = driver.find_elements_by_xpath('//*[@id="{}{}"]/td[7]'.format(self.SEARCH_TABLE_ROW_ID, entry_index))[0].text
        self.SUPPORT_OPPOSE = driver.find_elements_by_xpath('//*[@id="{}{}"]/td[8]'.format(self.SEARCH_TABLE_ROW_ID, entry_index))[0].text
        self.BALLOTTYPE = driver.find_elements_by_xpath('//*[@id="{}{}"]/td[9]'.format(self.SEARCH_TABLE_ROW_ID, entry_index))[0].text

class Scraper:
    def __init__(self):
        self.DEFAULT_SLEEP_TIME = 5
        self.SEARCH_FORM_ADDRESS = "https://www.southtechhosting.com/SanJoseCity/CampaignDocsWebRetrieval/Search/SearchByElection.aspx"

        # create data folder in current directory to store files
        self.website = SjcWebsite()
        self.new_dir = DirManager(["data"])
        self.new_dir.createFolder()
        self.download_dir = self.new_dir.getDirectory()

        self.website.preprocessing = PreProcessing(self.download_dir)

        options = webdriver.ChromeOptions()

        # Uncomment block BELOW for headless data-retrieval
        # --> Currently not working 100%, only downloads first link on form table
        isHeadless = os.environ.get('HEADLESS', False)
        if isHeadless:
            options.add_argument("--headless")
        # options.add_argument("--disable-gpu")
        # options.add_argument("--window-size=1280,800")
        # Uncomment block ABOVE for headless data-retrieval

        options.add_argument("--ignore-certificate-errors")
        options.add_argument("--test_type")
        options.add_argument("--no-sandbox")
        options.add_argument("start-maximized")
        options.add_argument("disable-infobars")
        options.add_argument("--disable-extensions")
        plugs = {"enabled": False, "name": "Chrome PDF Viewer"}
        prefs = {
            "download.default_directory": self.download_dir,
            "download.prompt_for_download": False,
            "download.directory_upgrade": True,
            "safebrowsing.enabled": False,
            "safebrowsing.disable_download_protection": True,
            "plugins.plugins_list": [plugs],
        }
        options.add_experimental_option("prefs", prefs)
        self.driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)

    def scrape(self, election_cycle=None):
        # Navigate to https://www.southtechhosting.com/SanJoseCity/CampaignDocsWebRetrieval/Search/SearchByElection.aspx
        self.website.navigateToSearchPage(self.driver, self.SEARCH_FORM_ADDRESS, election_cycle=election_cycle)
        self.website.verifySearchTableLoadComplete(self.driver)

        for search_page_num in range(1, self.website.numPages(self.driver) + 1):
            print('PAGE {}'.format(search_page_num))
            # Need to navigate to the page upfront so that when we get the number of entries on the page it is accurate.
            self.website.navigateToPage(self.driver, search_page_num)

            for entry_index in self.website.numTableEntries(
                self.driver, search_page_num
            ):
                print('INDEX {}'.format(entry_index))
                # will result in the website bringing us back to page 1.
                self.website.navigateToPage(self.driver, search_page_num)
                self.website.extractTableData(self.driver, entry_index)

                if "2020" in self.website.ELECTIONDATE:
                    self.website.clickEntryIndex(self.driver, entry_index % 10)

                    sleep(self.DEFAULT_SLEEP_TIME)

                    if self.website.errorDialogExists(self.driver):
                        # If there are no forms for a specific entry, we get an error message.
                        self.website.closeErrorDialog(self.driver)
                    else:
                        # If there are forms, then we will be brought to the "forms" page.
                        self.website.verifyDownloadFormTableLoadComplete(self.driver)
                        self.website.downloadExcel(self.driver)

                        self.website.clickBackButton(self.driver)
                        self.website.verifySearchTableLoadComplete(self.driver)

        # Close browser once scrape is complete
        self.driver.quit()

        # Custom module to aggregate data into single CSV
        self.website.preprocessing.aggregateData()

start_time = time.time()
s = Scraper()

# Can use election_cycle='11/3/2020' to load only the latest elections data.
# Can use election_cycle=None to load all election data.
s.scrape(election_cycle=None)
print(
    "--- Finished ---\n---    In    ---\n--- {} ---".format(
        time.strftime("%H:%M:%S", time.gmtime(time.time() - start_time))
    )
)
