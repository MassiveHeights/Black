class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueueImage('rect', 'rect64.png');
    this.assets.enqueueImage('bp', 'blueprint-landscape.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);

    //this.scaleX = 1.2;
    this.view = new GameObject();
    this.view.addComponent(mr);

    this.addChild(this.view);

    let bg = new Sprite('bp');
    this.view.addChild(bg);

    this.sprite1 = new Sprite('rect');
    this.sprite1.x = 480;
    this.sprite1.y = 0;

    this.sprite1.scaleX = 1.25;
    this.sprite1.scaleY = 1.25;

    // this.sprite1.center();
    this.view.addChild(this.sprite1);

    let t = this.sprite1.addComponent(new Tween({ y: 320 }, 2));
    t.repeat(1)
     .reverse();

    this.view.addComponent(new FPSComponent());
  }

  onUpdate(dt) {
    if (!this.assets.isAllLoaded)
      return;
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'canvas');
black.start();
