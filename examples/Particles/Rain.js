class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('drop_1', '/assets/examples/popart_drop_3.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create a emitter
    let emitter = new Emitter();

    // Zero all default values since we dont need any particles at the start
    emitter.emitCount = new FloatScatter(5);
    emitter.emitDelay = new FloatScatter(0);

    // Pick a texture for emitting
    emitter.textures = [Black.assets.getTexture('drop_1')];

    emitter.x = -300;
    emitter.y = -100;

    // No one lives forever
    emitter.add(new InitialLife(4));
    
    // Initialize every particles a random position
    emitter.add(new InitialPosition(0, 0, 1200, 0));
    emitter.add(new InitialMass(2, 0.5));
    emitter.add(new AlphaOverLife(0.9, 0.7));
    emitter.add(new Acceleration(0, 550, 300, 200));
    emitter.add(new Oriented());

    this.addChild(emitter);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
//black.maxAllowedFPS = 10;
engine.start();