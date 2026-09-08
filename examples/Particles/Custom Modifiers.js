// Create our new custom action
class AlphaEqualsScale extends Modifier {
  constructor() {
    super();
  }

  // Update method is called for each particle every frame
  update(emmiter, particle, dt, t) {
    // Alpha equals scale
    particle.alpha = particle.scaleX;
  }
}

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('square', '/assets/examples/popart_airplane.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    let squareTexture = Black.assets.getTexture('square');

    // Create a emitter
    this.emitter = new Emitter();

    // Zero all default values since we dont need any particles at the start
    this.emitter.emitCount = new FloatScatter(1);
    this.emitter.emitDelay = new FloatScatter(0);
    this.emitter.emitInterval = new FloatScatter(0);
    this.emitter.emitDuration = new FloatScatter(1);
    this.emitter.emitNumRepeats = new FloatScatter(Infinity);

    // Pick a texture for emitting
    this.emitter.textures = [squareTexture];

    this.emitter.x = 500 / 2;
    this.emitter.y = 500 + 100;

    // Render all particles inside this GameObject
    this.emitter.space = this;

    // No one lives forever
    this.emitter.add(new InitialLife(2));

    // Initialize every particles a random position
    this.emitter.add(new InitialPosition(-480, 0, 480, 0));

    // Let particles fall up
    this.emitter.add(new Acceleration(0, -280, 0, -280));

    // Scale particles from 0.1 to 0
    this.emitter.add(new ScaleOverLife(1, 0));

    // Depending on scale set the alpha value
    this.emitter.add(new AlphaEqualsScale());

    this.addChild(this.emitter);
  }

  onUpdate(dt) {
    if (!this.emitter)
      return;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();