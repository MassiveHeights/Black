class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    // Pick up default AssetManager
    var assets = new AssetManager();

    // Preload images
    assets.enqueueImage('pig', '/assets/examples/popart_pig_05.png');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    let pixelSprite = new Sprite('pig');
    pixelSprite.snapToPixels = true;
    pixelSprite.alignPivot();
    pixelSprite.x = 0;
    pixelSprite.y = this.stage.centerY - 20;
    this.addChild(pixelSprite);

    let subPixelSprite = new Sprite('pig');
    subPixelSprite.snapToPixels = false; // default
    subPixelSprite.alignPivot();
    subPixelSprite.x = 0;
    subPixelSprite.y = this.stage.centerY + 20;
    this.addChild(subPixelSprite);

    this.pigPixel = pixelSprite;
    this.pigSubPixel = subPixelSprite;
  }

  onUpdate() {
    if (Black.assets.isAllLoaded === false)
      return;

    this.pigPixel.x += 1 * Black.time.delta;
    this.pigSubPixel.x += 1 * Black.time.delta;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();
