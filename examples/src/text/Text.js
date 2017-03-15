// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueueImage('bp', 'blueprint-landscape.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAdded() {}

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);

    this.addChild(this.view);

    // Add background sprite
    let bg = new Sprite('bp');
    bg.name = 'background';
    bg.tag = 'bg';
    this.view.addChild(bg);

    let text = new TextField('SOME TEXT', 45);
    text.y = 320;
    text.autoSize = false;
    text.fieldWidth = 960;
    text.color = 0xffff00;
    text.align = 'center';
    this.view.addChild(text);
  }
}


// Create and start engine
var black = new Black('container', MyGame, 'canvas');
black.start();
