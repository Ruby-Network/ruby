# Setting Up the Dev Environment

## Prerequisites 
- [Ruby](https://www.ruby-lang.org/en/downloads/) (>= 3.0.0) - Don't know how to install? Follow our [guide](../install-ruby.md)
- [Bundler](https://bundler.io/) - Don't know how to install? Follow our [guide](../install-ruby.md)
- [Node.JS](https://nodejs.org/en/) (>= 19.0.0)
- [GIT](https://git-scm.com/downloads)

## Optional Tools 
- If on Windows, [Git Bash](https://git-scm.com/downloads) is recommended (for running the commands) 

## Setup
1. Clone the repository
```bash
git clone https://github.com/ruby-network/ruby 
```
2. Setup Git 
```bash 
git update-index --assume-unchanged .bundle/config
```
3. Remove the .bundle directory
```bash
rm -rf .bundle
```
4. Install the Ruby dependencies
```bash
bundle install 
```
5. Install the Node.JS dependencies
```bash
npm install
```

## Running the app
1. Run the Dev Server
```bash 
yarn dev
```
- This should allow you to make changes to the code and see them live on the website. 
## Note: 
- If you are making changes to the Node Server, you will need to restart the server for the changes to take effect.
