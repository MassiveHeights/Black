"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = new AssetManager();
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueue('img-atlas', 'atlas.png');
    this.assets.enqueue('json-atlas', 'atlas.json');

    // Pass on load complete handler and this for correct context
    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);

    let atlas = new AtlasTexture(this.assets.getAsset('img-atlas'), this.assets.getAsset('json-atlas'));

    var tBg = atlas.getTexture('blueprint-landscape');

    // Add background sprite
    var bg = new Sprite(tBg);
    this.view.addChild(bg);

    var tCross = atlas.getTexture('cross');
    var tHeart = atlas.getTexture('heart');

    let t1 = atlas.getTexture('sun');
    let t2 = atlas.getTexture('earth');
    let t3 = atlas.getTexture('moon');

    var sh = new Sprite(tHeart);
    sh.center();
    sh.scaleX = sh.scaleY = 0.5;
    sh.rotation = Math.PI * 0.5;

    let e = new Emitter();
    e.emitCount = new FloatScatter(1, 1);
    e.emitDelay = new FloatScatter(0);
    e.emitInterval = new FloatScatter(1/60);
    e.emitNumRepeats = new FloatScatter(Infinity);
    e.textures = [t3, t2, t1];

    e.x = 960 / 2;
    e.y = 640 / 2;
    e.space = this.view;
    e.addInitializer(new Life(new FloatScatter(0.1, 1)));
    e.addInitializer(new Position(new VectorScatter(-0, -0, 0, 0)));
    //e.addInitializer(new RandomTexture(new FloatScatter(0, 10)));

    e.addAction(new Acceleration(new VectorScatter(0, 200, 0, 2000)));
    e.addAction(new ScaleOverLife(new FloatScatter(0.5, 0, Ease.bounceOut)));
    e.addAction(new TextureOverLife(new FloatScatter(0, 3)));

    this.view.addChild(e);

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
var black  = new Black('container', MyGame, 'canvas');
black.start();
