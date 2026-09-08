class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('button', '/assets/examples/popart_mac_button.png');
    assets.enqueueImage('button-pressed', '/assets/examples/popart_mac_button_down.png');

    assets.enqueueImage('square', '/assets/examples/popart_mac_window_1.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.touchable = true;

    this.window = new Sprite('square');
    this.window.name = 'Window';
    this.window.x = this.stage.centerX;
    this.window.y = this.stage.centerY;
    this.window.alignPivot();
    this.window.touchable = true;

    this.add(this.window);

    this.btn = new Sprite('button');
    this.btn.name = 'Button';
    this.btn.x = this.window.width * 0.5;
    this.btn.y = this.window.height * 0.75;
    this.btn.touchable = true;
    this.btn.alignPivot();
    this.window.addChild(this.btn);

    this.on(Input.POINTER_DOWN, this.onStagePointerEvent, this);
    this.window.on(Input.POINTER_UP, this.onWhitePointerEvent, this);
    
    this.btn.on(Input.POINTER_DOWN, this.onButtonPointerEvent, this);
    this.btn.on(Input.POINTER_MOVE, this.onButtonPointerMoveEvent, this);

    this.textField = new TextField('Click Me', 'arial', 0x0, 24);
    this.textField.x = this.window.width * 0.5;
    this.textField.y = this.window.height * 0.4;
    this.textField.autoSize = true;
    this.textField.align = 'center';
    this.textField.alignPivot();
    this.window.addChild(this.textField);
  }

  onStagePointerEvent(msg) {
    console.log('stage clicked', msg.sender === this);
  }

  onWhitePointerEvent(msg, info) {
    console.log('window clicked', msg.sender === this.window);

    this.textField.text = msg.sender.name + ' ~ ' + msg.name;
    this.textField.alignPivot();
  }

  onButtonPointerEvent(msg, info) {
    console.log('button clicked', msg.sender === this.btn);

    this.textField.text = msg.sender.name + ' ~ ' + msg.name;
    this.textField.alignPivot();

    this.btn.textureName = this.btn.textureName === 'button' ? 'button-pressed' : 'button';
  }

  onButtonPointerMoveEvent(msg, info) {
    let localPosition = msg.sender.globalToLocal(Black.input.pointerPosition);
    // your code goes here
  }

  onUpdate(dt) {
    if (Black.assets.isAllLoaded === false)
      return;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();