# remove old deployment if exists
docker stop AIDeployControl
docker rm AIDeployControl

# build new image
git pull
docker build --tag ai_deploy_control:latest .

# start new image; copy this and fill in the bot token manually
# docker run --name AIDeployControl --detach --restart always --env BOT_TOKEN=<INSERT_TOKEN> -p 5000:5000 ai_deploy_control:latest
