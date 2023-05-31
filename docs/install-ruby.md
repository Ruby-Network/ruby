# Ruby & Bundler installation
## Jump to:
[Installing Ruby](#ruby-installation)

[Installing Bundler](#bundler-installation)
## Ruby Installation
For more info besides these very basic steps visit https://www.ruby-lang.org/en/downloads/
### Windows

1. Visit https://rubyinstaller.org
2. Click the big red Download button
3. Click the top most button (e.g Ruby+Devkit 3.2.2-1 (x64))
4. Open the downloaded file and run it 

### Linux

I am going to assume you are using Ubuntu 

1. Run
```bash
sudo apt update
```
2. Install Ruby 
```bash 
sudo apt install ruby-full
```

3. Ruby Should be installed!

## Bundler Installation
For more info besides these very basic steps visit https://bundler.io

### Requirements:
- You must have [Ruby](https://ruby-lang.org) 3.0 or above installed

### Windows

1. Open **Powershell** not **Command Prompt** this is *extremely important*
2. Inside powershell simply run 
```powershell 
gem install bundler 
```
### Linux 
 
Once again, I am going to assume you are using Ubuntu

1. Open a terminal
2. Run:
```bash 
gem install bundler 
```
