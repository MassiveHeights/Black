class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    // Pick up default AssetManager
    var assets = new AssetManager();

    assets.enqueueImage('bg', '/assets/examples/backgrounds/bg-pattern-2.png');

    // Preload an Atlas
    assets.enqueueAtlas('atlas', '/assets/examples/atlas.png', '/assets/examples/atlas.json');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create and add background
    //this.addChild(new Sprite('bg'));

    // Create a sprite from atlas
    let sprite = new Sprite('popart_wood_box');

    // Add just created sprite directly to this GameObject
    this.addChild(sprite);

    // Center the image
    sprite.x = this.stage.centerX;
    sprite.y = this.stage.centerY;

    sprite.alignPivot();
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();