def addHeader(content)
  content.each do |key, value|
    content_for :head do 
      value
    end
  end
end

def addTitle(content)
  content_for :title do 
    content
  end
end
