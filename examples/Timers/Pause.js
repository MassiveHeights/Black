class MyGame extends DisplayObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    let assets = new AssetManager();
    assets.enqueueGoogleFont('Knewave');
    assets.enqueueImage('clock', '/assets/examples/popart_clock_2.png');
    assets.enqueueImage('secondsHand', '/assets/examples/popart_clock_big.png');
    assets.enqueueImage('minutesHand', '/assets/examples/popart_clock_small.png');

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.touchable = true;

    let clock = this.clock = this.addChild(new Sprite('clock'));
    clock.x = this.stage.centerX;
    clock.y = this.stage.centerY;

    clock.alignPivot();
    clock.touchable = true;
    clock.on('pointerDown', this.onClockDown, this);

    let minutesHand = this.minutesHand = clock.addChild(new Sprite('minutesHand'));
    minutesHand.alignPivot();

    let secondsHand = this.secondsHand = clock.addChild(new Sprite('secondsHand'));
    secondsHand.alignPivot();

    secondsHand.rotation = radiansPerSecond.seconds * 10;
    minutesHand.rotation = radiansPerSecond.minutes * -(10 * 60);

    secondsHand.x = minutesHand.x = clock.pivotOffsetX;
    secondsHand.y = minutesHand.y = clock.pivotOffsetY;

    //create a simple timer with a 60 ticks per second, which will work forever (or at least until you close the browser tab).
    this.timer = clock.addComponent(new Timer(1 / 60, Infinity));
    this.timer.on('tick', this.onTick, this);

    const defTextStyle = new TextStyle('Knewave', 0xcccccc, 25);
    const contrastStyle = new TextStyle('Knewave', 0xf2a702, 25);

    this.textFieldStrings = {
      onRunning: 'CLICK ON THE CLOCK TO\n~{contrast}PAUSE ~{def}THE TIME.',
      onPaused: 'CLICK ON THE CLOCK TO\n~{contrast}START ~{def}THE TIME.',
    };

    let hintTextField = this.hintTextField = this.addChild(new TextField(this.textFieldStrings.onRunning));
    hintTextField.setDefaultStyle(defTextStyle);
    hintTextField.setStyle('contrast', contrastStyle);

    hintTextField.align = FontAlign.CENTER;
    hintTextField.multiline = true;
    hintTextField.alignPivot(0.5, 1);
    hintTextField.x = this.stage.centerX;
    hintTextField.y = this.stage.height;
  }

  onClockDown() {
    if (this.timer.isRunning) {
      this.timer.pause();
      this.clock.alpha = 0.8;
      this.hintTextField.text = this.textFieldStrings.onPaused;
    }
    else {
      this.timer.start();
      this.clock.alpha = 1;
      this.hintTextField.text = this.textFieldStrings.onRunning;
    }
  }


  onTick() {
    this.secondsHand.rotation += radiansPerSecond.seconds;
    this.minutesHand.rotation += radiansPerSecond.minutes;
  }
}

const radiansPerSecond = {
  seconds: (Math.PI * 2) / 60,
  minutes: ((Math.PI * 2) / 60) / 60
};

let engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();