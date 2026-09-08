class MyGame extends GameObject {
  constructor() {
    super();

    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(900, 500);

    // Pick up default AssetManager
    var assets = new AssetManager();

    // Preload images and sounds
    assets.enqueueImage('btn1', `/assets/examples/popart_mac_btn_3.png`);
    assets.enqueueImage('btn2', `/assets/examples/popart_mac_btn_2.png`);
    assets.enqueueSoundAtlas('atlas', '/assets/examples/atlas.mp3', '/assets/examples/soundatlas.json');
    assets.enqueueGoogleFont('Roboto');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.touchable = true;

    this.horizontalScale = 5;
    this.waveformWidth = 500;
    this.maxAmplitude = 120;

    let g = new Graphics();
    g.x = 0;
    g.y = 200;
    this.addChild(g);

    // Creating pointer, which allow us to show current playback time
    this.pointer = this.initPointer(this.maxAmplitude);
    g.addChild(this.pointer);

    // Retrieving sound data, which we are going to draw
    let atlas = Black.assets.getSoundAtlas('atlas');
    let waveData = atlas.collectWaveData(this.waveformWidth * this.horizontalScale);

    // Drawing waveform
    this.drawWave(waveData, g, this.maxAmplitude);
    this.atlas = atlas;

    let clipNames = ['one', 'two', 'three', 'full'];
    let labels = ['One', 'Two', 'Three', 'All'];

    // Drawing regions for each subclip
    this.drawRegions(g, clipNames);

    for (let i = 0; i < 4; i++) {
      let btn = new Sprite('btn1');
      btn.touchable = true;
      this.addChild(btn);
      btn.y = this.stage.centerY + 50;
      btn.x = this.stage.centerX + 200 * (i % 2) - 170;

      if (i >= 2)
        btn.y += 80;

      btn.on('pointerDown', () => {
        this.sound && this.sound.stop();
        this.clip = Black.assets.getSound(clipNames[i]);
        this.sound = this.clip.play();
      });

      let tf = new TextField(labels[i], 'Roboto', 0xffffff, 28);
      tf.y = btn.y + btn.height * 0.5 + 4;
      tf.x = btn.x + btn.width * 0.5;
      tf.align = 'center';
      tf.alignPivot();
      this.addChild(tf);
    }

    g.alignPivot();
    g.x = this.stage.centerX;
    g.y = this.stage.centerY - 100;
  }

  onUpdate() {
    // Updating current time pointer
    if (this.sound) {
      let soundPos = (this.clip.offset + this.sound.currentPosition) / this.atlas.duration;
      this.pointer.x = soundPos * this.waveformWidth;
    }
  }

  drawWave(data, graphics, f) {
    graphics.beginPath();
    graphics.fillStyle(0x0, 0.7);
    graphics.rect(-1, -this.maxAmplitude * 0.5, this.waveformWidth + 2, this.maxAmplitude);
    graphics.fill();

    let max = Math.max(...data) * f;
    for (let i = 0; i < data.length; i++) {
      let x = i / this.horizontalScale;
      let y = Math.max(0.2, data[i] * f);

      graphics.beginPath();
      graphics.lineStyle(1, ColorHelper.lerpHSV(0xff0000, 0x00ff00, Ease.quadraticOut(y / max)));
      graphics.moveTo(x, y * 0.6);
      graphics.lineTo(x, y * -1 * 0.6);
      graphics.stroke();
    }
  }

  drawRegions(graphics, clipNames) {
    let g = new Graphics();
    graphics.addChild(g);

    for (let i = 0; i < clipNames.length - 1; i++) {
      let clip = Black.assets.getSound(clipNames[i]);

      g.beginPath();
      g.fillStyle(0xffffff, 0.15);
      g.lineStyle(1, 0xffffff);
      g.rect(clip.offset / this.atlas.duration * this.waveformWidth - 1, -this.maxAmplitude * 0.5, clip.duration / this.atlas.duration * this.waveformWidth + 2, this.maxAmplitude);
      g.fill();
      g.stroke();
    }

    g.beginPath();
    g.fillStyle(0xffffff, 0.15);
    g.lineStyle(5, 0xffffff)
    g.rect(-1, -this.maxAmplitude * 0.5, this.waveformWidth, this.maxAmplitude);
    g.stroke();
  }

  initPointer(m) {
    let p = new Graphics();
    p.lineStyle(1, 0xffffff);
    p.moveTo(0, -m * 0.5);
    p.lineTo(0, m * 0.5);
    p.stroke();
    return p;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input, MasterAudio]);
engine.start();