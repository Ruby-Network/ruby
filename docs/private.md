# Private Instance

## Notes
- I am expecting you to be using Linux. If you are not the commands should be easily translatable to the shell you are using 

## No Docker

#### Prerequisites
- Ruby needs to be installed - Don't know how? Follow our [guide](./install-ruby.md)
- Git
- Node.js

### Setup
1. Clone the repo
    ```bash
    git clone https://github.com/ruby-network/ruby --recursive 
    ```
2. Install dependencies
    ```bash
    cd ruby && npm i
    ```
3. Copy the example config
    ```bash
    cp config/settings.example.yml config/settings.yml
    ```
4. Open the config with your favorite editor
    ```bash
    nano config/settings.yml
    ```
5. To make a private instance the file should look something like this:
    ```yml
    port: 9293
    verboseLogging: "false"
    private: "true"
    username: "your username"
    password: "your password"
    # DO NOT CHANGE THE VALUE BELOW
    mainURL: "NA"
    ```
6. Start the server
    ```bash
    npm start
    ```
7. You should now be able to access your instance at `http://localhost:9293`

## Docker

#### Prerequisites
- Docker needs to be installed - Don't know how? Follow our [guide](./docker-install.md)

---

##### Most of the commands are the same as the ones in a public [docker instance](./docker.md)

1. Make a config.yml file
    ```bash
    nano config.yml
    ```
2. To make a private instance the file should look something like this:
    ```yml
    port: 9293
    verboseLogging: "false"
    private: "true"
    username: "your username"
    password: "your password"
    # DO NOT CHANGE THE VALUE BELOW
    mainURL: "NA"
    ```
3. Follow the commands in the [docker instance](./docker.md) guide depending on what docker method you used
    - Docker Compose [here](./docker.md#docker-compose)
    - Docker Compose (build) [here](./docker.md#docker-compose-build)
    - Standalone Docker (not recommended) [here](./docker.md#standalone)

3a. Simply omit the step where it tells you to make a config.yml file (as you have already done that)
