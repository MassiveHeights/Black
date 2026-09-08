class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    let text = '~{tag}You can ~{def}STYLE~{tag} your ~{red}text!\n~{def}In multiple ~{tag}ways!';

    let textField = new TextField(text, 'arial', 0xffffff, 26);

    // To make custom tags in string work, we need to register new styles which correspond to each tag name
    // Tag "def" means using default style
    textField.setStyle('tag', new TextStyle('arial', 0x99ff33, 20, FontStyle.ITALIC, FontWeight.NORMAL, 8, 0x333333));
    textField.setStyle('red', new TextStyle('arial', 0xffff00, 20, FontStyle.NORMAL, FontWeight.BOLD, 8, 0x333333));

    textField.weight = FontWeight.BOLD;
    textField.textColor = 0xffffff;
    textField.lineHeight = 1;
    textField.autoSize = false;
    textField.fieldWidth = 500;
    textField.fieldHeight = 500;
    textField.align = 'center';
    textField.vAlign = 'middle';

    textField.multiline = true;

    this.addChild(textField);
  }

  onDebug(debugDriver) {
    debugDriver.attach(this.textField);
    Debug.attach(textField);
    Debug.detach(textField);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();