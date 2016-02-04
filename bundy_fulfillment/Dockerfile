FROM appdynamics/bundy_base

MAINTAINER Jeff Morgan (jeff.morgan@appdynamics.com)

################## BEGIN INSTALLATION ######################

# Configure Apache
ADD /bundydownstream.conf /etc/apache2/sites-available/
RUN chmod 644 /etc/apache2/sites-available/bundydownstream.conf
RUN a2dissite 000-default.conf
RUN a2ensite bundydownstream.conf

# Install App
ADD /src/bundydownstream /var/www/bundydownstream
ADD /main.yml /var/www/bundydownstream/config/

# Install bits and setup install for AppD Agent
ADD /appdynamics-php-agent-x64-linux.tar.bz2 /appdynamics/
RUN chmod -R 777 /appdynamics/appdynamics-php-agent

# Install Machine Agent
ADD /MachineAgent.zip /appdynamics/
RUN mkdir /appdynamics/MachineAgent
RUN unzip -o -d /appdynamics/MachineAgent /appdynamics/MachineAgent.zip
ADD /startMachineAgent.sh /appdynamics/MachineAgent/
RUN chmod 777 /appdynamics/MachineAgent/startMachineAgent.sh
ADD /killMachineAgent.sh /appdynamics/MachineAgent/
RUN chmod 777 /appdynamics/MachineAgent/killMachineAgent.sh
ADD /restartApache.sh /appdynamics/MachineAgent/local-scripts/
RUN chmod 777 /appdynamics/MachineAgent/local-scripts/restartApache.sh
ADD /ApacheMonitor.zip /appdynamics/MachineAgent/
RUN unzip -o -d /appdynamics/MachineAgent/monitors /appdynamics/MachineAgent/ApacheMonitor.zip
ADD /task.properties /appdynamics/MachineAgent/monitors/ApacheMonitor/
RUN chmod -R 777 /appdynamics/MachineAgent/monitors/ApacheMonitor
ADD /MemcachePHPMonitor.zip /appdynamics/MachineAgent/
RUN unzip -o -d /appdynamics/MachineAgent/monitors /appdynamics/MachineAgent/MemcachePHPMonitor.zip
RUN chmod -R 777 /appdynamics/MachineAgent/monitors/MemcachePHPMonitor

# Add startup script
ADD /startup.sh /appdynamics/
RUN chmod 777 /appdynamics/startup.sh
ADD /env.sh /appdynamics/
RUN chmod 777 /appdynamics/env.sh

# Configure Log Analytics
ADD configAnalytics.sh /
RUN chmod 777 /configAnalytics.sh
ADD bundy_fulfillment-error-log.job /appdynamics/MachineAgent/monitors/analytics-agent/conf/job/
ADD bundy_fulfillment-access-log.job /appdynamics/MachineAgent/monitors/analytics-agent/conf/job/

##################### INSTALLATION END #####################

# Expose Ports
EXPOSE 80
EXPOSE 22

CMD /appdynamics/startup.sh && tail -F /var/log/dmesg
