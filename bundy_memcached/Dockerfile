FROM appdynamics/bundy_base

MAINTAINER Jeff Morgan (jeff.morgan@appdynamics.com)

################## BEGIN INSTALLATION ######################

# Note:  Everything has been installed in appdynamics/bundy_base

##################### INSTALLATION END #####################

# Expose Ports
EXPOSE 11211
EXPOSE 22

CMD service memcached start && tail -F /var/log/dmesg
