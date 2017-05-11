/* @echo EXPORT */
class DisplayObject extends GameObject {
  constructor() {
    super();

    /** @type {number} */
    this.mAlpha = 1;

    /** @type {string} */
    this.blendMode = BlendMode.AUTO;

    /** @type {boolean} */
    this.mVisible = true;
  }

  /**
   * __render - Description
   *
   * @param {VideoNullDriver} video           Description
   * @param {number} time            Description
   * @param {number} parentAlpha     Description
   * @param {string} parentBlendMode Description
   *
   * @return {void} Description
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
   * alpha - Description
   *
   * @return {number} Description
   */
  get alpha() {
    return this.mAlpha;
  }

  /**
   * alpha - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set alpha(value) {
    this.mAlpha = Math.clamp(value, 0, 1);
  }


  /**
   * visible - Description
   *
   * @return {boolean} Description
   */
  get visible() {
    return this.mVisible;
  }


  /**
   * visible - Description
   *
   * @param {boolean} value Description
   *
   * @return {void} Description
   */
  set visible(value) {
    this.mVisible = value;
  }
}
