'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

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
    const arcade = Black.engine.getSystem(Arcade);
    arcade.boundsEnabled = true;

    let sprite = new Sprite('box');
    sprite.x = this.stage.centerX;
    sprite.alignAnchor();
    this.addChild(sprite);

    sprite.addComponent(new RigidBody());
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Arcade]);
engine.start();
