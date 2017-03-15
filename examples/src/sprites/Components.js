"use strict";

class ScaleUpComponent extends Component {
  constructor() {
    super('ScaleUpComponent');
    this.s = 1;
    this.dir = true;
  }

  onUpdate(dt) {
    if (this.dir)
      this.s += dt;
    else
      this.s -= dt;

    this.gameObject.scaleX = this.gameObject.scaleY = this.s;
    this.gameObject.rotation = this.s * Math.PI;

    if (this.gameObject.scaleX >= Math.PI)
      this.dir = false;
    else if (this.gameObject.scaleX <= 0)
      this.dir = true;
  }
}
// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = new AssetManager();
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueueImage('rect', '160x160w.png');
    this.assets.enqueueImage('bp', 'blueprint-landscape.png');

    // Pass on load complete handler and this for correct context
    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.load();
  }

  onAssetsLoadded() {
    let bg = new Sprite('bp');
    bg.x = 960 / 2;
    bg.y = 640 / 2;
    bg.center();

    this.addChild(bg);

    let s = new Sprite('rect');
    s.x = 960 / 2;
    s.y = 640 / 2;
    s.alpha = 0.5;
    s.center();

    let rc = new ScaleUpComponent();
    s.addComponent(rc);

    let cc = s.getComponent(ScaleUpComponent);
    console.log(cc);

    this.addChild(s);
  }

  onUpdate(dt) {
    for (var i = 1; i < this.numChildren; i++) {
      //let c = this.getChildAt(i);
      //c.scaleX = c.scaleY = Math.sin(c.rotation);
    }
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'canvas');
black.start();
