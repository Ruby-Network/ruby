require './require.rb'

set :root, File.dirname(__FILE__)
set :public_folder, File.join(settings.root, 'src', 'public')
set :views, File.join(settings.root, 'src', 'views')
set :template, File.join(settings.root, 'src', 'templates')

Config.setup do |config|
  config.use_env = true
  config.env_prefix = 'SETTINGS'
  config.env_separator = '_'
  config.env_converter = :downcase
  config.env_parse_values = true
end

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
#Validate the ENV variables
validateEnv()
#Setup DB when Private is true
if Settings.private == "true" && Settings.multiuser == "true"
  dbSetup()
end
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
  elsif Settings.private == "false"
    if request.url.include? ENV['DOMAIN'] || Settings.mainURL
      return
    else
      auth()
    end
  else
    auth()
  end
end
# UV "middleware"
set :uvPath, File.join(settings.root, 'node_modules', '@titaniumnetwork-dev', 'ultraviolet', 'dist')
uvPath()

# Dynamic "middleware"
set :dynamicPath, File.join(settings.root, 'node_modules', '@nebula-services', 'dynamic', 'dist')
dynamicPath()

set :epoxyPath, File.join(settings.root, 'node_modules', '@mercuryworkshop', 'epoxy-transport', 'dist')
epoxyPath()

set :libcurlPath, File.join(settings.root, 'node_modules', '@mercuryworkshop', 'libcurl-transport', 'dist')
libcurlPath()

set :baremuxPath, File.join(settings.root, 'node_modules', '@mercuryworkshop', 'bare-mux', 'dist')
baremuxPath()

mime_type :wasm, 'application/wasm'

# Other routes
get '/rubyHealth/?' do
  return "OK"
end

get '/:unlock?' do
  erb :index, :layout => :"layouts/index"
end

#Auth to login to the site
post '/auth' do 
  if Settings.corlink.enabled == "true" && Settings.private == "false"
    password = params[:password]
    username = params[:username]
    req = HTTParty.post("#{Settings.corlink.url}", headers: { 'Content-Type' => 'application/json', 'Authorization' => "Bearer #{Settings.corlink.apiKey}", 'Key' => "#{password}" })
    if req.code == 200
      if username == "ruby"
        session[:auth] = true
        session[:uid] = SecureRandom.alphanumeric(2048)
        redirect '/'
      else 
        redirect '/'
      end
    else
      redirect '/'
    end
  else
    if Settings.private == "false" || Settings.multiuser == "false"
      if params[:password] == Settings.password && params[:username].downcase == Settings.username.downcase
        session[:auth] = true
        session[:uid] = SecureRandom.alphanumeric(2048)
        redirect '/'
      else
        redirect '/'
      end
    else
      loggedIn = login(params[:username], params[:password])
      if loggedIn == true
        session[:auth] = true
        session[:uid] = SecureRandom.alphanumeric(2048)
        redirect '/'
      else
        redirect '/'
      end
    end
  end
end
