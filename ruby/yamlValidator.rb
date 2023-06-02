def validateYML
  config_schema = Dry::Schema.Params do
    required(:port).filled(:integer)
    required(:verboseLogging).filled(:bool)
    required(:private).filled(:bool)
    required(:username).filled(:string)
    required(:password).filled(:string)
  end
  conf = YAML.load_file(File.join(settings.root, '/config/settings.yml'))
  schema_valid = config_schema.call(conf)
  raise schema_valid.errors.to_h.to_s unless schema_valid.success?
end
