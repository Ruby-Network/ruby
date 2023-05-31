require 'sinatra'
require 'config'
require 'colorize'
require './ruby/utils.rb'
require './ruby/uv.rb'

set :root, File.dirname(__FILE__)
set :public_folder, File.join(settings.root, 'src', 'public')
set :views, File.join(settings.root, 'src', 'views')
register Config
set :logging, Settings.verboseLogging
set :show_exceptions, Settings.verboseLogging
# UV "middleware"
set :uvPath, File.join(settings.root, 'node_modules', '@titaniumnetwork-dev', 'ultraviolet', 'dist')
uvPath()

# Other routes
get '/' do 
  erb :index
end
