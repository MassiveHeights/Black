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
    Black.stage.setSize(960, 640);

    // Setting orientation to landscape will prevent stage from rotating
    // on device orientation change
    Black.engine.viewport.orientation = Orientation.LANDSCAPE;

    // Prevent stage from rotating
    Black.engine.viewport.orientationLock = true;
  }

  onAssetsLoaded(m) {
    this.bg = this.addChild(new Sprite('bg'));
    this.bg.scale = 2;
    this.bg.alignPivot();

    this.sprite = new Sprite('sticker');
    this.sprite.alignPivot();
    this.addChild(this.sprite);

    this.bg.x = this.stage.centerX;
    this.bg.y = this.stage.centerY;

    this.sprite.x = this.stage.centerX;
    this.sprite.y = this.stage.centerY;

    this.stage.on('resize', this.onResize, this);
  }

  onResize() {
    this.bg.x = this.stage.centerX;
    this.bg.y = this.stage.centerY;

    this.sprite.x = this.stage.centerX;
    this.sprite.y = this.stage.centerY;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();
engine.pauseOnHide = false;
engine.pauseOnBlur = false;