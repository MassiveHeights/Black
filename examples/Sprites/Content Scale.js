class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();

    assets.enqueueImage('box', '/assets/examples/popart_wood_box.png');
    assets.enqueueImage('box@2x', '/assets/examples/popart_wood_box@2x.png');

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // As you can see both boxes are the same size on the screen considering the fact that popart_wood_box@2x.png texture is two times bigger

    let box = new Sprite('box');
    box.x = this.stage.centerX - 60;
    box.y = this.stage.centerY;
    box.alignPivot();
    this.add(box);

    let boxScaled = new Sprite('box@2x');
    boxScaled.x = this.stage.centerX + 60;
    boxScaled.y = this.stage.centerY;
    boxScaled.alignPivot();
    this.add(boxScaled);

    console.log(box.bounds, boxScaled.bounds);
    
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();