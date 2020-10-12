import json

from flask import Blueprint, jsonify

from api.errors import empty_response, error_response
from api.services import RedisClient
from api.tests.unit import fake_data
from redis import RedisError, StrictRedis

redis_bp = Blueprint("redis_bp", "redis_api", url_prefix="/open-disclosure/api/v1.0")
redis = RedisClient()


@redis_bp.route("/", methods=["GET"])
def home():
    return f"<h1>Welcome to the Open Disclosure API</p>"


@redis_bp.route("/total-contributions", methods=["GET"])
def get_total_contributions(serve_fake=True):
    """
    Query redis to get the total amount of monies spent
    :return: int representing the total for (either all time or current election)
    """
    if serve_fake:
        return jsonify({"TotalContributions": 100000})
    try:
        response = redis.getAnyShape("Total Contributions")
        if not response:
            return empty_response("TotalContributions")
        return jsonify({"TotalContributions": json.loads(response)})
    except Exception as error:
        return error_response(f"{error}")


@redis_bp.route("/candidates", methods=["GET"])
def get_candidates(serve_fake=False):
    """
    Get all the candidates from the current election period or
    a specific candidate
    :param candidate_id: unique identifier associated with each candidate {election-title;cand-name;election-date}
    :type candidate_id: string
    :return: data on all candidates or for one specific candidate
    :rtype: JSON
    """
    try:
        candidate_shape = redis.getAnyShape("candidates")
        if not candidate_shape:
            return empty_response("Candidates")
        return jsonify(candidate_shape)
    except Exception as error:
        return error_response(f"{error}")


@redis_bp.route("/committees", methods=["GET"])
def get_committees(serve_fake=True):
    """
    Get all the committees from the current election period
    :return: list or set of JSON objects containing individual candidate information
    """
    if serve_fake:
        return jsonify({"Committees": fake_data.get_committees_shape()})
    try:
        response = redis.getAnyShape("Committees")
        if not response:
            return empty_response("Committees")
        return jsonify({"Committees": json.loads(response)})
    except Exception as error:
        return error_response(f"{error}")


@redis_bp.route("/elections", methods=["GET"])
def get_elections():
    """
    Get all the election cycles from 2019-2020
    :return: list or set of JSON objects containing individual election cycle information
    """
    try:
        election_shape = redis.getAnyShape("elections")
        if not election_shape:
            return empty_response("Elections")
        return jsonify(election_shape)
    except Exception as error:
        return error_response(f"{error}")


@redis_bp.route("/referendums", methods=["GET"])
def get_referendums(serve_fake=False):
    """
    WIP
    :return:
    """
    try:
        referendums_shape = redis.getAnyShape("referendums")
        if not referendums_shape:
            return empty_response("Referendums")
        return jsonify(referendums_shape)
    except Exception as error:
        return error_response(f"{error}")


@redis_bp.route("/metadata", methods=["GET"])
def get_metadata(serve_fake=True):
    """
    WIP
    :return:
    """
    if serve_fake:
        return fake_data.get_metadata_shape()
    return empty_response("Metadata")
