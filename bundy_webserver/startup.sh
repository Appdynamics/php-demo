#!/bin/bash

# This is a starup script for the Bundy Java server

# Edit hosts file
sudo echo "127.0.0.1 www.visa.com" >> /etc/hosts
sudo echo "127.0.0.1 www.fedex.com" >> /etc/hosts
sudo echo "127.0.0.1 payment.visa.com" >> /etc/hosts
sudo echo "127.0.0.1 api.fedex.com" >> /etc/hosts
sudo echo "127.0.0.1 static.twitter.com" >> /etc/hosts
sudo echo "54.190.170.102 static.facebook.com" >> /etc/hosts
sudo echo "54.190.170.102 cdn.bundyshoes.com" >> /etc/hosts

# Set Controller variables
source /appdynamics/env.sh

# Complete App Agent config
/appdynamics/appdynamics-php-agent/install.sh -i /etc/php5/mods-available --ignore-permissions ${CONTROLLER} ${APPD_PORT} "Online Retail" Commerce Commerce-Node1
mv /appdynamics/runProxy /appdynamics/appdynamics-php-agent/proxy/
chmod 777 /appdynamics/appdynamics-php-agent/proxy/runProxy
chown -R appdynamics.appdynamics /appdynamics
php5enmod appdynamics_agent

# Input EUM Key in parameters.yml
su - appdynamics -c "source /appdynamics/env.sh && sed -i '/eum_key/c\      eum_key:           ${EUM_KEY}' /var/www/html/demoapp/Symfony/app/config/parameters.yml"

# Start MachineAgent
su - appdynamics -c "source /appdynamics/env.sh && sed -i 's/AGENT_OPTIONS -Dappdynamics.agent.uniqueHostId=/AGENT_OPTIONS -Dappdynamics.controller.hostName=${CONTROLLER} -Dappdynamics.controller.port=${APPD_PORT} -Dappdynamics.agent.uniqueHostId=/g' /appdynamics/MachineAgent/startMachineAgent.sh"
su - appdynamics -c 'source /appdynamics/MachineAgent/startMachineAgent.sh'

# Set crontab
su - appdynamics -c 'crontab /appdynamics/cron.conf'

# Start services
cron -f &
source /etc/apache2/envvars && /usr/sbin/apache2 -D FOREGROUND

exit 0
