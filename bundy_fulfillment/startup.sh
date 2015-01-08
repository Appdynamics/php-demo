#1/bin/bash

#  This is a script to start the bundy_fulfillment server

sudo service apache2 start
sudo service memcached start

# Start MachineAgent
su - appdynamics -c '/appdynamics/MachineAgent/startMachineAgent.sh'

exit 0
