#!/bin/bash

# This is a script to start Bundy on Docker

# Set variables
CONTR_HOST=e2e-controller-master-a.demo.appdynamics.com
CONTR_PORT=8090
APP_NAME=Mark-Bundy
COM_TIER_NAME=Bundy-Commerce
COM_NODE_NAME=Bundy-Commerce-Node
FUL_TIER_NAME=Bundy-Fulfillment
FUL_NODE_NAME=Bundy-Fulfillment-Node
INV_TIER_NAME=Bundy-Inventory
INV_NODE_NAME=Bundy-Inventory-Node
CTRLR_ACCOUNT=customer1_836b5ef3-7eb7-410b-86b3-beb1eac448ca
CTRLR_KEY=f4fdbd62-25fc-4c50-88ad-618d79c98222
EVENT_ENDPOINT='http://52.32.212.150:9080'
EUM_KEY=
BEACON_HOST=
BEACON_PORT=
VERSION=
echo "${CONTR_HOST} is the controller name and ${CONTR_PORT} is the controller port"

# Pull images
#docker pull appdynamics/bundy_base:latest
#docker pull appdynamics/bundy_db:latest
#docker pull appdynamics/bundy_mem:latest
#docker pull appdynamics/bundy_inv:${VERSION}
#docker pull appdynamics/bundy_ful:${VERSION}
#docker pull appdynamics/bundy_web:${VERSION}

# Start containers
docker run -d --name bundy_db -p 3306:3306 appdynamics/bundy_db:latest

sleep 10

docker run -d --name bundy_mem -p 11211:11211 appdynamics/bundy_mem:latest

sleep 10

docker run -d --name bundy_inv -e CONTROLLER=${CONTR_HOST} -e APPD_PORT=${CONTR_PORT} -e EVENT_ENDPOINT=${EVENT_ENDPOINT} -e APP_NAME=${APP_NAME} -e INV_TIER_NAME=${INV_TIER_NAME} -e INV_NODE_NAME=${INV_NODE_NAME} -e CTRLR_ACCOUNT=${CTRLR_ACCOUNT} -e CTRLR_KEY=${CTRLR_KEY} --link bundy_mem:bundy_mem appdynamics/bundy_inv:${VERSION}

sleep 10

docker run -d --name bundy_ful -e CONTROLLER=${CONTR_HOST} -e APPD_PORT=${CONTR_PORT} -e EVENT_ENDPOINT=${EVENT_ENDPOINT} -e APP_NAME=${APP_NAME} -e FUL_TIER_NAME=${FUL_TIER_NAME} -e FUL_NODE_NAME=${FUL_NODE_NAME} -e CTRLR_ACCOUNT=${CTRLR_ACCOUNT} -e CTRLR_KEY=${CTRLR_KEY} --link bundy_db:bundy_db --link bundy_mem:bundy_mem appdynamics/bundy_ful:${VERSION}

sleep 10

docker run -d --name bundy_web -v `pwd`/bundy_webserver/src/demoapp/Symfony/src:/var/www/html/demoapp/Symfony/src -e CONTROLLER=${CONTR_HOST} -e APPD_PORT=${CONTR_PORT} -e EVENT_ENDPOINT=${EVENT_ENDPOINT} -e APP_NAME=${APP_NAME} -e COM_TIER_NAME=${COM_TIER_NAME} -e COM_NODE_NAME=${COM_NODE_NAME} -e EUM_KEY=${EUM_KEY} -e CTRLR_ACCOUNT=${CTRLR_ACCOUNT} -e CTRLR_KEY=${CTRLR_KEY} -p 80:80 --link bundy_db:bundy_db --link bundy_mem:bundy_mem --link bundy_ful:bundy_ful --link bundy_inv:bundy_inv appdynamics/bundy_web:${VERSION}

sleep 30

docker run -d --name bundy_load -e BEACON_HOST=${BEACON_HOST} -e BEACON_PORT=${BEACON_PORT} -e RUM_KEY=${EUM_KEY} --link bundy_web:bundy_web appdynamics/bundy_load:${VERSION}

# Install adrum.js if present

if [ -e '/root/adrum.js' ]; then
        echo "Copying adrum.js to /var/www/html/demoapp/Symfony/web/js/adrum.js in bundy_web container"
        docker exec -i bundy_web bash -c 'cat > /var/www/html/demoapp/Symfony/web/js/adrum.js' < adrum.js
        docker exec -i bundy_web bash -c 'rm -rf /var/www/html/demoapp/Symfony/app/cache/prod/*'
else
        echo "No adrum.js present"
fi

exit 0
