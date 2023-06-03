def auth(path, page)
  if session[:auth] == true
    erb :"#{page}"
  elsif Settings.private == false && params[:unlock] == "" || params[:unlock] == "unlock" || params[:unlock] == "true" || params[:unlock] == " "
    session[:auth] = true
    redirect path
  else
    erb :"edu/index"
  end
end
