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
    this.fonts = ['Indie Flower', 'Saira Semi Condensed', 'Noto Serif', 'Krona One', 'Lobster', 'Oswald', 'Roboto Slab'];

    let textField = new TextField('Lorem ipsum dolor sit amet!');
    textField.size = 42;
    textField.font = this.fonts[Math.floor(Math.random() * this.fonts.length)];
    textField.autoSize = false;
    textField.fieldWidth = 500;
    textField.fieldHeight = 500;
    textField.align = 'center';
    textField.vAlign = 'middle';
    textField.strokeThickness = 0;
    this.addChild(textField);

    this.textField = textField;
  }

  onUpdate() {
    if (Black.assets.isAllLoaded === false)
      return;

    this.textField.textColor = ~~(Math.random() * 0x1000000);
    this.textField.font = this.fonts[Math.floor(Math.random() * this.fonts.length)];
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();