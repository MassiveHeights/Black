import { DisplayObject } from "./DisplayObject";
import { Rectangle } from "../geom/Rectangle";
import { Black } from "../Black";
import { GraphicsLinearGradient } from "./GraphicsLinearGradient";
import { CapsStyle } from "./CapsStyle";
import { GraphicsData } from "./GraphicsData";
import { JointStyle } from "./JointStyle";
import { Matrix } from "../geom/Matrix";

/**
 * A basic utility class for drawing shapes.
 *
 * @cat display
 * @extends black-engine~DisplayObject
 */
export class Graphics extends DisplayObject {
  /**
   * Creates new Graphics instance.
   *
   * @param {black-engine~GraphicsData|string|null} graphicsData The id of BVG object.
   * @param {boolean} trim Flag to determine the passed graphicsData needs trim.
   */
  constructor(graphicsData = null, trim = false) {
    super();

    /** 
     * @private
     * @type {black-engine~Rectangle} 
     */
    this.mBounds = new Rectangle();

    /**
     * For internal usage
     *
     * 
     * @private
     * @type {black-engine~Rectangle|null} 
     */
    this.mLocalBounds = null;

    /** 
     * @private
     * @type {black-engine~GraphicsData|null} 
     */
    this.mGraphicsData = null;

    /** 
     * @private
     * @type {number} 
     */
    this.mDataOffsetX = 0;

    /** 
     * @private
     * @type {number} 
     */
    this.mDataOffsetY = 0;

    /** 
     * @private
     * @type {boolean} 
     */
    this.mTrim = trim;

    if (graphicsData === null) {
      this.mGraphicsData = new GraphicsData();
    } else if (typeof graphicsData === 'string') {
      this.mGraphicsData = Black.assets.getGraphicsData(graphicsData);
    } else {
      this.mGraphicsData = graphicsData;
    }

    if (trim) {
      this.mGraphicsData.onGetLocalBounds(this, new Matrix());

      if (this.mLocalBounds) {
        this.mDataOffsetX = this.mLocalBounds.x;
        this.mDataOffsetY = this.mLocalBounds.y;
        this.mLocalBounds = null;
      }
    }
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('Graphics', this);
  }

  /**
   * @inheritDoc
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (this.mClipRect !== null) {
      this.mClipRect.copyTo(outRect);
      return outRect;
    }

    this.mGraphicsData.onGetLocalBounds(this, new Matrix());

    this.mLocalBounds && outRect.copyFrom(this.mLocalBounds);
    this.mLocalBounds = null;

    if (!this.mTrim) {
      outRect.width += Math.max(0, outRect.x);
      outRect.height += Math.max(0, outRect.y);
      outRect.x = Math.min(0, outRect.x);
      outRect.y = Math.min(0, outRect.y);
    }

    return outRect;
  }

  /**
   * Sets line style. Zero or less values of `lineWidth` are ignored.
   *
   * @public
   * @param {number} lineWidth Line width.
   * @param {number=} [color=0] Line color.
   * @param {number=} [alpha=1] Line alpha.
   * @param {black-engine~CapsStyle=} [caps=CapsStyle.NONE] Line caps style.
   * @param {black-engine~JointStyle=} [joints=JointStyle.MITER] Line joints style.
   * @param {number=} [miterLimit=3] Miter limit.
   * @returns {void}
   */
  lineStyle(lineWidth = 0, color = 0, alpha = 1, caps = CapsStyle.NONE, joints = JointStyle.MITER, miterLimit = 3) {
    this.mGraphicsData.lineStyle(lineWidth, color, alpha, caps, joints, miterLimit);
  }

  /**
   * Sets shadow blur level.
   * 
   * @param {number} level 
   * @returns {void}
   */
  shadowBlur(level) {
    this.mGraphicsData.shadowBlur(level);
  }

  /**
   * Sets shadow color.
   * 
   * @param {number} color 
   * @param {number} alpha 
   * @returns {void}
   */
  shadowColor(color, alpha = 1) {
    this.mGraphicsData.shadowColor(color, alpha);
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
    this.mGraphicsData.fillStyle(color, alpha);
  }

  /**
   * Sets fill style to gradient.
   *
   * @public
   * @param {black-engine~GraphicsGradient} gradient Fill gradient.
   *
   * @returns {void}
   */
  fillGradient(gradient) {
    this.mGraphicsData.fillGradient(gradient);
  }

  /**
   * Sets fill style to pattern.
   *
   * @public
   * @param {black-engine~GraphicsPattern} pattern Fill pattern.
   *
   * @returns {void}
   */
  fillPattern(pattern) {
    this.mGraphicsData.fillPattern(pattern);
  }

  /**
   * Clears the graphics that were drawn and resets fill and line styles.
   *
   * @public
   * @returns {void}
   */
  clear() {
    this.mBounds.zero();
    this.mGraphicsData.clear();
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
    this.mGraphicsData.moveTo(x, y);
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
    this.mGraphicsData.lineTo(x, y);
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
   * @param {boolean=} [anticlockwise=false] If true the arc will be drawn counter-clockwise.
   * @returns {void}
   */
  arc(x, y, radius, startAngle, endAngle, anticlockwise = false) {
    this.mGraphicsData.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  }

  /**
   * Adds circle to current path.
   *
   * @public
   * @param {number} x      The x-axis of the circle's center.
   * @param {number} y      The y-axis of the circle's center.
   * @param {number} radius The radius of the circle.
   * @returns {void}
   */
  circle(x, y, radius) {
    this.mGraphicsData.circle(x, y, radius);
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
    this.mGraphicsData.rect(x, y, width, height);
  }

  /**
   * Creates closed rounded rectangle.
   *
   * @public
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} radius
   *
   * @returns {void}
   */
  roundedRect(x, y, width, height, radius) {
    this.mGraphicsData.roundedRect(x, y, width, height, radius);
  }

  /**
   * @public
   * @param {number} cp1x
   * @param {number} cp1y
   * @param {number} cp2x
   * @param {number} cp2y
   * @param {number} x
   * @param {number} y
   */
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.mGraphicsData.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  }

  /**
   * @public
   * @param {number} cpx
   * @param {number} cpy
   * @param {number} x
   * @param {number} y
   */
  quadraticCurveTo(cpx, cpy, x, y) {
    this.mGraphicsData.quadraticCurveTo(cpx, cpy, x, y);
  }

  /**
   * Starts new path.
   *
   * @public
   * @returns {void}
   */
  beginPath() {
    this.mGraphicsData.beginPath();
  }

  /**
   * Closes current path.
   *
   * @public
   * @returns {void}
   */
  closePath() {
    this.mGraphicsData.closePath();
  }

  /**
   * Sets the line dash pattern used when stroking lines,
   * using an array of values which specify alternating lengths of lines and gaps which describe the pattern.
   *
   * @public
   * @param {Array<number>} An Array of numbers which specify distances to alternately draw a line and a gap (in coordinate space units).
   *
   * @returns {void}
   */
  setLineDash(segments) {
    this.mGraphicsData.setLineDash(segments);
  }

  /**
   * Strokes current path with the current line style..
   *
   * @public
   * @returns {void}
   */
  stroke() {
    this.mGraphicsData.stroke();
    this.setTransformDirty();
  }

  /**
   * Fills current path with the current fill style.
   *
   * @public
   * @param {boolean} isNonZero The algorithm by which to determine if a point is inside a path or outside a path, True is for "nonzero" and False is for "evenodd".
   *
   * @returns {void}
   */
  fill(isNonZero = true) {
    this.mGraphicsData.fill(isNonZero);
    this.setTransformDirty();
  }

  createLinearGradient(x, y, width, height) {
    return new GraphicsLinearGradient(x, y, width, height);
  }
}
