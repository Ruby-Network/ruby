# Ruby (V3)

## This version of Ruby focuses on customization whilst also trying to be fast

## Setup

### Prerequisites
- Make sure you have [NODE and NPM](https://nodejs.org) installed
- Make sure you have the [Ruby](https://ruby-lang.org) programming language installed
- Make sure you have [Bundler](https://bundler.io) installed

### Install dependencies

```bash
$ bundle 
```

```bash
$ npm i
```

### Configuration

Most of the config is done in [config/settings.yml](./config/settings.yml.example)

Here is a basic config:

```yml
port: 9293
verboseLogging: false
```

You will need to setup a basic config for this to work

- If you are lazy simply run 
```bash
$ cp config/settings.example.yml config/settings.yml
```

- If you aren't lazy and want more configuration options run the command above and then check [#options](#options)

### Starting

To start the application simply run 

```bash
bundle exec puma -e production
```

To change the default port on the Ruby server run:

```bash
bundle exec puma -e production -p yourporthere
```

If you are on linux/macos you can also customize the amount of workers/threads you have

```bash 
bundle exec puma -e production -w amount-of-threads
```

An example with all of them would be:

```bash 
bundle exec puma -e production -w 3 -p 8080
```

To change the port on the Node.JS side simply edit the [settings.yml](./config/settings.example.yml)


### FAQ

- Why do I need to run `npm i`?
    - Due to us depending on [Ultraviolet](https://github.com/titaniumnetwork-dev/ultraviolet) and [Bare Server Node](https://github.com/tomphttp/bare-server-node) we need to run the inital app with express, and some middleware
- Why use Ruby?
   - Because why not!
