FROM appdynamics/bundy_base

MAINTAINER Jeff Morgan (jeff.morgan@appdynamics.com)

################## BEGIN INSTALLATION ######################

RUN sed -i '/^-l/c\-l 0.0.0.0' /etc/memcached.conf

##################### INSTALLATION END #####################

# Expose Ports
EXPOSE 11211
EXPOSE 22

CMD service memcached start && tail -F /var/log/dmesg
