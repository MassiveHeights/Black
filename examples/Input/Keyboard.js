class MyGame extends GameObject {
  constructor() {
    super();

    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    this.textField = new TextField('PRESS ANY KEY', 'arial', 0xf6a200, 42);
    this.textField.x = 500 / 2;
    this.textField.y = 500 / 2;
    this.textField.autoSize = false;
    this.textField.fieldWidth = 500;
    this.textField.align = 'center';
    this.textField.alignPivot();

    this.addChild(this.textField);

    Black.input.on('keyPress', this.onKeyPress, this);
  }

  onKeyPress(msg, keyInfo) {
    if (keyInfo.keyCode == Key.BACKSPACE)
      this.textField.text = this.textField.text.substring(0, this.textField.text.length - 1);
    else
      this.textField.text += keyInfo.char;
  }

  onKeyUp(msg, keyInfo) { }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();