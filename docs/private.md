# Private Instance

## Notes
- I am expecting you to be using Linux. If you are not the commands should be easily translatable to the shell you are using 

## No Docker (one user)

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
    multiuser: "false"
    ```
6. Start the server
    ```bash
    npm start
    ```
7. You should now be able to access your instance at `http://localhost:9293`

## Docker (one user)

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
    multiuser: "false"
    ```
3. Follow the commands in the [docker instance](./docker.md) guide depending on what docker method you used
    - Docker Compose [here](./docker.md#docker-compose)
    - Docker Compose (build) [here](./docker.md#docker-compose-build)
    - Standalone Docker (not recommended) [here](./docker.md#standalone) **NOT RECOMMENDED**

3a. Simply omit the step where it tells you to make a config.yml file (as you have already done that)

## No Docker (multiuser) - **NOT SUPPORTED**
This is not supported due to the fact that everyones setup is different.
Here is a list of things you will need to do:
- Setup a database (Postgresql)
- Setup ruby to use multiuser mode

**Use docker if you want multiuser mode [here](./private.md#docker-multiuser)**

## Docker (multiuser)

#### Prerequisites
- Docker needs to be installed - Don't know how? Follow our [guide](./docker-install.md)

---

##### Most of the commands are the same as the ones in a public [docker instance](./docker.md)

1. Make a config.yml file
    ```bash
    nano config.yml
    ```

2. To make a private instance with multiuser the file should look something like this:
    ```yml
    port: 9293 #currently does nothing, but will be used in the future
    verboseLogging: "false" #change this to "true" to enable verbose logging
    private: "true" #change this to "true" to enable private mode
    username: "yourUsername" #change this to your username (when using private mode)
    password: "yourPassword" #change this to your password (when using private mode)

    multiuser: "true" # set to true to enable multiuser mode when using private mode (if not using private mode, this will be ignored)

    database:
        #The db defaults should not be changed when using docker (unless you know what you are doing)
        username: "ruby" # change this to your database username
        password: "ruby" # change this to your database password
        host: "db" # change this to your database host
        dbname: "ruby" # change this to your database name
    ```
3. Follow the commands in the [docker instance](./docker.md) guide depending on what docker method you used. **Make sure you uncomment the database section of the file**
    - Docker Compose [here](./docker.md#docker-compose)
    - Docker Compose (build) [here](./docker.md#docker-compose-build)
    - Standalone Docker (not recommended) [here](./docker.md#standalone) **NOT SUPPORTED**

3a. Simply omit the step where it tells you to make a config.yml file (as you have already done that)

3b. For multiuser mode, we provide a set of CLI commands to manage users. You can find them [here](./multiuser.md)
