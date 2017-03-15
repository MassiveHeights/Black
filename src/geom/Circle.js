/* @echo EXPORT */
class Circle {
  /**
   * @param  {number=} x = 0 Position x.
   * @param  {number=} y = 0 Position y.
   * @param  {number=} r = 1 Radius.
   */
  constructor(x = 0, y = 0, r = 1) {
    /** @type {number} */
    this.x = x;

    /** @type {number} */
    this.y = y;

    /** @type {number} */
    this.r = r;
  }

  /**
   * set - Sets new circle properties
   *
   * @param {number} x Position x.
   * @param {number} y Position y.
   * @param {number} r Radius.
   *
   * @return {Circle} This circle.
   */
  set(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    return this;
  }

  /**
   * clone - Clones this circle.
   *
   * @return {Circle} Created circle.
   */
  clone() {
    return new Circle(this.x, this.y, this.r);
  }

  /**
   * copyTo - Copy this properties to another circle.
   *
   * @param {Circle} circle Object to copy to.
   *
   * @return {Circle} Passed circle.
   */
  copyTo(circle) {
    return circle.set(this.x, this.y, this.r);
  }

  /**
   * copyFrom - Copy another circle properties to this.
   *
   * @param {Circle} circle Object to copy from.
   *
   * @return {Circle} This circle.
   */
  copyFrom(circle) {
    return this.set(circle.x, circle.y, circle.r);
  }

  /**
   * equals - Shows whether circles are identical.
   *
   * @param {Circle} circle Object to comparison.
   * @param {number=} epsilon Compare precision.
   *
   * @return {boolean} True if circles are identical.
   */
  equals(circle, epsilon = Number.EPSILON) {
    return circle !== null && (Math.abs(this.x - circle.x) < epsilon) && (Math.abs(this.y - circle.y) < epsilon) &&
      (Math.abs(this.r - circle.r) < epsilon);
  }

  /**
   * containsXY - Shows whether point is in circle.
   *
   * @param {number} x Point position x.
   * @param {number} y Point position y.
   *
   * @return {boolean} True if circle contains point.
   */
  containsXY(x, y) {
    return this.contains(new Vector(x, y));
  }

  /**
   * contains - Shows whether point is in circle.
   *
   * @param {Vector} vector Point to check.
   *
   * @return {boolean} True if circle contains point.
   */
  contains(vector) {
    return new Vector(this.x, this.y).subtract(vector).length() <= this.r;
  }

  /**
   * left - Finds left X position.
   *
   * @return {number} Left X position.
   */
  get left() {
    return this.x - this.r;
  }

  /**
   * right - Finds right X position.
   *
   * @return {number} Right X position.
   */
  get right() {
    return this.x + this.r;
  }

  /**
   * top - Finds top Y position.
   *
   * @return {number} Top Y position.
   */
  get top() {
    return this.y - this.r;
  }

  /**
   * bottom - Finds bottom Y position.
   *
   * @return {number} Bottom Y position.
   */
  get bottom() {
    return this.y + this.r;
  }

  /**
   * topPoint - Description
   *
   * @return {Vector} Description
   */
  get topPoint() {
    return new Vector(this.x, this.top);
  }

  /**
   * bottomPoint - Description
   *
   * @return {Vector} Description
   */
  get bottomPoint() {
    return new Vector(this.x, this.bottom);
  }

  /**
   * zero - Description
   *
   * @return {Circle} Description
   */
  zero() {
    return this.set(0, 0, 0);
  }

  /**
   * intersects - Shows whether this circle intersects another.
   *
   * @param {Circle} circle Circle to check.
   *
   * @return {boolean} True if intersects.
   */
  intersects(circle) {
    let d = new Vector(this.x, this.y).distance(new Vector(circle.x, circle.y));
    return d <= this.r + circle.r && d >= this.r - circle.r;
  }

  /**
   * collide - Shows whether this circle collide with another.
   *
   * @param {Circle} circle Circle to check.
   *
   * @return {boolean} True if collide.
   */
  collide(circle) {
    let d = new Vector(this.x, this.y).distance(new Vector(circle.x, circle.y));
    return d <= this.r + circle.r;
  }

  /**
   * overlap - Shows whether this circle overlap another.
   *
   * @param {Circle} circle Circle to check.
   *
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
   * volume - Area of this circle.
   *
   * @return {number} area.
   */
  get volume() {
    return Math.PI * this.r * this.r;
  }

  /**
   * perimeter - Perimeter of this circle.
   *
   * @return {number} perimeter.
   */
  get perimeter() {
    return 2 * Math.PI * this.r;
  }

  /**
   * center - Represents center as vector.
   *
   * @param {Vector=} outVector Object for result.
   *
   * @return {Vector} Center point.
   */
  center(outVector = undefined) {
    outVector = outVector || new Vector();
    return outVector.set(this.x, this.y);
  }

  // @ifdef DEBUG
  /**
   * toString - String representation of this circle.
   *
   * @param {number=} [digits=2] Number of digits after float point.
   *
   * @return {string} Description.
   */
  toString(digits = 2) {
    return `Circle { x: ${this.x.toFixed(digits)}, y: ${this.y.toFixed(digits)}, r: ${this.r.toFixed(digits)} }`;
  }
  // @endif
}

/** @type {Circle}
 * @nocollapse
 */
Circle.__cache = new Circle();
