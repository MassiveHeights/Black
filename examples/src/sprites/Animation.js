"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueueAtlas('assets', 'atlas.png', 'atlas.json');

    // Pass on load complete handler and this for correct context
    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);

    // Add background sprite
    var bg = new Sprite('blueprint-landscape');
    this.view.addChild(bg);

    this.fox = new Sprite();
    this.view.addChild(this.fox);

    this.fox.x = 960 / 2;
    this.fox.y = 640 / 2;
    this.fox.name = 'fox';
    this.fox.alignPivot();

    let atlas = AssetManager.default.getAtlas('assets');

    let idleTextures = atlas.getTextures('idle_*');

    let ac = this.fox.addComponent(new AnimationController());
    let idle = ac.set('idle', idleTextures, 2, false);
    let move = ac.set('move', atlas.getTextures('anim_*'), 3, false);
    ac.play('move');

    ac.on('complete', (m, a) => {
      ac.play('idle');
    });

    this.fox.addComponent(new InputComponent());
    this.fox.on('pointerDown', this.onPointerDown, this);
  }

  onPointerDown(msg){
    let ac = this.fox.getComponent(AnimationController);

    ac.play('move');

    ac.on('complete', (m, a) => {
      ac.play('idle');
    });
  }

  onUpdate(dt) {
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'canvas');
black.start();
