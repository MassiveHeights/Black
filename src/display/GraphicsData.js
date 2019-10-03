import { Matrix } from "../geom/Matrix";
import { GraphicsCommand } from "./GraphicsCommand";
import { GraphicsPath } from "./GraphicsPath";
import { GraphicsCommandType } from "./GraphicsCommandType";
import { Rectangle } from "../geom/Rectangle";
import { Vector } from "../geom/Vector";
import { Debug } from "../core/Debug";
import { JointStyle } from "./JointStyle";
import { GraphicsLinearGradient } from "./GraphicsLinearGradient";
import { Circle } from "../geom/Circle";
import { CapsStyle } from "./CapsStyle";
import { MathEx } from "../math/MathEx";

/**
 * Structure object for graphics. Stores parsed layered data, ready for render.
 * Normally you should not work with this object, and use Graphics instead.
 *
 * @cat display
 */
export class GraphicsData {
  /**
   * Creates new instance of GraphicsData
   */
  constructor() {
    /** 
     * @private 
     * @type {Array<black-engine~GraphicsData>} 
     */
    this.mNodes = [];

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.mTransform = new Matrix();

    /** 
     * @private 
     * @type {Array<black-engine~GraphicsCommand>} 
     */
    this.mCommandQueue = [];

    /** 
     * @private 
     * @type {number} 
     */
    this.mPivotX = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mPivotY = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mPosX = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mPosY = 0;

    /** 
     * @private 
     * @type {string|null} 
     */
    this.mName = null;
  }

  /**
   * Calculates trimmed local bounds.
   *
   * @protected
   * @param {Object} graphics Object to store bounds by reference.
   * @param {black-engine~Matrix} transform Matrix to transform children nodes, for internal use.
   *
   * @return {black-engine~Rectangle} Calculated local bounds.
   */
  onGetLocalBounds(graphics, transform) {
    let path = new GraphicsPath();
    let len = this.mCommandQueue.length;

    transform = transform.clone().append(this.mTransform);
    const m = transform.data;
    const scaleX = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
    const scaleY = Math.sqrt(m[2] * m[2] + m[3] * m[3]);

    for (let i = 0; i < len; i++) {
      let cmd = this.mCommandQueue[i];

      switch (cmd.type) {
        case GraphicsCommandType.BEGIN_PATH: {
          if (path.bounds) {
            transform.transformRect(path.bounds, path.bounds);
            graphics.mLocalBounds = graphics.mLocalBounds ? graphics.mLocalBounds.union(path.bounds) : path.bounds;
          }

          path = new GraphicsPath();
          break;
        }
        case GraphicsCommandType.BOUNDS: {
          for (let k = 0; k < cmd.data.length; k += 2) {
            path.points.push(cmd.getNumber(k), cmd.getNumber(k + 1));
          }

          break;
        }
        case GraphicsCommandType.LINE_STYLE: {
          path.lastLineWidth = cmd.getNumber(0);
          let joints = cmd.getString(4);

          if (joints === JointStyle.MITER)
            path.lineMul = 1;

          break;
        }
        case GraphicsCommandType.FILL: {
          if (path.points.length !== 0) {
            let tmpBounds = Rectangle.fromPointsXY(path.points);
            path.bounds = path.bounds ? path.bounds.union(tmpBounds) : tmpBounds;
          }

          break;
        }
        case GraphicsCommandType.STROKE: {
          if (path.lastLineWidth > path.maxLineWidth)
            path.maxLineWidth = path.lastLineWidth;

          if (path.maxLineWidth === 0)
            path.maxLineWidth = 1;

          path.maxLineWidth *= path.lineMul;

          if (path.points.length !== 0) {
            let tmpBounds = Rectangle.fromPointsXY(path.points);

            if (path.points.length > 1)
              tmpBounds.inflate(path.maxLineWidth * scaleX, path.maxLineWidth * scaleY);

            path.bounds = path.bounds ? path.bounds.union(tmpBounds) : tmpBounds;
          }

          break;
        }

        default:
          break;
      }
    }

    if (path.bounds) {
      transform.transformRect(path.bounds, path.bounds);
      graphics.mLocalBounds = graphics.mLocalBounds ? graphics.mLocalBounds.union(path.bounds) : path.bounds;
    }

    for (let i = 0, l = this.mNodes.length; i < l; i++) {
      this.mNodes[i].onGetLocalBounds(graphics, transform);
    }

    return graphics.mLocalBounds;
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
    Debug.isNumber(lineWidth, color, alpha, miterLimit);
    if (lineWidth <= 0)
      return;

    this.__pushCommand(GraphicsCommandType.LINE_STYLE, lineWidth, color, alpha, caps, joints, miterLimit);
  }

  /**
   * Sets shadow blur level.
   * 
   * @param {number} level 
   * @returns {void}
   */
  shadowBlur(level) {
    Debug.isNumber(level);

    this.__pushCommand(GraphicsCommandType.SHADOW_BLUR, level);
  }

  /**
   * Sets shadow color.
   * 
   * @param {number} color 
   * @param {number} alpha 
   * @returns {void}
   */
  shadowColor(color, alpha) {
    Debug.isNumber(color, alpha);

    this.__pushCommand(GraphicsCommandType.SHADOW_COLOR, color, alpha);
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
   * Sets fill style to gradient.
   *
   * @public
   * @param {black-engine~GraphicsGradient} gradient Fill gradient.
   *
   * @returns {void}
   */
  fillGradient(gradient) {
    if (gradient instanceof GraphicsLinearGradient) {
      this.__pushCommand(GraphicsCommandType.FILL_GRD, /** @type {GraphicsLinearGradient} */(gradient));
    } // radial todo
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
    this.__pushCommand(GraphicsCommandType.FILL_PATTERN, pattern);
  }

  /**
   * Clears the graphics that were drawn and resets fill and line styles.
   *
   * @public
   * @returns {void}
   */
  clear() {
    this.mPosX = 0;
    this.mPosY = 0;

    this.mCommandQueue = [];
    this.mNodes = [];

    this.beginPath();
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
    this.mPosX = x;
    this.mPosY = y;

    this.__pushCommand(GraphicsCommandType.LINE_TO, x, y);
    this.__pushCommand(GraphicsCommandType.BOUNDS, this.mPosX, this.mPosY, x, y);
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
    let needsMoveTo = false;
    let moveToX = 0;
    let moveToY = 0;
    let points = [];
    let diff = Math.abs(startAngle - endAngle);

    if (startAngle === endAngle)
      return;

    if (diff >= MathEx.PI2) {
      points.push(x - radius, y - radius, x + radius, y + radius);

      let end = Circle.getCircumferencePoint(x, y, radius, endAngle + Math.PI * 0.5);

      needsMoveTo = true;
      endAngle = startAngle + MathEx.PI2;
      moveToX = end.x;
      moveToY = end.y;
    } else {
      let start = startAngle % MathEx.PI2 + (startAngle < 0 ? MathEx.PI2 : 0);
      let end = endAngle;

      if (anticlockwise) {
        end = start;
        start = endAngle;
      }

      while (end < start)
        end += MathEx.PI2;

      const right = start === 0 || end >= MathEx.PI2;
      const left = start <= Math.PI && end >= Math.PI || end >= Math.PI * 3;
      const bottom = start <= Math.PI * 0.5 && end >= Math.PI * 0.5 || end >= Math.PI * 2.5;
      const top = start <= Math.PI * 1.5 && end >= Math.PI * 1.5 || end >= Math.PI * 3.5;

      let startCos, endCos, startSin, endSin;

      if (!left || !right) {
        startCos = Math.cos(start) * radius;
        endCos = Math.cos(end) * radius;
      }

      if (!top || !bottom) {
        startSin = Math.sin(start) * radius;
        endSin = Math.sin(end) * radius;
      }

      const minX = left ? -radius : Math.min(startCos, endCos);
      const maxX = right ? radius : Math.max(startCos, endCos);
      const minY = top ? -radius : Math.min(startSin, endSin);
      const maxY = bottom ? radius : Math.max(startSin, endSin);

      points.push(minX + x, minY + y, maxX + x, maxY + y);
    }

    this.__pushCommand(GraphicsCommandType.ARC, x, y, radius, startAngle, endAngle, anticlockwise);
    this.__pushCommand(GraphicsCommandType.BOUNDS, ...points);

    if (needsMoveTo === true)
      this.__pushCommand(GraphicsCommandType.MOVE_TO, moveToX, moveToY);
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
    this.__pushCommand(GraphicsCommandType.ARC, x, y, radius, 0, MathEx.PI2);
    this.__pushCommand(GraphicsCommandType.BOUNDS, x - radius, y - radius, x + radius, y + radius);
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

    this.__pushCommand(GraphicsCommandType.RECT, x, y, width, height);
    this.__pushCommand(GraphicsCommandType.BOUNDS, x, y, x + width, y + height);
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
    Debug.isNumber(x, y, width, height, radius);

    this.__pushCommand(GraphicsCommandType.ROUNDED_RECT, x, y, width, height, radius);
    this.__pushCommand(GraphicsCommandType.BOUNDS, x, y, x + width, y + height);
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
    const rangeX = this.__bezierRange(this.mPosX, cp1x, cp2x, x, Vector.pool.get());
    const rangeY = this.__bezierRange(this.mPosY, cp1y, cp2y, y, Vector.pool.get());

    this.mPosX = x;
    this.mPosY = y;

    this.__pushCommand(GraphicsCommandType.BEZIER_CURVE_TO, cp1x, cp1y, cp2x, cp2y, x, y);
    this.__pushCommand(GraphicsCommandType.BOUNDS, rangeX.x, rangeY.x, rangeX.y, rangeY.y);

    Vector.pool.release(rangeX);
    Vector.pool.release(rangeY);
  }

  /**
   * @public
   * @param {number} cpx
   * @param {number} cpy
   * @param {number} x
   * @param {number} y
   */
  quadraticCurveTo(cpx, cpy, x, y) {
    const rangeX = this.__quadraticRange(this.mPosX, cpx, x, Vector.pool.get());
    const rangeY = this.__quadraticRange(this.mPosY, cpy, y, Vector.pool.get());

    this.mPosX = x;
    this.mPosY = y;

    this.__pushCommand(GraphicsCommandType.QUADRATIC_CURVE_TO, cpx, cpy, x, y);
    this.__pushCommand(GraphicsCommandType.BOUNDS, rangeX.x, rangeY.x, rangeX.y, rangeY.y);

    Vector.pool.release(rangeX);
    Vector.pool.release(rangeY);
  }

  /**
   * @private
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {black-engine~Vector=} out
   *
   * @return {black-engine~Vector} Out vector with set x, y as min and max bezier coordinate on passed axis
   */
  __bezierRange(p0, p1, p2, p3, out) {
    out = out || new Vector();

    const a = (p2 - 2 * p1 + p0) - (p3 - 2 * p2 + p1);
    const b = 2 * (p1 - p0) - 2 * (p2 - p1);
    const c = p0 - p1;
    const discriminant = b * b - 4 * a * c;

    let min = Math.min(p0, p3);
    let max = Math.max(p0, p3);

    if (discriminant >= 0) {
      const discRoot = Math.sqrt(discriminant);
      const inv2a = 1 / (a * 2);
      let x1 = (-b + discRoot) * inv2a;
      let x2 = (-b - discRoot) * inv2a;
      x1 = isFinite(x1) ? x1 : 0.5;
      x2 = isFinite(x2) ? x2 : 0.5;

      if (x1 > 0 && x1 < 1) {
        const dot = this.__bezierDot(p0, p1, p2, p3, x1);
        min = Math.min(dot, min);
        max = Math.max(dot, max);
      }

      if (x2 > 0 && x2 < 1) {
        const dot = this.__bezierDot(p0, p1, p2, p3, x2);
        min = Math.min(dot, min);
        max = Math.max(dot, max);
      }
    }

    out.x = min;
    out.y = max;

    return out;
  }

  /**
   * @private
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} x
   *
   * @return {number}
   */
  __bezierDot(p0, p1, p2, p3, x) {
    const y = 1 - x;
    return p0 * y * y * y + 3 * p1 * x * y * y + 3 * p2 * x * x * y + p3 * x * x * x;
  }

  /**
   * @private
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {black-engine~Vector=} out
   *
   * @return {black-engine~Vector} Out vector with set x, y as min and max bezier coordinate on passed axis
   */
  __quadraticRange(p0, p1, p2, out) {
    const a = p2 - p0;
    const b = p1 - p0;
    const c = b / a;
    const d = p0 + (c < 0 || c > 1 ? b * b / (2 * b - a) : 0);

    out.x = Math.min(p0, p2, d);
    out.y = Math.max(p0, p2, d);

    return out;
  }

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
   * Sets the line dash pattern used when stroking lines,
   * using an array of values which specify alternating lengths of lines and gaps which describe the pattern.
   *
   * @public
   * @param {Array<number>} segments An Array of numbers which specify distances to alternately draw a line and a gap (in coordinate space units).
   *
   * @returns {void}
   */
  setLineDash(segments) {
    this.__pushCommand(GraphicsCommandType.LINE_DASH, segments);
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
   * @param {boolean} isNonZero The algorithm by which to determine if a point is inside a path or outside a path, True is for "nonzero" and False is for "evenodd".
   *
   * @returns {void}
   */
  fill(isNonZero) {
    this.__pushCommand(GraphicsCommandType.FILL, isNonZero);
  }

  /**
   * @private
   * @ignore
   * @param {black-engine~GraphicsCommandType} type
   * @param {...*} data
   */
  __pushCommand(type, ...data) {
    let cmd = new GraphicsCommand(type, data);
    this.mCommandQueue.push(cmd);
  }

  searchNode(name, parent = this) {
    if (parent.name === name) {
      return parent;
    }

    for (let i = 0, l = parent.mNodes.length; i < l; i++) {
      const node = this.searchNode(name, parent.mNodes[i]);

      if (node) {
        return node;
      }
    }
  }

  /**
   * Gets/Sets the name of this GraphicsData instance. Used for searching elements.
   *
   * @return {string|null}
   */
  get name() {
    return this.mName;
  }

  /**
   * @param {string|null} value
   * @return {void}
   */
  set name(value) {
    this.mName = value;
  }
}
