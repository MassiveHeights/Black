class MyGame extends DisplayObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('red', '/assets/examples/circle-red.png');
    assets.enqueueImage('green', '/assets/examples/circle-green.png');
    assets.enqueueImage('blue', '/assets/examples/circle-blue.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create a sprite
    var red = new Sprite('red');
    red.x = (500 / 2) - 40;
    red.y = (500 / 2) - 40;
    red.alignPivot();

    var green = new Sprite('green');
    green.x = (500 / 2) + 40;
    green.y = (500 / 2) - 40;
    green.alignPivot();

    var blue = new Sprite('blue');
    blue.x = (500 / 2) + 0;
    blue.y = (500 / 2) + 40;
    blue.alignPivot();

    this.add(red, green, blue);

    // Make sure that game container is a DisplayObject
    this.blendMode = BlendMode.SCREEN;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();