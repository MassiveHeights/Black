/**
 * Responsible for rendering `Graphics` objects by different drivers.
 *
 * @extends Renderer
 * @cat drivers
 */
/* @echo EXPORT */
class GraphicsRenderer extends Renderer {
  constructor() {
    super();

    /**
     * @ignore
     * @type {Rectangle}
     */
    this.bounds = null;

    /**
     * @ignore
     * @type {Array<GraphicsCommand>}
     */
    this.commands = null;
  }
}
