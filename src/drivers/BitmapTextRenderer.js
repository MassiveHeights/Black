/* @echo EXPORT */
class BitmapTextRenderer extends Renderer {
  constructor() {
    super();

    this.text = null;
    this.data = null;
    this.multiline = false;
    this.autoSize = false;
    this.bounds = new Rectangle(0, 0, 0, 0);

    this.__transformCache = new Matrix();
    this.__canvas = document.createElement('canvas');
    this.__context = this.__canvas.getContext('2d');
  }

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
        const ox = texture.untrimmedRect.x + charData.xOffset + cx;
        const oy = texture.untrimmedRect.y + charData.yOffset + cy;

        ctx.drawImage(texture.native, texture.region.x, texture.region.y, w, h, ~~ox, ~~oy, w, h);

        cx += charData.xAdvance;
        prevCharCode = charCode;
      }

      if (this.texture === null)
        this.texture = new Texture(cvs);
      else
        this.texture.update(cvs);
    }
  }

  getTransform() {
    return this.transform;
  }
}