"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor(){
    super();
    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';
    // Preload some images
    this.assets.enqueueImage('rect', 'dot.png');
    this.assets.enqueueImage('bp', 'blueprint-landscape.png');
    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded(){
    let tBg = this.assets.getTexture('bp');
    let img = this.assets.getTexture('rect');
    // Add background sprite
    let bg = new Sprite(tBg);
    this.addChild(bg);

    let count = 150;
    let spacingh = 960 / count;
    let spacingv = 640 / count;

    let group = new GameObject();
    this.addChild(group);

    let texture = this.assets.getTexture('rect');

    let s = Date.now();
    for (var xx = 0; xx < count; xx++) {
      for (var yy = 0; yy < count; yy++) {
        let s = new Sprite(texture);
        s.x = (spacingh * xx) + 20;
        s.y = (spacingv * yy) + 20;

        s.alpha = 0.5;
        s.alignPivot(0.5, 0.5);

        group.addChild(s);
      }
    }

    let e = Date.now();
    console.log(e-s);

    (function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
  }

  onUpdate(dt) {
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'canvas');
black.start();
