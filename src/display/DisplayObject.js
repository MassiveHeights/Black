/**
 * The base class for all renderable objects. Adds `alpha` and `visible` properties to GameObject.
 *
 * @cat display
 * @extends GameObject
 */
/* @echo EXPORT */
class DisplayObject extends GameObject {
  constructor() {
    super();

    /**
     * @private
     * @type {number}
     */
    this.mAlpha = 1;

    /**
     * @public
     * @type {string}
     */
    this.blendMode = BlendMode.AUTO;

    /**
     * @private
     * @type {boolean}
     */
    this.mVisible = true;

    this.mRenderer = new Renderer();

    // this.pluginName = WebGLTexPlugin.name;
    // this.vertexData = [];
    // this.tint = 0xffffff;
  }

  onRender(driver, parentRenderer) {
    let renderer = this.mRenderer;

    if (this.mDirty & DirtyFlag.RENDER) {
      renderer.alpha = this.mAlpha * parentRenderer.alpha;
      
      if (this.blendMode === BlendMode.AUTO)
        renderer.blendMode = parentRenderer.blendMode;
      else
        renderer.blendMode = this.blendMode;

      renderer.visible = this.mVisible;
      renderer.dirty = true;

      this.mDirty ^= DirtyFlag.RENDER;
    }

    return driver.registerRenderer(renderer);
  }

  /**
   * Gets/Sets the opacity of the object.
   *
   * @return {number}
   */
  get alpha() {
    return this.mAlpha;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set alpha(value) {
    if (this.mAlpha === MathEx.clamp(value, 0, 1))
      return;

    this.mAlpha = MathEx.clamp(value, 0, 1);
    this.setRenderDirty();
  }


  /**
   * Gets/Sets visibility of the object.
   *
   * @return {boolean}
   */
  get visible() {
    return this.mVisible;
  }


  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set visible(value) {
    if (this.mVisible === value)
      return;

    this.mVisible = value;
    this.setRenderDirty();
  }
}
