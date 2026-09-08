class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('image', '/assets/examples/popart_loading.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create hint text
    this.createHint();

    // Create a sprite
    let sprite = new Sprite('image');
    this.addChild(sprite);
    sprite.x = 500 / 2;
    sprite.y = 500 / 2;
    sprite.alignPivot();

    // Create a tween and loop it
    let tween = new Tween({
      rotation: 2 * Math.PI
    }, 4, {
        ease: Ease.linear,
        loop: true
      });

    // Add the tween to sprite
    sprite.addComponent(tween);

    // Create a function which will pause/play tween on pointer down
    let isPaused = false;
    Black.input.on('pointerDown', () => {
      if (isPaused) {
        tween.play();
        isPaused = false;
      } else {
        tween.pause();
        isPaused = true;
      }
    }, this);
  }

  createHint() {
    let hintText = new TextField('Click to pause/unpause', 'arial', 0xf6a200, 42);
    hintText.x = 250;
    hintText.y = 120;
    hintText.autoSize = false;
    hintText.fieldWidth = 900;
    hintText.align = 'center';
    hintText.alignPivot();
    this.addChild(hintText);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start()