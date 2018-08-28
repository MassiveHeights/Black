/**
 * A pattern style class for Graphics.
 *
 * @ignore
 * @cat display
 */

/* @echo EXPORT */
class GraphicsPattern {
  /**
   * Creates new instance of GraphicsPattern
   */
  constructor(image, repetition) {
    this.image = image;
    this.repetition = repetition;
    this.native = null;
  }

  clone() {
    return new GraphicsPattern(this.image, this.repetition);
  }
}
