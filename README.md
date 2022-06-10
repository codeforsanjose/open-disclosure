# Open Disclosure

A web app to track campaign finances for the California Primary Election (March 3, 2020),
and the General Election (November 3, 2020). The goal of Open Disclosure is to help voters
understand who/what Political Action Committees (PACs) are donating money to the candidates/measures.
Are the donors from the same jurisdiction (city/county/state) as the candidate's intended office or
outside of the jurisdiction? Are the donors individuals, or Political Action Committees (PACs)? What
is the donor history of the PAC(s)?

View the currently deployed version of our web app: 
[https://open-disclosure.codeforsanjose.org/](https://open-disclosure.codeforsanjose.org/)

We are inspired by Open Oakland's Open Disclosure: https://www.opendisclosure.io

Initially this project will cover City of San Jose elections and later will broaden to cover elections more widely.

## California Election Information:

San Jose voters will vote on November 3, 2020 for 5 Councilmembers in Districts 2, 4, 6, 8 and 10.
[More information can be found here.](https://www.sanjoseca.gov/your-government/appointees/city-clerk/elections/2020-elections)
This project aims to cover the finances for these candidates in Version 2, from January 2020.

The Presidential Primary Election is on March 3, 2020 in the state of California. There will be elections for:

- President of the United States
- United States Representative in Congress
- California State Senator and Member of the State Assembly

After the primary, the general election will be on November 3, 2020.
[More information here](https://www.sos.ca.gov/elections/upcoming-elections/general-election-november-3-2020/)


## Frontend Development setup

Full local Development has not been tested for Windows computers. Setup assumes Mac OS

1. [Install Docker Desktop](https://www.docker.com/products/docker-desktop)

2. Start docker (by opening it)

3. Clone the project to your local machine.

```sh
$ git clone https://github.com/codeforsanjose/open-disclosure.git
```

4. Go into the project folder.

```sh
$ cd open-disclosure/
```

5. Enable `entrypoint.sh` to be executable

```sh
$ chmod +x entrypoint.sh
```

6. Build Docker images.

```sh
$ docker-compose build ui
```

7. Run Docker images to start local development

```sh
$ docker-compose up ui
```

8. Open webpage in http://localhost:8000.


## How to Launch the Scraper

### MacOS:

[Install Python3.8 for MacOS](https://docs.python-guide.org/starting/install3/osx/)

```
% cd data_pipeline/scraper
% virtualenv env
% source env/bin/activate

(env) % python3 -m pip install -r requirements.txt

(env) % python ./scraper.py
```

### Windows:

[Install Python3.8 for Windows](https://phoenixnap.com/kb/how-to-install-python-3-windows)

```
% cd data_pipeline/scraper
% virtualenv --system-site-packages -p python3 ./venv
% .\venv\Scripts\activate

(env) % python3 -m pip install -r requirements.txt
(env) % python3 scraper.py
```

The example above uses virtualenv to help create a clean working environment and help you not pollute the spaces
of other python applications you may use.

## How to Launch Scraper Post-Processor

[Install Python3.8 for MacOS](https://docs.python-guide.org/starting/install3/osx/)

```
% cd data_pipeline/data_processing
% virtualenv env
% source env/bin/activate

(env) % python3 -m pip install -r requirements.txt

(env) % python3 aggregatedcsvtoredis.py
```

## Deploy to Prod

First, gain access to the CFSJ AWS account. Once you have the desired code changes, use the Dockerfile to build a new image:
```
docker build --platform=linux/amd64 .
```
Then, follow [This Guide]([https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html](https://us-west-2.console.aws.amazon.com/ecr/repositories/private/253016134262/open-disclosure-frontend-prod?region=us-west-2)) to push the image to ECS.

Finally, stop any currently active tasks associated with the service ([found here](https://us-west-2.console.aws.amazon.com/ecs/home?region=us-west-2#/clusters/multi-tenant-prod/services/open-disclosure-frontend-prod/tasks)).  This will cause new tasks to be automatically started using the newly deployed docker image.


## How to Contribute

[Find an issue and assign yourself](https://github.com/codeforsanjose/open-disclosure/issues)

- Communicate with the team on Slack (channel: #open-disclosure).
- [Join our Slack](https://join.slack.com/t/codeforsanjose/shared_invite/zt-iwnx99kh-motBC0J47O8ItlR3zjAIBA)
- Attend a Code for San Jose civic hack night meetup: https://www.meetup.com/code-for-san-jose

Inspired by [Open Oakland's Open Disclosure](https://www.opendisclosure.io/)  
Made with <3 by Code for San José
