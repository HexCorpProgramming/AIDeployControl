FROM python:3.9-slim-bullseye

RUN apt update; apt install -y git

COPY requirements.txt /root
RUN pip3 install -r /root/requirements.txt

WORKDIR /var/opt/AIDeployControl

COPY aideploycontrol/ aideploycontrol/

ENV FLASK_APP=aideploycontrol
ENV FLASK_ENV=production

EXPOSE 5000

CMD pwd; ls; flask run --host=0.0.0.0                              