def getLatestRelease()
  puts 'Fetching latest release...'.colorize(:yellow)
  if ENV['RACK_ENV'] == 'development'
    return "dev"
  end
  res = HTTParty.get('https://api.github.com/repos/Ruby-Network/ruby/releases/latest')
  version = JSON.parse(res.body)
  puts 'Latest version: ' + version['tag_name'].colorize(:green)
  puts 'Latest release fetched.'.colorize(:green)
  return version['tag_name']
end
