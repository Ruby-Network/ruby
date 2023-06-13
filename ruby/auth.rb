def auth(path, page, layout)
  url = request.url
  if url == Settings.mainURL
    if session[:auth] != true
      session[:auth] = true
      session[:uid] = SecureRandom.alphanumeric(2048)
    end
  end
  if layout != false
    if session[:auth] == true
      erb :"#{page}", :layout => :"#{layout}"
    elsif Settings.private == "false" && params[:unlock] == "" || params[:unlock] == "unlock" || params[:unlock] == "true" || params[:unlock] == " "
      session[:auth] = true
      session[:uid] = SecureRandom.alphanumeric(2048)
      redirect path
    else
      erb :"edu/index"
    end
  else
    if session[:auth] == true
      erb :"#{page}"
    elsif Settings.private == "false" && params[:unlock] == "" || params[:unlock] == "unlock" || params[:unlock] == "true" || params[:unlock] == " "
      session[:auth] = true
      session[:uid] = SecureRandom.alphanumeric(2048)
      redirect path
    else
      erb :"edu/index"
    end
  end
end

def auth2(page)
  if session[:auth] == true
    erb :"#{page}"
  else
    erb :"edu/index"
  end
end
