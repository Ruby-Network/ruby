def connectDB()
  db = Sequel.postgres(host: 'localhost', user: 'example', password: 'example', database: 'example')
  return db
end

def dbSetup()
  puts "Setting up database...".green
  db = connectDB()
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

  puts "Adding user admin user: #{Settings.username.downcase} (if it does not exist)".green
    if db[:users].where(username: Settings.username.downcase).count >= 1
      puts "User #{Settings.username.downcase} already exists.".yellow
  else
    password = BCrypt::Password.create(Settings.password)
    db[:users].insert(username: Settings.username.downcase, password: password, admin: true)
  end
  db.disconnect
  puts "Database setup complete.".green
  return
end

def login(username, password)
  username = username.gsub(/[^0-9A-Za-z]/, '')
  username = username.downcase
  password = password.gsub(/[^0-9A-Za-z]/, '')
  db = connectDB()
  hashedPassword = db[:users].where(username: username).get(:password)
  begin
    if BCrypt::Password.new(hashedPassword) == password 
      db.disconnect
      return true
    else
      db.disconnect
      return false
    end
  rescue BCrypt::Errors::InvalidHash
    db.disconnect
    return false
  end
end
