'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    // Pick up default AssetManager
    var assets = new AssetManager();

    // Preload images
    assets.enqueueAtlas('atlas', '/assets/examples/atlas.png', '/assets/examples/atlas.json');
    assets.enqueueImage('bg', '/assets/examples/backgrounds/popart_bg_y_3.png');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoadded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoadded(m) {    
    this.bg = new Sprite('bg');
    this.bg.x = this.stage.centerX;
    this.bg.y = this.stage.centerY;
    this.bg.alignPivot();
    this.addChild(this.bg);

    this.car = new Sprite('popart_car_red');
    this.car.x = this.stage.centerX;
    this.car.y = this.stage.centerY;
    this.car.alignPivot();
    this.addChild(this.car);

    this.tv = new Sprite('popart_tv_new');
    this.tv.x = this.stage.centerX;
    this.tv.y = this.stage.centerY;
    this.tv.alignPivot();
    this.addChild(this.tv);

    // popart_tv_new texture has pivot set in the atlas
    //this.tv.slice9grid = new Rectangle(100, 100, 10, 10);
  }

  onUpdate() {
    if (!Black.assets.isAllLoaded)
      return;

    this.tv.width = (2 + Math.sin(Black.time.now)) * this.tv.texture.width * 0.7;
    this.tv.height = (2 + Math.cos(Black.time.now * 0.3333)) * this.tv.texture.height * 0.7;

    this.car.scale = Math.min(this.tv.scaleX * 0.6, this.tv.scaleY * 0.9);
    this.car.x = this.stage.centerX - 40 * this.car.scale;

    this.bg.clipRect = new Rectangle(-this.tv.width * 0.5 + 10, -this.tv.height * 0.5 + 10, this.tv.width - 10, this.tv.height - 10);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();