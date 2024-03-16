SHELL := bash

bare-module:
	@echo "Building bare as module 3"
	@cd bare-as-module3 && pnpm run build 
	@cp bare-as-module3/dist/bare.cjs src/public/js/bareTransport/bareMod.js

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
	@rm -f src/public/js/sw/*.min.js
	@ls src/public/js/sw/*.js | xargs -I {} npx terser -c -m -o {}.min.js {}
