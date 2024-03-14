FROM node:latest as normal
WORKDIR /usr/src/app
COPY package*.json ./ 
COPY . .
# Installing Ruby
RUN apt update && apt install -y ruby-full
# Installing Bundler
RUN gem install bundler 
# Installing pnpm
RUN npm install -g pnpm
RUN pnpm install
RUN make bare-module 
# Setup a basic configuration
RUN cp config/settings.example.yml config/settings.yml
# Mount config/settings.yml as a volume
VOLUME /usr/src/app/config/
# Run the app
EXPOSE 9293
CMD ["pnpm", "start"]

FROM node:latest as jruby
WORKDIR /usr/src/app
COPY package*.json ./ 
COPY . .
# Installing Ruby and JRuby, and JRE
RUN apt update && apt install -y ruby-full rbenv default-jre
# Install jruby 
RUN rbenv install jruby-9.3.4.0
# Set jruby as the default ruby version
RUN rbenv global jruby-9.3.4.0
# Installing Bundler 
RUN gem install bundler 
# Installing pnpm 
RUN npm install -g pnpm
RUN pnpm install 
RUN make bare-module
# Setup a basic configuration
RUN cp config/settings.example.yml config/settings.yml
# Mount config/settings.yml as a volume 
VOLUME /usr/src/app/config/
# Run the app
EXPOSE 9293
CMD ["pnpm", "start"]

FROM ghcr.io/graalvm/truffleruby-community:23.1.2-debian as truffleruby
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
# Installing Ruby and Node.js
RUN apt update && apt install -y ruby-full libpq-dev
#Install NVM
RUN touch ~/.bashrc
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash 
RUN source ~/.bashrc
RUN export NVM_DIR="$HOME/.nvm"
RUN [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
RUN [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
RUN nvm install node 
RUN nvm use node
RUN gem install bundler 
# Installing pnpm
RUN npm install -g pnpm
RUN pnpm install 
RUN make bare-module
# Setup a basic configuration
RUN cp config/settings.example.yml config/settings.yml
# Mount config/settings.yml as a volume 
VOLUME /usr/src/app/config/
# Run the app
EXPOSE 9293
CMD ["pnpm", "start"]
