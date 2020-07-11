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

Running the API
-
1. Make sure your environment variables are set properly 
    - `export FLASK_APP=data_api`
    - `export SQLALCHEMY_DATABASE_URI='sqlite://'`
        - (we can connect it to a mySQL database later)
    - You can also source these variables in your `.bashrc` profile
2. Call `flask run`
3. The API should be running on `localhost:5000`