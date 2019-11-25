import { RenderTarget } from "../RenderTarget";

/**
 * Canvas rendering surface.
 *
 * @extends black-engine~RenderTarget
 * @cat drivers.canvas
 */
export class RenderTargetCanvas extends RenderTarget {
  /**
   * Creates new instance of RenderTargetCanvas.
   *
   * @param {number} width  The width of the surface.
   * @param {number} height The height of the surface.
   */
  constructor(width, height) {
    super(width, height);

    /** 
     * @ignore 
     * @private 
     * @type {HTMLCanvasElement} 
     */
    this.mCanvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));

    /** 
     * @ignore 
     * @private 
     * @type {CanvasRenderingContext2D} 
     */
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
   * The width of the surface.
   * @override
   * 
   * @returns {number}
   */
  get width() {
    return this.mCanvas.width;
  }

  /**
   * @override
   * 
   * @param {number} value
   * @returns {void}
   */
  set width(value) {
    this.mCanvas.width = value;
  }

  /**
   * The height of the surface.
   * @override
   *
   * @returns {number}
   */
  get height() {
    return this.mCanvas.height;
  }

  /**
   * @override
   * 
   * @param {number} value
   * @returns {void}
   */
  set height(value) {
    this.mCanvas.height = value;
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
