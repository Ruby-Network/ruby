require 'sinatra'
require 'config'
require 'colorize'
require 'rack-proxy'
require './ruby/utils.rb'
require './ruby/bare.rb'

set :root, File.dirname(__FILE__)
set :uvPath, File.join(settings.root, 'node_modules', '@titaniumnetwork-dev', 'ultraviolet', 'dist')
set :public_folder, File.join(settings.root, 'src', 'public')
set :views, File.join(settings.root, 'src', 'views')
register Config
set :logging, Settings.verboseLogging
set :show_exceptions, Settings.verboseLogging
use BareServer
# Other routes
get '/' do 
  erb :index
end

get '/uv/*' do
  #if the file exists :uvPath send it (exclude uv.config.js)
  if params[:splat][0] == 'uv.config.js'
    send_file File.join(settings.public_folder, 'js', 'uv', params[:splat][0])
  elsif File.exists?(File.join(settings.uvPath, params[:splat][0]))
    send_file File.join(settings.uvPath, params[:splat][0])
  else
    #if the file isn't found from their send it from ours
    send_file File.join(settings.public_folder, 'js', 'uv', params[:splat][0])
  end
end

