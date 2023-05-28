require 'etc'
require 'os'
if OS.windows?
  puts "You are using Windows. Not multi-threading...".colorize(:red)
  puts "Starting Bare Server Node...".colorize(:blue)
  system("npx bare-server-node --port #{Settings.barePort} &")
else
  workers Etc.nprocessors
  before_fork do
    puts "Master Process ID: #{Process.pid}".colorize(:green)
    puts "Starting Bare Server Node...".colorize(:blue)
    system("npx bare-server-node --port #{Settings.barePort} &")
  end
end
preload_app!
port ENV['PORT'] || 9292
