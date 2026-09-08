class MyGame extends GameObject {
  constructor() {
    super();

    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueAtlas('atlas', '/assets/examples/atlas.png', '/assets/examples/atlas.json');

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create a emitter
    this.emitter = new Emitter();

    // Zero all default values since we dont need any particles at the start
    this.emitter.emitCount = new FloatScatter(30);
    this.emitter.emitDelay = new FloatScatter(0);
    this.emitter.emitInterval = new FloatScatter(0.2);
    this.emitter.emitDuration = new FloatScatter(1 / 60);
    this.emitter.emitNumRepeats = new FloatScatter(Infinity);

    // Pick a texture for emitting
    this.emitter.textures = Black.assets.getTextures('popart_corn_*');

    this.emitter.x = 500 / 2;
    this.emitter.y = 500 / 4;

    let c = new GameObject();
    c.scaleX = c.scaleY = 1;
    this.addChild(c);

    this.emitter.add(
      // Set a random scale between 0.05 and 0.3
      new InitialScale(1.2, 0.7),

      // No one lives forever
      new InitialLife(2),

      // Initialize every particles with a random velocity inside a box
      new InitialVelocity(-300, -300, 300, 300),

      // Pick a random texture
      new InitialTexture(0, 8),

      // Let particles fall down
      new Acceleration(0, 1000, 0, 1000),

      // Add some rotation over life
      new RotationOverLife(-Math.PI * 2, Math.PI * 2)
    );

    this.addChild(this.emitter);

    this.emitter.space = c;
    this.emitter.scaleX = this.emitter.scaleY = 0.1;
    this.emitter.rotation = 3.14 / 4;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();