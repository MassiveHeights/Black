class MyGame extends GameObject {
  constructor() {
    super();

    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('square', '/assets/examples/popart_iphone_1.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // IMPORTANT: make this object touchable so children can also receive input messages
    // Same as touchable = true;
    this.addComponent(new InputComponent());

    // Create a sprite
    this.sprite = new Sprite('square');
    this.sprite.name = 'sprite';
    this.sprite.x = 500 / 2;
    this.sprite.y = 500 / 1.8;
    this.sprite.scaleX = this.sprite.scaleY = 1.5;
    this.sprite.alpha = 1;
    this.sprite.alignPivot();
    this.sprite.addComponent(new InputComponent());
    this.addChild(this.sprite);

    // Listen for sprite input events
    this.sprite.on('pointerDown', this.onPointerEvent, this);
    this.sprite.on('pointerMove', this.onPointerEvent, this);
    this.sprite.on('pointerUp', this.onPointerEvent, this);

    // Listen for global events
    Black.input.on('pointerDown', this.onGlobalPointerEvent, this);
    Black.input.on('pointerMove', this.onGlobalPointerEvent, this);
    Black.input.on('pointerUp', this.onGlobalPointerEvent, this);

    // Add debug text field
    this.spriteText = new TextField('Click on sprite!', 'arial', 0xf6a200, 25);
    this.spriteText.x = 500 / 2;
    this.spriteText.y = 50;
    this.spriteText.align = 'center';
    this.spriteText.textColor = 0xf6a200;
    this.spriteText.alignPivot();
    this.addChild(this.spriteText);

    this.globalText = new TextField('x: 0, y: 0', 'arial', 0xf6a200, 25);
    this.globalText.x = 500 / 2;
    this.globalText.y = 100;
    this.globalText.align = 'center';
    this.globalText.textColor = 0xf6a200;
    this.globalText.alignPivot();
    this.addChild(this.globalText);
  }

  onPointerEvent(msg) {
    this.spriteText.text = 'Sprite ' + msg.name;
    this.spriteText.alignPivot();
  }

  onGlobalPointerEvent(msg) {
    this.spriteText.text = 'Global ' + msg.name;
    this.spriteText.alignPivot();

    this.globalText.text = `x: ${~~Black.input.pointerX}, y: ${~~Black.input.pointerY}`;
    this.globalText.alignPivot();

  }

  onUpdate() {
    if (Black.assets.isAllLoaded === false)
      return;

    this.sprite.rotation += 1 * Black.time.delta;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();