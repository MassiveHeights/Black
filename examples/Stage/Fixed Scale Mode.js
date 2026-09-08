class MyGame extends GameObject {
  constructor() {
    super();

    var assets = new AssetManager();
    assets.enqueueImage('bg', '/assets/examples/backgrounds/popart_bg_gre_2.png');
    assets.enqueueImage('sticker', '/assets/examples/popart_anvil.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();

    // Try to keep stage size withing desired width and height
    Black.stage.scaleMode = StageScaleMode.FIXED;
    Black.stage.setSize(500, 500);
  }

  onAssetsLoaded(m) {
    this.bg = this.addChild(new Sprite('bg'));
    this.bg.alignPivot();

    this.sprite = new Sprite('sticker');
    this.sprite.alignPivot();
    this.addChild(this.sprite);

    this.stage.on('resize', this.onResize, this);
    this.onResize();
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
