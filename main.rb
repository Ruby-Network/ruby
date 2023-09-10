require './require.rb'

set :root, File.dirname(__FILE__)
set :public_folder, File.join(settings.root, 'src', 'public')
set :views, File.join(settings.root, 'src', 'views')
set :template, File.join(settings.root, 'src', 'templates')
register Config
logging = Settings.verboseLogging
if logging == "true"
  puts "Verbose logging is enabled".green
  logging = true
else
  puts "Verbose logging is disabled".red
  logging = false
end
set :logging, logging
set :show_exceptions, logging
set :components, File.join(settings.root, 'src', 'views', 'components')
cookie_options = {
  :key => 'UserAllowed',
  :path => '/',
  :expire_after => 86400, # In seconds (1 day)
  :secret => SecureRandom.alphanumeric(2048),
  :secure => true,
  :httponly => true
}
#Validate the YML file 
validateYML()
#Encrypted cookies
use Rack::Session::EncryptedCookie, cookie_options
#csrf 
use Rack::Csrf, :raise => true
#Compression
use Rack::Deflater
#Auth 
use Auth
before do
  if request.path_info == '/auth'
    return
  #any route on the main domain
  elsif request.url.include? Settings.mainURL
    return
  else
    auth()
  end
end
# UV "middleware"
set :uvPath, File.join(settings.root, 'node_modules', '@titaniumnetwork-dev', 'ultraviolet', 'dist')
uvPath()

# Other routes
get '/:unlock?' do
  erb :index, :layout => :"layouts/index"
end

#Auth to login to the site
post '/auth' do 
  if params[:password] == Settings.password && params[:username] == Settings.username
    session[:auth] = true
    session[:uid] = SecureRandom.alphanumeric(2048)
    redirect '/'
  else
    redirect '/'
  end
end
