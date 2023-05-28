require 'sinatra'
require 'config'
require './ruby/utils.rb'
set :root, File.dirname(__FILE__)
set :uvPath, File.join(settings.root, 'node_modules', '@titaniumnetwork-dev', 'ultraviolet', 'dist')
set :public_folder, File.join(settings.root, 'src', 'public')
set :views, File.join(settings.root, 'src', 'views')
register Config
set :logging, Settings.verboseLogging
generateConfigs()

get '/' do
  erb :index
end

get '/uv/*' do
  send_file File.join(settings.uvPath, params[:splat][0])
end
