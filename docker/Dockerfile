FROM node:latest
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
