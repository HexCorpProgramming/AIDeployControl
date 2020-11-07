from os import path, remove
import subprocess


class InvalidStateException(Exception):
    pass


DEPLOYMENT = "aideploycontrol/deployment"


class Control:

    def __init__(self):
        self.deployed_process = None

    def launch(self):
        if self.deployed_process is not None:
            raise InvalidStateException

        # initialize the AI repo
        if not path.exists(f"{DEPLOYMENT}/initialized"):
            init_process = subprocess.run(["sh", "init.sh"], cwd="aideploycontrol/deployment")
            if init_process.returncode == 0:
                with open(f"{DEPLOYMENT}/initialized", "w") as initialized_file:
                    initialized_file.write("1")
            else:
                raise InvalidStateException

        self.deployed_process = subprocess.Popen(["sh", "run.sh"], cwd=DEPLOYMENT)

    def stop(self):
        if self.deployed_process is None:
            raise InvalidStateException

        self.deployed_process.kill()
        self.deployed_process = None

    def reset_db(self):
        if self.deployed_process is not None:
            raise InvalidStateException

        remove(f"{DEPLOYMENT}/HexCorpDiscordAI/ai.db")

    def status(self):
        return {
            "running": self.deployed_process is not None
        }
