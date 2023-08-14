# Deploying locally (without docker)

#### NOTE: This sets up a *public* instance if you want a *private* instance the instructions are located [here](./private.md)

## Prerequisites

- [Node.JS](https://nodejs.org)
- [Ruby](https://ruby-lang.org) v3.0 or higher - Not Sure How to install? Follow our [guide](./install-ruby.md#ruby-installation)
- [Bundler](https://bundler.io) - Not Sure How to install? Follow our [guide](./install-ruby.md#bundler-installation)

##  Dependency setup

After you have all the [prerequisites](#prerequisites) you'll need to install some dependencies

I am assuming you are using Linux

1. Clone the repo
```bash
git clone https://ruby-network/ruby --recursive
```

2. (Optional) Run the command below to install the Ruby dependencies
    - `npm i` *should* do this for you but if it doesn't you can run the command below
```bash
bundler 
```
3. Run the command below to install the Node.JS dependencies 
```bash 
npm i
```

## Starting

To start the app for the first time you will need to do a few things

1. Run the command below to make a settings.yml file
```bash
cp config/settings.example.yml config/settings.yml
```

2. Edit the `config/settings.yml` file with a URL
    - NOTE: if you don't have a URL you want to use you can simply set any arbitrary url
```yaml
# config/settings.yml 
mainURL: "https://example.com/"
```
This makes a basic configuration file required by both our Node.JS server and our Ruby server

For a more advanced config visit the [Advanced Config](./advanced-config.yml) page

3. Run the command below to start the app
```bash
npm start
```

After this you should only need to run step 2

## Questions?
- Visit our [FAQ](./faq.md)
