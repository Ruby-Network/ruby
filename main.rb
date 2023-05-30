require 'sinatra'
require 'config'
require 'colorize'
require 'rack-proxy'
require './ruby/utils.rb'
require './ruby/bare.rb'
require './ruby/uv.rb'

set :root, File.dirname(__FILE__)
set :uvPath, File.join(settings.root, 'node_modules', '@titaniumnetwork-dev', 'ultraviolet', 'dist')
set :public_folder, File.join(settings.root, 'src', 'public')
set :views, File.join(settings.root, 'src', 'views')
register Config
set :logging, Settings.verboseLogging
set :show_exceptions, Settings.verboseLogging
# Setup BareServer reverse proxy, and UV file routes
use BareServer
uvPath()

# Other routes
get '/' do 
  erb :index
end
