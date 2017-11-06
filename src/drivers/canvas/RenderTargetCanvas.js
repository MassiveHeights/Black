/* @echo EXPORT */
class RenderTargetCanvas extends RenderTarget {
  constructor(width, height) {
    this.mCanvas = document.createElement('canvas');
    this.mCtx = this.mCanvas.getContext('2d');

    this.resize(width, height);
  }

  resize(width, height) {
    this.mCanvas.width = width;
    this.mCanvas.height = height;
  }
    
  clear() {
    this.mCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.mCtx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height);
  }

  get width() {
    return this.mCanvas.width;
  }

  set width(val) // eslint-disable-line require-jsdoc
  {
    this.mCanvas.width = val;
  }

  get height() {
    return this.mCanvas.height;
  }

  set height(val) {
    this.mCanvas.height = val;
  }
}
