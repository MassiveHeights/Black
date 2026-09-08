'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    // creates default asset manager
    var assets = new AssetManager();

    // Preload images
    assets.enqueueImage('box', '/assets/examples/popart_box_bottom.png');

    assets.enqueueAtlas('atlas', '/assets/examples/spine/spineboy/spineboy.png', '/assets/examples/spine/spineboy/spineboy-atlas.json');    
    assets.enqueueJSON('spine', '/assets/examples/spine/spineboy/spineboy.json');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create a sprite
    let sprite = new Sprite('box');

    // Align object pivot
    sprite.alignPivot();

    sprite.x = this.stage.centerX;
    sprite.y = this.stage.centerY;
    
    // Add object onto the stage
    this.addChild(sprite);

    let spine = new Spine('spine');
    this.addChild(spine);

    spine.x = this.stage.centerX;
    spine.y = this.stage.centerY;

    spine.play('idle');
  }
}


var script = document.createElement('script');
// Loaded directly rather than through AssetManager, so the deploy root has to
// be applied by hand (see SITE_ROOT in examples/index.html).
script.src = (window.SITE_ROOT || '') + '/assets/examples/spine/spine-core.js';
script.onload = function () {
  new Engine('game-container', MyGame, CanvasDriver).start();  
};
document.head.appendChild(script);




// class MyGame extends GameObject {
//   constructor() {
//     super();

//     /// Set auto resizeable stage
//     Black.stage.scaleMode = StageScaleMode.LETTERBOX;
//     Black.stage.setSize(500, 500);

//     let assets = new AssetManager();
//     // Background copy.png
//     // Layer 0.png
//     assets.defaultPath = '/assets/examples/spine/';
//     assets.enqueueAtlas('atlas', 'assets.png', 'assets.json');
//     assets.enqueueImage('Background copy', 'Background copy.png');
//     assets.enqueueJSON('spine', 'spine.json');
//     assets.on('complete', this.onAssetsLoaded, this);
//     assets.loadQueue();
//   }

//   onAssetsLoaded(m) {
//     let spine = new Spine('spine');
//   }
// }

// var script = document.createElement('script');
// script.src = '/assets/examples/spine/spine-core.js';
// script.onload = function () {
//   let engine = new Engine('game-container', MyGame, CanvasDriver);
//   engine.start();
// };
// document.head.appendChild(script);