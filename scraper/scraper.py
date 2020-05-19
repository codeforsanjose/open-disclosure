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


class Scraper():
    def __init__(self):
        # create data folder in current directory to store files
        new_dir = DirCreator()
        new_dir.createFolder()
        self.path_dir = new_dir.changeDirectory()

        # time to sleep()
        self.s = 2

        self.drivers = []
        self.driver = None

    def scrape(self):
        # create drivers for each page on site
        self.__initDrivers()

        error_dialog = False
        end = False
        for i in range(6, 9):
            # This code is from IterForms, it downloads the forms on a page.
            sleep(self.s + 2)
            forms = self.driver.find_elements_by_xpath(
                '//a[@class="dxbButton_Glass dxgvCommandColumnItem_Glass dxgv__cci dxbButtonSys"]')

            for ind, form in enumerate(forms):
                sleep(self.s)
                if not error_dialog:
                    for x in range(i):
                        othername = self.driver.find_element_by_css_selector('[alt="Next"]').find_element_by_xpath('..')
                        othername.click()
                        sleep(self.s + 1)
                error_dialog = False

                forms = self.driver.find_elements_by_xpath(
                    '//a[@class="dxbButton_Glass dxgvCommandColumnItem_Glass dxgv__cci dxbButtonSys"]')
                forms[ind].click()

                sleep(self.s + 1)

                # TODO(walek): Update this to use contains
                if self.driver.find_elements_by_xpath('//*[@id="ctl00_GridContent_popupCantContinueDialog_Button1"]'):
                    self.driver.find_elements_by_xpath('//*[@id="ctl00_GridContent_popupCantContinueDialog_Button1"]')[0].click()
                    error_dialog = True
                    continue

                self.driver.find_elements_by_xpath('//table[@class="dxgvControl_Glass dxgv"]')
                self.__downloadExcel(self.driver)

                # Go back a page
                self.__clickBackButton(self.driver)

            sleep(self.s)


    def __initDrivers(self):
        options = webdriver.ChromeOptions()
        #options.headless = True
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

        self.driver.get(
        "https://www.southtechhosting.com/SanJoseCity/CampaignDocsWebRetrieval/Search/SearchByElection.aspx")
        try:
            WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, 'ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers_CD')))
        except TimeoutException:
            print("Loading took too long.")

        try:
            print("still in the __init")
            self.__clickSubmitButton(self.driver)
            print("click submit button entered")
        except:
            print("couldn't do one of the click submit button")

        self.drivers.append(self.driver)


    def __clickSubmitButton(self, driver):
        driver.find_element_by_xpath('//*[@id="ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers_CD"]').click()

    def __clickBackButton(self, driver):
        driver.execute_script("window.history.go(-1)")

    def __downloadExcel(self, driver):
        excel = driver.find_elements_by_xpath(
            '//td[@class="dxgvCommandColumn_Glass dxgv"]//img[@title="Export Transaction Details To Excel"]')
        sleep(self.s + 1)

        for exfile in excel:
            print(exfile)

print("starting script")
start_time = time.time()
s = Scraper()

s.scrape()
print("--- {} seconds ---".format(time.time() - start_time))
