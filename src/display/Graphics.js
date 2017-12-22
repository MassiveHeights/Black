/* @echo EXPORT */
class Graphics extends DisplayObject {
  constructor() {
    super();

    this.lineColor = 0;
    this.lineAlpha = 1.0;
    this.lineWidth = 0;

    this.fillColor = 0;
    this.fillAlpha = 1.0;

    this.mCaps = CapsStyle.NONE;
    this.mJoints = JointStyle.MITER;
    this.mMiterLimit = 3;

    this.mBounds = new Rectangle();

    this.mCommandQueue = [];
  }

  get halfLineWidth() {
    return this.lineWidth / 2;
  }

  getRenderer() {
    return Black.instance.video.getRenderer('Graphics');
  }

  onRender(driver, parentRenderer, isBackBufferActive) {
    let renderer = this.mRenderer;

    if (this.mDirty & DirtyFlag.RENDER) {
      renderer.transform = this.finalTransformation;
      renderer.commands = this.mCommandQueue;
      renderer.alpha = this.mAlpha * parentRenderer.alpha;
      renderer.blendMode = this.blendMode === BlendMode.AUTO ? parentRenderer.blendMode : this.blendMode;
      renderer.visible = this.mVisible;
      renderer.dirty = this.mDirty;
      renderer.pivotX = this.mPivotX;
      renderer.pivotY = this.mPivotY;
      renderer.clipRect = this.mClipRect;
      renderer.bounds = this.mBounds;
      renderer.snapToPixels = this.mSnapToPixels;

      this.mDirty ^= DirtyFlag.RENDER;
    }

    return driver.registerRenderer(renderer);
  }

  // TODO: what about correct bounds? Shape-perfect instead of aabb?
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (!this.mTexture)
      return outRect;

    if (this.mClipRect !== null) {
      this.mClipRect.copyTo(outRect);
      outRect.y += this.mPivotX;
      outRect.y += this.mPivotY;
    } else {
      outRect.set(0, 0, this.mTexture.renderWidth, this.mTexture.renderHeight);
    }

    return outRect;
  }

  lineStyle(lineWidth = 0, color = 0, alpha = 1, caps = CapsStyle.NONE, joints = JointStyle.MITER, miterLimit = 3) {
    this.lineWidth = lineWidth;
    this.lineColor = color;
    this.lineAlpha = alpha;
    this.caps = caps;
    this.joints = joints;
    this.miterLimit = 3;
  }

  fillStyle(color = 0, alpha = 1) {
    this.fillColor = color;
    this.fillAlpha = alpha;
  }

  clear() {
    this.lineColor = 0;
    this.lineAlpha = 1.0;
    this.lineWidth = 0;

    this.fillColor = 0;
    this.fillAlpha = 1.0;

    this.mBounds.zero();

    this.mCommandQueue.splice(0, this.mCommandQueue.length);
    this.setTransformDirty();
  }

  drawLine(x1, y1, x2, y2) {
    this.__inflateBounds(x1 - this.halfLineWidth, y1 - this.halfLineWidth);
    this.__inflateBounds(x1 + this.halfLineWidth, y1 + this.halfLineWidth);

    this.__inflateBounds(x2 - this.halfLineWidth, y2 - this.halfLineWidth);
    this.__inflateBounds(x2 + this.halfLineWidth * 2, y2 + this.halfLineWidth);

    this.__pushCommand(GraphicsCommandType.LINE, x1, y1, x2, y2);
    this.setTransformDirty();
  }

  drawRect(x, y, width, height) {
    this.__inflateBounds(x - this.halfLineWidth, y - this.halfLineWidth);
    this.__inflateBounds(x + width + this.halfLineWidth, y + height + this.halfLineWidth);
    this.__pushCommand(GraphicsCommandType.RECTANGLE, x, y, width, height);
    this.setTransformDirty();
  }

  drawCircle(x, y, radius) {
    this.__inflateBounds(x - radius - this.halfLineWidth, y - radius - this.halfLineWidth);
    this.__inflateBounds(x + radius + this.halfLineWidth, y + radius + this.halfLineWidth);

    this.__pushCommand(GraphicsCommandType.CIRCLE, x, y, radius);
    this.setTransformDirty();
  }

  __inflateBounds(x, y) {
    if (x < this.mBounds.x) {
      this.mBounds.width += this.mBounds.x - x;
      this.mBounds.x = x;
    }

    if (y < this.mBounds.y) {
      this.mBounds.height += this.mBounds.y - y;
      this.mBounds.y = y;
    }

    if (x > this.mBounds.x + this.mBounds.width)
      this.mBounds.width = x - this.mBounds.x;

    if (y > this.mBounds.y + this.mBounds.height)
      this.mBounds.height = y - this.mBounds.y;
  }

  __pushCommand(type, ...points) {
    let cmd = new GraphicsCommand(type, points, this.lineColor, this.lineAlpha, this.lineWidth, this.fillColor, this.fillAlpha, this.mCaps, this.mJoints, this.mMiterLimit);
    this.mCommandQueue.push(cmd);
  }
}