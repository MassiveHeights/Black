class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('apple', '/assets/examples/popart_apple.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create a container
    var container = new DisplayObject();
    container.name = 'container';
    container.x = this.stage.centerX;
    container.y = this.stage.centerY;
    this.add(container);

    let scatter = new RadialScatter(0, 0, 30, 200);

    for (let i = 0; i < 3000; i++) {
      var apple = new Sprite('apple');

      // scatter.getValueAt(Ease.cubicOut(1 - (i / 1000)));
      scatter.getValueAt(i / 2000);

      apple.x = scatter.value.x;
      apple.y = scatter.value.y;

      apple.rotation = Math.random() * Math.PI * 2;
      apple.alignPivot();

      container.add(apple);
    }

    // Enable smart cache as bitmap. It will update itself automatically on
    // container or any children change.
    container.cacheAsBitmap = true;

    container.alignPivot();

    this.container = container;
  }

  onUpdate() {
    if (Black.assets.isAllLoaded === false)
      return;

    // Randomly animate object, cache will be disable for a few frames 
    if (Math.random() > 0.99)
      this.container.rotation += 0.1;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();