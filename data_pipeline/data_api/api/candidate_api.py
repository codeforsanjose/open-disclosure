from flask import current_app as app
from flask import jsonify, request

from api.models import Candidate, db

# from data_pipeline.scraper import scraper


@app.route("/", methods=["GET"])
def home():
    return "<h1>hello</p>"


@app.route("/open-disclosure/api/v1.0/scrape", methods=["GET"])
def init_scraper():
    return "<h1>scraping</p>"
    # exec(open("../../scraper/scraper").read())


@app.route("/open-disclosure/api/v1.0/total-contributions", methods=["GET"])
def get_total_contributions():
    return jsonify(100000)


@app.route("/open-disclosure/api/v1.0/candidates", methods=["GET"])
def get_candidates():
    candidates = Candidate.query.all()
    return jsonify(candidate_list=[i.serialize() for i in candidates])


@app.route("/open-disclosure/api/v1.0/candidates", methods=["POST"])
def create_candidate():
    data = request.get_json()
    if "name" not in data:
        err = {"error": 400, "message": "Name not in data"}
        response = jsonify(err)
        response.status_code = 400
        return response
    candidate_name = data["name"]
    candidate = Candidate.query.filter_by(name=candidate_name).first()
    if not candidate:
        candidate = Candidate(name=candidate_name)
        db.session.add(candidate)
        db.session.commit()
    return jsonify(candidate.serialize()), 201


@app.route(
    "/open-disclosure/api/v1.0/candidates/<string:candidate_name>", methods=["GET"]
)
def get_by_candidate(candidate_name):
    if candidate_name:
        new_candidate = Candidate(name=candidate_name)
        db.session.add(new_candidate)
        db.session.commit()
    return f"<h1>{candidate_name}</p>"


@app.route("/open-disclosure/api/v1.0/regions", methods=["GET"])
def get_by_regions():
    pass
