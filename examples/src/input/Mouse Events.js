class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueueImage('rect', 'rect64.png');
    this.assets.enqueueImage('160x160', '160x160.png');
    this.assets.enqueueImage('cross', 'cross.png');
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

    this.paused = false;

    var randomGroup = new GameObject();
    this.view.addChild(randomGroup);

    this.sprite1 = new Sprite('rect');
    this.sprite1.name = 'sprite 1';
    this.sprite1.addComponent(new InputComponent());

    this.sprite1.x = 960 / 2;
    this.sprite1.y = 640 / 2;
    this.sprite1.scaleX = this.sprite1.scaleY = Math.PI;
    //this.sprite1.center();

    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 2; k++) {
        let sprite = new Sprite('rect');
        sprite.x = (i * (960 / 6)) + (80);
        sprite.y = (k * (640 / 4)) + (80);
        //sprite.center();
        sprite.addComponent(new InputComponent());
        this.view.addChild(sprite);
      }
    }

    this.view.addChild(this.sprite1);

    GameObject.intersects(this.sprite1, new Vector());

    this.on('pointerDown', this.onPointerDown, this);
  }

  onPointerDown(msg){
    msg.sender.removeFromParent();
    this.paused = !this.paused;
    console.log(msg.target);
  }

  onUpdate(dt) {
    return;
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'canvas');
black.start();
