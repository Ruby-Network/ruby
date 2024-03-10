class YamlValidator < Dry::Validation::Contract
  params do
    required(:port).filled(:integer)
    required(:verboseLogging).filled(:string)
    required(:private).filled(:string)
    required(:username).filled(:string)
    required(:password).filled(:string)
    optional(:multiuser).filled(:string)
    optional(:mainURL).filled(:string)
    optional(:database).filled(:hash).schema do
      required(:host).filled(:string)
      required(:username).filled(:string)
      required(:password).filled(:string)
      required(:dbname).filled(:string)
    end
    optional(:corlink).filled(:hash).schema do 
      required(:url).filled(:string)
      required(:apiKey).filled(:string)
    end
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
  rule(:multiuser) do 
    if (Settings.private == "true")
      key.failure('multiuser is required to be used when private mode is enabled') if value == nil
      key.failure('MUST BE TRUE OR FALSE') if value != "true" && value != "false"
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

def validateEnv
  if ENV['DOMAIN'] != nil
    if ENV['DOMAIN'] !~ /\A#{URI::regexp(['http', 'https'])}\z/
      puts "Domain is not a valid URL".red
      exit
    elsif ENV['DOMAIN'] !~ /\/\z/ 
      puts "Domain must end with a /".red 
      exit
    end
  end
end
