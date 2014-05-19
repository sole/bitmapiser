var shell = require('shelljs');
var path = require('path');
var printf = require('printf');
var temp = require('temp');
var fs = require('fs');

function Bitmapiser(options) {

  var inkscapePath = '/Applications/Inkscape.app/Contents/Resources/bin/inkscape'; // TODO XXX hardcoded

  function processImage(image, inputDir, outputDir, sizes) {

    var srcPath = path.join(inputDir, image);
    var baseName = path.basename(srcPath);
    var fileName = path.basename(baseName, path.extname(baseName));
    var tmpPath = path.join(fs.realpathSync( outputDir ), 'test.png'); // temp.path();

    srcPath = fs.realpathSync( srcPath );

    console.log(srcPath, tmpPath, baseName, fileName);

    // First generate bitmap version from vectorial
    inkscapeCmd = printf('%s %s --export-png=%s --export-area-drawing', inkscapePath, srcPath, tmpPath);

    console.log(inkscapeCmd);
    
    var child = shell.exec( inkscapeCmd );
    console.log(child); // XXX

    // Then resize down

    

  }

  this.run = function() {
    
    options.images.forEach(function(image) {
      processImage( image, options.inputDir, options.outputDir, options.sizes );
    });

  };
}

module.exports = Bitmapiser;

