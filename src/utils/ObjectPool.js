/* @echo EXPORT */
class ObjectPool {
  constructor(type, ...defaultValues) {
    this.mRecycled = [];
    this.mCapacity = 10;
    this.mType = type;
    this.mDefault = defaultValues;
  }

  get(...params) {
    if (params.length === 0 && this.mDefault.length !== 0)
      params = this.mDefault.slice();

    return this.mRecycled.length > 0 ? this.mRecycled.pop() : new this.mType(...params);
  }

  release(object) {
    if (this.mRecycled.length < this.mCapacity)
      this.mRecycled.push(object);
  }
}