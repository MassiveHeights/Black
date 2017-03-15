"use strict";

class MyButton extends GameObject {
  onAdded() {
    console.log('my button added');
  }

  onRemoved() {
    console.log('my button removed');
  }
}

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueueImage('rect', 'rect55-red.png');
    this.assets.enqueueImage('bp', 'blueprint-landscape.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAdded() {}

  onAssetsLoadded() {
    this.view = new GameObject();
    this.view.addComponent(new MRComponent(960, 640));

    this.addChild(this.view);
    this.view.addChild(new Sprite('bp'));

    this.sprite = new Sprite('rect');
    this.sprite.x = 960 / 2;
    this.sprite.y = 640 / 2;
    this.view.addChild(this.sprite);

    this.view.addComponent(new FPSComponent());
  }

  onUpdate(dt) {
    if (!this.sprite)
      return;
    this.sprite.rotation += 1 * dt;
  }
}

// Create and start engine
var black = new Black('container', MyGame, 'dom');
black.start();
