#!/bin/bash

# This is a startup script for the Bundy Java server

# Add entry to hosts file
sudo echo "127.0.0.1 www.shoewarehouse.com" >> /etc/hosts

# Startup
su - appdynamics -c "source /appdynamics/env.sh && sed -i 's#<controller-host></controller-host>#<controller-host>${CONTROLLER}</controller-host>#g' /appdynamics/AppServerAgent/ver4.0.0.0/conf/controller-info.xml"
su - appdynamics -c "source /appdynamics/env.sh && sed -i 's#<controller-port></controller-port>#<controller-port>${APPD_PORT}</controller-port>#g' /appdynamics/AppServerAgent/ver4.0.0.0/conf/controller-info.xml"
su - appdynamics -c '/appdynamics/demo/bin/startup.sh'
su - appdynamics -c '/appdynamics/slow/bin/startup.sh'

exit 0
