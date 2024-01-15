require 'thor'
require 'colorize'
require 'sequel'
require 'bcrypt'
require 'readline'
require 'yaml'
require_relative '../ruby/db.rb'

settings = YAML.load_file(File.join(File.dirname(__FILE__), '../config/settings.yml'))
$host = ENV['DB_HOST'] || settings['database']['host'].to_s 
$user = ENV['DB_USERNAME'] || settings['database']['username'].to_s
$password = ENV['DB_PASSWORD'] || settings['database']['password'].to_s
$database = ENV['DB_DATABASE'] || settings['database']['dbname'].to_s

class RubyCLI < Thor
  desc "create", "Create a new user"
  def create
    puts "Creating a new user...".red
    username = Readline.readline("Username: ", true)
    username = username.gsub(/[^0-9A-Za-z]/, '')
    username = username.downcase
    while true
      password = Readline.readline("Password: ", true)
      passwordConfirm = Readline.readline("Retype password: ", true)
      if password != passwordConfirm
        puts "\e[H\e[2J"
        puts "Passwords do not match! Try again.".red
      else
        break
      end
    end

    db = connectDB($host, $user, $password, $database)
    hashedPassword = BCrypt::Password.create(password)
    if db[:users].where(username: username).count > 0
      puts "User already exists!".red
      db.disconnect
      exit 
    else
      db[:users].insert(username: username, password: hashedPassword, admin: false)
      puts "User created!".blue
      db.disconnect
    end

  end
  desc "delete", "Delete a user"
  def delete
    puts "Deleting a user...".red
    username = Readline.readline("Username: ", true)
    username = username.gsub(/[^0-9A-Za-z]/, '')
    username = username.downcase
    db = connectDB($host, $user, $password, $database)
    while true
      usernameConfirm = Readline.readline("Are you sure you want to delete #{username}? (y/n): ", true).downcase
      if usernameConfirm == "y" || usernameConfirm == "yes"
        if db[:users].where(username: username).count > 0
          db[:users].where(username: username).delete
          puts "User deleted!".blue
          db.disconnect
        else 
          puts "User does not exist! (use the list command to see all users)".red
          db.disconnect
        end
        exit
      elsif usernameConfirm == "n" || usernameConfirm == "no"
        puts "Ok, exiting...".blue
        db.disconnect
        exit
      end
    end
  end
  desc "list", "List all users"
  def list
    db = connectDB($host, $user, $password, $database)
    puts "Listing all users...".red
    users = db[:users]
    users.each{|user| puts user[:username]}
  end
  desc "reset", "Reset a user's password"
  def reset
    puts "Resetting a user's password...".red
    username = Readline.readline("Username: ", true)
    username = username.gsub(/[^0-9A-Za-z]/, '')
    username = username.downcase
    db = connectDB($host, $user, $password, $database)
    if db[:users].where(username: username).count > 0
      while true
        password = Readline.readline("New Password: ", true)
        passwordConfirm = Readline.readline("Retype new password: ", true)
        if password != passwordConfirm
          puts "\e[H\e[2J"
          puts "Passwords do not match! Try again.".red
        else
          break
        end
      end
      hashedPassword = BCrypt::Password.create(password)
      db[:users].where(username: username).update(password: hashedPassword)
      puts "Password reset!".blue
      db.disconnect
    else 
      puts "User does not exist! (use the list command to see all users)".red
      db.disconnect
    end
  end
end

RubyCLI.start(ARGV)
