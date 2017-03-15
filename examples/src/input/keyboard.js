// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueueImage('bp', 'blueprint-landscape.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
    this.input = Input.instance;
    this.game = Black.instance;
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);

    let bg = new Sprite('bp');
    this.view.addChild(bg);

    let text = new TextField('PRESS ANY KEY', 45);
    text.y = 320;
    text.autoSize = false;
    text.fieldWidth = 960;
    text.align = 'center';
    this.view.addChild(text);
    this.textField = text;

    this.pressed = [];

    Input.on('keyPress', this.onKeyPress, this);
    Input.on('keyUp', this.onKeyUp, this);
  }

  onKeyPress(msg, keyInfo) {
    this.pressed.push(keyInfo.code);

    this.textField.text = this.pressed.join(' ');
  }

  onKeyUp(msg, keyInfo) {
    this.pressed.splice(this.pressed.indexOf(keyInfo.code, 1));

    if (this.pressed.lenght > 0)
      this.textField.text = this.pressed.join(' ');
    else
      this.textField.text = 'PRESS ANY KEY';
  }
}


// Create and start engine
var black = new Black('container', MyGame, 'dom');
black.start();
