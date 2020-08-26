from os import path
import subprocess


class InvalidStateException(Exception):
    pass


class Control:

    def __init__(self):
        self.deployed_process = None

    def launch(self):
        if self.deployed_process is not None:
            raise InvalidStateException

        # initialize the AI repo
        if not path.exists("aideploycontrol/deployment/initialized"):
            init_process = subprocess.run(["sh", "init.sh"], cwd="aideploycontrol/deployment")
            if init_process.returncode == 0:
                with open("aideploycontrol/deployment/initialized", "w") as initialized_file:
                    initialized_file.write("1")
            else:
                raise InvalidStateException

        self.deployed_process = subprocess.Popen(["sh", "run.sh"], cwd="aideploycontrol/deployment")

    def stop(self):
        if self.deployed_process is None:
            raise InvalidStateException

        self.deployed_process.kill()
        self.deployed_process = None
