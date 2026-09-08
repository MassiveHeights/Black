class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('circle', '/assets/examples/circle-green.png');
    assets.enqueueImage('circle-red', '/assets/examples/circle-red.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.emitterA = this.createEmitter();
    this.emitterB = this.createEmitter();
  }

  createEmitter() {
    // Create a emitter
    let emitter = new Emitter();
    emitter.blendMode = BlendMode.ADD;

    // Zero all default values since we dont need any particles at the start
    emitter.emitCount = new FloatScatter(10);
    emitter.emitDelay = new FloatScatter(0);
    emitter.emitInterval = new FloatScatter(0);
    emitter.emitDuration = new FloatScatter(Infinity);
    emitter.emitNumRepeats = new FloatScatter(Infinity);

    // Pick a texture for emitting
    emitter.textures = Black.assets.getTextures('circle');

    emitter.x = 500 / 2;
    emitter.y = 500 / 2;

    // Render all particles inside this GameObject
    emitter.space = this;

    // A quicker sugar-way of adding actions and initializers
    emitter.add(
      new InitialLife(0.9),
      new AlphaOverLife(1, 0.5),
      new ScaleOverLife(0.1, 0.0, Ease.backIn),
      new Acceleration(-500, -500, 500, 500),
    );

    return this.addChild(emitter);
  }

  onUpdate() {
    if (!Black.assets.isAllLoaded)
      return;

    let t = Black.time.now * 3;
    let x = 13 * Math.sin(t);
    let y = 13 * Math.cos(-t);

    this.emitterA.x = (y * 12) + 250;
    this.emitterA.y = (x * 12) + 250;

    this.emitterB.x = (-y * 12) + 250;
    this.emitterB.y = (-x * 12) + 250;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();