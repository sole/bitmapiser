var shell = require('shelljs');
var path = require('path');
var printf = require('printf');
var fs = require('fs');


function Bitmapiser(options) {

  var inkscapePath = options.inkscapePath;

  function processImage(image, inputDir, outputDir, sizes) {
    
    var srcPath = path.join(inputDir, image);
    var baseName = path.basename(srcPath);
    var fileName = path.basename(baseName, path.extname(baseName));
    var conversionsQueue = [];

    srcPath = fs.realpathSync(srcPath);

    sizes.forEach(function(size) {
      
      var width, height;

      size = size + '';
      if(size.indexOf('x') !== -1) {
        var sizeParts = size.split('x');
        width = sizeParts[0];
        height = sizeParts[1];
      } else {
        width = size;
        height = size;
      }

      var resizedFileName = printf('%s%dx%d.png', fileName, width, height);
      var resizedPath = path.join(outputDir, resizedFileName);
      var inkscapeCmd = printf('%s %s --export-png=%s --export-area-drawing --export-width=%d --export-height=%d', inkscapePath, srcPath, resizedPath, width, height);
      
      shell.exec(inkscapeCmd);

    });

  }

  this.run = function() {

    options.images.forEach(function(image) {
      processImage( image, options.inputDir, options.outputDir, options.sizes );
    });

  };
}

module.exports = Bitmapiser;

