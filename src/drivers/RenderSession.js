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
    this.endPassParentRenderers = [];

    /** @type {boolean} */
    this.isBackBufferActive = true;

    /** @type {Matrix|null} */
    this.customTransform = null;
  }

  /**
   * Resets state for future reuse.
   */
  reset() {
    this.parentRenderers.splice(0, this.parentRenderers.length);
    this.endPassParentRenderers.splice(0, this.endPassParentRenderers.length);
    this.isBackBufferActive = true;
    this.customTransform = null;
  }
}