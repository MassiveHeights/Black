import { GameObject, Sprite, Vector, Matrix, DirtyFlag, Rectangle, Texture, Black, VideoNullDriver } from './../../../dist/black-es6-module'
const RECT_50X50_B64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFxJREFUeNrs2UENwCAUREHaoIM7EmoBO+hADlq4o4TWxU86L9n73Pd6Zkvxyu96qaFMY687hQwLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsL61+s708ce0VjHQEGALvnBuYLRdofAAAAAElFTkSuQmCC';

function getTexture() {
  let img = new Image(50, 50);
  return new Texture(img);
}

describe('GameObject', () => {
  test('Should create new GameObject', () => {
    let go = new GameObject();
    let identity = new Matrix();

    expect(go.name).toBeNull();
    expect(go.x).toEqual(0);
    expect(go.y).toEqual(0);
    expect(go.rotation).toEqual(0);
    expect(go.width).toEqual(0);
    expect(go.height).toEqual(0);
    expect(go.scaleX).toEqual(1);
    expect(go.scaleY).toEqual(1);
    expect(go.anchorX).toEqual(0);
    expect(go.anchorY).toEqual(0);
    expect(go.pivotOffsetX).toEqual(0);
    expect(go.pivotOffsetY).toEqual(0);
    expect(go.pivotX).toEqual(0);
    expect(go.pivotY).toEqual(0);
    expect(go.localTransformation.equals(identity)).toEqual(true);
    expect(go.worldTransformation.equals(identity)).toEqual(true);
  });

  describe('Object bounds', () => {
    class MyGame extends GameObject { }
    const black = new Black('game-container', MyGame, VideoNullDriver);
    let sprite = null;
    let inner = null;
    let inner2 = null;

    beforeAll(() => {
      black.start();

      let stage = black.stage;

      sprite = new Sprite(getTexture());
      sprite.name = 'square';
      sprite.x = 100;
      sprite.y = 100;
      stage.addChild(sprite);

      inner = new Sprite(getTexture());
      inner.name = 'inner';
      inner.x = 10;
      inner.y = 10;
      sprite.addChild(inner);

      inner2 = new Sprite(getTexture());
      inner2.name = 'inner';
      inner2.x = 10;
      inner2.y = 10;
      inner.addChild(inner2);
    });

    afterAll(() => {
      black.stop();
    });

    test('local bounds without children', () => {
      let bounds = sprite.localBounds;
      let rect = new Rectangle(0, 0, 50, 50);

      expect(bounds.equals(rect)).toBe(true);
    });

    test('get bounds without children', () => {
      let bounds = sprite.getBounds(sprite, false);
      let rect = new Rectangle(0, 0, 50, 50);

      expect(bounds).toEqual(rect);
    });

    test('get bounds with children', () => {
      let bounds = sprite.getBounds(sprite, true);
      let rect = new Rectangle(0, 0, 70, 70);

      expect(bounds).toEqual(rect);
    });

    test('Parent-relative bounds without children', () => {
      let bounds = sprite.getBounds(null, false);
      let rect = new Rectangle(100, 100, 50, 50);

      expect(bounds).toEqual(rect);

      bounds = sprite.getBounds(undefined, false);
      expect(bounds).toEqual(rect);
    });

    test('Parent-relative bounds with children', () => {
      let bounds = sprite.getBounds();
      let rect = new Rectangle(100, 100, 70, 70);

      expect(bounds).toEqual(rect);

      bounds = sprite.getBounds(null);
      expect(bounds).toEqual(rect);

      bounds = sprite.getBounds(undefined);
      expect(bounds).toEqual(rect);
    });

    test('Space-relative bounds without children', () => {
      let bounds = sprite.getBounds(inner, false);
      let rect = new Rectangle(-10, -10, 50, 50);

      expect(bounds).toEqual(rect);
    });

    test('Space-relative bounds with children', () => {
      let bounds = sprite.getBounds(inner, true);
      let rect = new Rectangle(-10, -10, 70, 70);

      expect(bounds).toEqual(rect);
    });

    test('Inner sprite-relative bounds with children', () => {
      let bounds = inner.getBounds(inner, false);
      let rect = new Rectangle(0, 0, 50, 50);

      expect(bounds).toEqual(rect);
    });
  });

  describe('Object bounds with clip rect', () => {
    class MyGame extends GameObject { }
    const black = new Black('game-container', MyGame, VideoNullDriver);
    let sprite = null;
    let inner = null;
    let inner2 = null;

    beforeAll(() => {
      black.start();

      let stage = black.stage;

      sprite = new Sprite(getTexture());
      sprite.name = 'square';
      sprite.x = 100;
      sprite.y = 100;
      stage.addChild(sprite);

      inner = new Sprite(getTexture());
      inner.name = 'inner';
      inner.x = 10;
      inner.y = 10;
      sprite.addChild(inner);

      inner2 = new Sprite(getTexture());
      inner2.name = 'inner';
      inner2.x = 10;
      inner2.y = 10;
      inner.addChild(inner2);
    });

    afterAll(() => {
      black.stop();
    });

    test('local bounds without children', () => {
      let bounds = sprite.localBounds;
      let rect = new Rectangle(0, 0, 50, 50);

      expect(bounds).toEqual(rect);
    });

    test('get bounds without children', () => {
      let bounds = sprite.getBounds(sprite, false);
      let rect = new Rectangle(0, 0, 50, 50);

      expect(bounds).toEqual(rect);
    });

    test('get bounds with children', () => {
      let bounds = sprite.getBounds(sprite, true);
      let rect = new Rectangle(0, 0, 70, 70);

      expect(bounds).toEqual(rect);
    });

    test('Parent-relative bounds without children', () => {
      let bounds = sprite.getBounds(null, false);
      let rect = new Rectangle(100, 100, 50, 50);

      expect(bounds).toEqual(rect);

      bounds = sprite.getBounds(undefined, false);
      expect(bounds).toEqual(rect);
    });

    test('Parent-relative bounds with children', () => {
      let bounds = sprite.getBounds();
      let rect = new Rectangle(100, 100, 70, 70);

      expect(bounds).toEqual(rect);

      bounds = sprite.getBounds(null);
      expect(bounds).toEqual(rect);

      bounds = sprite.getBounds(undefined);
      expect(bounds).toEqual(rect);
    });

    test('Space-relative bounds without children', () => {
      let bounds = sprite.getBounds(inner, false);
      let rect = new Rectangle(-10, -10, 50, 50);

      expect(bounds).toEqual(rect);
    });

    test('Space-relative bounds with children', () => {
      let bounds = sprite.getBounds(inner, true);
      let rect = new Rectangle(-10, -10, 70, 70);

      expect(bounds).toEqual(rect);
    });

    test('Inner sprite-relative bounds with children', () => {
      let bounds = inner.getBounds(inner, false);
      let rect = new Rectangle(0, 0, 50, 50);

      expect(bounds).toEqual(rect);
    });
  });
});