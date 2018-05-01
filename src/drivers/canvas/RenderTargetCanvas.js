/**
 * Canvas rendering surface.
 *
 * @extends RenderTarget
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class RenderTargetCanvas extends RenderTarget {
  /**
   * Creates new instance of RenderTargetCanvas.
   *
   * @param {number} width  The width of the surface.
   * @param {number} height The height of the surface.
   */
  constructor(width, height) {
    super(width, height);

    /** @ignore @private @type {HTMLCanvasElement} */
    this.mCanvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));

    /** @ignore @private @type {CanvasRenderingContext2D} */
    this.mCtx = /** @type {CanvasRenderingContext2D} */ (this.mCanvas.getContext('2d'));

    this.resize(width, height);
  }

  /**
   * @inheritDoc
   */
  resize(width, height) {
    this.mCanvas.width = Math.ceil(width);
    this.mCanvas.height = Math.ceil(height);
  }

  /**
   * @inheritDoc
   */
  clear() {
    this.mCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.mCtx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height);
  }

  /**
   * @inheritDoc
   */
  get width() {
    return this.mCanvas.width;
  }

  /**
   * @inheritDoc
   */
  set width(val) {
    this.mCanvas.width = val;
  }

  /**
   * @inheritDoc
   */
  get height() {
    return this.mCanvas.height;
  }

  /**
   * @inheritDoc
   */
  set height(val) {
    this.mCanvas.height = val;
  }

  /**
   * HTML canvas element.
   *
   * @returns {HTMLCanvasElement}
   */
  get native() {
    return this.mCanvas;
  }

  /**
   * Canvas rendering context.
   *
   * @returns {CanvasRenderingContext2D}
   */
  get context() {
    return this.mCtx;
  }
}
