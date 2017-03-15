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

    setTimeout(() => {
      this.test('rect');
    }, 3000);

    this.view.addComponent(new FPSComponent());
  }

  onUpdate(dt) {
    if (!this.assets.isAllLoaded)
      return;
  }

  test(img) {
    for (let i = 0, s, tw; i < 1000; i++) {
      s = new Sprite(img);
      s.x = 0 + i;
      s.y = 0;
      s.width = 1;
      s.height *= 3;
      this.view.addChild(s);
      tw = new Tween({ y: [560, 0] }, (2 + i * 0.001).toFixed(3), { delay: 1 });
      tw.loop(true);
      s.addComponent(tw);
    }
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'dom');
black.start();
