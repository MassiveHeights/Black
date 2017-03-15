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
    this.sprite1.x = 880;
    this.sprite1.y = 320;

    this.sprite1.scaleX = 1.25;
    this.sprite1.scaleY = 1.25;

    // this.sprite1.center();
    this.view.addChild(this.sprite1);

    let t1 = this.sprite1.addComponent(new Tween({ x: 480 }, 2));
    let t2 = this.sprite1.addComponent(new Tween({ rotation: 2 * Math.PI }, 4, { delay: 2 }));

    // pause and resume tween
    setTimeout(() => {
      t2.pause();
      console.warn('t2 paused!');
      setTimeout(() => {
        t2.play();
        console.warn('t2 resumed!');
      }, 2000);
    }, 4020);

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
