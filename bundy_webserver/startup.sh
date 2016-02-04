#!/bin/bash

# This is a starup script for the Bundy Java server

# Edit hosts file
sudo echo "$BUNDY_INV_PORT_8080_TCP_ADDR www.visa.com" >> /etc/hosts
sudo echo "$BUNDY_INV_PORT_8080_TCP_ADDR www.fedex.com" >> /etc/hosts

# Set Controller variables
source /appdynamics/env.sh

# Complete App Agent config
#source /appdynamics/env.sh && sed -i "s/Commerce-Node1/${COM_NODE_NAME}/g" /appdynamics/runProxy
/appdynamics/appdynamics-php-agent/install.sh -i /etc/php5/mods-available -a customer1@${CTRLR_KEY} --ignore-permissions ${CONTROLLER} ${APPD_PORT} ${APP_NAME} ${COM_TIER_NAME} ${COM_NODE_NAME}
#mv /appdynamics/runProxy /appdynamics/appdynamics-php-agent/proxy/
#chmod 777 /appdynamics/appdynamics-php-agent/proxy/runProxy
php5enmod appdynamics_agent
echo "agent.proxy_output = /tmp/proxyout" >> /etc/php5/apache2/conf.d/20-appdynamics_agent.ini

# Input EUM Key in parameters.yml
source /appdynamics/env.sh && sed -i "/eum_key/c\      eum_key:           ${EUM_KEY}" /var/www/html/demoapp/Symfony/app/config/parameters.yml

# Start MachineAgent
source /appdynamics/env.sh && sed -i "s/Commerce-Node1/${COM_NODE_NAME}/g" /appdynamics/MachineAgent/startMachineAgent.sh
source /appdynamics/env.sh && sed -i "s/AGENT_OPTIONS -Dappdynamics.agent.uniqueHostId=/AGENT_OPTIONS -Dappdynamics.controller.hostName=${CONTROLLER} -Dappdynamics.controller.port=${APPD_PORT} -Dappdynamics.agent.applicationName=${APP_NAME} -Dappdynamics.agent.accountName=customer1 -Dappdynamics.agent.accountAccessKey=${CTRLR_KEY} -Dappdynamics.agent.uniqueHostId=/g" /appdynamics/MachineAgent/startMachineAgent.sh
source /appdynamics/MachineAgent/startMachineAgent.sh

# Set crontab
crontab /appdynamics/cron.conf

# Start services
cron -f &
source /etc/apache2/envvars && /usr/sbin/apache2 -D FOREGROUND

exit 0
