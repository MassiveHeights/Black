import { Vector } from './../../dist/black-es6-module'

describe('Vector', () => {
  test('Should create new Vector', () => {
    let v = new Vector();

    expect(v.x).toEqual(0);
    expect(v.y).toEqual(0);

    expect(() => {
      let v2 = new Vector('NaN', 'NaN');
      expect(v2.x).toEqual(0);
      expect(v.y).toEqual(0);
    }).toThrow();
  });

  test('Should add two vectors', () => {
    let a = new Vector(100, 100);
    let b = new Vector(100, 100);
    a.add(b);

    expect(a.x).toEqual(200);
    expect(a.y).toEqual(200);
  });

  test('Should subtract two vectors', () => {
    let a = new Vector(100, 100);
    let b = new Vector(100, 100);
    a.subtract(b);

    expect(a.x).toEqual(0);
    expect(a.y).toEqual(0);
  });

  test('Should calc distance between two vectors', () => {
    let a = new Vector(-100, -100);
    let b = new Vector(100, 100);
    let distance = a.distance(b);

    expect(~~distance).toEqual(282);
  });

  test('Should calc squared distance between two vectors', () => {
    let a = new Vector(-100, -100);
    let b = new Vector(100, 100);
    let distance = a.distanceSqr(b);

    expect(~~distance).toEqual(80000);
  });

  test('Should mul two vectors', () => {
    let a = new Vector(100, 100);
    let b = new Vector(100, 100);
    a.multiply(b);

    expect(a.x).toEqual(10000);
    expect(a.y).toEqual(10000);
  });

  test('Should mul vector by scalar', () => {
    let a = new Vector(100, 100);
    a.multiplyScalar(100);

    expect(a.x).toEqual(10000);
    expect(a.y).toEqual(10000);
  });

  test('Should find dot product for two vectors', () => {
    let a = new Vector(-100, -100);
    let b = new Vector(100, 100);
    let dot = a.dot(b);

    expect(dot).toEqual(-20000);
  });

  test('Should return vector length', () => {
    let a = new Vector(-100, -100);
    expect(a.length()).toEqual(141.4213562373095);
  });

  test('Should return vector length squared', () => {
    let a = new Vector(-100, -100);
    expect(a.lengthSqr()).toEqual(20000);
  });

  test('Should normalize vector components', () => {
    let a = new Vector(10, 20);
    a.normalize();

    expect(a.x).toEqual(0.4472135954999579);
    expect(a.y).toEqual(0.8944271909999159);
  });

  test('Should clamp vector values', () => {
    let a = new Vector(10, 20);
    a.clamp(10, 15);

    expect(a.x).toEqual(10);
    expect(a.y).toEqual(15);
  });

  test('Should clamp vector length', () => {
    let a = new Vector(10, 20);
    a.clampLength(10, 15);

    expect(a.x).toEqual(6.7082039324993685);
    expect(a.y).toEqual(13.416407864998737);
  });

  test('Should interpolate between two vectors', () => {
    let a = new Vector(10, 20);
    let b = new Vector(100, 200);
    a.lerp(b, 0.5);

    expect(a.x).toEqual(55);
    expect(a.y).toEqual(110);
  });

  test('Should copy current components into destination vector', () => {
    let a = new Vector(10, 20);
    let b = new Vector(100, 200);
    a.copyTo(b);

    expect(b.x).toEqual(10);
    expect(b.y).toEqual(20);
  });

  test('Should copy components from destination vector', () => {
    let a = new Vector(10, 20);
    let b = new Vector(100, 200);
    a.copyFrom(b);

    expect(b.x).toEqual(100);
    expect(b.y).toEqual(200);
  });

  test('Should clone a new vector', () => {
    let a = new Vector(10, 20);
    let b = a.clone();

    expect(b.x).toEqual(10);
    expect(b.y).toEqual(20);
  });

  test('Should compare two vectors', () => {
    let a = new Vector(10, 20);
    let b = new Vector(10, 20);

    expect(a.equals(b)).toEqual(true);
  });

  test('Should check if vector is empty', () => {
    let a = new Vector(10, 20);
    expect(a.isEmpty()).toEqual(false);

    let b = new Vector(0, 0);
    expect(b.isEmpty()).toEqual(true);
  });

  test('Should rotate the vector around given vector point', () => {
    let a = new Vector(100, 100);
    let b = new Vector(-100, -100);
    a.setRotationFrom(b, Math.PI);

    expect(a.x).toEqual(-300);
    expect(a.y).toEqual(-300);    
  });

  test('Should rotate the vector around given point', () => {
    let a = new Vector(100, 100);    
    a.setRotation(Math.PI);

    expect(a.x).toEqual(-100);
    expect(a.y).toEqual(-100);
  });

  test('Should calc angle between two vectors', () => {
    let a = new Vector(100, 100);
    let b = new Vector(-100, -100);
    let angle = a.angleBetween(b);

    expect(angle).toEqual(-2.356194490192345);
  });

  test('Should rotate this vector to normal', () => {
    let a = new Vector(100, 100);
    let b = new Vector(-100, -100);
    let angle = a.perp();

    expect(a.x).toEqual(100);
    expect(a.y).toEqual(-100);
  });

  test('Should create new vector from angle', () => {
    let a = Vector.fromAngle(Math.PI)

    expect(a.x).toEqual(-1);
    expect(a.y).toEqual(1.2246467991473532e-16);
  });
});