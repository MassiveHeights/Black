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

    /** @private @type {Rectangle} */
    this.mBounds = new Rectangle();

    /** @private @type {Array<GraphicsCommand>} */
    this.mCommandQueue = [];

    /** @private @type {number} */
    this.mPosX = 0;

    /** @private @type {number} */
    this.mPosY = 0;

    /** @private @type {number} */
    this.mPadding = 0;

    this.lineStyle(1, 0, 1);
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
   * Clears the graphics that were drawn and resets fill and line styles.
   * 
   * @public
   * @returns {void}
   */
  clear() {
    this.mBounds.zero();
    this.mPosX = 0;
    this.mPosY = 0;

    this.mCommandQueue.splice(0, this.mCommandQueue.length);
    this.beginPath();
    this.setTransformDirty();
  }

  /**
   * Moves the starting point of a path to given x and y coordinates.
   * 
   * @public
   * @param {number} x The x-axis of the point.
   * @param {number} y The y-axis of the point.
   * @returns {void} 
   */
  moveTo(x, y) {
    this.mPosX = x;
    this.mPosY = y;
    this.__pushCommand(GraphicsCommandType.MOVE_TO, x, y);
  }

  /**
   * Draws a line between last point and given.
   * 
   * @public
   * @param {number} x The x-axis of the point.
   * @param {number} y The y-axis of the point.
   * @returns {void} 
   */
  lineTo(x, y) {
    this.__inflateBounds(this.mPosX, this.mPosY, -this.mPadding);
    this.__inflateBounds(this.mPosX, this.mPosY, this.mPadding);

    this.mPosX = x;
    this.mPosY = y;

    this.__inflateBounds(this.mPosX, this.mPosY, -this.mPadding);
    this.__inflateBounds(this.mPosX, this.mPosY, this.mPadding);

    this.__pushCommand(GraphicsCommandType.LINE_TO, x, y);
  }

  /**
   * Adds an arc to the current path.
   * 
   * @public
   * @param {number} x             The x-axis of the arc's center.
   * @param {number} y             The y-axis of the arc's center.
   * @param {number} radius        The radius of the arc.  
   * @param {number} startAngle    The starting angle in radians.
   * @param {number} endAngle      The ending angle in radians.
   * @param {number} anticlockwise If true the arc will be drawn counter-clockwise.
   * @returns {void} 
   */
  arc(x, y, radius, startAngle, endAngle, anticlockwise = false) {
    let sa = startAngle + Math.PI * 0.5;
    let ea = endAngle + Math.PI * 0.5;
    let needsMoveTo = false;
    let moveToX = 0;
    let moveToY = 0;

    let diff = Math.abs((sa) - (ea));
    if (diff >= MathEx.PI2) {
      this.__inflateBounds(x - radius, y - radius, -this.mPadding);
      this.__inflateBounds(x + radius, y + radius, this.mPadding);

      let end = Circle.getCircumferencePoint(x, y, radius, endAngle + Math.PI * 0.5);

      needsMoveTo = true;
      endAngle = startAngle + MathEx.PI2;
      moveToX = end.x;
      moveToY = end.y;
    } else {
      let c = 0;

      let ws = startAngle;
      let we = endAngle;

      if (ws < 0)
        ws += MathEx.PI2;

      if (we < 0)
        we += MathEx.PI2;

      if (diff > Math.Pi || anticlockwise)
        [ws, we] = [we, ws];

      for (let i = 0; i < Math.PI * 2; i += Math.PI * 0.5) {

        if (i >= ws && i <= we) {
          let point = Circle.getCircumferencePoint(x, y, radius, i + Math.PI * 0.5);
          this.__inflateBounds(point.x, point.y, -this.mPadding);
          this.__inflateBounds(point.x, point.y, this.mPadding);
          c++;
        }
      }

      if (c < 4) {
        let start = Circle.getCircumferencePoint(x, y, radius, sa);
        let end = Circle.getCircumferencePoint(x, y, radius, ea);

        this.__inflateBounds(start.x, start.y, -this.mPadding);
        this.__inflateBounds(start.x, start.y, this.mPadding);

        this.__inflateBounds(end.x, end.y, -this.mPadding);
        this.__inflateBounds(end.x, end.y, this.mPadding);
      }
    }

    this.__pushCommand(GraphicsCommandType.ARC, x, y, radius, startAngle, endAngle, anticlockwise);

    if (needsMoveTo === true)
      this.__pushCommand(GraphicsCommandType.MOVE_TO, moveToX, moveToY);
  }

  /**
   * Adds circle to current path.
   * 
   * @public
   * @param {number} x      The x-axis of the circles's center.
   * @param {number} y      The y-axis of the circles's center.
   * @param {number} radius The radius of the circle.
   * @returns {void}
   */
  circle(x, y, radius) {
    this.__inflateBounds(x - radius, y - radius, -this.mPadding);
    this.__inflateBounds(x + radius, y + radius, this.mPadding);

    this.__pushCommand(GraphicsCommandType.ARC, x, y, radius, 0, MathEx.PI2);
  }

  /**
   * Creates closed rectangle like path.
   * 
   * @public
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   * 
   * @returns {void}
   */
  rect(x, y, width, height) {
    Debug.isNumber(x, y, width, height);

    let xSign = width < 0 ? -1 : 1;
    let ySign = height < 0 ? -1 : 1;

    this.__inflateBounds(x, y, -this.mPadding * ySign);
    this.__inflateBounds(x + width, y + height, this.mPadding * ySign);

    this.__pushCommand(GraphicsCommandType.RECT, x, y, width, height);
  }

  // /**
  //  * @public
  //  * @param {number} cp1x 
  //  * @param {number} cp1y 
  //  * @param {number} cp2x 
  //  * @param {number} cp2y 
  //  * @param {number} x 
  //  * @param {number} y 
  //  */
  // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
  //   this.__pushCommand(GraphicsCommandType.BEZIER_CURVE_TO, cp1x, cp1y, cp2x, cp2y, x, y);
  // }

  /**
   * Starts new path.
   * 
   * @public
   * @returns {void}
   */
  beginPath() {
    this.__pushCommand(GraphicsCommandType.BEGIN_PATH);
  }

  /**
   * Closes current path.
   * 
   * @public
   * @returns {void}
   */
  closePath() {
    this.__pushCommand(GraphicsCommandType.CLOSE_PATH);
  }

  /**
   * Strokes current path with the current line style..
   * 
   * @public
   * @returns {void}
   */
  stroke() {
    this.__pushCommand(GraphicsCommandType.STROKE);
  }

  /**
   * Fills current path with the current fill style.
   * 
   * @public
   * @returns {void}
   */
  fill() {
    this.__pushCommand(GraphicsCommandType.FILL);
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
   * @param {number=} [miterLimit=3] Miter limit.
   * @returns {void}
   */
  lineStyle(lineWidth = 0, color = 0, alpha = 1, caps = CapsStyle.NONE, joints = JointStyle.MITER, miterLimit = 3) {
    Debug.isNumber(lineWidth, color, alpha, miterLimit);
    //Debug.assert(lineWidth >= 0)

    if (joints === JointStyle.MITER && lineWidth > this.mPadding)
      this.mPadding = lineWidth;
    else if (lineWidth / 2 > this.mPadding)
      this.mPadding = lineWidth / 2;

    this.__pushCommand(GraphicsCommandType.LINE_STYLE, lineWidth, color, alpha, caps, joints, miterLimit);
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
    Debug.isNumber(color, alpha);
    this.__pushCommand(GraphicsCommandType.FILL_STYLE, color, alpha);
  }

  /**
   * @private
   * @ignore
   * @param {number} x 
   * @param {number} y 
   */
  __inflateBounds(x, y, padding) {
    x += padding;
    y += padding;

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
   * @param {...number} data 
   */
  __pushCommand(type, ...data) {
    let cmd = new GraphicsCommand(type, data);
    this.mCommandQueue.push(cmd);
  }
}