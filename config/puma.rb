require 'etc'
require 'os'
if OS.windows?
  puts "You are using Windows. Not multi-threading..."
  puts "Starting Bare Server Node"
  system("npx bare-server-node --port #{Settings.barePort} &")
else
  workers Etc.nprocessors
  before_fork do
    puts "Master Process ID: #{Process.pid}"
    puts "Starting Bare Server Node"
    system("npx bare-server-node --port #{Settings.barePort} &")
  end
end
preload_app!
