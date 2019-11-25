import { Debug } from "../core/Debug";
import { ObjectPool } from "../utils/ObjectPool";
import { Vector } from "./Vector";
import { Line } from "./Line";
import { MathEx } from "../math/MathEx";

/**
 * Mathematical representation of a rectangle.
 *
 * @cat geom
 */
export class Rectangle {
  /**
   * Creates new instance of Rectangle.
   *
   * @param  {number=} [y=0] X-component.
   * @param  {number=} [x=0] Y-component.
   * @param  {number=} [w=0] The width.
   * @param  {number=} [h=0] The height.
   */
  constructor(x = 0, y = 0, w = 0, h = 0) {
    Debug.isNumber(x, y, w, h);

    /** 
     * @type {number} The x coordinate of the rectangle. 
     */
    this.x = x;

    /** 
     * @type {number} The y coordinate of the rectangle. 
     */
    this.y = y;

    /** 
     * @type {number} The width of the rectangle. 
     */
    this.width = w;

    /** 
     * @type {number} The height of the rectangle. 
     */
    this.height = h;
  }

  /**
   * Update rectangle values with a given.
   *
   * @param {number} x X-component.
   * @param {number} y Y-component.
   * @param {number} w The width.
   * @param {number} h The height.
   * @return {black-engine~Rectangle} This.
   */
  set(x, y, w, h) {
    Debug.isNumber(x, y, w, h);

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    return this;
  }

  /**
   * Copies values from given rectangle into this one.
   *
   * @param {black-engine~Rectangle} rect The Rectangle to copy values from.
   * @return {black-engine~Rectangle} This.
   */
  copyFrom(rect) {
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;

    return this;
  }

  /**
   * Copies values from this rectangle into given rectangle.
   *
   * @param {black-engine~Rectangle} rect The destination rect.
   * @return {black-engine~Rectangle} Given rect object.
   */
  copyTo(rect) {
    rect.x = this.x;
    rect.y = this.y;
    rect.width = this.width;
    rect.height = this.height;

    return rect;
  }

  /**
   * Get/Sets the leftmost point of this rectangle.
   *
   * @return {number}
   */
  get left() {
    return this.x;
  }

  /**
   * @param {number} left
   */
  set left(left) {
    Debug.isNumber(left);
    this.x = left;
  }

  /**
   * Get/Sets the rightmost point of this rectangle.
   *
   * @return {number}
   */
  get right() {
    return this.x + this.width;
  }

  /**
   * @param {number} right
   */
  set right(right) {
    Debug.isNumber(right);
    this.x = right - this.width;
  }

  /**
   * Get/Sets the topmost point of this rectangle.
   *
   * @return {number}
   */
  get top() {
    return this.y;
  }

  /**
   * @param {number} top
   */
  set top(top) {
    Debug.isNumber(top);
    this.y = top;
  }

  /**
   * Get/Sets the bottommost point of this rectangle.
   *
   * @return {number}
   */
  get bottom() {
    return this.y + this.height;
  }

  /**
   * @param {number} bottom
   */
  set bottom(bottom) {
    Debug.isNumber(bottom);

    this.y = bottom - this.height;
  }

  /**
   * Get/Sets the top left point for this rectangle.
   *
   * @return {black-engine~Vector}
   */
  get topLeft() {
    return new Vector(this.x, this.y);
  }

  /**
   * @param {black-engine~Vector} vector
   */
  set topLeft(vector) {
    this.left = vector.x;
    this.top = vector.y;
  }

  /**
   * Get/Sets the top right point for this rectangle.
   *
   * @return {black-engine~Vector}
   */
  get topRight() {
    return new Vector(this.right, this.y);
  }

  /**
   * @param {black-engine~Vector} vector
   */
  set topRight(vector) {
    this.right = vector.x;
    this.top = vector.y;
  }

  /**
   * Get/Sets the top left point for this rectangle.
   *
   * @return {black-engine~Vector}
   */
  get bottomRight() {
    return new Vector(this.right, this.bottom);
  }

  /**
   * @param {black-engine~Vector} vector
   */
  set bottomRight(vector) {
    this.right = vector.x;
    this.bottom = vector.y;
  }

  /**
   * Get/Sets the top left point for this rectangle.
   *
   * @return {black-engine~Vector}
   */
  get bottomLeft() {
    return new Vector(this.x, this.bottom);
  }

  /**
   * @param {black-engine~Vector} vector
   */
  set bottomLeft(vector) {
    this.x = vector.x;
    this.bottom = vector.y;
  }

  /**
   * Creates a new Rectangle instance with width and height equal to current instance.
   *
   * @param {black-engine~Vector=} outVector Resulting rect to save values in.
   * @return {black-engine~Vector} New Rectangle instance or `outVector` if passed.
   */
  size(outVector = undefined) {
    outVector = outVector || new Vector();
    return outVector.set(this.width, this.height);
  }

  /**
   * Sets all components of this Rectangle to zero.
   *
   * @return {black-engine~Rectangle} This.
   */
  zero() {
    return this.set(0, 0, 0, 0);
  }

  /**
   * Compares this Rectangle with a given one.
   *
   * @param {black-engine~Rectangle} rect Rect to compare values with.
   * @param {number} [epsilon=Number.EPSILON] Comparison threshold.
   * @return {boolean} True if rectangles are equal.
   */
  equals(rect, epsilon = Number.EPSILON) {
    return rect !== null && (Math.abs(this.x - rect.x) < epsilon) && (Math.abs(this.y - rect.y) < epsilon) &&
      (Math.abs(this.width - rect.width) < epsilon) && (Math.abs(this.height - rect.height) < epsilon);
  }


  /**
   * Checks if a given point is inside this rectangle.
   *
   * @param {number} x The x-component of a point.
   * @param {number} y The y-component of a point.
   * @return {boolean} True if point is inside.
   */
  containsXY(x, y) {
    return x >= this.x && x <= this.right && y >= this.y && y <= this.bottom;
  }


  /**
   * Checks if a given rectangle is inside this rect.
   *
   * @param {black-engine~Rectangle} rect Rectangle to check with.
   * @return {boolean} True if given rectangle is inside this one.
   */
  contains(rect) {
    return rect.x >= this.x && rect.y >= this.y && rect.right <= this.right && rect.bottom <= this.bottom;
  }

  /**
   * Checks if this rect intersects with a given rectangle.
   *
   * @param {black-engine~Rectangle} rect The rect to check intersection with.
   * @return {boolean} True if intersects.
   */
  intersects(rect) {
    return rect.right > this.x && rect.bottom > this.y &&
      rect.x < this.right && rect.y < this.bottom;
  }

  /**
   * Makes rectangle, which represents intersection between this and passed rectangles.
   *
   * @param {black-engine~Rectangle} toIntersect Rectangle to intersect with.
   * @param {black-engine~Rectangle=} outRect Rectangle to be returned.
   * @returns {black-engine~Rectangle}
   */
  intersection(toIntersect, outRect) {
    outRect = outRect || new Rectangle();

    let x0 = this.x < toIntersect.x ? toIntersect.x : this.x;
    let x1 = this.right > toIntersect.right ? toIntersect.right : this.right;

    if (x1 <= x0)
      return new Rectangle();

    let y0 = this.y < toIntersect.y ? toIntersect.y : this.y;
    let y1 = this.bottom > toIntersect.bottom ? toIntersect.bottom : this.bottom;

    if (y1 <= y0)
      return new Rectangle();

    outRect.set(x0, y0, x1 - x0, y1 - y0);
    return outRect;
  }


  /**
   * Adds given rectangle into this.
   *
   * @param {black-engine~Rectangle} toUnion A rectangle object to add to this rect.
   * @return {black-engine~Rectangle} New rectangle object that is the union.
   */
  union(toUnion) {
    let x0 = this.x > toUnion.x ? toUnion.x : this.x;
    let x1 = this.right < toUnion.right ? toUnion.right : this.right;
    let y0 = this.y > toUnion.y ? toUnion.y : this.y;
    let y1 = this.bottom < toUnion.bottom ? toUnion.bottom : this.bottom;

    return this.set(x0, y0, x1 - x0, y1 - y0);
  }

  /**
   * Returns volume of this Rectangle.
   *
   * @return {number}
   */
  get volume() {
    return this.width * this.height;
  }

  /**
   * Expands this rectangle object by given values.
   *
   * @param {number} x      X-component.
   * @param {number} y      Y-component
   * @param {number} width  The width.
   * @param {number} height The height.
   * @return {black-engine~Rectangle} This.
   */
  expand(x, y, width, height) {
    Debug.isNumber(x, y, width, height);

    if (this.volume === 0)
      return this.set(x, y, width, height);

    let cacheRight = this.right;
    let cacheBottom = this.bottom;

    if (this.x > x) {
      this.x = x;
      this.width = cacheRight - x;
    }

    if (this.y > y) {
      this.y = y;
      this.height = cacheBottom - y;
    }

    if (cacheRight < x + width)
      this.width = x + width - this.x;

    if (cacheBottom < y + height)
      this.height = y + height - this.y;

    return this;
  }

  /**
   * Expands this rectangle with a given point.
   * 
   * @param {number} x 
   * @param {number} y 
   * @returns {black-engine~Rectangle}
   */
  expandXY(x, y) {
    if (x < this.x) {
      this.width += this.x - x;
      this.x = x;
    }

    if (y < this.y) {
      this.height += this.y - y;
      this.y = y;
    }

    if (x > this.x + this.width)
      this.width = x - this.x;

    if (y > this.y + this.height)
      this.height = y - this.y;

    return this;
  }

  /**
   * Increases the size of this rectangle by given x- and y- values.
   *
   * @param {number=} [x=0] X-component.
   * @param {number=} [y=0] Y-component.
   * @return {black-engine~Rectangle} This.
   */
  inflate(x = 0, y = 0) {
    Debug.isNumber(x, y);

    this.x -= x;
    this.y -= y;
    this.width += 2 * x;
    this.height += 2 * y;

    return this;
  }

  /**
   * Clones this Rectangle object into new one.
   *
   * @return {black-engine~Rectangle} New rectangle object.
   */
  clone() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }

  /**
   * Gets rectangle perimeter.
   *
   * @return {number}
   */
  get perimeter() {
    return 2 * (this.width + this.height);
  }


  /**
   * Returns the center point of this rectangle.
   *
   * @param {black-engine~Vector=} outVector The out-Vector to store values in.
   * @return {black-engine~Vector} New rectangle object.
   */
  center(outVector = undefined) {
    outVector = outVector || new Vector();
    return outVector.set(this.x + this.width * 0.5, this.y + this.height * 0.5);
  }

  /**
   *  Scales this rectangle.
   *
   * @param {number} x Width multiplier.
   * @param {number} y Height multiplier.
   * @return {black-engine~Rectangle} This rectangle.
   */
  scale(x, y) {
    this.width *= x;
    this.height *= y;

    return this;
  }

  /**
   * Checks if rectangle has area.
   *
   * @return {boolean} True if has.
   */
  get isEmpty() {
    return this.width <= 0 || this.height <= 0;
  }

  /**
   * Gets a list of lines, which make up this rectangle.
   *
   * @returns {Array<black-engine~Line>}
   */
  get lines() {
    return [
      new Line(this.topLeft, this.topRight),
      new Line(this.topRight, this.bottomRight),
      new Line(this.bottomRight, this.bottomLeft),
      new Line(this.bottomLeft, this.topLeft)
    ];
  }

  /**
   * Returns random number within this rectangle.
   * @returns {Vector}
   */
  get random() {
    const rx = MathEx.randomBetween(this.x, this.width);
    const ry = MathEx.randomBetween(this.y, this.height);

    return new Vector(rx, ry);
  }

  /**
   * Calculates a bonding box enclosing the given list of points.
   * 
   * @param {Array<Vector>} points 
   * @returns {black-engine~Rectangle}
   */
  static fromPoints(points) {
    let result = new Rectangle();

    if (points.length === 0)
      return result;

    let length = points.length;
    let minX = points[0].x;
    let minY = points[0].y;
    let maxX = points[0].x;
    let maxY = points[0].y;

    for (let i = 1; i < length; i++) {
      let p = points[i];
      let x = p.x;
      let y = p.y;

      minX = Math.min(x, minX);
      maxX = Math.max(x, maxX);
      minY = Math.min(y, minY);
      maxY = Math.max(y, maxY);
    }

    result.x = minX;
    result.y = minY;
    result.width = maxX - minX;
    result.height = maxY - minY;
    return result;
  }

  /**
   * Calculates a bonding box enclosing the given list of x-y pairs.
   * 
   * @param {Array<number>} points 
   * @returns {black-engine~Rectangle}
   */
  static fromPointsXY(points) {
    let result = new Rectangle();

    if (points.length < 2)
      return result;

    let length = points.length;
    let minX = points[0];
    let minY = points[1];
    let maxX = points[0];
    let maxY = points[1];

    for (let i = 2; i < length; i += 2) {
      let x = points[i];
      let y = points[i + 1];

      minX = Math.min(x, minX);
      maxX = Math.max(x, maxX);
      minY = Math.min(y, minY);
      maxY = Math.max(y, maxY);
    }

    result.x = minX;
    result.y = minY;
    result.width = maxX - minX;
    result.height = maxY - minY;
    return result;
  }

  // @ifdef DEBUG
  /**
   * @ignore
   * @param {number=} [digits=2] Description
   * @return {string} Description
   */
  toString(digits = 2) {
    return `Rectangle { x: ${this.x.toFixed(digits)}, y: ${this.y.toFixed(digits)}, width: ${this.width.toFixed(digits)}, height: ${this.height.toFixed(digits)} }`;
  }
  // @endif
}

/**
 * @ignore
 * @type {black-engine~Rectangle}
 * @nocollapse
 */
Rectangle.__cache = new Rectangle();

/**
 * Recycled rectangles pool.
 *
 * @type {black-engine~ObjectPool}
 * @nocollapse
 */
Rectangle.pool = new ObjectPool(Rectangle);