class BareServer < Rack::Proxy
   def perform_request(env)
     request = Rack::Request.new(env)
     if request.path.start_with?("/bare")
       env["HTTP_HOST"] = "localhost:9293"
       env["PATH_INFO"] = env["PATH_INFO"].gsub("/bare", "")
       super(env)
     else
       @app.call(env)
     end
   end
end
