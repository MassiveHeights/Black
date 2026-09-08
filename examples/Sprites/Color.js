class MyGame extends DisplayObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueAtlas('assets', '/assets/examples/atlas.png', '/assets/examples/atlas.json');

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create a sprite
    var sprite = new Sprite('popart_iphone');
    sprite.x = this.stage.centerX;
    sprite.y = this.stage.centerY;
    sprite.color = 0xffffff;
    sprite.alignPivot();
    this.add(sprite);

    // Tweening from original color to red and back
    sprite.add(new Tween({ color: [0x0000ff]}, 1, { loop: true }, {color: ColorHelper.lerpHSV}));
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();