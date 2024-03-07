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

def epoxyPath
  get '/epoxy/*' do
    send_file File.join(settings.epoxyPath, params[:splat][0])
  end
end

def libcurlPath
  get '/libcurl/*' do
    if params[:splat][0].end_with?('.cjs')
      headers['Content-Type'] = 'application/javascript'
    end
    if params[:splat][0].end_with?('.mjs')
      headers['Content-Type'] = 'application/javascript'
    end
    send_file File.join(settings.libcurlPath, params[:splat][0])
  end
end

def baremuxPath 
  get '/baremux/*' do
  if params[:splat][0].end_with?('.cjs')
      headers['Content-Type'] = 'application/javascript'
    end
    send_file File.join(settings.baremuxPath, params[:splat][0]) 
  end
end
