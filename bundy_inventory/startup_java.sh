#!/bin/bash

# This is a starup script for the Bundy Java server

# Tar the necessary files (didn't work in Dockerfile)
sudo echo "127.0.0.1 www.shoewarehouse.com" >> /etc/hosts

# Startup
su - appdynamics -c '/appdynamics/demo/bin/startup.sh'
su - appdynamics -c '/appdynamics/slow/bin/startup.sh'

exit 0
