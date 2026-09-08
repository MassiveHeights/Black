var game = null;
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

    game = this;
  }

  onAssetsLoaded(m) {
    this.emitter = this.createEmitter();

    // Fast forward 1 second
    //this.emitter.simulate(1);
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
    emitter.y = 500;

    // A quicker sugar-way of adding actions and initializers
    emitter.add(
      new InitialLife(0.5, 5),
      new AlphaOverLife(1, 0, Ease.sinusoidalOut),
      new ScaleOverLife(0.092, 0, Ease.bounceOut),
      new InitialVelocity(new RadialScatter(0, -700, 0, 100)),
      new Acceleration(0, 0, 0, 1800),
    );

    return this.addChild(emitter);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();

