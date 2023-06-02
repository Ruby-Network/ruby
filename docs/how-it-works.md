# How it works

## Jump to
- [Node.JS](#nodejs)
- [Ruby](#ruby)

## Node.JS 
Upon getting called from `bundle exec puma -e production` it does a number of things:

1. Before the server even starts it takes a flag passed when running the above command: `--ruby-port`.
This flag specifies the Ruby server port so it can successfuly reverse proxy to the Ruby Server.
    ```js
    let rubyPort = process.argv.find((arg) => arg.startsWith('--ruby-port').split('=')[1] || 9292;
    ```
2. We compile all code in the [src/public/sass](../src/public/sass/) directory into CSS ([src/public/css](../src/public/css/)) and show a spinner while doing so.
    ```js
    const logger = createLogger();
    async function compileSCSS() {
        fs.readdirSync(path.join(__dirname, '/src/public/sass')).forEach((file) => {
            if (file.endsWith('.scss')) {
                let test = sass.compile(path.join(__dirname, `/src/public/sass/${file}`));
                fs.writeFileSync(path.join(__dirname, `/src/public/css/${file.replace('.scss', '.css')}`, test.css);
            }
        });
    }
    await logger(compileSCSS(), 'Compiling SCSS');
    ```
3. *Finally* we create a Reverse Proxy to the Ruby Server:
    ```js
    app.use('/', createProxyMiddleware({
        target: `http://localhost:${rubyPort}/`,
        changeOrigin: false,
        logLevel: 'silent'
    }));
    ```
4. Using Express.JS we finally listen for requests.

Any route that isn't /bare/ will be routed to the Ruby server to handle.

---
## Ruby 
