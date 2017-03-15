"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = new AssetManager();
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueue('sun', 'sun.png');
    this.assets.enqueue('earth', 'earth.png');
    this.assets.enqueue('moon', 'moon.png');
    this.assets.enqueue('bp', 'blueprint-landscape.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);
    this.addComponent(mr);

    var tBg = this.assets.getAsset('bp');
    var bg = new Sprite(tBg);
    this.addChild(bg);

    // Add background sprite
    this.sun = new Sprite(this.assets.getAsset('sun'));
    this.sun.name = "Sun";
    this.sun.alpha = 0.7;
    this.sun.center();
    this.sun.scaleX = this.sun.scaleY = 1.28;

    let inputSun = new InputComponent();
    inputSun.onPointerDown.add(this.onPointerDown);
    this.sun.addComponent(inputSun);

    this.earth = new Sprite(this.assets.getAsset('earth'));
    this.earth.name = "Earth";
    this.earth.center();
    this.earth.setTransform(200, 200, 0, 0.5, 0.5);

    let inputEarth = new InputComponent();
    inputEarth.onPointerDown.add(this.onPointerDown);
    this.earth.addComponent(inputEarth);

    this.moon = new Sprite(this.assets.getAsset('moon'));
    this.moon.name = "Moon";
    this.moon.x = 64;
    this.moon.y = 64;

    let inputMoon = new InputComponent();
    inputMoon.onPointerDown.add(this.onPointerDown);
    this.moon.addComponent(inputMoon);

    this.moon.pivotX = 500;
    this.moon.pivotY = 500;

    this.moon.setTransform(64, 64, 0, 0.2, 0.2);

    this.sun.x = 960 / 2;
    this.sun.y = 640 / 2;

    this.addChild(this.sun);
    this.sun.addChild(this.earth);
    this.earth.addChild(this.moon);

    this.txtFPS = new Text('FPS: 0');
    this.txtFPS.x = 20;
    this.txtFPS.y = 52;
    this.addChild(this.txtFPS);
  }

  onPointerDown(e){
    console.log(e.target.name);

    e.target.scaleX += 0.1;
    e.target.scaleY = e.target.scaleX;
  }

  onUpdate(dt) {
    if (!this.sun)
      return;

    this.sun.rotation += 0.1 * dt;
    this.earth.rotation += 2 * dt;
    this.moon.rotation -= 2 * dt;

    this.txtFPS.text = 'FPS: ' + black.FPS;
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'dom');
black.start();
