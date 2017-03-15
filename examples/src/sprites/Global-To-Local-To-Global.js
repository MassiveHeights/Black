class BoundsComponent extends Component{
  constructor(){
    super('BoundsComponent');
  }
}

class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = new AssetManager();
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueue('rect', '160x160.png');
    this.assets.enqueue('cross', 'cross.png');
    this.assets.enqueue('bp', 'blueprint-landscape.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {
    var img = this.assets.getAsset('rect');
    var tBg = this.assets.getAsset('bp');
    var tCross = this.assets.getAsset('cross');

    this.bg = new Sprite(tBg);
    this.addChild(this.bg);

    let container = new Sprite();
    container.name = 'CONTAINER';
    this.addChild(container);

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

    // this.b1 = this.addCross();
    // this.b2 = this.addCross();
    // this.b3 = this.addCross();
    // this.b4 = this.addCross();
  }

  drawBounds(bounds){
    this.addCross(bounds.x, bounds.y);
    this.addCross(bounds.right, bounds.y);
    this.addCross(bounds.x, bounds.bottom);
    this.addCross(bounds.right, bounds.bottom);
  }

  addCross(xx = 0, yy = 0) {
    var img = this.assets.getAsset('cross');

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
    let bounds = this.container.getBounds();
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
