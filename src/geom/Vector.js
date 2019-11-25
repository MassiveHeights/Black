import { Debug } from "../core/Debug";
import { ObjectPool } from "../utils/ObjectPool";
import { MathEx } from "../math/MathEx";

/**
 * Mathematical representation of a vector.
 *
 * @cat geom
 */
export class Vector {
  /**
   * Creates new Vector instance.
   *
   * @param  {number=} [x=0] X-component.
   * @param  {number=} [y=0] y-component.
   */
  constructor(x = 0, y = 0) {
    Debug.isNumber(x, y);
    
    /** 
     * @type {number} X coordinate of a point in the space. 
     */
    this.x = x;

    /** 
     * @type {number} Y coordinate of a point in the space. 
     */
    this.y = y;
  }

  /**
   * Updates values of this vector with a given.
   *
   * @param {number=} [x=0] X-component.
   * @param {number=} [y=0] y-component
   * @return {black-engine~Vector} This.
   */
  set(x = 0, y = 0) {
    Debug.isNumber(x, y);

    this.x = x;
    this.y = y;

    return this;
  }

  /**
   * Adds two vectors.
   *
   * @param {black-engine~Vector} vector The vector object to be added to this.
   * @return {black-engine~Vector} This.
   */
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  /**
   * Subtract two vectors.
   *
   * @param {black-engine~Vector} vector The vector object to be subtracted.
   * @return {black-engine~Vector} This.
   */
  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }

  /**
   * Returns distance between two vectors.
   *
   * @param {black-engine~Vector} vector Second vector to check distance with.
   * @return {number} The distance between two vectors.
   */
  distance(vector) {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    return Math.sqrt((x * x) + (y * y));
  }

  /**
   * Returns the squared distance between two vectors.
   *
   * @param {black-engine~Vector} vector Second vector to check distance with.
   * @return {number} The distance between two vectors.
   */
  distanceSqr(vector) {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    return (x * x) + (y * y);
  }

  /**
   * Multiplies two vectors.
   *
   * @param {black-engine~Vector} vector A second vector to multiply with.
   * @return {black-engine~Vector} This.
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
   * @return {black-engine~Vector} This.
   */
  multiplyScalar(scalar) {
    Debug.isNumber(scalar);

    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  /**
   * Find dot product between two vectors.
   *
   * @param {black-engine~Vector} vector Second vector to find angle with.
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
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Returns the squared length of this vector.
   *
   * @return {number} Squared length.
   */
  lengthSqr() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Creates unit vector out of this one.
   *
   * @returns {black-engine~Vector} This.
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
   * @return {black-engine~Vector} This.
   */
  clamp(min, max) {
    Debug.isNumber(min, max);

    this.x = MathEx.clamp(this.x, min, max);
    this.y = MathEx.clamp(this.y, min, max);

    return this;
  }

  /**
   * Clamps vector length of this vector to given range.
   *
   * @param {number} min Min value.
   * @param {number} max Max value.
   * @return {black-engine~Vector} This.
   */
  clampLength(min, max) {
    Debug.isNumber(min, max);

    let length = MathEx.clamp(this.length(), min, max);
    this.normalize();
    this.multiplyScalar(length);
    return this;
  }

  /**
   * Linearly interpolates between two vectors.
   *
   * @param {black-engine~Vector} vector The second vector to interpolate values between.
   * @param {number} t      Alpha value.
   * @return {black-engine~Vector} This.
   */
  lerp(vector, t) {
    Debug.isNumber(t);

    this.x = MathEx.lerp(this.x, vector.x, t);
    this.y = MathEx.lerp(this.y, vector.y, t);

    return this;
  }

  /**
   * Copies this vector values into given vector.
   *
   * @param {black-engine~Vector} vector The vector to store values in.
   * @return {black-engine~Vector} Given vector.
   */
  copyTo(vector) {
    vector.x = this.x;
    vector.y = this.y;

    return vector;
  }

  /**
   * Copies values from given vector into this.
   *
   * @param {black-engine~Vector} vector The vector to copy values from.
   * @return {black-engine~Vector} This.
   */
  copyFrom(vector) {
    this.x = vector.x;
    this.y = vector.y;

    return this;
  }

  /**
   * Clones this vector object.
   *
   * @return {black-engine~Vector} New Vector instance.
   */
  clone() {
    return new Vector(this.x, this.y);
  }

  /**
   * Compares two vectors for equality.
   *
   * @param {black-engine~Vector} vector Second vector to compare with.
   * @param {number=} epsilon Threshold.
   * @return {boolean} True if equal.
   */
  equals(vector, epsilon = Number.EPSILON) {
    return vector !== null && (Math.abs(vector.x - this.x) < epsilon) && (Math.abs(vector.y - this.y) < epsilon);
  }

  /**
   * Checks if this vector is empty.
   *
   * @return {boolean} True if both components equal to zero.
   */
  isEmpty() {
    return this.x === 0 && this.y === 0;
  }

  /**
   * Rotates this vector around specified point.
   *
   * @param {black-engine~Vector} vector Center vector.
   * @param {number} rotation Angle in radians.
   * @return {black-engine~Vector} This rotated vector.
   */
  setRotationFrom(vector, rotation) {
    Debug.isNumber(rotation);

    return this
      .subtract(vector)
      .setRotation(rotation)
      .add(vector);
  }

  /**
   *  Rotates this vector around zero vector.
   *
   * @param {number} rotation Angle in radians.
   * @return {black-engine~Vector} This rotated vector.
   */
  setRotation(rotation) {
    Debug.isNumber(rotation);

    let cos = Math.cos(rotation);
    let sin = Math.sin(rotation);

    return this.set(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  }

  /**
   * Calculates angle in radians within this and specified vectors.
   *
   * @param {black-engine~Vector} vector Second vector.
   * @return {number} Angle in radians.
   */
  angleBetween(vector) {
    return Math.atan2(vector.y - this.y, vector.x - this.x);
  }

  /**
   * Calculates vector angle in radians. Same as heading.
   *
   * @return {number} Angle in radians.
   */
  angle() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Rotates this vector to normal.
   *
   * @return {black-engine~Vector} This vector.
   */
  perp() {
    return this.set(this.y, -this.x);
  }

  /**
   * Creates new Vector from given angle in radians.
   *
   * @param {number} angle Angle.
   * @param {black-engine~Vector=} outVector Vector to be returned.
   * @return {black-engine~Vector} New Vector object.
   */
  static fromAngle(angle, outVector) {
    Debug.isNumber(angle);

    outVector = outVector || new Vector();
    return outVector.set(Math.cos(angle), Math.sin(angle));
  }
  
  /**
   * Returns random number within this rectangle.
   * @returns {number}
   */
  get random() {
    return MathEx.randomBetween(this.x, this.y);
  }

  /**
   * @ignore
   * @param {black-engine~Vector} vectorMin
   * @param {black-engine~Vector} vectorMax
   * @param {black-engine~Vector=} outVector
   * @return {black-engine~Vector}
   */
  static randomRange(vectorMin, vectorMax, outVector) {
    outVector = outVector || new Vector();

    outVector.x = Math.random() * (vectorMax.x - vectorMin.x) + vectorMin.x;
    outVector.y = Math.random() * (vectorMax.y - vectorMin.y) + vectorMin.y;

    return outVector;
  }

  // @ifdef DEBUG
  /**
   * @ignore
   * @param {number=} [digits=2] Description
   * @return {string} Description
   */
  toString(digits = 2) {
    return `Vector: { x: ${this.x.toFixed(digits)}, y: ${this.y.toFixed(digits)} }`;
  }
  // @endif
}

/**
 * @ignore
 * @type {black-engine~Vector}
 * @nocollapse
 */
Vector.__cache = new Vector();

/**
 * Recycled vectors pool.
 *
 * @type {black-engine~ObjectPool}
 * @nocollapse
 */
Vector.pool = new ObjectPool(Vector);