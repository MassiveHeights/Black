/* @echo EXPORT */
class ObjectPool {
  constructor(type) {
    this.mRecycled = [];
    this.mCapacity = 10;
    this.mType = type;
  }

  get(...params) {
    return this.mRecycled.length > 0 ? this.mRecycled.pop() : new this.mType(...params);
  }

  release(object) {
    if (this.mRecycled.length < this.mCapacity)
      this.mRecycled.push(object);
  }
}