class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = Black.instance.assets;
    this.assets.defaultPath = '/assets/';

    // Preload some images
    this.assets.enqueue('rect', 'rect64.png');
    this.assets.enqueue('160x160', '160x160.png');
    this.assets.enqueue('cross', 'cross.png');
    this.assets.enqueue('bp', 'blueprint-landscape.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue(this.onAssetsLoadded, this);
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);

    let img = this.assets.getAsset('rect');
    let tBg = this.assets.getAsset('bp');

    //this.scaleX = 1.2;
    this.view = new GameObject();
    this.view.addComponent(mr);

    this.addChild(this.view);

    let bg = new Sprite(tBg);
    this.view.addChild(bg);

    this.paused = false;

    let input0 = new InputComponent();
    input0.onPointerDown.add(this.onPointerDown, this);

    this.sprite1 = new Sprite(img);
    this.sprite1.addComponent(input0);

    this.sprite1.x = 960 / 2;
    this.sprite1.y = 640 / 2;
    this.sprite1.scaleX = this.sprite1.scaleY = Math.PI;
    this.sprite1.center();

    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 2; k++) {
        let sprite = new Sprite(img);
        sprite.x = (i * (960 / 6)) + (80);
        sprite.y = (k * (640 / 4)) + (80);
        sprite.center();
        this.view.addChild(sprite);
      }
    }

    this.view.addChild(this.sprite1);

    let bounds = this.sprite1.getBounds();
    this.sprite1.b1 = this.addCross(bounds.x, bounds.y);
    this.sprite1.b2 = this.addCross(bounds.x + bounds.width, bounds.y);
    this.sprite1.b3 = this.addCross(bounds.x, bounds.y + bounds.height);
    this.sprite1.b4 = this.addCross(bounds.x + bounds.width, bounds.y + bounds.height);

    this.tMousePos = new TextField('FPS: 0');
    this.tMousePos.x = 0;
    this.tMousePos.y = 0;
    this.view.addChild(this.tMousePos);
  }

  onPointerDown(e){
    this.paused = !this.paused;
  }

  addCross(xx, yy) {
    var img = this.assets.getAsset('cross');

    var s = new Sprite(img);
    s.x = xx;
    s.y = yy;
    s.pivotX = s.pivotY = 5 / 2;
    this.addChild(s);

    return s;
  }

  onUpdate(dt) {
    if (!this.assets.isAllLoaded)
      return;

    this.tMousePos.text = 'FPS: ' + black.FPS;

    if (this.paused)
      return;

    let sprite1 = this.sprite1;
    sprite1.rotation += 0.01;

    let bounds = sprite1.getBounds(false);

    sprite1.b1.x = bounds.x;
    sprite1.b1.y = bounds.y;

    sprite1.b2.x = bounds.x + bounds.width;
    sprite1.b2.y = bounds.y;

    sprite1.b3.x = bounds.x;
    sprite1.b3.y = bounds.y + bounds.height;

    sprite1.b4.x = bounds.x + bounds.width;
    sprite1.b4.y = bounds.y + bounds.height;

    // let p = Input.pointerPosition;
    // let inside = GameObject.intersects(this.sprite1, p);
    //
    // this.tMousePos.text = Input.pointerX.toFixed() + 'x' + Input.pointerY.toFixed() + ' -> '+ (inside ? 'inside' : 'outside');
    //
    // this.tMousePos.x = Input.pointerX + 16;
    // this.tMousePos.y = Input.pointerY + 40;
    //
    //
    let last = 0;
    for (var i = 1; i < this.view.numChildren - 2; i++) {
      let c = this.view.getChildAt(i);
      c.rotation = Math.sin(sprite1.rotation + Math.PI) + last;
      //c.alpha = Math.sin(sprite1.rotation) + (i / (this.view.numChildren - 2));
      last = c.rotation;
    }


  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'dom');
black.start();
