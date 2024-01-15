def connectDB(host, user, password, database)
  db = Sequel.postgres(host: host, user: user, password: password, database: database)
  return db
end

def defineDBVars()
  $host = ENV['DB_HOST'] || Settings.database.host 
  $user = ENV['DB_USERNAME'] || Settings.database.username
  $password = ENV['DB_PASSWORD'] || Settings.database.password
  $database = ENV['DB_DATABASE'] || Settings.database.dbname
end

def dbSetup()
  puts "Setting up database...".green
  defineDBVars()
  db = connectDB($host, $user, $password, $database)
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
  db = connectDB($host, $user, $password, $database)
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
