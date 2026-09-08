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
    container.x = 500 / 2;
    container.y = 500 / 2;
    this.add(container);

    let scatter = new VectorScatter(0, 0, 2000, 2000);

    for (let i = 0; i < 25000; i++) {
      var apple = new Sprite('apple');

      scatter.getValue();

      apple.x = scatter.value.x;
      apple.y = scatter.value.y;

      apple.rotation = Math.random() * Math.PI * 2;
      apple.alignPivot();

      container.add(apple);
    }

    container.alignPivot();

    // Enable smart cache as bitmap. It will update itself automatically on
    // container or any children change.
    container.cacheAsBitmap = true;

    // Disable auto refreshable bitmap cache and force container to be always cached as bitmap
    container.cacheAsBitmapDynamic = false;

    this.container = container;
  }

  onUpdate() {
    if (Black.assets.isAllLoaded === false)
      return;

    this.container.rotation += 0.001;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();