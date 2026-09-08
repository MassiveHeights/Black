class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueGoogleFont('Indie Flower');
    assets.enqueueGoogleFont('Saira Semi Condensed');
    assets.enqueueGoogleFont('Noto Serif');
    assets.enqueueFont('Krona One', '/assets/examples/KronaOne-Regular.ttf');
    assets.enqueueFont('Lobster', '/assets/examples/Lobster-Regular.ttf');
    assets.enqueueFont('Oswald', '/assets/examples/Oswald-Regular.ttf');
    assets.enqueueFont('Roboto Slab', '/assets/examples/RobotoSlab-Regular.ttf');

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    //create text field

    this.createTextField(-150, 'Indie Flower');
    this.createTextField(-100, 'Saira Semi Condensed');
    this.createTextField(-50, 'Noto Serif');
    this.createTextField(0, 'Krona One');
    this.createTextField(50, 'Lobster');
    this.createTextField(100, 'Oswald');
    this.createTextField(150, 'Roboto Slab');
  }

  createTextField(y, fontName) {
    let textField = new TextField('Lorem ipsum dolor sit amet!', fontName, 0xf6a200, 42);
    textField.x = 500 / 2;
    textField.y = (500 / 2) + y;
    textField.autoSize = true;
    textField.alignPivot();
    textField.strokeThickness = 0;
    textField.padding = new Rectangle(100, 100, 100, 100); // add extra padding for bugged fonts
    this.addChild(textField);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();