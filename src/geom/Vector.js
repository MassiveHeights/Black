/* @echo EXPORT */
class Vector {
  /**
   * @param  {number=} x = 0 description
   * @param  {number=} y = 0 description
   */
  constructor(x = 0, y = 0) {
    /** @type {number} */
    this.x = x;

    /** @type {number} */
    this.y = y;
  }

  /**
   * set - Description
   *
   * @param {number=} [x=0] Description
   * @param {number=} [y=0] Description
   *
   * @return {Vector} Description
   */
  set(x = 0, y = 0) {
    this.x = x;
    this.y = y;

    return this;
  }

  /**
   * add - Description
   *
   * @param {Vector} vector Description
   *
   * @return {Vector} Description
   */
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  /**
   * subtract - Description
   *
   * @param {Vector} vector Description
   *
   * @return {Vector} Description
   */
  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }

  /**
   * distance - Description
   *
   * @param {Vector} vector Description
   *
   * @return {number} Description
   */
  distance(vector) {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    return Math.sqrt((x * x) + (y * y));
  }

  /**
   * multiply - Description
   *
   * @param {Vector} vector Description
   *
   * @return {Vector} Description
   */
  multiply(vector) {
    this.x *= vector.x;
    this.y *= vector.y;

    return this;
  }

  /**
   * multiplyScalar - Description
   *
   * @param {number} scalar Description
   *
   * @return {Vector} Description
   */
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  /**
   * dot - Description
   *
   * @param {Vector} vector Description
   *
   * @return {number} Description
   */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * length - Description
   *
   * @return {number} Description
   */
  length() {
    let x = this.x;
    let y = this.y;

    return Math.sqrt(x * x + y * y);
  }

  /**
   * lengthSqr - Description
   *
   * @return {number} Description
   */
  lengthSqr() {
    let x = this.x;
    let y = this.y;

    return x * x + y * y;
  }

  normalize() {
    let sum = this.lengthSqr();

    if (sum > 0) {
      sum = Math.sqrt(sum);
      this.x /= sum;
      this.y /= sum;
    } else {
      this.x = 0;
      this.y = 0;
    }

    return this;
  }

  /**
   * clamp - Description
   *
   * @param {number} min Description
   * @param {number} max Description
   *
   * @return {Vector} Description
   */
  clamp(min, max) {
    this.x = Math.clamp(this.x, min, max);
    this.y = Math.clamp(this.y, min, max);

    return this;
  }

  /**
   * lerp - Description
   *
   * @param {Vector} vector Description
   * @param {number} t      Description
   *
   * @return {Vector} Description
   */
  lerp(vector, t) {
    this.x = Math.lerp(this.x, vector.x, t);
    this.y = Math.lerp(this.y, vector.y, t);

    return this;
  }

  /**
   * copyTo - Description
   *
   * @param {Vector} vector Description
   *
   * @return {Vector} Description
   */
  copyTo(vector) {
    vector.x = this.x;
    vector.y = this.y;

    return vector;
  }

  /**
   * copyFrom - Description
   *
   * @param {Vector} vector Description
   *
   * @return {Vector} Description
   */
  copyFrom(vector) {
    this.x = vector.x;
    this.y = vector.y;

    return this;
  }

  /**
   * clone - Description
   *
   * @return {Vector} Description
   */
  clone() {
    return new Vector(this.x, this.y);
  }

  /**
   * equals - Description
   *
   * @param {Vector} vector Description
   * @param {number=} epsilon Description
   *
   * @return {boolean}
   */
  equals(vector, epsilon = Number.EPSILON) {
    return vector !== null && (Math.abs(vector.x - this.x) < epsilon) && (Math.abs(vector.y - this.y) < epsilon);
  }

  /**
   * isEmpty - Description
   *
   * @return {boolean} Description
   */
  isEmpty() {
    return this.x === 0 && this.y === 0;
  }

  /**
   * setRotationFrom - Rotates this vector around specified point.
   *
   * @param {Vector} vector Center vector.
   * @param {number} rotation Angle in radians.
   *
   * @return {Vector} This rotated vector.
   */
  setRotationFrom(vector, rotation) {
    return this
      .subtract(vector)
      .setRotation(rotation)
      .add(vector);
  }

  /**
   * setRotation - Rotates this vector around zero vector
   *
   * @param {number} rotation Angle in radians
   *
   * @return {Vector} This rotated vector.
   */
  setRotation(rotation) {
    let cos = Math.cos(rotation).toFixed(15);
    let sin = Math.sin(rotation).toFixed(15);

    return this.set(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  }

  /**
   * theta - Calculates angle in radians within this and specified vectors.
   *
   * @return {number} Angle in radians.
   */
  theta(vector) {
    return Math.acos(this.dot(vector) / this.length() / vector.length());
  }

  /**
   * perp - Rotates this vector to normal.
   *
   * @return {Vector} This vector.
   */
  perp() {
    return this.set(this.y, -this.x);
  }

  /**
   * fromAngle - Description
   *
   * @param {number=} [angle=0] Description
   *
   * @return {Vector} Description
   */
  static fromAngle(angle = 0) {
    return new Vector(Math.cos(angle), Math.sin(angle));
  }

  /**
   * randomRange
   *
   * @param {Vector} vectorMin
   * @param {Vector} vectorMax
   * @param {Vector=} outVector
   *
   * @return {Vector}
   */
  static randomRange(vectorMin, vectorMax, outVector = undefined) {
    outVector = outVector || new Vector();

    outVector.x = Math.random() * (vectorMax.x - vectorMin.x) + vectorMin.x;
    outVector.y = Math.random() * (vectorMax.y - vectorMin.y) + vectorMin.y;

    return outVector;
  }

  // @ifdef DEBUG
  /**
   * toString - Description
   *
   * @param {number=} [digits=2] Description
   *
   * @return {string} Description
   */
  toString(digits = 2) {
    return `Vector: { x: ${this.x.toFixed(digits)}, y: ${this.y.toFixed(digits)} }`;
  }
  // @endif
}

/** @type {Vector}
 * @nocollapse
 */
Vector.__cache = new Vector();
