'use strict'
var assert = chai.assert;

class TestGame extends GameObject {
  constructor() {
    super();
  }
}

var black = new Black('canvas', TestGame, 640, 480);
black.start();

describe('Sprite', function() {
  var img = new Image();
  img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRF/wAA/////wAAhBG71wAAAAJ0Uk5TAAB2k804AAAAOklEQVQI12NYBQQMCxgYuBg6GBiUGJoYgKihgYmJoUWBA0hwKAAJpgYYAeaCJUBK2kCKwdrABoCMAgCqmhDZNl4sJgAAAABJRU5ErkJggg==";
  var tx = new Texture(img); // size: 16x16
  const tw = tx.width;
  const th = tx.height;

  it('should set and get .x', function () {
    var s = new Sprite(tx);
    s.x = 100;
    assert.equal(s.x, 100);
  });

  it('should return correct width and height', function () {
    var s = new Sprite(tx);
    assert.equal(s.width, 16);
    assert.equal(s.height, 16);
  });

  it('should return correct width and height after scalling', function () {
    var s = new Sprite(tx);
    s.scaleX = s.scaleY = 2;
    assert.equal(s.width, 16 * 2);
    assert.equal(s.height, 16 * 2);
  });

  it('should return correct pivot after scale and center() ', function () {
    var s = new Sprite(tx);
    assert.equal(s.pivotX, 0);
    assert.equal(s.pivotY, 0);

    s.scaleX = s.scaleY = 2;
    s.center();

    assert.equal(s.pivotX, 16 / 2);
    assert.equal(s.pivotY, 16 / 2);
  });

  describe('.getLocalBounds()', function() {
    it('should return correct width and height', function () {
      const s = new Sprite(tx);
      const b = s.getLocalBounds();
      assert.equal(b.width, 16);
      assert.equal(b.height, 16);
    });

    it('should return correct width and height after scalling', function () {
      const s = new Sprite(tx);
      s.scaleX = s.scaleY = 2;
      const b = s.getLocalBounds();
      assert.equal(b.width, 16);
      assert.equal(b.height, 16);
    });
  });

  describe('.getWorldBounds()', function() {
    it('should return correct width and height', function () {
      const s = new Sprite(tx);
      const b = s.getWorldBounds();
      //s.scaleX = s.scaleY = 2;
      assert.equal(b.width, 16);
      assert.equal(b.height, 16);
    });

    it('should return correct width and height after scalling when on stage', function () {
      const s = new Sprite(tx);
      black.root.addChild(s);
      s.scaleX = s.scaleY = 2;
      const b = s.getWorldBounds();

      assert.equal(b.width, tw * 2);
      assert.equal(b.height, th * 2);
    });
  });

});