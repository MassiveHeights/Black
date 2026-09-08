class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    // Pick up default AssetManager
    var assets = new AssetManager();

    // Preload an Font
    assets.enqueueGoogleFont('Exo');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    //create text field
    let textField = new TextField('Score: 0', 'Exo', 0xff66ff, 42);
    textField.x = this.stage.centerX;
    textField.y = this.stage.centerY;    
    this.addChild(textField);

    // Center anchor point
    textField.alignAnchor();

    let timer = new Timer(0.1, Infinity, true);
    this.addComponent(timer);

    this.score = 100;

    timer.on('tick', x => {
      this.score *= 2;

      textField.text = `Score: ${this.score}`;
    });
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();