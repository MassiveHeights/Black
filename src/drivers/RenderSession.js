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
    this.parentRenderers = [];

    /** @type {Array<Renderer>} */
    this.renderers = [];

    /** @type {Array<Renderer>} */
    this.endPassRenderers = [];

    /** @type {Array<Renderer>} */
    this.endPassParentRenderers = [];
  }

  /**
   * Resets state for future reuse.
   */
  reset() {
    this.renderers.splice(0, this.renderers.length);
    this.parentRenderers.splice(0, this.parentRenderers.length);
    this.endPassRenderers.splice(0, this.endPassRenderers.length);
    this.endPassParentRenderers.splice(0, this.endPassParentRenderers.length);
  }
}