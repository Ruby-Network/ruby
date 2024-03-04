class Auth 
  def initialize(app)
    @app = app
  end
  def call(env)
    request = Rack::Request.new(env)
    url = request.url
    session = env['rack.session']
    params = request.params
    puts params
    if session[:auth] != true
      #if url == Settings.mainURL
      #  session[:auth] = true
      #  session[:uid] = SecureRandom.alphanumeric(2048)
       # return [302, {'Location' => '/'}, []]
      if Settings.private == "false" && params['unlock'] == '' || params['unlock'] == 'unlock' || params['unlock'] == 'true' || params['unlock'] == ' '
        session[:auth] = true
        session[:uid] = SecureRandom.alphanumeric(2048)
        return [302, {'Location' => '/'}, []]
      end
    end
    @app.call(env)
  end
end
def viewer
  #server any public content
  erb :'edu/v1/index'
end
def auth 
  if session[:auth] != true
    #server the whole edu/v2 folder
    halt viewer()
  end
end
