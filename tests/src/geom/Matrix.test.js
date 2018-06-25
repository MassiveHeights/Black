import { Matrix, Rectangle, Vector } from './../../../dist/black-es6-module'

describe('Matrix', function () {
  it('Should initialize new identity Matrix', function () {
    var m = new Matrix();
    var v = m.value;

    expect(v[0] === 1).toBe(true);
    expect(v[1] === 0).toBe(true);
    expect(v[2] === 0).toBe(true);
    expect(v[3] === 1).toBe(true);
    expect(v[4] === 0).toBe(true);
    expect(v[5] === 0).toBe(true);
  });

  it('set(a, b, c, d, tx, ty)', function () {
    var m = new Matrix(1, 1, 1, 1, 1, 1);
    var v = m.value;

    expect(v[0]).toBe(1);
    expect(v[1]).toBe(1);
    expect(v[2]).toBe(1);
    expect(v[3]).toBe(1);
    expect(v[4]).toBe(1);
    expect(v[5]).toBe(1);
  });

  it('translate(dx, dy)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    m.translate(10, 10);
    var v = m.value;

    expect(v[0]).toBe(0);
    expect(v[1]).toBe(1);
    expect(v[2]).toBe(2);
    expect(v[3]).toBe(3);
    expect(v[4]).toBe(24);
    expect(v[5]).toBe(45);
  });

  it('setRotation(theta, scale?)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    m.setRotation(0.1);
    var v = m.value;

    expect(v[0]).toBeCloseTo(0.9950041770935059);
    expect(v[1]).toBeCloseTo(-0.0998334139585495);
    expect(v[2]).toBeCloseTo(0.0998334139585495);
    expect(v[3]).toBeCloseTo(0.9950041770935059);
    expect(v[4]).toBeCloseTo(4);
    expect(v[5]).toBeCloseTo(5);

    m.setRotation(0, 2);
    v = m.value;

    expect(v[0]).toBeCloseTo(2);
    expect(v[1]).toBeCloseTo(0);
    expect(v[2]).toBeCloseTo(0);
    expect(v[3]).toBeCloseTo(2);
    expect(v[4]).toBeCloseTo(4);
    expect(v[5]).toBeCloseTo(5);
  });

  it('identity()', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    m.identity();
    var v = m.value;

    expect(v[0]).toBe(1);
    expect(v[1]).toBe(0);
    expect(v[2]).toBe(0);
    expect(v[3]).toBe(1);
    expect(v[4]).toBe(0);
    expect(v[5]).toBe(0);
  });

  it('prepend(matrix)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var m1 = new Matrix(0, 1, 2, 3, 4, 5);
    m.prepend(m1);
    var v = m.value;

    expect(v[0]).toBe(2);
    expect(v[1]).toBe(3);
    expect(v[2]).toBe(6);
    expect(v[3]).toBe(11);
    expect(v[4]).toBe(14);
    expect(v[5]).toBe(24);
  });

  it('append(matrix)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var m1 = new Matrix(0, 1, 2, 3, 4, 5);
    m.append(m1);
    var v = m.value;

    expect(v[0]).toBe(2);
    expect(v[1]).toBe(3);
    expect(v[2]).toBe(6);
    expect(v[3]).toBe(11);
    expect(v[4]).toBe(14);
    expect(v[5]).toBe(24);
  });

  it('transformXY(x, y, vector?)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var m2 = new Matrix(0, 1, 2, 3, 4, 5);

    let v = m.transformXY(100, 100);
    let vector = new Vector();
    m2.transformXY(100, 100, vector);

    expect(v.x).toBe(204);
    expect(v.y).toBe(405);
    expect(vector.x).toBe(204);
    expect(vector.y).toBe(405);
  });

  it('transformVector(vector, outVector?)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var v = new Vector(100, 200);
    var ov = new Vector();

    let o1 = m.transformVector(v);
    m.transformVector(v, ov);

    expect(o1.x).toBe(ov.x);
    expect(o1.y).toBe(ov.y);
    expect(o1.x).toBe(404);
    expect(o1.y).toBe(705);
  });

  it('transformRect(rect, outRect?)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var r = new Rectangle(100, 100, 200, 200);
    var ov = new Rectangle();

    var o1 = m.transformRect(r);
    m.transformRect(r, ov);

    expect(o1.x).toBe(ov.x);
    expect(o1.y).toBe(ov.y);
    expect(o1.width).toBe(ov.width);
    expect(o1.height).toBe(ov.height);
    expect(o1.x).toBe(204);
    expect(o1.y).toBe(405);
    expect(o1.width).toBe(400);
    expect(o1.height).toBe(800);
  });

  it('invert()', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    m.invert();
    var v = m.value;
    expect(v[0]).toBeCloseTo(-1.5);
    expect(v[1]).toBeCloseTo(0.5);
    expect(v[2]).toBeCloseTo(1);
    expect(v[3]).toBeCloseTo(0);
    expect(v[4]).toBeCloseTo(1);
    expect(v[5]).toBeCloseTo(-2);
  });


  it('rotate(angle)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    m.rotate(1);
    var v = m.value;

    expect(v[0]).toBeCloseTo(-0.8414709568023682);
    expect(v[1]).toBeCloseTo(0.5403022766113281);
    expect(v[2]).toBeCloseTo(-1.4438083171844482);
    expect(v[3]).toBeCloseTo(3.3038489818573);
    expect(v[4]).toBeCloseTo(-2.0461456775665283);
    expect(v[5]).toBeCloseTo(6.0673956871032715);
  });

  it('clone()', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var m2 = m.clone();
    var v = m2.value;

    expect(v[0]).toBe(0);
    expect(v[1]).toBe(1);
    expect(v[2]).toBe(2);
    expect(v[3]).toBe(3);
    expect(v[4]).toBe(4);
    expect(v[5]).toBe(5);
    expect(m).not.toBe(m2);
  });

  it('copyTo(matrix)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var m2 = new Matrix();
    m.copyTo(m2);
    var v = m2.value;

    expect(v[0]).toBe(0);
    expect(v[1]).toBe(1);
    expect(v[2]).toBe(2);
    expect(v[3]).toBe(3);
    expect(v[4]).toBe(4);
    expect(v[5]).toBe(5);
    expect(m).not.toBe(m2);
  });

  it('copyFrom(matrix)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var m2 = new Matrix();
    m2.copyFrom(m);
    var v = m2.value;

    expect(v[0]).toBe(0);
    expect(v[1]).toBe(1);
    expect(v[2]).toBe(2);
    expect(v[3]).toBe(3);
    expect(v[4]).toBe(4);
    expect(v[5]).toBe(5);
    expect(m).not.toBe(m2);
  });

  it('equals(matrix, epsilon?)', function () {
    var m = new Matrix(0.1 + 0.2, 1, 2, 3, 4, 5);
    var m2 = new Matrix(0.3, 1, 2, 3, 4, 5);
    var m3 = new Matrix(0.31, 1, 2, 3, 4, 5);

    expect(m.equals(m2)).toBe(true);
    expect(m.equals(m2)).toBe(true);
    expect(m.equals(m3)).not.toBe(true);
    expect(m.equals(m3, 0.01)).toBe(true);
  });

  it('value', function () {
    var m = new Matrix();
    expect(m.value).toBeInstanceOf(Float32Array);
    expect(m.value).toHaveLength(6);
  });
});
