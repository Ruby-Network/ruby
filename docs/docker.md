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

1. Download our docker-compose.yml file [here](https://github.com/Ruby-Network/ruby-v3/blob/main/docker/docker-compose.yml)

    Or alternatively `curl` the file
    ```bash
    command here when repo goes public
    ```

    Or just copy this config:
    ```yml
    version: '2'
    services:
        ruby:
            restart: unless-stopped
            image: 'ghcr.io/ruby-network/ruby:main'
            ports:
                #DO NOT CHANGE 9293!
                - your port here:9293
    #networks:
    #  default:
    #    external:
    #      name: default_net
    ```
2. change the `your port here` to a port on your machine

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
git clone https://github.com/ruby-network/ruby
```
2. Copy docker-compose.build.yml to the main folder
```bash 
cp docker/docker-compose.build.yml ./docker-compose.yml
```
3. Copy the Docker file to the main folder 
```bash 
cp docker/Dockerfile .
```
5. Edit the `your port here` to a port that is available on your machine 

### Running 

1. After setting up the repo properly run 
```bash 
docker compose up -d
```

2. It should build the docker image and execute it starting the app!

## Standalone 

**THIS IS NOT RECOMMENDED**

### Running 

1. Run the command 
```bash
docker run -d -p <your port here>:9293 --restart unless-stopped --name ruby ghcr.io/ruby-network/ruby
```
