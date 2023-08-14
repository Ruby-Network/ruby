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
git clone https://github.com/ruby-network/ruby --recursive 
```
2. Setup Git 
```bash 
git update-index --assume-unchanged .bundle/config
```
3. Edit the Bundler config file
```bash 
nano .bundle/config
```
- Remove the line that says `BUNDLE_WITHOUT: "test:development"`
- EXAMPLE WITH THE LINE IN THE FILE
```config
---
BUNDLE_PATH: "vendor/"
BUNDLE_WITHOUT: "test:development"
```
- EXAMPLE WITH THE LINE REMOVED (the one we want)
```config
---
BUNDLE_PATH: "vendor/"
```

4. (Optional) Install the Ruby dependencies
    - NPM i *should* automatically install the Ruby dependencies, but if it doesn't, run this command
```bash
bundle install 
```
5. Install the Node.JS dependencies
```bash
npm install
```
6. Make the config file
```bash 
cp config/settings.example.yml config/settings.yml
```
7. Edit the config file
```bash 
nano config/settings.yml
```
- Change the `mainURL` to `http://localhost:9293/`
```yaml
mainURL: "http://localhost:9293/"
```

## Running the app
1. Run the Dev Server
```bash 
yarn dev
```
Or with `npm`
```bash 
npm run dev
```
- This should allow you to make changes to the code and see them live on the website. 
## Note: 
- If you are making changes to the Node Server, you will need to restart the server for the changes to take effect.
