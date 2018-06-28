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
    let dpr = driver.mDevicePixelRatio;

    let desireWidth = texture.width * this.gameObject.mScaleX;
    let desireHeight = texture.height * this.gameObject.mScaleY;

    let sourceX = texture.region.x;
    let sourceY = texture.region.y;
    let sourceWidth = texture.region.width;
    let sourceHeight = texture.region.height;

    let destX = texture.untrimmedRegion.x * dpr;
    let destY = texture.untrimmedRegion.y * dpr;
    let destWidth = texture.renderWidth * dpr;
    let destHeight = texture.renderHeight * dpr;

    let mX = desireWidth / sourceWidth;
    let mY = desireHeight / sourceHeight;

    this.sliceTexture = new CanvasRenderTexture(desireWidth, desireHeight, 1);
    let ctx = this.sliceTexture.renderTarget.context;

    let data = this.gameObject.worldTransformation.data;
    let gameObjectScaleX = this.gameObject.scaleX;
    let gameObjectScaleY = this.gameObject.scaleY;

    let scale = Math.min(gameObjectScaleX, gameObjectScaleY);

    let m = new Matrix(data[0] / gameObjectScaleX, data[1] / gameObjectScaleX, data[2] / gameObjectScaleY, data[3] / gameObjectScaleY, data[4], data[5]);
    driver.setTransform(m);

    let m2 = new Matrix();

    if (scale < 1){
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      desireWidth /= scale;
      desireHeight /= scale;
    }

    const gridLeft = grid.x;
    const gridTop = grid.y;
    const gridRight = sourceWidth - grid.right;
    const gridBottom = sourceHeight - grid.bottom;

    // non-scalabes
    const srcOffsetX = sourceX + sourceWidth - gridRight;
    const dstOffsetX = destX + desireWidth - gridRight;

    const srcOffsetY = sourceY + sourceHeight - gridBottom;
    const dstOffsetY = destY + desireHeight - gridBottom;

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
    const dstRightOffset = destX + desireWidth - gridRight;

    const srcBottomOffset = sourceY + sourceHeight - gridBottom;
    const dstBottomOffset = destY + desireHeight - gridBottom;

    const srcCenterWidth = sourceWidth - gridLeft - gridRight;
    const dstCenterWidth = desireWidth - gridLeft - gridRight;

    const srcCenterHeight = sourceHeight - gridTop - gridBottom;
    const dstCenterHeight = desireHeight - gridTop - gridBottom;

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