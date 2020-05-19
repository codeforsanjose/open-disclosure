### About 
This is a selenium scraper that downloads pdfs and excel files from the San Jose South Tech Host Database. This scraper emulates user interaction on the site to automatically search and download financial data related to political campaigns in San Jose. Basically, we create a robot to do the repetitive job of clicking the download links on the website.

You should expect to see multiple chromedriver environments (or chrome browsers), each dedicated to a specific page on the south tech host site. The setup phase could take a few minutes depending on how many pages have been added to the site.

Version 1: scraper goes through the site page by page. Time to download all files: about 3 hours

Version 2: tried implementing OOP for better structure and extensibility, also improved speed using python's multiprocessing (download files from each page simultaneously). Time to download all files: about 45 minutes

- Using Python 3.7.2

### How to Run
1. Clone the repository and change into webscraper directory (most recent version):
```Shell
$ git clone https://github.com/codeforsanjose/OpenDSJ-2018.git 
$ cd web_scraper
$ cd version2
```
2. Run the scraper: `$ python scraper.py`

3. Grab a cup of coffee and come back ~ 45min

At the end of scraping process, you should see a new directory called 'data' that contains all the downloaded pdfs and excel files


You will need to install selenium, chromedriver, and access to chrome browser for this scraper to work.

1. Install Selenium: `$ pip install selenium`
2. Download chrome driver: http://chromedriver.chromium.org/downloads (add to PATH)
3. Download Google Chrome Browser (in case you don't have)

### Other Notes

Do not click in the chromedriver environments while they are scraping files. The additional input has been found to disrupt the xpath functions while selecting hidden javascript elements. This results in an error and you'll have to restart the scrapers from the beginning.

### Ways to improve web scraper

- Clean up the code base (DRY and PEP8)
- Replace selenium with  scrapy POST requests (faster)
- Headless chrome functionality (figure out how to bypass chrome security feature to allow for files to download in headless mode)
- Implement some system for updating files periodically (cronjob) but only add new files when San Jose database is updated (no duplicates)
- Figure out a way to title the pdf and excel files and organize them in the data directory 
- Extend use for Firefox users (use FireFoxDriver instead of ChromeDriver)
