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

# Start services
sudo cron -f &
sudo service apache2 start
sudo service memcached start

# Start MachineAgent
su - appdynamics -c '/appdynamics/MachineAgent/startMachineAgent.sh'

exit 0
