def dbSetup()
  puts "Setting up database...".green
  db = Sequel.postgres(host: 'localhost', user: 'example', password: 'example', database: 'example')
  puts "Creating table 'users' (if it does not exist)...".green
  if db.table_exists?(:users)
    puts "Table 'users' already exists.".yellow
  else
    db.create_table :users do
      primary_key :id
      String :username
      String :password
      Boolean :admin
    end
  end

  puts "Adding user admin user: #{Settings.username} (if it does not exist)".green
  if db[:users].where(username: Settings.username).count >= 1
    puts "User #{Settings.username} already exists.".yellow
  else
    password = BCrypt::Password.create(Settings.password)
    db[:users].insert(username: Settings.username, password: password, admin: true)
  end
  db.disconnect
  puts "Database setup complete.".green
  return
end

def login(username, password)
  username = username.gsub(/[^0-9A-Za-z]/, '')
  password = password.gsub(/[^0-9A-Za-z]/, '')
  db = Sequel.postgres(host: 'localhost', user: 'example', password: 'example', database: 'example')
  ## we need to check for the password but it is hashed so we need to use bcrypt to check it
  pass = db[:users].where(username: username).get(:password)
  password = BCrypt::Password.new(pass)
  if pass == password
    db.disconnect
    return true
  else
    db.disconnect
    return false
  end
end
