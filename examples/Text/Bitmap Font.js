class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();

    // You can use http://kvazars.com/littera/ to generate bitmap fonts
    assets.enqueueBitmapFont('font', '/assets/examples/font-arial.png', '/assets/examples/font-arial.fnt')

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    //create text field
    let textField = new BitmapTextField('font', 'ABC');
    textField.text = 'FONT LOVERS!\nFONT LOVERS!\nFONT LOVERS!';
    textField.multiline = true;
    textField.lineHeight = 1.2;
    textField.x = 500 / 2;
    textField.y = 500 / 2;
    textField.alignPivot();
    this.addChild(textField);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();