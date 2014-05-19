var ArgumentParser = require('argparse').ArgumentParser;
var Bitmapiser = require('./bitmapiser.js');

var inputDir = process.cwd();
var outputDir = inputDir;
var sizes = '16,48,60,128';


parser = new ArgumentParser({
	description: 'Build different icon versions'
});


parser.addArgument( ['--images'], {
		help: 'Comma separated list of images to be converted',
		defaultValue: ''
	}
);

parser.addArgument( ['--input-dir'], {
    dest: 'inputDir',
    help: 'Directory containing input SVG files', 
    defaultValue: inputDir
  }
);

parser.addArgument( ['--output-dir' ], {
    dest: 'outputDir',
    help: 'Output directory for bitmap files', 
    defaultValue: outputDir
  }
);

parser.addArgument( ['--sizes' ], {
    dest: 'sizes',
    help: 'List of sizes to generate', 
    defaultValue: sizes
}
);

var args = parser.parseArgs();


if(args.images.length > 0) {
  args.images = args.images.split(',');
}

if(args.sizes.length > 0) {
  args.sizes = args.sizes.split(',');
}

console.dir(args);


var bitmapiser = new Bitmapiser(args);
bitmapiser.run();
