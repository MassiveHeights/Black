import { Vector } from './../../../dist/black-es6-module'

describe('Vector', () => {
  test('Should create new Vector', () => {
    let v = new Vector();

    expect(v.x).toBe(0);
    expect(v.y).toBe(0);

    expect(() => {
      let v2 = new Vector('NaN', 'NaN');
      expect(v2.x).toBe(0);
      expect(v.y).toBe(0);
    }).toThrow();
  });

  test('Should add two vectors', () => {
    let a = new Vector(100, 100);
    let b = new Vector(100, 100);
    a.add(b);

    expect(a.x).toBe(200);
    expect(a.y).toBe(200);
  });

  test('Should subtract two vectors', () => {
    let a = new Vector(100, 100);
    let b = new Vector(100, 100);
    a.subtract(b);

    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
  });

  test('Should calc distance between two vectors', () => {
    let a = new Vector(-100, -100);
    let b = new Vector(100, 100);
    let distance = a.distance(b);

    expect(~~distance).toBe(282);
  });

  test('Should calc squared distance between two vectors', () => {
    let a = new Vector(-100, -100);
    let b = new Vector(100, 100);
    let distance = a.distanceSqr(b);

    expect(~~distance).toBe(80000);
  });

  test('Should mul two vectors', () => {
    let a = new Vector(100, 100);
    let b = new Vector(100, 100);
    a.multiply(b);

    expect(a.x).toBe(10000);
    expect(a.y).toBe(10000);
  });

  test('Should mul vector by scalar', () => {
    let a = new Vector(100, 100);
    a.multiplyScalar(100);

    expect(a.x).toBe(10000);
    expect(a.y).toBe(10000);
  });

  test('Should find dot product for two vectors', () => {
    let a = new Vector(-100, -100);
    let b = new Vector(100, 100);
    let dot = a.dot(b);

    expect(dot).toBe(-20000);
  });

  test('Should return vector length', () => {
    let a = new Vector(-100, -100);
    expect(a.length()).toBe(141.4213562373095);
  });

  test('Should return vector length squared', () => {
    let a = new Vector(-100, -100);
    expect(a.lengthSqr()).toBe(20000);
  });

  test('Should normalize vector components', () => {
    let a = new Vector(10, 20);
    a.normalize();

    expect(a.x).toBe(0.4472135954999579);
    expect(a.y).toBe(0.8944271909999159);
  });

  test('Should clamp vector values', () => {
    let a = new Vector(10, 20);
    a.clamp(10, 15);

    expect(a.x).toBe(10);
    expect(a.y).toBe(15);
  });

  test('Should clamp vector length', () => {
    let a = new Vector(10, 20);
    a.clampLength(10, 15);

    expect(a.x).toBe(6.7082039324993685);
    expect(a.y).toBe(13.416407864998737);
  });

  test('Should interpolate between two vectors', () => {
    let a = new Vector(10, 20);
    let b = new Vector(100, 200);
    a.lerp(b, 0.5);

    expect(a.x).toBe(55);
    expect(a.y).toBe(110);
  });

  test('Should copy current components into destination vector', () => {
    let a = new Vector(10, 20);
    let b = new Vector(100, 200);
    a.copyTo(b);

    expect(b.x).toBe(10);
    expect(b.y).toBe(20);
  });

  test('Should copy components from destination vector', () => {
    let a = new Vector(10, 20);
    let b = new Vector(100, 200);
    a.copyFrom(b);

    expect(b.x).toBe(100);
    expect(b.y).toBe(200);
  });

  test('Should clone a new vector', () => {
    let a = new Vector(10, 20);
    let b = a.clone();

    expect(b.x).toBe(10);
    expect(b.y).toBe(20);
  });

  test('Should compare two vectors', () => {
    let a = new Vector(10, 20);
    let b = new Vector(10, 20);

    expect(a.equals(b)).toBe(true);
  });

  test('Should check if vector is empty', () => {
    let a = new Vector(10, 20);
    expect(a.isEmpty()).toBe(false);

    let b = new Vector(0, 0);
    expect(b.isEmpty()).toBe(true);
  });

  test('Should rotate the vector around given vector point', () => {
    let a = new Vector(100, 100);
    let b = new Vector(-100, -100);
    a.setRotationFrom(b, Math.PI);

    expect(a.x).toBeCloseTo(-300);
    expect(a.y).toBeCloseTo(-300);
  });

  test('Should rotate the vector around given point', () => {
    let a = new Vector(100, 100);
    
    a.setRotation(Math.PI);

    expect(a.x).toBeCloseTo(-100);
    expect(a.y).toBeCloseTo(-100);
  });

  test('Should calc angle between two vectors', () => {
    let a = new Vector(100, 100);
    let b = new Vector(-100, -100);
    let angle = a.angleBetween(b);

    expect(angle).toBe(-2.356194490192345);
  });

  test('Should rotate this vector to normal', () => {
    let a = new Vector(100, 100);
    let b = new Vector(-100, -100);
    let angle = a.perp();

    expect(a.x).toBe(100);
    expect(a.y).toBe(-100);
  });

  test('Should create new vector from angle', () => {
    let a = Vector.fromAngle(Math.PI)

    expect(a.x).toBe(-1);
    expect(a.y).toBe(1.2246467991473532e-16);
  });
});