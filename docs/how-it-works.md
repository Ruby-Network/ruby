# How it works

## Jump to
- [Node.JS](#nodejs)
- [Ruby](#ruby)

## Node.JS 
The Node.JS server should be exclusively called by the Ruby server.

```bash
bundle exec puma -e production
```
Does a number of things behind the scenes. The server config is located [here](../config/puma.rb)
- Firstly, it detects if the user is using Window if so, it disables multithreading due to the way puma handles multithreading.
- After this, it starts the Node.JS server on port 9293
```ruby 
rubyPort = 9292
  rubyPort = ARGV[ARGV.index('-p') + 1] || ARGV[ARGV.index('--port') + 1] if ARGV.include?('-p') || ARGV.include?('--port')
  system("node node-server/server.js --ruby-port=#{rubyPort} --node-port=9293 &")
```
You may notice that we are passing a few options to the Node.JS server. This is so when you set the Ruby Port we can successfully reverse proxy it.

We use fastify for the Node.JS server for performance and simplicty.

Here is what the Node.JS server does:
- It starts a fastify server on port 9293 (passed from the option --node-port)
```mjs
let nodePort = process.argv.find((arg) => arg.startsWith('--node-port')).split('=')[1] || 9293;
app.listen({ port: nodePort, host: '0.0.0.0' });
```
- It starts a fastify reverse proxy on port 9292 (passed from the option --ruby-port)
```mjs
let rubyPort = process.argv.find((arg) => arg.startsWith('--ruby-port')).split('=')[1] || 9292;
.register(fastifyHttpProxy, {
        upstream: 'http://localhost:9292',
        prefix: '/',
        http2: false,
        replyOptions: {
            rewriteRequestHeaders: (originalReq, headers) => {
                headers['host'] = originalReq.headers['host'];
                headers['origin'] = originalReq.headers['origin'];
                return headers;
            }
        }
    })
```
- It serves the Bare server on the route /bare/
```mjs
const bareServer = createBareServer('/bare/');
const bareHandler = (handler, opts) => {
    return createServer().on('request', (req, res) => {
        bareServer.shouldRoute(req) ? bareServer.routeRequest(req, res) : handler(req, res);
    })
    .on('upgrade', (req, socket, head) => {
        if ( bareServer.shouldRoute(req) ) {
            bareServer.routeUpgrade(req, socket, head);
        }
    });
};

const app = Fastify({ logger: false, serverFactory: bareHandler })
```
- It serves the search suggestions that you see on the homepage.
```mjs
app.get('/search=:query', async (req, res) => {
    const { query } = req.params;
    try {
        const resp = await fetch(`https://search.brave.com/api/suggest?q=${query}&format=json`).then((res) => res.json());
        res.send(resp);
    }
    catch (err) {
        reply.code(500).send({ error: "Internal Server Error" });
    }
});
```
- It also compiles the SCSS from [here](../../src/public/sass) 
```mjs
import compile from './compile.js';
console.log(chalk.red('Compiling...'))
compile();
```
- The Node.JS server servers one last thing and that is the games for the games page.
```mjs
.register(fastifyHttpProxy, {
        upstream: 'https://rawcdn.githack.com/',
        prefix: '/gms/',
        http2: false,
    })
```

## Ruby 
The Ruby server is the main server that handles every request besides the ones stated in the Node.JS section.

- We serve ultraviolet this way:
```ruby 
def uvPath
  get '/uv/*' do
    if params[:splat][0] == 'uv.config.js'
      send_file File.join(settings.public_folder, 'js', 'uv', params[:splat][0])
    elsif File.exists?(File.join(settings.uvPath, params[:splat][0]))
      send_file File.join(settings.uvPath, params[:splat][0])
    else
      send_file File.join(settings.public_folder, 'js', 'uv', params[:splat][0])
    end 
  end
end
```
- It handles authentication this way:
```ruby 
class Auth 
  def initialize(app)
    @app = app
  end
  def call(env)
    request = Rack::Request.new(env)
    url = request.url
    session = env['rack.session']
    params = request.params
    puts params
    if session[:auth] != true
      if url == Settings.mainURL
        session[:auth] = true
        session[:uid] = SecureRandom.alphanumeric(2048)
        return [302, {'Location' => '/'}, []]
      elsif Settings.private == "false" && params['unlock'] == '' || params['unlock'] == 'unlock' || params['unlock'] == 'true' || params['unlock'] == ' '
        session[:auth] = true
        session[:uid] = SecureRandom.alphanumeric(2048)
        return [302, {'Location' => '/'}, []]
      end
    end
    @app.call(env)
  end
end
def auth 
  if session[:auth] != true
    halt erb :"edu/index"
  end
end
```
- It validates the settings.yml file,
```ruby 
class YamlValidator < Dry::Validation::Contract
  params do
    required(:port).filled(:integer)
    required(:verboseLogging).filled(:string)
    required(:private).filled(:string)
    required(:username).filled(:string)
    required(:password).filled(:string)
    required(:mainURL).filled(:string)
  end
  rule(:port) do
    key.failure('must be greater than 0') if value <= 0
  end
  rule(:verboseLogging) do 
    key.failure('MUST BE TRUE OR FALSE') if value != "true" && value != "false"
  end
  rule(:private) do 
    key.failure('MUST BE TRUE OR FALSE') if value != "true" && value != "false"
  end
  rule(:mainURL) do
    if (Settings.private == "false")
      key.failure('must have a url') if value !~ /\A#{URI::regexp(['http', 'https'])}\z/
      key.failure('must have a / at the end') if value !~ /\/\z/
    else
      key.failure('must have no url') if value != "NA"
    end
  end
end

def validateYML
  config = YAML.load_file(File.join(settings.root, '/config/settings.yml'))
  validator = YamlValidator.new
  result = validator.call(config)
  if result.errors.any?
    puts result.errors.to_h
    puts "Please fix the above errors and restart the server."
    exit
  end
end
```
- It shows components,
```ruby 
def showComponent(component)
  content_for :component do
    File.read(File.join(settings.components, component + '.erb'))
  end
end
```
- It serves the homepage, the client side JS and everything else you could think of.
