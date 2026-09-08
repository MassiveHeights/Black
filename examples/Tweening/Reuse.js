class MyGame extends GameObject {
  constructor() {
    super();

     // Set auto resizeable stage
     Black.stage.scaleMode = StageScaleMode.LETTERBOX;
     Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('image', '/assets/examples/popart_bag_3.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create a sprite
    let sprite = new Sprite('image');
    this.addChild(sprite);
    sprite.x = 500 / 2;
    sprite.y = 0;
    sprite.alignPivot();

    // Create a tween
    // Disable removeOnComplete so we can reuse it in future
    let tween = sprite.addComponent(new Tween({ y: 250 }, 2, { removeOnComplete: false }));

    // Use the same tween to move sprite
    setTimeout(() => {
      tween.removeOnComplete = true;
      tween.ease = Ease.exponentialIn;
      tween.to({ x: 500 }).play();
    }, 3000);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();