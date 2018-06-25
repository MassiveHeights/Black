import { Polygon, Rectangle, Vector, Circle } from './../../../dist/black-es6-module'

describe('Polygon', function () {
  test('should create vertices', function () {
    var v = new Polygon();
    expect(v.vertices).toBeDefined();
  });

  test('should create polygon from path', function () {
    var p = Polygon.fromPath('0 0 1 0 1 1');

    expect(p.vertices[0].x).toEqual(0);
    expect(p.vertices[0].y).toEqual(0);
    expect(p.vertices[1].x).toEqual(1);
    expect(p.vertices[1].y).toEqual(0);
    expect(p.vertices[2].x).toEqual(1);
    expect(p.vertices[2].y).toEqual(1);
  });

  test('should rotate polygon around center', function () {
    var p = Polygon.fromPath('0 0 1 -1 2 0 1 1');
    p.setRotation(Math.PI / 2);
    for (let vector of p.vertices) {
      vector.x = +vector.x.toFixed(15);
      vector.y = +vector.y.toFixed(15);
    }

    var p2 = Polygon.fromPath('1 -1 2 0 1 1 0 0');

    expect(p.vertices[0].x).toBeCloseTo(p2.vertices[0].x);
    expect(p.vertices[0].y).toBeCloseTo(p2.vertices[0].y);
    expect(p.vertices[1].x).toBeCloseTo(p2.vertices[1].x);
    expect(p.vertices[1].y).toBeCloseTo(p2.vertices[1].y);
    expect(p.vertices[2].x).toBeCloseTo(p2.vertices[2].x);
    expect(p.vertices[2].y).toBeCloseTo(p2.vertices[2].y);
    expect(p.vertices[3].x).toBeCloseTo(p2.vertices[3].x);
    expect(p.vertices[3].y).toBeCloseTo(p2.vertices[3].y);
  });

  test('should translate polygon', function () {
    var p = Polygon.fromPath('0 0 1 1 2 0 1 -1');
    p.setTranslation(new Vector(1, 1));

    expect(p.vertices).toEqual(Polygon.fromPath('0 1 1 2 2 1 1 0').vertices);
    expect(p.center.equals(new Vector(1, 1))).toEqual(true);
  });

  test('should collide with another polygon', function () {
    var p1 = Polygon.fromPath('0 0 1 1 1 0');
    var p2 = Polygon.fromPath('0 0 0 1 1 0');
    expect(p1.collide(p2)).toEqual(true);
  });

  test('should not collide with another polygon', function () {
    var p1 = Polygon.fromPath('0 0 1 1 0 1');
    var p2 = Polygon.fromPath('1 0 2 1 1.05 1');
    expect(p1.collide(p2)).not.toEqual(true);
  });

  test('should collide with circle', function () {
    var p = Polygon.fromPath('0 0 1 1 1 0');
    var c = new Circle(0, 1, 0.8);
    expect(p.collideCircle(c)).toEqual(true);
  });

  test('should not collide with circle', function () {
    var p = Polygon.fromPath('0 0 1 1 1 0');
    var c = new Circle(0, 1, 0.7);
    expect(p.collideCircle(c)).not.toEqual(true);
  });

  test('should collide with rectangle', function () {
    var p = Polygon.fromPath('0 0 1 1 1 0');
    var r = new Rectangle(0, 0, 0.1, 1);
    expect(p.collideRectangle(r)).toEqual(true);
  });

  test('should not collide with rectangle', function () {
    var p = Polygon.fromPath('0 0 1 1 1 0');
    var r = new Rectangle(-0.1, 0, 0.1, 1);
    expect(p.collideRectangle(r)).not.toEqual(true);
  });

  test('should overlap another polygon', function () {
    var p1 = Polygon.fromPath('0 0 1 1 1 0');
    var p2 = Polygon.fromPath('0 0 1 1 1 0');
    expect(p1.overlap(p2)).toEqual(true);
  });

  test('should not overlap another polygon', function () {
    var p1 = Polygon.fromPath('0 0 1 1 1 0');
    var p2 = Polygon.fromPath('0 0 1 1 1 -0.1');
    expect(p1.overlap(p2)).not.toEqual(true);
  });

  test('should overlap circle', function () {
    var p = Polygon.fromPath('0 0 1 1 2 0 1 -1');
    var c = new Circle(1, 0, 0.7);
    expect(p.overlapCircle(c)).toEqual(true);
  });

  test('should not overlap circle', function () {
    var p = Polygon.fromPath('0 0 1 1 2 0 1 -1');
    var c = new Circle(1, 0, 0.8);
    expect(p.overlapCircle(c)).not.toEqual(true);
  });

  test('should overlap rectangle', function () {
    var p = Polygon.fromPath('0 0 1 1 1 0');
    var r = new Rectangle(0.5, 0, 0.5, 0.5);
    expect(p.overlapRectangle(r)).toEqual(true);
  });

  test('should not overlap rectangle', function () {
    var p = Polygon.fromPath('0 0 1 1 1 0');
    var r = new Rectangle(0.51, 0, 0.5, 0.5);
    expect(p.overlapRectangle(r)).not.toEqual(true);
  });
});
