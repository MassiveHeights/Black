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
     * @private
     * @type {string}
     */
    this.blendMode = BlendMode.NORMAL;

    /**
     * @private
     * @type {boolean}
     */
    this.mVisible = true;
  }

  /**
   * @ignore
   * @param {VideoNullDriver} video
   * @param {number} time
   * @param {number} parentAlpha
   * @param {string} parentBlendMode
   *
   * @return {void}
   */
  __render(video, time, parentAlpha, parentBlendMode) {
    if (this.mVisible === false)
      return;

    this.onRender(video, time);

    let child = null;
    for (var i = 0; i < this.mChildren.length; i++) {
      child = this.mChildren[i];
      child.__render(video, time, parentAlpha, parentBlendMode);
    }
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
    this.mAlpha = Math.clamp(value, 0, 1);
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
    this.mVisible = value;
  }
}
