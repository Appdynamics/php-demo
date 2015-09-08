FROM ubuntu

MAINTAINER Jeff Morgan (jeff.morgan@appdynamics.com)

################## BEGIN INSTALLATION ######################

# Update the repository sources list
RUN apt-get update

# Install Packages
RUN apt-get -y install mysql-server
RUN apt-get -y install python-mysqldb
RUN apt-get -y install openssh-server

# Setup SSH
RUN mkdir /var/run/sshd
RUN echo 'root:welcome1' | chpasswd
RUN sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN /etc/init.d/ssh start

# Configure MySQL
RUN sed -i '/^bind-address/c\bind-address=0.0.0.0' /etc/mysql/my.cnf

# Add DB files (using root)
ADD /store.sql /root/
ADD /crm.sql /root/
ADD /fulfillment.sql /root/
ADD /crm-sprocs.sql /root/

# Add startup script
ADD /startup.sh /root/
RUN chmod 777 /root/startup.sh
RUN chown -R root.root /root/

##################### INSTALLATION END #####################

# Expose Ports
EXPOSE 3306
EXPOSE 22

CMD /root/startup.sh && tail -F /var/log/mysql/error.log
