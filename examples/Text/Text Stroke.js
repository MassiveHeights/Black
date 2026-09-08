class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);
  }

  onAdded() {
    var assets = new AssetManager();
    assets.enqueueGoogleFont('VT323');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.textField = new TextField('', 'VT323', 0xEFD28D, 90);
    this.textField.multiline = true;
    this.textField.x = this.stage.centerX;
    this.textField.y = this.stage.centerY;
    this.textField.align = 'center';
    this.textField.strokeThickness = 10;
    this.textField.strokeColor = 0xA50104;
    this.textField.alpha = 1;
    this.textField.lineHeight = 1;
    this.textField.autoSize = true;
    this.textField.strokeAlpha = 0.5;
    this.textField.textAlpha = 1;
    this.addChild(this.textField);

    this.textField.alignPivot();
    this.textField.value = 0;

    let tween = new Tween({ value: 420 }, 24, { delay: 0, ease: Ease.exponentialOut });
    this.textField.addComponent(tween);
  }

  onUpdate(dt) {
    if (!this.textField)
      return;

    this.textField.text = `${(~~this.textField.value).toString()} km/h`;
    this.textField.alignPivot();
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();