require 'sinatra'
require 'sinatra/content_for'

set :root, File.dirname(__FILE__)
set :views, File.join(settings.root, 'views')
set :public_folder, File.join(settings.root, '..', 'frontend', 'dist')

get '/' do
  erb :index
end
