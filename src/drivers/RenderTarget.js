/* @echo EXPORT */
class RenderTarget {
  constructor(width, height) {
    this.mWidth = Math.ceil(width);
    this.mHeight = Math.ceil(height);
  }

  resize(width, height) {
    this.mWidth = width;
    this.mHeight = height;
  }

  clear() {
  }

  get width() {
    return this.mWidth;
  }

  set width(value) {
    this.mWidth = width;
  }

  get height() {
    return this.mHeight;
  }

  set height(value) {
    this.mHeight = height;
  }
}
