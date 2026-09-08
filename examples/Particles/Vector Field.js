class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('circle-3', '/assets/examples/particle-3.png');
    assets.enqueueImage('circle-5', '/assets/examples/particle-5.png');
    assets.enqueueImage('circle-6', '/assets/examples/particle-6.png');

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.createEmitterA();
    this.createEmitterB();
  }

  createEmitterA() {
    // Create a emitter
    let emitter = new Emitter();
    emitter.blendMode = BlendMode.ADD;

    // Zero all default values since we dont need any particles at the start
    emitter.emitCount = new FloatScatter(30);
    emitter.emitDelay = new FloatScatter(0);
    emitter.emitInterval = new FloatScatter(0);
    emitter.emitDuration = new FloatScatter(Infinity);
    emitter.emitNumRepeats = new FloatScatter(2);

    // Pick a texture for emitting
    emitter.textures = [Black.assets.getTexture('circle-3'), Black.assets.getTexture('circle-5')];

    let field = new VectorField(0, 0, 500, 500, 0.1);
    let offset = (500 * 0.1) / 2;

    // fill vector field with swirl-like fn
    field.setData((x, y, outVector) => {
      outVector.x = (y - offset) - (x - offset);
      outVector.y = -(x - offset) - (y - offset);
      outVector.normalize();
      outVector.multiplyScalar(200);
    });

    this.field = field;

    // A sugar way of adding actions and initializers
    emitter.add(
      field,
      new InitialPosition(new RadialScatter(250, 250, 200, 230)),
      new InitialLife(0.7, 1.2),
      new InitialVelocity(new RadialScatter(0, 0, -100, 100)),
      new AlphaOverLife(1, 0)
    );

    this.emitter1 = emitter;
    return this.addChild(emitter);
  }

  createEmitterB() {
    // Create a emitter
    let emitter = new Emitter();
    emitter.blendMode = BlendMode.SCREEN;
    emitter.alpha = 0.5;

    // Zero all default values since we dont need any particles at the start
    emitter.emitCount = new FloatScatter(10);
    emitter.emitDelay = new FloatScatter(0);
    emitter.emitInterval = new FloatScatter(0);
    emitter.emitDuration = new FloatScatter(Infinity);
    emitter.emitNumRepeats = new FloatScatter(2);

    // Pick a texture for emitting
    emitter.textures = [Black.assets.getTexture('circle-6')];

    // A quicker sugar-way of adding actions and initializers
    emitter.add(
      new InitialPosition(new RadialScatter(250, 250, 200, 230)),
      new InitialLife(2, 1),
      new InitialVelocity(new RadialScatter(0, 0, -100, 100)),
      new InitialScale(2, 0.2),
      new AlphaOverLife(1, 0),
      new ColorOverLife(0xff0000, 0xffff00)
    );

    this.emitter2 = emitter;
    return this.addChild(emitter);
  }

  onUpdate(dt) {
    if (!Black.assets.isAllLoaded)
      return;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();
engine.ups = 30;