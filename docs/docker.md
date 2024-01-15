# Local Setup (docker)

## Prerequisites

- Docker needs to be installed - Don't know how? Follow our [guide](./docker-install.md)

---
#### Through this whole thing I am going to assume you are using Linux. If you are not, the commands can be easily modified


## Options

1. Docker Compose [here](#docker-compose)
2. Docker Compose (build) [here](#docker-compose-build)
3. Standalone Docker (not recommended) [here](#standalone)

## Docker Compose

### Setup

1. Download our docker-compose.yml file [here](https://github.com/Ruby-Network/ruby/blob/main/docker/docker-compose.yml)

    Or alternatively `curl` the file
    ```bash
    curl https://raw.githubusercontent.com/Ruby-Network/ruby/main/docker/docker-compose.yml > docker-compose.yml
    ```
    Or with `wget`
    ```bash
    wget https://raw.githubusercontent.com/Ruby-Network/ruby/main/docker/docker-compose.yml
    ```

    Or just copy this config:
    ```yml
    version: "3"
    services:
      ruby:
        image: 'motortruck1221/ruby:latest'
        container_name: ruby
        restart: unless-stopped
        ports:
          # DO NOT CHANGE 9293
          - "your port here:9293"
        volumes:
          - ./config.yml:/usr/src/app/config/settings.yml
      
      # Uncomment the following lines if you want to use a database (multiuser mode)
      #db:
      #  image: postgres
      #  restart: unless-stopped
      #  environment:
      #    POSTGRES_PASSWORD: ruby
      #    POSTGRES_USER: ruby
      #    POSTGRES_DB: ruby 
      #  volumes:
      #    - ./db:/var/lib/postgresql/data
      
      # Uncomment the following lines if you want to use adminer (database management)
      #adminer:
      #  image: adminer
      #  restart: unless-stopped
      #  ports:
      #    - 8099:8080
    ```
2. Download our settings.example.yml file [here](https://github.com/ruby-network/ruby/tree/main/config/settings.example.yml)

Or alternatively `curl` the file
```bash
curl https://github.com/Ruby-Network/ruby/raw/main/config/settings.example.yml
```
Or with `wget`
```bash
wget https://github.com/Ruby-Network/ruby/raw/main/config/settings.example.yml
```
Or just copy this config:
```yml
port: 9293
verboseLogging: "false"
private: "false"
username: "ruby"
password: "ruby"
mainURL: "http://localhost:9293/"
```

3. Rename the settings.example.yml to config.yml
```bash
mv settings.example.yml config.yml
```

4. change the `your port here` to a port on your machine

### Running

Simply run 

```bash 
docker compose up -d
```

and voila it should be running!

## Docker Compose (build)

### Extra requirements
- Git 

### Setup 

1. `git clone` the repo 
```bash 
git clone https://github.com/ruby-network/ruby --recursive
```
2. Copy docker-compose.build.yml to the main folder
```bash 
cp docker/docker-compose.build.yml ./docker-compose.yml
```
3. Copy the Docker file to the main folder 
```bash 
cp docker/Dockerfile .
```
4. Copy the settings.example.yml file to the main folder 
```bash
cp config/settings.example.yml ./config.yml
```

5. Edit the `your port here` to a port that is available on your machine 

### Running 

1. After setting up the repo properly run 
```bash 
docker build && docker compose up -d
```

2. It should build the docker image and execute it starting the app!

## Standalone 

**THIS IS NOT RECOMMENDED**

### Running 

1. Download the settings.example.yml file [here](https://github.com/ruby-network/ruby/tree/main/config/settings.example.yml) 

Alternatively `curl` the file
```bash
curl https://github.com/Ruby-Network/ruby/raw/main/config/settings.example.yml
```
Or with `wget`
```bash
wget https://github.com/Ruby-Network/ruby/raw/main/config/settings.example.yml
```

Or just copy this config:
```yml
port: 9293
verboseLogging: "false"
private: "false"
username: "ruby"
password: "ruby"
mainURL: "http://localhost:9293/"
```

2. Rename it to config.yml
```bash
mv settings.example.yml config.yml
```

3. Run the command 
```bash
docker run -d -p <your port here>:9293 --restart unless-stopped --name ruby -v ./config.yml:/usr/src/app/config/settings.yml ghcr.io/ruby-network/ruby
```
