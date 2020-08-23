# Open Disclosure

A web app to track campaign finances for the California Primary Election (March 3, 2020), 
and the General Election (November 3, 2020). The goal of Open Disclosure is to help voters 
understand who/what Political Action Committees (PACs) are donating money to the candidates/measures. 
Are the donors from the same jurisdiction (city/county/state) as the candidate's intended office or 
outside of the jurisdiction? Are the donors individuals, or Political Action Committees (PACs)? What 
is the donor history of the PAC(s)?

We are inspired by Open Oakland's Open Disclosure: https://www.opendisclosure.io

Initially this project will cover City of San Jose elections and later will broaden to cover elections more widely.

## California Election Information:

San Jose voters will vote on November 3, 2020 for 5 Councilmembers in Districts 2, 4, 6, 8 and 10.
[More information can be found here.]
(https://www.sanjoseca.gov/your-government/appointees/city-clerk/elections/2020-elections)
This project aims to cover the finances for these candidates in Version 2, from January 2020.

The Presidential Primary Election is on March 3, 2020 in the state of California. There will be elections for:
- President of the United States
- United States Representative in Congress
- California State Senator and Member of the State Assembly

After the primary, the general election will be on November 3, 2020.
[More information here](https://www.sos.ca.gov/elections/upcoming-elections/general-election-november-3-2020/)

## How to Launch the Server

1. Clone the project to your local machine.
```sh
$ git clone https://github.com/codeforsanjose/open-disclosure.git
```
2. If not yet installed, install Gatsby globally to your machine.
```ssh
$ npm install -g gatsby-cli
```
3. Go into the project folder.
```ssh
$ cd open-disclosure/
```
4. Install dependencies.
```ssh
$ npm install
```
5. Run local Gatsby server.
```ssh
$ gatsby develop
```
6. Open webpage in http://localhost:8000.

## How to Launch the Scraper

### MacOS:

```
% cd data_pipeline/scraper 
% virtualenv env
% source env/bin/activate

(env) % python3 -m pip install chromedriver_binary webdriver-manager selenium xlrd pymysql sqlalchemy

(env) % python ./scraper.py
```
### Windows:

```
% cd data_pipeline/scraper
% virtualenv --system-site-packages -p python3 ./venv
% .\venv\Scripts\activate

(env) % python3 -m pip install chromedriver_binary webdriver-manager selenium xlrd pymysql sqlalchemy
(env) % python3 scraper.py
```

The example above uses virtualenv to help create a clean working environment and help you not pollute the spaces
of other python applications you may use.

## How to Contribute
0 [Find an issue and assign yourself](https://github.com/codeforsanjose/open-disclosure/issues)
- Communicate with the team on Slack (channel: #open-disclosure). 
- [Join our Slack](https://slackin-c4sj.herokuapp.com/) or [Log onto our Slack](https://codeforsanjose.slack.com/)
- Attend a Code for San Jose civic hack night meetup: https://www.meetup.com/code-for-san-jose/

Inspired by [Open Oakland's Open Disclosure](https://www.opendisclosure.io/)  
Made with <3 by Code for San José
