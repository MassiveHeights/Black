"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();
    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';
    // Preload some images
    this.assets.enqueueAtlas('img-atlas', 'atlas.png', 'atlas.json');
    // Pass on load complete handler and this for correct context
    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);

    // Add background sprite
    let bg = new Sprite('blueprint-landscape');
    this.view.addChild(bg);

    let tHeart = AssetManager.default.getTexture('heart');

    let e = new Emitter();
    e.emitCount = new FloatScatter(3);
    e.emitDelay = new FloatScatter(0);
    e.emitInterval = new FloatScatter(1/200);
    e.emitNumRepeats = new FloatScatter(Infinity);
    e.textures = [tHeart];

    e.x = 960 / 2;
    e.y = 640 / 2;
    e.space = this.view;
    e.addInitializer(new Life(new FloatScatter(1.15)));

    e.addAction(new ScaleOverLife(new FloatScatter(1, 0, Ease.backIn)));
    e.addAction(new Acceleration(new VectorScatter(-800, -800, 800, 800)));
    e.addAction(new RotationOverLife(new FloatScatter(0, -Math.PI * 2, Ease.backInOut)));

    this.view.addChild(e);
    this.emitter = e;

    this.emitter = e;
  }

  onPostUpdate(dt) {
    if (!this.emitter)
      return;

    let p = this.view.globalToLocal(Input.pointerPosition);
    let dx = p.x - this.emitter.x;
    let dy = p.y - this.emitter.y;

    let t = Black.instance.uptime * 5;
		let x = 13 * Math.sin(t) + Math.random();
		let y = 13 * Math.cos(t) + Math.random();

    this.emitter.x = (x * 12) + 480;
    this.emitter.y = (y * 12) + 320;
    //this.emitter.rotation += 0.1;
    this.emitter.rotation = -Math.PI / 2;
  }
}
// Create and start engine
let black  = new Black('container', MyGame, 'canvas');
black.start();
