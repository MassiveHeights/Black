import { Line, Circle, Vector } from './../../../dist/black-es6-module'

describe('Circle', function () {
  it('Should initialize new empty Circle', function () {
    var c = new Circle();
    expect(c.x).toBe(0);
    expect(c.y).toBe(0);
    expect(c.r).toBe(1);
  });

  it('should set properties to circle', function () {
    var c = new Circle();
    c.set(1, 1, 2);

    expect(c.x).toBe(1);
    expect(c.y).toBe(1);
    expect(c.r).toBe(2);
  });

  it('should clone circle', function () {
    var c = new Circle(3, 3, 3);
    var clone = c.clone();

    expect(c.x).toBe(clone.x);
    expect(c.y).toBe(clone.y);
    expect(c.r).toBe(clone.r);
    expect(c).not.toBe(clone);
  });

  it('should copy properties to another circle', function () {
    var c1 = new Circle(3, 3, 3);
    var c2 = new Circle(2, 2, 2);

    c1.copyTo(c2);

    expect(c2.x).toBe(3);
    expect(c2.y).toBe(3);
    expect(c2.r).toBe(3);
  });

  it('should copy properties from another circle', function () {
    var c1 = new Circle(3, 3, 3);
    var c2 = new Circle(2, 2, 2);

    c1.copyFrom(c2);

    expect(c1.x).toBe(2);
    expect(c1.y).toBe(2);
    expect(c1.r).toBe(2);
  });

  it('should represent object s string', function () {
    var c = new Circle(2.333, 1.333, 1.5556);
    var s = c.toString();

    expect(s).toBe('Circle { x: 2.33, y: 1.33, r: 1.56 }');
  });

  it('should be equals', function () {
    var c1 = new Circle(2, 2, 2);
    var c2 = new Circle(2.1, 2, 2);

    expect(c1.equals(c2, 0.11)).toBe(true);
  });

  it('should not be equals', function () {
    var c1 = new Circle(2, 2, 2);
    var c2 = new Circle(2.1, 2, 2);

    expect(c1.equals(c2)).not.toBe(true);
  });

  it('should contain point', function () {
    var c = new Circle(1, 1, 1);
    var p = new Vector(0, 1);

    expect(c.contains(p)).toBe(true);
  });

  it('should not contain point', function () {
    var c = new Circle(1, 1, 1);
    var p = new Vector(0, 0.99);

    expect(c.contains(p)).not.toBe(true);
  });

  it('should contain XY point', function () {
    var c = new Circle(1, 1, 1);
    expect(c.containsXY(0, 1)).toBe(true);
  });

  it('should not contain XY point', function () {
    var c = new Circle(1, 1, 1);
    expect(c.containsXY(0, 0.99)).not.toBe(true);
  });

  it('should intersect another circle', function () {
    var c1 = new Circle(1, 1, 1);
    var c2 = new Circle(3, 1, 1);

    expect(c1.intersects(c2)).toBe(true);
  });

  it('should not intersect another circle', function () {
    var c1 = new Circle(1, 1, 1);
    var c2 = new Circle(3, 1, 0.99);

    expect(c1.intersects(c2)).not.toBe(true);
  });
});
