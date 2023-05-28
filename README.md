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

Most of the config is done in [config/settings.yml](./config/settings.yml)

Here is a basic config:

```yml
barePort: 9293
verboseLogging: false
```

You will need to setup a basic config for this to work

- If you are lazy simply run 
```bash
$ cp config/settings.yml.example config/settings.yml
```

- If you aren't lazy and want more configuration options run the command above and then check [#options](#options)

### Starting

To start the application simply run 

```bash
bundle exec puma -e production
```

To change the default port run:

```bash
bundle exec puma -e production -p yourporthere
```


### FAQ

- Why do I need to run `npm i`?
    - Some packages such as [Ultraviolet](https://github.com/titaniumnetwork-dev/ultraviolet) and [Bare Server Node](https://github.com/tomphttp/bare-server-node) only use Node.JS and this project relies on them (for the most part)
- Why use the Ruby programming language?
    - Because why not!
