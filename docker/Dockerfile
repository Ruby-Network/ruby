FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./ 
COPY . .
# Installing Ruby
RUN apt update && apt install -y ruby-full
# Installing Bundler
RUN gem install bundler 
# Install Node.js dependencies
RUN npm install -g yarn --force
RUN yarn install
RUN yarn build
# Setup a basic configuration
RUN cp config/settings.example.yml config/settings.yml
# Mount config/settings.yml as a volume
VOLUME /usr/src/app/config/settings.yml
# Run the app
EXPOSE 9293
CMD yarn start
