class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    const assets = new AssetManager();
    assets.enqueueImage('pacman-1', '/assets/examples/popart_pacman_1.png');
    assets.enqueueImage('pacman-2', '/assets/examples/popart_pacman_2.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded() {
    this.dragging = false;

    this.touchable = true;
    this.name = 'root';

    const { centerX, centerY } = this.stage;

    const tip = new TextField('Drag the Pacman', 'arial', 0xf6a200, 25);
    tip.align = 'center';
    tip.textColor = 0xf6a200;
    tip.x = centerX;
    tip.y = 50;
    tip.alignPivot();
    this.addChild(tip);

    this.sprite = new Sprite('pacman-2');
    this.sprite.touchable = true;
    this.sprite.x = centerX;
    this.sprite.y = centerY;
    this.sprite.alignAnchor();
    this.addChild(this.sprite);
    // Add bounds here
    this.sprite.addComponent(new Bounds());

    this.pacman = new Sprite('pacman-1');
    this.pacman.x = -100;
    this.pacman.y = 150;
    this.pacman.alignAnchor();
    this.pacman.touchable = true;
    this.sprite.addChild(this.pacman);

    this.pacman.on('pointerDown', () => {
      this.dragging = true;
    });

    Black.input.on('pointerUp', () => {
      this.dragging = false;
    });
  }

  onUpdate() {
    if (Black.assets.isAllLoaded === false) return;

    this.sprite.rotation += 1 * Black.time.delta;

    if (this.dragging === true) {
      const pointerLocal = this.pacman.parent.globalToLocal(Black.input.pointerPosition);
      this.pacman.x = pointerLocal.x;
      this.pacman.y = pointerLocal.y;
    }
  }
}

class Bounds extends Component {
  onAdded(gameObject) {
    const { parent } = gameObject;

    this.topLeft = this.makeIndicator(0);
    this.topRight = this.makeIndicator(Math.PI * 0.5);
    this.bottomLeft = this.makeIndicator(Math.PI * 1.5);
    this.bottomRight = this.makeIndicator(Math.PI);
    parent.add(this.topLeft);
    parent.add(this.topRight);
    parent.add(this.bottomLeft);
    parent.add(this.bottomRight);
  }

  onRemoved() {
    this.topLeft.removeFromParent();
    this.topRight.removeFromParent();
    this.bottomLeft.removeFromParent();
    this.bottomRight.removeFromParent();
  }

  onUpdate() {
    this.placeIndicator();
  }

  placeIndicator() {
    // get the bounds relative to sprite's parent with all children
    const bounds = this.gameObject.getBounds(null, true);
    const { left, right, top, bottom } = bounds;
    this.topLeft.x = left;
    this.topLeft.y = top;
    this.topRight.x = right;
    this.topRight.y = top;
    this.bottomLeft.x = left;
    this.bottomLeft.y = bottom;
    this.bottomRight.x = right;
    this.bottomRight.y = bottom;
  }

  makeIndicator(rotation = 0) {
    const color = 0xffffff;
    const cross = new GameObject();

    const g1 = new Graphics();
    g1.beginPath();
    g1.fillStyle(color);
    g1.lineStyle(1, color);
    g1.rect(0, 0, 4, 20);
    g1.stroke();
    g1.fill();
    cross.add(g1);

    const g2 = new Graphics();
    g2.beginPath();
    g2.fillStyle(color);
    g2.lineStyle(1, color);
    g2.rect(0, 0, 20, 4);
    g2.stroke();
    g2.fill();
    cross.add(g2);

    cross.alignPivot();
    cross.rotation = rotation;
    return cross;
  }
}

const engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();
