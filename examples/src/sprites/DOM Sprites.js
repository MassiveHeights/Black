"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor(){
    super();

    // Create own asset manager
    this.assets = new AssetManager();
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueue('rect', 'rect55-red.png');
    this.assets.enqueue('bp', 'blueprint-landscape.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded(){
    let tBg = this.assets.getAsset('bp');
    let img = this.assets.getAsset('rect');

    // Add background sprite
    let bg = new Sprite(tBg)
    this.addChild(bg);

    // Add rectangles
    this.sprite1 = new Sprite(img);
    this.sprite1.x = 960 / 2;
    this.sprite1.y = 640 / 2;
    this.sprite1.center();

    this.sprite2 = new Sprite(img);
    this.sprite2.x = 0;
    this.sprite2.y = 0;

    // this.addChild(this.sprite1);
     this.addChild(this.sprite2);
  }

  onUpdate(dt){
    if (!this.sprite1)
     return;
    //
    // this.sprite1.x += 0.3051;
    this.sprite2.x += 0.3051;
    //
    // this.sprite1.rotation = this.sprite2.rotation = this.sprite2.rotation + 0.01;
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'dom');
black.start();
