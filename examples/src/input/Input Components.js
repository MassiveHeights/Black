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
    bg.touchable = false;
    bg.on('pointerDown', this.onBgDown);
    //bg.scaleX = bg.scaleY = 0.5;
    this.view.addChild(bg);

    //Input.on('pointerUp', this.onUp, this);
    //Input.on('pointerEnter', this.onUp, this);
  }

  onBgDown() {
    console.log('bg clicked');
  }

  onUp(msg) {
    console.log(msg.name);
  }

  onUpdate(dt) {
  }
}

// Create and start engine
let black  = new Black('container', MyGame, 'canvas');
black.start();
