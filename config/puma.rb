require 'etc'
require 'os'
if OS.windows?
  puts "You are using Windows. Not multi-threading...".colorize(:red)
  puts "Starting Bare Server Node...".colorize(:blue)
  system("node bare.js &")
else
  workers Etc.nprocessors
  before_fork do
    puts "Master Process ID: #{Process.pid}".colorize(:green)
    puts "Starting Bare Server Node...".colorize(:blue)
    #puts the -w flag value even when it's not at position 0
    work = Etc.nprocessors
    work = ARGV[ARGV.index('-w') + 1] if ARGV.include?('-w')
    work = ARGV[ARGV.index('--workers') + 1] if ARGV.include?('--workers')
    system("node bare.js --cpu-count=#{work} &")
  end
end
preload_app!
port ENV['PORT'] || 9292
