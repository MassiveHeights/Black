describe('Line', function () {
  it('should initialize new empty Line', function () {
    var l = new Line(new Vector(), new Vector());
    assert.equal(l.start.x, 0);
    assert.equal(l.end.y, 0);
    assert.equal(l.start.x, 0);
    assert.equal(l.end.y, 0);
  });

  it('should intersect line', function () {
    var l1 = new Line(new Vector(0, 0), new Vector(1, 1));
    var l2 = new Line(new Vector(0.9, 1), new Vector(2, 0));

    assert.isOk(l1.intersects(l2));
  });

  it('should not intersect line', function () {
    var l1 = new Line(new Vector(0, 0), new Vector(1, 1));
    var l2 = new Line(new Vector(1, 1), new Vector(2, 0));

    assert.isNotOk(l1.intersects(l2));
  });

  it('should intersect circle', function () {
    var l = new Line(new Vector(0, 0), new Vector(1, 1));
    var c = new Circle(2, 1, 1);

    assert.isOk(l.intersectsCircle(c));
  });

  it('should not intersect circle', function () {
    var l = new Line(new Vector(0, 0), new Vector(1, 1));
    var c = new Circle(2.01, 2, 1);

    assert.isNotOk(l.intersectsCircle(c));
  });

  it('should clone line', function () {
    var l1 = new Line(new Vector(1, 1), new Vector(2, 2));
    var l2 = l1.clone();

    expect(l1).to.eql(l2);
    expect(l1).to.not.equal(l2);
  });

  it('should set new line properties', function () {
    var l = new Line(new Vector(1, 1), new Vector(2, 2));
    l.set(new Vector(3, 3), new Vector(4, 5));

    assert.equal(l.start.x, 3);
    assert.equal(l.start.y, 3);
    assert.equal(l.end.x, 4);
    assert.equal(l.end.y, 5);
  });

  it('should copy line properties to another', function () {
    var l1 = new Line(new Vector(1, 1), new Vector(2, 2));
    var l2 = new Line(new Vector(), new Vector());

    expect(l1).to.eql(l1.copyTo(l2));
    expect(l1).to.not.equal(l2);
  });

  it('should copy another line properties to this', function () {
    var l1 = new Line(new Vector(1, 1), new Vector(2, 2));
    var l2 = new Line(new Vector(3, 3), new Vector(4, 4));

    expect(l2).to.eql(l1.copyFrom(l2));
    expect(l2).to.not.equal(l1);
  });

  it('should represent line object as string', function () {
    var l1 = new Line(new Vector(1.55555, 1), new Vector(2, 2));

    assert.equal(l1.toString(3), 'Line { start: Vector: { x: 1.556, y: 1.000 }, end: Vector: { x: 2.000, y: 2.000 } }');
  });

  it('should be equals', function () {
    var l1 = new Line(new Vector(1, 1), new Vector(2, 2));
    var l2 = new Line(new Vector(1, 1), new Vector(2, 2.09));

    assert.isOk(l1.equals(l2, 0.1));
  });

  it('should not be equals', function () {
    var l1 = new Line(new Vector(1, 1), new Vector(2, 2));
    var l2 = new Line(new Vector(1, 1), new Vector(2, 2.1));

    assert.isNotOk(l1.equals(l2));
  });

  it('should contain point XY', function () {
    var l = new Line(new Vector(1, 1), new Vector(2, 2));

    assert.isOk(l.containsXY(1.5, 1.5));
  });

  it('should not contain point XY', function () {
    var l = new Line(new Vector(1, 1), new Vector(2, 2));

    assert.isNotOk(l.containsXY(1.51, 1.5));
  });

  it('should contain point', function () {
    var l = new Line(new Vector(1, 1), new Vector(2, 2));

    assert.isOk(l.contains(new Vector(1.5, 1.5)));
  });

  it('should not contain point', function () {
    var l = new Line(new Vector(1, 1), new Vector(2, 2));

    assert.isNotOk(l.contains(new Vector(1.51, 1.5)));
  });

  it('should reverse line', function () {
    var l = new Line(new Vector(1, 1), new Vector(2, 2));
    var clone = l.clone();
    var start = clone.start;
    var end = clone.end;
    l.reverse();
    expect(start).to.eql(l.end);
    expect(end).to.eql(l.start);
    expect(start).to.not.equal(l.end);
    expect(end).to.not.equal(l.start);
  });

  it('should normalize line', function () {
    var l = new Line(new Vector(1, 1), new Vector(1, 4));
    l.normalize();
    expect(l).to.eql(new Line(new Vector(1, 1), new Vector(1, 2)));
  });

  it('should scale line', function () {
    var l = new Line(new Vector(1, 1), new Vector(1, 2));
    l.scale(3);
    expect(l).to.eql(new Line(new Vector(1, 1), new Vector(1, 4)));
  });

  it('should calc line length', function () {
    var l = new Line(new Vector(1, 1), new Vector(1, 3));
    assert.equal(l.length(), 2);
  });

  it('should calc center', function () {
    var l = new Line(new Vector(1, 1), new Vector(1, 3));
    var res = new Vector();
    l.center(res);
    expect(res).to.eql(new Vector(1, 2));
  });
});
