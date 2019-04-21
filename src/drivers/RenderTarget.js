/**
 * Base class for representing rendering surface.
 *
 * @cat drivers
 */
export class RenderTarget {
  /**
   * Creates new instance fo RenderTarget.
   *
   * @param {number} width  The width of the surface.
   * @param {number} height The height of the surface.
   */
  constructor(width, height) {
    /** 
     * @private 
     * @type {number} 
     */
    this.mWidth = Math.ceil(width);

    /** 
     * @private 
     * @type {number} 
     */
    this.mHeight = Math.ceil(height);
  }

  /**
   * Resizes surface to the given size.
   *
   * @param {number} width The width of the surface.
   * @param {number} height The height of the surface.
   */
  resize(width, height) {
    this.mWidth = width;
    this.mHeight = height;
  }

  /**
   * Clears whole surface.
   */
  clear() {
  }

  /**
   * The width of the surface.
   *
   * @returns {number}
   */
  get width() {
    return this.mWidth;
  }

  /**
   * @param {number} value
   * @returns {void}
   */
  set width(value) {
    this.mWidth = value;
  }

  /**
   * The height of the surface.
   *
   * @returns {number}
   */
  get height() {
    return this.mHeight;
  }

  /**
   * @param {number} value
   * @returns {void}
   */
  set height(value) {
    this.mHeight = value;
  }
}
