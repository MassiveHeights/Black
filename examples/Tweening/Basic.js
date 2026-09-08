class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('car', '/assets/examples/popart_car_red.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    let container = new DisplayObject();

    // Create a sprite
    let sprite = new Sprite('car');

    // Add just created sprite directly to this GameObject
    this.addChild(container);
    container.addChild(sprite);

    // Center the image
    sprite.x = 100;
    sprite.y = 500 / 2;

    sprite.alignPivot();

    // Create the tween which will move the GameObject to 800 on x-axis with a second delay
    // It'll play on added to GameObject. If you don't want it just set playOnAdded option to false
    let tween = new Tween({ x: 500 }, 2, { delay: 0.25 });

    // Add tween to sprite
    container.addComponent(tween);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();