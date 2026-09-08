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
    assets.enqueueImage('box', '/assets/examples/popart_tv_1.png');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoadded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoadded(m) {
    let t = Black.assets.getTexture('box');

    // Create a sprite
    let sprite = new Sprite('box');

    // Align object pivot
    sprite.alignPivot();

    sprite.x = this.stage.centerX;
    sprite.y = this.stage.centerY;

    this.wx = 0;
    this.wy = 0;

    this.sprite = this.addChild(sprite);

    this.sprite.tiling = new TilingInfo(t.width * 20, t.height * 20);
  }

  onUpdate() {
    if (!Black.assets.isAllLoaded)
      return;

    this.wx += 10;
    this.wy = Math.sin(Black.time.now * 2) * 500;

    this.sprite.tiling.wrapX = this.wx;
    this.sprite.tiling.wrapY = this.wy;

    this.sprite.alignPivot();
    this.sprite.rotation += 0.005;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();