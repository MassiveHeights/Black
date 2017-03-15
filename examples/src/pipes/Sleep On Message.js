"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = new AssetManager();
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueue('rect', 'rect55-red.png');
    this.assets.enqueue('bp', 'blueprint-landscape.png');

    // Pass on load complete handler and this for correct context
    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {
    this.addComponent(new MRComponent(960, 640));

    let tBg = this.assets.getAsset('bp');
    let img = this.assets.getAsset('rect');

    // Add background sprite
    let bg = new Sprite(tBg)
    bg.addComponent(new InputComponent());
    bg.name = 'background';
    bg.tag = 'bg';
    this.addChild(bg);

    console.log('Before');

    this.spawn(function *(){
      console.log('Lets wait for 2 seconds...');
      yield this.wait(2);

      console.log('Fade out the background.');
      bg.addComponent(new Tween({alpha: 0}, 0.5));

      console.log('Lets wait for 1 more second and fade in the background.');
      yield this.wait(1);

      console.log('Fade out the background.');
      bg.addComponent(new Tween({alpha: 1}, 0.5));

      console.log('Okey! Wait for a pointerDown message on background now!');
      yield bg.waitMessage('pointerDown');

      console.log('Done!');
    });

    console.log('After');
  }

  onUpdate() {
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'dom');
black.start();
