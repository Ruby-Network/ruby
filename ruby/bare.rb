class BareServer < Rack::Proxy
   def perform_request(env)
     request = Rack::Request.new(env)
     if request.path.start_with?("/bare")
        env["HTTP_HOST"] = "localhost:#{Settings.barePort}"
        env["PATH_INFO"] = request.path.gsub("/bare", "")
        env["REQUEST_URI"] = request.path.gsub("/bare", "")
        super(env)
     else
       @app.call(env)
     end
  end
end
