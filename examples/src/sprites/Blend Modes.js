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
    this.sprite1.x = 55;
    this.sprite1.y = 55;

    this.sprite2 = new Sprite(img);
    this.sprite2.x = 55;
    this.sprite2.y = 55;

    this.sprite3 = new Sprite(img);
    this.sprite3.x = 960 / 2;
    this.sprite3.y = 640 / 2;
    this.sprite3.center();

    let obj = new GameObject();

    //this.sprite3.alpha = 20;
    this.sprite3.blendMode = BlendMode.ADD;
    this.sprite1.blendMode = BlendMode.NORMAL;

    this.sprite2.alpha = 0.85;
    this.sprite1.alpha = 0.85;

    this.addChild(this.sprite3);

    this.sprite3.addChild(obj);
    obj.addChild(this.sprite2);
    this.sprite2.addChild(this.sprite1);
  }

  onUpdate(dt){
    if (!this.sprite1)
      return;

    this.sprite3.rotation += 1 / 60;
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'canvas');
black.start();
