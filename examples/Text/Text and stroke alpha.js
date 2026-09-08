class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);
  }

  onAdded() {
    this.textField = new TextField('Arial is your best friend!', 'Arial', 0xf6a200, 40);
    this.textField.align = 'center';
    this.textField.x = this.stage.centerX;
    this.textField.y = this.stage.centerY;

    // this.textField.strokeThickness = 3;
    // this.textField.strokeColor = 0x3399ff;
    // this.textField.strokeAlpha = 1;

    this.textField.textColor = 0xff0000;
    this.textField.textAlpha = 0.3;

    this.textField.dropShadow = true;
    this.textField.shadowColor = 0x7e5af0;
    this.textField.shadowAlpha = 1;
    this.textField.shadowDistanceX = 0;
    this.textField.shadowDistanceY = 10;
    this.textField.shadowBlur = 5;

    this.textField.alignPivot();

    this.addChild(this.textField);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();