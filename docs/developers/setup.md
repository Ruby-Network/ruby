# Setting Up the Dev Environment

## Prerequisites 
- [Ruby](https://www.ruby-lang.org/en/downloads/) (>= 3.0.0) - Don't know how to install? Follow our [guide](../install-ruby.md)
- [Bundler](https://bundler.io/) - Don't know how to install? Follow our [guide](../install-ruby.md)
- [Node.JS](https://nodejs.org/en/) (>= 19.0.0)

## Setup
1. Clone the repository
```bash
git clone https://github.com/ruby-network/ruby 
```
2. Install the Ruby dependencies
```bash
bundle install 
```
3. Install the Node.JS dependencies
```bash
npm install
```

## Running the app
1. Run the Ruby server
```bash
bundle exec puma
```
This should also start the Node.JS server. If it doesn't, run the following command:
```bash
node index.js
```
