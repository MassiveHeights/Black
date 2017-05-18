/* @echo EXPORT */
class DOMDriver extends VideoNullDriver {
  /**
   * @param  {HTMLElement} containerElement description
   * @param  {number} width            description
   * @param  {number} height           description
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    /** @type {number} */
    this.mGlobalAlpha = 1;

    /** @type {Array<Element>} */
    this.mCache = [];

    /** @type {number} */
    this.mCounter = 0;

    /** @type {boolean} */
    this.mPixelated = true;

    /** @type {GameObject|null} */
    this.mCurrentObject = null;
    this.__initCSS();
  }

  /**
   * save - Description
   *
   * @override
   * @param {GameObject|null} gameObject Used for internal binding.
   *
   * @return {void} Description
   */
  save(gameObject) {
    this.mCurrentObject = gameObject;
  }

  /**
   * __initCSS - description
   *
   * @return {void}  description
   */
  __initCSS() {
    let imgRendering = 'image-rendering:optimizeSpeed; image-rendering:optimize-contrast; image-rendering:crisp-edges; image-rendering:pixelated';

    let sSprite = document.createElement('style');
    sSprite.type = 'text/css';
    sSprite.innerHTML = '.sprite { position: absolute; background-repeat: no-repeat; cursor: default !important; -webkit-transform-origin: 0px 0px;}';
    document.getElementsByTagName('head')[0].appendChild(sSprite);

    let sSpritePixelated = document.createElement('style');
    sSpritePixelated.type = 'text/css';
    sSpritePixelated.innerHTML = '.sprite-p { position: absolute; background-repeat: no-repeat; cursor: default !important; -webkit-transform-origin: 0px 0px; ' + imgRendering + '}';
    document.getElementsByTagName('head')[0].appendChild(sSpritePixelated);

    let sText = document.createElement('style');
    sText.type = 'text/css';
    sText.innerHTML = '.text { position: absolute; white-space: pre; overflow: hidden; cursor: default !important; -webkit-transform-origin: 0px 0px;}';
    document.getElementsByTagName('head')[0].appendChild(sText);

    let sViewport = document.createElement('style');
    sViewport.type = 'text/css';
    sViewport.innerHTML = '.viewport { width: 100%; height: 100%; position: relative; overflow: hidden; cursor: default; }';
    document.getElementsByTagName('head')[0].appendChild(sViewport);

    this.mContainerElement.className = 'viewport';
  }

  /**
   * beginFrame - description
   *
   * @return {void}  description
   */
  beginFrame() {
    this.mCounter = 0;
  }

  /**
   * endFrame - description
   *
   * @return {void}  description
   */
  endFrame() {
    if (this.mCounter === this.mCache.length)
      return;

    //TODO: cleanup unused divs
    //TODO: remove them instead of hiding
    for (let i = this.mCounter; i < this.mCache.length; i++) {
      let el = this.mCache[i];

      el.parentNode.removeChild(el);
    }

    this.mCache.splice(this.mCounter);
  }

  /**
   * getTextureFromCanvas - Description
   *
   * @param {HTMLElement} canvas Description
   *
   * @return {Texture|null} Description
   */
  getTextureFromCanvas(canvas) {
    return Texture.fromCanvasAsImage(canvas);
  }

  /**
   * drawImage - description
   *
   * @param  {Texture} texture description
   * @return {void}         description
   */
  drawImage(texture) {
    /** @type {Matrix|null} */
    let oldTransform = this.mTransform;
    let localBounds = Rectangle.__cache;
    this.mCurrentObject.onGetLocalBounds(localBounds);

    if (texture.untrimmedRect.x !== 0 || texture.untrimmedRect.y !== 0) {
      Matrix.__cache.set(1, 0, 0, 1, localBounds.x, localBounds.y);
      this.mTransform.append(Matrix.__cache);
    }

    let el = this.__popElement(this.mPixelated ? 'sprite-p' : 'sprite');
    this.__updateElementCommon(el);
    this.__updateImageElement(el, texture);

    this.mTransform = oldTransform;
  }

  /**
   * drawText - description
   *
   * @override
   * @param {string} text
   * @param {TextInfo} style
   * @param {Rectangle} bounds
   * @param {number} textWidth
   * @param {number} textHeight
   *
   * @return {void}                      description
   */
  drawText(text, style, bounds, textWidth, textHeight) {
    let el = this.__popElement('text');
    this.__updateElementCommon(el);

    // TODO: check this type. review the code.
    this.__updateTextElement( /** @type {HTMLElement} */ (el), text, style, bounds);
  }

  /**
   * __popElement - Description
   *
   * @param {string} className Description
   *
   * @return {Element} Description
   */
  __popElement(className) {
    this.mCounter++;

    if (this.mCounter <= this.mCache.length)
      return this.mCache[this.mCounter - 1];

    let el = document.createElement('div');
    el.className = className;
    this.mContainerElement.appendChild(el);

    this.mCache.push(el);
    return (el);
  }

  /**
   * __updateElementCommon - Description
   *
   * @param {Element} el Description
   *
   * @return {void} Description
   */
  __updateElementCommon(el) {
    let v = this.mTransform.value;

    // TODO: slow, rework
    // NOTE: toFixed(0) is faster then toFixed(6)
    let transform = `matrix(${v[0].toFixed(6)}, ${v[1].toFixed(6)}, ${v[2].toFixed(6)}, ${v[3].toFixed(6)}, ${v[4].toFixed(6)}, ${v[5].toFixed(6)})`;
    //let transform = `matrix(${v[0]}, ${v[1]}, ${v[2]}, ${v[3]}, ${v[4]}, ${v[5]})`;

    //console.log(el.style.transform, transform);
    if (el.style.webkitTransform !== transform)
      el.style.webkitTransform = transform;

    //el.style.transform = transform;

    //if (el.style.opacity != this.mGlobalAlpha)
    el.style.opacity = this.mGlobalAlpha; // would be faster to not compare string and int

    //if (el.style.backgroundImage !== '') {
    //el.style.backgroundImage = '';
    //console.log('reset img');
    //}

    // if (el.style.width !== null)
    //   el.style.width = null;
    //
    // if (el.style.height !== null)
    //   el.style.height = null;

    // if (el.style.display === 'none')
    //   el.style.display = 'block';
  }

  /**
   * __updateImageElement - description
   *
   * @param  {Element} el      description
   * @param  {Texture} texture description
   * @return {void}         description
   */
  __updateImageElement(el, texture) {
    if (texture) {
      let url = 'url(' + texture.native.src + ')';

      if (el.style.backgroundImage !== url)
        el.style.backgroundImage = url;

      if (texture.isSubTexture) {
        let vBackgroundPosition = `${-texture.region.x}px ${-texture.region.y}px`;

        if (el.style.backgroundPosition !== vBackgroundPosition)
          el.style.backgroundPosition = vBackgroundPosition;
      }
    } else {
      el.style.backgroundImage = 'none';
    }

    if (el.style.width != texture.width + 'px')
      el.style.width = texture.width + 'px';

    if (el.style.height != texture.height + 'px')
      el.style.height = texture.height + 'px';

    if (el.innerHTML !== '')
      el.innerHTML = '';
  }

  /**
   * __updateTextElement - Description
   *
   * @param {HTMLElement} el     Description
   * @param {string} text   Description
   * @param {TextInfo} style  Description
   * @param {Rectangle} bounds Description
   *
   * @return {void} Description
   */
  __updateTextElement(el, text, style, bounds) {
    el.innerHTML = text;
    el.style.fontSize = style.size + 'px';

    if (el.style.width !== bounds.width + 'px')
      el.style.width = bounds.width + 'px';

    if (el.style.height !== bounds.height + 'px')
      el.style.height = bounds.height + 'px';

    if (el.style.fontFamily !== style.name)
      el.style.fontFamily = style.name;

    let color = this.hexColorToString(style.color);

    if (el.style.color != color)
      el.style.color = color;

    if (el.style.fontStyle !== style.style)
      el.style.fontStyle = style.style;

    if (el.style.fontWeight != style.weight)
      el.style.fontWeight = style.weight;

    if (el.style.textAlign !== style.align)
      el.style.textAlign = style.align;

    if (style.strokeThickness > 0) {
      let strokeColor = this.hexColorToString(style.strokeColor);

      if (el.style.webkitTextStrokeColor != strokeColor)
        el.style.webkitTextStrokeColor = strokeColor;

      if (el.style.webkitTextStrokeWidth != style.strokeThickness + 'px') {
        el.style.webkitTextStrokeWidth = style.strokeThickness + 'px';
      }
    }

    if (el.style.backgroundImage !== 'none')
      el.style.backgroundImage = 'none';
  }
}
