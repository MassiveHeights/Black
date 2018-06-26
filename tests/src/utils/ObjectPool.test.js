import { ObjectPool } from "../../../dist/black-es6-module";

describe('ObjectPool', function () {
  it('get', function () {
    const pool = new ObjectPool(SomeObject);

    expect(pool.get()).toBeInstanceOf(SomeObject);
  });

  it('release', function () {
    const pool = new ObjectPool(SomeObject);
    pool.release(pool.get());

    expect(pool.mReleased.length).toBe(1);
  });

  it('capacity', function () {
    const pool = new ObjectPool(SomeObject, 1);
    pool.release(pool.get());
    pool.release(pool.get());
    pool.release(pool.get());

    expect(pool.mReleased.length).toBe(1);
    expect(pool.capacity).toBe(1);
  });

  it('releaseAll', function () {
    const pool = new ObjectPool(SomeObject);
    pool.get();
    pool.get();
    pool.get();
    pool.releaseAll();

    expect(pool.mReleased.length).toBe(0);
  });
});

class SomeObject {
  constructor() {
    this.a = Math.random();
  }
}