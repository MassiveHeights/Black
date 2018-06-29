/**
 * Renders `Sprite` objects on canvas.
 *
 * @extends DisplayObjectRendererCanvas
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class SpriteRendererCanvas extends Renderer {
  constructor() {
    super();

    this.pattern = null;
    this.patternTexture = null;
    this.sliceTexture = null;
  }

  /** @inheritDoc */
  preRender(driver, session) {
    let gameObject = /** @type {Sprite} */ (this.gameObject);

    this.endPassRequired = gameObject.mClipRect !== null && gameObject.mClipRect.isEmpty === false;
    this.skipChildren = gameObject.mAlpha <= 0 || gameObject.mVisible === false;
    this.skipSelf = gameObject.mTexture === null || this.skipChildren === true;
  }

  renderSlice9Grid(driver, texture, grid) {
    const dpr = driver.mDevicePixelRatio;

    let desireWidth = texture.width * this.gameObject.mScaleX;
    let desireHeight = texture.height * this.gameObject.mScaleY;

    const sourceX = texture.region.x;
    const sourceY = texture.region.y;
    const sourceWidth = texture.region.width;
    const sourceHeight = texture.region.height;

    const destX = texture.untrimmedRegion.x * dpr;
    const destY = texture.untrimmedRegion.y * dpr;
    const destWidth = texture.renderWidth * dpr;
    const destHeight = texture.renderHeight * dpr;

    this.sliceTexture = new CanvasRenderTexture(desireWidth, desireHeight, 1 / texture.scale);
    const ctx = this.sliceTexture.renderTarget.context;

    const data = this.gameObject.worldTransformation.data;
    const scale = Math.min(this.gameObject.scaleX, this.gameObject.scaleY);

    const m = Matrix.pool.get().set(data[0] / this.gameObject.scaleX, data[1] / this.gameObject.scaleX, data[2] / this.gameObject.scaleY, data[3] / this.gameObject.scaleY, data[4], data[5]);
    driver.setTransform(m);
    Matrix.pool.release(m);

    if (scale < 1) {
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      desireWidth /= scale;
      desireHeight /= scale;
    }

    const gridLeft = grid.x / texture.scale;
    const gridTop = grid.y / texture.scale;
    const gridRight = sourceWidth - grid.right / texture.scale;
    const gridBottom = sourceHeight - grid.bottom / texture.scale;

    // non-scalabes
    const srcOffsetX = sourceX + sourceWidth - gridRight;
    const dstOffsetX = destX + desireWidth / texture.scale - gridRight;

    const srcOffsetY = sourceY + sourceHeight - gridBottom;
    const dstOffsetY = destY + desireHeight / texture.scale - gridBottom;

    // top left
    ctx.drawImage(texture.native, sourceX, sourceY, gridLeft, gridTop, destX, destY, gridLeft, gridTop);

    // top right
    ctx.drawImage(texture.native, srcOffsetX, sourceY, gridRight, gridTop, dstOffsetX, destY, gridRight, gridTop);

    // bottom right
    ctx.drawImage(texture.native, srcOffsetX, srcOffsetY, gridRight, gridBottom, dstOffsetX, dstOffsetY, gridRight, gridBottom);

    // bottom left
    ctx.drawImage(texture.native, sourceX, srcOffsetY, gridLeft, gridBottom, destX, dstOffsetY, gridLeft, gridBottom);

    // scalables
    const srcLeftOffset = sourceX + gridLeft;
    const dstLeftOffset = destX + gridLeft;

    const srcTopOffset = sourceY + gridTop;
    const dstTopOffset = destY + gridTop;

    const srcRightOffset = sourceX + sourceWidth - gridRight;
    const dstRightOffset = destX + desireWidth / texture.scale - gridRight;

    const srcBottomOffset = sourceY + sourceHeight - gridBottom;
    const dstBottomOffset = destY + desireHeight / texture.scale - gridBottom;

    const srcCenterWidth = sourceWidth - gridLeft - gridRight;
    const dstCenterWidth = desireWidth / texture.scale - gridLeft - gridRight;

    const srcCenterHeight = sourceHeight - gridTop - gridBottom;
    const dstCenterHeight = desireHeight / texture.scale - gridTop - gridBottom;

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

    return this.sliceTexture;
  }

  /** @inheritDoc */
  render(driver, session) {
    let gameObject = /** @type {Sprite} */ (this.gameObject);

    let texture = Renderer.getColoredTexture(gameObject.mTexture, this.color);
    if (gameObject.mSlice9grid !== null) {
      texture = this.renderSlice9Grid(driver, texture, gameObject.mSlice9grid);
    }

    if (gameObject.tiling === null) {
      driver.drawTexture(Renderer.getColoredTexture(texture, this.color));
      return;
    }
    let ctx = driver.mCtx;
    if (this.pattern === null || this.patternTexture !== texture) {
      this.pattern = ctx.createPattern(texture.native, 'repeat');
      this.patternTexture = texture;
    }

    // if tiling
    ctx.fillStyle = this.pattern;

    let dpr = driver.mDPR;

    let m = gameObject.worldTransformation.clone();
    m.scale(gameObject.tiling.scaleX * dpr, gameObject.tiling.scaleY * dpr)
    m.translate(gameObject.tiling.wrapX / dpr, gameObject.tiling.wrapY / dpr);
    driver.setTransform(m);

    ctx.fillRect(-gameObject.tiling.wrapX, -gameObject.tiling.wrapY, gameObject.tiling.width / gameObject.tiling.scaleX, gameObject.tiling.height / gameObject.tiling.scaleY);
    //console.log('123');
  }
}