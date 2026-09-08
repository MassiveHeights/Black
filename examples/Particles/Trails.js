class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('star', '/assets/examples/circle-green.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create a emitter
    this.emitter = new Emitter();
    this.emitter.blendMode = BlendMode.SCREEN;

    // Zero all default values since we dont need any particles at the start
    this.emitter.emitCount = new FloatScatter(10);
    this.emitter.emitDelay = new FloatScatter(0);
    this.emitter.emitInterval = new FloatScatter(0);
    this.emitter.emitDuration = new FloatScatter(Infinity);
    this.emitter.emitNumRepeats = new FloatScatter(Infinity);

    // Pick a texture for emitting
    this.emitter.textures = Black.assets.getTextures('star');

    this.emitter.x = 960 / 2;
    this.emitter.y = 640 / 2;

    // Render all particles inside this GameObject
    this.emitter.space = this;

    // No one lives forever
    this.emitter.add(new InitialLife(1));

    // Make them disappear
    this.emitter.add(new AlphaOverLife(1, 0));
    this.emitter.add(new ScaleOverLife(0.5, 0));
    this.emitter.add(new Acceleration(-300, -300, 300, 300));

    this.addChild(this.emitter);

    this.emitter.sortOrder = EmitterSortOrder.BACK_TO_FRONT;
    //this.emitter.sortOrder = EmitterSortOrder.FRONT_TO_BACK;
  }

  onUpdate() {
    if (!this.emitter)
      return;

    let p = this.globalToLocal(Black.input.pointerPosition);
    this.emitter.x = p.x;
    this.emitter.y = p.y;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();