SHELL := bash
.PHONY: bare-module minify-js all clean
DEFAULT_GOAL := all

all: minify-js

clean:
	@echo "Removing all minified JS"
	@rm -f src/public/js/*.min.js
	@rm -f src/public/js/bareTransport/*.min.js
	@rm -f src/public/js/eruda/*.min.js
	@rm -f src/public/js/rh/*.min.js

minify-js:
	@echo "Minifying JS"
	@rm -f src/public/js/*.min.js
	@ls src/public/js/*.js | xargs -I {} npx terser -c -m -o {}.min.js {}
	@rm -f src/public/js/bareTransport/*.min.js
	@ls src/public/js/bareTransport/*.js | xargs -I {} npx terser -c -m -o {}.min.js {}
	@rm -f src/public/js/eruda/*.min.js
	@ls src/public/js/eruda/*.js | xargs -I {} npx terser -c -m -o {}.min.js {}
	@rm -f src/public/js/rh/*.min.js
	@ls src/public/js/rh/*.js | xargs -I {} npx terser -c -m -o {}.min.js {}
