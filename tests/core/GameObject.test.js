import { GameObject, Sprite, Vector, Matrix, DirtyFlag, Rectangle, Texture } from './../../dist/black-es6-module'
const RECT_50X50_B64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFxJREFUeNrs2UENwCAUREHaoIM7EmoBO+hADlq4o4TWxU86L9n73Pd6Zkvxyu96qaFMY687hQwLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsL61+s708ce0VjHQEGALvnBuYLRdofAAAAAElFTkSuQmCC';

function getTexture(){
  let img = new Image();
  img.src = RECT_50X50_B64;

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
    expect(go.snapToPixels).toEqual(false);
    expect(go.localTransformation.equals(identity)).toEqual(true);
    expect(go.worldTransformation.equals(identity)).toEqual(true);
  });

  // describe('Anchors and Pivots', () => {
  //   let stage = new GameObject();

  //   let sprite = new Sprite(getTexture());
  //   sprite.name = 'square';
  //   sprite.touchable = true;
  //   sprite.x = 100;
  //   sprite.y = 100;
  //   stage.addChild(sprite);


  //   expect(sprite.width).toEqual(50);
  // });

  describe('Object bounds', () => {
    let stage = new GameObject();

    let sprite = new GameObject();
    sprite.name = 'square';
    sprite.touchable = true;
    sprite.x = 100;
    sprite.y = 100;
    stage.addChild(sprite);

    let inner = new GameObject();
    inner.name = 'inner';
    inner.x = 10;
    inner.y = 10;
    inner.touchable = true;
    sprite.addChild(inner);

    let inner2 = new GameObject();
    inner2.name = 'inner';
    inner2.x = 10;
    inner2.y = 10;
    inner2.touchable = true;
    inner.addChild(inner2);


    sprite.onGetLocalBounds = inner.onGetLocalBounds = inner2.onGetLocalBounds = (outRect) => {
      outRect = outRect || new Rectangle();
      return outRect.set(0, 0, 50, 50);
    }

    test('local bounds without children', () => {
      let bounds = sprite.localBounds;
      let rect = new Rectangle(0, 0, 50, 50);

      expect(bounds.equals(rect)).toEqual(true);
    });

    test('get bounds without children', () => {
      let bounds = sprite.getBounds(sprite, false);
      let rect = new Rectangle(0, 0, 50, 50);

      expect(bounds.equals(rect)).toEqual(true);
    });

    test('get bounds with children', () => {
      let bounds = sprite.getBounds(sprite, true);
      let rect = new Rectangle(0, 0, 70, 70);

      expect(bounds.equals(rect)).toEqual(true);
    });

    test('Parent-relative bounds without children', () => {
      let bounds = sprite.getBounds(null, false);
      let rect = new Rectangle(100, 100, 50, 50);

      expect(bounds.equals(rect)).toEqual(true);

      bounds = sprite.getBounds(undefined, false);
      expect(bounds.equals(rect)).toEqual(true);
    });

    test('Parent-relative bounds with children', () => {
      let bounds = sprite.getBounds();
      let rect = new Rectangle(100, 100, 70, 70);

      expect(bounds.equals(rect)).toEqual(true);

      bounds = sprite.getBounds(null);
      expect(bounds.equals(rect)).toEqual(true);

      bounds = sprite.getBounds(undefined);
      expect(bounds.equals(rect)).toEqual(true);
    });

    test('Space-relative bounds without children', () => {
      let bounds = sprite.getBounds(inner, false);
      let rect = new Rectangle(-10, -10, 50, 50);

      expect(bounds.equals(rect)).toEqual(true);
    });

    test('Space-relative bounds with children', () => {
      let bounds = sprite.getBounds(inner, true);
      let rect = new Rectangle(-10, -10, 70, 70);

      expect(bounds.equals(rect)).toEqual(true);
    });


    test('Inner sprite-relative bounds with children', () => {
      let bounds = inner.getBounds(inner, false);
      let rect = new Rectangle(0, 0, 50, 50);

      expect(bounds.equals(rect)).toEqual(true);
    });
  });
});