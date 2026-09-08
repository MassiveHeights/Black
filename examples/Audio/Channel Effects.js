class MyGame extends GameObject {
  constructor() {
    super();

    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    // Pick up default AssetManager
    var assets = new AssetManager();

    // Preload images and sounds
    assets.enqueueImage('phone', '/assets/examples/popart_iphone_1.png');
    assets.enqueueImage('btnPlay', `/assets/examples/popart_btn_play.png`);
    assets.enqueueImage('btnStop', `/assets/examples/popart_btn_stop.png`);
    assets.enqueueImage('boombox', `/assets/examples/popart_boombox.png`);
    assets.enqueueImage('boombox_stroke', `/assets/examples/popart_boombox_stroke.png`);
    assets.enqueueSound('underwater', '/assets/examples/underwater_ir.wav');
    assets.enqueueSound('music', '/assets/examples/final.mp3');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    let boombox1 = this.addChild(new Sprite('boombox'));
    boombox1.alignPivot();
    boombox1.x = this.stage.centerX + 80;
    boombox1.y = this.stage.centerY - 120;

    let boombox2 = this.addChild(new Sprite('boombox_stroke'));
    boombox2.alignPivot();
    boombox2.x = this.stage.centerX + 80;
    boombox2.y = this.stage.centerY + 120;

    let textField2 = new TextField('', 'arial', 0xffffff, 20);
    textField2.x = boombox2.pivotX;
    textField2.y = boombox2.pivotY;
    textField2.align = 'center';
    textField2.strokeColor = 0x0;
    textField2.strokeThickness = 5;
    boombox2.addChild(textField2);

    let phone = this.addChild(new Sprite('phone'));
    phone.alignPivot();
    phone.x = this.stage.centerX - 180;
    phone.y = this.stage.centerY;

    let btnPlay = phone.addChild(new Sprite('btnPlay'));
    btnPlay.touchable = true;
    btnPlay.alignPivot();
    btnPlay.x = phone.pivotX;
    btnPlay.y = phone.pivotY;

    textField2.text = 'go underwater';
    textField2.alignPivot();

    // Creating underwater effect using impulse responce
    let underwaterIR = Black.assets.getSound('underwater').native;
    let underwaterEffect = new ReverbEffect(underwaterIR);
    let underwaterChannel = Black.audio.createChannel('underwater');
    underwaterEffect.wet = 1;
    underwaterEffect.dry = 0.05;
    underwaterEffect.tone = 350;
    underwaterChannel.addEffect(underwaterEffect);

    this.touchable = true;
    phone.touchable = true;
    boombox2.touchable = true;

    let tween = new Tween({ scaleY: [1.1, 1, 1], scaleX: [1.1, 1, 1] }, 0.75, { ease: Ease.cubicOut, loop: true, playOnAdded: false });
    boombox1.addComponent(tween);

    let sound = null;
    let currChannel = 'master';

    btnPlay.on('pointerDown', () => {      
      if (!sound) {
        sound = Black.audio.play('music', currChannel, 1, true);
        btnPlay.textureName = 'btnStop';
        tween.play();
      } else {
        sound.stop();
        sound = null;
        btnPlay.textureName = 'btnPlay';
        tween.stop();
        tween.reset();
      }
    });

    boombox2.on('pointerDown', () => {
      if (currChannel === 'master') {
        currChannel = 'underwater';
        textField2.text = 'go to the surface';
        boombox1.y = this.stage.centerY + 120;
        boombox2.y = this.stage.centerY - 120;
      } else {
        currChannel = 'master';
        textField2.text = 'go underwater';
        boombox1.y = this.stage.centerY - 120;
        boombox2.y = this.stage.centerY + 120;
      }
      
      textField2.alignPivot();
      
      if (sound) {
        sound.channel = currChannel;
      }
    });
  }

  onUpdate() {
    
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input, MasterAudio]);
engine.start();