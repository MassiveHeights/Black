"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = new AssetManager();
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueue('rect', 'rect55.png');
    this.assets.enqueue('bp', 'blueprint-landscape.png');

    // Pass on load complete handler and this for correct context
    this.assets.on('complete', this.onAssetsLoadded, this);

    perfCompare('Matrix ctor and * ([] vs Float32Array)', this.matrix_constructor_1, this.matrix_constructor_2, this, 500);
    perfCompare('Matrix ctor and * (Float32Array vs [])', this.matrix_constructor_2, this.matrix_constructor_1, this, 500);
  }

  onAssetsLoadded() {
    let tBg = this.assets.getAsset('bp');
    let img = this.assets.getAsset('rect');

    // Add background sprite
    this.addChild(new Sprite(tBg));

    // Add rectangle
    const sprite = new Sprite(img);
    sprite.x = 385;
    sprite.y = 220;
    this.addChild(sprite);

    assert("Sprite x is 385", sprite.x === 385);
    assert("Sprite width is 55", sprite.width === 55);

    sprite.scaleX = sprite.scaleY = 2;
    assert("Sprite width is 110 after scale 2", sprite.width === 110);

    sprite.center();
    assert("Sprite pivotX is 27.5 after centering and scaling by 2", sprite.pivotX === 55 / 2);

    sprite.rotation = Math.PI / 4;
    this.sprite = sprite;

    assertf("Test sprite.x", () => {
      return true;
    });



  }

  minvert1(){
    let arr = [];
    for (var i = 0; i < 1500; i++) {
      arr.push(i);
    }
  }

  minvert2(){
    let arr = [];
    for (var i = 0; i < 1500; i++) {
      arr[i] = i;
    }
  }

  matrix_constructor_1(){
    var x = null;
    for (var i = 0; i < 150000; i++) {
      var y = (x === null);
    }
  }

  matrix_constructor_2(){
    var x = null;
    for (var i = 0; i < 150000; i++) {
      var y = (x === undefined);
    }
  }

  testFunc(){
  }

  static testFunc2(){
  }

  onUpdate(dt) {
    //this.sprite.rotation = Math.PI / 4;
  }
}

// Create and start engine
var black  = new Black('container', MyGame, 'canvas');
black.start();
