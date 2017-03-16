"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';
    // Preload some images
    this.assets.enqueueAtlas('atlas', 'atlas.png', 'atlas.json');
    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);
    // Add background sprite
    var bg = new Sprite('blueprint-landscape');
    this.view.addChild(bg);

    this.sun = new Sprite('sun');
    this.sun.x = 960 / 2;
    this.sun.y = 640 / 2;
    this.sun.name = 'sun';
    this.sun.alpha = 0.7;
    this.sun.alignPivot();
    this.sun.scaleX = this.sun.scaleY = 1.28;

    this.earth = new Sprite('earth');
    this.earth.pivotX = this.earth.pivotY = 64;
    this.earth.setTransform(200, 200, 0, 0.5, 0.5);

    this.moon = new Sprite('moon');
    this.moon.x = 64;
    this.moon.y = 64;

    this.moon.pivotX = 500;
    this.moon.pivotY = 500;

    this.moon.setTransform(64, 64, 0, 0.2, 0.2);

    this.view.addChild(this.sun);
    this.sun.addChild(this.earth);
    this.earth.addChild(this.moon);

    console.log('bounds', this.sun.onGetLocalBounds());
  }

  onUpdate(dt) {
    if (!this.sun)
      return;

    this.sun.rotation += 1 * dt;
    this.earth.rotation += 1 * dt;
    this.moon.rotation += 1 * dt;
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'dom');
black.start();
