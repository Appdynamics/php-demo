#!/bin/bash

#  This is a script to start the bundy_fulfillment server

# Set Controller variables
source /appdynamics/env.sh

# Complete App Agent config
#source /appdynamics/env.sh && sed -i "s/Fulfillment-Node1/${FUL_NODE_NAME}/g" /appdynamics/runProxy
/appdynamics/appdynamics-php-agent/install.sh -i /etc/php5/mods-available -a customer1@${CTRLR_KEY} --ignore-permissions ${CONTROLLER} ${APPD_PORT} ${APP_NAME} ${FUL_TIER_NAME} ${FUL_NODE_NAME}
#mv /appdynamics/runProxy /appdynamics/appdynamics-php-agent/proxy/
#chmod 777 /appdynamics/appdynamics-php-agent/proxy/runProxy
php5enmod appdynamics_agent

# Configure main.yml
if [ $C_EXIT = "yes" ]; then
	sed -i 's/c_exit: no/c_exit: yes/g' /var/www/bundydownstream/config/main.yml
else
	echo "${C_EXIT}"
fi 

# Start MachineAgent
source /appdynamics/env.sh && sed -i "s/Fulfillment-Node1/${FUL_NODE_NAME}/g" /appdynamics/MachineAgent/startMachineAgent.sh
source /appdynamics/env.sh && sed -i "s/AGENT_OPTIONS -Dappdynamics.agent.uniqueHostId=/AGENT_OPTIONS -Dappdynamics.controller.hostName=${CONTROLLER} -Dappdynamics.controller.port=${APPD_PORT} -Dappdynamics.agent.applicationName=${APP_NAME} -Dappdynamics.agent.accountName=customer1 -Dappdynamics.agent.accountAccessKey=${CTRLR_KEY} -Dappdynamics.agent.uniqueHostId=/g" /appdynamics/MachineAgent/startMachineAgent.sh
source /appdynamics/MachineAgent/startMachineAgent.sh

# Start Services
sudo service apache2 start

exit 0
