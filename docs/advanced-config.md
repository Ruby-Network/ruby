# Advanced Configuration

##### This provides a list of all the configuration options available to you.
##### The config file can be found [here](../config/settings.example.yml)

- `port` -  The port the Ruby server will run on. Default is `9293` (does not currently work)

- `verboseLogging` - Whether or not to log all requests to the console. Default is `false`

- `private` - Whether or not to enable private mode. Default is `false`

- `username` - The username for use in either, private instances. If it is a normal instance, username will always be `ruby`

- `password` - The password for use in either, private instances. If it is a normal instance, password will always be `ruby`

- `mainUrl` - The main URL for use in a normal instance. If you are trying to make a private instance set this value to anything or delete it.

- `multiuser` - Whether or not to enable multiuser mode. Default is `false` **ONLY WORKS IN PRIVATE MODE**

- `database` - A set of options for the database connection. **ONLY WORKS IN PRIVATE MODE AND MULTIUSER IS ENABLED, CURRENTLY ONLY SUPPORTS POSTGRESQL**
    - `host` - The host of the database. Default is `localhost`
    - `dbName` - The name of the database. Default is `ruby`
    - `username` - The username for the database. Default is `ruby`
    - `password` - The password for the database. Default is `ruby`

---
#### Options coming soon:
- `port` - Will be switched to `rubyPort` and will be the port the Ruby server will run on. Default is `9292`

- `nodePort` - Will be the port the Node server will run on. Default is `9293`
