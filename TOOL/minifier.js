
var minifier = require('minifier')
var input = './dist/js/all-js-1.0.0.js'

minifier.on('error', function(err) {
	// handle any potential error
})
minifier.minify(input)



