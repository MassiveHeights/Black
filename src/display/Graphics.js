/**
 * A basic utility class for drawing simple shapes.
 *
 * @cat display
 * @extends DisplayObject
 */
/* @echo EXPORT */
class Graphics extends DisplayObject {
  /**
   * Creates new Graphics instance.
   */
  constructor() {
    super();

    /** @type {number} Color parameter for line style */
    this.lineColor = 0;

    /** @type {number} Alpha parameter for line style */
    this.lineAlpha = 1.0;

    /** @type {number} Width parameter for line style */
    this.lineWidth = 0;

    /** @type {number} Color parameter for fill style */
    this.fillColor = 0;

    /** @type {number} Alpha parameter for fill style */
    this.fillAlpha = 1.0;

    /** @private @type {CapsStyle} */
    this.mCaps = CapsStyle.NONE;

    /** @private @type {JointStyle} */
    this.mJoints = JointStyle.MITER;

    /** @private @type {number} */
    this.mMiterLimit = 3;

    /** @private @type {Rectangle} */
    this.mBounds = new Rectangle();

    /** @private @type {Array<GraphicsCommand>} */
    this.mCommandQueue = [];
  }

  /**
   * @private
   * @ignore
   * @readonly
   */
  get halfLineWidth() {
    return this.lineWidth / 2;
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('Graphics');
  }

  /**
   * @inheritDoc
   */
  onRender(driver, parentRenderer, isBackBufferActive = false) {
    let renderer = /** @type {GraphicsRenderer} */ (this.mRenderer);

    if (this.mDirty & DirtyFlag.RENDER) {
      renderer.transform = this.worldTransformation;
      renderer.commands = this.mCommandQueue;
      renderer.alpha = this.mAlpha * parentRenderer.alpha;
      renderer.blendMode = this.blendMode === BlendMode.AUTO ? parentRenderer.blendMode : this.blendMode;
      renderer.color = this.mColor === null ? parentRenderer.color : this.mColor;
      renderer.visible = this.mVisible;
      Renderer.__dirty = this.mDirty;
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
  /**
   * @inheritDoc
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    this.mBounds.copyTo(outRect);

    if (this.mClipRect !== null) {
      this.mClipRect.copyTo(outRect);
      outRect.x += this.mPivotX;
      outRect.y += this.mPivotY;
    }

    return outRect;
  }

  /**
   * Sets line style
   * 
   * @public
   * @param {number} lineWidth Line width.
   * @param {number=} [color=0] Line color.
   * @param {number=} [alpha=1] Line alpha.
   * @param {CapsStyle=} [caps=CapsStyle.NONE] Line caps style.
   * @param {JointStyle=} [joints=JointStyle.MITER] Line joints style.
   * @param {number=} [miterLimit=3] Mite limit.
   * @returns {void}
   */
  lineStyle(lineWidth = 0, color = 0, alpha = 1, caps = CapsStyle.NONE, joints = JointStyle.MITER, miterLimit = 3) {
    this.lineWidth = lineWidth;
    this.lineColor = color;
    this.lineAlpha = alpha;
    this.mCaps = caps;
    this.mJoints = joints;
    this.mMiterLimit = 3;
  }

  /**
   * Sets fill style
   * 
   * @public
   * @param {number} [color=0] Fill color.
   * @param {number=} [alpha=1] Fill alpha.
   * @returns {void}
   */
  fillStyle(color = 0, alpha = 1) {
    this.fillColor = color;
    this.fillAlpha = alpha;
  }

  /**
   * Clears the graphics that were drawn and resets fill and line styles
   * 
   * @public
   * @returns {void}
   */
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

  /**
   * Sets custom tranformation for futher objects
   * @param {Matrix} matrix 
   */
  setCustomTransform(matrix) {
    let d = matrix.data;
    this.__pushCommand(GraphicsCommandType.TRANSFORM, d[0], d[1], d[2], d[3], d[4], d[5]);
    this.setTransformDirty();
  }

  /**
   * Draws line with given coordinates for two points
   * 
   * @public
   * @param {number} x1 First point x-coordinate.
   * @param {number} y1 First point y-coordinate.
   * @param {number} x2 Second point x-coordinate.
   * @param {number} y2 Second point y-coordinate.
   * @returns {void}
   */
  drawLine(x1, y1, x2, y2) {
    this.__inflateBounds(x1 - this.halfLineWidth, y1 - this.halfLineWidth);
    this.__inflateBounds(x1 + this.halfLineWidth, y1 + this.halfLineWidth);

    this.__inflateBounds(x2 - this.halfLineWidth, y2 - this.halfLineWidth);
    this.__inflateBounds(x2 + this.halfLineWidth * 2, y2 + this.halfLineWidth);

    this.__pushCommand(GraphicsCommandType.LINE, x1, y1, x2, y2);
    this.setTransformDirty();
  }

  /**
   * Draws rectangle with given coordinates of top left point and its width and height
   * 
   * @public
   * @param {number} x Left-Top coordinate along X-axis.
   * @param {number} y Left-Top coordinate along Y-axis.
   * @param {number} width Width of rectangle.
   * @param {number} height Height of rectangle.
   * @returns {void}
   */
  drawRect(x, y, width, height) {
    this.__inflateBounds(x - this.halfLineWidth, y - this.halfLineWidth);
    this.__inflateBounds(x + width + this.halfLineWidth, y + height + this.halfLineWidth);
    this.__pushCommand(GraphicsCommandType.RECTANGLE, x, y, width, height);
    this.setTransformDirty();
  }

  /**
   * Draws a circle with given center coordinates and radius
   * 
   * @public
   * @param {number} x Center coordinate along X-axis.
   * @param {number} y Center coordinate along Y-axis.
   * @param {number} radius Radius of circle.
   * @returns {void}
   */
  drawCircle(x, y, radius) {
    this.__inflateBounds(x - radius - this.halfLineWidth, y - radius - this.halfLineWidth);
    this.__inflateBounds(x + radius + this.halfLineWidth, y + radius + this.halfLineWidth);

    this.__pushCommand(GraphicsCommandType.CIRCLE, x, y, radius);
    this.setTransformDirty();
  }

  /**
   * @private
   * @ignore
   * @param {number} x 
   * @param {number} y 
   */
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

  /**
   * @private
   * @ignore
   * @param {GraphicsCommandType} type
   * @param {...number} points 
   */
  __pushCommand(type, ...points) {
    let cmd = new GraphicsCommand(type, points, this.lineColor, this.lineAlpha, this.lineWidth, this.fillColor, this.fillAlpha, this.mCaps, this.mJoints, this.mMiterLimit);
    this.mCommandQueue.push(cmd);
  }
}