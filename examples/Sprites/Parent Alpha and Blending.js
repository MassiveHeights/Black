class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    let assets = new AssetManager();
    assets.enqueueImage('bp', '/assets/examples/bg-pattern-2.png');
    assets.enqueueImage('red', '/assets/examples/circle-red.png');
    assets.enqueueImage('green', '/assets/examples/circle-green.png');
    assets.enqueueImage('blue', '/assets/examples/circle-blue.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.addChild(new Sprite('bp'));    

    let cont = new DisplayObject();
    cont.alpha = 0.5;
    cont.blendMode = 'add';

    let red = new Sprite('red');
    let green = new Sprite('green');
    let blue = new Sprite('blue');

    red.x = 0;
    green.x = 100;
    blue.x = 100;

    this.add(cont);
    cont.add(red);
    red.add(green);
    green.add(blue);

    cont.x = 250;
    cont.y = 250;

    cont.alignPivot();
  }
}

let engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();