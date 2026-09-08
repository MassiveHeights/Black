class OrientedComponent1 extends Component {
  constructor() {
    super();
    this.lastPos = new Vector();
    this.currPos = new Vector();
  }

  onAdded(gameObject) {
    this.lastPos.set(gameObject.x, gameObject.y);
  }

  onRender() {
    if (this.gameObject.x !== this.lastPos.x || this.gameObject.y !== this.lastPos.y) {
      this.currPos.set(this.gameObject.x, this.gameObject.y);
      this.gameObject.rotation = this.lastPos.angleBetween(this.currPos);
      this.lastPos.copyFrom(this.currPos);
    }
  }
}

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('airplane', '/assets/examples/popart_airplane_1.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create sprite
    let plane = new Sprite('airplane');
    plane.x = 250;
    plane.y = 400;
    plane.alignPivot();
    this.addChild(plane);

    // tween between an array of values using the Catmull-Rom interpolation function (default is linear)
    let tween = new Tween({
      x: [400, 250, 100, 250],
      y: [250, 100, 250, 400]
    }, 2, { interpolation: Interpolation.catmullRom, loop: true });

    plane.addComponent(tween);

    // additional component just for visual satisfaction (OrientedComponent1 or OrientedComponent2)
    plane.addComponent(new OrientedComponent1());
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();