def addHeader(content)
  content.each do |key, value|
    content_for :head do
      if key != 1
        "    " + value + "\n"
      else
        value + "\n"
      end
    end
  end
end

def addTitle(content)
  content_for :title do 
    content
  end
end
def showComponent(component)
  content_for :component do
    File.read(File.join(settings.components, component + '.erb'))
  end
end
