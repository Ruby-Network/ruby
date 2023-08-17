FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./ 
COPY . .
# Installing Ruby
RUN apt update && apt install -y ruby-full
# Installing Bundler
RUN gem install bundler 
RUN yarn install
# Setup a basic configuration
RUN cp config/settings.example.yml config/settings.yml
# Mount config/settings.yml as a volume
VOLUME /usr/src/app/config/settings.yml
# Special exec command to detect if settings.yml is mounted as a volume 
ENTRYPOINT ["bash -c 'if [ ! -f config/settings.yml ]; then cp config/settings.example.yml config/settings.yml; fi;'"]
# Run the app
EXPOSE 9293
CMD yarn start
