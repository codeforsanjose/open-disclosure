Redis API
=
The purpose of this API is to serve the election data stored in Redis to the frontend. The instructions below are for local setup.


Getting started
-
On MacOSX:
1. Run `pip install -r requirements.txt` 
    - You can install this in a virtual environment or your local one. To create a virtual environment, run `python3 -m venv {name of virtual environment}`
    - Then activate your virtual env by running `source /path/to/virtualenv/activate`
    - Simply run `deactivate` to stop running it

2. Run `pre-commit install` to install pre-commit
    - This ensures proper formatting across your files (right now it just works for python, but feel free to add linters for other types of files)
    - If you do need to bypass pre-commit (you might have to with the way `__init__` is set up currently) then just run `git commit -n`

Running your local Redis server
-
1. Follow the Quickstart directions listed here: https://realpython.com/python-redis/
2. Make sure the server is running with `redis-server --daemonize yes`

    - You can stop the server with `pkill redis-server` 

Installing RedisJSON and redis-py
-
1. Clone the RedisJSON module `git clone https://github.com/RedisJSON/RedisJSON.git`
    - You might have to install `cargo` and `cmake` to complete setup. Instructions for installing are listed below.
        - [Install cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) then run `source $HOME/.cargo/env` or `export PATH="$HOME/.cargo/bin:$PATH"` in .profile
            - If you've exported your `PATH`, don't forget to run `make` in a new terminal session
        - Install cmake using homebrew `brew install cmake`
4. Run `make`
2. Load RedisJSON and run the redis server: `redis-server --loadmodule ./target/release/librejson.dylib`
3. Run `pip install redis` to install `redis-py`

Running the API
-
**If you made a virtualenv, don't forget to activate it before running the API**
1. Make sure your environment variables are set properly 
    - `export FLASK_APP=api`
    - `export PYTHONPATH=$PYTHONPATH/path/to/open-disclosure` (this is needed to ensure modules outside of data_api can be imported properly)
    - `export PYTHONPATH=$PYTHONPATH/path/to/scraper` (scraper needs to be recognized as its own module)
    - You can also source these variables in your `.bashrc` profile
2. Call `flask run` in the redis_api directory
3. The API should be running on `localhost:5000`

Making calls to the API
-
You can send requests to the proper endpoints by using `curl`. All endpoints are currently located in `routes.py`. Since the API's main purpose is to serve data from Redis, it only supports `GET` requests.

Example calls:

```
$ curl -i http://localhost:5000/open-disclosure/api/v1.0/candidates 
```