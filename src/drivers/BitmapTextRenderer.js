/**
 * Responsible for rendering `BitmapTextField` objects by different drivers.
 *
 * @extends Renderer
 * @cat drivers
 */
/* @echo EXPORT */
class BitmapTextRenderer extends Renderer {
  /**
   * Creates new instance of BitmapTextRenderer.
   */
  constructor() {
    super();

    /** @ignore @type {string|null} */
    this.text = null;

    /** @ignore @type {BitmapFontData} */
    this.data = null;

    /** @ignore @type {boolean} */
    this.multiline = false;

    /** @ignore @type {boolean} */
    this.autoSize = false;

    /** @type {number} @ignore */
    this.fieldWidth = 0;

    /** @type {number} @ignore */
    this.fieldHeight = 0;

    /** @ignore @type {Rectangle} */
    this.bounds = new Rectangle(0, 0, 0, 0);

    /** @type {number} @ignore */
    this.lineHeight = 0;

    /** @ignore @private @type {Matrix} */
    this.__transformCache = new Matrix();

    /** @ignore @private @type {HTMLCanvasElement} */
    this.__canvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));

    /** @ignore @private @type {CanvasRenderingContext2D} */
    this.__context = /** @type {CanvasRenderingContext2D} */ (this.__canvas.getContext('2d'));
  }

  /**
   * @inheritDoc
   */
  render(driver) {
    if (this.text === null)
      return;

    const cvs = this.__canvas;
    const ctx = this.__context;

    let canvasBounds = this.bounds.clone();

    let prevCharCode = null;
    let cx = 0;
    let cy = 0;

    if (this.dirty & DirtyFlag.RENDER_CACHE) {
      cvs.width = canvasBounds.width;
      cvs.height = canvasBounds.height;

      for (let i = 0; i < this.text.length; i++) {
        let charCode = this.text.charCodeAt(i);

        if (/(?:\r\n|\r|\n)/.test(this.text.charAt(i))) {
          cx = 0;
          cy += this.data.lineHeight * this.lineHeight;
          prevCharCode = null;
          continue;
        }

        let charData = this.data.chars[charCode];

        if (charData == null)
          continue;

        let texture = charData.texture;

        if (prevCharCode && charData.kerning[prevCharCode])
          cx += charData.kerning[prevCharCode];

        const w = texture.width;
        const h = texture.height;
        const ox = texture.untrimmedRegion.x + charData.xOffset + cx;
        const oy = texture.untrimmedRegion.y + charData.yOffset + cy;

        ctx.drawImage(texture.native, texture.region.x, texture.region.y, w, h, ~~ox, ~~oy, w, h);

        cx += charData.xAdvance;
        prevCharCode = charCode;
      }

      if (this.texture === null)
        this.texture = new Texture(cvs);
      else
        this.texture.set(cvs);
    }
  }

  /**
   * @inheritDoc
   */
  getTransform() {
    return this.transform;
  }

  /**
   * @inheritDoc
   */
  get isRenderable() {
    return this.text !== null;
  }
}