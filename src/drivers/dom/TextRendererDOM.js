/* @echo EXPORT */
class TextRendererDOM extends TextRenderer {
  constructor() {
    super();

    this.element = null;

    this.mTransformCache = new Matrix(); //matrix
    this.mUrlCache = '';
    this.mWidthCache = 0;
    this.mHeightCache = 0;
    this.mOpacityCache = 0;
  }

  __createElement(driver, className) {
    let element = document.createElement('img');
    element.className = className;
    driver.mContainerElement.appendChild(element);
    return element;
  }

  render(driver) {
    if (this.element === null)
      this.element = driver.__createElement('img', 'sprite');

    if (this.dirty & DirtyFlag.RENDER_CACHE) {
      super.render(driver);

      let url = 'url(' + this.__canvas.toDataURL('image/jpeg', 0.5) + ')';
      this.element.src = this.__canvas.toDataURL();
    }

    if (this.dirty & DirtyFlag.RENDER) {
      let style = this.element.style;

      if (this.visible == false || this.alpha <= 0) {
        style.display = 'none';
        return;
      } else {
        if (style.display === 'none')
          style.display = 'block';
      }

      if (style.zIndex !== this.zIndex)
        style.zIndex = this.zIndex;

      if (this.mTransformCache.exactEquals(this.transform) !== true) {
        if (this.texture.untrimmedRegion.x !== 0 || this.texture.untrimmedRegion.y !== 0) {
          Matrix.__cache.set(1, 0, 0, 1, this.texture.untrimmedRegion.x, this.texture.untrimmedRegion.y);
          this.transform = this.transform.clone().append(Matrix.__cache);
        }

        let v = this.transform.value;

        style.transform = `matrix(${v[0].toFixed(6)}, ${v[1].toFixed(6)}, ${v[2].toFixed(6)}, ${v[3].toFixed(6)}, ${v[4].toFixed(6)}, ${v[5].toFixed(6)})`;
        this.mTransformCache = this.transform;
      }

      if (this.texture.width !== this.mWidthCache) {
        this.mWidthCache = this.texture.width;
        style.width = `${this.mWidthCache}px`;
      }

      if (this.texture.height !== this.mHeightCache) {
        this.mHeightCache = this.texture.height;
        style.height = `${this.mHeightCache}px`;
      }
    }
  }
}
