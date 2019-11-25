import { Renderer } from "./Renderer";
import { DirtyFlag } from "../core/DirtyFlag";
import { Texture } from "../textures/Texture";

/**
 * Responsible for rendering `BitmapTextField` objects by different drivers.
 *
 * @extends black-engine~Renderer
 * @cat drivers
 */
export class BitmapTextRenderer extends Renderer {
  /**
   * Creates new instance of BitmapTextRenderer.
   */
  constructor() {
    super();

    /** 
     * @ignore 
     * @private 
     * @type {HTMLCanvasElement} 
     */
    this.mCanvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));

    /** 
     * @ignore 
     * @private 
     * @type {CanvasRenderingContext2D} 
     */
    this.mContext = /** @type {CanvasRenderingContext2D} */ (this.mCanvas.getContext('2d'));

    /** 
     * @ignore 
     * @type {black-engine~Texture|null} 
     */
    this.texture = null;
  }

  /**
   * @inheritDoc
   */
  render(driver, session) {
    let gameObject = /** @type {BitmapTextField} */ (this.gameObject);

    if (gameObject.mText === null)
      return;

    if (gameObject.mDirty & DirtyFlag.RENDER_CACHE) {
      const cvs = this.mCanvas;
      const ctx = this.mContext;

      let data = gameObject.mData;
      let text = gameObject.mText;
      let canvasBounds = gameObject.onGetLocalBounds();

      // remove dirty flag only after getting bounds
      gameObject.mDirty ^= DirtyFlag.RENDER_CACHE;

      let prevCharCode = -1;
      let cx = 0;
      let cy = 0;

      cvs.width = canvasBounds.width;
      cvs.height = canvasBounds.height;

      for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);

        if (/(?:\r\n|\r|\n)/.test(text.charAt(i))) {
          cx = 0;
          cy += data.lineHeight * gameObject.mLineHeight;
          prevCharCode = -1;
          continue;
        }

        let charData = data.chars[charCode];

        if (charData == null)
          continue;

        let texture = charData.texture;

        if (prevCharCode >= 0 && charData.kerning[prevCharCode])
          cx += charData.kerning[prevCharCode];

        const w = texture.width;
        const h = texture.height;

        // skip empty char (space for example)
        if (w === 0 || h === 0)
          continue

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
}