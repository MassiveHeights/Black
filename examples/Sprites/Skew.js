'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    // Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    // Black.stage.setSize(500, 500);

    // Pick up default AssetManager
    var assets = new AssetManager();

    // Preload images
    assets.enqueueImage('box', '/assets/examples/popart_image.png');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create a sprite
    let sprite = new Sprite('box');

    // Align object pivot
    sprite.alignPivot();

    sprite.x = this.stage.centerX;
    sprite.y = this.stage.centerY;

    sprite.mSkewX = 0.5;

    console.log(sprite.worldTransformation.data);

    // Add object onto the stage
    this._ = this.addChild(sprite);
  }
  onUpdate() {
    if (!Black.assets.isAllLoaded)
      return;

    this._.rotation += 0.005;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();
