#!/bin/bash

#  This is a script to start the bundy_fulfillment server

# Set Controller variables
source /appdynamics/env.sh

# Complete App Agent config
/appdynamics/appdynamics-php-agent/install.sh -i /etc/php5/mods-available --ignore-permissions ${CONTROLLER} ${APPD_PORT} "Online Retail" Fulfillment Fulfillment-Node1
mv /appdynamics/runProxy /appdynamics/appdynamics-php-agent/proxy/
chmod 777 /appdynamics/appdynamics-php-agent/proxy/runProxy
chown -R appdynamics.appdynamics /appdynamics
php5enmod appdynamics_agent

# Start MachineAgent
#su - appdynamics -c 'source /appdynamics/env.sh && /appdynamics/MachineAgent/startMachineAgent.sh'
su - appdynamics -c "source /appdynamics/env.sh && sed -i 's/AGENT_OPTIONS -Dappdynamics.agent.uniqueHostId=/AGENT_OPTIONS -Dappdynamics.controller.hostName=${CONTROLLER} -Dappdynamics.controller.port=${APPD_PORT} -Dappdynamics.agent.uniqueHostId=/g' /appdynamics/MachineAgent/startMachineAgent.sh"
su - appdynamics -c 'source /appdynamics/MachineAgent/startMachineAgent.sh'

# Start Services
sudo service apache2 start

exit 0
