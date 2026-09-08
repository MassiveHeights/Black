class MyGame extends DisplayObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    let assets = new AssetManager();
    assets.enqueueGoogleFont('Knewave');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    Black.input.on('pointerDown', this.onPointerDown, this);

    this.timer = this.addComponent(new Timer(1, 5));
    const defTextStyle = new TextStyle('Knewave', 0xcccccc, 25);
    const contrastStyle = new TextStyle('Knewave', 0xf2a702, 25);

    let textField = this.textField = this.addChild(new TextField());
    textField.setDefaultStyle(defTextStyle);
    textField.setStyle('contrast', contrastStyle);

    this.updateTimerInfo(this.timer, textField);
    textField.multiline = true;
    textField.alignPivot();
    textField.x = 250;
    textField.y = 250;
  }

  onPointerDown() {
    this.timer.reset();

    if (this.timer.isRunning === false)
      this.timer.start();
  }

  onUpdate() {
    if (Black.assets.isAllLoaded === false)
      return;

    this.updateTimerInfo(this.timer, this.textField);
  }

  updateTimerInfo(timer, textField) {
    textField.text = `
    ~{contrast}CLICK TO RESET THE TIMER.

    ~{def}ELAPSED SECONDS: ~{contrast}${timer.elapsedSeconds.toFixed(1)}
    ~{def}SECONDS TO NEXT TICK: ~{contrast}${timer.secondsToNextTick.toFixed(1)}
    ~{def}TICKS LEFT: ~{contrast}${timer.ticksLeft}
    ~{def}CURRENT TICK: ~{contrast}${timer.currentTick}
    ~{def}IS RUNNING: ~{contrast}${timer.isRunning}`;
  }
}


let engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();