class MyGame extends GameObject {
  constructor() {
    super();

    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    // Pick up default AssetManager
    var assets = new AssetManager();

    // Preload images and sounds
    assets.enqueueImage('bg', '/assets/examples/bg-pattern.png');
    assets.enqueueImage('btn1', `/assets/examples/popart_mac_button_down.png`);
    assets.enqueueImage('btn2', `/assets/examples/popart_mac_button_hover.png`);
    assets.enqueueSound('music', '/assets/examples/final.mp3');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.touchable = true;

    this.textField = new TextField('', 'arial', 0xf6a200, 20);
    this.textField.x = 500 / 2;
    this.textField.y = 500 / 2 - 50;
    this.textField.align = 'center';
    this.addChild(this.textField);

    this.textField2 = new TextField('Hold and move to change volume and pan', 'arial', 0xf6a200, 20);
    this.textField2.x = 500 / 2;
    this.textField2.y = 50;
    this.textField2.align = 'center';
    this.textField2.alignPivot();
    this.addChild(this.textField2);

    let btn = this.addChild(new Sprite('btn1'));
    btn.touchable = true;
    btn.alignPivot();
    btn.x = 250;
    btn.y = 250;

    this.sound = null;

    this.textField.text = 'click to play sound';
    this.textField.alignPivot();

    btn.on('pointerDown', () => {
      // Toggle play/stop sound
      if (!this.sound) {
        this.sound = Black.audio.play('music', 'master', 0.5, true);
        this.textField.text = 'click to stop sound';
        btn.texture = Black.assets.getTexture('btn2');
      } else {
        this.sound.stop();
        this.sound = null;
        this.textField.text = 'click to play sound';
        btn.texture = Black.assets.getTexture('btn1');
      }

      this.textField.alignPivot();
    });

    let volume_pan = (msg) => {
      if (Black.input.isPointerDown) {
        let xv = MathEx.clamp(msg.sender.mStagePosition.x / Black.stage.width * 2 - 1, -1, 1);
        let yv = MathEx.clamp(msg.sender.mStagePosition.y / Black.stage.height, 0, 1);
        // Updating sound volume and panning relatively to mouse position
        if (this.sound) {
          this.sound.pan = xv;
          this.sound.volume = 1 - yv;
        }
      }
    };

    Black.input.on('pointerMove', volume_pan);
    Black.input.on('pointerDown', volume_pan);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input, MasterAudio]);
engine.start();