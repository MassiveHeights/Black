class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(900, 500);

    // Pick up default AssetManager
    var assets = new AssetManager();

    // Preload images
    assets.enqueueImage('bg', '/assets/examples/backgrounds/popart_bg_p_3.png');

    // Preload an Atlas
    assets.enqueueAtlas('atlas', '/assets/examples/atlas.png', '/assets/examples/atlas.json');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.addChild(new Sprite('bg'));

    // Create a sprite
    let a = new Sprite('popart_knife');
    a.x = 900 / 3;
    a.y = 500 / 2;
    a.pivotOffsetX = 19;
    a.pivotOffsetY = 20;
    this.addChild(a);

    // popart_knife texture jas pivot set in the atlas so we dont need to set them up manually
    let b = new Sprite('popart_knife');
    b.x = 900 - 900 / 3;
    b.y = 500 / 2;
    this.addChild(b);

    this.a = a;
    this.b = b;
  }

  onUpdate(dt) {
    if (!Black.assets.isAllLoaded)
      return;

    this.a.rotation = 2 * Black.time.now;
    this.b.rotation = 2 * Black.time.now + Math.PI;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();