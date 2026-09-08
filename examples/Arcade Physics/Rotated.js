'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.NO_SCALE;

    // Pick up default AssetManager
    const assets = new AssetManager();

    // Preload images
    assets.enqueueImage('platform', '/assets/examples/p-platform-200x20.png');
    assets.enqueueImage('box', '/assets/examples/box.png'); // 95 x 95

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    const platform = new Sprite('platform');
    platform.x = Black.engine.stage.width / 2;
    platform.y = Black.engine.stage.height - 100;
    platform.width = 500;
    platform.alignPivot();
    this.add(platform);

    platform.body = platform.addComponent(new RigidBody());
    platform.body.isStatic = true;

    for (let i = 0; i < 3; i++) {
      const diamond = new Sprite('box');
      diamond.x = platform.x + (i - 1) * 70;
      diamond.y = platform.y - (i === 1 ? 250 : 100);
      diamond.rotation = Math.PI / 4;
      diamond.alignPivot();
      this.add(diamond);

      diamond.body = diamond.addComponent(new RigidBody());
    }
  }
}

const engine = new Engine('game-container', MyGame, CanvasDriver, [Arcade]);
engine.start();
