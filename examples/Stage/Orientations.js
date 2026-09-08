class MyGame extends GameObject {
  constructor() {
    super();

    var assets = new AssetManager();
    assets.enqueueImage('bg', '/assets/examples/backgrounds/popart_bg_gre_2.png');
    assets.enqueueImage('sticker', '/assets/examples/popart_anvil.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();

    // Try to keep stage size withing desired width and height
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(900, 500);

    // Setting orientation to landscape will prevent stage from rotating
    // on device orientation change
    Black.engine.viewport.orientation = Orientation.LANDSCAPE;
  }

  onAssetsLoaded(m) {
    this.bg = this.addChild(new Sprite('bg'));

    this.sprite = new Sprite('sticker');
    this.sprite.alignPivot();
    this.addChild(this.sprite);

    this.stage.on('resize', this.onResize, this);
    this.onResize();
  }

  onResize() {
    this.bg.x = 0;
    this.bg.y = 0;
    
    this.sprite.x = this.stage.centerX;
    this.sprite.y = this.stage.centerY;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();
