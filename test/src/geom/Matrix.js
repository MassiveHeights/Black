describe('Matrix', function () {
  it('Should initialize new identity Matrix', function () {
    var m = new Matrix();
    var v = m.value;

    assert.equal(v[0] === 1, true);
    assert.equal(v[1] === 0, true);
    assert.equal(v[2] === 0, true);
    assert.equal(v[3] === 1, true);
    assert.equal(v[4] === 0, true);
    assert.equal(v[5] === 0, true);
  });

  it('set(a, b, c, d, tx, ty)', function () {
    var m = new Matrix(1, 1, 1, 1, 1, 1);
    var v = m.value;

    assert.equal(v[0], 1);
    assert.equal(v[1], 1);
    assert.equal(v[2], 1);
    assert.equal(v[3], 1);
    assert.equal(v[4], 1);
    assert.equal(v[5], 1);
  });

  it('translate(dx, dy)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    m.translate(10, 10);
    var v = m.value;

    assert.equal(v[0], 0);
    assert.equal(v[1], 1);
    assert.equal(v[2], 2);
    assert.equal(v[3], 3);
    assert.equal(v[4], 24);
    assert.equal(v[5], 45);
  });

  it('setRotation(theta, scale?)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    m.setRotation(0.1);
    var v = m.value;

    assert.equal(v[0], 0.9950041770935059);
    assert.equal(v[1], -0.0998334139585495);
    assert.equal(v[2], 0.0998334139585495);
    assert.equal(v[3], 0.9950041770935059);
    assert.equal(v[4], 4);
    assert.equal(v[5], 5);

    m.setRotation(0, 2);
    v = m.value;

    assert.equal(v[0], 2);
    assert.equal(v[1], 0);
    assert.equal(v[2], 0);
    assert.equal(v[3], 2);
    assert.equal(v[4], 4);
    assert.equal(v[5], 5);
  });

  it('identity()', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    m.identity();
    var v = m.value;

    assert.equal(v[0], 1);
    assert.equal(v[1], 0);
    assert.equal(v[2], 0);
    assert.equal(v[3], 1);
    assert.equal(v[4], 0);
    assert.equal(v[5], 0);
  });

  it('prepend(matrix)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var m1 = new Matrix(0, 1, 2, 3, 4, 5);
    m.prepend(m1);
    var v = m.value;

    assert.equal(v[0], 2);
    assert.equal(v[1], 3);
    assert.equal(v[2], 6);
    assert.equal(v[3], 11);
    assert.equal(v[4], 14);
    assert.equal(v[5], 24);
  });

  it('append(matrix)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var m1 = new Matrix(0, 1, 2, 3, 4, 5);
    m.append(m1);
    var v = m.value;

    assert.equal(v[0], 2);
    assert.equal(v[1], 3);
    assert.equal(v[2], 6);
    assert.equal(v[3], 11);
    assert.equal(v[4], 14);
    assert.equal(v[5], 24);
  });

  it('transformXY(x, y, vector?)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var m2 = new Matrix(0, 1, 2, 3, 4, 5);

    let v = m.transformXY(100, 100);
    let vector = new Vector();
    m2.transformXY(100, 100, vector);

    assert.equal(v.x, 204);
    assert.equal(v.y, 405);
    assert.equal(vector.x, 204);
    assert.equal(vector.y, 405);
  });

  it('transformVector(vector, outVector?)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var v = new Vector(100, 200);
    var ov = new Vector();

    let o1 = m.transformVector(v);
    m.transformVector(v, ov);

    assert.equal(o1.x, ov.x);
    assert.equal(o1.y, ov.y);
    assert.equal(o1.x, 404);
    assert.equal(o1.y, 705);
  });

  it('transformRect(rect, outRect?)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var r = new Rectangle(100, 100, 200, 200);
    var ov = new Rectangle();

    var o1 = m.transformRect(r);
    m.transformRect(r, ov);

    assert.equal(o1.x, ov.x);
    assert.equal(o1.y, ov.y);
    assert.equal(o1.width, ov.width);
    assert.equal(o1.height, ov.height);
    assert.equal(o1.x, 204);
    assert.equal(o1.y, 405);
    assert.equal(o1.width, 400);
    assert.equal(o1.height, 800);
  });

  it('invert()', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    m.invert();
    var v = m.value;
    assert.equal(v[0], -1.5);
    assert.equal(v[1], 0.5);
    assert.equal(v[2], 1);
    assert.equal(v[3], 0);
    assert.equal(v[4], 1);
    assert.equal(v[5], -2);
  });


  it('rotate(angle)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    m.rotate(1);
    var v = m.value;

    assert.equal(v[0], -0.8414709568023682);
    assert.equal(v[1], 0.5403022766113281);
    assert.equal(v[2], -1.4438083171844482);
    assert.equal(v[3], 3.3038489818573);
    assert.equal(v[4], -2.0461456775665283);
    assert.equal(v[5], 6.0673956871032715);
  });

  it('clone()', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var m2 = m.clone();
    var v = m2.value;

    assert.equal(v[0], 0);
    assert.equal(v[1], 1);
    assert.equal(v[2], 2);
    assert.equal(v[3], 3);
    assert.equal(v[4], 4);
    assert.equal(v[5], 5);
    assert.notEqual(m, m2);
  });

  it('copyTo(matrix)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var m2 = new Matrix();
    m.copyTo(m2);
    var v = m2.value;

    assert.equal(v[0], 0);
    assert.equal(v[1], 1);
    assert.equal(v[2], 2);
    assert.equal(v[3], 3);
    assert.equal(v[4], 4);
    assert.equal(v[5], 5);
    assert.notEqual(m, m2);
  });

  it('copyFrom(matrix)', function () {
    var m = new Matrix(0, 1, 2, 3, 4, 5);
    var m2 = new Matrix();
    m2.copyFrom(m);
    var v = m2.value;

    assert.equal(v[0], 0);
    assert.equal(v[1], 1);
    assert.equal(v[2], 2);
    assert.equal(v[3], 3);
    assert.equal(v[4], 4);
    assert.equal(v[5], 5);
    assert.notEqual(m, m2);
  });

  it('equals(matrix, epsilon?)', function () {
    var m = new Matrix(0.1 + 0.2, 1, 2, 3, 4, 5);
    var m2 = new Matrix(0.3, 1, 2, 3, 4, 5);
    var m3 = new Matrix(0.31, 1, 2, 3, 4, 5);

    assert.isTrue(m.equals(m2));
    assert.isTrue(m.equals(m2));
    assert.isFalse(m.equals(m3));
    assert.isTrue(m.equals(m3, 0.01));
  });

  it('toString(digits?)', function () {
    var m = new Matrix();
    assert.isString(m.toString());
    assert.isString(m.toString(20));
  });

  it('value', function () {
    var m = new Matrix();
    assert.instanceOf(m.value, Float32Array);
    assert.lengthOf(m.value, 6);
  });
});
