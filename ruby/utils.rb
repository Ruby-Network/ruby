def addHeader(content)
  content.each do |key, value|
    content_for :head do 
      value
    end
  end
end
