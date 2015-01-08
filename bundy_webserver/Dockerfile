FROM bundy_base

MAINTAINER Jeff Morgan (jeff.morgan@appdynamics.com)

################## BEGIN INSTALLATION ######################

# Add hosts and cron files
ADD /bundy.cron /etc/cron.daily/
RUN chmod 755 /etc/cron.daily/bundy.cron

# Configure Apache
ADD /bundyonlineshoes.conf /etc/apache2/sites-available/
RUN chmod 644 /etc/apache2/sites-available/bundyonlineshoes.conf
RUN a2dissite 000-default.conf
RUN a2ensite bundyonlineshoes.conf

# Install App
ADD /bundyshoes.zip /appdynamics/bundyshoes.zip
RUN unzip -o -d /var/www/html /appdynamics/bundyshoes.zip
RUN rm -rf /var/www/html/demoapp/Symfony/app/cache/prod/*
RUN chmod -R 777 /var/www/html/demoapp/Symfony/app
#ADD /adrum_staging.js /var/www/html/demoapp/Symfony/web/js/adrum.js
#RUN chmod 644 /var/www/html/demoapp/Symfony/web/js/adrum.js
ADD /parameters.yml /var/www/html/demoapp/Symfony/app/config/
RUN chown -R appdynamics.appdynamics /var/www

# Install AppD Agent
ADD /appdynamics-php-agent_3930.zip /appdynamics/
RUN unzip -d /appdynamics /appdynamics/appdynamics-php-agent_3930.zip
RUN chmod -R 777 /appdynamics/appdynamics-php-agent
RUN /appdynamics/appdynamics-php-agent/install.sh -i /etc/php5/mods-available --ignore-permissions 54.190.155.157 8090 "Online Retail" Commerce Commerce-Node1
ADD /runProxy /appdynamics/appdynamics-php-agent/proxy/
RUN chmod 777 /appdynamics/appdynamics-php-agent/proxy/runProxy
RUN chown -R appdynamics.appdynamics /appdynamics
RUN php5enmod appdynamics_agent

# Install Machine Agent
ADD /MachineAgent-3.9.3.0.zip /appdynamics/
RUN mkdir /appdynamics/MachineAgent
RUN unzip -o -d /appdynamics/MachineAgent /appdynamics/MachineAgent-3.9.3.0.zip
ADD /ma_controller-info.xml /appdynamics/MachineAgent/conf/controller-info.xml
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
RUN chown -R appdynamics.appdynamics /appdynamics

# Add startup script
ADD /startup.sh /appdynamics/
RUN chmod 777 /appdynamics/startup.sh
RUN chown -R appdynamics.appdynamics /appdynamics

##################### INSTALLATION END #####################

# Expose Ports
EXPOSE 80
EXPOSE 22

CMD /appdynamics/startup.sh && tail -F /var/log/syslog
