"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor(){
    super();
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

    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);

    let bg = new Sprite('blueprint-landscape');
    bg.x = 960 / 2;
    bg.y = 640 / 2;
    bg.alignPivot();

    this.view.addChild(bg);
    // Add rectangles
    this.sprite1 = new Sprite(img);
    this.sprite1.x = 960 / 2;
    this.sprite1.y = 640 / 2;
    this.sprite1.alignPivot();

    this.sprite2 = new Sprite(img);
    this.sprite2.x = 0;
    this.sprite2.y = 0;
     this.view.addChild(this.sprite2);
  }

  onUpdate(dt){
    if (!this.sprite1)
     return;

    this.sprite2.x += 0.3051;

  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'dom');
black.start();
