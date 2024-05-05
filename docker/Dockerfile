FROM node:latest as node
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
RUN make 
# Setup a basic configuration
RUN cp config/settings.example.yml config/settings.yml
# Mount config/settings.yml as a volume
VOLUME /usr/src/app/config/
# Run the app
EXPOSE 9293
EXPOSE 9294
ENTRYPOINT [  "bundle", "exec", "ruby", "cli/cli.rb", "start", "--node" ]

FROM node:latest as jruby-node
WORKDIR /usr/src/app
COPY package*.json ./ 
COPY . .
# Installing Ruby and JRuby, and JRE
RUN apt update && apt install -y ruby-full rbenv default-jre netbase
# Install jruby 
RUN rbenv install jruby-9.3.4.0
# Set jruby as the default ruby version
RUN rbenv global jruby-9.3.4.0
RUN rbenv local jruby-9.3.4.0
# Installing Bundler 
RUN gem install bundler 
# Installing pnpm 
RUN npm install -g pnpm
RUN pnpm install 
RUN make
# Setup a basic configuration
RUN cp config/settings.example.yml config/settings.yml
# Mount config/settings.yml as a volume 
VOLUME /usr/src/app/config/
# Run the app
EXPOSE 9293
EXPOSE 9294
ENTRYPOINT [ "bundle", "exec", "ruby", "cli/cli.rb", "start", "--node" ]

FROM ghcr.io/graalvm/truffleruby-community:24-debian as truffleruby-node
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
# Installing Ruby and Node.js
RUN apt update && apt install -y ruby-full libpq-dev nodejs npm
RUN gem install bundler 
# Installing pnpm
RUN npm install -g pnpm
RUN pnpm install 
RUN make
# Setup a basic configuration
RUN cp config/settings.example.yml config/settings.yml
# Mount config/settings.yml as a volume 
VOLUME /usr/src/app/config/
# Run the app
EXPOSE 9293
EXPOSE 9294
ENTRYPOINT [ "bundle", "exec", "ruby", "cli/cli.rb", "start", "--node" ]

FROM ruby:alpine3.19 as normal
WORKDIR /usr/src/app
COPY . .
COPY node_modules/ node_modules/
RUN apk add --no-cache build-base libxml2-dev libxslt-dev postgresql-dev
RUN bundle install
RUN cp config/settings.example.yml config/settings.yml
VOLUME /usr/src/app/config/
EXPOSE 9293
ENTRYPOINT [ "bundle", "exec", "ruby", "cli/cli.rb", "start" ]

FROM jruby:latest as jruby 
WORKDIR /usr/src/app
COPY . .
COPY node_modules/ node_modules/
RUN apt update && apt install -y libpq-dev netbase
RUN bundle install
RUN cp config/settings.example.yml config/settings.yml
VOLUME /usr/src/app/config/
EXPOSE 9293
ENTRYPOINT [ "bundle", "exec", "ruby", "cli/cli.rb", "start" ]

FROM ghcr.io/graalvm/truffleruby-community:24-debian as truffleruby
WORKDIR /usr/src/app
COPY . .
COPY node_modules/ node_modules/
RUN apt update && apt install -y libpq-dev
RUN bundle install
RUN cp config/settings.example.yml config/settings.yml
VOLUME /usr/src/app/config/
EXPOSE 9293
ENTRYPOINT [ "bundle", "exec", "ruby", "cli/cli.rb", "start" ]
