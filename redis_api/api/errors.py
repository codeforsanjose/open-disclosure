from flask import jsonify


def error_response(status_code, message):
    err = {"error": status_code, "message": message}
    response = jsonify(err)
    response.status_code = status_code
    return response
