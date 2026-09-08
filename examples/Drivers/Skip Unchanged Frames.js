'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(960, 640);

    var assets = new AssetManager();
    assets.enqueueAtlas('assets', '/assets/examples/donuts.png', '/assets/examples/donuts.json');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    const size = 100;

    this.touchable = true;

    let container = new DisplayObject();
    container.touchable = true;

    // Create 2500 donuts!
    for (let xx = 0; xx < size; xx++) {
      for (let yy = 0; yy < size; yy++) {
        let name = `player-${MathEx.randomBetween(1, 7)}`;
        
        if (xx === 0 || yy === 0)
        name = 'player-1';
        
        if (xx === size - 1 || yy === size - 1)
        name = 'player-1';
        
        let sprite = new Sprite(name);
        sprite.touchable = true;
        sprite.scaleX = sprite.scaleY = 0.5;        
        sprite.x = xx * (500 / 12);
        sprite.y = yy * (500 / 12);        
        container.addChild(sprite);
      }
    }
    
    container.alignPivotOffset();
    container.x = this.stage.centerX;
    container.y = this.stage.centerY;
    this.addChild(container);

    container.on('pointerMove', m=>{
      m.sender.scale = 0;      
    });
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver, [Input]);
engine.pauseOnHide = false;
engine.pauseOnBlur = false;
engine.start();

// Important! If true and scene has not been changed since last frame no rendering will be done.
Renderer.skipUnchangedFrames = true;
