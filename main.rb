require 'sinatra'
require 'config'
set :root, File.dirname(__FILE__)
#Register all settings in config/settings.yml
register Config
set :logging, Settings.verboseLogging

get '/' do
  "Hello World!"
end
