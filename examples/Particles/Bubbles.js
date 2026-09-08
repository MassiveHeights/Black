class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('img', '/assets/examples/bubble.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    let squareTexture = Black.assets.getTexture('img');

    // Create a emitter
    this.emitter = new Emitter();

    // Zero all default values since we dont need any particles at the start
    this.emitter.emitCount = new FloatScatter(3);
    this.emitter.emitDelay = new FloatScatter(0);
    this.emitter.emitInterval = new FloatScatter(0);

    // Pick a texture for emitting
    this.emitter.textures = [squareTexture];

    // Render all particles inside this GameObject
    this.emitter.space = this;

    this.emitter.add(
      // No one lives forever
      new InitialLife(4.0),

      // Initialize every particles with a random velocity inside a box
      new InitialVelocity(new VectorScatter(-20, -20, 20, 20)),

      // Make particles small over life
      new ScaleOverLife(new FloatScatter(0, 1, Ease.backIn)),

      // Give some acceleration is all directions
      new Acceleration(new VectorScatter(-1000, -1000, 1000, 1000)),

      // Rotate every particle
      new RotationOverLife(new FloatScatter(0, -Math.PI * 2, Ease.backInOut))
    );

    this.setEmitterPosition(Black.time.now * 5);

    // Add to scene
    this.addChild(this.emitter);
  }

  onPostUpdate(dt) {
    if (!Black.assets.isAllLoaded)
      return;

    this.setEmitterPosition(Black.time.now * 5);
  }

  setEmitterPosition(t) {
    let x = 13 * Math.sin(t) + Math.random();
    let y = 13 * Math.cos(t) + Math.random();

    this.emitter.x = (x * 12) + 250;
    this.emitter.y = (y * 12) + 250;
    this.emitter.rotation = -Math.PI / 2;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();