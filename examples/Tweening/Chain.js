class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('car1', '/assets/examples/popart_car_red.png');
    assets.enqueueImage('car2', '/assets/examples/popart_car_blue.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create two sprites
    let car1 = this.createCar('car1', 900, 250);
    let car2 = this.createCar('car2', 500, 250);

    // Create two tweens
    let moveTween1 = new Tween({ x: 450 }, 1.5, { ease: Ease.exponentialIn });

    // Disable play tween on added to GameObject by set playOnAdded option to false
    let moveTween2 = new Tween({ x: 100 }, 1, { playOnAdded: false, ease: Ease.exponentialOut });

    // Chain second to first so it'll play on first complete
    moveTween1.chain(moveTween2);

    // Add tweens to sprites
    car1.addComponent(moveTween1);
    car2.addComponent(moveTween2);
  }

  createCar(name, x, y) {
    let sprite = new Sprite(name);

    sprite.scaleX = -1;
    sprite.x = x - sprite.width;
    sprite.y = y;
    sprite.alignPivot();

    return this.addChild(sprite);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();