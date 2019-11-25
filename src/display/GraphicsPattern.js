/**
 * A pattern fill style class for Graphics.
 *
 * @ignore
 * @cat display
 */
export class GraphicsPattern {
  /**
   * Creates new instance of GraphicsPattern
   */
  constructor(image, repetition) {

    /** @type {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} */
    this.image = image;

    /** @type {string} */
    this.repetition = repetition;

    /** @type {CanvasPattern|null} */
    this.native = null;
  }

  /**
   * Creates copy of this
   *
   * @return {black-engine~GraphicsPattern} New instance
   */
  clone() {
    return new GraphicsPattern(this.image, this.repetition);
  }
}
