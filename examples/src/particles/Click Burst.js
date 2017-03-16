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
    e.name = 'emmy';
    e.emitCount = new FloatScatter(0);
    e.emitDelay = new FloatScatter(0);
    e.emitInterval = new FloatScatter(0);
    e.emitDuration = new FloatScatter(0);
    e.emitNumRepeats = new FloatScatter(0);
    e.textures = [tHeart];

    e.x = 960 / 2;
    e.y = 640 / 2;
    e.space = this.view;
    e.addInitializer(new Life(new FloatScatter(1.15)));
    e.addInitializer(new Velocity(new VectorScatter(-800, -800, 800, 800)));
    e.addAction(new Acceleration(new VectorScatter(0, 2800, 0, 2800)));

    this.view.addChild(e);
    this.emitter = e;

    Input.on('pointerDown', this.onDown, this);
  }

  onDown(){
    let p = this.view.globalToLocal(Input.pointerPosition);
    this.emitter.x = p.x;
    this.emitter.y = p.y;
    this.emitter.resetState();
    this.emitter.emitDuration = new FloatScatter(0.001);
    this.emitter.emitCount = new FloatScatter(5);
    this.emitter.emitNumRepeats = new FloatScatter(1);
  }

  onPostUpdate(dt)
  {
  }
}
// Create and start engine
let black  = new Black('container', MyGame, 'canvas');
black.start();
