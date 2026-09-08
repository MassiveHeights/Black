class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('bottle_empty', '/assets/examples/popart_bottle.png');
    assets.enqueueImage('bottle_half', '/assets/examples/popart_bottle_1.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.rect = new Rectangle(-50, 100, 100, 100);

    this.bottleEmpty = new Sprite('bottle_empty');
    this.bottleEmpty.alignPivot();
    this.bottleEmpty.x = 500 / 2;
    this.bottleEmpty.y = 500 / 2;
    this.addChild(this.bottleEmpty);

    this.bottleHalf = new Sprite('bottle_half');
    this.bottleHalf.alignPivot();
    this.bottleHalf.x = 500 / 2;
    this.bottleHalf.y = 500 / 2;
    this.bottleHalf.clipRect = this.rect;
    this.addChild(this.bottleHalf);
  }

  onUpdate(dt) {
    if (!Black.assets.isAllLoaded)
      return;

    this.rect.y = (Math.cos(Black.time.now) + 1) * 50;
    this.bottleHalf.clipRect = this.rect;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();