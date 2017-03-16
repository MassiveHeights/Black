"use strict";
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

    this.sTopLeft = new Sprite('rect');
    this.sTopLeft.x = 0;
    this.sTopLeft.y = 0;
    this.view.addChild(this.sTopLeft);

    this.sTopRight = new Sprite('rect');
    this.sTopRight.x = 960 - 55;
    this.sTopRight.y = 10;
    this.view.addChild(this.sTopRight);

    this.sBottomLeft = new Sprite('rect');
    this.sBottomLeft.x = 0;
    this.sBottomLeft.y = 640 - 55;
    this.view.addChild(this.sBottomLeft);

    this.sBottomRight = new Sprite('rect');
    this.sBottomRight.x = 960 - 55;
    this.sBottomRight.y = 640 - 55;
    this.view.addChild(this.sBottomRight);
  }

  onUpdate(dt) {
  }
}

// Create and start engine
var black = new Black('container', MyGame, 'dom');
black.start();
