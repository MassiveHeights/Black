/**
 * Renders `Sprite` objects on canvas.
 *
 * @extends Renderer
 * @cat drivers.canvas
 */

/* @echo EXPORT */
class SpriteRendererCanvas extends Renderer {
  constructor() {
    super();

    /** @type {CanvasPattern|null} */
    this.pattern = null;

    /** @type {Texture|null} */
    this.patternTexture = null;

    /** @type {Texture|null} */
    this.sliceTextureCache = null;

    /** @type {number|null} */
    this.sizeWidthCache = null;

    /** @type {number|null} */
    this.sizeHeightCache = null;
  }

  /** @inheritDoc */
  preRender(driver, session) {
    let gameObject = /** @type {Sprite} */ (this.gameObject);

    this.endPassRequired = gameObject.mClipRect !== null && gameObject.mClipRect.isEmpty === false;
    this.skipChildren = gameObject.mAlpha <= 0 || gameObject.mVisible === false || gameObject.mIsMask === true || (gameObject.mMask !== null && session.isMasking === true);
    this.skipSelf = gameObject.mTexture === null || gameObject.mAlpha <= 0 || gameObject.mVisible === false || gameObject.mIsMask === true;
  }

  renderSlice9Grid(driver, texture, grid) {
    const dpr = driver.mDevicePixelRatio;
    let desiredWidth = texture.width * this.gameObject.mScaleX;
    let desiredHeight = texture.height * this.gameObject.mScaleY;

    if (this.sizeWidthCache === desiredWidth && this.sizeHeightCache === desiredHeight) {
      return this.sliceTextureCache;
    }

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


    // if (super.checkMask(driver, session)) {
    //   super.renderMask(driver, session);
    //   return;
    // }

    // if (gameObject.mMask !== null && gameObject.mMask.mAdded && session.isMasking === false) {
    //   const sf = Black.stage.scaleFactor;

    //   let leftBounds = gameObject.bounds;
    //   let left = new CanvasRenderTexture(leftBounds.width, leftBounds.height, 1);

    //   let rightBounds = gameObject.mMask.bounds;
    //   let right = new CanvasRenderTexture(rightBounds.width, rightBounds.height, 1);

    //   let leftMatrix = new Matrix();
    //   leftMatrix.set(1, 0, 0, 1, ~~(-leftBounds.x * sf - Black.stage.mX), ~~(-leftBounds.y * sf - Black.stage.mY));

    //   let rightMatrix = new Matrix();
    //   rightMatrix.set(1, 0, 0, 1, ~~(-rightBounds.x * sf - Black.stage.mX), ~~(-rightBounds.y * sf - Black.stage.mY));

    //   driver.render(gameObject, left, leftMatrix, true);
    //   driver.render(gameObject.mMask, right, rightMatrix, true);

    //   let transform = gameObject.worldTransformation;

    //   driver.setTransform(gameObject.mMask.worldTransformation);
    //   driver.drawTexture(right);

    //   driver.setGlobalBlendMode(BlendMode.MASK);

    //   driver.setTransform(transform);
    //   driver.drawTexture(left);

    //   return;
    // }


    let texture = Renderer.getColoredTexture(gameObject.mTexture, this.color);

    if (gameObject.mSlice9grid !== null) {
      const data = this.gameObject.worldTransformation.data;
      const m = Matrix.pool.get().set(data[0] / this.gameObject.scaleX, data[1] / this.gameObject.scaleX, data[2] / this.gameObject.scaleY, data[3] / this.gameObject.scaleY, data[4], data[5]);
      driver.setTransform(m);
      Matrix.pool.release(m);

      texture = this.renderSlice9Grid(driver, texture, gameObject.mSlice9grid);
    }

    if (gameObject.mTiling === null) {
      driver.drawTexture(Renderer.getColoredTexture(texture, this.color));
    } else {
      // we got some tiling

      //let rt = new CanvasRenderTexture(desireWidth, desireHeight, 1 / texture.scale);
      //if (gameObject.checkStatic(false) === true){
      // render directly to backbuffer
      //}

      if (this.pattern === null || this.patternTexture !== texture) {
        const renderCanvas = new RenderTargetCanvas(texture.width, texture.height);
        const r = texture.region;
        const u = texture.untrimmedRegion;
        renderCanvas.context.drawImage(texture.native, r.x, r.y, r.width, r.height, u.x, u.y, r.width, r.height);

        this.pattern = ctx.createPattern(renderCanvas.native, 'repeat');
        this.patternTexture = texture;
      }

      ctx.fillStyle = this.pattern;

      let dpr = driver.mDPR;

      let m = gameObject.worldTransformation.clone();
      m.scale(gameObject.tiling.scaleX * dpr, gameObject.tiling.scaleY * dpr);
      m.translate(gameObject.tiling.wrapX / dpr, gameObject.tiling.wrapY / dpr);

      driver.setTransform(m);

      // draw pattern
      ctx.fillRect(-gameObject.tiling.wrapX, -gameObject.tiling.wrapY, gameObject.tiling.width / gameObject.tiling.scaleX, gameObject.tiling.height / gameObject.tiling.scaleY);
    }
  }
}
