"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();
    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';
    // Preload some images
    this.assets.enqueueAtlas('atlas', 'atlas.png', 'atlas.json');
    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onProgressChanged(p) {

    if ((p * 100).toFixed(2) > 100) {
      this.rect.visible = false;
      this.levelComliteText();
      return;
    }
    console.log(`loading progress ${(p*100).toFixed(2)}%`);
  }

  onAssetsLoadded()
  {
    console.log('assets loaded');

    let tBg = 'blueprint-landscape';
    let img = 'rect55-red';

    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);

    let bg = new Sprite(tBg);
    bg.x = 960 / 2;
    bg.y = 640 / 2;
    bg.alignPivot();

    this.view.addChild(bg);
    // Add rectangle
    this.rect = new Sprite(img);
    this.rect.visible = true;
    this.rect.x = 960 / 2;
    this.rect.y = 640 / 2;
    this.rect.alignPivot();
    this.view.addChild(this.rect);

  }
  levelComliteText()
   {
    if (this.textLevel)
      return;

    this.textLevel = new TextField('Level load complite', 45);
    this.textLevel.y = 300;
    this.textLevel.autoSize = false;
    this.textLevel.fieldWidth = 960;
    this.textLevel.color = 0xffff00;
    this.textLevel.align = 'center';
    this.view.addChild(this.textLevel);
  }

  onUpdate() {
    if (!this.rect)
      return;

    this.rect.rotation += 0.01;
    this.onProgressChanged(this.rect.rotation);
  }
}

// Create and start engine
var black = new Black('container', MyGame, 'dom');
black.start();
