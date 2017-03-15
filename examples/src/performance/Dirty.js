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

    let count = 20;
    let spacingh = 960 / count;
    let spacingv = 640 / count;

    for (var xx = 0; xx < count; xx++) {
      for (var yy = 0; yy < count; yy++) {
        let s = new Sprite('rect');
        s.x = (spacingh * xx) + 20;
        s.y = (spacingv * yy) + 20;
        s.scaleX = s.scaleY = 0.1;

        s.alpha = 0;
        s.alignPivot(0.5, 0.5);

        this.addChild(s);

        // TRIPPLED SPRITES
        let s2 = new Sprite('rect');
        s2.x = s2.y = 10;
        s.addChild(s2);

        let s3 = new Sprite('rect');
        s3.x = s3.y = 10;
        s2.addChild(s3);

        let s4 = new Sprite('rect');
        s4.x = s4.y = 10;
        s3.addChild(s4);

        let s5 = new Sprite('rect');
        s5.x = s5.y = 10;
        s2.addChild(s5);

        let s6 = new Sprite('rect');
        s6.x = s6.y = 10;
        s2.addChild(s6);
      }
    }

    // iPhone 6s - 6'400 sprits
    // WITHOUT UPDATE WITH DirtyFlag.WORLD      10FPS
    // WITHOUT UPDATE WITHOUT DirtyFlag.WORLD   7FPS

    // WITH HALF-UPDATE WITH DirtyFlag.WORLD    13FPS
    // WITH HALF-UPDATE WITHOUT DirtyFlag.WORLD 14FPS

    // FULL-UPDATE WITH DirtyFlag.WORLD         8FPS
    // FULL-UPDATE WITHOUT DirtyFlag.WORLD      8FPS

    (function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
  }

  onUpdate(dt) {
    for (var i = 1; i < this.numChildren; i++) {
      let c = this.getChildAt(i);
      c.rotation += 0.001 * dt;

      let s = (Math.sin(c.rotation) * 1) + Math.random();
      c.alpha = s;
      c.scaleX = c.scaleY = s * 0.1;
      c.x += (Math.random() - 0.5) * 5;
      c.y += (Math.random() - 0.5) * 5;
      c.getBounds(c.parent, false);
    }
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'canvas');
black.start();
