class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('gear', '/assets/examples/popart_gear_1.png');
    assets.enqueueImage('bg', '/assets/examples/backgrounds/popart_bg_gre_2.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    let bg = this.addChild(new Sprite('bg'));
    bg.x = this.stage.centerX;
    bg.y = this.stage.centerX;
    bg.alignPivot();

    this.sAnvil1 = new Sprite('gear');
    this.sAnvil1.name = 'anvil-1';
    this.sAnvil1.x = 500 / 2 - 77;
    this.sAnvil1.y = 500 / 2;
    this.sAnvil1.rotation = 0.4;
    this.sAnvil1.onUpdate = () => {
      this.sAnvil1.rotation += 2 * Black.time.delta;
    };
    this.sAnvil1.alignPivot();
    this.addChild(this.sAnvil1);

    this.sAnvil3 = new Sprite('gear');
    this.sAnvil3.name = 'anvil-3';
    this.sAnvil3.x = 500 / 2 + 77;
    this.sAnvil3.y = 500 / 2;
    this.sAnvil3.alignPivot();
    this.sAnvil3.onUpdate = () => {
      this.sAnvil3.rotation -= 2 * Black.time.delta;
    };
    this.addChild(this.sAnvil3);
  }

  onUpdate(dt) {
    if (Black.time.now > 2 && this.numChildren > 0)
      this.removeChild(this.sAnvil3);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();