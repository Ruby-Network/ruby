SHELL := bash

bare-module:
	@echo "Building bare as module 3"
	@cd bare-as-module3 && pnpm run build 
	@cp bare-as-module3/dist/bare.cjs src/public/js/bareTransport/bareMod.js
