# Deploying locally (without docker)

## Prerequisites

- [Node.JS](https://nodejs.org)
- [Ruby](https://ruby-lang.org) v3.0 or higher - Not Sure How to install? Follow our [guide](./install-ruby.md#ruby-installation)
- [Bundler](https://bundler.io) - Not Sure How to install? Follow our [guide](./install-ruby.md#bundler-installation)

##  Dependency setup

After you have all the [prerequisites](#prerequisites) you'll need to install some dependencies

I am assuming you are using Linux

1. Run the command below to install the Ruby dependencies
```bash
bundler 
```
2. Run the command below to install the Node.JS dependencies 
```bash 
npm i
```

## Starting

To start the app for the first time you will need to do a few things

1. Run the command below to make a settings.yml file
```bash
cp config/settings.example.yml config/settings.yml
```
This makes a basic configuration file required by both our Node.JS server and our Ruby server

For a more advanced config visit the [Advanced Config](./advanced-config.yml) page

2. Run the command below to start the app
```bash
bundle exec puma
```

After this you should only need to run step 2

## Questions?
- Visit our [FAQ](./faq.yml)
