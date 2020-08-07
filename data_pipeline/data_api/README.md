Data API
-
Getting started:
(on macOS environment)
1. Run `pip install -r requirements.txt` 
    - You can install this in a virtual environment or your local one. To create a virtual environment, run `python3 -m venv {name of virtual environment}`
    - Then activate your virtual env by running `source /path/to/virtualenv activate`
    - Simply run `deactivate` to stop running it

2. Run `pre-commit install` to install pre-commit
    - This ensures proper formatting across your files (right now it just works for python, but feel free to add linters for other types of files)
    - If you do need to bypass pre-commit (you might have to with the way `__init__` is set up currently) then just run `git commit -n`

Running your local Redis server
-
TODO

Running the API
-
1. Make sure your environment variables are set properly 
    - `export FLASK_APP=api`
    - `export SQLALCHEMY_DATABASE_URI='sqlite://'` (will eventually change to mySQL)
    - `export PYTHONPATH=$PYTHONPATH/path/to/open-disclosure` (this is needed to ensure modules outside of data_api can be imported properly)
    - `export PYTHONPATH=$PYTHONPATH/path/to/scraper` (scraper needs to be recognized as its own module)
    - You can also source these variables in your `.bashrc` profile
2. Call `flask run` in the data_api directory
3. The API should be running on `localhost:5000`

Making calls to the API
-
You can send requests to the proper endpoints by using `curl`. All endpoints are currently located in `routes.py`

Example calls:

```
$ curl -i -H "Content-Type: application/json" -X POST -d '{"name":"candidate 1"}' http://localhost:5000/open-disclosure/api/v1.0/candidates
$ curl -i http://localhost:5000/open-disclosure/api/v1.0/scrape 
```