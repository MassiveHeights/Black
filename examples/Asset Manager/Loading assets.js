'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

    // Pick up default AssetManager
    var assets = new AssetManager();

    // Preload images
    assets.enqueueImage('box', '/assets/examples/popart_image.png');

    // Preload an Atlas
    assets.enqueueAtlas('atlas', '/assets/examples/atlas.png', '/assets/examples/atlas.json');

    // Preload bitmap font.
    assets.enqueueBitmapFont('font', '/assets/examples/font-arial.png', '/assets/examples/font-arial.fnt')

    // Preload audio file
    assets.enqueueSound('music', '/assets/examples/final.mp3');

    // Preload audio atlas file
    assets.enqueueSoundAtlas('audio-atlas', '/assets/examples/atlas.mp3', '/assets/examples/soundatlas.json');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    console.log(Black.assets.getTexture('box'));
    console.log(Black.assets.getAtlas('atlas'));
    console.log(Black.assets.getBitmapFont('font'));
    console.log(Black.assets.getSound('music'));
    console.log(Black.assets.getSoundAtlas('audio-atlas'));
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [MasterAudio]);
engine.start();
