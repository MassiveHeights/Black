/**
 * A helper class for Graphics.
 *
 * @ignore
 * @cat display
 */
/* @echo EXPORT */
class GraphicsCommand {
  /**
   * Creates new instance of GraphicsCommand
   * 
   * @param {GraphicsCommandType} type
   * @param {Array<number>} data
   */
  constructor(type, data) {
    /** @public @type {GraphicsCommandType} */
    this.type = type;

    /** @public @type {Array<number>} */
    this.data = data;
  }
}