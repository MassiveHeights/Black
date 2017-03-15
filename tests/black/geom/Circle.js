describe('Circle', function () {
  it('Should initialize new empty Circle', function () {
    var c = new Circle();
    assert.equal(c.x, 0);
    assert.equal(c.y, 0);
    assert.equal(c.r, 1);
  });

  it('should set properties to circle', function () {
    var c = new Circle();
    c.set(1, 1, 2);

    assert.equal(c.x, 1);
    assert.equal(c.y, 1);
    assert.equal(c.r, 2);
  });

  it('should clone circle', function () {
    var c = new Circle(3, 3, 3);
    var clone = c.clone();

    assert.equal(c.x, clone.x);
    assert.equal(c.y, clone.y);
    assert.equal(c.r, clone.r);
    assert.notEqual(c, clone);
  });

  it('should copy properties to another circle', function () {
    var c1 = new Circle(3, 3, 3);
    var c2 = new Circle(2, 2, 2);

    c1.copyTo(c2);

    assert.equal(c2.x, 3);
    assert.equal(c2.y, 3);
    assert.equal(c2.r, 3);
  });

  it('should copy properties from another circle', function () {
    var c1 = new Circle(3, 3, 3);
    var c2 = new Circle(2, 2, 2);

    c1.copyFrom(c2);

    assert.equal(c1.x, 2);
    assert.equal(c1.y, 2);
    assert.equal(c1.r, 2);
  });

  it('should represent object s string', function () {
    var c = new Circle(2.333, 1.333, 1.5556);
    var s = c.toString();

    assert.equal(s, 'Circle { x: 2.33, y: 1.33, r: 1.56 }');
  });

  it('should be equals', function () {
    var c1 = new Circle(2, 2, 2);
    var c2 = new Circle(2.1, 2, 2);

    assert.isOk(c1.equals(c2, 0.11));
  });

  it('should not be equals', function () {
    var c1 = new Circle(2, 2, 2);
    var c2 = new Circle(2.1, 2, 2);

    assert.isNotOk(c1.equals(c2));
  });

  it('should contain point', function () {
    var c = new Circle(1, 1, 1);
    var p = new Vector(0, 1);

    assert.isOk(c.contains(p));
  });

  it('should not contain point', function () {
    var c = new Circle(1, 1, 1);
    var p = new Vector(0, 0.99);

    assert.isNotOk(c.contains(p));
  });

  it('should contain XY point', function () {
    var c = new Circle(1, 1, 1);
    assert.isOk(c.containsXY(0, 1));
  });

  it('should not contain XY point', function () {
    var c = new Circle(1, 1, 1);
    assert.isNotOk(c.containsXY(0, 0.99));
  });

  it('should intersect another circle', function () {
    var c1 = new Circle(1, 1, 1);
    var c2 = new Circle(3, 1, 1);

    assert.isOk(c1.intersects(c2));
  });

  it('should not intersect another circle', function () {
    var c1 = new Circle(1, 1, 1);
    var c2 = new Circle(3, 1, 0.99);

    assert.isNotOk(c1.intersects(c2));
  });
});
