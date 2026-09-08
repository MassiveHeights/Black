class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('gear', '/assets/examples/popart_gear_1.png');
    assets.enqueueImage('bg', '/assets/examples/backgrounds/popart_bg_p_2.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    let bg = this.addChild(new Sprite('bg'));
    bg.x = this.stage.centerX;
    bg.y = this.stage.centerX;
    bg.alignPivot();

    this.sGear1 = new Sprite('gear');
    this.sGear1.name = 'anvil-1';
    this.sGear1.x = 500 / 2 - 77;
    this.sGear1.y = 500 / 2;
    this.sGear1.rotation = 0.4;
    this.sGear1.alignPivot();
    this.addChild(this.sGear1);

    this.sGear2 = new Sprite('gear');
    this.sGear2.name = 'anvil-3';
    this.sGear2.x = 500 / 2 + 77;
    this.sGear2.y = 500 / 2;
    this.sGear2.alignPivot();
    this.addChild(this.sGear2);
  }

  onUpdate() {
    if (!Black.assets.isAllLoaded)
      return;

    let dt = Black.time.delta;

    if (Math.random() > 0.95)
      this.sGear1.rotation += 2 * dt;

    // Rotate right gear only if left is not static
    if (this.sGear1.checkStatic() === false)
      this.sGear2.rotation -= 2 * dt;

  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();