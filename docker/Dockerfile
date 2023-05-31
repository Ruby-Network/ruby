FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./ 
COPY . .
# Installing Ruby
RUN apt update && apt install -y ruby-full
# Installing Bundler
RUN gem install bundler 
# Install Node.js dependencies
RUN npm install 
# Install Ruby dependencies
RUN bundle install 
# Setup a basic configuration
RUN cp config/settings.example.yml config/settings.yml
# Run the app
EXPOSE 9293
CMD bundle exec puma -e production
