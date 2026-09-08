'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    // Pick up default AssetManager
    let assets = new AssetManager();

    // Load Black Vector Graphics file 
    // To convert svg to bvg follow the instructions https://github.com/MassiveHeights/svg2bvg    
    assets.enqueueVector('car', '/assets/examples/bvg/car.json');

    // Load same url but this time we bake vector into the texture
    // Third param tells AssetManager to bake loaded vector graphics into texture
    assets.enqueueVectorTexture('car', '/assets/examples/bvg/car.json', true);

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create sprite from baked vector graphics
    let sprite = new Sprite('car');

    // Align object pivot
    sprite.alignPivot();

    sprite.x = this.stage.centerX - 400;
    sprite.y = this.stage.centerY;
    sprite.scale = 3;
    
    // Add object onto the stage
    this.addChild(sprite);

    // When passing string the Graphics will get graphics data from default asset manager and 
    // Graphics will be rendered as vector
    let graphics = new Graphics('car');

    // Align object pivot
    graphics.alignPivot();

    graphics.scaleX = -3;
    graphics.scaleY = 3;
    graphics.x = this.stage.centerX + 400;
    graphics.y = this.stage.centerY;
    
    // Add object onto the stage
    this.addChild(graphics);
  }
}

new Engine('game-container', MyGame, CanvasDriver).start();
