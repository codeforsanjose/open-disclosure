from unittest.mock import MagicMock

import flask
from flask import Blueprint, current_app

import pytest
from data_pipeline.data_api.api import routes

# def mock_contributions():
#     return jsonify


class TestRoutes:
    def test_get_total_contributions(self, monkeypatch):
        monkeypatch.setattr(Blueprint, "route", MagicMock())
        monkeypatch.setattr(flask.globals, "current_app", MagicMock())
        response = routes.get_total_contributions()
