class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('image', '/assets/examples/popart_loading.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create a sprite
    let sprite = new Sprite('image');

    // Add just created sprite directly to this GameObject
    this.addChild(sprite);

    // Center the image
    sprite.x = Black.stage.centerX;
    sprite.y = Black.stage.centerY;

    sprite.alignPivot();

    // Create a tween
    let tween = new Tween({ rotation: 2 * Math.PI }, 4, { ease: Ease.linear });
    // Set loop to true
    tween.loop = true;

    // Add the tween to sprite
    sprite.addComponent(tween);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start()