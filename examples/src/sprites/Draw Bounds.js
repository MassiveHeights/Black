class BoundsComponent extends Component {
  constructor() {
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
    this.assets.enqueueImage('rect', '160x160.png');
    this.assets.enqueueImage('cross', 'cross-white.png');
    this.assets.enqueueImage('bp', 'blueprint-landscape.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);

    this.bg = new Sprite('bp');
    this.view.addChild(this.bg);

    let container = new Sprite();
    container.x = 960 / 2;
    container.y = 640 / 2;

    container.name = 'CONTAINER';
    container.scaleX = container.scaleY = 0.2;
    this.bg.addChild(container);

    let sprite1 = new Sprite('rect');
    sprite1.name = 'Sprite 1';
    sprite1.alpha = 0.75;
    container.addChild(sprite1);

    let sprite2 = new Sprite('rect');
    sprite2.name = 'Sprite 2';
    sprite2.x = 160;
    sprite2.y = 160;
    sprite2.rotation = Math.PI / 3;
    container.addChild(sprite2);

    let sprite3 = new Sprite('rect');
    sprite3.name = 'Sprite 3';
    sprite3.x = 160;
    sprite3.y = 160;
    sprite3.rotation = 0.5;
    sprite2.addChild(sprite3);

    this.container = container;
    this.sprite1 = sprite1;
    this.sprite2 = sprite2;
    this.sprite3 = sprite3;

    this.drawBounds(container.getBounds());
    console.log('---------------------------------------------------------');
    console.log('getBounds children: false', sprite2.getBounds(this.view, false));
    console.log('getBounds children: true', sprite2.getBounds(this.view, true));
  }

  drawBounds(bounds) {
    this.b1 = this.addCross(bounds.x, bounds.y);
    this.b2 = this.addCross(bounds.right, bounds.y);
    this.b3 = this.addCross(bounds.x, bounds.bottom);
    this.b4 = this.addCross(bounds.right, bounds.bottom);
    console.log(bounds.toString(2));
  }

  addCross(xx = 0, yy = 0) {
    var s = new Sprite('cross');
    s.x = ~~xx;
    s.y = ~~yy;
    s.pivotX = s.pivotY = 2;
    this.view.addChild(s);
    return s;
  }

  onUpdate() {

    if (!this.assets.isAllLoaded)
      return;

    let bounds = this.container.getBounds(this.container.parent, true);
    this.container.rotation += 0.01;

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
var black = new Black('container', MyGame, 'dom');
black.start();
