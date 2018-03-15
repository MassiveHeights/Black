import { GameObject, Vector, Matrix, DirtyFlag } from './../../dist/black-es6-module'

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
});