// Simple drag component
class DragComponent extends Component {
  constructor() {
    super();

    this.dragging = false;
    this.clickPos = new Vector();
  }

  onAdded(gameObject) {
    // Add InputComponent is required in order to Sprite listen for input
    gameObject.addComponent(new InputComponent());

    gameObject.on('pointerDown', this.onPointerDown, this);

    Black.input.on('pointerMove', this.onPointerMove, this);
    Black.input.on('pointerUp', this.onPointerUp, this);
  }

  onPointerDown(msg) {
    this.clickPos = this.gameObject.globalToLocal(Black.input.pointerPosition);
    this.dragging = true;
  }

  onPointerMove(msg) {
    if (this.dragging === false)
      return;

    // Find the offset relative to its parent
    let parentPos = this.gameObject.parent.globalToLocal(Black.input.pointerPosition);

    // Set a new position
    this.gameObject.x = parentPos.x - this.clickPos.x + this.gameObject.pivotX;
    this.gameObject.y = parentPos.y - this.clickPos.y + this.gameObject.pivotY;
  }

  onPointerUp(msg) {
    this.dragging = false;
  }
}

class MyGame extends GameObject {
  constructor() {
    super();

    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    // Pick up default AssetManager
    var assets = new AssetManager();

    // Preload images and sounds

    assets.enqueueImage('bg', `/assets/examples/backgrounds/popart_bg_b_2.png`);
    assets.enqueueImage('speaker', `/assets/examples/popart_speaker.png`);
    assets.enqueueImage('ear', `/assets/examples/popart_ear.png`);
    assets.enqueueSound('music1', '/assets/examples/drum.mp3');
    assets.enqueueSound('music2', '/assets/examples/bass.mp3');
    assets.enqueueSound('music3', '/assets/examples/strings.mp3');
    assets.enqueueSound('music4', '/assets/examples/vibes.mp3');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.touchable = true;

    this.speakers = [];
    this.sounds = [];

    // Creating sprites for each sound with assigned specific sound component
    for (let i = 0; i < 4; i++) {
      let speaker = new Sprite('speaker');
      speaker.alignPivot();
      this.addChild(speaker);
      let comp = new Sound('music' + (i + 1), 'master', true, 8);
      comp.playOnAdded = false;
      speaker.addComponent(comp);
      this.speakers.push(speaker);
      this.sounds.push(comp);
    }

    this.speakers[0].x = 50;
    this.speakers[0].y = 70;

    this.speakers[1].x = 450;
    this.speakers[1].y = 70;

    this.speakers[2].x = 50;
    this.speakers[2].y = 430;

    this.speakers[3].x = 450;
    this.speakers[3].y = 430;

    let ear = this.addChild(new Sprite('ear'));
    ear.touchable = true;
    ear.alignPivot();
    ear.x = 250;
    ear.y = 250;
    ear.add(new DragComponent());

    // Creating sound listener and assigning it to dragable sprite
    let listener = new SoundListener();
    ear.addComponent(listener);
    listener.listen();

    Black.input.once('pointerDown', this.startSounds, this);
  }

  startSounds(msg) {
    this.sounds.forEach(x => x.play(1, true));

    this.speakers.forEach(x => {
      let t = new Tween({ scaleY: [1.1, 1], scaleX: [1.1, 1] }, 0.4, { delay: 0.34, ease: Ease.cubicOut, loop: true });
      x.addComponent(t);
    });
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input, MasterAudio]);
engine.start();