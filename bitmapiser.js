var shell = require('shelljs');
var path = require('path');
var printf = require('printf');
var temp = require('temp');
var fs = require('fs');
var gm = require('gm');
var Promise = require('es6-promise').Promise;


function Bitmapiser(options) {

  var inkscapePath = options.inkscapePath;

  function processImage(image, inputDir, outputDir, sizes, doneCallback) {

    var srcPath = path.join(inputDir, image);
    var baseName = path.basename(srcPath);
    var fileName = path.basename(baseName, path.extname(baseName));
    var tmpPath = temp.path();
    var conversionsQueue = [];

    srcPath = fs.realpathSync( srcPath );

    console.log(srcPath, tmpPath, baseName, fileName);

    // First generate bitmap version from vectorial
    inkscapeCmd = printf('%s %s --export-png=%s --export-area-drawing', inkscapePath, srcPath, tmpPath);

    var child = shell.exec( inkscapeCmd );


    // Repeatedly resize for each size
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

      // TODO is there a better way to do this? looks a bit... uggghh.
      width = width * 1;
      height = height * 1;

      console.log(size, typeof(size), width, height, typeof(width), typeof(height));

      var resizedFileName = printf('%s%dx%d.png', fileName, width, height);
      var resizedPath = path.join(outputDir, resizedFileName);

      var conversion = new Promise(function(resolve, reject) {

        gm(tmpPath)
          .resize(width, height)
          .write(resizedPath, function (err) {
            if (!err) {
              console.log('done ' + resizedPath);
              resolve('done ' + resizedPath);
            } else {
              reject(err);
            }
          });
      });

      conversionsQueue.push( conversion );

    });

    var whenDone = cleanup(tmpPath);

    Promise.all( conversionsQueue ).then(function() {
      console.log('ALL IS COOL');
      whenDone();
    }, function(err) {
      console.log('finished, but NOT ALL is cool');
      console.log(err);
      whenDone();
    });

  }


  function cleanup(tmpImagePath) {
    return function() {
      // ABC Always Be Cleaning
      console.log('cleanup');
      fs.unlinkSync(tmpImagePath);
    };
  }


  this.run = function() {

    options.images.forEach(function(image) {
      processImage( image, options.inputDir, options.outputDir, options.sizes );
    });

  };
}

module.exports = Bitmapiser;

