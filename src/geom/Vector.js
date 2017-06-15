/**
 * Mathematical representation of a vector.
 *
 * @cat geom
 */
/* @echo EXPORT */
class Vector {
  /**
   * Creates new Vector instance.
   *
   * @param  {number=} x = 0 X-component.
   * @param  {number=} y = 0 y-component.
   */
  constructor(x = 0, y = 0) {
    /**
     * X coordinate of a point in the space.
     *
     * @type {number}
     */
    this.x = x;

    /**
     * Y coordinate of a point in the space.
     * @type {number}
     */
    this.y = y;
  }

  /**
   * Updates values of this vector with a given.
   *
   * @param {number=} [x=0] X-component.
   * @param {number=} [y=0] y-component
   *
   * @return {Vector} This.
   */
  set(x = 0, y = 0) {
    this.x = x;
    this.y = y;

    return this;
  }

  /**
   * Adds two vectors.
   *
   * @param {Vector} vector The vector object to be added to this.
   *
   * @return {Vector} This.
   */
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  /**
   * Subtract two vectors.
   *
   * @param {Vector} vector The vector object to be subtracted.
   *
   * @return {Vector} This.
   */
  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }

  /**
   * Returns distance between two vectors.
   *
   * @param {Vector} vector Second vector to check distance with.
   *
   * @return {number} The distance between two vectors.
   */
  distance(vector) {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    return Math.sqrt((x * x) + (y * y));
  }

  /**
   * Multiplies two vectors.
   *
   * @param {Vector} vector A second vector to multiply with.
   *
   * @return {Vector} This.
   */
  multiply(vector) {
    this.x *= vector.x;
    this.y *= vector.y;

    return this;
  }

  /**
   * Multiplies this vector by scalar value.
   *
   * @param {number} scalar The values to mul by.
   *
   * @return {Vector} This.
   */
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  /**
   * Find dot product between two vectors.
   *
   * @param {Vector} vector Second vector to find angle with.
   *
   * @return {number} A scalar value representing dot product.
   */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * Returns the length of this vector.
   *
   * @return {number} The length of the vector.
   */
  length() {
    let x = this.x;
    let y = this.y;

    return Math.sqrt(x * x + y * y);
  }

  /**
   * Returns the squared length of this vector.
   *
   * @return {number} Squared length.
   */
  lengthSqr() {
    let x = this.x;
    let y = this.y;

    return x * x + y * y;
  }

  /**
   * Creates unit vector out of this one.
   *
   * @returns {Vector} This.
   */
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
   * Clamps values of this vector to given range.
   *
   * @param {number} min Min value.
   * @param {number} max Max value.
   *
   * @return {Vector} This.
   */
  clamp(min, max) {
    this.x = MathEx.clamp(this.x, min, max);
    this.y = MathEx.clamp(this.y, min, max);

    return this;
  }

  /**
   * Linearly interpolates between two vectors.
   *
   * @param {Vector} vector The second vector to interpolate values between.
   * @param {number} t      Interpolant.
   *
   * @return {Vector} This.
   */
  lerp(vector, t) {
    this.x = MathEx.lerp(this.x, vector.x, t);
    this.y = MathEx.lerp(this.y, vector.y, t);

    return this;
  }

  /**
   * Copies this vector values into given vector.
   *
   * @param {Vector} vector The vector to store values in.
   *
   * @return {Vector} Given vector.
   */
  copyTo(vector) {
    vector.x = this.x;
    vector.y = this.y;

    return vector;
  }

  /**
   * Copies values from given vector into this.
   *
   * @param {Vector} vector The vector to copy values from.
   *
   * @return {Vector} This.
   */
  copyFrom(vector) {
    this.x = vector.x;
    this.y = vector.y;

    return this;
  }

  /**
   * Clones this vector object.
   *
   * @return {Vector} New Vector instance.
   */
  clone() {
    return new Vector(this.x, this.y);
  }

  /**
   * Compares two vectors for equality.
   *
   * @param {Vector} vector Second vector to compare with.
   * @param {number=} epsilon Threshold.
   *
   * @return {boolean} True if equal.
   */
  equals(vector, epsilon = Number.EPSILON) {
    return vector !== null && (Math.abs(vector.x - this.x) < epsilon) && (Math.abs(vector.y - this.y) < epsilon);
  }

  /**
   * Checks if this vector is empty.
   *
   * @return {boolean} True if both components equal to zero,
   */
  isEmpty() {
    return this.x === 0 && this.y === 0;
  }

  /**
   * Rotates this vector around specified point.
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
   *  Rotates this vector around zero vector.
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
   * Calculates angle in radians within this and specified vectors.
   *
   * @return {number} Angle in radians.
   */
  theta(vector) {
    return Math.acos(this.dot(vector) / this.length() / vector.length());
  }

  /**
   * Rotates this vector to normal.
   *
   * @return {Vector} This vector.
   */
  perp() {
    return this.set(this.y, -this.x);
  }

  /**
   * Creates new Vector from given angle in radians.
   *
   * @param {number=} [angle=0] Angle.
   *
   * @return {Vector} New Vector object.
   */
  static fromAngle(angle = 0) {
    return new Vector(Math.cos(angle), Math.sin(angle));
  }

  /**
   * @ignore
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

/**
 * @ignore
 * @type {Vector}
 * @nocollapse
 */
Vector.__cache = new Vector();
