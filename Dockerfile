FROM python:3.9-slim-bullseye

COPY requirements.txt /root
RUN pip3 install -r /root/requirements.txt

WORKDIR /var/opt/AIDeployControl

COPY aideploycontrol/ .

ENV FLASK_APP=aideploycontrol
ENV FLASK_ENV=production

CMD flask run --host=0.0.0.0
