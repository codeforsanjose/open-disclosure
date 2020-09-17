from flask import Flask


def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object("config.Config")
    from api.routes import redis_bp

    app.register_blueprint(redis_bp)
    with app.app_context():
        import api.routes  # Import routes

        return app
