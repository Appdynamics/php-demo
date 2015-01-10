#!/bin/bash

# This is a script to start Bundy on Docker

sudo docker run -d --name bundy_db -p 3306:3306 -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_db:latest

sleep 10

sudo docker run -d --name bundy_inv -e CONTROLLER=54.190.155.157 -e APPD_PORT=8090 -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_inv:latest

sleep 10

sudo docker run -d --name bundy_ful -e CONTROLLER=54.190.155.157 -e APPD_PORT=8090 --link bundy_db:bundy_db -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_ful:latest

sleep 10

sudo docker run -d --name bundy_web -e CONTROLLER=54.190.155.157 -e APPD_PORT=8090 -p 80:80 --link bundy_db:bundy_db --link bundy_ful:bundy_ful --link bundy_inv:bundy_inv -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_web:latest

exit 0
