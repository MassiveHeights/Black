class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueueImage('bp', 'blueprint-landscape.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);

    Input.on('pointerUp', this.onUp, this);
  }

  onUp() {
    console.log('up');
  }

  onUpdate(dt) {
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'canvas');
black.start();
