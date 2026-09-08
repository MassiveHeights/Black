'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    // creates default asset manager
    var assets = new AssetManager();

    // Preload images
    assets.enqueueImage('box', '/assets/examples/popart_box_bottom.png');

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
    
    // Add object onto the stage
    this.addChild(sprite);
  }
}

new Engine('game-container', MyGame, CanvasDriver).start();

