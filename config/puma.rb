require 'etc'
require 'os'
if OS.windows?
  puts "You are using Windows. Not multi-threading...".colorize(:red)
  puts "Starting Server...".colorize(:green)
  rubyPort = 9292
  rubyPort = ARGV[ARGV.index('-p') + 1] || ARGV[ARGV.index('--port') + 1] if ARGV.include?('-p') || ARGV.include?('--port')
  if ENV['RACK_ENV'] == 'production'
    system("node node-server/server.js --ruby-port=#{rubyPort} --node-port=9293 &")
  else 
    system("node node-server/server-dev.js --ruby-port=#{rubyPort} --node-port=9293 &")
  end
elsif ENV['WP'] != nil
  workers ENV['WP'].to_i
  before_fork do
    puts "The amount of proccesses is: #{ENV['WP']}".colorize(:green)
    puts "Master Process ID: #{Process.pid}".colorize(:green)
    puts "Starting Server...".colorize(:green)
    rubyPort = 9292
    cpuCount = Etc.nprocessors
    rubyPort = ARGV[ARGV.index('-p') + 1] || ARGV[ARGV.index('--port') + 1] if ARGV.include?('-p') || ARGV.include?('--port')
    if ENV['RACK_ENV'] == 'production'
      system("node node-server/server.js --ruby-port=#{rubyPort} --node-port=9293 &")
    else 
      system("node node-server/server-dev.js --ruby-port=#{rubyPort} --node-port=9293 &")
    end
  end
else
  workers Etc.nprocessors
  before_fork do
    puts "Master Process ID: #{Process.pid}".colorize(:green)
    puts "Starting Server...".colorize(:green)
    rubyPort = 9292
    cpuCount = Etc.nprocessors
    rubyPort = ARGV[ARGV.index('-p') + 1] || ARGV[ARGV.index('--port') + 1] if ARGV.include?('-p') || ARGV.include?('--port')
    if ENV['RACK_ENV'] == 'production'
      system("node node-server/server.js --ruby-port=#{rubyPort} --node-port=9293 &")
    else 
      system("node node-server/server-dev.js --ruby-port=#{rubyPort} --node-port=9293 &")
    end
  end
end

preload_app!
port ENV['PORT'] || 9292
