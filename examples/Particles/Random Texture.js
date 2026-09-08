class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('circle-red', '/assets/examples/circle-red.png');
    assets.enqueueImage('circle-green', '/assets/examples/circle-green.png');
    assets.enqueueImage('circle-blue', '/assets/examples/circle-blue.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create a emitter
    this.emitter = new Emitter();

    // Zero all default values since we dont need any particles at the start
    this.emitter.emitCount = new FloatScatter(20);
    this.emitter.emitDelay = new FloatScatter(0);
    this.emitter.emitInterval = new FloatScatter(0);
    this.emitter.emitDuration = new FloatScatter(1 / 60);
    this.emitter.emitNumRepeats = new FloatScatter(Infinity);

    // Pick a texture for emitting
    this.emitter.textures = Black.assets.getTextures('circle-*');

    this.emitter.x = 900 / 2;
    this.emitter.y = 500 / 2;

    this.emitter.blendMode = BlendMode.ADD;

    // Render all particles inside this GameObject
    this.emitter.space = this;

    // No one lives forever
    this.emitter.add(new InitialLife(2, 4));

    // Pick a random texture with random index between 0 and 3
    this.emitter.add(new InitialTexture(0, 2));

    // Make them disappear
    this.emitter.add(new AlphaOverLife(1, 0, Ease.exponentialIn));
    this.emitter.add(new ScaleOverLife(0.01, 0.6, Ease.exponentialIn));
    this.emitter.add(new Acceleration(-70, -70, 70, 70));

    this.addChild(this.emitter);
  }

  onUpdate() {
    if (!this.emitter)
      return;

    let t = Black.time.now * 5;

    let scale = 2 / (3 - Math.cos(2 * t));
    let x = scale * Math.cos(t);
    let y = scale * Math.sin(2 * t) / 2;

    this.emitter.x = (x * 250) + 250;
    this.emitter.y = (y * 250) + 250;
    this.emitter.rotation = -Math.PI / 2;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();