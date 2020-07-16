from flask import Blueprint, jsonify, request

from api.models import Candidate, db

# from data_pipeline.scraper import scraper

data_bp = Blueprint("data_bp", "api", url_prefix="/open-disclosure/api/v1.0")


@data_bp.route("/", methods=["GET"])
def home():
    return "<h1>hello</p>"


@data_bp.route("/scrape", methods=["GET"])
def init_scraper():
    return "<h1>scraping</p>"
    # exec(open("../../scraper/scraper").read())


@data_bp.route("/total-contributions", methods=["GET"])
def get_total_contributions():
    return jsonify(100000)


@data_bp.route("/candidates", methods=["GET"])
def get_candidates():
    candidates = Candidate.query.all()
    return jsonify(candidate_list=[i.serialize() for i in candidates])


@data_bp.route("/candidates", methods=["POST"])
def create_candidate():
    data = request.get_json()
    if "name" not in data:
        err = {"error": 400, "message": "Name not in data"}
        response = jsonify(err)
        response.status_code = 400
        return response
    candidate_name = data["name"]
    candidate = Candidate.query.filter_by(name=candidate_name).first()
    status_code = 200
    if not candidate:
        candidate = Candidate(name=candidate_name)
        db.session.add(candidate)
        db.session.commit()
        status_code = 201
    return jsonify(candidate.serialize()), status_code


@data_bp.route("/candidates/<string:candidate_name>", methods=["GET"])
def get_by_candidate(candidate_name):
    candidate = Candidate.query.filter_by(name=candidate_name).first()
    if not candidate:
        err = {"error": 404, "message": "Candidate not found"}
        response = jsonify(err)
        response.status_code = 404
        return response
    return jsonify(candidate.serialize()), 200
