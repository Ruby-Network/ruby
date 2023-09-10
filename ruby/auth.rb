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
def auth 
  if session[:auth] != true
    halt erb :'edu/v1/index'
  end
end
