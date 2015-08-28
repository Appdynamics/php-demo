FROM appdynamics/bundy_base

MAINTAINER Jeff Morgan (jeff.morgan@appdynamics.com)

################## BEGIN INSTALLATION ######################

# Configure Apache
ADD /bundydownstream.conf /etc/apache2/sites-available/
RUN chmod 644 /etc/apache2/sites-available/bundydownstream.conf
RUN a2dissite 000-default.conf
RUN a2ensite bundydownstream.conf

# Install App
ADD /bundydownstream.zip /appdynamics/bundydownstream.zip
RUN unzip -o -d /var/www /appdynamics/bundydownstream.zip
ADD /main.yml /var/www/bundydownstream/config/
#RUN chown -R appdynamics.appdynamics /var/www

# Install bits and setup install for AppD Agent
ADD /appdynamics-php-agent-x64-linux.tar.bz2 /appdynamics/
RUN chmod -R 777 /appdynamics/appdynamics-php-agent
ADD /runProxy /appdynamics/

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
#RUN chown -R appdynamics.appdynamics /appdynamics

# Add startup script
ADD /startup.sh /appdynamics/
RUN chmod 777 /appdynamics/startup.sh
ADD /env.sh /appdynamics/
RUN chmod 777 /appdynamics/env.sh
#RUN chown -R appdynamics.appdynamics /appdynamics

##################### INSTALLATION END #####################

# Expose Ports
EXPOSE 80
EXPOSE 22

CMD /appdynamics/startup.sh && tail -F /var/log/dmesg
