class MyGame extends GameObject {
  constructor() {
    super();

    this.touchable = true;

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('anvil', '/assets/examples/popart_planet_01.png');

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    let sprite = new Sprite('anvil');
    sprite.touchable = true;
    sprite.x = this.stage.centerX;
    sprite.y = this.stage.centerY;
    sprite.alpha = 0.3;
    sprite.alignPivot();
    this.addChild(sprite);

    let txt = new TextField('Hover over the Earth!', 'arial', 0xf6a200, 25);
    txt.x = 500 / 2;
    txt.y = 50;
    txt.align = 'center';
    txt.color = 0xf6a200;
    txt.alignPivot();
    this.addChild(txt);

    let r = sprite.width * 0.5;

    // center collider relative to sprite
    sprite.add(new CircleCollider(r, r, r));

    Black.stage.on('pointerMove', x => {
      sprite.alpha = sprite.hitTest(Black.input.pointerPosition) ? 1 : 0.3;
    });
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();
