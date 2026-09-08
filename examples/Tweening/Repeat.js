class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(900, 500);

    var assets = new AssetManager();
    
    assets.enqueueImage('bg', '/assets/examples/backgrounds/popart_bg_b_2.png');
    assets.enqueueImage('clock_top', '/assets/examples/popart_clock_top.png');
    assets.enqueueImage('clock_bottom', '/assets/examples/popart_clock_bottom.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {

    this.addChild(new Sprite('bg'));

    // Create a sprite to tween
    let pendulum = new Sprite('clock_bottom');
    this.addChild(pendulum);
    pendulum.x = Black.stage.centerX;
    pendulum.y = Black.stage.centerY - 180;
    // pendulum.rotation = -Math.PI * 0.2;
    pendulum.anchorX = 0.5;
    pendulum.anchorY = 0.35;

    let clock = new Sprite('clock_top');
    this.addChild(clock);
    clock.x = Black.stage.centerX;
    clock.y = Black.stage.centerY - 100;
    clock.alignPivot();

    this.createHint();

    // Create a tween
    let tween = new Tween({ rotation: [Math.PI * 0.2, 0, -Math.PI * 0.2, 0] }, 2, { ease: Ease.linear });

    // Set repeat 3 times
    tween.repeat = 3;

    // Add the tween to sprite
    pendulum.addComponent(tween);
  }

  createHint() {
    let hintText = new TextField('Repeats 3 times', 'arial', 0xffffff, 42);
    hintText.x = this.stage.centerX;
    hintText.y = 475;
    hintText.strokeColor = 0x006bc6;
    hintText.strokeThickness = 8;
    hintText.autoSize = false;
    hintText.fieldWidth = 900;
    hintText.align = 'center';
    hintText.alignPivot();
    this.addChild(hintText);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start()