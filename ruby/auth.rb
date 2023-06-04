def auth(path, page, layout)
  url = request.url
  if url == Settings.mainURL
    session[:auth] = true
  end
  if layout != false
    if session[:auth] == true
      erb :"#{page}", :layout => :"#{layout}"
    elsif Settings.private == "false" && params[:unlock] == "" || params[:unlock] == "unlock" || params[:unlock] == "true" || params[:unlock] == " "
      session[:auth] = true
      redirect path
    else
      erb :"edu/index"
    end
  else
    if session[:auth] == true
      erb :"#{page}"
    elsif Settings.private == "false" && params[:unlock] == "" || params[:unlock] == "unlock" || params[:unlock] == "true" || params[:unlock] == " "
      session[:auth] = true
      redirect path
    else
      erb :"edu/index"
    end
  end
end
