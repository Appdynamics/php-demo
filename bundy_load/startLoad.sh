#!/bin/bash

BEACON_HOST=54.244.239.48
BEACON_PORT=9001
RUM_KEY=DEMO-AAB-AUT

docker run -d --name bundy_load -e BEACON_HOST=${BEACON_HOST} -e BEACON_PORT=${BEACON_PORT} -e RUM_KEY=${RUM_KEY} --link bundy_web:bundy_web appdynamics/bundy_load:test
