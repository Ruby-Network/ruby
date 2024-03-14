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

FROM node:latest as truffleruby
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
# Installing Ruby and TruffleRuby 
RUN apt update && apt install -y ruby-full rbenv
RUN rbenv install ruby --list
# Install truffleruby 
RUN rbenv install truffleruby+graalvm-22.1.0
# Set truffleruby as the default ruby version
RUN rbenv global truffleruby+graalvm-22.1.0
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
