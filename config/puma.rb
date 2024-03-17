require 'etc'
require 'os'
require 'colorize'

if OS.windows?
  puts "You are using Windows. Not multi-threading...".colorize(:red)
  puts "Starting Server...".colorize(:green)
elsif ENV['WP'] != nil
  workers ENV['WP'].to_i
  before_fork do
    puts "The amount of proccesses is: #{ENV['WP']}".colorize(:green)
    puts "Master Process ID: #{Process.pid}".colorize(:green)
    puts "Starting Server...".colorize(:green)
    cpuCount = Etc.nprocessors
  end
else
  if RUBY_ENGINE != 'jruby' && RUBY_ENGINE != 'truffleruby'
    workers Etc.nprocessors
    before_fork do
      puts "Master Process ID: #{Process.pid}".colorize(:green)
      puts "Starting Server...".colorize(:green)
      cpuCount = Etc.nprocessors
    end
  else 
    puts "You are using JRuby or TruffleRuby. Not using workers...".colorize(:red)
    puts "Starting Server...".colorize(:green)
  end
end

preload_app!
port ENV['PORT'] || 9293
