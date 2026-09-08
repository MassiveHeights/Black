class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('tree', '/assets/examples/popart_tree.png');
    assets.enqueueImage('apple', '/assets/examples/popart_apple.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.tree = new Sprite('tree');
    this.tree.x = 500 / 2;
    this.tree.y = 500;
    this.tree.anchorX = 0.5
    this.tree.anchorY = 1;
    this.add(this.tree);

    let apple = new Sprite('apple');
    apple.x = this.tree.width / 2;
    apple.y = 10;
    this.tree.add(apple);
  }

  onUpdate(dt) {
    if (Black.assets.isAllLoaded === false)
      return;

    this.tree.scaleY = Math.sin(Black.time.now) + 1;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();