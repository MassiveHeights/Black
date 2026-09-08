class MyGame extends GameObject {
  constructor() {
    super();

    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(800, 500);

    // Pick up default AssetManager
    var assets = new AssetManager();
    assets.defaultPath = '/assets/examples/';

    // Preload images and sounds
    assets.enqueueImage('bg', 'bg-pattern.png');
    assets.enqueueImage('btn1', `popart_mac_button_down.png`);
    assets.enqueueImage('btn2', `popart_mac_button_hover.png`);
    assets.enqueueSound('music', 'final.mp3');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.touchable = true;

    // Waveform drawing params
    this.horizontalScale = 5;
    this.waveformWidth = 800;
    this.maxAmplitude = 150;

    // Game object where waveform will be drawn on
    let g = new Graphics();
    g.y = 250;
    this.addChild(g);

    // Creating pointer which is stuck to sound current position
    this.pointer = this.initPointer(this.maxAmplitude);
    g.addChild(this.pointer);

    // Retriving waveform data
    let clip = Black.assets.getSound('music');
    let waveData = clip.collectWaveData(this.waveformWidth * this.horizontalScale);

    // Drawing waveform
    this.drawWave(waveData, g, this.maxAmplitude);

    // Setting up input behavior - toggle play/pause
    Black.input.on('pointerDown', () => {
      if (!this.sound || this.sound.mState === 'completed') {
        this.sound = clip.play('master', 1, true);
      } else {
        if (this.sound.isPlaying)
          this.sound.pause();
        else 
          this.sound.resume();
      }
    });
  }

  drawWave(data, graphics, f) {
    graphics.fillStyle(0xffff00, 0.2);
    graphics.rect(-1, -this.maxAmplitude * .5, this.waveformWidth + 2, this.maxAmplitude);
    graphics.fill();

    let max = Math.max(...data) * f;
    for (let i = 0; i < data.length; i++) {
      let x = i / this.horizontalScale;
      let y = Math.max(0.2, data[i] * f);

      graphics.beginPath();
      graphics.lineStyle(1, ColorHelper.lerpHSV(0xff0000, 0x00ff00, Ease.quadraticOut(y / max)));
      graphics.moveTo(x, y);
      graphics.lineTo(x, y * -1);
      graphics.stroke();
    }
  }

  initPointer(m) {
    let p = new Graphics();
    p.lineStyle(1, 0xffffff);
    p.moveTo(0, -m * 0.5);
    p.lineTo(0, m * 0.5);
    p.stroke();
    return p;
  }

  onUpdate() {
    // Updating waveform pointer
    if (this.sound) {
      this.pointer.x = this.sound.currentPosition / this.sound.duration * this.waveformWidth;
    }
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input, MasterAudio]);
engine.start();