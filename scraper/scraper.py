import os
import re
import sys
import chromedriver_binary  # Adds chromedriver binary to path

import shutil
import time
import multiprocessing
from multiprocessing.dummy import Pool
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

    def setUpScrapers(self):
        # create drivers for each page on site
        self.__initDrivers()
        sleep(self.s + 2)
        pg_nums = self.driver.find_elements_by_xpath('//a[@class="dxp-num"]')
        num = 1
        for i in range(0, len(pg_nums)):
            self.__initDrivers()
            sleep(self.s + 2)
            self.driver.find_element_by_xpath('//a[contains(text(),"{}")]'.format(num + 1)).click()
            if num <= len(pg_nums):
                num += 1

    def startScrapers(self):
        # initiate drivers simultaneously (equal to total # of cpu processors -1)
        p = Pool(multiprocessing.cpu_count() - 1)
        p.map(self.__iterForms, self.drivers)

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
        self.driver = webdriver.Chrome(executable_path="C:\\Users\\ASCI-Red\\AppData\\Local\\Programs\\Python\\Python37\\Lib\\site-packages\\selenium\\webdriver\\chrome\\chromedriver.exe"
            , options=options)

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



    def __iterForms(self, driver):
        forms = driver.find_elements_by_xpath(
            '//a[@class="dxbButton_Glass dxgvCommandColumnItem_Glass dxgv__cci dxbButtonSys"]')
        sleep(self.s)

        for ind, form in enumerate(forms):
            sleep(self.s + 1)
            forms = driver.find_elements_by_xpath(
                '//a[@class="dxbButton_Glass dxgvCommandColumnItem_Glass dxgv__cci dxbButtonSys"]')
            forms[ind].click()
            sleep(self.s + 1)
            driver.find_elements_by_xpath('//table[@class="dxgvControl_Glass dxgv"]')
            self.__downloadExcel(driver)
            self.__downloadPdfs(driver)

            # Go back a page
            self.__clickBackButton(driver)
            sleep(self.s)

    def __clickSubmitButton(self, driver):
        driver.find_element_by_xpath('//*[@id="ctl00_DefaultContent_ASPxRoundPanel1_btnFindFilers_CD"]').click()

    def __clickBackButton(self, driver):
        if driver.find_elements_by_xpath('//*[@id="ctl00_DefaultContent_buttonBack"]'):
            driver.find_elements_by_xpath('//*[@id="ctl00_DefaultContent_buttonBack"]')[0].click()
        else:
            driver.find_elements_by_xpath('//*[@id="ctl00_DefaultContent_buttonBack_CD"]')[0].click()

    def downloadCheck(self):
        # checks if pdfs are finished downloading (some take longer than others)
        for i in os.listdir(self.path_dir):
            if ".crdownload" in i:
                sleep(0.5)
                self.downloadCheck()

    def __downloadExcel(self, driver):
        excel = driver.find_elements_by_xpath(
            '//td[@class="dxgvCommandColumn_Glass dxgv"]//img[@title="Export Transaction Details To Excel"]')
        sleep(self.s + 1)
        for exfile in excel:
            exfile.click()
        sleep(self.s + 1)

    def __downloadPdfs(self, driver):
        pdfs = driver.find_elements_by_xpath('//td[@class="dxgvCommandColumn_Glass dxgv"]//img[@title="View Form"]')
        for pdf_ind in range(0, len(pdfs)):
            driver.find_elements_by_xpath('//td[@class="dxgvCommandColumn_Glass dxgv"]//img[@title="View Form"]')[
                pdf_ind].click()
            sleep(self.s + 2)

            # switch to pdf window
            driver.switch_to.frame(driver.find_element_by_tag_name('iframe'))
            delay = 10
            try:
                WebDriverWait(driver, delay).until(EC.presence_of_element_located((By.LINK_TEXT, "Click here")))
            except TimeoutException:
                print("Loading took too much time...")

            a = driver.find_element_by_link_text("Click here")
            ActionChains(driver).key_down(Keys.CONTROL).click(a).key_up(Keys.CONTROL).perform()
            sleep(self.s + 2)
            driver.switch_to.default_content()
            driver.find_elements_by_xpath("//div[@id='ctl00_GenericPopupSizeable_InnerPopupControl_PWH-1']")[0].click()
            ActionChains(driver).send_keys(Keys.ESCAPE).perform()
            self.downloadCheck()
            sleep(self.s + 2)

print("starting script")
start_time = time.time()
s = Scraper()
try:
    s.setUpScrapers()
except:
    print("could not call setupScrapers")
s.startScrapers()
print("--- {} seconds ---".format(time.time() - start_time))
