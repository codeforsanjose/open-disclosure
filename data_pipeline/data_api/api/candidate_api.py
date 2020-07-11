from flask import current_app as app
from flask import jsonify

from api.models import Candidate, db


@app.route("/", methods=["GET"])
def home():
    return "<h1>hello</p>"


@app.route("/open-disclosure/api/v1.0/candidates", methods=["GET"])
def get_candidates():
    candidates = Candidate.query.all()
    return jsonify(candidate_list=[i.serialize() for i in candidates])


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
