describe('Rectangle', function () {
  it('Should initialize new empty Rectangle', function () {
    var v = new Rectangle();
    assert.equal(v.x, 0);
    assert.equal(v.y, 0);
    assert.equal(v.width, 0);
    assert.equal(v.height, 0);
  });

  it('new Not empty Rectangle', function () {
    var v = new Rectangle(1, 2, 3, 4);
    assert.equal(v.x, 1);
    assert.equal(v.y, 2);
    assert.equal(v.width, 3);
    assert.equal(v.height, 4);
  });

  it('set(x, y, w, h)', function () {
    var v = new Rectangle(0, 0, 0, 0);
    var res = v.set(1, 2, 3, 4);
    assert.isDefined(res);
    assert.equal(v.x, 1);
    assert.equal(v.y, 2);
    assert.equal(v.width, 3);
    assert.equal(v.height, 4);
  });

  it('copyFrom(vector)', function () {
    var r1 = new Rectangle(10, 20, 10, 20);
    var r2 = new Rectangle(0, 0, 0, 0);

    r1.copyFrom(r2);
    assert.equal(r1.x, r2.x);
    assert.equal(r1.y, r2.y);
    assert.equal(r1.width, r2.width);
    assert.equal(r1.height, r2.height);
    assert.notEqual(r1, r2);
  });

  it('copyTo(vector)', function () {
    var r1 = new Rectangle(10, 20, 10, 20);
    var r2 = new Rectangle(0, 0, 0, 0);

    r1.copyFrom(r2);
    assert.equal(r1.x, r2.x);
    assert.equal(r1.y, r2.y);
    assert.equal(r1.width, r2.width);
    assert.equal(r1.height, r2.height);
    assert.notEqual(r1, r2);
  });

  it('left - return rectangle x', function () {
    var r = new Rectangle(10, 20, 20, 20);
    assert.equal(r.left, 10);
  });

  it('right - return rectangle x + width', function () {
    var r = new Rectangle(10, 20, 20, 20);
    assert.equal(r.right, 30);
  });

  it('top - return rectangle y', function () {
    var r = new Rectangle(10, 20, 20, 20);
    assert.equal(r.top, 20);
  });

  it('bottom - return rectangle y + height', function () {
    var r = new Rectangle(10, 20, 20, 20);
    assert.equal(r.bottom, 40);
  });

  it('topLeft return topLeft point', function () {
    var r = new Rectangle(10, 20, 20, 20);
    var p = r.topLeft;
    assert.equal(p.x, 10);
    assert.equal(p.y, 20);
  });

  it('bottomRight return bottomRight point', function () {
    var r = new Rectangle(10, 20, 20, 20);
    var p = r.bottomRight;
    assert.equal(p.x, 30);
    assert.equal(p.y, 40);
  });

  it('bottomRight return bottomRight point', function () {
    var r = new Rectangle(10, 20, 20, 20);
    var p = r.bottomRight;
    assert.equal(p.x, 30);
    assert.equal(p.y, 40);
  });

  it('size(outVector?) set outVector rectangle size', function () {
    var r = new Rectangle(10, 20, 20, 20);
    var v = new Vector();
    var a = r.size();
    var b = r.size(v);

    assert.equal(a.y, 20);
    assert.equal(a.x, 20);

    assert.equal(b.y, 20);
    assert.equal(b.x, 20);
  });

  it('zero set x, y, width and height as - zero', function () {
    var r = new Rectangle(10, 20, 20, 20);
    r.zero();

    assert.equal(r.y, 0);
    assert.equal(r.x, 0);
    assert.equal(r.width, 0);
    assert.equal(r.height, 0);
  });

  it('equals(rect, epsilon?)', function () {
    var r = new Rectangle(0.1 + 0.2, 20, 20, 20);
    var r2 = new Rectangle(0.3, 20, 20, 20);

    assert.isTrue(r.equals(r2));
    assert.isFalse(r.equals(r2, 0.00000000000000001));
    assert.isTrue(r.equals(r2, 0.0000000000000001));
  });

  it('containsXY(x, y)', function () {
    var r = new Rectangle(0, 20, 20, 20);

    assert.isFalse(r.containsXY(0, 19));
    assert.isFalse(r.containsXY(0, 41));

    assert.isTrue(r.containsXY(0, 20));
    assert.isTrue(r.containsXY(0, 40));
  });

  it('contains(rect)', function () {
    var r = new Rectangle(0, 20, 20, 20);
    var r1 = new Rectangle(5, 25, 10, 10);
    var r2 = new Rectangle(20, 25, 10, 10);

    assert.isTrue(r.contains(r1));
    assert.isFalse(r.contains(r2));
  });

  it('intersects(rect)', function () {
    var r = new Rectangle(0, 20, 20, 20);
    var r1 = new Rectangle(5, 25, 10, 10);
    var r2 = new Rectangle(20, 25, 10, 10);

    assert.isTrue(r.intersects(r1));
    assert.isFalse(r.intersects(r2));
  });

  it('union(rect)', function () {
    var r = new Rectangle(0, 20, 20, 20);
    var r1 = new Rectangle(5, 25, 10, 10);
    var r2 = new Rectangle(20, 25, 10, 10);

    assert.equal(r.union(r1).x, 0);
    assert.equal(r.union(r2).x, 0);

    assert.equal(r.union(r1).y, 20);
    assert.equal(r.union(r2).y, 20);

    assert.equal(r.union(r1).width, 20);
    assert.equal(r.union(r2).width, 30);

    assert.equal(r.union(r1).height, 20);
    assert.equal(r.union(r2).height, 20);
  });

  it('volume return width*height', function () {
    var r = new Rectangle(0, 20, 20, 20);
    assert.equal(r.volume, 400);
    r.width = 0;
    assert.equal(r.volume, 0);
    r.width = 1;
    assert.equal(r.volume, 20);
  });

  it('expand(x, y, width, height)', function () {
    var r = new Rectangle(20, 20, 20, 20);
    r.expand(10, 10, 10, 10);

    assert.equal(r.x, 10);
    assert.equal(r.y, 10);
    assert.equal(r.width, 30);
    assert.equal(r.height, 30);
  });

  it('inflate(x, y)', function () {
    var r = new Rectangle(20, 20, 20, 20);
    r.inflate(10, 10);

    assert.equal(r.x, 10);
    assert.equal(r.y, 10);
    assert.equal(r.width, 40);
    assert.equal(r.height, 40);
  });

  it('clone()', function () {
    var r1 = new Rectangle(10, 20, 10, 10);
    var r2 = r1.clone();

    assert.equal(r1.x, r2.x);
    assert.equal(r1.y, r2.y);
    assert.notEqual(r1, r2);
  });

  it('toString(digits?)', function () {
    var r = new Rectangle(10, 20);
    assert.isString(r.toString());
    assert.isString(r.toString(20));

    assert.equal(r.toString(), 'Rectangle { x: 10.00, y: 20.00, width: 0.00, height: 0.00 }');
    assert.equal(r.toString(20), 'Rectangle { x: 10.00000000000000000000, y: 20.00000000000000000000, width: 0.00000000000000000000, height: 0.00000000000000000000 }');
  });

  it('perimeter()', function () {
    var r = new Rectangle(10, 10, 10, 10);
    assert.equal(r.perimeter, 40);
  });

  it('center(outVector?)', function () {
    var r = new Rectangle(10, 10, 10, 10);
    var v = r.center();
    assert.equal(v.x, 15);
    assert.equal(v.y, 15);
  });

  it('scale(x, y)', function () {
    var r = new Rectangle(10, 10, 10, 10);
    r.scale(10, 10);

    assert.equal(r.width, 100);
    assert.equal(r.height, 100);
  });

  it('isEmpty()', function () {
    var r1 = new Rectangle(0, 0, 0, 0);
    var r2 = new Rectangle(10, 10, 10, 10);

    assert.isOk(r1.isEmpty());
    assert.isNotOk(r2.isEmpty());
  });
});
