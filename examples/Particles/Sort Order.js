class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueAtlas('atlas', '/assets/examples/atlas.png', '/assets/examples/atlas.json');

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    //Black.driver.renderResolution = 1;

    // for debug purposes
    this.textField = new TextField('Click to change sort order to BACK_TO_FRONT');
    this.textField.size = 30;
    this.textField.textColor = 0xf6a200;
    this.textField.x = 500 / 2;
    this.textField.y = 30;
    this.textField.alignPivot();
    this.addChild(this.textField);

    // Create a emitter
    this.emitter = new Emitter();

    // Zero all default values since we dont need any particles at the start
    this.emitter.emitCount = new FloatScatter(3);
    this.emitter.emitDelay = new FloatScatter(0);
    this.emitter.emitInterval = new FloatScatter(0.2);
    this.emitter.emitDuration = new FloatScatter(1 / 60);
    this.emitter.emitNumRepeats = new FloatScatter(Infinity);

    // Pick a texture for emitting
    this.emitter.textures = Black.assets.getTextures('popart_corn_*');

    this.emitter.x = 500 / 2;
    this.emitter.y = 500 / 4;

    // Render all particles inside this GameObject
    this.emitter.space = this;

    // Set a random scale between 0.05 and 0.3
    this.emitter.add(new InitialScale(1.2, 0.7));

    // No one lives forever
    this.emitter.add(new InitialLife(2));

    // Pick a random texture
    this.emitter.add(new InitialTexture(0, 8));

    // Initialize every particles with a random velocity inside a box
    this.emitter.add(new InitialVelocity(-50, -50, 50, 50));

    // Let particles fall down
    this.emitter.add(new Acceleration(0, 1000, 0, 1000));

    // Add some rotation over life
    this.emitter.add(new RotationOverLife(-Math.PI * 2, Math.PI * 2));

    this.addChild(this.emitter);

    Black.input.on('pointerDown', this.onDown, this);
  }

  onDown() {
    if (this.emitter.sortOrder === EmitterSortOrder.FRONT_TO_BACK) {
      this.emitter.sortOrder = EmitterSortOrder.BACK_TO_FRONT;
      this.textField.text = 'Click to change sort order to FRONT_TO_BACK';
    }
    else {
      this.emitter.sortOrder = EmitterSortOrder.FRONT_TO_BACK;
      this.textField.text = 'Click to change sort order to BACK_TO_FRONT';
    }
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();