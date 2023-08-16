class YamlValidator < Dry::Validation::Contract
  params do
    required(:port).filled(:integer)
    required(:verboseLogging).filled(:string)
    required(:private).filled(:string)
    required(:username).filled(:string)
    required(:password).filled(:string)
    required(:mainURL).filled(:string)
  end
  rule(:port) do
    key.failure('must be greater than 0') if value <= 0
  end
  rule(:verboseLogging) do 
    key.failure('MUST BE TRUE OR FALSE') if value != "true" && value != "false"
  end
  rule(:private) do 
    key.failure('MUST BE TRUE OR FALSE') if value != "true" && value != "false"
  end
  rule(:mainURL) do
    if (Settings.private == "false")
      key.failure('must have a url') if value !~ /\A#{URI::regexp(['http', 'https'])}\z/
      key.failure('must have a / at the end') if value !~ /\/\z/
    else
      key.failure('must have no url') if value != "NA"
    end
  end
  rule(:username) do 
    if (Settings.private == "false")
      key.failure('the username MUST be "ruby"') if value != "ruby"
    end
    if (Settings.private == "true")
      key.failure('the username must NOT be "ruby"') if value == "ruby"
    end
  end
  rule(:password) do 
    if (Settings.private == "false")
      key.failure('the password MUST be "ruby"') if value != "ruby"
    end
    if (Settings.private == "true")
      key.failure('the password must NOT be "ruby"') if value == "ruby"
    end
  end
end

def validateYML
  config = YAML.load_file(File.join(settings.root, '/config/settings.yml'))
  validator = YamlValidator.new
  result = validator.call(config)
  if result.errors.any?
    puts result.errors.to_h
    puts "Please fix the above errors and restart the server."
    exit
  end
end
