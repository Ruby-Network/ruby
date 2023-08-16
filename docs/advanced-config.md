# Advanced Configuration

##### This provides a list of all the configuration options available to you.
##### The config file can be found [here](../config/settings.example.yml)

`port` -  The port the Ruby server will run on. Default is `9293`

`verboseLogging` - Whether or not to log all requests to the console. Default is `false`

`private` - Whether or not to enable private mode. Default is `false`

`username` - The username for use in either, private instances. If it is a normal instance, username will always be `ruby`

`password` - The password for use in either, private instances. If it is a normal instance, password will always be `ruby`

`mainUrl` - The main URL for use in a normal instance. If you are trying to make a private instance set this value to `NA`

---
#### Options coming soon:
`port` - Will be switched to `rubyPort` and will be the port the Ruby server will run on. Default is `9292`

`nodePort` - Will be the port the Node server will run on. Default is `9293`
