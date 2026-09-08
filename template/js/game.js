import { Engine, Acceleration, AssetManager, Black, BlendMode, ColorHelper, ColorOverLife, Ease, Emitter, FloatScatter, FontStyle, FontWeight, GameObject, InitialLife, InitialVelocity, ScaleOverLife, Sprite, TextField, Tween } from 'black-engine';
import particle from 'assets/textures/particle.png';
import anvil from 'assets/textures/popart_anvil.png';

export class Game extends GameObject {
  constructor() {
    super();

    // Pick default AssetManager
    var assets = new AssetManager();

    // load images, make sure to import them first
    assets.enqueueImage('anvil', anvil);
    assets.enqueueImage('star', particle);

    // load font
    assets.enqueueGoogleFont('Titillium Web');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoadded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoadded(m) {
    // Create a sprite
    let sprite = new Sprite('anvil');
    sprite.alignPivotOffset(0.5, 1);

    sprite.x = this.stage.centerX;
    sprite.y = this.stage.centerY + 200;

    // make this game object touchable so children elements can be able to receive input too
    this.touchable = true;

    // sprite also needs to be touchable
    sprite.touchable = true;

    // Create a emitter
    let emitter = new Emitter();
    emitter.space = this.parent;
    emitter.blendMode = BlendMode.ADD;
    emitter.x = this.stage.centerX + 10;

    emitter.emitCount = new FloatScatter(30);
    emitter.emitDelay = new FloatScatter(0);
    emitter.emitInterval = new FloatScatter(0);
    emitter.emitDuration = new FloatScatter(Infinity);
    emitter.emitNumRepeats = new FloatScatter(Infinity);
    emitter.textures = [Black.assets.getTexture('star')];

    emitter.add(new InitialLife(0.3, 0.9));
    emitter.add(new InitialVelocity(-50, 0, 50, -200));
    emitter.add(new Acceleration(-500, -500, 500, 800));
    emitter.add(new ColorOverLife(0xf16c20, 0xfc3aa4));
    emitter.add(new ScaleOverLife(new FloatScatter(1.2, 0, Ease.exponentialIn)));

    emitter.y = this.stage.bounds.y - 500;

    let tween = new Tween({ y: [0, sprite.y - 110] }, 1, { loop: true, repeatDelay: 1 });
    emitter.add(tween);

    // Tween sprite color
    sprite.color = 0xffffff;
    sprite.add(new Tween({ color: [0xffffaa, 0xff0000, 0xffffaa] }, 0.5, { delay: 0.7, loop: true, repeatDelay: 1.5 }, { color: ColorHelper.lerpHSV }));
    sprite.add(new Tween({ scaleY: [1, 0.9, 1] }, 0.5, { delay: 0.69, loop: true, repeatDelay: 1.5 }));

    let textField = new TextField('Black Engine', 'Titillium Web', 0xffffff, 15, FontStyle.NORMAL, FontWeight.BOLD);
    textField.highQuality = true;
    textField.x = this.stage.bounds.x;
    textField.y = this.stage.bounds.y;

    // Add sprite, text and emitter onto the stage
    this.add(emitter, sprite, textField);

    this.sprite = sprite;
    this.emitter = emitter;
    this.text = textField;

    this.stage.on('resize', this.onResize, this);
  }

  onResize() {
    this.text.x = this.stage.bounds.x;
    this.text.y = this.stage.bounds.y;
  }
}