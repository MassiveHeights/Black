import { Renderer } from "../Renderer";
import { CanvasRenderTexture } from "../../textures/CanvasRenderTexture";
import { Texture } from "../../textures/Texture";
import { RenderTargetCanvas } from "./RenderTargetCanvas";
import { Matrix } from "../../geom/Matrix";

/**
 * Renders `Sprite` objects on canvas.
 *
 * @extends black-engine~Renderer
 * @cat drivers.canvas
 */

export class SpriteRendererCanvas extends Renderer{
  constructor() {
    super();

    /** @type {CanvasPattern|null} */
    this.pattern = null;

    /** @type {black-engine~Texture|null} */
    this.patternTexture = null;

    /** @type {black-engine~CanvasRenderTexture|null} */
    this.sliceTextureCache = null;

    /** @type {number|null} */
    this.sizeWidthCache = null;

    /** @type {number|null} */
    this.sizeHeightCache = null;

    /** @type {black-engine~Texture} */
    this.textureCache = null;
  }

  /** @inheritDoc */
  preRender(driver, session) {
    let gameObject = /** @type {Sprite} */ (this.gameObject);

    const skip = gameObject.mClipRect !== null && gameObject.mClipRect.isEmpty;

    this.endPassRequired = gameObject.mClipRect !== null && !gameObject.mClipRect.isEmpty;
    this.skipChildren = skip || gameObject.mAlpha <= 0 || gameObject.mVisible === false;
    this.skipSelf = skip || gameObject.mTexture === null || gameObject.mAlpha <= 0 || gameObject.mVisible === false;
  }

  renderSlice9Grid(driver, texture, grid) {
    const dpr = driver.mDevicePixelRatio;
    let desiredWidth = texture.width * this.gameObject.mScaleX;
    let desiredHeight = texture.height * this.gameObject.mScaleY;

    if (this.textureCache === texture && this.sizeWidthCache === desiredWidth && this.sizeHeightCache === desiredHeight)
      return this.sliceTextureCache;

    this.textureCache = texture;
    this.sizeWidthCache = desiredWidth;
    this.sizeHeightCache = desiredHeight;

    const sourceX = texture.region.x;
    const sourceY = texture.region.y;
    const sourceWidth = texture.region.width;
    const sourceHeight = texture.region.height;

    const destX = texture.untrimmedRegion.x * dpr;
    const destY = texture.untrimmedRegion.y * dpr;

    if (this.sliceTextureCache === null)
      this.sliceTextureCache = new CanvasRenderTexture(desiredWidth, desiredHeight, 1 / texture.scale);
    else
      this.sliceTextureCache.resize(desiredWidth, desiredHeight, 1 / texture.scale);

    const ctx = this.sliceTextureCache.renderTarget.context;
    const scale = Math.min(this.gameObject.scaleX, this.gameObject.scaleY);

    if (scale <= 1) {
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      desiredWidth /= scale;
      desiredHeight /= scale;
    }

    const gridLeft = grid.x / texture.scale;
    const gridTop = grid.y / texture.scale;
    const gridRight = sourceWidth - grid.right / texture.scale;
    const gridBottom = sourceHeight - grid.bottom / texture.scale;

    // non-scalable
    const srcOffsetX = sourceX + sourceWidth - gridRight;
    const dstOffsetX = destX + desiredWidth / texture.scale - gridRight;

    const srcOffsetY = sourceY + sourceHeight - gridBottom;
    const dstOffsetY = destY + desiredHeight / texture.scale - gridBottom;

    // top left
    ctx.drawImage(texture.native, sourceX, sourceY, gridLeft, gridTop, destX, destY, gridLeft, gridTop);

    // top right
    ctx.drawImage(texture.native, srcOffsetX, sourceY, gridRight, gridTop, dstOffsetX, destY, gridRight, gridTop);

    // bottom right
    ctx.drawImage(texture.native, srcOffsetX, srcOffsetY, gridRight, gridBottom, dstOffsetX, dstOffsetY, gridRight, gridBottom);

    // bottom left
    ctx.drawImage(texture.native, sourceX, srcOffsetY, gridLeft, gridBottom, destX, dstOffsetY, gridLeft, gridBottom);

    // scalable
    const srcLeftOffset = sourceX + gridLeft;
    const dstLeftOffset = destX + gridLeft;

    const srcTopOffset = sourceY + gridTop;
    const dstTopOffset = destY + gridTop;

    const srcRightOffset = sourceX + sourceWidth - gridRight;
    const dstRightOffset = destX + desiredWidth / texture.scale - gridRight;

    const srcBottomOffset = sourceY + sourceHeight - gridBottom;
    const dstBottomOffset = destY + desiredHeight / texture.scale - gridBottom;

    const srcCenterWidth = sourceWidth - gridLeft - gridRight;
    const dstCenterWidth = desiredWidth / texture.scale - gridLeft - gridRight;

    const srcCenterHeight = sourceHeight - gridTop - gridBottom;
    const dstCenterHeight = desiredHeight / texture.scale - gridTop - gridBottom;

    // top
    ctx.drawImage(texture.native, srcLeftOffset, sourceY, srcCenterWidth, gridTop, dstLeftOffset, destY, dstCenterWidth, gridTop);

    // right
    ctx.drawImage(texture.native, srcRightOffset, srcTopOffset, gridRight, srcCenterHeight, dstRightOffset, dstTopOffset, gridRight, dstCenterHeight);

    // bottom
    ctx.drawImage(texture.native, srcLeftOffset, srcBottomOffset, srcCenterWidth, gridBottom, dstLeftOffset, dstBottomOffset, dstCenterWidth, gridBottom);

    // left
    ctx.drawImage(texture.native, sourceX, srcTopOffset, gridLeft, srcCenterHeight, destX, dstTopOffset, gridLeft, dstCenterHeight);

    //center
    ctx.drawImage(texture.native, srcLeftOffset, srcTopOffset, srcCenterWidth, srcCenterHeight, dstLeftOffset, dstTopOffset, dstCenterWidth, dstCenterHeight);

    return this.sliceTextureCache;
  }

  /** @inheritDoc */
  render(driver, session) {
    let ctx = /** @type {CanvasDriver}*/ (driver).mCtx;
    let gameObject = /** @type {Sprite} */ (this.gameObject);

    let texture = Renderer.getColoredTexture(gameObject.mTexture, this.color);

    if (gameObject.mSlice9grid !== null) {
      const data = this.gameObject.worldTransformation.data;
      const m = Matrix.pool.get().set(data[0] / this.gameObject.scaleX, data[1] / this.gameObject.scaleX, data[2] / this.gameObject.scaleY, data[3] / this.gameObject.scaleY, data[4], data[5]);
      driver.setTransform(m);
      Matrix.pool.release(m);

      texture = this.renderSlice9Grid(driver, texture, gameObject.mSlice9grid);
    }

    if (gameObject.mTiling === null) {
      driver.drawTexture(texture);
    } else {
      // we got some tiling
      if (this.pattern === null || this.patternTexture !== texture) {
        const renderCanvas = new RenderTargetCanvas(texture.width, texture.height);
        const r = texture.region;
        const u = texture.untrimmedRegion;
        renderCanvas.context.drawImage(texture.native, r.x, r.y, r.width, r.height, u.x, u.y, r.width, r.height);

        this.pattern = ctx.createPattern(renderCanvas.native, 'repeat');
        this.patternTexture = texture;
      }

      ctx.fillStyle = /** @type {CanvasPattern} */(this.pattern);

      let dpr = driver.renderScaleFactor;

      let m = gameObject.worldTransformation.clone();
      m.scale(gameObject.tiling.scaleX * dpr, gameObject.tiling.scaleY * dpr);
      m.translate(gameObject.tiling.wrapX / dpr, gameObject.tiling.wrapY / dpr);

      driver.setTransform(m);

      // draw pattern
      ctx.fillRect(-gameObject.tiling.wrapX, -gameObject.tiling.wrapY, gameObject.tiling.width / gameObject.tiling.scaleX, gameObject.tiling.height / gameObject.tiling.scaleY);
      ctx.fillStyle = 'black';
    }
  }
}
