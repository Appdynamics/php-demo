FROM ubuntu:latest

MAINTAINER Rob Bolton <rbolton@appdynamics.com>

# Install Node.js
RUN   \
  apt-get install -y wget && \
  cd /opt && \
  wget http://nodejs.org/dist/v0.10.28/node-v0.10.28-linux-x64.tar.gz && \
  tar -xzf node-v0.10.28-linux-x64.tar.gz && \
  mv node-v0.10.28-linux-x64 node && \
  cd /usr/local/bin && \
  ln -s /opt/node/bin/* . && \
  rm -f /opt/node-v0.10.28-linux-x64.tar.gz

RUN npm install -g forever

COPY . /src

RUN cd /src; npm install

CMD ["forever", "/src/index.js"]

