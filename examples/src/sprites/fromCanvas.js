// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueueImage('rect', 'rect55-red.png');
    this.assets.enqueueImage('bp', 'blueprint-landscape.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {
    this.view = new GameObject();
    this.view.addComponent(new MRComponent(960, 640));
    this.addChild(this.view);

    this.view.addChild(new Sprite('bp'));

    this.sprite = new Sprite(this.getTextureFromCanvas());

    this.sprite.alignPivot(0.5, 0.5);
    this.sprite.x = 480;
    this.sprite.y = 320;
    this.view.addChild(this.sprite);
  }

  getTextureFromCanvas() {
    const col = 6;
    const row = 6;
    const offset = { x: 60, y: 60 };
    const txt = this.assets.getTexture('rect');

    let canvas = document.createElement('canvas');
    canvas.width = txt.width + (offset.x * (col - 1));
    canvas.height = txt.height + (offset.y * (row - 1));
    let context = canvas.getContext('2d');

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        let x = offset.x * i;
        let y = offset.y * j;

        context.drawImage(txt.native, x, y);
      }
    }
    return Texture.fromCanvas(canvas);
  }
}

// Create and start engine
var black = new Black('container', MyGame, 'dom');
black.start();
