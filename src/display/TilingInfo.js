/**
 * Class that holds information about tiling,
 * @cat display
 */
export class TilingInfo {
  /**
   * Creates new TilingInfo instance.
   * 
   * @param {number} width  The width of destination texture.
   * @param {number} height The height of destination texture.
   * @param {number} scaleX Indicates how much source texture should be scaled along x-axis.
   * @param {number} scaleY Indicates how much source texture should be scaled along y-axis.
   * @param {number} wrapX  Indicates how many pixels needs to be wrapped around along x-axis.
   * @param {number} wrapY  Indicates how many pixels needs to be wrapped around along y-axis.
   */
  constructor(width = 0, height = 0, scaleX = 1, scaleY = 1, wrapX = 0, wrapY = 0) {
    /**
     * The width of destination texture.
     * @type {number}
     */
    this.width = width;

    /**
     * The height of destination texture.
     * @type {number}
     */
    this.height = height;

    /**
     * Indicates how much source texture should be scaled along x-axis.
     * @type {number}
     */
    this.scaleX = scaleX;

    /**
     * Indicates how much source texture should be scaled along y-axis.
     * @type {number}
     */
    this.scaleY = scaleY;

    /**
     * Indicates how many pixels needs to be wrapped around along x-axis.
     * @type {number}
     */
    this.wrapX = wrapX;

    /**
     * Indicates how many pixels needs to be wrapped around along y-axis.
     * @type {number}
     */
    this.wrapY = wrapY;
  }
}