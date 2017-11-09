/* @echo EXPORT */
class SpriteRendererDOM extends DisplayObjectRendererDOM {
  constructor() {
    super();

    this.element = null;

    this.mTransformCache = new Matrix(); //matrix
    this.mUrlCache = '';
    this.mWidthCache = 0;
    this.mHeightCache = 0;
    this.mOpacityCache = 0;
  }

  render(driver) {
    if (this.texture === null)
      return false;

    if (!(this.dirty & DirtyFlag.RENDER))
      return false;

    if (this.visible === false || this.alpha === 0)
      return false;

    if (this.element === null) {
      this.element = driver.__createElement('div', 'sprite');
      this.elements.push(this.element);
    }

    let style = this.element.style;

    if (style.zIndex !== this.zIndex)
      style.zIndex = this.zIndex;

    if (this.mTransformCache.exactEquals(this.transform) !== true) {
      if (this.texture.untrimmedRect.x !== 0 || this.texture.untrimmedRect.y !== 0) {
        Matrix.__cache.set(1, 0, 0, 1, this.texture.untrimmedRect.x, this.texture.untrimmedRect.y);
        this.transform = this.transform.clone().append(Matrix.__cache);
      }

      let v = this.transform.value;

      style.transform = `matrix(${v[0].toFixed(6)}, ${v[1].toFixed(6)}, ${v[2].toFixed(6)}, ${v[3].toFixed(6)}, ${v[4].toFixed(6)}, ${v[5].toFixed(6)})`
      this.transform.copyTo(this.mTransformCache);
    }

    if (this.texture.native.src !== this.mUrlCache) {
      let url = 'url(' + this.texture.native.src + ')';
      this.mUrlCache = this.texture.native.src;
      style.backgroundImage = url;
    }

    if (this.texture.width !== this.mWidthCache) {
      this.mWidthCache = this.texture.width;
      style.width = `${this.mWidthCache}px`;
    }

    if (this.texture.height !== this.mHeightCache) {
      this.mHeightCache = this.texture.height;
      style.height = `${this.mHeightCache}px`;
    }

    if (this.texture.isSubTexture === true) {
      let vBackgroundPosition = `${-this.texture.region.x}px ${-this.texture.region.y}px`;

      if (style.backgroundPosition !== vBackgroundPosition)
        style.backgroundPosition = vBackgroundPosition;
    }

    if (this.mOpacityCache !== this.alpha)
      style.opacity = this.mOpacityCache = this.alpha;

    return true;
  }

  childrenRendered(driver) {
  }

  cleanup(driver) {
    if (this.element === null)
      return;

    driver.__removeElement(this.element);
    this.element = null;
  }
}
