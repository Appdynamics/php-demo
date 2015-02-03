#!/bin/bash

# This is a script to start Bundy on Docker

# Set variables
CONTR_HOST=54.190.155.157
CONTR_PORT=8090
echo "${CONTR_HOST} is the controller name and ${CONTR_PORT} is the controller port"

# Pull images
docker pull appdynamics/bundy_base:latest
docker pull appdynamics/bundy_db:latest
docker pull appdynamics/bundy_mem:latest
docker pull appdynamics/bundy_inv:latest
docker pull appdynamics/bundy_ful:latest
docker pull appdynamics/bundy_web:latest

# Start containers 
sudo docker run -d --name bundy_db -p 3306:3306 -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_db:latest

sleep 10

sudo docker run -d --name bundy_mem -p 11211:11211 -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_mem:latest

sleep 10

sudo docker run -d --name bundy_inv -e CONTROLLER=${CONTR_HOST} -e APPD_PORT=${CONTR_PORT} --link bundy_mem:bundy_mem -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_inv:latest

sleep 10

sudo docker run -d --name bundy_ful -e CONTROLLER=${CONTR_HOST} -e APPD_PORT=${CONTR_PORT} --link bundy_db:bundy_db --link bundy_mem:bundy_mem -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_ful:latest

sleep 10

sudo docker run -d --name bundy_web -e CONTROLLER=${CONTR_HOST} -e APPD_PORT=${CONTR_PORT} -p 80:80 --link bundy_db:bundy_db --link bundy_mem:bundy_mem --link bundy_ful:bundy_ful --link bundy_inv:bundy_inv -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_web:latest

exit 0
