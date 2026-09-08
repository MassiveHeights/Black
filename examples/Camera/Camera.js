class MyGame extends GameObject {
  constructor() {
    super();

    var assets = new AssetManager();
    assets.enqueueImage('bg', '/assets/examples/backgrounds/popart_bg_gre_2.png');
    assets.enqueueImage('sticker', '/assets/examples/popart_anvil.png');
    assets.enqueueImage('bunny', '/assets/examples/popart_bunny_01.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();

    // Try to keep stage size withing desired width and height
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    this.touchable = true;
  }

  createBunnies() {
    //console.log(this.stage.bounds);

    for (let i = 0; i < 100; i++) {
      let bunny = this.addChild(new Sprite('bunny'));
      bunny.alignPivot();

      let r = new Rectangle(0, 0, this.stage.width, this.stage.height).random;

      bunny.x = r.x;
      bunny.y = r.y;


      this.addChild(bunny);
    }
  }

  onAssetsLoaded(m) {
    this.bg = this.addChild(new Sprite('bg'));
    this.bg.alignPivot();

    this.sprite = new Sprite('sticker');
    this.sprite.touchable = true;
    this.sprite.alignPivot();
    this.addChild(this.sprite);

    this.createBunnies();

    this.sprite.on('pointerDown', (m, i) => {
      console.log('DOWN', i.button);
    });

    this.bg.x = this.stage.centerX;
    this.bg.y = this.stage.centerY;

    this.sprite.x = this.stage.centerX;
    this.sprite.y = this.stage.centerY;

    let c = new Camera();
    this.addChild(c);

    this.clickPos = new Vector();
    this.dragging = false;

    Black.input.on('pointerDown', (m, i) => {
      if (i.button === 0) {
        this.clickPos = c.localToGlobal(Black.input.viewportPosition);
        this.dragging = true;
      }
    });

    Black.input.on('pointerMove', (m, i) => {
      if (this.dragging === true) {
        let currPos = c.localToGlobal(Black.input.viewportPosition);

        c.x += this.clickPos.x - currPos.x;
        c.y += this.clickPos.y - currPos.y;
      }
    });

    Black.input.on('pointerUp', (m, i) => {
      if (i.button === 0)
        this.dragging = false;
    });

    Black.input.on('wheel', (m, i) => {
      const old = c.localToGlobal(Black.input.viewportPosition);
      const scaleFactor = 0.1;
      const step = c.scale * scaleFactor;

      const minScale = 0.1;
      const maxScale = 50;

      let scale = c.scale;
      scale += i.delta > 0 ? step : -step;
      scale = MathEx.clamp(scale, minScale, maxScale);

      c.scale = scale;

      c.xy = old.subtract(c.localToGlobal(Black.input.viewportPosition)).add(c.xy);
    });
  }

  onUpdate() {
    //Black.camera.x++;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();
