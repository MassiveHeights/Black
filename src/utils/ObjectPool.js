/* @echo EXPORT */
class ObjectPool {
  constructor(type, ...defaultValues) {
    this.mReleased = [];
    this.mCapacity = 10;
    this.mType = type;
    this.mDefault = defaultValues;
  }

  get capacity() {
    return this.mCapacity;
  }

  set capacity(value) {
    Debug.assert(value !== 0, 'Capacity cannot be equal to zero.');
    Debug.assert(value > -1, 'Capacity cannot be smaller then -1.');

    this.mCapacity = value;

    if (this.mCapacity > this.mReleased.length)
      this.mReleased.splice(0, this.mReleased.length - this.mCapacity);
  }

  releaseAll() {
    this.mReleased.splice(0, this.mReleased.length);
  }

  get(...params) {
    if (params.length === 0 && this.mDefault.length !== 0)
      params = this.mDefault.slice();

    return this.mReleased.length > 0 ? this.mReleased.pop() : new this.mType(...params);
  }

  release(object) {
    if (this.mCapacity === -1 || this.mReleased.length < this.mCapacity)
      this.mReleased.push(object);
  }
}