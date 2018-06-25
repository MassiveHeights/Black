import { MathEx } from './../../../dist/black-es6-module';

describe('MathEx', function () {
  it('MathEx.randomBetween', function () {
    expect(MathEx.randomBetween(1, 1)).toBe(1);
    
    expect(MathEx.randomBetween(0, 1)).toBeGreaterThanOrEqual(0);
    expect(MathEx.randomBetween(0, 1)).toBeLessThanOrEqual(1);

    expect(MathEx.randomBetween(-10, 10)).toBeGreaterThanOrEqual(-10);
    expect(MathEx.randomBetween(-0, 10)).toBeLessThanOrEqual(10);
  });

  it('clamp', function () {
    expect(MathEx.clamp(5, 0, 10)).toBe(5);
    expect(MathEx.clamp(5, 5, 10)).toBe(5);
    expect(MathEx.clamp(5, 6, 10)).toBe(6);
    expect(MathEx.clamp(-5, -10, 10)).toBe(-5);
    expect(MathEx.clamp(-5, 5, 10)).toBe(5);
  });

  it('distance', function () {
    expect(MathEx.distance(1, 1, 1, 1)).toBe(0);
    expect(MathEx.distance(-1, -1, -1, -1)).toBe(0);
    expect(MathEx.distance(6, -6, 6, 6)).toBe(12);
  });

  it('distanceSqr', function () {
    expect(MathEx.distanceSqr(1, 1, 1, 1)).toBe(0);
    expect(MathEx.distanceSqr(-1, -1, -1, -1)).toBe(0);
    expect(MathEx.distanceSqr(6, -6, 6, 6)).toBe(144);
  });

  it('angleBetween', function () {
    expect(MathEx.angleBetween(0, 0, 0, 5)).toBeCloseTo(1.57079);
    expect(MathEx.angleBetween(Infinity, 0, 0, 0)).toBeCloseTo(Math.PI);
    expect(MathEx.angleBetween(0, 0, 0, 10)).toBeCloseTo(Math.PI / 2);
    expect(MathEx.angleBetween(0, 0, 0, 0)).toBeCloseTo(0);
  });

  it('mapRange', function () {
    expect(MathEx.mapRange(50, 0, 100, 100, 1000)).toBeCloseTo(550);
    expect(MathEx.mapRange(-50, 0, -100, -100, -1000)).toBeCloseTo(-550);
    expect(MathEx.mapRange(0, -1, 1, 0, 1)).toBeCloseTo(0.5);
    expect(MathEx.mapRange(1, -1, 1, 0, 1)).toBeCloseTo(1);
  });

  it('lerp', function () {
    expect(MathEx.lerp(0, 100, 0.5)).toBeCloseTo(50);
    expect(MathEx.lerp(-100, 100, 0.5)).toBeCloseTo(0);
    expect(MathEx.lerp(-100, 100, 1.5)).toBeCloseTo(200);
    expect(MathEx.lerp(-100, 100, -0.5)).toBeCloseTo(-200);
  });

  it('equals', function () {
    expect(MathEx.equals(0, 0)).toBeTruthy();
    expect(MathEx.equals(0.99, 1, 0.1)).toBeTruthy();
    expect(MathEx.equals(-0.99, -1, 0.1)).toBeTruthy();

    expect(MathEx.equals(0, 1)).toBeFalsy();
    expect(MathEx.equals(0.99, 1)).toBeFalsy();
    expect(MathEx.equals(-0.99, -1)).toBeFalsy();
  });
});