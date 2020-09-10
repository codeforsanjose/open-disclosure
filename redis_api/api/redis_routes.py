import json

from flask import Blueprint, jsonify

from api.errors import error_response
from redis import StrictRedis

redis_bp = Blueprint("redis_bp", "redis_api", url_prefix="/open-disclosure/api/v1.0")
r = StrictRedis(host="localhost", port=6379)


@redis_bp.route("/", methods=["GET"])
def home():
    return f"<h1>Welcome to the Open Disclosure API</p>"


@redis_bp.route("/total-contributions", methods=["GET"])
def get_total_contributions():
    """
    Query redis to get the total amount of monies spent
    :return: int representing the total for (either all time or current election)
    """
    response = r.execute_command("JSON.GET", "TotalContributions")
    if not response:
        return dict()
    return jsonify({"TotalContributions": json.loads(response)})


@redis_bp.route("/candidates", methods=["GET"])
def get_candidates():
    """
    Get all the candidates from the current election period
    :return: list of JSON objects containing individual candidate information
    """
    response = r.execute_command("JSON.GET", "Candidates")
    if not response:
        return dict()
    return jsonify({"Candidates": json.loads(response)})


@redis_bp.route("/committees", methods=["GET"])
def get_committees():
    """
    Get all the committees from the current election period
    :return: list or set of JSON objects containing individual candidate information
    """
    response = r.execute_command("JSON.GET", "Committees")
    if not response:
        return dict()
    return jsonify({"Committees": json.loads(response)})


@redis_bp.route("/elections", methods=["GET"])
def get_elections():
    """
    Get all the election cycles from 2019-2020
    :return: list or set of JSON objects containing individual election cycle information
    """
    response = r.execute_command("JSON.GET", "Elections")
    if not response:
        return dict()
    return jsonify({"Elections": json.loads(response)})


@redis_bp.route("/referendums", methods=["GET"])
def get_referendums():
    """
    WIP
    :return:
    """
    return jsonify(r.get("Referendums").decode("utf-8"))


@redis_bp.route("/metadata", methods=["GET"])
def get_metadata():
    """
    WIP
    :return:
    """
    return jsonify(r.get("Metadata").decode("utf-8"))


@redis_bp.route("/candidates/<string:candidate_name>", methods=["GET"])
def get_by_candidate(candidate_name):
    """
    Get information associated with a particular candidate
    :param candidate_name: string representing a candidate's name
    :return: JSON object containing a candidate's election info or error message
    """
    candidate_name = candidate_name.replace(" ", "-")
    response = r.execute_command("JSON.GET", "Candidates", f".{candidate_name}")
    if not response:
        return jsonify(candidate_name)
    return jsonify(json.loads(response)), 200
