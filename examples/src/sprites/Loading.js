"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = new AssetManager();
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueue('rect', 'rect64.png');
    this.assets.enqueue('bp', 'blueprint-landscape.png');

    //this.assets.progressChanged.add(this.onProgressChanged, this);
    //this.assets.allLoaded.add(this.onAssetsLoadded, this);
    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onProgressChanged(p) {
    console.log(`loading progress ${(p*100).toFixed(2)}%`);
  }

  onAssetsLoadded() {
    console.log('assets loaded');
    let tBg = this.assets.getAsset('bp');
    let img = this.assets.getAsset('rect');

    // Add background sprite
    this.addChild(new Sprite(tBg));
    // Add rectangle
    this.rect = new Sprite(img);
    this.rect.visible = false;
    this.rect.x = 55 * 7;
    this.rect.y = 55 * 4;
    this.addChild(this.rect);
  }

  onUpdate() {
    if (!this.rect)
      return;

    this.rect.rotation += 0.01;
  }
}

// Create and start engine
var black = new Black('container', MyGame, 'dom');
black.start();
