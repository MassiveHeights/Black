import { Line, Circle, Vector } from './../../../dist/black-es6-module'

describe('Line', function () {
  it('should initialize new empty Line', function () {
    var l = new Line(new Vector(), new Vector());
    expect(l.start.x).toBe(0);
    expect(l.end.y).toBe(0);
    expect(l.start.x).toBe(0);
    expect(l.end.y).toBe(0);
  });

  it('should intersect line', function () {
    var l1 = new Line(new Vector(0, 0), new Vector(1, 1));
    var l2 = new Line(new Vector(0.9, 1), new Vector(2, 0));

    expect(l1.intersects(l2)).toBe(true);
  });

  it('should not intersect line', function () {
    var l1 = new Line(new Vector(0, 0), new Vector(1, 1));
    var l2 = new Line(new Vector(1, 1), new Vector(2, 0));

    expect(l1.intersects(l2)).not.toBe(true);
  });

  it('should intersect circle', function () {
    var l = new Line(new Vector(0, 0), new Vector(1, 1));
    var c = new Circle(2, 1, 1);

    expect(l.intersectsCircle(c)).toBe(true);
  });

  it('should not intersect circle', function () {
    var l = new Line(new Vector(0, 0), new Vector(1, 1));
    var c = new Circle(2.01, 2, 1);

    expect(l.intersectsCircle(c)).not.toBe(true);
  });

  it('should clone line', function () {
    var l1 = new Line(new Vector(1, 1), new Vector(2, 2));
    var l2 = l1.clone();

    expect(l1.equals(l2)).toBe(true);
    expect(l1).not.toBe(l2);
  });

  it('should set new line properties', function () {
    var l = new Line(new Vector(1, 1), new Vector(2, 2));
    l.set(new Vector(3, 3), new Vector(4, 5));

    expect(l.start.x).toBe(3);
    expect(l.start.y).toBe(3);
    expect(l.end.x).toBe(4);
    expect(l.end.y).toBe(5);
  });

  it('should copy line properties to another', function () {
    var l1 = new Line(new Vector(1, 1), new Vector(2, 2));
    var l2 = new Line(new Vector(), new Vector());

    l1.copyTo(l2);

    expect(l1.equals(l2)).toBe(true);
    expect(l1).not.toBe(l2);
  });

  it('should copy another line properties to this', function () {
    var l1 = new Line(new Vector(1, 1), new Vector(2, 2));
    var l2 = new Line(new Vector(3, 3), new Vector(4, 4));

    l1.copyFrom(l2);

    expect(l1.equals(l2)).toBe(true);
    expect(l2).not.toBe(l1);
  });

  it('should represent line object as string', function () {
    var l1 = new Line(new Vector(1.55555, 1), new Vector(2, 2));

    expect(l1.toString(3)).toBe('Line { start: Vector: { x: 1.556, y: 1.000 }, end: Vector: { x: 2.000, y: 2.000 } }');
  });

  it('should be equals', function () {
    var l1 = new Line(new Vector(1, 1), new Vector(2, 2));
    var l2 = new Line(new Vector(1, 1), new Vector(2, 2.09));

    expect(l1.equals(l2, 0.1)).toBe(true);
  });

  it('should not be equals', function () {
    var l1 = new Line(new Vector(1, 1), new Vector(2, 2));
    var l2 = new Line(new Vector(1, 1), new Vector(2, 2.1));

    expect(l1.equals(l2)).not.toBe(true);
  });

  it('should contain point XY', function () {
    var l = new Line(new Vector(1, 1), new Vector(2, 2));

    expect(l.containsXY(1.5, 1.5)).toBe(true);
  });

  it('should not contain point XY', function () {
    var l = new Line(new Vector(1, 1), new Vector(2, 2));

    expect(l.containsXY(1.51, 1.5)).not.toBe(true);
  });

  it('should contain point', function () {
    var l = new Line(new Vector(1, 1), new Vector(2, 2));

    expect(l.contains(new Vector(1.5, 1.5))).toBe(true);
  });

  it('should not contain point', function () {
    var l = new Line(new Vector(1, 1), new Vector(2, 2));

    expect(l.contains(new Vector(1.51, 1.5))).not.toBe(true);
  });

  it('should reverse line', function () {
    var l = new Line(new Vector(1, 1), new Vector(2, 2));
    var clone = l.clone();
    var start = clone.start;
    var end = clone.end;
    l.reverse();

    expect(start.equals(l.end)).toBe(true);
    expect(end.equals(l.start)).toBe(true);

    expect(start).not.toBe(l.end);
    expect(end).not.toBe(l.start);
  });

  it('should normalize line', function () {
    var l = new Line(new Vector(1, 1), new Vector(1, 4));
    l.normalize();
    expect(l).toEqual(new Line(new Vector(1, 1), new Vector(1, 2)));
  });

  it('should scale line', function () {
    var l = new Line(new Vector(1, 1), new Vector(1, 2));
    l.scale(3);
    expect(l).toEqual(new Line(new Vector(1, 1), new Vector(1, 4)));
  });

  it('should calc line length', function () {
    var l = new Line(new Vector(1, 1), new Vector(1, 3));
    expect(l.length()).toBe(2);
  });

  it('should calc center', function () {
    var l = new Line(new Vector(1, 1), new Vector(1, 3));
    var res = new Vector();
    l.center(res);
    expect(res).toEqual(new Vector(1, 2));
  });
});
