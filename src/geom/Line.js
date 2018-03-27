/**
 * Mathematical representation of a bezier curve.
 *
 * @cat geom
 */
/* @echo EXPORT */
class Line {
  /**
   * Creates new Line instance.
   * @param  {Vector} start Start point.
   * @param  {Vector} end End point.
   */
  constructor(start, end) {
    /** @type {Vector} The start point coordinates */
    this.start = start;

    /** @type {Vector} The end point coordinates */
    this.end = end;
  }

  /**
   * set - Sets new line properties
   *
   * @param  {Vector} start Start point.
   * @param  {Vector} end End point.
   *
   * @return {Line} This circle.
   */
  set(start, end) {
    this.start = start;
    this.end = end;

    return this;
  }

  /**
   * clone - Clones this line.
   *
   * @return {Line} Created line.
   */
  clone() {
    return new Line(this.start.clone(), this.end.clone());
  }

  /**
   * copyTo - Copy this properties to another line.
   *
   * @param {Line} line Object to copy to.
   *
   * @return {Line} Passed line.
   */
  copyTo(line) {
    return line.set(this.start.clone(), this.end.clone());
  }

  /**
   * copyFrom - Copy another line properties to this.
   *
   * @param {Line} line Object to copy from.
   *
   * @return {Line} This circle.
   */
  copyFrom(line) {
    return this.set(line.start.clone(), line.end.clone());
  }

  /**
   * equals - Shows whether lines are identical.
   *
   * @param {Line} line Object to comparison.
   * @param {number=} epsilon Compare precision.
   *
   * @return {boolean} True if lines are identical.
   */
  equals(line, epsilon = Number.EPSILON) {
    return (this.start.equals(line.start, epsilon) && this.end.equals(line.end, epsilon)) ||
      (this.start.equals(line.end, epsilon) && this.end.equals(line.start, epsilon));
  }

  /**
   * left - Finds left X position.
   *
   * @return {number} Left X position.
   */
  get left() {
    return Math.min(this.start.x, this.end.x);
  }


  /**
   * right - Finds right X position.
   *
   * @return {number} Right X position.
   */
  get right() {
    return Math.max(this.start.x, this.end.x);
  }

  /**
   * top - Finds top Y position.
   *
   * @return {number} Top Y position.
   */
  get top() {
    return Math.min(this.start.y, this.end.y);
  }

  /**
   * bottom - Finds bottom Y position.
   *
   * @return {number} Bottom Y position.
   */
  get bottom() {
    return Math.max(this.start.y, this.end.y);
  }

  /**
   * reverse - Replace line start and end points.
   *
   * @return {Line} This line.
   */
  reverse() {
    let start = this.start;
    this.start = this.end;
    this.end = start;

    return this;
  }

  /**
   * normalize - Change line's length to one. Moves end point.
   *
   * @return {Line} This line.
   */
  normalize() {
    this.end
      .subtract(this.start)
      .normalize()
      .add(this.start);

    return this;
  }

  /**
   * scale - Change line's length to scaled. Moves end point.
   *
   * @return {Line} This line.
   */
  scale(multiplier) {
    this.end
      .subtract(this.start)
      .multiplyScalar(multiplier)
      .add(this.start);

    return this;
  }

  /**
   * zero - Description
   *
   * @return {Line} Description
   */
  zero() {
    return this.set(new Vector(), new Vector());
  }

  /**
   * length - Length of this line.
   *
   * @return {number} length.
   */
  length() {
    return this.start.distance(this.end);
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
    return outVector.set((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);
  }


  /**
   * type - Description
   *
   * @return {string} Description
   */
  get type() {
    return 'Line';
  }

  /**
   * containsXY - Shows whether point is on line.
   *
   * @param {number} x Point position x.
   * @param {number} y Point position y.
   *
   * @return {boolean} True if line contains point.
   */
  containsXY(x, y) {
    return this.contains(new Vector(x, y));
  }

  /**
   * contains - Shows whether point is on line.
   *
   * @param {Vector} vector Point to check.
   *
   * @return {boolean} True if line contains point.
   */
  contains(vector) {
    return this.start.distance(vector) + this.end.distance(vector) === this.length();
  }

  /**
   * intersects - Shows whether this line intersects another.
   *
   * @param {Line} line Line to check.
   *
   * @return {boolean} True if intersects.
   */
  intersects(line) {
    let start1 = this.start;
    let end1 = this.end;
    let start2 = line.start;
    let end2 = line.end;

    let denominator = ((end2.y - start2.y) * (end1.x - start1.x)) - ((end2.x - start2.x) * (end1.y - start1.y));

    if (denominator === 0) {
      return false;
    }

    let a = start1.y - start2.y;
    let b = start1.x - start2.x;
    let numerator1 = ((end2.x - start2.x) * a) - ((end2.y - start2.y) * b);
    let numerator2 = ((end1.x - start1.x) * a) - ((end1.y - start1.y) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    return a >= 0 && a <= 1 && b > 0 && b < 1;
  }

  /**
   * intersects - Shows whether this line intersects circle.
   *
   * @param {Circle} circle Circle to check.
   *
   * @return {boolean} True if intersects.
   */
  intersectsCircle(circle) {
    let start = this.start;
    let end = this.end;

    if (circle.contains(start) || circle.contains(end)) {
      return true;
    }

    let distance = start.distance(end);
    let directionX = (end.x - start.x) / distance;
    let directionY = (end.y - start.y) / distance;

    let t = directionX * (circle.x - start.x) + directionY * (circle.y - start.y);

    let nearest = new Vector((t * directionX) + start.x, (t * directionY) + start.y);
    let nearestDistance = nearest.distance(new Vector(circle.x, circle.y));

    if (nearestDistance < circle.r) {
      let dt = Math.sqrt(Math.pow(circle.r, 2) - Math.pow(nearestDistance, 2));

      let x1 = ((t - dt) * directionX + start.x);
      let y1 = ((t - dt) * directionY + start.y);
      let x2 = ((t + dt) * directionX + start.x);
      let y2 = ((t + dt) * directionY + start.y);

      return this.__isInBoundsXY(x1, y1) || this.__isInBoundsXY(x2, y2);
    }

    return false;
  }

  __isInBoundsXY(x, y) {
    let x1 = this.start.x;
    let y1 = this.start.y;
    let x2 = this.end.x;
    let y2 = this.end.y;

    return x > Math.min(x1, x2) && x < Math.max(x1, x2) && y > Math.min(y1, y2) && y < Math.max(y1, y2);
  }

  // @ifdef DEBUG
  /**
   * toString - String representation of this line.
   *
   * @param {number=} [digits=2] Number of digits after float point.
   *
   * @return {string} Description.
   */
  toString(digits = 2) {
    return `Line { start: ${this.start.toString(digits)}, end: ${this.end.toString(digits)} }`;
  }
  // @endif
}

/**
 * @type {Line}
 * @nocollapse
 * @ignore
 */
Line.__cache = new Line(new Vector(), new Vector());
