#!/bin/bash

# This is a script to start Bundy on Docker

# Set variables
CONTR_HOST=
CONTR_PORT=
APP_NAME=
COM_TIER_NAME=
COM_NODE_NAME=
FUL_TIER_NAME=
FUL_NODE_NAME=
INV_TIER_NAME=
INV_NODE_NAME=
CTRLR_ACCOUNT=
CTRLR_KEY=
EUM_KEY=
VERSION=
echo "${CONTR_HOST} is the controller name and ${CONTR_PORT} is the controller port"

# Pull images
docker pull appdynamics/bundy_base:latest
docker pull appdynamics/bundy_db:latest
docker pull appdynamics/bundy_mem:latest
docker pull appdynamics/bundy_inv:${VERSION}
docker pull appdynamics/bundy_ful:${VERSION}
docker pull appdynamics/bundy_web:${VERSION}

# Start containers
docker run -d --name bundy_db -p 3306:3306 -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_db:latest

sleep 10

docker run -d --name bundy_mem -p 11211:11211 -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_mem:latest

sleep 10

docker run -d --name bundy_inv -e CONTROLLER=${CONTR_HOST} -e APPD_PORT=${CONTR_PORT} -e APP_NAME=${APP_NAME} -e INV_TIER_NAME=${INV_TIER_NAME} -e INV_NODE_NAME=${INV_NODE_NAME} -e CTRLR_ACCOUNT=${CTRLR_ACCOUNT} -e CTRLR_KEY=${CTRLR_KEY} --link bundy_mem:bundy_mem -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_inv:${VERSION}

sleep 10

docker run -d --name bundy_ful -e CONTROLLER=${CONTR_HOST} -e APPD_PORT=${CONTR_PORT} -e APP_NAME=${APP_NAME} -e FUL_TIER_NAME=${FUL_TIER_NAME} -e FUL_NODE_NAME=${FUL_NODE_NAME} -e CTRLR_ACCOUNT=${CTRLR_ACCOUNT} -e CTRLR_KEY=${CTRLR_KEY} --link bundy_db:bundy_db --link bundy_mem:bundy_mem -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_ful:${VERSION}

sleep 10

docker run -d --name bundy_web -e CONTROLLER=${CONTR_HOST} -e APPD_PORT=${CONTR_PORT} -e APP_NAME=${APP_NAME} -e COM_TIER_NAME=${COM_TIER_NAME} -e COM_NODE_NAME=${COM_NODE_NAME} -e EUM_KEY=${EUM_KEY} -e CTRLR_ACCOUNT=${CTRLR_ACCOUNT} -e CTRLR_KEY=${CTRLR_KEY} -p 80:80 --link bundy_db:bundy_db --link bundy_mem:bundy_mem --link bundy_ful:bundy_ful --link bundy_inv:bundy_inv -v /etc/localtime:/etc/localtime:ro appdynamics/bundy_web:${VERSION}

sleep 10

# Install adrum.js if present

if [ -e '/root/adrum.js' ]; then
        echo "Copying adrum.js to /var/www/html/demoapp/Symfony/web/js/adrum.js in bundy_web container"
        docker exec -i bundy_web bash -c 'cat > /var/www/html/demoapp/Symfony/web/js/adrum.js' < adrum.js
        docker exec -i bundy_web bash -c 'chown appdynamics.appdynamics /var/www/html/demoapp/Symfony/web/js/adrum.js'
        docker exec -i bundy_web bash -c 'rm -rf /var/www/html/demoapp/Symfony/app/cache/prod/*'
else
        echo "No adrum.js present"
fi

exit 0
