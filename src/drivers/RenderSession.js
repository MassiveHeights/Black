/**
 * A RenderSession object holds state of current frame renderers.
 *
 * @cat drivers
 */
/* @echo EXPORT */
class RenderSession {
  /**
   * Creates new instance of RenderSession.
   */
  constructor() {
    /** @type {Array<Renderer>} */
    this.renderers = [];

    /** @type {boolean} */
    this.skipChildren = false;

    /** @type {Renderer|null} */
    this.endPassRenderer = null;

    /** @type {number} */
    this.rendererIndex = 0;
  }

  /**
   * Clears all pending instructions.
   */
  clear() {
    this.renderers.splice(0, this.renderers.length);
  }

  /**
   * Resets state for future reuse.
   */
  reset() {
    this.renderers.splice(0, this.renderers.length);
    this.endPassRenderer = null;
    this.rendererIndex = 0;
    this.skipChildren = false;
  }
}