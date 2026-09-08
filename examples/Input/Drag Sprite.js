// Simple drag component
class DragComponent extends Component {
  constructor() {
    super();

    this.dragging = false;
    this.clickPos = new Vector();
  }

  onAdded(gameObject) {
    // Add InputComponent is required in order to Sprite listen for input
    gameObject.addComponent(new InputComponent());

    gameObject.on('pointerDown', this.onPointerDown, this);

    Black.input.on('pointerMove', this.onPointerMove, this);
    Black.input.on('pointerUp', this.onPointerUp, this);
  }

  onPointerDown(msg) {
    this.clickPos = this.gameObject.globalToLocal(Black.input.pointerPosition);
    this.dragging = true;
  }

  onPointerMove(msg) {
    if (this.dragging === false)
      return;

    // Find the offset relative to its parent
    let parentPos = this.gameObject.parent.globalToLocal(Black.input.pointerPosition);

    // Set a new position
    this.gameObject.x = parentPos.x - this.clickPos.x + this.gameObject.pivotX;
    this.gameObject.y = parentPos.y - this.clickPos.y + this.gameObject.pivotY;
  }

  onPointerUp(msg) {
    this.dragging = false;
  }
}

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(900, 500);

    var assets = new AssetManager();
    assets.enqueueImage('bottle', '/assets/examples/popart_bottle.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // All parent objects must be also touchable
    this.touchable = true;

    this.sprite = new Sprite('bottle');
    this.sprite.x = this.stage.centerX;
    this.sprite.y = this.stage.centerY;
    this.sprite.touchable = true;
    this.sprite.alignPivot();
    this.addChild(this.sprite);

    // Add the DragComponent to the sprite
    this.drag = this.sprite.addComponent(new DragComponent());

    this.lastPos = this.sprite.x;
  }

  onUpdate() {
    let dt = Black.time.delta;
    if (this.sprite != null) {
      if (this.sprite.x !== this.lastPos) {
        this.sprite.rotation = (this.sprite.x - this.lastPos) * dt * (this.drag.clickPos.y - this.sprite.height / 2) / this.sprite.height * -2;
        this.lastPos = this.sprite.x;
      }
    }
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();