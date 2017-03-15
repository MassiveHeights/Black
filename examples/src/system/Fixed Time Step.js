"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor(){
    super();

    // Create own asset manager
    this.assets = new AssetManager();
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueue('rect', 'rect55.png');
    this.assets.enqueue('bp', 'blueprint-landscape.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded(){
    let tBg = this.assets.getAsset('bp');
    let img = this.assets.getAsset('rect');

    // Add background sprite
    this.addChild(new Sprite(tBg));

    // Add rectangle
    this.rect1 = new Sprite(img);
    this.rect1.x = 10;
    this.rect1.y = 640 / 3;
    this.addChild(this.rect1);

    this.rect2 = new Sprite(img);
    this.rect2.x = 10;
    this.rect2.y = 640 / 3 + 110;
    this.addChild(this.rect2);

    Black.instance.simulationTimestep = 1000 / 10;
    Black.instance.maxAllowedFPS = 60;
  }

  onFixedUpdate(dt){
    console.log('fix', dt);
    this.rect1.x += 60 * dt; // 60 px per frame

    if (this.rect1.x >= 960)
      this.rect1.x = 10;
  }

  onUpdate(dt){
    console.log('var', dt);
    if (!this.rect1)
      return;

    this.rect2.x += 60 * dt;

    if (this.rect2.x >= 960)
      this.rect2.x = 10;
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'dom');
black.start();
