class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueGoogleFont('Noto Serif');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.textField = new TextField('SHADOW IN THE DARKNESS\n\n\n~{light}COMING SOON', 'Noto Serif', 0x0, 42);
    this.textField.setStyle('light', new TextStyle('Noto Serif', 0x999999, 20, FontStyle.NORMAL, FontWeight.BOLD, 8, 0x333333));
    this.textField.multiline = true;
    this.textField.weight = FontWeight.BOLD;
    this.textField.align = 'center';
    this.textField.x = 500 / 2;
    this.textField.y = 500 / 2;
    this.textField.alignPivot();
    this.textField.dropShadow = true;
    this.textField.shadowColor = 0x7e5af0;
    this.textField.shadowDistanceX = 0;
    this.textField.shadowDistanceY = 0;
    this.textField.shadowBlur = 0;
    this.addChild(this.textField);
  }

  onUpdate() {
    if (Black.assets.isAllLoaded === false)
      return;

    let r = Math.random() < 0.03;
    let dx = (Math.random() > 0.5) ? 1 : -1;
    let dy = (Math.random() > 0.5) ? 1 : -1;
    this.textField.shadowDistanceX = r ? ~~MathEx.randomBetween(5, 10) * dx : 0;
    this.textField.shadowDistanceY = r ? ~~MathEx.randomBetween(5, 10) * dy : 0;

    this.textField.shadowBlur = ~~(Math.random() * 20);
    this.textField.alpha -= 0.002;

    if (this.textField.alpha <= 0)
      this.textField.alpha = 1;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();