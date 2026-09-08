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
    this.textField.alignPivot();
    this.addChild(this.textField);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();