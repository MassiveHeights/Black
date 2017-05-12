/* @echo EXPORT */
class VideoNullDriver {
  /**
   * @param  {HTMLElement} containerElement description
   * @param  {number} width            description
   * @param  {number} height           description
   */
  constructor(containerElement, width, height) {
    /** @type {string} */
    this.mGlobalBlendMode = 'auto';

    /** @type {HTMLElement} */
    this.mContainerElement = /** @type {HTMLElement} */ (containerElement);

    /** @type {number} */
    this.mClientWidth = width;

    /** @type {number} */
    this.mClientHeight = height;

    /** @type {Matrix} */
    this.mTransform = new Matrix();

    /** @type {number} */
    this.mGlobalAlpha = 1;

    /** @type {HTMLElement} */
    this.mMeasureElement = /** @type {HTMLElement} */ (document.createElement('span'));
    this.mMeasureElement.style.position = 'absolute';
    this.mContainerElement.appendChild(this.mMeasureElement);

    Black.instance.viewport.on('resize', this.__onResize, this);
  }

  __onResize(msg, rect) {
    let w = this.mContainerElement.clientWidth;
    let h = this.mContainerElement.clientHeight;

    this.mClientWidth = w;
    this.mClientHeight = h;
  }

  /**
   * start - Description
   *
   * @return {void} Description
   */
  start() {}

  beginFrame() {}

  endFrame() {}


  /**
   * getTextureFromCanvas - Description
   *
   * @param {HTMLElement} canvas Description
   *
   * @return {Texture|null} Description
   */
  getTextureFromCanvas(canvas){
    return null;
  }

  /**
   * setTransform - Description
   *
   * @param {Matrix} m Description
   *
   * @return {void} Description
   */
  setTransform(m) {
    this.mTransform = m;
  }

  /**
   * globalAlpha - Description
   *
   * @return {number} Description
   */
  get globalAlpha() {
    return this.mGlobalAlpha;
  }

  /**
   * globalAlpha - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set globalAlpha(value) {
    this.mGlobalAlpha = value;
  }

  /**
   * mGlobalBlendMode - Description
   *
   * @return {string} Description
   */
  get globalBlendMode() {
    return this.mGlobalBlendMode;
  }

  /**
   * globalBlendMode - Description
   *
   * @param {string} value Description
   *
   * @return {void} Description
   */
  set globalBlendMode(value) {
    this.mGlobalBlendMode = value;
  }

  /**
   * drawImage - description
   *
   * @param  {Texture} texture description
   */
  drawImage(texture) {}

  /**
   * drawText
   *
   * @param {string} text
   * @param {TextInfo} style
   * @param {Rectangle} bounds
   * @param {number} textWidth
   * @param {number} textHeight
   *
   * @return {void}
   */
  drawText(text, style, bounds, textWidth, textHeight) {}

  clear() {}

  /**
   * save - Description
   *
   * @param {GameObject|null} gameObject Used for internal binding.
   *
   * @return {void} Description
   */
  save(gameObject) {}

  restore() {}

  hexColorToString(color) {
    let parsedColor = color.toString(16);
    return '#000000'.substring(0, 7 - parsedColor.length) + parsedColor;
  }

  /**
   * measureText - Description
   *
   * @param {string} text  Description
   * @param {TextInfo} style Description
   *
   * @return {Vector} Description
   */
  measureText(text, style) {
    let el = this.mMeasureElement;
    el.innerHTML = text;
    el.style.whiteSpace = 'pre';
    el.style.fontSize = style.size + 'px';
    el.style.fontFamily = style.name;
    el.style.fontStyle = style.style;
    el.style.fontWeight = style.weight;

    let v = new Vector(el.offsetWidth + style.strokeThickness, el.offsetHeight + style.strokeThickness);
    el.innerHTML = '';

    return v;
  }
}
