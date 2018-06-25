import { Rectangle, Vector } from './../../../dist/black-es6-module'

describe('Rectangle', () => {
  test('Should create new empty instance', () => {
    let rect = new Rectangle();
    expect(rect.x).toEqual(0);
    expect(rect.y).toEqual(0);
    expect(rect.width).toEqual(0);
    expect(rect.height).toEqual(0);

    expect(rect.top).toEqual(0);
    expect(rect.right).toEqual(0);
    expect(rect.bottom).toEqual(0);
    expect(rect.left).toEqual(0);

    expect(rect.topLeft.x).toEqual(0);
    expect(rect.topLeft.y).toEqual(0);
    expect(rect.topRight.x).toEqual(0);
    expect(rect.topRight.y).toEqual(0);
    expect(rect.bottomLeft.x).toEqual(0);
    expect(rect.bottomLeft.y).toEqual(0);
    expect(rect.bottomRight.x).toEqual(0);
    expect(rect.bottomRight.y).toEqual(0);
  });

  test('Should create new instance with given values', () => {
    let v = new Rectangle(1, 2, 3, 4);
    expect(v.x).toEqual(1);
    expect(v.y).toEqual(2);
    expect(v.width).toEqual(3);
    expect(v.height).toEqual(4);
  });

  test('Should update existing values', () => {
    let v = new Rectangle();
    v.set(1, 2, 3, 4);

    expect(v.x).toEqual(1);
    expect(v.y).toEqual(2);
    expect(v.width).toEqual(3);
    expect(v.height).toEqual(4);
  });

  test('Should copy values from another instance', () => {
    let r1 = new Rectangle(10, 20, 10, 20);
    let r2 = new Rectangle(0, 0, 0, 0);

    r1.copyFrom(r2);

    expect(r1.x).toEqual(r2.x);
    expect(r1.y).toEqual(r2.y);
    expect(r1.width).toEqual(r2.width);
    expect(r1.height).toEqual(r2.height);
    expect(r1.equals(r2)).toEqual(true);
  });

  test('Should copy current values into destination Rectangle', () => {
    let r1 = new Rectangle(10, 20, 10, 20);
    let r2 = new Rectangle(0, 0, 0, 0);

    r1.copyFrom(r2);

    expect(r1.x).toEqual(r2.x);
    expect(r1.y).toEqual(r2.y);
    expect(r1.width).toEqual(r2.width);
    expect(r1.height).toEqual(r2.height);
  });

  test('Should return leftmost point', () => {
    let r = new Rectangle(11, 22, 33, 44);
    expect(r.left).toEqual(11);
  });

  test('Should update leftmost point with a new value', () => {
    let r = new Rectangle(11, 22, 33, 44);
    r.left = -100;
    expect(r.left).toEqual(-100);
  });

  test('Should return rightmost point', () => {
    let r = new Rectangle(11, 22, 33, 44);
    expect(r.right).toEqual(11 + 33);
  });

  test('Should update rightmost point with a new value', () => {
    let r = new Rectangle(11, 22, 33, 44);
    r.right = 100;
    expect(r.right).toEqual(100);
  });

  test('Should return topmost point', () => {
    let r = new Rectangle(11, 22, 33, 44);
    expect(r.top).toEqual(22);
  });

  test('Should update topmost point with a new value', () => {
    let r = new Rectangle(11, 22, 33, 44);
    r.top = 100;
    expect(r.top).toEqual(100);
  });

  test('Should return bottommost point', () => {
    let r = new Rectangle(11, 22, 33, 44);
    expect(r.bottom).toEqual(22 + 44);
  });

  test('Should update bottommost point with a new value', () => {
    let r = new Rectangle(11, 22, 33, 44);
    r.bottom = 100;
    expect(r.bottom).toEqual(100);
  });

  test('Should return topLeft point', () => {
    let r = new Rectangle(11, 22, 33, 44);
    let p = r.topLeft;
    expect(p.x).toEqual(11);
    expect(p.y).toEqual(22);
  });

  test('Should update topLeft point', () => {
    let r = new Rectangle(11, 22, 33, 44);
    r.topLeft = new Vector(100, 100);
    let p = r.topLeft;
    expect(p.x).toEqual(100);
    expect(p.y).toEqual(100);
  });

  test('Should return topRight point', () => {
    let r = new Rectangle(11, 22, 33, 44);
    let p = r.topRight;
    expect(p.x).toEqual(11 + 33);
    expect(p.y).toEqual(22);
  });

  test('Should update topLeft point', () => {
    let r = new Rectangle(11, 22, 33, 44);
    r.topRight = new Vector(100, 100);
    let p = r.topRight;
    expect(p.x).toEqual(100);
    expect(p.y).toEqual(100);
  });


  test('Should return bottomLeft point', () => {
    let r = new Rectangle(11, 22, 33, 44);
    let p = r.bottomLeft;
    expect(p.x).toEqual(11);
    expect(p.y).toEqual(22 + 44);
  });

  test('Should update bottomLeft point', () => {
    let r = new Rectangle(11, 22, 33, 44);
    r.bottomLeft = new Vector(100, 100);
    let p = r.bottomLeft;
    expect(p.x).toEqual(100);
    expect(p.y).toEqual(100);
  });


  test('Should return bottomRight point', () => {
    let r = new Rectangle(11, 22, 33, 44);
    let p = r.bottomRight;
    expect(p.x).toEqual(11 + 33);
    expect(p.y).toEqual(22 + 44);
  });

  test('Should update bottomRight point', () => {
    let r = new Rectangle(11, 22, 33, 44);
    r.bottomRight = new Vector(100, 100);
    let p = r.bottomRight;
    expect(p.x).toEqual(100);
    expect(p.y).toEqual(100);
  });

  test('Should return size', () => {
    let r = new Rectangle(11, 22, 33, 44);
    let size = r.size();

    expect(size.x).toEqual(33);
    expect(size.y).toEqual(44);
  });

  test('Should return size into passed Vector', () => {
    let size = new Vector();

    let r = new Rectangle(11, 22, 33, 44);
    r.size(size);

    expect(size.x).toEqual(33);
    expect(size.y).toEqual(44);
  });

  test('Should zero existing values', () => {
    let r = new Rectangle(11, 22, 33, 44);
    let size = r.zero();

    expect(size.x).toEqual(0);
    expect(size.y).toEqual(0);
  });

  test('Should compare two Rectangle using default Number.EPSILON value', () => {
    let rectA = new Rectangle(11, 22, 33, 44);
    let rectB = new Rectangle(11, 22, 33, 44 + Number.EPSILON);

    expect(rectA.equals(rectB)).toEqual(true);
  });

  test('Should compare two Rectangle using custom epsilon', () => {
    let rectA = new Rectangle(11, 22, 33, 44);
    let rectB = new Rectangle(11, 22, 33, 44.1);

    expect(rectA.equals(rectB, 0.10001)).toEqual(true);
  });

  test('Should check if point is inside a rectangle', () => {
    let r = new Rectangle(0, 20, 20, 20);

    expect(r.containsXY(0, 20)).toEqual(true);
    expect(r.containsXY(0, 40)).toEqual(true);
  });

  test('Should check if point is outside of a rectangle', () => {
    let r = new Rectangle(0, 20, 20, 20);

    expect(r.containsXY(0, 19)).not.toEqual(true);
    expect(r.containsXY(0, 41)).not.toEqual(true);
  });

  test('Should check if point is inside a rectangle', () => {
    let r = new Rectangle(0, 20, 20, 20);
    let r1 = new Rectangle(5, 25, 10, 10);
    expect(r.contains(r1)).toEqual(true);
  });

  test('Should check if point is outside of a rectangle', () => {
    let r = new Rectangle(0, 20, 20, 20);
    let r2 = new Rectangle(20, 25, 10, 10);
    expect(r.contains(r2)).not.toEqual(true);
  });

  test('Should check if given rectangle intersects this rectangle', () => {
    let r = new Rectangle(0, 20, 20, 20);
    let r1 = new Rectangle(5, 25, 10, 10);

    expect(r.intersects(r1)).toEqual(true);
  });

  test('Should check if given rectangle not intersecting current rectangle', () => {
    let r = new Rectangle(0, 20, 20, 20);
    let r2 = new Rectangle(20, 25, 10, 10);
    expect(r.intersects(r2)).not.toEqual(true);
  });

  test('Should union two rectangles', () => {
    let r = new Rectangle(20, 20, 20, 20);
    let r1 = new Rectangle(50, 50, 50, 50);

    r.union(r1);

    expect(r.x).toEqual(20);
    expect(r.y).toEqual(20);
    expect(r.width).toEqual(80);
    expect(r.height).toEqual(80);
  });

  test('Should return the volume of this rectangle', () => {
    let r = new Rectangle(0, 20, 20, 20);
    expect(r.volume).toEqual(400);
    r.width = 0;
    expect(r.volume).toEqual(0);
    r.width = 1;
    expect(r.volume).toEqual(20);
  });

  test('Should expand this rectangle by given dimmension', () => {
    let r = new Rectangle(20, 20, 20, 20);
    r.expand(10, 10, 10, 10);

    expect(r.x).toEqual(10);
    expect(r.y).toEqual(10);
    expect(r.width).toEqual(30);
    expect(r.height).toEqual(30);
  });

  test('Should inflate this rectangle by given size', () => {
    let r = new Rectangle(20, 20, 20, 20);
    r.inflate(10, 10);

    expect(r.x).toEqual(10);
    expect(r.y).toEqual(10);
    expect(r.width).toEqual(40);
    expect(r.height).toEqual(40);
  });

  test('Should copy current values into new instance', () => {
    let r1 = new Rectangle(10, 20, 10, 10);
    let r2 = r1.clone();

    expect(r1.x).toEqual(r2.x);
    expect(r1.y).toEqual(r2.y);
  });

  test('Should return the perimeter this rectangle', () => {
    let r = new Rectangle(10, 10, 10, 10);
    expect(r.perimeter).toEqual(40);
  });


  test('Should return the center point this rectangle', () => {
    let r = new Rectangle(10, 10, 10, 10);
    let v = r.center();
    expect(v.x).toEqual(15);
    expect(v.y).toEqual(15);
  });

  test('Should return the center point this rectangle into given outVector', () => {
    let v = new Vector();
    let r = new Rectangle(10, 10, 10, 10);
    r.center(v);

    expect(v.x).toEqual(15);
    expect(v.y).toEqual(15);
  });

  test('Should scale this rectangle by given size', () => {
    let r = new Rectangle(11, 12, 13, 14);
    let scaleFactor = 10;

    r.scale(scaleFactor, scaleFactor);

    expect(r.width).toEqual(130);
    expect(r.height).toEqual(140);
  });

  test('Should return True if all components equals to zero', () => {
    let r1 = new Rectangle(0, 0, 0, 0);
    let r2 = new Rectangle(10, 10, 10, 10);

    expect(r1.isEmpty).toEqual(true);
    expect(r2.isEmpty).toEqual(false);
  });

  test('Should return a string representation of this rectangle', () => {
    let r = new Rectangle(10, 20);
    expect(r.toString()).toEqual('Rectangle { x: 10.00, y: 20.00, width: 0.00, height: 0.00 }');
    expect(r.toString(20)).toEqual('Rectangle { x: 10.00000000000000000000, y: 20.00000000000000000000, width: 0.00000000000000000000, height: 0.00000000000000000000 }');
  });
});
