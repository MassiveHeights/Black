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
    this.view.addChild(bg);

    Input.on('pointerUp', this.onUp, this);
  }

  onUp() {
    console.log('up');
  }

  onUpdate(dt) {
  }
}

// Create and start engine
let black  = new Black('container', MyGame, 'canvas');
black.start();
