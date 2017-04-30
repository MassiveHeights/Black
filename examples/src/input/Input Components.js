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

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);

    let bg = new Sprite('blueprint-landscape');
    bg.x = 960 * 0.5;
    bg.y = 640 * 0.5;
    bg.touchable = true;
    bg.scaleX = bg.scaleY = 0.5;
    bg.alignPivot(0.5, 0.5);
    bg.on('pointerIn', this.onPointerInOut, this);
    bg.on('pointerOut', this.onPointerInOut, this);
    this.view.addChild(bg);

    Input.on('pointerIn', this.onGlobalPointerInOut, this);
    Input.on('pointerOut', this.onGlobalPointerInOut, this);
  }

  onGlobalPointerInOut(msg) {
    console.log('Global in/out:', msg.name);
  }

  onPointerInOut(msg) {
    console.log('Pointer in/out:', msg.name);
  }

  onUpdate(dt) {
  }
}

// Create and start engine
let black  = new Black('container', MyGame, 'canvas');
black.start();
