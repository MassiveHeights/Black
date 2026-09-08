// In some cases waiting for one job to finish may cause your code to look like spaghetti
class MyGame extends GameObject {
  constructor() {
    super();

    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    this.touchable = true;

    var assets = new AssetManager();
    assets.enqueueImage('square', '/assets/examples/square.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();

    this.textField = new TextField('Lorem ipsum dolor sit amet!', 'arial', 0xffffff, 36);
    this.textField.x = 500 / 2;
    this.textField.y = 40;
    this.textField.autoSize = false;
    this.textField.fieldWidth = 960;
    this.textField.align = 'center';
    this.textField.alignPivot();
    this.addChild(this.textField);
  }

  onAssetsLoaded(m) {
    var sprite = new Sprite('square');
    sprite.touchable = true;
    sprite.x = (500 / 2);
    sprite.y = (500 / 2);
    sprite.alignPivot();
    this.addChild(sprite);

    this.spawn(function* () {
      this.textField.text = 'Lets wait for 2 seconds...';
      yield this.wait(2);

      this.textField.text = 'Fade out the sprite.';
      sprite.addComponent(new Tween({
        alpha: 0
      }, 0.5));

      yield this.wait(1);
      this.textField.text = 'One more and fade in';
      sprite.addComponent(new Tween({
        alpha: 1
      }, 0.5));

      this.textField.text = 'Wait for a \'pointerDown\' message on sprite now!';
      yield sprite.waitMessage('pointerDown');
      sprite.addComponent(new Tween({
        rotation: Math.PI * 10
      }, 5));

      this.textField.text = 'Done';
    });
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.start();