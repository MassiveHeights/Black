class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    // Pick up default AssetManager
    var assets = new AssetManager();

    // Preload an Font
    assets.enqueueFont('customFont', '/assets/examples/font-webfont.woff');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    //create text field
    let textField = new TextField('Lorem ipsum dolor sit amet!', 'customFont', 0xf6a200, 50);
    textField.x = 500 / 2;
    textField.y = 500 / 2;
    textField.align = 'center';
    textField.alignPivot();
    this.addChild(textField);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();