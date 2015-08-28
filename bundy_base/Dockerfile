FROM ubuntu

MAINTAINER Jeff Morgan (jeff.morgan@appdynamics.com)

################## BEGIN INSTALLATION ######################

# Update the repository sources list
RUN apt-get update

# Install Packages
RUN apt-get -y install vim
RUN apt-get -y install unzip
RUN apt-get -y install git
RUN apt-get -y install nmap
RUN apt-get -y install apache2
RUN apt-get -y install memcached
RUN apt-get -y install php5
RUN apt-get -y install php5-dev
RUN apt-get -y install php-pear
RUN apt-get -y install php5-mysql
RUN apt-get -y install php5-memcached
RUN apt-get -y install php5-memcache
RUN apt-get -y install php5-json
RUN apt-get -y install php5-curl
RUN apt-get -y install tar
RUN apt-get -y install gzip

# Add appdynamics user and set permissions
RUN groupadd -r appdynamics
RUN useradd --create-home --gid appdynamics appdynamics
RUN mkdir -p /appdynamics
#RUN chown -R appdynamics:appdynamics /appdynamics

# Change permissions to /var/www/
#RUN chown -R appdynamics.appdynamics /var/www

# Enable apache mod rewrite
RUN a2enmod rewrite

# Update PHP timezone
RUN sed -i 's/^;date.timezone =/date.timezone = \"UTC\"/g' /etc/php5/apache2/php.ini

##################### INSTALLATION END #####################

# Expose Ports
EXPOSE 80
EXPOSE 22
EXPOSE 11211
