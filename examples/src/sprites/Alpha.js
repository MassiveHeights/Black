"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor(){
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

  onAssetsLoadded(){
    this.view = new GameObject();
    this.view.addComponent(new MRComponent(960, 640));
    this.addChild(this.view);

    // Add background sprite
    this.view.addChild(new Sprite('bp'));

    let lastParent = null;

    // Add rectangles
    this.sprite1 = new Sprite('rect');
    this.sprite1.x = (55 * 6);
    this.sprite1.y = (55 * 3);
    this.sprite1.alpha = 1;
    this.sprite1.alignPivot();
    this.view.addChild(this.sprite1);

    this.sprite2 = new Sprite('rect');
    this.sprite2.x = 55 / 2;
    this.sprite2.y = 55 / 2;
    this.sprite2.alpha = 0.5;
    this.sprite1.addChild(this.sprite2);

    this.sprite3 = new Sprite('rect');
    this.sprite3.x = 55 / 2;
    this.sprite3.y = 55 / 2;
    this.sprite3.alpha = 0.5;
    this.sprite2.addChild(this.sprite3);

    this.rect = new Sprite('rect');
    this.rect.x = 150;
    this.rect.y = 100;
    this.rect.alpha = 1;
    this.view.addChild(this.rect);
  }

  onUpdate(dt){
    if (!this.sprite1)
      return;

    this.sprite1.rotation += 1 * dt;

    let s = Math.sin(this.sprite1.rotation);
    this.sprite1.scaleX = s * 5;
    this.sprite1.scaleY = s * 5;
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'dom');
black.start();
