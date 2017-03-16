"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor(){
    super();
    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';
    // Preload some images
    this.assets.enqueueAtlas('atlas', 'atlas.png', 'atlas.json');
    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded(){
    let tBg = 'blueprint-landscape';
    let img = 'rect55-red';

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
let black  = new Black('container', MyGame, 'dom');
black.start();
