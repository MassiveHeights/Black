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
    clock.on('pointerUp', this.onClockUp, this);

    let minutesHand = this.minutesHand = clock.addChild(new Sprite('minutesHand'));
    minutesHand.alignPivot();

    let secondsHand = this.secondsHand = clock.addChild(new Sprite('secondsHand'));
    secondsHand.alignPivot();

    secondsHand.rotation = radiansPerSecond.seconds * 10;
    minutesHand.rotation = radiansPerSecond.minutes * -(10 * 60);

    secondsHand.x = minutesHand.x = clock.pivotOffsetX;
    secondsHand.y = minutesHand.y = clock.pivotOffsetY;

    //create a simple timer with a tick per second, which will work forever (or at least until you close the browser tab).
    this.timer = new Timer(1, Infinity);
    clock.addComponent(this.timer);

    //listen each tick.
    this.timer.on('tick', this.onTick, this);

    const defTextStyle = new TextStyle('Knewave', 0xcccccc, 25);
    const contrastStyle = new TextStyle('Knewave', 0xf2a702, 25);

    let hintTextField = this.addChild(new TextField('CLICK ON THE CLOCK TO\nACTIVATE THE ~{contrast}TIME MACHINE.'));
    hintTextField.setDefaultStyle(defTextStyle);
    hintTextField.setStyle('contrast', contrastStyle);

    hintTextField.align = FontAlign.CENTER;
    hintTextField.multiline = true;
    hintTextField.alignPivot(0.5, 1);
    hintTextField.x = this.stage.centerX;
    hintTextField.y = this.stage.height;
  }

  onTick() {
    this.secondsHand.rotation += radiansPerSecond.seconds;
    this.minutesHand.rotation += radiansPerSecond.minutes;
  }

  onClockDown() {
    this.timer.interval = (1 / 60);
    this.clock.scale = 0.95;
  }

  onClockUp() {
    this.timer.interval = 1;
    this.clock.scale = 1;
  }
}

const radiansPerSecond = {
  seconds: (Math.PI * 2) / 60,
  minutes: (Math.PI * 2 / 60) / 60
};

let engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();
