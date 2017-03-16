class BoundsComponent extends Component{
  constructor(){
    super('BoundsComponent');
  }
}

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

  onAssetsLoadded(){
    let tBg = 'blueprint-landscape';
    let img = 'rect55-red';

    var tCross = 'cross';

    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);

    let bg = new Sprite(tBg);
    bg.x = 960 / 2;
    bg.y = 640 / 2;
    bg.alignPivot();

    this.view.addChild(bg);

    let container = new Sprite();
    container.name = 'CONTAINER';
    this.view.addChild(container);

    let sprite1 = new Sprite(img);
    sprite1.name = 'Sprite 1';
    sprite1.alpha = 0.75;
    container.addChild(sprite1);

    let sprite2 = new Sprite(img);
    sprite2.name = 'Sprite 2';
    sprite2.x = 170;
    sprite2.y = 170;
    sprite2.rotation = Math.PI / 2;
    container.addChild(sprite2);

    let sprite3 = new Sprite(img);
    sprite3.name = 'Sprite 3';
    sprite3.x = 400;
    sprite3.y = 400;
    sprite3.rotation = 0.5;
    container.addChild(sprite3);

    console.log(sprite2.localToGlobal(new Vector(10, 10)));
    console.log(sprite2.globalToLocal(new Vector(100, 100)));

    this.container = container;
    this.sprite1 = sprite1;
    this.sprite2 = sprite2;
    this.sprite3 = sprite3;
    this.drawBounds(sprite3.getBounds());
  }

  drawBounds(bounds){
    this.addCross(bounds.x, bounds.y);
    this.addCross(bounds.right, bounds.y);
    this.addCross(bounds.x, bounds.bottom);
    this.addCross(bounds.right, bounds.bottom);
  }

  addCross(xx = 0, yy = 0) {
    var img = 'cross';

    var s = new Sprite(img);
    s.x = xx;
    s.y = yy;
    s.pivotX = s.pivotY = 5 / 2;
    black.root.addChild(s);

    return s;
  }

  onUpdate() {
    if (!this.assets.isAllLoaded)
      return;

    return;
    //let bounds = sprite1.getGlobalBounds();
    //this.container.rotation += 0.01;
    var bounds = this.container.getBounds();
    //this.bg.rotation++;
    //console.log(bounds);

    //console.log(bounds.toString(0), r.toString(0));
    this.b1.x = bounds.x;
    this.b1.y = bounds.y;

    this.b2.x = bounds.x + bounds.width;
    this.b2.y = bounds.y;

    this.b3.x = bounds.x;
    this.b3.y = bounds.y + bounds.height;

    this.b4.x = bounds.x + bounds.width;
    this.b4.y = bounds.y + bounds.height;
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'dom');
black.start();
