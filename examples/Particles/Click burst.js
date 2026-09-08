class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('sprite', '/assets/examples/popart_star_white.png');
    assets.enqueueImage('bg', '/assets/examples/backgrounds/popart_bg_gre_3.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    let bg = this.addChild(new Sprite('bg'));
    bg.x = this.stage.centerX;
    bg.y = this.stage.centerX;
    bg.alignPivot();

    let squareTexture = Black.assets.getTexture('sprite');

    // Create a emitter
    this.emitter = new Emitter();

    // No delay!
    this.emitter.emitDelay = new FloatScatter(0);
    this.emitter.emitInterval = new FloatScatter(0);
    
    // Emit for pretty small amount of time
    this.emitter.emitDuration = new FloatScatter(0.1); //

    // Just 10 particles
    this.emitter.emitCount = new FloatScatter(10);

    // And repeat that for once
    this.emitter.emitNumRepeats = new FloatScatter(0.1);

    // Pick a texture for emitting
    this.emitter.textures = [squareTexture];

    // Render all particles inside this GameObject
    this.emitter.space = this;

    // Set a random scale between 0.05 and 0.3
    this.emitter.add(new InitialScale(1, 0.5));

    // No one lives forever
    this.emitter.add(new InitialLife(0.5));

    // Initialize every particles with a random velocity inside a box
    this.emitter.add(new InitialVelocity(-500, -500, 500, 500));

    // Let particles fall down
    this.emitter.add(new Acceleration(0, 2800, 0, 2800));

    // Add some rotation over life
    this.emitter.add(new RotationOverLife(-Math.PI, Math.PI));

    // Make them smaller over lief
    this.emitter.add(new ScaleOverLife(3, 0));

    this.emitter.stop();

    this.addChild(this.emitter);

    Black.input.on('pointerDown', this.onDown, this);
  }

  onDown() {
    // Find pointer position relative to this, since this was scalled at line #5
    let p = this.globalToLocal(Black.input.pointerPosition);
    this.emitter.x = p.x;
    this.emitter.y = p.y;

    // Tell emitter to emit!
    this.emitter.play();
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();