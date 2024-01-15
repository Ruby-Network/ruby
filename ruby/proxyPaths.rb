def uvPath
  get '/uv/*' do
    if params[:splat][0] == 'uv.config.js'
      send_file File.join(settings.public_folder, 'js', 'uv', params[:splat][0])
    else
      send_file File.join(settings.uvPath, params[:splat][0])
    end 
  end
end

def dynamicPath
  get '/dynamic/*' do
    if params[:splat][0] == 'dynamic.config.js'
      send_file File.join(settings.public_folder, 'js', 'dynamic', params[:splat][0])
    else
      send_file File.join(settings.dynamicPath, params[:splat][0])
    end
  end
end
