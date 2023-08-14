# Project Structure
##### This describes the project structure and the purpose of each directory. Each directory will be linked.
##### Want to see a full tree of every file/folder? It is right [here](./tree.md)
---
- [.bundle](../../.bundle/): This directory is created by bundler and simply tells bundler not to install the development gems
- [.github](../../.github/): This directory contains the github specific files like the issue templates, pull request template, and the code of conduct
- [docs/](../../docs/): This directory contains the documentation for the project 
- [config/](../../config/): This directory contains the both the user editable settings.yml file and the the server config for the Ruby server 
- [docker/](../../docker/): This directory contains the docker files for the project 
- [dynamic/](../../dynamic/): This directory is a submodule for [dynamic](https://github.com/nebulaServices/dynamic)
- [node-server/](../../node-server/): This directory contains the node server for the project as well as the code to compile the SCSS at runtime
- [ruby/](../../ruby/): This directory contains any helpers for the Ruby server (auth, yaml validation etc.)
- [src/](../../src/): This directory contains the source code for the project 
    - [views/](../../src/views/): This directory contains the views for the project
    - [public/](../../src/public/): This dir contains all the logic for the site (service worker registration, css, SASS, fonts, logos, etc.)
      - [css/](../../src/public/css/): This directory contains the compiled CSS for the project 
      - [font-awesome/](../../src/public/font-awesome/): This directory contains the font-awesome fonts and icons 
      - [fonts/](../../src/public/fonts/): This directory contains the fonts for the project 
      - [games-thumb/](../../src/public/games-thumb/): This directory contains the thumbnails for the games 
      - [js/](../../src/public/js/): This directory contains the JavaScript for the project 
        - [chrome-tabs/](../../src/public/js/chrome-tabs/): This directory contains the chrome tabs JavaScript
        - [dynamic/](../../src/public/js/dynamic/): This directory contains the javascript from the [submodule](../../dynamic/)
        - [lib/](../../src/public/js/lib/): This directory contains the libraries such as, localfoage and sweetalert2
        - [sw/](../../src/public/js/sw/): This directory contains both the UV service worker and the Dynamic service worker 
        - [uv/](../../src/public/js/uv/): This directory contains the UV config for ultraviolet
      - [sass/](../../src/public/sass/): This directory contains the SASS for the project (compiled to CSS)
