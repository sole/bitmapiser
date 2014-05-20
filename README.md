# Bitmapiser

_Because why generate bitmaps from vectors by hand when you could be automating this?_

## Installing

This is a special project, it has dependencies that you have to satisfy manually. I'm sad about that and I wish it was different, but so far it isn't, so we have to DEAL WITH IT, and install...

* inkscape
* imagemagick
* graphicsmagick

### In Mac

Installing this kind of things is probably super easy in any Linux distribution, but in Mac it is a hassle and HURTS, so here's how I did that. 

You can get an Inkscape binary from their website.

I installed the *magick using `brew` (which I had installed beforehand).

```bash
brew install imagemagick
brew install graphicsmagick
```

It actually gave me a bit of trouble because of some incompatible freetype versions, which I fixed by...

```bash
brew uninstall freetype
brew update
brew install freetype
brew link --force freetype
```

Finally now that you have your dependencies satisfied:

```bash
git clone https://github.com/sole/bitmapiser.git
cd bitmapiser
npm install
```
You should now be ready to go!

## Usage

Note: `npm start` is broken while I figure that out. It's missing arguments so nothing does actually get done (see [bug #2](https://github.com/sole/bitmapiser/issues/2)).

```bash
node bitmapiser.js --images this.svg,that.svg --input-dir ./assets --output-dir ./images --sizes 32,36,48,72,128
```

## Getting help

This is under active development which is another way of saying things might be mostly broken. If you need help file an issue here: https://github.com/sole/bitmapiser/issues
