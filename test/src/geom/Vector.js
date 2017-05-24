describe('Vector', function () {
  it('new Vector()', function () {
    var v = new Vector(0, 0);
    assert.isDefined(v.x);
    assert.isDefined(v.x);
    assert.equal(v.x, 0);
    assert.equal(v.y, 0);
  });

  it('new Vector(10, 20)', function () {
    var v = new Vector(10, 20);
    assert.equal(v.x, 10);
    assert.equal(v.y, 20);
  });

  it('copyTo(vector)', function () {
    var v1 = new Vector(10, 20);
    var v2 = new Vector(0, 0);

    v1.copyTo(v2);
    assert.equal(v1.x, v2.x);
    assert.equal(v1.y, v2.y);
  });

  it('copyFrom(vector)', function () {
    var v1 = new Vector(10, 20);
    var v2 = new Vector(0, 0);

    v1.copyTo(v2);
    assert.equal(v1.x, v2.x);
    assert.equal(v1.y, v2.y);
  });

  it('clone()', function () {
    var v1 = new Vector(10, 20);
    var v2 = v1.clone();

    assert.equal(v1.x, v2.x);
    assert.equal(v1.y, v2.y);
    assert.notEqual(v1, v2);
  });

  it('equals(vector)', function () {
    var v1 = new Vector(10, 0.1 + 0.2);
    var v2 = new Vector(10, 0.3);
    assert.isTrue(v1.equals(v2));
    assert.isFalse(v1.equals(v2, 0.00000000000000001));
    assert.isTrue(v1.equals(v2, 0.0000000000000001));
  });

  it('add(vector)', function () {
    var v1 = new Vector(20, 20);
    var v2 = new Vector(10, 10);
    v2.add(v1);

    assert.equal(30, v2.x);
    assert.equal(30, v2.y);
  });

  it('substract(vector)', function () {
    var v1 = new Vector(20, 20);
    var v2 = new Vector(10, 10);
    v1.subtract(v2);

    assert.equal(10, v2.x);
    assert.equal(10, v2.y);
  });

  it('distance(vector)', function () {
    var v1 = new Vector(20, 10);
    var v2 = new Vector(10, 10);
    assert.equal(v2.distance(v1), 10);
  });

  it('multiply(vector)', function () {
    var v1 = new Vector(10, 10);
    var v2 = new Vector(10, 10);
    v2.multiply(v1);

    assert.equal(v2.x, 100);
    assert.equal(v2.y, 100);
  });

  it('multiplyScalar(10)', function () {
    var v = new Vector(10, 10);
    v.multiplyScalar(10);

    assert.equal(v.x, 100);
    assert.equal(v.y, 100);
  });

  it('dot(vector)', function () {
    var v1 = new Vector(-1, 0);
    var v2 = new Vector(1, 1);

    assert.equal(v1.dot(v2), -1);
  });

  it('set(10, 20)', function () {
    var a = new Vector();
    a.set(10, 20);

    assert.equal(a.x, 10);
    assert.equal(a.y, 20);
  });

  it('length()', function () {
    var v = new Vector(10, 20);
    assert.equal(v.length(), 22.360679774997898);
  });

  it('clamp()', function () {
    var v = new Vector(-10, 20);
    v.clamp(0, 10);

    assert.equal(v.x, 0);
    assert.equal(v.y, 10);
  });

  it('lengthSqr()', function () {
    var v = new Vector(10, 20);
    assert.equal(v.lengthSqr(), 500);
  });

  it('lerp(vector, t)', function () {
    var v1 = new Vector(10, 20);
    var v2 = new Vector(100, 100);

    v1.lerp(v2, 0.5);
    assert.equal(v1.x, 55);
    assert.equal(v1.y, 60);
  });

  it('toString(digit)', function () {
    var v = new Vector(10, 20);
    assert.isString(v.toString());
    assert.isString(v.toString(20));

    assert.equal(v.toString(), 'Vector: { x: 10.00, y: 20.00 }');
    assert.equal(v.toString(20), 'Vector: { x: 10.00000000000000000000, y: 20.00000000000000000000 }');
  });

  it('isEmpty()', function () {
    var v1 = new Vector(10, 20);
    var v2 = new Vector(0, 0);

    assert.isFalse(v1.isEmpty());
    assert.isTrue(v2.isEmpty());
  });

  it('fromAngle(angle)', function () {
    var v1 = Vector.fromAngle(0);
    var v2 = Vector.fromAngle(90);

    assert.equal(v1.x, 1);
    assert.equal(v1.y, 0);

    assert.equal(v2.x, -0.4480736161291702);
    assert.equal(v2.y, 0.8939966636005579);
  });

  it('should rotate vector', function () {
    var v = new Vector(1, 0);

    v.setRotation(Math.PI);

    assert.equal(v.x, -1);
  });

  it('should rotate vector around point', function () {
    var v = new Vector(2, 1);
    var point = new Vector(1, 1);

    v.setRotationFrom(point, Math.PI / 2);

    assert.equal(v.x, 1);
    assert.equal(v.y, 2);
  });

  it('should normalize vector', function () {
    var v = new Vector(2, 2);
    v.normalize();

    assert.equal(v.x, 0.7071067811865475);
    assert.equal(v.y, 0.7071067811865475);
  });

  it('should calculate theta', function () {
    var v1 = new Vector(2, 2);
    var v2 = new Vector(2, 0);

    var theta = v1.theta(v2);

    assert.equal(theta, 0.7853981633974484);
  });

  it('should rotate vector to normal', function () {
    var v = new Vector(2, 2);
    v.perp();

    assert.equal(v.x, 2);
    assert.equal(v.y, -2);
  });
});
