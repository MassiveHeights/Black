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
    this.mBlendMode = BlendMode.AUTO;

    /**
     * @private
     * @type {boolean}
     */
    this.mVisible = true;

    /**
     * @private
     * @type {Renderer|null} */
    this.mRenderer = this.getRenderer();
  }

  getRenderer() {
    return Black.instance.video.getRenderer('DisplayObject');
  }

  onRender(driver, parentRenderer) {
    let renderer = this.mRenderer;

    if (this.mDirty & DirtyFlag.RENDER) {      
      renderer.transform = this.worldTransformation;
      renderer.alpha = this.mAlpha * parentRenderer.alpha;
      renderer.blendMode = this.blendMode === BlendMode.AUTO ? parentRenderer.blendMode : this.blendMode;
      renderer.visible = this.mVisible;
      renderer.dirty = this.mDirty;

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

  get blendMode() {
    return this.mBlendMode;
  }

  set blendMode(value) {
    if (this.mBlendMode === value)
      return;

    this.mBlendMode = value;
    this.setRenderDirty();
  }
}
