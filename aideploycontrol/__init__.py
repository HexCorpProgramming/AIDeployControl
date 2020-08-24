import os

from flask import Flask

from aideploycontrol import control

CONTROL = control.Control()


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route("/launch", methods=["POST"])
    def launch():
        CONTROL.launch()
        return ""

    @app.route("/stop", methods=["POST"])
    def stop():
        CONTROL.stop()
        return ""

    return app
