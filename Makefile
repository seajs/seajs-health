
build:
	@rm -rf dist
	@mkdir dist
	@sed "s/seajs-health/seajs-health-debug/" src/seajs-health.js >dist/seajs-health-debug.js
	@uglifyjs src/seajs-health.js -o dist/seajs-health.js -mc
	@make size

test:
	@make test -C ../seajs

size:
	@../seajs/tools/size.sh seajs-health
