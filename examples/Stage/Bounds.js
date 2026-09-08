class Rotate extends Component {
  onUpdate() {
    this.gameObject.rotation += 1.2 * Black.time.delta;
  }
}

class Pulse extends Component {
  onUpdate() {
    this.gameObject.scale = (Math.sin(Black.time.now) + 3) / 3;
  }
}

class MyGame extends GameObject {
  constructor() {
    super();

    var assets = new AssetManager();
    assets.enqueueImage('sticker', '/assets/examples/popart_speaker.png');
    assets.enqueueImage('apple', '/assets/examples/popart_vinil.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();

    // Try to keep stage size withing desired width and height
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);
  }

  onAssetsLoaded(m) {
    this.sprite = new Sprite('sticker');
    this.sprite.alignPivot();
    //this.sprite.add(new Pulse());
    this.sprite.add(new Tween({ scaleY: [1.1, 1], scaleX: [1.1, 1] }, 0.4, { ease: Ease.cubicOut, loop: true }));
    this.addChild(this.sprite);

    this.topLeft = this.addChild(new Sprite('apple'));
    this.topLeft.alignPivotOffset();
    this.topLeft.add(new Rotate());

    this.topRight = this.addChild(new Sprite('apple'));
    this.topRight.alignPivotOffset();
    this.topRight.add(new Rotate());

    this.bottomLeft = this.addChild(new Sprite('apple'));
    this.bottomLeft.alignPivotOffset();
    this.bottomLeft.add(new Rotate());

    this.bottomRight = this.addChild(new Sprite('apple'));
    this.bottomRight.alignPivotOffset();
    this.bottomRight.add(new Rotate());

    this.stage.on('resize', this.onResize, this);
    this.onResize();
  }

  onResize() {
    let stage = this.stage;

    this.sprite.x = stage.centerX;
    this.sprite.y = stage.centerY;

    this.topLeft.x = stage.bounds.x;
    this.topLeft.y = stage.bounds.y;

    this.topRight.x = stage.bounds.x + stage.bounds.width;
    this.topRight.y = stage.bounds.y;

    this.bottomLeft.x = stage.bounds.x;
    this.bottomLeft.y = stage.bounds.y + stage.bounds.height;

    this.bottomRight.x = stage.bounds.x + stage.bounds.width;
    this.bottomRight.y = stage.bounds.y + stage.bounds.height;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();
engine.pauseOnBlur = false;
engine.pauseOnHide = false;