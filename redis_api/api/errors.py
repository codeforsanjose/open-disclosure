from flask import jsonify


def error_response(message, status_code=500):
    err = {"error": status_code, "message": message}
    response = jsonify(err)
    response.status_code = status_code
    return response, status_code
