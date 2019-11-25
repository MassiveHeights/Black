import { Vector } from "./Vector";

/**
 * Mathematical representation of a circle.
 *
 * @cat geom
 */
export class Circle {
  /**
   * Creates new Circle instance.
   * 
   * @param  {number=} [x = 0] Position x.
   * @param  {number=} [y = 0] Position y.
   * @param  {number=} [r = 1] Radius.
   */
  constructor(x = 0, y = 0, r = 1) {

    /** 
     * @private 
     * @type {number} 
     */
    this.x = x;

    /** 
     * @private 
     * @type {number} 
     */
    this.y = y;

    /** 
     * @private 
     * @type {number} 
     */
    this.r = r;
  }

  /**
   * Sets new circle properties
   *
   * @param {number} x Position x.
   * @param {number} y Position y.
   * @param {number} r Radius.
   * @return {Circle} This circle.
   */
  set(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    return this;
  }

  /**
   * Clones this circle.
   *
   * @return {black-engine~Circle} Created circle.
   */
  clone() {
    return new Circle(this.x, this.y, this.r);
  }

  /**
   * Copy this properties to another circle.
   *
   * @param {black-engine~Circle} circle Object to copy to.
   * @return {black-engine~Circle} Passed circle.
   */
  copyTo(circle) {
    return circle.set(this.x, this.y, this.r);
  }

  /**
   * Copy another circle properties to this.
   *
   * @param {black-engine~Circle} circle Object to copy from.
   * @return {black-engine~Circle} This circle.
   */
  copyFrom(circle) {
    return this.set(circle.x, circle.y, circle.r);
  }

  /**
   * Shows whether circles are identical.
   *
   * @param {black-engine~Circle} circle Object to comparison.
   * @param {number=} epsilon Compare precision.
   * @return {boolean} True if circles are identical.
   */
  equals(circle, epsilon = Number.EPSILON) {
    return circle !== null && (Math.abs(this.x - circle.x) < epsilon) && (Math.abs(this.y - circle.y) < epsilon) &&
      (Math.abs(this.r - circle.r) < epsilon);
  }

  /**
   * Shows whether point is in circle.
   *
   * @param {number} x Point position x.
   * @param {number} y Point position y.
   * @return {boolean} True if circle contains point.
   */
  containsXY(x, y) {
    return this.contains(new Vector(x, y));
  }

  /**
   * Shows whether point is in circle.
   *
   * @param {black-engine~Vector} vector Point to check.
   * @return {boolean} True if circle contains point.
   */
  contains(vector) {
    // TODO: remove new Vector init
    return new Vector(this.x, this.y).subtract(vector).length() <= this.r;
  }

  /**
   * Resets all values to zero.
   *
   * @return {black-engine~Circle} Returns this.
   */
  zero() {
    return this.set(0, 0, 0);
  }

  /**
   * Shows whether this circle intersects another.
   *
   * @param {black-engine~Circle} circle Circle to check.
   * @return {boolean} True if intersects.
   */
  intersects(circle) {
    let d = new Vector(this.x, this.y).distance(new Vector(circle.x, circle.y));
    return d <= this.r + circle.r && d >= this.r - circle.r;
  }

  /**
   * Shows whether this circle collide with another.
   *
   * @param {black-engine~Circle} circle Circle to check.
   * @return {boolean} True if collide.
   */
  collide(circle) {
    let d = new Vector(this.x, this.y).distance(new Vector(circle.x, circle.y));
    return d <= this.r + circle.r;
  }

  /**
   * Shows whether this circle overlap another.
   *
   * @param {black-engine~Circle} circle Circle to check.
   * @return {boolean} True if overlap.
   */
  overlap(circle) {
    if (this.r < circle.r) {
      return false;
    }

    let d = new Vector(this.x, this.y).distance(new Vector(circle.x, circle.y));
    return d <= this.r - circle.r;
  }


  /**
   * Represents center as vector.
   *
   * @param {black-engine~Vector=} outVector Object for result.
   * @return {black-engine~Vector} Center point.
   */
  center(outVector = undefined) {
    outVector = outVector || new Vector();
    return outVector.set(this.x, this.y);
  }

  static getCircumferencePoint(x, y, r, angle, outVector = undefined) {
    outVector = outVector || new Vector();
    outVector.set(x + r * Math.sin(angle), y + r * -Math.cos(angle));
    return outVector;
  }

  /**
   * Returns area of this circle.
   *
   * @return {number} area.
   */
  get volume() {
    return Math.PI * this.r * this.r;
  }

  /**
   * Returns perimeter of this circle.
   *
   * @return {number} perimeter.
   */
  get perimeter() {
    return 2 * Math.PI * this.r;
  }

  /**
   * Finds left X position.
   *
   * @return {number} Left X position.
   */
  get left() {
    return this.x - this.r;
  }

  /**
   * Finds right X position.
   *
   * @return {number} Right X position.
   */
  get right() {
    return this.x + this.r;
  }

  /**
   * Finds top Y position.
   *
   * @return {number} Top Y position.
   */
  get top() {
    return this.y - this.r;
  }

  /**
   * Finds bottom Y position.
   *
   * @return {number} Bottom Y position.
   */
  get bottom() {
    return this.y + this.r;
  }

  /**
   * Returns top point of this circle.
   *
   * @return {black-engine~Vector}
   */
  get topPoint() {
    return new Vector(this.x, this.top);
  }

  /**
   * Returns bottom point of this circle.
   *
   * @return {black-engine~Vector}
   */
  get bottomPoint() {
    return new Vector(this.x, this.bottom);
  }

  // @ifdef DEBUG
  /**
   * String representation of this circle.
   *
   * @ignore
   * @param {number=} [digits=2] Number of digits after float point.
   * @return {string} Returns string representation of this circle.
   */
  toString(digits = 2) {
    return `Circle { x: ${this.x.toFixed(digits)}, y: ${this.y.toFixed(digits)}, r: ${this.r.toFixed(digits)} }`;
  }
  // @endif
}

/**
 * @ignore
 * @type {black-engine~Circle}
 * @nocollapse
 */
Circle.__cache = new Circle();
