
class MathEx {
  /**
   * randomBetween
   *
   * @param {number} a
   * @param {number} b
   *
   * @return {number}
   */
  static randomBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  };


  /**
   * clamp
   *
   * @param {number} value
   * @param {number} min
   * @param {number} max
   *
   * @return {number}
   */
  static clamp(value, min, max) {
    return (value < min) ? min : (value > max) ? max : value;
  };


  /**
   * lerp
   *
   * @param {number} a
   * @param {number} b
   * @param {number} t
   *
   * @return {number}
   */
  static lerp(a, b, t) {
    return a + t * (b - a);
  };


  /**
   * lerpp
   *
   * @param {number} a
   * @param {number} b
   * @param {number} t
   *
   * @return {number}
   */
  static lerpp(a, b, t) {
    return (1 - t) * a + t * b;
  };

  static equals(a, b, epsilon = Number.EPSILON) {
    return (a - epsilon < b) && (a + epsilon > b);
  }
}

/** @const
 *  @type {number}
 */
MathEx.PI_Q = Math.PI / 4;

/** @const
 *  @type {number}
 */
MathEx.PI2 = Math.PI * 2;

/** @const
 *  @type {number}
 */
MathEx.DEG2RAD = 0.01745329251994329576923690768489;

/** @const
 *  @type {number}
 */
MathEx.RAD2DEG = 57.295779513082320876798154814105;
// function assert(title, condition) {
//   if (condition)
//     console.log('%s %c[  OK  ]', title + ' ' + '.'.repeat(88 - title.length), 'color:green;')
//   else
//     console.log('%s %c[FAILED]', title + ' ' + '.'.repeat(88 - title.length), 'color:red;')
// }
//
// function perfTest(testName, fn, ctx, count = 1000) {
//   let startTime = new Date().getTime();
//
//   for (var i = 0; i < count; i++)
//     fn.apply(ctx);
//     //fn();
//
//   return (new Date().getTime() - startTime);
// }
//
// function perfCompare(testsName, fn1, fn2, ctx, count = 1000) {
//   let t1 = perfTest(testsName, fn1, ctx, count);
//   let t2 = perfTest(testsName, fn2, ctx, count);
//
//   let c1 = 'color:green;'
//   let c2 = 'color:red;'
//
//   if (t1 > t2) {
//     c1 = c2;
//     c2 = 'color:green;'
//   }
//
//   console.log('%s:%c %dms %cvs%c %dms', testsName, c1, t1, 'color:black;', c2, t2);
// }
//
// function assertf(title, func) {
//   const r = func();
//
//   const statuses = ['[  OK  ]', '[FAILED]'];
//   const colors = ['color:green;', 'color:red;'];
//
//   console.log('%s %c%s', title + ' ' + '.'.repeat(88 - title.length), r ? colors[0] : colors[1], r ? statuses[0] : statuses[1]);
// }

/**
 * Mathematical representation of a vector.
 *
 * @cat geom
 */

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
}

/**
 * @ignore
 * @type {Vector}
 * @nocollapse
 */
Vector.__cache = new Vector();

/**
 * A 2x3 matrix allows you to transform objects in space.
 *
 * @cat geom
 */

class Matrix {
  /**
   * Creates new Matrix instance.
   *
   * @param  {number} a = 1  A-component.
   * @param  {number} b = 0  B-component.
   * @param  {number} c = 0  C-component.
   * @param  {number} d = 1  D-component.
   * @param  {number} tx = 0 TX-component.
   * @param  {number} ty = 0 TY-component.
   */
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    /** @type {Float32Array} */
    this._matrix = new Float32Array(6);

    this.set(a, b, c, d, tx, ty);
  }

  /**
   * Sets components of this matrix to the given values.
   *
   * @param  {number} a  A-component.
   * @param  {number} b  B-component.
   * @param  {number} c  C-component.
   * @param  {number} d  D-component.
   * @param  {number} tx TX-component.
   * @param  {number} ty TY-component.
   * @return {Matrix} This.
   */
  set(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    let m = this._matrix;

    m[0] = a;
    m[1] = b;
    m[2] = c;
    m[3] = d;
    m[4] = tx;
    m[5] = ty;

    return this;
  }

  /**
   * Translates the matrix by x and y axes.
   *
   * @param {number} dx Amount along x-axis.
   * @param {number} dy Amount along y-axis.
   *
   * @return {Matrix} This.
   */
  translate(dx, dy) {
    let a = this._matrix;

    let /** @type {number} */ a0 = a[0]; // a
    let /** @type {number} */ a1 = a[1]; // b
    let /** @type {number} */ a2 = a[2]; // c
    let /** @type {number} */ a3 = a[3]; // d
    let /** @type {number} */ a4 = a[4]; // tx
    let /** @type {number} */ a5 = a[5]; // ty

    this._matrix[4] = a0 * dx + a2 * dy + a4;
    this._matrix[5] = a1 * dx + a3 * dy + a5;

    return this;
  }

  /**
   * Sets tx and ty components to given values.
   *
   * @param {number} x The tx component to update.
   * @param {number} y The ty component to update.
   *
   * @return {Matrix} This.
   */
  setTranslation(x, y) {
    this._matrix[4] = x;
    this._matrix[5] = y;

    return this;
  }

  /**
   * Sets absolute rotation of this matrix to specified angle.
   *
   * @param  {number} theta     Theta value.
   * @param  {number} scale = 1 Scale value.
   */
  setRotation(theta, scale = 1) {
    let m = this._matrix;
    m[0] = Math.cos(theta) * scale;
    m[2] = Math.sin(theta) * scale;
    m[1] = -m[2];
    m[3] = m[0];

    return this;
  }

  /**
   * Applies rotation to this matrix.
   *
   * @param  {number} angle Angle in radians.
   * @return {Matrix} This.
   */
  rotate(angle) {
    let a = this._matrix;
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    let a0 = a[0];
    let a2 = a[2];
    let a4 = a[4];

    a[0] = a0 * cos - a[1] * sin;
    a[1] = a0 * sin + a[1] * cos;
    a[2] = a2 * cos - a[3] * sin;
    a[3] = a2 * sin + a[3] * cos;
    a[4] = a4 * cos - a[5] * sin;
    a[5] = a4 * sin + a[5] * cos;

    return this;
  }

  /**
   * Scales current matrix.
   *
   * @param {number} sx Abscissa of the scaling vector.
   * @param {number} sy Ordinate of the scaling vector.
   *
   * @return {Matrix} This.
   */
  scale(sx, sy) {
    let a = this._matrix;
    let /** @type {number} */ a0 = a[0]; // a
    let /** @type {number} */ a1 = a[1]; // b
    let /** @type {number} */ a2 = a[2]; // c
    let /** @type {number} */ a3 = a[3]; // d
    let /** @type {number} */ a4 = a[4]; // tx
    let /** @type {number} */ a5 = a[5]; // ty

    this._matrix[0] = a0 * sx;
    this._matrix[1] = a1 * sx;
    this._matrix[2] = a2 * sy;
    this._matrix[3] = a3 * sy;

    return this;
  }

  /**
   * Resets current matrix to identity state.
   *
   * @return {Matrix} This.
   */
  identity() {
    return this.set(1, 0, 0, 1, 0, 0);
  }

  /**
   * Concatenates a given matrix with the current one.
   *
   * @param  {Matrix} b The matrix to be concatenated.
   * @return {Matrix}   This.
   */
  prepend(b) {
    let a = this._matrix;
    let bv = b._matrix;

    let /** @type {number} */ a0 = a[0]; // a
    let /** @type {number} */ a1 = a[1]; // b
    let /** @type {number} */ a2 = a[2]; // c
    let /** @type {number} */ a3 = a[3]; // d
    let /** @type {number} */ a4 = a[4]; // tx
    let /** @type {number} */ a5 = a[5]; // ty

    let /** @type {number} */ b0 = bv[0]; // a
    let /** @type {number} */ b1 = bv[1]; // b
    let /** @type {number} */ b2 = bv[2]; // c
    let /** @type {number} */ b3 = bv[3]; // d
    let /** @type {number} */ b4 = bv[4]; // tx
    let /** @type {number} */ b5 = bv[5]; // ty

    let a11 = (a0 * b0 + a1 * b2);
    a[1] = a0 * b1 + a1 * b3;
    a[0] = a11;

    let c11 = (a2 * b0 + a3 * b2);
    a[3] = a2 * b1 + a3 * b3;
    a[2] = c11;

    let tx11 = (a4 * b0 + a5 * b2 + b4);
    a[5] = a4 * b1 + a5 * b3 + b5;
    a[4] = tx11;
    return this;
  }

  /**
   * Appends values to this matrix.
   *
   * @param  {Matrix} b The matrix to be appended.
   * @return {Matrix} This.
   */
  append(b) {
    let a = this._matrix;
    let bv = b._matrix;

    let /** @type {number} */ a0 = a[0];
    let /** @type {number} */ a1 = a[1];
    let /** @type {number} */ a2 = a[2];
    let /** @type {number} */ a3 = a[3];
    let /** @type {number} */ a4 = a[4];
    let /** @type {number} */ a5 = a[5];
    let /** @type {number} */ b0 = bv[0];
    let /** @type {number} */ b1 = bv[1];
    let /** @type {number} */ b2 = bv[2];
    let /** @type {number} */ b3 = bv[3];
    let /** @type {number} */ b4 = bv[4];
    let /** @type {number} */ b5 = bv[5];

    a[0] = a0 * b0 + a2 * b1;
    a[1] = a1 * b0 + a3 * b1;
    a[2] = a0 * b2 + a2 * b3;
    a[3] = a1 * b2 + a3 * b3;
    a[4] = a0 * b4 + a2 * b5 + a4;
    a[5] = a1 * b4 + a3 * b5 + a5;
    return this;
  }

  /**
   * Transforms given and x- and y- components of a point from a local space to
   * world space.
   *
   * @param  {number} x          The x- component of a point.
   * @param  {number} y          The y- component of a point.
   * @param  {Vector=} outVector If given stores resulting values in it.
   * @return {Vector} Transformed Vector object.
   */
  transformXY(x, y, outVector) {
    outVector = outVector || new Vector();
    let m = this._matrix;

    outVector.x = m[0] * x + m[2] * y + m[4];
    outVector.y = m[1] * x + m[3] * y + m[5];

    return outVector;
  }

  /**
   * Transforms given point from a local space to world space without applying
   * scalling.
   *
   * @param  {number} x          The x- component.
   * @param  {number} y          The y- component.
   * @param  {Vector=} outVector If given stores results in it.
   * @return {Vector} Just transformed Vector object.
   */
  transformDirectionXY(x, y, outVector) {
    let m = this._matrix;
    outVector = outVector || new Vector();

    outVector.x = m[0] * x + m[2] * y;
    outVector.y = m[1] * x + m[3] * y;

    return outVector;
  }

  /**
   * Transforms vector by current matrix object.
   *
   * @param  {Vector} vector     Vector to apply transformation on.
   * @param  {Vector=} outVector Out Vector to store results in.
   * @return {Vector} New transformed vector.
   */
  transformVector(vector, outVector) {
    outVector = outVector || new Vector();
    let m = this._matrix;

    outVector.x = m[0] * vector.x + m[2] * vector.y + m[4];
    outVector.y = m[1] * vector.x + m[3] * vector.y + m[5];

    return outVector;
  }

  /**
   * Transforms rectangle by current matrix object.
   *
   * @param  {Rectangle} rect         Rectangle to apply transformation on.
   * @param  {Rectangle|null} outRect When given stores results in it.
   * @return {Rectangle} Tranformed Rectangle object.
   */
  transformRect(rect, outRect) {
    outRect = outRect || new Rectangle();

    let minX = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    let xx = 0;
    let yy = 0;
    let tmpVector = new Vector();

    // TODO: fix dirty hack. rewrite to use rect
    //let points = [rect.x, rect.y, rect.x + rect.width, rect.y + rect.height];

    /** @type {Array<number>} */
    let points = [rect.x, rect.y, rect.x + rect.width, rect.y, rect.x, rect.y + rect.height, rect.x + rect.width, rect.y + rect.height];

    for (var i = 0; i < points.length; i += 2) {
      xx = points[i];
      yy = points[i + 1];

      this.transformXY(xx, yy, tmpVector);

      if (minX > tmpVector.x)
        minX = tmpVector.x;
      if (maxX < tmpVector.x)
        maxX = tmpVector.x;
      if (minY > tmpVector.y)
        minY = tmpVector.y;
      if (maxY < tmpVector.y)
        maxY = tmpVector.y;
    }

    outRect.set(minX, minY, maxX - minX, maxY - minY);
    return outRect;
  }

  /**
   * Inverts current matrix.
   *
   * @return {Matrix} This.
   */
  invert() {
    let a = this._matrix;

    let aa = a[0];
    let ab = a[1];
    let ac = a[2];
    let ad = a[3];
    let atx = a[4];
    let aty = a[5];

    let det = aa * ad - ab * ac;
    if (det === 0) {
      a[0] = a[1] = a[2] = a[3] = 0;
      a[4] = -atx;
      a[5] = -aty;
      return this;
    }
    det = 1.0 / det;

    a[0] = ad * det;
    a[1] = -ab * det;
    a[2] = -ac * det;
    a[3] = aa * det;
    a[4] = (ac * aty - ad * atx) * det;
    a[5] = (ab * atx - aa * aty) * det;

    return this;
  }

  /**
   * TODO: remove or finish
   * @ignore
   *
   * @returns {Array<number>} Description
   */
  __decompose() {
    let m = this._matrix;
    let a = m[0];
    let b = m[1];
    let c = m[2];
    let d = m[3];
    let tx = m[4];
    let ty = m[5];

    let skewX = -Math.atan2(-c, d);
    let skewY = Math.atan2(b, a);

    let delta = Math.abs(skewX + skewY);

    let r_rotation = 0
    let r_skewX = 0;
    let r_skewY = 0;
    let r_scaleX = 0;
    let r_scaleY = 0;
    let r_x = 0;
    let r_y = 0;

    if (delta < 0.00001) {
      r_rotation = skewY;

      if (a < 0 && d >= 0)
        r_rotation += (r_rotation <= 0) ? Math.PI : -Math.PI;
    } else {
      r_skewX = skewX;
      r_skewY = skewY;
    }

    r_scaleX = Math.sqrt((a * a) + (b * b));
    r_scaleY = Math.sqrt((c * c) + (d * d));

    r_x = tx;
    r_y = ty;

    return [r_x, r_y, r_rotation, r_scaleX, r_scaleY, r_skewX, r_skewY];
  }

  /**
   * Clones the current matrix and returns new cloned object.
   *
   * @return {Matrix} New cloned object.
   */
  clone() {
    let m = new Matrix();
    let v = this._matrix;
    m.set(v[0], v[1], v[2], v[3], v[4], v[5]);
    return m;
  }

  /**
   * Copies values to given matrix.
   *
   * @param  {Matrix} matrix The destination matrix.
   * @return {Matrix} This.
   */
  copyTo(matrix) {
    let a = this._matrix;
    let b = matrix._matrix;

    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[3];
    b[4] = a[4];
    b[5] = a[5];

    return matrix;
  }

  /**
   * Copies values from given matrix into this.
   *
   * @param  {Matrix} matrix The matrix to copy values from.
   * @return {Matrix} This.
   */
  copyFrom(matrix) {
    return matrix.copyTo(this);
  }

  exactEquals(matrix) {
    if (!matrix)
    return false;

    let a = this._matrix;
    let b = matrix._matrix;
    
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
  }

  /**
   * Compares this matrix values with given matrix and checks if they are the same.
   *
   * @param  {Matrix} matrix                   Matrix object to compare with.
   * @param  {number} epsilon = Number.EPSILON Comparision threshold.
   * @return {boolean} True if equal.
   */
  equals(matrix, epsilon = Number.EPSILON) {
    if (!matrix)
      return false;

    let a = this._matrix;
    let b = matrix._matrix;    

    return (Math.abs(a[0] - b[0]) < epsilon) && (Math.abs(a[1] - b[1]) < epsilon) && (Math.abs(a[2] - b[2]) < epsilon) &&
      (Math.abs(a[3] - b[3]) < epsilon) && (Math.abs(a[4] - b[4]) < epsilon) && (Math.abs(a[5] - b[5]) < epsilon);
  }

  /**
   * Returns array of values representing this matrix object.
   *
   * @return {Float32Array}
   */
  get value() {
    return this._matrix;
  }

  /**
   * @param  {number=} digits = 2
   * @return {string}
   */
  toString(digits = 2) {
    return `        | ${this.value[0].toFixed(digits)} | ${this.value[1].toFixed(digits)} | ${this.value[4].toFixed(digits)} |
Matrix: | ${this.value[2].toFixed(digits)} | ${this.value[3].toFixed(digits)} | ${this.value[5].toFixed(digits)} |
        | ${(0).toFixed(digits)} | ${(0).toFixed(digits)} | ${(1).toFixed(digits)} |`;
  }
}

/**
 * @type {Matrix}
 * @nocollapse
 */
Matrix.__cache = new Matrix();

/**
 * Mathematical representation of a rectangle.
 *
 * @cat geom
 */

class Rectangle {
  /**
   * Creates new instance of Rectangle.
   *
   * @param  {number=} y = 0 X-component.
   * @param  {number=} x = 0 Y-component.
   * @param  {number=} w = 0 The width.
   * @param  {number=} h = 0 The height.
   */
  constructor(x = 0, y = 0, w = 0, h = 0) {
    /**
     * The x coordinate of the rectangle.
     * @type {number}
     */
    this.x = x;

    /**
     * The y coordinate of the rectangle.
     * @type {number}
     */
    this.y = y;

    /**
     * The width of the rectangle.
     * @type {number}
     */
    this.width = w;

    /**
     * The height of the rectangle.
     * @type {number}
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
   *
   * @return {Rectangle} This.
   */
  set(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    return this;
  }

  /**
   * Copies values from given rectangle into this one.
   *
   * @param {Rectangle} rect The Rectangle to copy values from.
   *
   * @return {Rectangle} This.
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
   * @param {Rectangle} rect The destination rect.
   *
   * @return {Rectangle} Given rect object.
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
   * @ignore
   *
   * @param {number} left
   */
  set left(left) {
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
   * @ignore
   *
   * @param {number} right
   */
  set right(right) {
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
   * @ignore
   *
   * @param {number} top
   */
  set top(top) {
    this.y = top;
  }

  /**
   * Get/Sets the bottommost point of this rectangle.
   *
   * @return {number} Description
   */
  get bottom() {
    return this.y + this.height;
  }

  /**
   * @ignore
   *
   * @param {number} bottom
   */
  set bottom(bottom) {
    this.y = bottom - this.height;
  }

  /**
   * Get/Sets the top left point for this rectangle.
   *
   * @return {Vector}
   */
  get topLeft() {
    return new Vector(this.x, this.y);
  }

  /**
   * @ignore
   *
   * @param {Vector} vector
   */
  set topLeft(vector) {
    this.left = vector.x;
    this.top = vector.y;
  }

  /**
   * Get/Sets the top right point for this rectangle.
   *
   * @return {Vector} Description
   */
  get topRight() {
    return new Vector(this.right, this.y);
  }

  /**
   * @ignore
   *
   * @param {Vector} vector
   */
  set topRight(vector) {
    this.right = vector.x;
    this.top = vector.y;
  }

  /**
   * Get/Sets the top left point for this rectangle.
   *
   * @return {Vector} Description
   */
  get bottomRight() {
    return new Vector(this.right, this.bottom);
  }

  /**
   * @ignore
   *
   * @param {Vector} vector
   */
  set bottomRight(vector) {
    this.right = vector.x;
    this.bottom = vector.y;
  }

  /**
   * Get/Sets the top left point for this rectangle.
   *
   * @return {Vector} Description
   */
  get bottomLeft() {
    return new Vector(this.x, this.bottom);
  }

  /**
   * @ignore
   *
   * @param {Vector} vector
   */
  set bottomLeft(vector) {
    this.x = vector.x;
    this.bottom = vector.y;
  }

  /**
   * Creates a new Rectangle instance with width and height equal to current
   * instance.
   *
   * @param {Vector=} outVector Resulting rect to save values in.
   *
   * @return {Vector} New Rectangle instance or `outVector` if passed.
   */
  size(outVector = undefined) {
    outVector = outVector || new Vector();
    return outVector.set(this.width, this.height);
  }

  /**
   * Sets all components of this Rectangle to zero.
   *
   * @return {Rectangle} This.
   */
  zero() {
    return this.set(0, 0, 0, 0);
  }


  /**
   * Compares this Rectangle with a given one.
   *
   * @param {Rectangle} rect                  Rect to compare values with.
   * @param {number} epsilon = Number.EPSILON
   *
   * @return {boolean} True if rects are equal.
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
   *
   * @return {boolean} True if point is inside.
   */
  containsXY(x, y) {
    return x >= this.x && x <= this.right && y >= this.y && y <= this.bottom;
  }


  /**
   * Checks if a given rectangle is inside this rect.
   *
   * @param {Rectangle} rect Rectangle to check with.
   *
   * @return {boolean} True if given rectangle is inside this one.
   */
  contains(rect) {
    return rect.x >= this.x && rect.y >= this.y && rect.right <= this.right && rect.bottom <= this.bottom;
  }

  /**
   * Checks if this rect intersects with a given rectangle.
   *
   * @param {Rectangle} rect The rect to check intersection with.
   *
   * @return {boolean} True if intersects.
   */
  intersects(rect) {
    return rect.right > this.x && rect.bottom > this.y &&
           rect.x < this.right && rect.y < this.bottom;
  }


  /**
   * Adds given rectangle into this.
   *
   * @param {Rectangle} toUnion A rectangle object to add to this rect.
   *
   * @return {Rectangle} New rectangle object that is the union.
   */
  union(toUnion) {
    if (this.width === 0 || this.height === 0)
      return toUnion.clone();
    else if (toUnion.width === 0 || toUnion.height === 0)
      return this.clone();

    let x0 = this.x > toUnion.x ? toUnion.x : this.x;
    let x1 = this.right < toUnion.right ? toUnion.right : this.right;
    let y0 = this.y > toUnion.y ? toUnion.y : this.y;
    let y1 = this.bottom < toUnion.bottom ? toUnion.bottom : this.bottom;

    return new Rectangle(x0, y0, x1 - x0, y1 - y0);
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
   *
   * @return {Rectangle} This.
   */
  expand(x, y, width, height) {
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
   * Increases the size of this rectangle by given x- and y- values.
   *
   * @param {number=} [x=0] X-component.
   * @param {number=} [y=0] Y-component.
   *
   * @return {Rectangle} This.
   */
  inflate(x = 0, y = 0) {
    this.x -= x;
    this.y -= y;
    this.width += 2 * x;
    this.height += 2 * y;

    return this;
  }

  /**
   * Clones this Rectangle object into new one.
   *
   * @return {Rectangle} New rectangle object.
   */
  clone() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }

  /**
   * perimeter - Description
   *
   * @return {number} Description
   */
  get perimeter() {
    return 2 * (this.width + this.height);
  }


  /**
   * Returns the center point of this rectangle.
   *
   * @param {Vector=} outVector The out-Vector to store values in.
   *
   * @return {Vector} New rectangle object.
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
   *
   * @return {Rectangle} This rectangle.
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
  isEmpty() {
    return this.width === 0 && this.height === 0;
  }

  get lines() { // todo
    return [
      new Line(this.topLeft, this.topRight),
      new Line(this.topRight, this.bottomRight),
      new Line(this.bottomRight, this.bottomLeft),
      new Line(this.bottomLeft, this.topLeft)
    ];
  }

  /**
   * toString - Description
   *
   * @param {number=} [digits=2] Description
   *
   * @return {string} Description
   */
  toString(digits = 2) {
    return `Rectangle { x: ${this.x.toFixed(digits)}, y: ${this.y.toFixed(digits)}, width: ${this.width.toFixed(digits)}, height: ${this.height.toFixed(digits)} }`;
  }
}

/**
 * @ignore
 * @type {Rectangle}
 * @nocollapse
 */
Rectangle.__cache = new Rectangle();

/**
 * Mathematical representation of a circle.
 *
 * @cat geom
 */

class Circle {
  /**
   * Creates new Circle instance.
   * 
   * @param  {number=} x = 0 Position x.
   * @param  {number=} y = 0 Position y.
   * @param  {number=} r = 1 Radius.
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
   * Clones this circle.
   *
   * @return {Circle} Created circle.
   */
  clone() {
    return new Circle(this.x, this.y, this.r);
  }

  /**
   * Copy this properties to another circle.
   *
   * @param {Circle} circle Object to copy to.
   *
   * @return {Circle} Passed circle.
   */
  copyTo(circle) {
    return circle.set(this.x, this.y, this.r);
  }

  /**
   * Copy another circle properties to this.
   *
   * @param {Circle} circle Object to copy from.
   *
   * @return {Circle} This circle.
   */
  copyFrom(circle) {
    return this.set(circle.x, circle.y, circle.r);
  }

  /**
   * Shows whether circles are identical.
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
   * Shows whether point is in circle.
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
   * Shows whether point is in circle.
   *
   * @param {Vector} vector Point to check.
   *
   * @return {boolean} True if circle contains point.
   */
  contains(vector) {
    return new Vector(this.x, this.y).subtract(vector).length() <= this.r;
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
   * @return {Vector}
   */
  get topPoint() {
    return new Vector(this.x, this.top);
  }

  /**
   * Returns bottom point of this circle.
   *
   * @return {Vector}
   */
  get bottomPoint() {
    return new Vector(this.x, this.bottom);
  }

  /**
   * Resets all values to zero.
   *
   * @return {Circle} Returns this.
   */
  zero() {
    return this.set(0, 0, 0);
  }

  /**
   * Shows whether this circle intersects another.
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
   * Shows whether this circle collide with another.
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
   * Represents center as vector.
   *
   * @param {Vector=} outVector Object for result.
   *
   * @return {Vector} Center point.
   */
  center(outVector = undefined) {
    outVector = outVector || new Vector();
    return outVector.set(this.x, this.y);
  }

  /**
   * String representation of this circle.
   *
   * @param {number=} [digits=2] Number of digits after float point.
   *
   * @return {string} Returns string representation of this circle.
   */
  toString(digits = 2) {
    return `Circle { x: ${this.x.toFixed(digits)}, y: ${this.y.toFixed(digits)}, r: ${this.r.toFixed(digits)} }`;
  }
}

/** @type {Circle}
 * @nocollapse
 */
Circle.__cache = new Circle();

/**
 * Mathematical representation of a bezier curve.
 *
 * @cat geom
 */

class Line {
  /**
   * Creates new Line instance.
   * @param  {Vector} start Start point.
   * @param  {Vector} end End point.
   */
  constructor(start, end) {
    /** @type {Vector} */
    this.start = start;

    /** @type {Vector} */
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
  scale(multyplier) {
    this.end
      .subtract(this.start)
      .multiplyScalar(multyplier)
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

      let x1 = ((t - dt) * directionX + start.x).toFixed(15);
      let y1 = ((t - dt) * directionY + start.y).toFixed(15);
      let x2 = ((t + dt) * directionX + start.x).toFixed(15);
      let y2 = ((t + dt) * directionY + start.y).toFixed(15);

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
}

/** @type {Line}
 * @nocollapse
 */
Line.__cache = new Line(new Vector(), new Vector());

/**
 * @cat geom
 */

class Polygon {
  /**
   * Creates new Polygon instance.
   *
   * @param  {Array<Vector>} vertices = [] Array of vertex points;
   */
  constructor(vertices = []) {

    /**
     * @private
     * @type {Array<Vector>}
     */
    this.mVertices = vertices;

    /**
     * @private
     * @type {Array<Line>}
     */
    this.mLines = [];

    /**
     * @private
     * @type {Rectangle}
     */
    this.mBounds = new Rectangle();

    /**
     * @private
     * @type {Vector}
     */
    this.mCenter = new Vector();

    this.refresh();
  }

  /**
   * set - Sets new vertices.
   *
   * @param {Array<Vector>} vertices New points.
   *
   * @return {Polygon} This polygon.
   */
  set(vertices) {
    this.mVertices = vertices;
    this.refresh();
    return this;
  }

  /**
   * copyTo - Copy this properties to another polygon.
   *
   * @param {Polygon} polygon Object to copy to.
   *
   * @return {Polygon} Passed polygon.
   */
  copyTo(polygon) {
    let len = this.mVertices.length;
    let vertices = [];

    for (let i = 0; i < len; i++) {
      vertices.push(this.mVertices[i].clone());
    }

    return polygon.set(vertices);
  }

  /**
   * copyFrom - Copy another polygon properties to this.
   *
   * @param {Polygon} polygon Object to copy from.
   *
   * @return {Polygon} This polygon.
   */
  copyFrom(polygon) {
    let polygonVertices = polygon.mVertices;
    let len = polygonVertices.length;
    let vertices = [];

    for (let i = 0; i < len; i++) {
      vertices.push(polygonVertices[i].clone());
    }

    return this.set(vertices);
  }

  /**
   * clone - Clones this polygon.
   *
   * @return {Polygon} Created polygon.
   */
  clone() {
    let thisVertices = this.mVertices;
    let len = thisVertices.length;
    let vertices = [];

    for (let i = 0; i < len; i++) {
      vertices.push(thisVertices[i].clone());
    }

    return new Polygon(vertices);
  }

  get width() {
    return this.mBounds.width;
  }

  get height() {
    return this.mBounds.height;
  }

  /**
   * containsXY - Shows whether point is in polygon.
   *
   * @param {number} x Point position x.
   * @param {number} y Point position y.
   *
   * @return {boolean} True if polygon contains point.
   */
  containsXY(x, y) {
    return this.contains(new Vector(x, y));
  }

  /**
   * contains - Shows whether point is in polygon.
   *
   * @param {Vector} vector Point to check.
   *
   * @return {boolean} True if polygon contains point.
   */
  contains(vector) {
    let center = this.mCenter;
    let lines = this.mLines;
    let len = lines.length;

    if (center.equals(vector)) {
      return true;
    }

    let intersectionLine = new Line(vector, center.clone());
    let intersects = 0;
    intersectionLine.scale((this.width + this.height) / intersectionLine.length());

    for (let i = 0; i < len; i++) {
      intersects += lines[i].intersects(intersectionLine) ? 1 : 0;
    }

    return intersects % 2 !== 0;
  }

  /**
   * perimeter - Perimeter of this polygon.
   *
   * @return {number} perimeter.
   */
  get perimeter() {
    let thisLines = this.mLines;
    let len = thisLines.length;
    let perimeter = 0;

    for (let i = 0; i < len; i++) {
      perimeter += thisLines[i].length();
    }

    return perimeter;
  }

  /**
   * collide - Checks collides between two polygons.
   *
   * @param {Polygon} polygon Object to check.
   *
   * @return {boolean} True if polygon collides with another polygon.
   */
  collide(polygon) {
    if (!this.mBounds.intersects(polygon.mBounds)) {
      return false;
    }

    let thisLines = this.mLines;
    let thisLen = thisLines.length;
    let polygonLines = polygon.mLines;
    let polygonLen = polygonLines.length;

    for (let i = 0; i < thisLen; i++) {
      for (let j = 0; j < polygonLen; j++) {
        if (thisLines[i].intersects(polygonLines[j])) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * collideCircle - Checks collides between this polygon and circle.
   *
   * @param {Circle} circle Object to check.
   *
   * @return {boolean} True if polygon collides with circle.
   */
  collideCircle(circle) {
    let bounds = this.mBounds;
    let lines = this.mLines;

    if (bounds.left > circle.right || bounds.right < circle.left || bounds.top > circle.bottom || bounds.bottom < circle.top) {
      return false;
    }

    let len = lines.length;
    for (let i = 0; i < len; i++) {
      if (lines[i].intersectsCircle(circle)) {
        return true;
      }
    }

    return false;
  }

  /**
   * collideRectangle - Checks collides between this polygon and rectangle.
   *
   * @param {Rectangle} rectangle Object to check.
   *
   * @return {boolean} True if polygon collides with rectangle.
   */
  collideRectangle(rectangle) {
    if (!this.mBounds.intersects(rectangle)) {
      return false;
    }

    let thisLines = this.mLines;
    let thisLen = thisLines.length;
    let rectangleLines = rectangle.lines;
    let rectangleLen = rectangleLines.length;

    for (let i = 0; i < thisLen; i++) {
      for (let j = 0; j < rectangleLen; j++) {
        if (thisLines[i].intersects(rectangleLines[j])) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * overlap - Checks overlaps between this polygon and another.
   *
   * @param {Polygon} polygon Object to check.
   *
   * @return {boolean} True if polygon overlaps second.
   */
  overlap(polygon) {
    if (this.mBounds.width < polygon.mBounds.width || this.mBounds.height < polygon.mBounds.height) {
      return false;
    }

    if (!this.contains(polygon.mCenter)) {
      return false;
    }

    let thisLines = this.mLines;
    let thisLen = thisLines.length;
    let polygonLines = polygon.mLines;
    let polygonLen = polygonLines.length;

    for (let i = 0; i < thisLen; i++) {
      for (let j = 0; j < polygonLen; j++) {
        if (thisLines[i].intersects(polygonLines[j])) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * overlapCircle - Checks overlaps between this polygon and circle.
   *
   * @param {Circle} circle Object to check.
   *
   * @return {boolean} True if polygon overlaps circle.
   */
  overlapCircle(circle) {
    if (!this.containsXY(circle.x, circle.y)) {
      return false;
    }

    let thisLines = this.mLines;
    let len = thisLines.length;

    for (let i = 0; i < len; i++) {
      if (thisLines[i].intersectsCircle(circle)) {
        return false;
      }
    }

    return true;
  }

  /**
   * overlapRectangle - Checks overlaps between this polygon and rectangle.
   *
   * @param {Rectangle} rectangle Object to check.
   *
   * @return {boolean} True if polygon overlaps rectangle.
   */
  overlapRectangle(rectangle) {
    if (!this.contains(rectangle.center())) {
      return false;
    }

    let thisLines = this.mLines;
    let thisLen = thisLines.length;
    let rectangleLines = rectangle.lines;
    let rectangleLen = rectangleLines.length;

    for (let i = 0; i < thisLen; i++) {
      for (let j = 0; j < rectangleLen; j++) {
        if (thisLines[i].intersects(rectangleLines[j])) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * refresh - ReCalc center, bounds, and edges of this polygon.
   *
   * @return {Polygon} This polygon.
   */
  refresh() {
    let center = this.mCenter;
    let bounds = this.mBounds;
    let vertices = this.mVertices;
    let lines = this.mLines = [];
    center.set(0, 0);

    // bounds
    let maxX = -Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;

    for (let i = 0; i < vertices.length; i++) {
      let vector = vertices[i];
      center.add(vector);

      // bounds
      let {
        x,
        y
      } = vector;
      maxX = x > maxX ? x : maxX;
      maxY = y > maxY ? y : maxY;
      minX = x < minX ? x : minX;
      minY = y < minY ? y : minY;

      lines.push(new Line(vector, vertices[i + 1] || vertices[0]));
    }

    center.multiplyScalar(1 / vertices.length);
    bounds.set(minX, minY, maxX - minX, maxY - minY);

    return this;
  }

  /**
   * refreshCenter - ReCalc center of this polygon.
   *
   * @return {Polygon} This polygon.
   */
  refreshCenter() {
    let center = this.mCenter;
    let vertices = this.mVertices;
    let len = vertices.length;
    center.set(0, 0);

    for (let i = 0; i < len; i++) {
      center.add(vertices[i]);
    }

    center.multiplyScalar(1 / vertices.length);

    return this;
  }

  /**
   * refreshBounds - ReCalc bounds of this polygon.
   *
   * @return {Polygon} This polygon.
   */
  refreshBounds() {
    let bounds = this.mBounds;
    let vertices = this.mVertices;
    let maxX = -Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let len = vertices.length;
    let x;
    let y;

    for (let i = 0; i < len; i++) {
      x = vertices[i].x;
      y = vertices[i].y;
      maxX = x > maxX ? x : maxX;
      maxY = y > maxY ? y : maxY;
      minX = x < minX ? x : minX;
      minY = y < minY ? y : minY;
    }

    bounds.set(minX, minY, maxX - minX, maxY - minY);

    return this;
  }

  /**
   * refreshLines - ReCalc edges of this polygon.
   *
   * @return {Polygon} This polygon.
   */
  refreshLines() {
    let vertices = this.mVertices;
    let lines = this.mLines = [];

    for (let i = 0; i < vertices.length; i += 2) {
      lines.push(new Line(vertices[i], vertices[i + 1] || vertices[0]));
    }

    return this;
  }

  /**
   * fromPath - Creates instance of Polygon.
   *
   * @param {string} path Numbers x y divided with space.
   *
   * @return {Polygon} Created polygon.
   */
  static fromPath(path) {
    let vertices = [];
    let path2 = path.split(' ');

    for (let i = 0; i < path2.length; i += 2) {
      vertices.push(new Vector(Number(path2[i]), Number(path2[i + 1])));
    }

    return new Polygon(vertices);
  }

  /**
   * setRotation - Sets rotation. Rotate this polygon around it center.
   *
   * @param {number} rotation Angle in radians.
   *
   * @return {Polygon} This polygon.
   */
  setRotation(rotation) {
    let center = this.mCenter;
    let vertices = this.mVertices;
    let cos = Math.cos(rotation).toFixed(15);
    let sin = Math.sin(rotation).toFixed(15);

    for (let i = 0, len = vertices.length; i < len; i++) {
      let vector = vertices[i];
      vector
        .subtract(center)
        .set(vector.x * cos - vector.y * sin, vector.x * sin + vector.y * cos)
        .add(center);
    }

    return this.refresh();
  }

  /**
   * setTranslation - Translates this polygon to specified position.
   *
   * @param {Vector} point Translation vector.
   *
   * @return {Polygon} This vertices.
   */
  setTranslation(point) {
    let center = this.mCenter;
    let vertices = this.mVertices;
    let len = vertices.length;
    point.subtract(center);

    for (let i = 0; i < len; i++) {
      vertices[i].add(point);
    }

    return this.refresh();
  }

  /**
   * toString - String representation of this polygon.
   *
   * @param {number=} [digits=2] Number of digits after float point.
   *
   * @return {string} Description.
   */
  toString(digits = 2) {
    let thisLines = this.mLines;
    let thisVertices = this.mVertices;
    let len = thisLines.length;
    let vertices = '';
    let lines = '';

    for (let i = 0; i < len; i++) {
      lines += thisLines[i].toString(digits);
    }

    len = thisVertices.length;
    for (let i = 0; i < len; i++) {
      vertices += thisVertices[i].toString(digits);
    }

    return `Polygon { vertices: ${vertices}, bounds: ${this.mBounds.toString(digits)}, center: ${this.mCenter.toString()}, lines: ${lines} }`;
  }

}

/** @type {Polygon}
 * @nocollapse
 */
Polygon.__cache = new Polygon();

/**
 * Mathematical representation of a bezier curve.
 *
 * @cat geom
 */

class Curve {
  /**
   * Creates new Curve instance.
   */
  constructor() {
    /**
     * @private
     * @type {Array<number>}
     */
    this.mPoints = [];

    /**
     * @private
     * @type {Array<Vector>}
     */
    this.mLookup = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mBaked = false;

    /**
     * @private
     * @type {number}
     */
    this.mStep = 1 / 60;

    /**
     * @private
     * @type {Array<number>}
     */
    this.mEachT = [];
  }

  /**
   * Sets new points coordinates.
   *
   * @param  {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   *
   * @return {Curve} This curve.
   */
  set(...points) {
    this.mPoints = this.__initPoints(points);
    this.__refreshEachT();

    if (this.mBaked)
      this.__refreshCache();

    return this;
  }


  /**
   * Enables or disables interpolation from cache (lookup).
   * Returns true or false depending on baked is enabled or not.
   *
   * @return {boolean}
   */
  get baked() {
    return this.mBaked;
  }

  /**
   * @ignore
   * @param  {boolean} label
   */
  set baked(label) {
    this.mBaked = label;

    if (!this.mLookup && this.mPoints) {
      this.__refreshCache();
    }
  }

  /**
   * Wides points array. Sets first point for next bezier same as last of previous.
   * @private
   * @param  {Array<number>} points Array of points coordinates.
   *
   * @return {Array<number>} Points coordinates array.
   */
  __initPoints(points) {
    let res = [];

    for (let i = 6; i < points.length; i += 6) {
      res = res.concat(points.slice(i - 6, i + 2));
    }

    return res;
  }

  /**
   * Refresh cache (lookup) for fast interpolations.
   *
   * @private
   *
   * @return {Curve} This curve.
   */
  __refreshCache() {
    let lookup = this.mLookup = [];
    let getFullLength = this.getFullLength();
    let points = this.mPoints;
    let pointsLen = points.length;

    for (let i = 0; i < pointsLen; i += 8) {
      let length = Curve.getLength(...points.slice(i, i + 8));
      let step = this.mStep * getFullLength / length;

      for (let t = step; t < 1; t += step)
        lookup.push(Curve.lerp(t, ...points.slice(i, i + 8)));
    }

    return this;
  }


  /**
   * Refresh local interpolation kof for each bezier in curve.
   * @private
   * @return {Curve} This curve.
   */
  __refreshEachT() {
    let points = this.mPoints;
    let eachT = this.mEachT = [];
    let pointsLen = points.length;
    let eachLength = [];

    for (let i = 0; i < pointsLen; i += 8)
      eachLength.push(Curve.getLength(...points.slice(i, i + 8)));

    let length = this.getFullLength();
    let s = 0;
    for (let i = 0; i < pointsLen; i += 8) {
      s += eachLength[i / 8];
      eachT.push(s / length);
    }

    return this;
  }

  /**
   * Interpolates single bezier on t position.
   *
   * @param  {number} t Interpolation position (0...1).
   * @param  {number} startX
   * @param  {number} startY
   * @param  {number} cpStartX
   * @param  {number} cpStartY
   * @param  {number} cpEndX
   * @param  {number} cpEndY
   * @param  {number} endX
   * @param  {number} endY
   * @param  {Vector=} outVector
   *
   * @return {Vector} Position on bezier.
   */
  static lerp(t, startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX, endY, outVector) {
    let u = 1 - t;
    let tt = t * t;
    let uu = u * u;
    let uuu = uu * u;
    let ttt = tt * t;

    let p = outVector || new Vector();
    p.set(startX, startY);
    p.x *= uuu;
    p.y *= uuu;

    // first
    p.x += 3 * uu * t * cpStartX;
    p.y += 3 * uu * t * cpStartY;

    // second
    p.x += 3 * u * tt * cpEndX;
    p.y += 3 * u * tt * cpEndY;

    // third
    p.x += ttt * endX;
    p.y += ttt * endY;

    return p;
  }

  /**
   * Interpolates across whole curve.
   *
   * @param  {number} t Interpolation position (0...1).
   * @param  {Vector=} outVector
   *
   * @return {Vector} Position on curve.
   */
  interpolate(t, outVector) {
    let res = outVector || new Vector();
    let lookup = this.mLookup;

    if (this.mBaked) {
      let i = Math.ceil((lookup.length - 1) * t);
      let p = lookup[i];
      res.copyFrom(p);

      return res;
    }

    // not backed
    let { mEachT, mPoints } = this;
    let i = 0;

    while (mEachT[i] < t)
      i++;

    let minT = mEachT[i - 1] || 0;
    let maxT = mEachT[i];
    let bezier = mPoints.slice(i * 8, i * 8 + 8);

    return Curve.lerp((t - minT) / (maxT - minT), ...bezier, res);
  }

  /**
   * Returns single bezier length.
   *
   * @param  {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX, endY
   *
   * @return {number} Length.
   */
  static getLength(...points) {
    let p0 = new Vector(points[0], points[1]);
    let p1 = new Vector(points[2], points[3]);
    let p2 = new Vector(points[4], points[5]);
    let p3 = new Vector(points[6], points[7]);

    return (p3.distance(p0) + p0.distance(p1) + p1.distance(p2) + p2.distance(p3)) / 2;
  }

  /**
   * Returns this curve length.
   *
   * @return {number} Length.
   */
  getFullLength() {
    let points = this.mPoints;
    let mPointsLen = points.length;
    let res = 0;

    for (let i = 0; i < mPointsLen; i += 8)
      res += Curve.getLength(...points.slice(i, i + 8));

    return res;
  }
}

/**
 * @private
 * @type {Curve}
 * @nocollapse
 */
Curve.__cache = new Curve();

/**
 * Utility class for logging and debugging.
 *
 * @cat core
 */

class Debug {
  constructor() {
    Debug.assert(false, 'Static class.');
  }

  static assert(value, message) {
    if (value === true)
      return;

    message = message == null ? 'Assertation failed.' : message;

    if (Debug.logOnFail)
      console.error('[ASSERT]', message);

    if (Debug.throwOnFail)
      throw new Error(message);
  }

  static log(...message) {
    console.info('%c%s', 'color: black;', 'LOG:', ...message);
  }

  static info(...message) {
    console.info('%c%s', 'color: #003bd2;', 'INFO:', ...message);
  }

  static warn(...message) {
    console.info('%c%s', 'color: #f67400;', 'WARN:', ...message);
  }

  static error(...message) {
    console.info('%c%s', 'color: #d50000;', 'ERROR:', ...message);
  }
}

Debug.throwOnFail = false;
Debug.logOnFail = true;

/**
 * Message holds all information about dispatched event.
 *
 * @cat core
 */

class Message {
  constructor() {
    /**
     * @private
     * @type {*}
     */
    this.mSender = null;

    /**
     * @private
     * @type {string}
     */
    this.mName;

    /**
     * @private
     * @type {string|null}
     */
    this.mPathMask = null;

    /**
     * @private
     * @type {string|null}
     */
    this.mComponentMask = null;

    /**
     * @private
     * @type {string}
     */
    this.mDirection = 'none';

    /**
     * @private
     * @type {boolean}
     */
    this.mSibblings = false;

    /**
     * @private
     * @type {Object}
     */
    this.mOrigin = null;

    /**
     * @private
     * @type {Object}
     */
    this.mTarget = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mCanceled = false;
  }

  /**
   * @return {string|null}
   */  
  get path() {
    var hasComponentMask = this.mComponentMask !== null;

    if (this.mPathMask !== null) {
      if (hasComponentMask === true)
        return this.mPathMask + '#' + this.mComponentMask;
      else
        return this.mPathMask;  
    }
    else if (hasComponentMask === true) {
      return this.mComponentMask;
    }

    return null;
  }

  /**
   * Who send the message.
   *
   * @return {*}
   */
  get sender() {
    return this.mSender;
  }

  /**
   * The name of the message.
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }

  /**
   * Direction in what message was sent. Can be 'none', 'up' and 'down'.
   *
   * @return {string}
   */
  get direction() {
    return this.mDirection;
  }

  /**
   * Indicates if sibblings should be included into dispatching process.
   *
   * @return {boolean}
   */
  get sibblings() {
    return this.mSibblings;
  }

  /**
   * The GameObject.name mask string if was used.
   *
   * @return {string|null}
   */
  get pathMask() {
    return this.mPathMask;
  }

  /**
   * Component mask string if was used.
   *
   * @return {string|null}
   */
  get componentMask() {
    return this.mComponentMask;
  }

  /**
   * The original sender of a message.
   *
   * @return {*|null}
   */
  get origin() {
    return this.mOrigin;
  }

  /**
   * The listener object.
   *
   * @return {*|null}
   */
  get target() {
    return this.mTarget;
  }

  // /**
  //  * Stops propagation of the message.
  //  *
  //  * @return {void}
  //  */
  // cancel() {
  //   this.mCanceled = true;
  // }

  // /**
  //  * True if message was canceled by the user.
  //  *
  //  * @return {boolean}
  //  */
  // get canceled() {
  //   return this.mCanceled;
  // }

  static get PROGRESS() {
    return 'progress';
  }
  static get COMPLETE() {
    return 'complete';
  }
}
/**
 * The MessageDispatcher class is the base class for all classes that posts messages.
 *
 * Global messages will not be dispatched on non GameObject objects.
 *
 *
 *
 * @cat core
 * @unrestricted
 */

class MessageDispatcher {
  constructor() {
    // object of arrays

    /**
     * @private
     * @type {Object<string, Array>}
     */
    this.mListeners = null;
  }

  /**
   * Listens to message by given name
   *
   * @param {string} name           Name of a message to listen
   * @param {Function} callback       The callback function
   * @param {Object=} [context=null] The context for callback function
   *
   * @return {void}
   */
  on(name, callback, context = null) {
    Debug.assert(name !== null, 'name cannot be null.');
    Debug.assert(callback !== null, 'callback cannot be null.');

    // TODO: refactor, expore dispatching provider
    let filterIx = name.indexOf('@');
    if (filterIx !== -1) {
      // global handler

      let pureName = name.substring(0, filterIx);
      let pathMask = name.substring(filterIx + 1);

      if (MessageDispatcher.mOverheardHandlers.hasOwnProperty(pureName) === false)
        MessageDispatcher.mOverheardHandlers[pureName] = [];

      let dispatchers = (MessageDispatcher.mOverheardHandlers[pureName]);
      // for (let i = 0; i < dispatchers.length; i++)
      //   if (dispatchers[i].callback === callback)
      //     return;

      dispatchers.push({
        callback: callback,
        context: context,
        pathMask: pathMask
      });

      return;
    }

    if (this.mListeners === null)
      this.mListeners = {};

    if (this.mListeners.hasOwnProperty(name) === false)
      this.mListeners[name] = [];

    let dispatchers = /** @type {Array<{callback: Function, context}>} */ (this.mListeners[name]);

    // TODO: check for dups somehow
    // for (let i = 0; i < dispatchers.length; i++)
    //   if (dispatchers[i].callback === callback)
    //     return;

    dispatchers.push({
      callback: callback,
      context: context
    });
  }

  /**
   * Returns true if this object is subscribed for any messages with a given name.
   *
   * @param {string} name Message name to check.
   *
   * @returns {boolean} True if found.
   */
  hasOn(name) {
    Debug.assert(name !== null, 'name cannot be null.');

    let filterIx = name.indexOf('@');
    if (filterIx !== -1) {
      let pureName = name.substring(0, filterIx);
      if (MessageDispatcher.mOverheardHandlers.hasOwnProperty(pureName) === false)
        return false;
    } else {
      if (this.mListeners === null)
        return false;
      else if (this.mListeners.hasOwnProperty(name) === false)
        return false;
    }

    return true;
  }

  /**
   * Removes listener.
   * If callback is null then all callbacks will be removed.
   *
   * @param {string} name
   * @param {Function=} [callback=null]
   *
   * @return {void}
   */
  removeOn(name, callback = null) {
    Debug.assert(name !== null, 'name cannot be null.');
    //Debug.assert(callback !== null, 'callback cannot be null.');

    let filterIx = name.indexOf('@');
    if (filterIx !== -1) {
      //we are working with overheared message
      let pureName = name.substring(0, filterIx);
      let pathMask = name.substring(filterIx + 1);

      if (MessageDispatcher.mOverheardHandlers.hasOwnProperty(pureName) === false)
        return;

      let dispatchers = (MessageDispatcher.mOverheardHandlers[pureName]);

      if (callback === null) {
        dispatchers.splice(0, dispatchers.length);
        return;
      } else {
        for (let i = dispatchers.length; i--;) {
          if (dispatchers[i].callback === callback) {
            dispatchers.splice(i, 1);
            return;
          }
        }
      }

    } else {
      // regular message
      if (this.mListeners === null)
        return;

      let dispatchers = /** @type {Array<{callback: Function, context}>} */ (this.mListeners[name]);

      if (dispatchers === undefined)
        return;

      if (callback === null) {
        dispatchers.splice(0, dispatchers.length);
        return;
      } else {
        for (let i = dispatchers.length; i--;) {
          if (dispatchers[i].callback === callback) {
            dispatchers.splice(i, 1);
            return;
          }
        }
      }
    }
  }

  /**
   * Sends message with given pattern and params
   *
   * @param {string}  name   The name of a message
   * @param {...*} params A list of params to send
   *
   * @return {void}
   */
  post(name, ...params) {
    // TODO: add wildcard support and name mask annotation support
    Debug.assert(name !== null, 'name cannot be null.');
    // if (name === null || name.length === 0)
    //   throw new Error('Name cannot be null.');

    let message = this.__parseMessage(this, name);

    //if (message.name === null && message.name === '')
    Debug.assert(message.name !== '', 'Message.name cannot be null.');  

    // TODO: o'really 62?
    let isGameObjectOrComponent = this instanceof GameObject || this instanceof Component;
    if (message.mDirection !== 'none' && isGameObjectOrComponent === false)
      throw new Error('Dispatching not direct messages are not allowed on non Game Objects.');

    if (message.mDirection === 'none') {
      this.__invoke(this, message, ...params);
      this.__invokeComponents(this, message, ...params);
      this.__invokeOverheard(this, message, ...params);
    } else if (message.mDirection === 'down') {
      message.mOrigin = ( /** @type {GameObject} */ (this)).root;

      if (message.mSibblings === true) {
        this.__sendGlobal(this, message, null, ...params);
        message.mOrigin.__invokeOverheard(this, message, ...params);
      } else {
        this.__sendBubbles(this, message, false, ...params);
        message.mSender.__invokeOverheard(message.sender, message, ...params);
      }
    } else if (message.mDirection === 'up') {
      this.__sendBubbles(this, message, true, ...params);
      message.mSender.__invokeOverheard(message.sender, message, ...params);
    } else {
      throw new Error('Unknown message type.');
    }
  }

  /**
   * @private
   * @param {*}  sender
   * @param {Message}  message
   * @param {boolean}  toTop
   * @param {...*} params
   *
   * @return {void}
   */
  __sendBubbles(sender, message, toTop, ...params) {
    message.mOrigin = toTop === true ? this : ( /** @type {GameObject} */ (this)).root;

    let list = [this];

    let current = /** @type {GameObject|Component} */ (this);
    if (this instanceof Component) {
      if (current.gameObject !== null) {
        list.push(current.gameObject);
        current = current.gameObject;
      }
    }

    while (current.parent !== null) {
      list.push(current.parent);
      current = current.parent;
    }

    if (toTop) {
      for (let i = 0; i < list.length; i++) {
        let dispatcher = /** @type {GameObject} */ (list[i]);
        dispatcher.__invoke(sender, message, ...params);
        dispatcher.__invokeComponents(sender, message, ...params);
      }
    } else {
      for (let i = list.length - 1; i >= 0; i--) {
        let dispatcher = /** @type {GameObject} */ (list[i]);
        dispatcher.__invoke(sender, message, ...params);
        dispatcher.__invokeComponents(sender, message, ...params);
      }
    }
  }

  /**
   * @private
   * @param {*}  sender
   * @param {Message}  message
   * @param {GameObject=}  origin
   * @param {...*} params
   *
   * @return {void}
   */
  __sendGlobal(sender, message, origin, ...params) {
    if (origin === null)
      origin = /** @type {GameObject} */ (message.mOrigin);

    origin.__invoke(sender, message, ...params);
    origin.__invokeComponents(sender, message, ...params);

    for (let i = 0; i < origin.numChildren; i++) {
      let child = origin.getChildAt(i);
      child.__sendGlobal(sender, message, child, ...params);
    }
  }

  /**
   * @private
   * @param {*}  sender
   * @param {Message}  message
   * @param {...*} params
   *
   * @return {void}
   */
  __invoke(sender, message, ...params) {
    if (this.mListeners === null)
      return;

    let dispatchers = /** @type {Array<{callback: Function, context}>} */ (this.mListeners[message.mName]);

    if (dispatchers === undefined || dispatchers.length === 0)
      return;

    if (message.path !== null) {
      let inPath = this.__checkPath(this.path, message.path);
      if (!inPath)
        return;
    }

    // no path filter found - just invoke it
    let clone = dispatchers.slice(0);

    for (let i = 0; i < clone.length; i++) {
      let dispatcher = /** @type {{callback: Function, context: *}} */ (clone[i]);
      message.mTarget = this;
      dispatcher.callback.call(dispatcher.context, message, ...params);
    }
  }

  __invokeComponents(sender, message, toTop, ...params) {
    let isGameObject = this instanceof GameObject;
    if (isGameObject === false)
      return;  
    
    let go = /** @type {GameObject} */ (this);

    let len = go.mComponents.length;
    for (let i = 0; i < len; i++) {
      let c = go.mComponents[i];
      c.__invoke(sender, message, ...params);
    }
  }

  /**
   * @private
   * @param {*}  sender
   * @param {Message}  message
   * @param {...*} params
   *
   * @return {void}
   */
  __invokeOverheard(sender, message, ...params) {
    let dispatchers = MessageDispatcher.mOverheardHandlers[message.mName];

    if (dispatchers === undefined || dispatchers.length === 0)
      return;

    let clone = dispatchers.slice(0);

    for (let i = 0; i < clone.length; i++) {
      let dispatcher = /** @type {{callback: Function, context: *}} */ (clone[i]);

      if (!this.__checkPath(sender.path, dispatcher.pathMask))
        continue;

      message.mTarget = this;
      dispatcher.callback.call(dispatcher.context, message, ...params);
    }
  }

  /**
   * @private
   * @param {string} path
   * @param {string} pathMask
   *
   * @return {boolean}
   */
  __checkPath(path, pathMask) {
    if (path == null || pathMask == null)
      return false;

    if (path === pathMask)
      return true;

    if (pathMask.indexOf('*') === -1)
      return path === pathMask;
    else
      return new RegExp("^" + pathMask.split("*").join(".*") + "$").test(path);
  }

  // TODO: parse exception path'ses like: ~tatata@@@omg####imnotidiout###@@~~
  /**
   * @private
   * @param {*} sender
   * @param {string} info
   *
   * @return {Message}
   */
  __parseMessage(sender, info) {
    // TODO: make message pool... this type of objects shall not be
    // but dont forget to take care about cancel property

    let result = new Message();
    result.mSender = sender;
    result.mDirection = 'none';
    result.mSibblings = true;
    result.mPathMask = null;
    result.mComponentMask = null;

    if (info.charAt(0) === '~') {
      result.mSibblings = false;
      result.mDirection = 'up';
    }

    let ixAt = info.indexOf('@');
    let ixHash = info.indexOf('#');

    if (ixAt === -1 && ixHash === -1) {
      result.mSibblings = false;
      result.mName = info.substr(result.mDirection === 'up' ? 1 : 0);
      return result;
    }

    Debug.assert(ixHash !== -1 && ixAt >= 0, 'Message syntax is not correct. Did you miss @?');

    result.mDirection = 'down';

    if (ixHash === -1) { // we got no hash but we have a dog
      result.mName = info.substring(result.mSibblings ? 0 : 1, ixAt);

      if (info.length === ixAt + 1)
        result.mPathMask = null;
      else
        result.mPathMask = info.substring(ixAt + 1);

      return result;
    } else {
      if (ixAt !== -1) {
        result.mPathMask = info.substring(ixAt + 1, ixHash);
        result.mName = info.substring(result.mSibblings ? 0 : 1, ixAt);
      } else {
        result.mName = info.substring(result.mSibblings ? 0 : 1, ixHash);
      }

      if (info.length === ixHash + 1)
        result.mComponentMask = null;
      else
        result.mComponentMask = info.substring(ixHash + 1);

      return result;
    }
  }
}

/**
 * @private
 * @dict
 */
MessageDispatcher.mOverheardHandlers = {};
/**
 * Provides time related methods.
 *
 * @cat core
 * @static
 */

class Time {
  constructor() {
  }

  /**
   * Time since start in seconds.
   * @returns {number}
   */
  static get time(){
    return Time.mTime;
  }

  /**
   * @ignore
   */
  static get dt() {
    return Time.mDeltaTime;
  }

  /**
   * @ignore
   */
  static get scale() {
    return Time.mScale;
  }

  /**
   * @ignore
   */
  static set scale(value) {
    Debug.assert(value >= 0, 'Time.scale must be >= 0.');

    Time.mScale = value;
  }
}

/**
 * @ignore
 * @type {number}
 */
Time.mTime = 0;

/** 
 * @ignore
 * @type {number}
 */
Time.mDeltaTime = 0;

/** 
 * @ignore
 * @type {number}
 */
Time.mScale = 1;

/**
 * Base class for custom systems. System is used to listen scene changes.
 *
 * @cat core
 * @extends MessageDispatcher
 */

class System extends MessageDispatcher {
  constructor(){
    super();
  }


  /**
   * onFixedUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  onFixedUpdate(dt){
  }


  /**
   * onUpdate - Description
   *
   * @param {number} dt Description
   * @param {number} t Description
   *
   * @return {void} Description
   */
  onUpdate(dt, t){
  }

  /**
   * onPostUpdate - Description
   *
   * @param {number} dt Description
   * @param {number} t Description
   *
   * @return {void} Description
   */
  onPostUpdate(dt, t){
  }


  /**
   * onChildrenAdded - Description
   *
   * @param {GameObject} child Description
   *
   * @return {void} Description
   */
  onChildrenAdded(child){
  }


  /**
   * onChildrenRemoved - Description
   *
   * @param {GameObject} child Description
   *
   * @return {void} Description
   */
  onChildrenRemoved(child){
  }


  /**
   * onComponentAdded - Description
   *
   * @param {GameObject} child     Description
   * @param {Component} component Description
   *
   * @return {void} Description
   */
  onComponentAdded(child, component)
  {}


  /**
   * onComponentRemoved - Description
   *
   * @param {GameObject} child     Description
   * @param {Component} component Description
   *
   * @return {void} Description
   */
  onComponentRemoved(child, component)
  {}
}

/**
 * Manages viewport, handles DOM container resize events and updates internal data.
 *
 * @cat core
 * @fires resize
 * @extends MessageDispatcher
 */

class Viewport extends MessageDispatcher {
  /**
   * constructor
   * @param {HTMLElement} containerElement
   * @return {void}
   */
  constructor(containerElement) {
    super();

    /** @type {HTMLElement} */
    this.mContainerElement = containerElement;

    this.mContainerElement.style.userSelect = 'none';
    this.mContainerElement.style.touchAction = 'none';
    this.mContainerElement.style.overflow = 'hidden';
    this.mContainerElement.style.cursor = 'auto';
    this.mContainerElement.style.WebkitTapHighlightColor = 'rgba(0, 0, 0, 0)';

    let size = this.mContainerElement.getBoundingClientRect();

    /** @type {Rectangle} */
    this.mSize = new Rectangle(size.left, size.top, size.width, size.height);

    window.addEventListener('resize', x=> this.__onResize());
  }

  __onResize() {
    let size = this.mContainerElement.getBoundingClientRect();
    this.mSize = new Rectangle(size.left, size.top, size.width, size.height);

    this.post('resize', this.mSize);
  }

  /**
   * size - Returns the size of a viewport.
   * @return {Rectangle}
   */
  get size(){
    return this.mSize;
  }

  /**
   * nativeDOM - Retruns the HTML container element the engine runs in.
   * @return {Element}
   */
  get nativeDOM(){
    return this.mContainerElement;
  }

  // TODO: dispose, remove resize event
}

/**
 * A base class for custom components.
 *
 * @cat core
 * @unrestricted
 * @extends MessageDispatcher
 */

class Component extends MessageDispatcher {
  /**
   * Creates new Component instance.
   */
  constructor() {
    super();

    /**
     * @private
     * @type {number} 
     */
    this.mId = ++GameObject.ID;

    /**
     * @private
     * @type {GameObject|null}
     */
    this.mGameObject = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mAdded = false;
  }

  /**
   * Called when attached to GameObject.
   *
   * @public
   *
   * @param  {GameObject} gameObject The owner of this component.
   * @return {void}
   */
  onAdded(gameObject) {}

  /**
   * Called when detached from GameObject.
   *
   * @public
   *
   * @param  {GameObject} gameObject The owner of this component.
   * @return {void}
   */
  onRemoved(gameObject) {}

  /**
   * Called at every fixed frame update.
   * @public
   *
   * @param  {number} dt Amount of seconds since the last update.
   * @return {void}
   */
  onFixedUpdate(dt) {}

  /**
   * Called at every engine update.
   * @public
   *
   * @param  {number} dt Amount of seconds since the last update.
   * @return {void}
   */
  onUpdate(dt) {}

  /**
   * Called after all updates have been executed.
   * @public
   *
   * @param  {number} dt Amount of seconds since the last update.
   * @return {void}
   */
  onPostUpdate(dt) {}

  // TODO: finish
  dispose() {}

  // TODO: finish

  /**
   * Detaches this Component from its parent GameObject.
   * @returns {void}
   */
  removeFromParent() {
    if (this.mGameObject === null)
      return;

    this.mGameObject.removeComponent(this);
  }

  /**
   * Returns owner of this component.
   *
   * @returns {GameObject}
   */
  get gameObject() {
    return this.mGameObject;
  }

  /**
   * Returns string representing a url like path to this object in the display
   * tree.
   *
   * @readonly
   *
   * @return {string|null}
   */
  get path() {
    if (this.mGameObject !== null)
      return this.mGameObject.path + '#' + this.constructor.name;

    return this.constructor.name;
  }
}

/**
 * @ignore
 * @type {number}
 * @nocollapse
 */
Component.ID = 0;
/**
 * Building block in Black Engine.
 *
 * @cat core
 * @unrestricted
 * @extends MessageDispatcher
 */

class GameObject extends MessageDispatcher {
  /**
   * Creates new instance of GameObject.
   */
  constructor() {
    super();

    /**
     * @private
     * @type {number}
     */
    this.mId = ++GameObject.ID;

    /**
     * @private
     * @type {string|null}
     */
    this.mName = null;

    /**
     * @private
     * @type {Array<Component>}
     */
    this.mComponents = [];

    /**
     * @private
     * @type {Array<GameObject>}
     */
    this.mChildren = [];

    /**
     * @private
     * @type {number}
     */
    this.mX = 0;

    /**
     * @private
     * @type {number}
     */
    this.mY = 0;

    /**
     * @private
     * @type {number}
     */
    this.mScaleX = 1;

    /**
     * @private
     * @type {number}
     */
    this.mScaleY = 1;

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
    this.mRotation = 0;

    /**
     * @private
     * @type {Rectangle}
     */
    this.mBounds = null;

    /**
     * @private
     * @type {Matrix}
     */
    this.mLocalTransform = new Matrix();

    /**
     * @private
     * @type {Matrix}
     */
    this.mWorldTransform = new Matrix();

    /**
     * @private
     * @type {DirtyFlag}
     */
    this.mDirty = DirtyFlag.DIRTY;

    /**
     * @private
     * @type {GameObject}
     */
    this.mParent = null;

    /**
     * @private
     * @type {string|null}
     */
    this.mTag = null;

    /**
     * @private
     * @type {number}
     */
    this.mIndex = 0;

    /**
     * @private
     * @type {boolean}
     */
    this.mAdded = false;

    /**
     * @private
     * @type {number}
     */
    this.mNumChildrenRemoved = 0;

    /**
     * @private
     * @type {number}
     */
    this.mNumComponentsRemoved = 0;
  }

  /**
   * Returns unique object id.
   *
   * @returns {number}
   */
  get id() {
    return this.mId;
  }

  /**
   * This method called each time object added to stage.
   *
   * @public
   * @return {void}
   */
  onAdded() { }

  /**
   * Called when object is removed from stage.
   *
   * @public
   * @return {void}
   */
  onRemoved() { }


  /**
   * Sugar method for adding child GameObjects or Components in a simple manner.
   *
   * @param {...(GameObject|Component)} gameObjectsAndOrComponents A GameObject or Component to add.
   * @return {Array<GameObject|Component>} The passed GameObject or Component.
   */
  add(...gameObjectsAndOrComponents) {
    for (let i = 0; i < gameObjectsAndOrComponents.length; i++) {
      let gooc = gameObjectsAndOrComponents[i];

      if (gooc instanceof GameObject)
        this.addChild( /** @type {!GameObject} */(gooc));
      else
        this.addComponent( /** @type {!Component} */(gooc));
    }

    return gameObjectsAndOrComponents;
  }

  /**
   * Adds a child GameObject instance to this GameObject instance. The child is added to the top of all other children in this GameObject instance.
   *
   * @param  {GameObject} child The GameObject instance to add as a child of this GameObject instance.
   * @return {GameObject}
   */
  addChild(child) {
    return this.addChildAt(child, this.mChildren.length);
  }

  /**
   * Adds a child GameObject instance to this GameObject instance. The child is added to the top of all other children in this GameObject instance.
   *
   * @param  {GameObject} child The GameObject instance to add as a child of this GameObject instance.
   * @param  {number=} index = 0 The index position to which the child is added.
   * @return {GameObject} The GameObject instance that you pass in the child parameter.
   */
  addChildAt(child, index = 0) {
    let numChildren = this.mChildren.length;

    if (index < 0 || index > numChildren)
      throw new Error('Child index is out of bounds.');

    if (child.mParent === this)
      return this.setChildIndex(child, index);

    // this operation should be atomic. since __setParent can throw exception.
    this.mChildren.splice(index, 0, child);

    child.removeFromParent();
    child.__setParent(this);

    if (this.root !== null)
      Black.instance.onChildrenAdded(child);

    return child;
  }

  /**
   * @protected
   * @ignore
   * @param {GameObject} value
   *
   * @return {boolean}
   */
  __setParent(value) {
    let p = value;

    while (p !== null && p !== this)
      p = p.mParent;

    if (p === this)
      throw new Error('Object cannot be a child to itself.');

    this.mParent = value;
    this.setTransformDirty();
    return true;
  }

  /**
   * Sets the index (layer) of the specified GameObject to the specified index (layer).
   *
   * @param {GameObject} child The GameObject instance to change index for.
   * @param {number} index Desired index.
   *
   * @returns {GameObject} The GameObject instance that you pass in the child parameter.
   */
  setChildIndex(child, index) {
    let ix = this.mChildren.indexOf(child);

    if (ix < 0)
      throw new Error('Given child element was not found in children list.');

    if (ix === index)
      return child;

    // NOTE: systems needs to know when trees changes
    child.removeFromParent();
    this.addChildAt(child, index);
    this.setTransformDirty();

    return child;
  }

  /**
   * Removes this GameObject instance from its parent.
   *
   * @param {boolean} [dispose=false]
   *
   * @return {void}
   */
  removeFromParent(dispose = false) {
    if (this.mParent !== null)
      this.mParent.removeChild(this);

    if (dispose)
      this.dispose();

    this.setTransformDirty();
  }

  /**
   * Removes specified child GameObject instance from children.
   *
   * @param {GameObject} child GameObject instance to remove.
   * @param {boolean} [dispose=false]
   *
   * @return {GameObject} The GameObject instance that you pass in the child parameter.
   */
  removeChild(child, dispose) {
    let ix = this.mChildren.indexOf(child);

    if (ix < 0)
      return null;

    return this.removeChildAt(ix);
  }


  /**
   * Finds children by name.
   *
   * @param {string} name Name of the child object to find.
   *
   * @return {GameObject|null} GameObject instance of null if not found.
   */
  getChildByName(name) {
    for (var i = 0; i < this.mChildren.length; i++) {
      if (this.mChildren[i].name === name)
        return this.mChildren[i];
    }

    return null;
  }

  /**
   * Removes GameObjects instance from specified index.
   *
   * @param {number} index Description
   * @param {boolean} [dispose=false]
   *
   * @return {GameObject} The removed GameObject instance.
   */
  removeChildAt(index, dispose) {
    if (index < 0 || index > this.numChildren)
      throw new Error('Child index is out of bounds.');

    let hadRoot = this.root !== null;

    let child = this.mChildren[index];
    child.__setParent(null);

    this.mChildren.splice(index, 1);

    if (hadRoot)
      Black.instance.onChildrenRemoved(child);

    if (dispose)
      child.dispose();

    this.setTransformDirty();

    this.mNumChildrenRemoved++;

    return child;
  }

  /**
   * Returns GameObject at specified index.
   *
   * @param {number} index The index of child GameObject.
   *
   * @return {GameObject} The GameObject at specified index.
   */
  getChildAt(index) {
    return this.mChildren[index];
  }

  /**
   * Adds Component instance to the end of the list,
   *
   * @param  {Component} component Component instance or instances.
   * @return {Component} The Component instance you pass in the instances parameter.
   */
  addComponent(component) {
    let instance = component;

    if (instance.gameObject)
      throw new Error('Component cannot be added to two game objects at the same time.');

    this.mComponents.push(instance);
    instance.mGameObject = this;

    if (this.root !== null)
      Black.instance.onComponentAdded(this, instance);

    instance.onAdded(this);

    return instance;
  }

  /**
   * Remove specified component.
   *
   * @param {Component} instance The component instance.
   *
   * @return {Component|null}
   */
  removeComponent(instance) {
    if (!instance)
      return null;

    let index = this.mComponents.indexOf(instance);
    if (index > -1)
      this.mComponents.splice(index, 1);

    // detach game object after or before?
    instance.mGameObject = null;
    instance.onRemoved(this);

    if (this.root !== null)
      Black.instance.onComponentRemoved(this, instance);

    this.mNumComponentsRemoved++;

    return instance;
  }

  /**
   * Get component by type.
   *
   * @param {Object} typeName The component type.
   *
   * @return {Component|null} The Component instance or null if not found.
   */
  getComponent(typeName) {
    for (let i = 0; i < this.mComponents.length; i++) {
      let c = this.mComponents[i];
      if (c instanceof typeName)
        return c;
    }

    return null;
  }

  /**
   * Returns number of component's of this GameObject.
   *
   * @return {number}
   */
  get numComponenets() {
    return this.mComponents.length;
  }

  /**
   * Retrives Component at given index.
   *
   * @param {number} index
   *
   * @return {Component|null}
   */
  getComponentAt(index) {
    if (index >= 0 && index < this.mComponents.length)
      return this.mComponents[index];

    return null;
  }

  /**
   * Retun local transformation Matrix
   *
   * @return {Matrix}
   */
  get localTransformation() {
    if (this.mDirty & DirtyFlag.LOCAL) {
      this.mDirty ^= DirtyFlag.LOCAL;

      if (this.mRotation === 0) {
        let tx = this.mX - this.mPivotX * this.mScaleX;
        let ty = this.mY - this.mPivotY * this.mScaleY;
        return this.mLocalTransform.set(this.mScaleX, 0, 0, this.mScaleY, tx, ty);
      } else {
        let cos = Math.cos(this.mRotation);
        let sin = Math.sin(this.mRotation);
        let a = this.mScaleX * cos;
        let b = this.mScaleX * sin;
        let c = this.mScaleY * -sin;
        let d = this.mScaleY * cos;
        let tx = this.mX - this.mPivotX * a - this.mPivotY * c;
        let ty = this.mY - this.mPivotX * b - this.mPivotY * d;
        return this.mLocalTransform.set(a, b, c, d, tx, ty);
      }
    }

    return this.mLocalTransform;
  }

  /**
   * Returns cloned Matrix object which represents object orientation in world space.
   *
   * @return {Matrix}
   */
  get worldTransformation() {
    if (this.mDirty & DirtyFlag.WORLD) {
      this.mDirty ^= DirtyFlag.WORLD;

      if (this.mParent !== null)
        this.mParent.worldTransformation.copyTo(this.mWorldTransform).append(this.localTransformation);
      else
        this.localTransformation.copyTo(this.mWorldTransform);
    }
    
    return this.mWorldTransform;
  }

  /**
   * @ignore
   * @param {Matrix} value
   *
   * @return {void}
   */
  set worldTransformation(matrix) {
    const PI_Q = Math.PI / 4.0;

    let a = matrix.value[0];
    let b = matrix.value[1];
    let c = matrix.value[2];
    let d = matrix.value[3];
    let tx = matrix.value[4];
    let ty = matrix.value[5];

    this.mPivotX = this.mPivotX = 0;
    this.mX = tx;
    this.mY = ty;

    let skewX = Math.atan(-c / d);
    let skewY = Math.atan(b / a);

    if (skewX != skewX)
      skewX = 0.0;
    if (skewY != skewY)
      skewY = 0.0;

    this.mScaleY = (skewX > -PI_Q && skewX < PI_Q) ?  d / Math.cos(skewX) : -c / Math.sin(skewX);
    this.mScaleX = (skewY > -PI_Q && skewY < PI_Q) ?  a / Math.cos(skewY) :  b / Math.sin(skewY);

    if (MathEx.equals(skewX, skewY)) {
      this.mRotation = skewX;
      skewX = skewY = 0;
    } else {
      this.mRotation = 0;
    }

    this.setTransformDirty();
  }

  /**
   * Returns cloned and inversed Matrix object which represents object orientation in world space
   *
   * @return {Matrix}
   */
  get worldTransformationInversed() {
    // TODO: optimize, cache
    return this.worldTransformation.clone().invert();
  }

  /**
   * @ignore
   * @param {number} dt
   *
   * @return {void}
   */
  __fixedUpdate(dt) {
    this.onFixedUpdate(dt);

    for (let k = 0; k < this.mComponents.length; k++) {
      let c = this.mComponents[k];
      c.mGameObject = this;
      c.onFixedUpdate(dt);

      if (this.__checkRemovedComponents(k))
        break;
    }

    for (let i = 0; i < this.mChildren.length; i++) {
      this.mChildren[i].__fixedUpdate(dt);

      if (this.__checkRemovedChildren(i))
        break;
    }
  }

  /**
   * @ignore
   * @param {number} dt time since the last frame
   *
   * @return {void}
   */
  __update(dt) {
    this.onUpdate(dt);

    for (let k = 0; k < this.mComponents.length; k++) {
      let c = this.mComponents[k];
      c.mGameObject = this;
      c.onUpdate(dt);

      if (this.__checkRemovedComponents(k))
        break;
    }

    for (let i = 0; i < this.mChildren.length; i++) {
      this.mChildren[i].__update(dt);

      if (this.__checkRemovedChildren(i))
        break;
    }
  }

  /**
   * @ignore
   * @param {number} dt time since the last frame
   *
   * @return {void}
   */
  __postUpdate(dt) {
    this.onPostUpdate(dt);

    for (let k = 0; k < this.mComponents.length; k++) {
      let c = this.mComponents[k];
      c.mGameObject = this;
      c.onPostUpdate(dt);

      if (this.__checkRemovedComponents(k))
        break;
    }

    for (let i = 0; i < this.mChildren.length; i++) {
      this.mChildren[i].__postUpdate(dt);

      if (this.__checkRemovedChildren(i))
        break;
    }
  }

  __checkRemovedComponents(i) {
    if (this.mComponents == 0)
      return false;

    i -= this.mNumComponentsRemoved;
    this.mNumComponentsRemoved = 0;

    if (i < 0)
      return true;

    return false;
  }

  __checkRemovedChildren(i) {
    if (this.mNumChildrenRemoved == 0)
      return false;

    i -= this.mNumChildrenRemoved;
    this.mNumChildrenRemoved = 0;

    if (i < 0)
      return true;

    return false;
  }


  /**
   * Called at every fixed frame update.
   *
   * @public
   * @param {number} dt time since the last frame
   *
   * @return {void}
   */
  onFixedUpdate(dt) { }

  /**
   * Called at every engine update.
   *
   * @public
   * @param {number} dt time since the last frame
   *
   * @return {void}
   */
  onUpdate(dt) { }

  /**
   * Called after all updates have been executed.
   *
   * @public
   * @param {number} dt Description
   *
   * @return {void}
   */
  onPostUpdate(dt) { }

  /**
   * @protected
   * @param {VideoNullDriver} driver
   * @param {Renderer} parentRenderer
   *
   * @return {void}
   */
  onRender(driver, parentRenderer) { }

  /**
   * Override this method if you need to specify GameObject size. Should be always be a local coordinates.
   *
   * @protected
   * @param {Rectangle=} outRect Description
   *
   * @return {Rectangle} bounds in local space withoout taking care about transformation matrix
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();
    return outRect.set(0, 0, 0, 0);
  }

  /**
   * Returns world bounds of this object and all children if specified (true by default).
   *
   * object.getBounds() - relative to world.
   * object.getBounds(object) - local bounds.
   * object.getBounds(object.parent) - relative to parent.
   * object.getBounds(objectB) - relative to objectB space.
   *
   * @param {GameObject} [space=undefined]
   * @param {boolean} [includeChildren=true]
   * @param {Rectangle=} [outRect=null]
   *
   * @return {Rectangle} returns bounds of the object and all childrens
   */
  getBounds(space = undefined, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();

    let matrix = this.worldTransformation;

    // TODO: optimize, check if space == null, space == this, space == parent
    // TODO: use wtInversed instead
    if (space != null) {
      matrix = this.worldTransformation.clone();
      matrix.prepend(space.worldTransformation.clone().invert());
    }

    let bounds = new Rectangle();
    this.onGetLocalBounds(bounds);

    matrix.transformRect(bounds, bounds);
    outRect.expand(bounds.x, bounds.y, bounds.width, bounds.height);

    if (includeChildren)
      for (let i = 0; i < this.numChildren; i++)
        this.getChildAt(i).getBounds(space, includeChildren, outRect);

    return outRect;
  }

  /**
   * Sets the object transform in one line.
   *
   * @param {number} [x=0]       Cord X.
   * @param {number} [y=0]       Cord Y.
   * @param {number} [r=0]       Rotation.
   * @param {number} [scaleX=1]  scale X.
   * @param {number} [scaleY=1]  scale Y.
   * @param {number} [anchorX=0] Anchor X.
   * @param {number} [anchorY=0] Anchor Y.
   * @param {boolean} [includeChildren=true] Include children when adjusting pivot?
   *
   * @return {GameObject} This.
   */
  setTransform(x = 0, y = 0, r = 0, scaleX = 1, scaleY = 1, anchorX = 0, anchorY = 0, includeChildren = true) {
    this.mX = x;
    this.mY = y;
    this.mRotation = r;
    this.mScaleX = scaleX;
    this.mScaleY = scaleY;

    this.getBounds(this, includeChildren, Rectangle.__cache.zero());
    this.mPivotX = Rectangle.__cache.width * anchorX;
    this.mPivotY = Rectangle.__cache.height * anchorY;

    this.setTransformDirty();
    return this;
  }

  /**
   * Calculate global position of the object.
   *
   * @param {Vector} localPoint
   * @param {Vector|null} [outVector=null]
   *
   * @return {Vector}
   */
  localToGlobal(localPoint, outVector = null) {
    return this.worldTransformation.transformVector(localPoint, outVector);
  }

  /**
   * Calculate local position of the object
   *
   * @param {Vector} globalPoint
   * @param {Vector|null} [outVector=null]
   *
   * @return {Vector}
   */
  globalToLocal(globalPoint, outVector = null) {
    return this.worldTransformationInversed.transformVector(globalPoint, outVector);
  }
  /**
   * Gets/Sets count of children elements.
   *
   * @return {number}
   */
  get numChildren() {
    return this.mChildren.length;
  }

  /**
   * Returns name of this GameoObject instance.
   *
   * @return {string|null}
   */
  get name() {
    return this.mName;
  }

  /**
   * @ignore
   * @param {string|null} value Description
   *
   * @return {void}
   */
  set name(value) {
    this.mName = value;
  }

  /**
   * Gets/Sets the x coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
   *
   * @return {number}
   */
  get x() {
    return this.mX;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set x(value) {
    if (this.mX == value)
      return;

    this.mX = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the y coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
   *
   * @return {number}
   */
  get y() {
    return this.mY;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set y(value) {
    if (this.mY == value)
      return;

    this.mY = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the x coordinate of the object's origin in its local space.
   *
   * @return {number}
   */
  get pivotX() {
    return this.mPivotX;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set pivotX(value) {
    if (this.mPivotX == value)
      return;

    this.mPivotX = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the y coordinate of the object's origin in its local space.
   *
   * @return {number}
   */
  get pivotY() {
    return this.mPivotY;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set pivotY(value) {
    if (this.mPivotY == value)
      return;

    this.mPivotY = value;
    this.setTransformDirty();
  }

  /**
   * Sets pivot point to given position.
   *
   * @param {number}  [ax=0.5]               Align along x-axis.
   * @param {number}  [ay=0.5]               Align along y-axis.
   * @param {boolean} [includeChildren=true] Include children elements when
   * calculating bounds?
   *
   * @return {GameObject} This.
   */
  alignPivot(ax = 0.5, ay = 0.5, includeChildren = true) {
    this.getBounds(this, includeChildren, Rectangle.__cache.zero());

    this.mPivotX = Rectangle.__cache.width * ax;
    this.mPivotY = Rectangle.__cache.height * ay;
    this.setTransformDirty();

    return this;
  }

  /**
   * Gets/Sets the scale factor of this object along x-axis.
   *
   * @return {number}
   */
  get scaleX() {
    return this.mScaleX;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set scaleX(value) {
    if (this.mScaleX == value)
      return;

    this.mScaleX = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the scale factor of this object along y-axis.
   *
   * @return {number} Description
   */
  get scaleY() {
    return this.mScaleY;
  }

  /**
   * @ignore
   * @param {number} value Description
   *
   * @return {void}
   */
  set scaleY(value) {
    if (this.mScaleY == value)
      return;

    this.mScaleY = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets rotation in radians.
   *
   * @return {number}
   */
  get rotation() {
    return this.mRotation;
  }

  /**
   * @ignore
   * @param {number} value Description
   *
   * @return {void}
   */
  set rotation(value) {
    if (this.mRotation == value)
      return;

    this.mRotation = value;
    this.setTransformDirty();
  }

  /**
   * Returns this GameObject parent GameObject.
   * @readonly
   *
   * @return {GameObject}
   */
  get parent() {
    return this.mParent;
  }

  /**
   * Returns topmost parent element of this GameObject or null if this
   * GameObject is not a child.
   *
   * @readonly
   *
   * @return {GameObject|null}
   */
  get root() {
    if (Black.instance == null)
      return null;

    let current = this;

    if (current === Black.instance.root)
      return current;

    while (current.mParent) {
      if (current === Black.instance.root)
        return current;
      else if (current.mParent === Black.instance.root)
        return Black.instance.root;
      else
        current = current.mParent;
    }

    return null;
  }

  // /**
  //  * Returns how deep this GameObject in the display tree.
  //  *
  //  * @readonly
  //  *
  //  * @return {number}
  //  */
  // get depth() {
  //   if (this.mParent)
  //     return this.mParent.depth + 1;
  //   else
  //     return 0;
  // }

  // TODO: review and make sure this func is required
  // get displayDepth() {
  //   // Many thanks to Roman Kopansky
  //   const flatten = arr => arr.reduce((acc, val) => acc.concat(val.mChildren.length ? flatten(val.mChildren) : val), []);
  //   return flatten(this.root.mChildren).indexOf(this);
  // }

  // /**
  //  * @ignore
  //  * @return {number}
  //  */
  // get index() {
  //   // TODO: this is only required by Input component and its pretty heavy.
  //   // Try to workaround it.
  //   return this.parent.mChildren.indexOf(this);
  // }

  /**
   * Gets/sets the width of this object.
   *
   * @return {number}
   */
  get width() {
    return this.getBounds(this.mParent).width;
  }

  /**
   * @ignore
   *
   * @param {number} value
   *
   * @return {void}
   */
  set width(value) {
    this.scaleX = 1;
    const currentWidth = this.width;

    if (currentWidth != 0.0)
      this.scaleX = value / currentWidth;
  }

  /**
   * Gets/sets the height of this object.
   *
   * @return {number}
   */
  get height() {
    return this.getBounds(this.mParent).height;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set height(value) {
    this.scaleY = 1;
    const currentHeight = this.height;

    if (currentHeight != 0)
      this.scaleY = value / currentHeight;
  }


  /**
   * Returns width of this GameObject in local space without including children
   * elements.
   *
   * @readonly
   *
   * @return {number}
   */
  get localWidth() {
    return this.getBounds(this, false).width;
  }


  /**
   * Returns height of this GameObject in local space without including children
   * elements.
   *
   * @readonly
   *
   * @return {number}
   */
  get localHeight() {
    return this.getBounds(this, false).height;
  }

  // TODO: precache
  /**
   * Returns string representing a url like path to this object in the display
   * tree.
   *
   * @readonly
   *
   * @return {string|null}
   */
  get path() {
    if (this.mParent !== null)
      return this.mParent.path + '/' + this.mName;

    return this.mName;
  }

  /**
   * Gets/Sets tag of this GameObject.
   *
   * @return {string|null}
   */
  get tag() {
    return this.mTag;
  }

  /**
   * @ignore
   *
   * @param {string|null} value
   *
   * @return {void}
   */
  set tag(value) {
    if (this.mTag === value)
      return;

    /** @type {string|null} */
    let old = this.mTag;
    this.mTag = value;

    if (this.mAdded)
      Black.instance.onTagUpdated(this, old, value);
  }

  /**
   * Starts coroutine.
   *
   * @param {Function} gen  Generator function.
   * @param {*=} [ctx=null] Context for Generator function.
   *
   * @return {Generator}
   */
  spawn(gen, ctx = null) {
    var iter = gen.apply(ctx == null ? this : ctx);

    function step(it) {
      if (it.done)
        return;

      if (typeof it.value === 'function')
        it.value(x => step(iter.next(x)));
      else
        step(iter.next(it.value));
    }

    step(iter.next());
    return iter;
  }

  /**
   * Waits for given amount of seconds before processing.
   *
   * @return {function(*):*}
   */
  wait(seconds = 1) {
    return cb => setTimeout(cb.bind(this, seconds * 1000), seconds * 1000);
  }


  /**
   * Waits for a speceific message.
   *
   * @param {string} message The name of the message to wait for.
   *
   * @return {function(*):*}
   */
  waitMessage(message) {
    return cb => this.on(message, cb.bind(this));
  }


  /**
   * Marks this GameObject and/or its children elements as dirty.
   *
   * @param {DirtyFlag} flag                 The flag or flag bit mask.
   * @param {boolean} [includeChildren=true] Description
   *
   * @return {void}
   */
  setDirty(flag, includeChildren = true) {
    if (includeChildren) {
      GameObject.forEach(this, x => {
        x.mDirty |= flag;
      });
    } else {
      this.mDirty |= flag;
    }
  }


  /**
   * Marks this GameObject as Local dirty and all children elements as World
   * dirty.
   *
   * @returns {void}
   */
  setTransformDirty() {
    this.setDirty(DirtyFlag.LOCAL, false);
    this.setDirty(DirtyFlag.WORLD | DirtyFlag.RENDER, true);
  }

  setRenderDirty() {
    this.setDirty(DirtyFlag.RENDER, false);
  }

  /**
   * @ignore
   *
   * @return {void}
   */
  dispose() { }

  // TODO: rename method
  /**
   * @ignore
   *
   * @param {Array<number>} points
   * @param {Matrix} worldTransformation
   * @param {Rectangle=} outRect
   *
   * @return {Rectangle}
   */
  static getBoundsWithPoints(points, worldTransformation, outRect) {
    outRect = outRect || new Rectangle();

    let minX = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    let xx = 0;
    let yy = 0;
    let tmpVector = new Vector();

    for (let i = 0; i < points.length; i += 2) {
      worldTransformation.transformXY(points[i], points[i + 1], tmpVector);

      if (minX > tmpVector.x)
        minX = tmpVector.x;

      if (maxX < tmpVector.x)
        maxX = tmpVector.x;

      if (minY > tmpVector.y)
        minY = tmpVector.y;

      if (maxY < tmpVector.y)
        maxY = tmpVector.y;
    }

    outRect.set(minX, minY, maxX - minX, maxY - minY);
    return outRect;
  }

  /**
   * Returns whenever a given GameObject intersects with a point.
   *
   * @param {GameObject} gameObject GameObject to test.
   * @param {Vector} point          A point to test.
   *
   * @return {boolean} True if intersects.
   */
  static intersects(gameObject, point) {
    let tmpVector = new Vector();
    let inv = gameObject.worldTransformationInversed;

    inv.transformVector(point, tmpVector);

    let rect = gameObject.getBounds(gameObject, false);
    return rect.containsXY(tmpVector.x, tmpVector.y);
  }

  /**
   * Returns a point where intersection were made in local space.
   *
   * @param {GameObject} gameObject GameObject to test intersection with.
   * @param {Vector}     point      The point to test.
   * @param {Vector=}    outVector  If passed point of intersection will be
   * stored in it.
   *
   * @return {boolean} True if intersects.
   */
  static intersectsAt(gameObject, point, outVector = undefined) {
    outVector = outVector || new Vector();

    let tmpVector = Vector.__cache;
    let inv = gameObject.worldTransformationInversed;

    inv.transformVector(point, tmpVector);

    let rect = gameObject.getBounds(gameObject, false);
    let contains = rect.containsXY(tmpVector.x, tmpVector.y);

    if (!contains)
      return false;

    outVector.x = tmpVector.x - rect.x;
    outVector.y = tmpVector.y - rect.y;
    return true;
  }

  /**
   * Checks if GameObject or any of its children elements intersects the given
   * point, the difference between `hits` and `intersectsWith` that `hits` also
   * checks for presence of `InputComponent`.
   *
   * @param {GameObject} gameObject GameObject to test.
   * @param {Vector} point          Point to test.
   *
   * @return {GameObject|null} Intersecting object or null.
   */
  static hits(gameObject, point) {
    // TODO: add colliders

    let obj = null;
    for (let i = gameObject.numChildren - 1; i >= 0; --i) {
      let child = gameObject.mChildren[i];

      obj = GameObject.hits(child, point);
      if (obj != null)
        return obj;

      let c = child.getComponent(InputComponent);
      let touchable = c !== null && c.touchable;
      if (touchable && GameObject.intersects(child, point)) {
        obj = child;
        break;
      }
    }

    if (obj === null) {
      let c = gameObject.getComponent(InputComponent);
      let touchable = c !== null && c.touchable;

      if (touchable && GameObject.intersects(gameObject, point))
        return gameObject;
    }

    return null;
  }

  /**
   * Checks if GameObject or any of its children elements intersects the given
   * point.
   *
   * @param {GameObject} gameObject GameObject to test.
   * @param {Vector} point          Point to test.
   *
   * @return {GameObject|null} Intersecting object or null.
   */
  static intersectsWith(gameObject, point) {
    let obj = null;
    for (let i = gameObject.numChildren - 1; i >= 0; --i) {
      let child = gameObject.mChildren[i];

      obj = GameObject.intersectsWith(child, point);
      if (obj != null)
        return obj;

      let inside = GameObject.intersects(child, point);
      if (inside) {
        obj = child;
        break;
      }
    }

    if (obj === null && GameObject.intersects(gameObject, point))
      return gameObject;

    return null;
  }

  /**
   * Returns all GameObject with given tag.
   *
   * @param {string} tag Tag to find.
   *
   * @returns {Array<GameObject>|null} Array of GameObject or null if not found.
   */
  static findWithTag(tag) {
    if (Black.instance.mTagCache.hasOwnProperty(tag) === false)
      return null;

    return Black.instance.mTagCache[tag];
  }

  /**
   * Returns a list of Components.
   *
   * @param {GameObject} gameObject         GameObject to start search from.
   * @param {function (new:Component)} type Type of Component.
   *
   * @return {Array<Component>} Array of Component or empty array.
   */
  static findComponents(gameObject, type) {
    Debug.assert(gameObject !== null, 'gameObject cannot be null.');
    Debug.assert(type !== null, 'type cannot be null.');

    /** @type {Array<Component>} */
    let list = [];

    /** @type {function(GameObject, function(new:Component)):void} */
    let f = function (gameObject, type) {
      for (let i = 0; i < gameObject.mComponents.length; i++) {
        let c = gameObject.mComponents[i];
        if (c instanceof type)
          list.push(c);
      }

      for (let i = 0; i < gameObject.mChildren.length; i++)
        f(gameObject.mChildren[i], type);
    };

    f(gameObject, type);

    return list;
  }

  /**
   * Runs action accross all GameObjects.
   *
   * @param {GameObject} node                  GameObject to start iteration from.
   * @param {function(GameObject)} action The function to be executed on
   * every GameObject.
   *
   * @return {void}
   */
  static forEach(node, action) {
    if (node == null)
      node = Black.instance.root;

    action(node);

    for (let i = 0; i < node.numChildren; i++)
      GameObject.forEach(node.getChildAt(i), action);
  }


  /**
   * Finds object by its name. If node is not passed the root will be taken as
   * starting point.
   *
   * @param {string} name      Name to search.
   * @param {GameObject=} node Starting GameObject.
   *
   * @return {GameObject} GameObject or null.
   */
  static find(name, node) {
    if (node == null)
      node = Black.instance.root;

    if (node.name === name)
      return node;

    for (let i = 0; i < node.numChildren; i++) {
      let r = GameObject.find(name, node.getChildAt(i));
      if (r != null)
        return r;
    }

    return null;
  }

  /**
   * Finds object by its id property. If node is not passed the root will be taken as
   * starting point.
   *
   * @param {number} id         Id to search.
   * @param {GameObject=} node  Starting GameObject or null.
   *
   * @return {GameObject} GameObject or null.
   */
  static findById(id, node) {
    if (node == null)
      node = Black.instance.root;

    if (node.id === id)
      return node;

    for (let i = 0; i < node.numChildren; i++) {
      let r = GameObject.findById(id, node.getChildAt(i));
      if (r !== null)
        return r;
    }

    return null;
  }
}

/**
 * @private
 * @type {number}
 * @nocollapse
 */
GameObject.ID = 0;

/**
 * @enum {number}
 */

var DirtyFlag = {
  LOCAL: 1,
  WORLD: 2,
  RENDER: 4,
  DIRTY: 0xffffff
};

// TODO:
// [_] Do not handle is loaded or not.
// Texture shall not be responsible for loading itself.
// We have TextureAsset for it.
// native size - always the size of physical texture
// source size - the original size of a texture to
//

/**
 * A number scatter for defining a range in 2D space.
 *
 * @cat video
 * @extends Scatter
 */

class Texture {
  /**
   * Creates new Texture instance.
   * @param  {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement} nativeTexture A source of the texture.
   * @param  {Rectangle=} region = undefined                                     A region to be drawn.
   * @param  {Rectangle=} untrimmedRect = undefined                              Actual size of a texture when not trimmed.
   */
  constructor(nativeTexture, region, untrimmedRect) {
    /**
     * @private
     * @type {Image}
     */
    this.mTexture = nativeTexture;

    /**
     * @private
     * @type {Rectangle}
     */
    this.mRegion = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsSubtexture = false;

    /**
     * @private
     * @type {number}
     */
    this.mId = ++Texture.__ID;

    if (region === undefined) {
      if(nativeTexture instanceof HTMLImageElement)
        this.mRegion = new Rectangle(0, 0, nativeTexture.naturalWidth, nativeTexture.naturalHeight);
      else
        this.mRegion = new Rectangle(0, 0, nativeTexture.width, nativeTexture.height);
    } else {
      this.mRegion = /** @type {Rectangle} */ (region);
      this.mIsSubtexture = true;
    }

    /**
     * @private
     * @type {boolean}
     */
    this.mTrimmed = untrimmedRect !== undefined;

    if (this.mTrimmed === false)
      untrimmedRect = new Rectangle(0, 0, this.mRegion.width, this.mRegion.height);

    /**
     * @private
     * @type {Rectangle}
     */
    this.mUntrimmedRect = /** @type {Rectangle} */ (untrimmedRect);

    /**
     * @private
     * @type {boolean}
     */
    this.mIsLoaded = true;

    // TODO: refactor, make private
    this.nativeWidth = nativeTexture.naturalWidth || nativeTexture.width;
    this.nativeHeight = nativeTexture.naturalHeight || nativeTexture.height;

    this.coord = new Uint32Array(4);
    this.refreshCoord();
    
    this._vSlotWebGL = -1;  // virtual slot for batch calculations
    this.premultiplyAlpha = true;
  }

  refreshCoord() {
    const coord = this.coord;
    const region = this.mRegion;
    const w = this.nativeWidth;
    const h = this.nativeHeight;

    const x0 = region.left / w;
    const y0 = region.top / h;

    const x1 = region.right / w;
    const y1 = region.top / h;

    const x2 = region.left / w;
    const y2 = region.bottom / h;

    const x3 = region.right / w;
    const y3 = region.bottom / h;

    coord[0] = (((y0 * 65535) & 0xffff) << 16) | ((x0 * 65535) & 0xffff);
    coord[1] = (((y1 * 65535) & 0xffff) << 16) | ((x1 * 65535) & 0xffff);
    coord[2] = (((y2 * 65535) & 0xffff) << 16) | ((x2 * 65535) & 0xffff);
    coord[3] = (((y3 * 65535) & 0xffff) << 16) | ((x3 * 65535) & 0xffff);
  }

  /**
   * Returns the unique id of this texture.
   *
   * @return {number}
   */
  get id() {
    return this.mId;
  }

  /**
   * Returns True if this texture has been trimmed.
   *
   * @return {boolean}
   */
  get isTrimmed() {
    return this.mTrimmed;
  }

  /**
   * Returns True if this texture is a part of other Texture object
   *
   * @return {boolean} Description
   */
  get isSubTexture() {
    return this.mIsSubtexture;
  }

  // TODO: if we update texture we have to nofity everything, send signal
  // update(nativeTexture = null, region = null, source = null, crop = null){
  // }

  // render width
  // render height
  // croppedWidth, croppedHeight
  // width, height
  //

  /**
   * Returns a Rect object representing the untrimmed size and position of this
   * texture withing other texture if so.
   *
   * @return {Rectangle}
   */
  get untrimmedRect() {
    return this.mUntrimmedRect;
  }

  /**
   * The width of this texture.
   *
   * @return {number}
   */
  get width() {
    if (this.mRegion)
      return this.mRegion.width;

    return this.mTexture.naturalWidth;
  }

  /**
   * The width of this texture.
   *
   * @return {number}
   */
  get height() {
    if (this.mRegion)
      return this.mRegion.height;

    return this.mTexture.naturalHeight;
  }

  /**
   * If isSubTexture, returns the physical region inside parent texture.
   *
   * @return {Rectangle}
   */
  get region() {
    return this.mRegion;
  }

  /**
   * Returns native object. Usually DOM Image element.
   *
   * @return {Image}
   */
  get native() {
    return this.mTexture;
  }

  /**
   * True if fully loaded and ready.
   *
   * @return {boolean}
   */
  get isLoaded() {
    return this.mIsLoaded;
  }

  /**
   * Dispose and releases all resources related to this texture.
   *
   * @return {void}
   */
  dispose() {
    this.mTexture = null;
  }

  /**
   * @ignore
   *
   * @param {string} string
   *
   * @return {Texture}
   */
  static fromBase64String(string) {
    let imgElement = new Image();
    imgElement.src = string;
    return new Texture(imgElement);
  }


  /**
   * @ignore
   *
   * @param {HTMLElement}   canvas
   * @param {string} [type=image/png]
   * @param {number} [quality=1]
   *
   * @return {Texture}
   */
  static fromCanvasAsImage(canvas, type = 'image/png', quality = 1) {
    let imgElement = new Image();
    imgElement.src = canvas.toDataURL(type, quality);

    return new Texture(imgElement);
  }

  /**
   * @ignore
   *
   * @param {HTMLElement} canvas
   *
   * @return {Texture}
   */
  static fromCanvas(canvas) {
    return Black.instance.video.getTextureFromCanvas(canvas);
  }
}

/**
 * @private
 * @type {number}
 * @nocollapse
 */
Texture.__ID = 0;

/**
 * @private
 * @type {Image|null}
 * @nocollapse
 */
Texture.MISSING_IMAGE_CACHE = null;

/**
 * A number scatter for defining a range in 2D space.
 *
 * @cat video
 * @extends Texture
 */

class AtlasTexture extends Texture {
  /**
   * Creates new AtlasTexture instance.
   *
   * @param {Texture}              texture A base texture object.
   * @param {{meta: *, frames: *}} Black json object.
   */
  constructor(texture, jsonObject) {
    super(texture.native);

    /** @type {Object} */
    this.mMeta = {};

    /** @dict */
    this.mSubTextures = {}; // dictionary

    this.__parseJson(jsonObject);
  }

  /**
   * @private
   *
   * @param  {{meta: *, frames: *}} o
   * @return {void}
   */
  __parseJson(o) {
    const NEGATIVE_HALF_PI = -(Math.PI / 2);

    // if (o.meta.format)
    //   this.mMeta.format = o.meta.format;
    //
    // if (o.meta.scale)
    //   this.mMeta.scale = parseFloat(o.meta.scale);

    for (let key in o.frames) {
      let data = /** @type {Array<number>} */ (o.frames[key]);

      let region = new Rectangle(data[0], data[1], data[2], data[3]);
      let untrimmedRect = new Rectangle(data[4], data[5], data[6], data[7]);

      this.mSubTextures[key] = new Texture(this.native, region, untrimmedRect);
    }
  }

  // addRegion(name, region, frame) {}
  //
  // removeRegion() {}

  /**
   * Returns the texture by a given name.
   *
   * @param {string} name The name of the texture to find.
   *
   * @return {Texture} The Texture or null if not found.
   */
  getTexture(name) {
    /** @type {Texture} */
    let t = this.mSubTextures[name];
    if (t === undefined)
      console.warn('Texture \'%s\' was not found in cache.', name);

    return /** @type {Texture} */ (t);
  }

  /**
   * Returns array of Texture by given name or wildcard mask.
   * If `nameMask` is null then all textures will be returned.
   * This method sorts all resulting textures using neurural sort algorith.
   *
   * @param {string|null} [nameMask=null] The mask to filter by.
   * @param {Array<Texture>|null}         outTextures If passed will be
   * overwritten by result object.
   *
   * @return {Array<Texture>} The list of found textures.
   */
  getTextures(nameMask = null, outTextures = null) {
    let out = outTextures || [];
    if (nameMask === null) {
      for (let key in this.mSubTextures)
        out.push(this.mSubTextures[key]);

      return /** @type {Array<Texture>} */ (out);
    }

    let names = [];

    // TODO: make helper wild function
    let re = new RegExp("^" + nameMask.split("*").join(".*") + "$");
    for (let key in this.mSubTextures)
      if (re.test(key))
        names.push(key);

    //names.sort(AtlasTexture.__naturalComparer);
    AtlasTexture.naturalSort(names);

    for (let i = 0; i < names.length; i++)
      out.push(this.mSubTextures[names[i]]);

    return out;
  }

  static naturalSort(dataset, field = null) {
    dataset.sort(AtlasTexture.__naturalComparer(field));
  }

  static __naturalComparer(field = null, useAbs = true) {
    return function(a, b) {
      const NUMBER_GROUPS = /(-?\d*\.?\d+)/g;
      let aa = String(field == null ? a : a[field]).split(NUMBER_GROUPS);
      let bb = String(field == null ? b : b[field]).split(NUMBER_GROUPS);
      let min = Math.min(aa.length, bb.length);

      for (let i = 0; i < min; i++) {
        let x = 0;
        let y = 0;

        if (useAbs) {
          x = Math.abs(parseFloat(aa[i])) || aa[i].toLowerCase();
          y = Math.abs(parseFloat(bb[i])) || bb[i].toLowerCase();
        } else {
          x = parseFloat(aa[i]) || aa[i].toLowerCase();
          y = parseFloat(bb[i]) || bb[i].toLowerCase();
        }

        if (x < y)
          return -1;
        else if (x > y)
          return 1;
      }

      return 0;
    }
  }

  //dispose() {}
}

/**
 * Holds information about external assets.
 *
 * @cat loaders
 * @extends MessageDispatcher
 */

class Asset extends MessageDispatcher {
  /**
   * Creates new Assets instance.
   * @param  {string} name Name of asset.
   * @param  {string} url  URL of the asset to load it from.
   */
  constructor(name, url) {
    super();

    /**
     * @private
     * @type {string}
     */
    this.mName = name;

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /**
     * @private
     * @type {*|null}
     */
    this.mData = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsLoaded = false;

    /**
     * @private
     * @type {string|undefined}
     */
    this.mMimeType = undefined;

    /**
     * @private
     * @type {string}
     */
    this.mResponseType = '';

    /**
     * @private
     * @type {string}
     */
    this.mExtension = this.getExtension(url);

    /**
     * @private
     * @type {XMLHttpRequest|null}
     */
    this.mRequest = null;
  }

  /**
   * Loads asset from an external source.
   *
   * @return {void}
   */
  load() {
    //console.log('Asset: loading asset \'%s\' from \'%s\'', this.mName, this.mUrl);

    this.mRequest = new XMLHttpRequest();
    //this.mRequest.onprogress = (pe) => this.onProgressChanged(pe);

    if (this.mRequest.overrideMimeType && this.mMimeType)
      this.mRequest.overrideMimeType(this.mMimeType);

    this.mRequest.responseType = this.mResponseType;
    this.mRequest.open("GET", this.mUrl, true);
    this.mRequest.onreadystatechange = () => {
      if (this.mRequest.readyState === 4) {
        if ((this.mRequest.status === 200) || ((this.mRequest.status === 0) && this.mRequest.responseText))
          this.onLoaded();
        else
          throw new Error('Error loading ' + this.mUrl + " (" + this.mRequest.status + ":"+ this.mRequest.responseText + ")"); //TODO handle errors
      }
    };

    this.mRequest.send(null);
  }

  /**
   * Called when asset is fully loaded.
   *
   * @protected
   * @fires complete
   *
   * @return {void}
   */
  onLoaded() {
    this.mIsLoaded = true;
    this.post('complete');
  }

  /**
   * Returns the name of this asset.
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }

  /**
   * Returns loaded data object associated with this asset.
   *
   * @return {*}
   */
  get data() {
    return this.mData;
  }

  /**
   * Returns true if asset is preloaded.
   *
   * @return {boolean}
   */
  get isLoaded() {
    return this.mIsLoaded;
  }

  // TODO: finish
  dispose() {}

  /**
   * Helper function. Returns the file extension.
   *
   * @param {string} url Url to get extension from.
   *
   * @return {string} Empty string if no extension were found or extension itself.
   */
  getExtension(url) {
    if (url.indexOf('.') === -1)
      return '';

    return url.substring(url.indexOf('.')).toLowerCase();
  }
}

/**
 * Single Texture file asset class responsible for loading images file and
 * converting them into Textures.
 *
 * @cat loaders
 * @extends Asset
 */

class TextureAsset extends Asset {
  /**
   * Creates TextureAsset instance.
   *
   * @param {string} name Asset name.
   * @param {string} url  URL to load image from.
   */
  constructor(name, url) {
    super(name, url);

    /**
     * @private
     * @type {Image}
     */
    this.mImageElement = new Image();
    this.mImageElement.crossOrigin = true;
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */
  onLoaded() {
    this.mData = new Texture(this.mImageElement);

    super.onLoaded();
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */
  load() {
    this.mImageElement.src = this.mUrl;
    this.mImageElement.onload = () => {
      this.onLoaded();
    }
  }
}

/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat loaders
 * @extends Asset
 */

class JSONAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name The name of asset.
   * @param {string} url  URL to the json file.
   *
   * @return {void}
   */
  constructor(name, url) {
    super(name, url);

    this.mimeType = 'application/json';
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */
  onLoaded(){
    this.mData = JSON.parse(/** @type {string} */ (this.mRequest.responseText) );
    super.onLoaded();
  }
}

/**
 * Font file asset class responsible for loading local font files.
 *
 * Note: this class need a body to work preoperly.
 *
 * @cat loaders
 * @extends Asset
 */

class FontAsset extends Asset {
  /**
   * @param {string} name        The custom name of the font
   * @param {string|null} url    The path to the font
   * @param {boolean} local      Is this font local?
   */
  constructor(name, url, local) {
    if (local === false)
      url = 'https://fonts.googleapis.com/css?family=' + name.replace(new RegExp(' ', 'g'), '+');
    
    super(name, url);

    /**
     * @private
     * @type {string}
     */
    this.mTestingFontName = 'Courier New';

    /**
     * @private
     * @type {boolean}
     */
    this.mLocal = local;

    /**
     * @private
     * @type {string}
     */
    this.mTestingString = '~ GHBDTN,.#$Mlck';

    /**
     * @private
     * @type {number}
     */
    this.mLoadingTimeout = 2500;

    /**
     * @private
     * @type {number}
     */
    this.mCheckDelay = 50;

    /**
     * @private
     * @type {HTMLElement}
     */
    this.mTestingElement = this.__getTestingElement();

    /**
     * @private
     * @type {HTMLElement}
     */
    this.mLoaderElement = this.__getLoaderElement(this.mLocal);
    this.mTestingElement.style.fontFamily = this.mTestingFontName;
    
    /**
     * @private
     * @type {number}
     */
    this.mDefaultFontWidth = this.mTestingElement.offsetWidth;

    this.mTestingElement.style.fontFamily = name + ',' + this.mTestingFontName;
  }

  /**
   * @private
   * @return {HTMLElement}
   */
  __getLoaderElement(local) {
    let loaderElement = document.createElement(local ? 'style' : 'link');
    loaderElement.type = 'text/css';
    loaderElement.media = 'all';
    loaderElement.rel = 'stylesheet';
    loaderElement.onerror = function () {
      //debugger;
      // TODO: handle fail
    };
    document.getElementsByTagName('head')[0].appendChild(loaderElement);
    return loaderElement;
  }

  /**
   * @private
   * @return {HTMLElement}
   */
  __getTestingElement() {
    let testingElement = document.createElement('span');
    testingElement.style.position = 'absolute';
    testingElement.style.top = '-9999px';
    testingElement.style.left = '-9999px';
    testingElement.style.visibility = 'hidden';
    testingElement.style.fontSize = '250px';
    testingElement.innerHTML = this.mTestingString;
    document.body.appendChild(testingElement);

    return testingElement;
  }

  /**
   * @override
   * @return {void}
   */
  load() {
    if (this.mLocal)
      this.mLoaderElement.innerHTML += (`\n @font-face {font-family: ${this.mName}; src: url(${this.mUrl});}`);
    else
      this.mLoaderElement.href = this.mUrl;

    this.checkLoadingStatus();
  }

  /**
   * @return {void}
   */
  checkLoadingStatus() {
    if (this.mDefaultFontWidth === this.mTestingElement.offsetWidth) {
      if ((this.mLoadingTimeout -= this.mCheckDelay) <= 0) {
        this.onLoadingFail();
        return;
      }

      setTimeout(this.checkLoadingStatus.bind(this), this.mCheckDelay);
      return;
    }
    this.onLoaded();
  }

  onLoaded() {
    var a = this.mLoaderElement;

    super.onLoaded();
    this.mTestingElement.parentNode.removeChild(this.mTestingElement);
  }

  /**
   * @return {void}
   */
  onLoadingFail() {
    console.warn(`loading ${this.name} font failed.`);
    this.onLoaded(); //TODO what to do here?
  }
}
/**
 * Texture Atlas asset responsible for loading Image file and coresponding Json
 * file.
 *
 * @cat loaders
 * @extends Asset
 */

class AtlasTextureAsset extends Asset {
  /**
   * Creates new AtlasTextureAsset instance.
   *
   * @param {string} name     Name of the asset.
   * @param {string} imageUrl Image URL.
   * @param {string} dataUrl  Json URL.
   */
  constructor(name, imageUrl, dataUrl) {
    super(name, imageUrl);

    /**
     * @private
     * @type {Image}
     */
    this.mImageElement = new Image();
    this.mImageElement.crossOrigin = true;

    /**
     * @private
     * @type {JSONAsset}
     */
    this.dataAsset = new JSONAsset(name, dataUrl);
    this.dataAsset.on('complete', this.onJsonLoaded, this);
  }


  /**
   * @ignore
   * @returns {void}
   */
  onJsonLoaded() {
    this.mImageElement.src = this.mUrl;
    this.mImageElement.onload = () => {
      this.onLoaded();
    }
  }

  /**
   * @override
   * @inheritDoc
   * @return {void}
   */
  onLoaded() {
    this.mData = new AtlasTexture(new Texture(this.mImageElement), /** @type {{meta: *, frames: *}} */ (this.dataAsset.data));

    super.onLoaded();
  }

  /**
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  load() {
    this.dataAsset.load();
  }
}

/**
 * Sound file asset class responsible for preloading audio files.
 *
 * @cat loaders
 * @extends Asset
 */

class SoundAsset extends Asset {
  /**
   * Creates SoundAsset instance.
   *
   * @param {string} name Sound name.
   * @param {string} url  URL to load audio from.
   */
  constructor(name, url) {
    super(name, url);

    /**
     * @private
     * @type {Audio}
     */
    this.mAudioElement = new Audio();
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */
  onLoaded() {
    this.mData = this.mAudioElement;

    if (Device.isMobile) {
      this.__enableOnMobile();
    }

    super.onLoaded();
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */
  load() {
    this.mAudioElement.autoplay = false;
    this.mAudioElement.src = this.mUrl;
    this.mAudioElement.preload = 'auto';
    this.mAudioElement.load();
    this.mAudioElement.oncanplaythrough = () => {
      if (!this.mData) {
        this.onLoaded();
      }
    };
  }

  /**
   * @private
   *
   * @return {void}
   */
  __enableOnMobile() {
    let unlock = () => {
      this.mAudioElement.play();
      this.mAudioElement.pause();
      document.removeEventListener('touchend', unlock, true);
    };
    document.addEventListener('touchend', unlock, true);
  }
}

/*
TODO:
  1. propper error handling
  2. max parallel downloads
  3. check for name dublicates
  4. load progress
*/

/**
 * Reponsible for preloading assets and manages its in memory state.
 *
 * @cat loaders
 * @extends MessageDispatcher
 */

class AssetManager extends MessageDispatcher {
  /**
   * Creates new AssetManager instance. AssetManager exposes static property
   * called 'default' and many internal classes uses default instance.
   */
  constructor() {
    super();

    /**
     * @private
     * @type {string}
     */
    this.mDefaultPath = '';

    /**
     * @private
     * @type {number}
     */
    this.mTotalLoaded = 0;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsAllLoaded = false;

    /**
     * @private
     * @type {number}
     */
    this.mLoadingProgress = 0;

    /**
     * @private
     * @type {Array<Asset>}
     */
    this.mQueue = [];

    /**
     * @private
     * @member
     * @dict
     */
    this.mTextures = {};

    /**
     * @private
     * @member
     * @dict
     */
    this.mAtlases = {};

    /**
     * @private
     * @member
     * @dict
     */
    this.mJsons = {};

    /**
     * @private
     * @member
     * @dict
     */
    this.mSounds = {};

    /**
     * @private
     * @member
     * @dict
     */
    this.mFonts = {};
  }

  /**
   * Adds single image to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the image.
   *
   * @returns {void}
   */
  enqueueImage(name, url) {
    this.mQueue.push(new TextureAsset(name, this.mDefaultPath + url));
  }

  /**
   * Adds atlas to the loading queue.
   *
   * @param {string} name     Name of the asset.
   * @param {string} imageUrl Atlas URL.
   * @param {string} dataUrl  URL to the .json file which describes the atlas.
   *
   * @returns {void}
   */
  enqueueAtlas(name, imageUrl, dataUrl) {
    this.mQueue.push(new AtlasTextureAsset(name, this.mDefaultPath + imageUrl, this.mDefaultPath + dataUrl));
  }

  /**
   * Adds single json file to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   *
   * @returns {void}
   */
  enqueueJson(name, url) {
    this.mQueue.push(new JSONAsset(name, this.mDefaultPath + url));
  }

  /**
   * Adds single sound to the loading queue.
   *
   * @param {string} name Name of the sound.
   * @param {string} url  The URL of the sound.
   *
   * @returns {void}
   */
  enqueueSound(name, url) {
    this.mQueue.push(new SoundAsset(name, this.mDefaultPath + url));
  }

  /*
   * Adds local font to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL to the font.
   *
   * @returns {void}
   */
  enqueueFont(name, url) {
    this.mQueue.push(new FontAsset(name, this.mDefaultPath + url, true));
  }

  /**
   * Adds Google Font to the loading queue.
   *
   * @param {string} name Name of the asset.
   *
   * @returns {void}
   */
  enqueueGoogleFont(name) {
    this.mQueue.push(new FontAsset(name, null, false));
  }

  /**
   * Starts preloading all enqueued assets.
   * @fires complete
   *
   * @return {void}
   */
  loadQueue() {
    for (let i = 0; i < this.mQueue.length; i++) {
      let item = this.mQueue[i];

      item.on(Message.COMPLETE, this.onAssetLoaded, this);
      item.load();
    }
  }

  /**
   * @protected
   * @ignore
   *
   * @param {Message} msg
   *
   * @return {void}
   */
  onAssetLoaded(msg) {
    this.mTotalLoaded++;
    this.mLoadingProgress = this.mTotalLoaded / this.mQueue.length;

    let item = msg.sender;

    // TODO: rework this
    // TODO: check for dups
    if (item.constructor === TextureAsset)
      this.mTextures[item.name] = item.data;
    else if (item.constructor === AtlasTextureAsset)
      this.mAtlases[item.name] = item.data;
    else if (item.constructor === JSONAsset)
      this.mJsons[item.name] = item.data;
    else if (item.constructor === SoundAsset)
      this.mSounds[item.name] = item.data;
    else if (item.constructor === FontAsset) {
      this.mFonts[item.name] = item.data;
    } else
      console.error('Unable to handle asset type.', item);

    this.post(Message.PROGRESS, this.mLoadingProgress);

    if (this.mTotalLoaded === this.mQueue.length) {
      this.mQueue.splice(0, this.mQueue.length);
      this.mTotalLoaded = 0;
      this.mIsAllLoaded = true;
      this.post(Message.COMPLETE);
    }
  }

  /**
   * Returns Texture object by given name.
   *
   * @param {string} name The name of the Asset.
   *
   * @return {Texture|null} Returns a Texture if found or null.
   */
  getTexture(name) {
    /** @type {Texture} */
    let t = this.mTextures[name];

    if (t != null)
      return t;

    for (let key in this.mAtlases) {
      t = this.mAtlases[key].getTexture(name);
      if (t != null)
        return t;
    }

    Debug.warn('Unable to find texture', name);
    return null;
  }


  /**
   * Returns array of Texture by given name mask.
   * Searches across all loaded images and atlasses.
   *
   * @param {string} nameMask
   *
   * @returns {Array<Texture>|null}
   */
  getTextures(nameMask) {
    //if (nameMask == null)

    let out = [];
    let names = [];

    let re = new RegExp("^" + nameMask.split("*").join(".*") + "$");

    // collect single textures
    for (let key in this.mTextures)
      if (re.test(key))
        names.push({ name: key, atlas: null });

    // collect textures from all atlases
    for (let key in this.mAtlases) {
      let atlas = this.mAtlases[key];

      for (let key2 in atlas.mSubTextures)
        if (re.test(key2))
          names.push({ name: key2, atlas: atlas });
    }

    AtlasTexture.naturalSort(names, 'name');

    for (let i = 0; i < names.length; i++) {
      let ao = names[i];

      if (ao.atlas == null)
        out.push(this.mTextures[ao.name]);
      else
        out.push(ao.atlas.mSubTextures[ao.name]);
    }

    if (out.length > 0)
      return out;

    return null;
  }

  /**
   * Returns AtlasTexture by given name.
   *
   * @param {string} name The name of the Asset.
   *
   * @return {AtlasTexture} Returns atlas or null.
   */
  getAtlas(name) {
    return this.mAtlases[name];
  }

  /**
   * Returns Sound by given name.
   *
   * @param {string} name The name of the sound.
   *
   * @return {Audio} Returns sound or null.
   */
  getSound(name) {
    return this.mSounds[name];
  }

  /**
   * Gets/Sets default path for preloading. Usefull when url's getting too long.
   * The asset path will be concatenated with defaultPath.
   *
   * @return {string}
   */
  get defaultPath() {
    return this.mDefaultPath;
  }

  /**
   * @ignore
   * @param {string} value
   *
   * @return {void}
   */
  set defaultPath(value) {
    this.mDefaultPath = value;
  }

  /**
   * Returns True if all assets were loaded.
   *
   * @return {boolean}
   */
  get isAllLoaded() {
    return this.mIsAllLoaded;
  }
}

/**
 * Default instance. Sprite and other classes uses this instance to find textures by name.
 * @static
 * @type {AssetManager}
 */
AssetManager.default = new AssetManager();

/**
 * A blend mode enum.
 * @cat drivers
 * @enum {string}
 */

var BlendMode = {
  AUTO       : 'auto',
  NORMAL     : 'source-over',
  ADD        : 'lighter',
  MULTIPLY   : 'multiply',
  SCREEN     : 'screen',
  OVERLAY    : 'overlay',
  DARKEN     : 'darken',
  LIGHTEN    : 'lighten',
  COLOR_DODGE: 'color-dodge',
  COLOR_BURN : 'color-burn',
  HARD_LIGHT : 'hard-light',
  SOFT_LIGHT : 'soft-light',
  DIFFERENCE : 'difference',
  EXCLUSION  : 'exclusion',
  HUE        : 'hue',
  SATURATE   : 'saturate',
  COLOR      : 'color',
  LUMINOSITY : 'luminosity'
};

/**
 * Base class for custom video drivers. VideoDriver is used to render things
 * onto the screen.
 *
 * @cat drivers
 */

class VideoNullDriver {
  /**
   * @param  {HTMLElement} containerElement
   * @param  {number} width
   * @param  {number} height
   */
  constructor(containerElement, width, height) {
    /**
     * @private
     * @type {string}
     */
    this.mGlobalBlendMode = 'auto';

    /**
     * @protected
     * @type {HTMLElement}
     */
    this.mContainerElement = /**
     * @private
     * @type {HTMLElement} */ (containerElement
      );

    /**
     * @private
     * @type {number}
     */
    this.mClientWidth = width;

    /**
     * @private
     * @type {number}
     */
    this.mClientHeight = height;

    /**
     * @private
     * @type {Matrix}
     */
    this.mTransform = new Matrix();

    /**
     * @private
     * @type {number}
     */
    this.mGlobalAlpha = 1;


    this.mRendererMap = {
      VideoNullDriver: {
      },
      CanvasDriver: {
        Sprite: SpriteRendererCanvas,
        Emitter: EmitterRendererCanvas
      },
      WebGLDriver: {
      }
    };

    /**
     * @private
     * @type {HTMLElement}
     */
    this.mMeasureElement = /** @type {HTMLElement} */ (document.createElement('span'));
    this.mMeasureElement.style.position = 'absolute';
    this.mContainerElement.appendChild(this.mMeasureElement);

    Black.instance.viewport.on('resize', this.__onResize, this);
  }

  getRenderer(object) {
    let driverType = this.constructor.name;
    let objectType = object.constructor.name;

    return new this.mRendererMap[driverType][objectType]();
  }

  /**
   * @protected
   * @ignore
   * @param {Message} msg
   * @param {Rectangle} rect
   *
   * @returns {void}
   */
  __onResize(msg, rect) {
    let w = this.mContainerElement.clientWidth;
    let h = this.mContainerElement.clientHeight;

    this.mClientWidth = w;
    this.mClientHeight = h;
  }

  /**
   * Initialization function.
   *
   * @protected
   *
   * @return {void}
   */
  start() {
  }


  /**
   * Called before rendering anything. Usually used to clear back-buffer.
   *
   * @protected
   *
   * @returns {void}
   */
  beginFrame() {
  }


  /**
   * Called after rendering is finished.
   * @protected
   *
   * @returns {void}
   */
  endFrame() {
  }

  /**
   * @ignore
   * @param {HTMLElement} canvas
   * @return {Texture|null}
   */
  getTextureFromCanvas(canvas) {
    return null;
  }

  /**
   * Sets world transformation for future use.
   *
   * @public
   * @param {Matrix} m An transformation matrix to store.
   *
   * @return {void}
   */
  setTransform(m) {
    this.mTransform = m;
  }

  /**
   * Gets/Sets the global alpha. Used to calculate alpha relative to parent
   * object.
   *
   * @protected
   *
   * @return {number}
   */
  get globalAlpha() {
    return this.mGlobalAlpha;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set globalAlpha(value) {
    this.mGlobalAlpha = value;
  }

  /**
   * Gets/Sets global blending mode. Used to calculate blend mode relative to
   * parent object.
   *
   * @return {string}
   */
  get globalBlendMode() {
    return this.mGlobalBlendMode;
  }

  /**
   * @ignore
   * @param {string} value
   *
   * @return {void}
   */
  set globalBlendMode(value) {
    this.mGlobalBlendMode = value;
  }

  /**
   * Draws texture onto back-buffer. GlobalAlpha, BlendMode and transformation
   * matrix must be set prior to calling this method.
   *
   * @public
   *
   * @param  {Texture} texture
   * 
   */
  drawTexture(texture) {
  }

  /**
   * Clears back-buffer.
   *
   * @protected
   *
   * @returns {void}
   */
  clear() {
  }

  /**
   * Used to save context if extists.
   *
   * @ignore
   * @protected
   * @param {GameObject|null} gameObject Used for internal binding.
   *
   * @return {void}
   */
  save(gameObject) {
  }

  /**
   * Used to restore context if extists.
   *
   * @protected
   * @ignore
   * @returns {type}
   */
  restore() {
  }


  /**
   * Convers number color to hex string.
   *
   * @param {number} color The color to convert.
   *
   * @returns {string} The resuling hex string.
   */
  hexColorToString(color) {
    let parsedColor = color.toString(16);
    return '#000000'.substring(0, 7 - parsedColor.length) + parsedColor;
  }

  /**
   * Measures text with a given style.
   *
   * @param {TextField} textField    Text to measure.
   * @param {TextInfo} style Text style to apply onto text.
   * @param {Rectangle} bounds.
   *
   * @return {Rectangle} Local bounds.
   */
  measureText(textField, style, bounds) {
  }
}

// class Shader {
// }

// class MeshBatch {
//   constructor() {
//   }
// }

// class Material {
//   constructor() {
//     //this.shader = Black.instance.video.getShader('default');
//   }
// }

class Renderer {
  constructor() {
    this.updateRequired = true;
    this.zIndex = 0;
    this.texture = null;
    this.alpha = 1;
    this.blendMode = BlendMode.AUTO;
    this.transform = null;
    this.visible = true;
  }

  render(driver) {
  }

  get isRenderable() {
    return this.alpha > 0 && this.visible === true;
  }
}

class SpriteRendererCanvas extends Renderer {
  render(driver) {
    driver.setTransform(this.transform);
    driver.globalAlpha = this.alpha;
    driver.globalBlendMode = this.blendMode;
    driver.drawTexture(this.texture);
  }
}


class SpriteRendererWebGL extends Renderer {
  constructor() {
    super();

    //this.material = new Material();
    this.vertexData = [];
  }

  render() {
    // if (this.dirty == false)
    //   return;

  }

  refreshVertexData() {
    const vertexData = this.vertexData;
    const transform = this.transform.value;
    const a = transform[0];
    const b = transform[1];
    const c = transform[2];
    const d = transform[3];
    const tx = transform[4];
    const ty = transform[5];
    const texture = this.texture;
    const region = texture.mRegion;
    const w = region.width;
    const h = region.height;

    if (texture.isTrimmed) {
      const untrimmedRegion = texture.untrimmedRect;
      const left = untrimmedRegion.x;
      const top = untrimmedRegion.y;
      const right = left + w;
      const bottom = top + h;

      // left top
      vertexData[0] = a * left + c * top + tx;
      vertexData[1] = d * top + b * left + ty;

      // right top
      vertexData[2] = a * right + c * top + tx;
      vertexData[3] = d * top + b * right + ty;

      // left bottom
      vertexData[4] = a * left + c * bottom + tx;
      vertexData[5] = d * bottom + b * left + ty;

      // right bottom
      vertexData[6] = a * right + c * bottom + tx;
      vertexData[7] = d * bottom + b * right + ty;
    } else {

      // left top
      vertexData[0] = tx;
      vertexData[1] = ty;

      // right top
      vertexData[2] = a * w + tx;
      vertexData[3] = b * w + ty;

      // left bottom
      vertexData[4] = c * h + tx;
      vertexData[5] = d * h + ty;

      // right bottom
      vertexData[6] = a * w + c * h + tx;
      vertexData[7] = d * h + b * w + ty;
    }
  }
}

// class NativeFontRenderRenderer extends Renderer {

// }

class EmitterRendererCanvas extends Renderer {
  constructor() {
    super();

    this.particles = []; // []
    this.textures = []; // []
    this.space = null;

    this.__tmpLocal = new Matrix();
    this.__tmpWorld = new Matrix();
  }

  render(driver) {
    driver.globalBlendMode = this.blendMode;

    const plength = this.particles.length;

    let localTransform = this.__tmpLocal;
    let worldTransform = this.__tmpWorld;
    localTransform.identity();

    for (let i = 0; i < plength; i++) {
      let particle = this.particles[i];

      let texture = this.textures[particle.textureIndex];
      let tw = texture.width * 0.5;
      let th = texture.height * 0.5;

      if (particle.r === 0) {
        let tx = particle.x - tw * particle.scale;
        let ty = particle.y - th * particle.scale;
        localTransform.set(particle.scale, 0, 0, particle.scale, tx, ty);
      } else {
        let cos = Math.cos(particle.r);
        let sin = Math.sin(particle.r);
        let a = particle.scale * cos;
        let b = particle.scale * sin;
        let c = particle.scale * -sin;
        let d = particle.scale * cos;

        let tx = particle.x - tw * a - th * c;
        let ty = particle.y - tw * b - th * d;
        localTransform.set(a, b, c, d, tx, ty);
      }

      if (this.isLocal === true) {
        worldTransform.identity();
        worldTransform.copyFrom(localTransform);
        worldTransform.prepend(this.transform);
      } else {
        this.space.worldTransformation.copyTo(worldTransform);
        worldTransform.append(localTransform);
      }

      driver.globalAlpha = this.alpha * particle.alpha;

      driver.setTransform(worldTransform);
      driver.drawTexture(texture);
    }
  }

  get isRenderable() {
    return this.alpha > 0 && this.textures.length > 0 && this.visible === true;
  }
}

class CanvasDriver extends VideoNullDriver {
  /**
   * @param  {HTMLElement} containerElement The DOM element to draw into.
   * @param  {number} width                 The width of the viewport.
   * @param  {number} height                The height of the viewport.
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    /**
     * @private
     * @type {CanvasRenderingContext2D|null}
     */
    this.mCtx = null;

    // cache
    this.mGlobalAlpha = 1;
    this.mGlobalBlendMode = BlendMode.NORMAL;
    this.mIdentityMatrix = new Matrix();

    this.mLetterSpacing = 0;
    this.mRenderers = [];
    this.skipChildren = false;
    this.__createCanvas();
  }

  registerRenderer(renderRenderer) {
    if (renderRenderer.isRenderable === false) {
      this.skipChildren = true;
      return;
    }

    this.skipChildren = false;
    this.mRenderers.push(renderRenderer);

    return renderRenderer;
  }

  render(driver) {
    for (let i = 0, len = this.mRenderers.length; i !== len; i++) {
      let renderer = this.mRenderers[i];

      renderer.render(driver);
    }
  }

  drawTexture(texture) {
    const w = texture.width;
    const h = texture.height;
    const ox = texture.untrimmedRect.x;
    const oy = texture.untrimmedRect.y;

    this.mCtx.drawImage(texture.native, texture.region.x, texture.region.y, w, h, ox, oy, w, h);
  }

  /**
   * @private
   * @return {void}
   */
  __createCanvas() {
    let cvs = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
    cvs.id = 'canvas';
    cvs.width = this.mClientWidth;
    cvs.height = this.mClientHeight;
    this.mContainerElement.appendChild(cvs);

    this.mCtx = /** @type {CanvasRenderingContext2D} */ (cvs.getContext('2d'));
  }


  /**
   * @private
   * @param {Message} msg
   * @param {Rectangle} rect
   *
   * @returns {void}
   */
  __onResize(msg, rect) {
    super.__onResize(msg, rect);

    this.mCtx.canvas.width = this.mClientWidth;
    this.mCtx.canvas.height = this.mClientHeight;
  }

  /**
   * @ignore
   * @param {Matrix} m
   *
   * @return {void}
   */
  setTransform(m) {
    //TODO: does not work as expected
    // if (this.mTransform.exactEquals(m) === true)
    //   return;

    super.setTransform(m);

    const v = m.value;
    this.mCtx.setTransform(v[0], v[1], v[2], v[3], v[4], v[5]);
  }

  /**
   * @param {number} value
   *
   * @return {void}
   */
  set globalAlpha(value) {
    if (value == this.mGlobalAlpha)
      return;

    this.mGlobalAlpha = value;
    this.mCtx.globalAlpha = value;
  }

  /**
   * @inheritDoc
   * @override
   *
   * @param {string} blendMode
   *
   * @return {void}
   */
  set globalBlendMode(blendMode) {
    if (this.mGlobalBlendMode === blendMode)
      return;

    this.mGlobalBlendMode = blendMode;
    this.mCtx.globalCompositeOperation = blendMode;
  }

  /**
   * clear
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  clear() {
    // this.mTransform.identity();
    // this.setTransform(this.mIdentityMatrix);

    this.mCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.mCtx.clearRect(0, 0, this.mCtx.canvas.width, this.mCtx.canvas.height);
  }

  /**
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  beginFrame() {
    this.clear();
    this.skipChildren = false;

    this.mRenderers.splice(0, this.mRenderers.length);
  }

  /**
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  endFrame() {
  }

  /**
   * @ignore
   * @param {HTMLElement} canvas
   *
   * @return {Texture|null}
   */
  getTextureFromCanvas(canvas) {
    return new Texture(canvas);
  }
}
/**
 * An video driver that draw everything into DOM elements itself.
 *
 * @cat drivers
 * @extends VideoNullDriver
 */

class DOMDriver extends VideoNullDriver {
  /**
   * @param  {HTMLElement} containerElement The DOM element to draw into.
   * @param  {number} width                 The width of the viewport.
   * @param  {number} height                The height of the viewport.
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    /** @type {number} */
    this.mGlobalAlpha = 1;

    /** @type {Array<Element>} */
    this.mCache = [];

    /** @type {number} */
    this.mCounter = 0;

    /** @type {boolean} */
    this.mPixelated = true;

    /** @type {GameObject|null} */
    this.mCurrentObject = null;
    this.__initCSS();

    this.measureEl = document.createElement(`div`);
    this.measureEl.style.position = `absolute`;
    this.measureEl.style.visibility = `hidden`;
    this.measureEl.style.height = `auto`;
    this.measureEl.style.width = `auto`;
    this.measureEl.style.whiteSpace = `nowrap`;
    document.getElementsByTagName(`body`)[0].appendChild(this.measureEl);
  }

  /**
   * @inheritDoc
   * @override
   * @param {GameObject|null} gameObject Used for internal binding.
   *
   * @return {void} Description
   */
  save(gameObject) {
    this.mCurrentObject = gameObject;
  }

  /**
   * @private
   *
   * @return {void}  description
   */
  __initCSS() {
    let imgRendering = 'image-rendering:optimizeSpeed; image-rendering:optimize-contrast; image-rendering:crisp-edges; image-rendering:pixelated';

    let sSprite = document.createElement('style');
    sSprite.type = 'text/css';
    sSprite.innerHTML = '.sprite { position: absolute; background-repeat: no-repeat; cursor: default !important; -webkit-transform-origin: 0px 0px;}';
    document.getElementsByTagName('head')[0].appendChild(sSprite);

    let sSpritePixelated = document.createElement('style');
    sSpritePixelated.type = 'text/css';
    sSpritePixelated.innerHTML = '.sprite-p { position: absolute; background-repeat: no-repeat; cursor: default !important; -webkit-transform-origin: 0px 0px; ' + imgRendering + '}';
    document.getElementsByTagName('head')[0].appendChild(sSpritePixelated);

    let sText = document.createElement('style');
    sText.type = 'text/css';
    sText.innerHTML = '.text { position: absolute; white-space: pre; overflow: hidden; cursor: default !important; -webkit-transform-origin: 0px 0px;}';
    document.getElementsByTagName('head')[0].appendChild(sText);

    let sViewport = document.createElement('style');
    sViewport.type = 'text/css';
    sViewport.innerHTML = '.viewport { width: 100%; height: 100%; position: relative; overflow: hidden; cursor: default; }';
    document.getElementsByTagName('head')[0].appendChild(sViewport);

    this.mContainerElement.className = 'viewport';
  }

  /**
   * @inheritDoc
   * @override
   *
   * @return {void}  description
   */
  beginFrame() {
    this.mCounter = 0;
  }

  /**
   * @inheritDoc
   * @override
   *
   * @return {void}  description
   */
  endFrame() {
    if (this.mCounter === this.mCache.length)
      return;

    //TODO: cleanup unused divs
    //TODO: remove them instead of hiding
    for (let i = this.mCounter; i < this.mCache.length; i++) {
      let el = this.mCache[i];

      el.parentNode.removeChild(el);
    }

    this.mCache.splice(this.mCounter);
  }

  /**
   * @ignore
   * @param {HTMLElement} canvas
   *
   * @return {Texture|null}
   */
  getTextureFromCanvas(canvas) {
    return Texture.fromCanvasAsImage(canvas);
  }

  /**
   * @override
   * @inheritDoc
   *
   * @param  {Sprite|Particle} object
   * @param  {Texture} texture
   *
   * @return {void}
   */
  drawImage(object, texture) {
    /** @type {Matrix|null} */
    let oldTransform = this.mTransform.clone();
    let uw = texture.untrimmedRect.x;
    let uh = texture.untrimmedRect.y;

    //this.mTransform.translate(px, py);

    if (texture.untrimmedRect.x !== 0 || texture.untrimmedRect.y !== 0) {
      Matrix.__cache.set(1, 0, 0, 1, texture.untrimmedRect.x, texture.untrimmedRect.y);
      this.mTransform = this.mTransform.clone().append(Matrix.__cache);
      //this.mTransform = this.mTransform.clone().translate(texture.untrimmedRect.x, texture.untrimmedRect.y);
    }

    let el = this.__popElement(this.mPixelated ? 'sprite-p' : 'sprite');
    this.__updateElementCommon(el);
    this.__updateImageElement(el, texture);

    this.mTransform = oldTransform.clone();
  }

  /**
   * Measures text with a given style.
   *
   * @inheritDoc
   * @override
   *
   * @param {TextField} textField    Text to measure.
   * @param {TextInfo} style Text style to apply onto text.
   * @param {Rectangle} bounds.
   *
   * @return {Rectangle} A Vector with width and height of the text bounds.
   */
  measureText(textField, style, bounds) {
    let el = this.measureEl;

    textField.lines = textField.multiLine ? textField.text : textField.text.replace(/\n/mg, ` `);

    el.style.whiteSpace = 'pre';
    el.style.fontSize = style.size + 'px';
    el.style.fontFamily = style.name;
    el.style.fontStyle = style.style;
    el.style.fontWeight = style.weight;
    el.style.lineHeight = `${textField.lineHeight}`;
    el.style.letterSpacing = `${textField.letterSpacing}px`;
    el.innerHTML = textField.lines;

    let widths = textField.lineWidths;
    widths.length = 0;
    widths[0] = el.offsetWidth + style.strokeThickness;

    if (!textField.autoSize) {
      bounds.set(0, 0, textField.fieldWidth, textField.fieldHeight);
    } else {
      bounds.set(0, 0,
        el.clientWidth + 1 + style.strokeThickness,
        el.clientHeight + 1 + style.strokeThickness);
    }

    el.innerHTML = ``;

    return bounds;
  }

  /**
   * @inheritDoc
   * @override
   *
   * @param {TextField} textField
   * @param {TextInfo} style
   * @param {Rectangle} bounds
   *
   * @return {void}
   */
  drawText(textField, style, bounds) {
    let el = this.__popElement('text');

    // TODO: check this type. review the code.
    this.__updateTextElement(
      /** @type {HTMLElement} */ (el), textField, style, bounds);
  }

  /**
   * @private
   * @param {string} className
   *
   * @return {Element}
   */
  __popElement(className) {
    this.mCounter++;

    if (this.mCounter <= this.mCache.length)
      return this.mCache[this.mCounter - 1];

    let el = document.createElement('div');
    el.className = className;
    this.mContainerElement.appendChild(el);

    this.mCache.push(el);
    return (el);
  }

  /**
   * @private
   * @param {Element} el
   *
   * @return {void}
   */
  __updateElementCommon(el) {
    let v = this.mTransform.value;

    // TODO: slow, rework
    // NOTE: toFixed(0) is faster then toFixed(6)
    let transform = `matrix(${v[0].toFixed(6)}, ${v[1].toFixed(6)}, ${v[2].toFixed(6)}, ${v[3].toFixed(6)}, ${v[4].toFixed(6)}, ${v[5].toFixed(6)})`;
    //let transform = `matrix(${v[0]}, ${v[1]}, ${v[2]}, ${v[3]}, ${v[4]}, ${v[5]})`;

    //console.log(el.style.transform, transform);
    if (el.style.webkitTransform !== transform)
      el.style.webkitTransform = transform;

    //el.style.transform = transform;

    //if (el.style.opacity != this.mGlobalAlpha)
    el.style.opacity = this.mGlobalAlpha; // would be faster to not compare string and int

    //if (el.style.backgroundImage !== '') {
    //el.style.backgroundImage = '';
    //console.log('reset img');
    //}

    // if (el.style.width !== null)
    //   el.style.width = null;
    //
    // if (el.style.height !== null)
    //   el.style.height = null;

    // if (el.style.display === 'none')
    //   el.style.display = 'block';
  }

  /**
   * @private
   * @param  {Element} el      description
   * @param  {Texture} texture description
   * @return {void}         description
   */
  __updateImageElement(el, texture) {
    if (texture) {
      let url = 'url(' + texture.native.src + ')';

      if (el.style.backgroundImage !== url)
        el.style.backgroundImage = url;

      if (texture.isSubTexture) {
        let vBackgroundPosition = `${-texture.region.x}px ${-texture.region.y}px`;

        if (el.style.backgroundPosition !== vBackgroundPosition)
          el.style.backgroundPosition = vBackgroundPosition;
      }
    } else {
      el.style.backgroundImage = 'none';
    }

    if (el.style.width != texture.width + 'px')
      el.style.width = texture.width + 'px';

    if (el.style.height != texture.height + 'px')
      el.style.height = texture.height + 'px';

    if (el.innerHTML !== '')
      el.innerHTML = '';
  }

  /**
   * @private
   * @param {HTMLElement} el
   * @param {TextField} textField
   * @param {TextInfo} style
   * @param {Rectangle} bounds
   *
   * @return {void}
   */
  __updateTextElement(el, textField, style, bounds) {
    let width = textField.lineWidths[0];
    let text = textField.lines;
    let align = style.align;
    let x = 0;

    if (align === `center`) {
      x -= bounds.width / 2 - width / 2;
    } else if (align === `right`) {
      x -= bounds.width - width;
    }

    let v = this.mTransform.value;
    el.style.webkitTransform = `matrix(${v[0]}, ${v[1]}, ${v[2]}, ${v[3]}, ${v[4] - x}, ${v[5]})`;
    el.style.opacity = this.mGlobalAlpha;

    if (!textField.autoSize) {
      // top right bottom left. There is no width and height
      el.style.clip = `rect(0px ${bounds.width + x}px ${bounds.height}px ${x}px)`;
    }

    el.style.lineHeight = `${textField.lineHeight}`;
    el.style.fontSize = style.size + 'px';
    el.style.letterSpacing = `${textField.letterSpacing}px`;
    el.innerHTML = text;

    if (el.style.width !== bounds.width + x + 'px') {
      el.style.width = bounds.width + x + 'px';
    }

    if (el.style.height !== bounds.height + 'px') {
      el.style.height = bounds.height + 'px';
    }

    if (el.style.fontFamily !== style.name) {
      el.style.fontFamily = style.name;
    }

    let color = this.hexColorToString(style.color);

    if (el.style.color != color) {
      el.style.color = color;
    }

    if (el.style.fontStyle !== style.style)
      el.style.fontStyle = style.style;

    if (el.style.fontWeight != style.weight) {
      el.style.fontWeight = style.weight;
    }

    if (el.style.textAlign !== style.align) {
      el.style.textAlign = style.align;
    }

    if (el.style.backgroundImage !== 'none') {
      el.style.backgroundImage = 'none';
    }

    if (style.strokeThickness > 0) {
      let strokeColor = this.hexColorToString(style.strokeColor);

      if (el.style.webkitTextStrokeColor != strokeColor) {
        el.style.webkitTextStrokeColor = strokeColor;
      }

      if (el.style.webkitTextStrokeWidth != style.strokeThickness + 'px') {
        el.style.webkitTextStrokeWidth = style.strokeThickness + 'px';
      }
    }
  }
}

/**
 * An video driver that draw everything into DOM Canvas element.
 *
 * @cat drivers
 * @extends VideoNullDriver
 */

class WebGLDriver extends VideoNullDriver {
  /**
   * @param  {HTMLElement} containerElement description
   * @param  {number} width            description
   * @param  {number} height           description
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    console.log(`WebGL`);

    const fn = () => {
    };
    this.mEmptyPlugin = {
      stop: fn, start: fn, drawImage: fn, drawText: fn, onResize: fn, setTransform: fn,
      set blendMode(v) {
      },
      set globalAlpha(v) {
      }
    };
    this.mActivePlugin = this.mEmptyPlugin;
    this.mActiveArrayBuffer = null;
    this.mActiveElementBuffer = null;
    this.blend = null;
    this.boundTextures = [];

    this.__createCanvas();

    const gl = this.gl;
    gl.enable(gl.BLEND);

    this.MAX_TEXTURE_IMAGE_UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    this.glTextures = new WebGLTextures(this);
    this.blender = new WebGLBlendMode(gl);

    this.mPlugins = {
      [WebGLTexPlugin.name]      : new WebGLTexPlugin(this),
      [WebGLParticlesPlugin.name]: new WebGLParticlesPlugin(this)
    };
  }

  /**
   * __createCanvas
   *
   * @return {void}
   */
  __createCanvas() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.createElement(`canvas`));
    canvas.id = `canvas`;
    this.mContainerElement.appendChild(canvas);

    const config = {
      antialias         : true, // default true
      alpha             : false,
      premultipliedAlpha: false
    };

    this.gl = canvas.getContext(`webgl`, config) || canvas.getContext(`webgl-experimental`, config);
    this.__onResize(`init`, new Rectangle(0, 0, this.mClientWidth, this.mClientHeight))
  }

  __onResize(msg, rect) {
    super.__onResize(msg, rect);

    const gl = this.gl;
    const canvas = gl.canvas;

    const desiredWidthInCSSPixels = rect.width;
    const desiredHeightInCSSPixels = rect.height;

    // set the display size of the canvas.
    canvas.style.width = desiredWidthInCSSPixels + `px`;
    canvas.style.height = desiredHeightInCSSPixels + `px`;

    // set the size of the drawingBuffer
    var devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = desiredWidthInCSSPixels * devicePixelRatio;
    canvas.height = desiredHeightInCSSPixels * devicePixelRatio;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    this.mActivePlugin.onResize(msg, rect);
  }

  drawImage(object, texture) {
    let plugin = this.mPlugins[object.pluginName];

    if (plugin !== this.mActivePlugin) {
      this.mActivePlugin.stop();
      this.mActivePlugin = plugin;
      plugin.start();
    }

    plugin.globalAlpha = this.mGlobalAlpha;
    plugin.globalBlendMode = this.mGlobalBlendMode;
    plugin.setTransform(this.mTransform);
    plugin.drawImage(object, texture);
  }

  drawText(textField, style, bounds) {
    let plugin = this.mPlugins[textField.pluginName];

    if (plugin !== this.mActivePlugin) {
      this.mActivePlugin.stop();
      this.mActivePlugin = plugin;
      plugin.start();
    }

    plugin.globalAlpha = this.mGlobalAlpha;
    plugin.globalBlendMode = this.mGlobalBlendMode;
    plugin.setTransform(this.mTransform);
    plugin.drawText(textField, style, bounds);
  }

  bindTexture(texture, slot) {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0 + slot);
    // gl.bindTexture(gl.TEXTURE_2D, this.glTextures[slot]);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, Number(texture.premultiplyAlpha));
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.native);

    // only sprite plugin usable
    // _vSlotWebGL can be -1 even texture is bound
    const boundTextures = this.boundTextures;
    boundTextures[slot]._vSlotWebGL = -1;
    boundTextures[slot] = texture;
    texture._vSlotWebGL = slot;
  }

  bindArrayBuffer(buffer) {
    if (buffer === this.mActiveArrayBuffer) return;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.mActiveArrayBuffer = buffer;
  }

  bindElementBuffer(buffer) {
    if (buffer === this.mActiveElementBuffer) return;

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
    this.mActiveElementBuffer = buffer;
  }

  setBlend(blend) {
    const blendFunc = this.blender[blend];
    if (!blendFunc) debugger
    this.gl.blendFunc(blendFunc.src, blendFunc.dst);
    this.blend = blend;
  }

  endFrame() {
    this.mActivePlugin.stop();
  }

  measureText(textField, style, bounds) {
    let lines = textField.lines;
    let widths = textField.lineWidths;
    let lineHeight = textField.lineHeight;
    let text = textField.text;
    let multiLine = textField.multiLine;
    let strokeThickness = style.strokeThickness;
    let ctx = textField.context;
    let canvas;

    if (!ctx) {
      canvas = document.createElement(`canvas`);
      ctx = textField.context = canvas.getContext(`2d`);
      ctx.mLetterSpacing = 0;
    } else {
      canvas = ctx.canvas;
    }

    if (ctx.mLetterSpacing !== textField.letterSpacing) {
      ctx.mLetterSpacing = textField.letterSpacing;

      let canvas = ctx.canvas;
      document.getElementsByTagName(`body`)[0].appendChild(canvas);
      canvas.style.letterSpacing = `${textField.letterSpacing}px`;
      canvas.style.visibility = `hidden`; // todo
      // canvas.style.display = `none`;  this doesn't work
      // ctx = textField.context = canvas.getContext(`2d`);
    }

    ctx.font = `${style.style} ${style.weight} ${style.size}px "${style.name}"`;
    ctx.textBaseline = `bottom`;

    lines.length = 0;
    widths.length = 0;
    multiLine ? lines.push(...text.split(`\n`)) : lines.push(text);

    for (let i = 0, l = lines.length; i < l; i++) {
      widths[i] = ctx.measureText(lines[i]).width + strokeThickness;
    }

    if (!textField.autoSize) {
      bounds.set(0, 0, textField.fieldWidth, textField.fieldHeight);
    } else {
      bounds.set(0, 0, Math.max(...widths), lines.length * lineHeight * (style.size + strokeThickness));
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.naturalWidth = bounds.width;
    canvas.height = canvas.naturalHeight = bounds.height;
    textField.mTexture = new Texture(canvas); // todo cache
    textField.mTexture.premultiplyAlpha = true;
    
    return bounds;
  }
}


const WebGLConstants = {
  FLOAT                        : 0x1406,
  FLOAT_VEC2                   : 0x8B50,
  FLOAT_VEC3                   : 0x8B51,
  FLOAT_VEC4                   : 0x8B52,
  INT                          : 0x1404,
  INT_VEC2                     : 0x8B53,
  INT_VEC3                     : 0x8B54,
  INT_VEC4                     : 0x8B55,
  BOOL                         : 0x8B56,
  BOOL_VEC2                    : 0x8B57,
  BOOL_VEC3                    : 0x8B58,
  BOOL_VEC4                    : 0x8B59,
  FLOAT_MAT2                   : 0x8B5A,
  FLOAT_MAT3                   : 0x8B5B,
  FLOAT_MAT4                   : 0x8B5C,
  SAMPLER_2D                   : 0x8B5E,
  SAMPLER_CUBE                 : 0x8B60,
  SAMPLER_3D                   : 0x8B5F,
  SAMPLER_2D_SHADOW            : 0x8B62,
  FLOAT_MAT2x3                 : 0x8B65,
  FLOAT_MAT2x4                 : 0x8B66,
  FLOAT_MAT3x2                 : 0x8B67,
  FLOAT_MAT3x4                 : 0x8B68,
  FLOAT_MAT4x2                 : 0x8B69,
  FLOAT_MAT4x3                 : 0x8B6A,
  SAMPLER_2D_ARRAY             : 0x8DC1,
  SAMPLER_2D_ARRAY_SHADOW      : 0x8DC4,
  SAMPLER_CUBE_SHADOW          : 0x8DC5,
  UNSIGNED_INT                 : 0x1405,
  UNSIGNED_INT_VEC2            : 0x8DC6,
  UNSIGNED_INT_VEC3            : 0x8DC7,
  UNSIGNED_INT_VEC4            : 0x8DC8,
  INT_SAMPLER_2D               : 0x8DCA,
  INT_SAMPLER_3D               : 0x8DCB,
  INT_SAMPLER_CUBE             : 0x8DCC,
  INT_SAMPLER_2D_ARRAY         : 0x8DCF,
  UNSIGNED_INT_SAMPLER_2D      : 0x8DD2,
  UNSIGNED_INT_SAMPLER_3D      : 0x8DD3,
  UNSIGNED_INT_SAMPLER_CUBE    : 0x8DD4,
  UNSIGNED_INT_SAMPLER_2D_ARRAY: 0x8DD7,

  TEXTURE_2D      : 0x0DE1,
  TEXTURE_CUBE_MAP: 0x8513,
  TEXTURE_3D      : 0x806F,
  TEXTURE_2D_ARRAY: 0x8C1A
};

/**
 * Maps black blend modes to WebGl blend functions.
 */

class WebGLBlendMode {
  constructor(gl) {
    return {
      [BlendMode.NORMAL]     : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.ADD]        : {src: gl.ONE, dst: gl.DST_ALPHA},
      [BlendMode.MULTIPLY]   : {src: gl.DST_COLOR, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.SCREEN]     : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_COLOR},
      [BlendMode.OVERLAY]    : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.DARKEN]     : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.LIGHTEN]    : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.COLOR_DODGE]: {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.COLOR_BURN] : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.HARD_LIGHT] : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.SOFT_LIGHT] : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.DIFFERENCE] : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.EXCLUSION]  : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.HUE]        : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.SATURATE]   : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.COLOR]      : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
      [BlendMode.LUMINOSITY] : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA}
    };
  }
}

const typeMap = {
  [WebGLConstants.FLOAT]     : `uniform1f`,
  [WebGLConstants.FLOAT_VEC2]: `uniform2fv`,
  [WebGLConstants.FLOAT_VEC3]: `uniform3fv`,
  [WebGLConstants.FLOAT_VEC4]: `uniform4fv`,
  [WebGLConstants.INT]       : `uniform1i`,
  [WebGLConstants.INT_VEC2]  : `uniform2iv`,
  [WebGLConstants.INT_VEC3]  : `uniform3iv`,
  [WebGLConstants.INT_VEC4]  : `uniform4iv`,
  [WebGLConstants.FLOAT_MAT2]: `uniformMatrix2fv`,
  [WebGLConstants.FLOAT_MAT3]: `uniformMatrix3fv`,
  [WebGLConstants.FLOAT_MAT4]: `uniformMatrix4fv`,
  [WebGLConstants.SAMPLER_2D]: `uniform1i`
};


class WebGLBasePlugin {
  constructor(renderer, vertexShaderSource, fragmentShaderSource, attributesInfo) {
    this.mRenderer = renderer;
    this.mBlendMode = BlendMode.NORMAL;
    this.mTransform = new Matrix();
    this.mGlobalAlpha = 1;

    const gl = this.gl = renderer.gl;
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    const program = this.program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program); // set up uniforms for
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    const uniforms = this.uniforms = {};
    const uniformsAmount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < uniformsAmount; i++) {
      const uniformInfo = gl.getActiveUniform(program, i);
      let name = uniformInfo.name;
      const isArray = name.slice(-3) === `[0]`;
      name = isArray ? name.slice(0, -3) : name;

      const location = gl.getUniformLocation(program, uniformInfo.name);
      const sSetter = typeMap[uniformInfo.type] + (isArray ? `v` : ``);
      const setter = gl[sSetter].length === 2 ?
        v => gl[sSetter](location, v) : v => gl[sSetter](location, false, v);

      // setter.location = location;
      Object.defineProperty(uniforms, name, {set: setter, get: () => location});
    }
  }

  onResize(msg, rect) {

  }

  set globalBlendMode(blendMode) {
    this.mBlendMode = blendMode;
  }

  setTransform(m) {
    this.mTransform = m;
  }

  set globalAlpha(value) {
    this.mGlobalAlpha = value;
  }

  drawImage(object, texture) {

  }

  drawText(textField, style, bounds) {

  }

  start() {
    
  }
  
  stop() {
    
  }
}


class WebGLTextures {
  constructor(renderer) {
    const gl = this.gl = renderer.gl;
    const UNITS = renderer.MAX_TEXTURE_IMAGE_UNITS;
    const glTextures = [];
    const canvas = document.createElement(`canvas`);
    const ctx = canvas.getContext(`2d`);
    canvas.width = canvas.height = 8;
    ctx.fillRect(0, 0, 8, 8);

    for (let i = 0; i < UNITS; i++) {
      const glTexture = glTextures[i] = gl.createTexture();
      const texture = new Texture(canvas);
      texture._vSlotWebGL = i;
      renderer.boundTextures[i] = texture;

      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, glTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.native);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    
    return glTextures;
  }
}

const vertexShaderSource = `
  precision highp float;
  
  attribute vec2 aPosition; // 2 * float = 8
  attribute vec2 aTexCoord; // 2 * unsigned short = 4
  attribute vec4 aColor;    // 4 * UNSIGNED BYTE = 4
  attribute float aTexSlot; // 1 * float = 4
  
  varying vec2 vTexCoord;
  varying float vTexSlot;
  varying vec4 vColor;

  uniform vec2 uProjection;

  void main() {
    gl_Position = vec4(aPosition.x * uProjection.x - 1.0, -aPosition.y * uProjection.y + 1.0, 0.0, 1.0);
    
    vTexCoord = aTexCoord;
    vTexSlot = aTexSlot;
    vColor = aColor;
  }
`;

const fragmentShaderSource = `
  precision lowp float;
  
  varying vec2 vTexCoord;
  varying float vTexSlot;
  varying vec4 vColor;
  
  uniform sampler2D uSamplers[MAX_TEXTURE_IMAGE_UNITS];
  
  void main() {
    int texSlot = int(vTexSlot);
    
    for (int i = 0; i < MAX_TEXTURE_IMAGE_UNITS; i++) {
      if (i == texSlot) {
        gl_FragColor = texture2D(uSamplers[i], vTexCoord) * vColor;
        return;
      }
    }
  }
`;

let LAST_SLOT = 0;


class WebGLTexPlugin extends WebGLBasePlugin {
  constructor(renderer) {
    const gl = renderer.gl;
    const UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);

    super(renderer, vertexShaderSource, fragmentShaderSource.replace(/MAX_TEXTURE_IMAGE_UNITS/g, UNITS));

    this.MAX_TEXTURE_IMAGE_UNITS = UNITS;
    this.batchSize = 2048;
    this.objects = [];
    this.batches = [];
    this.buffers = [];

    for (let i = 0, l = this.batchSize; i < l; i++) {
      this.batches.push({textures: [], texturesLength: 0, slots: {}, start: 0, size: 0, blend: null});
    }

    for (let i = 1, l = this.nextPow2(this.batchSize); i <= l; i *= 2) {
      const buffer = {data: new ArrayBuffer(i * 4 * 20)};
      buffer.float32View = new Float32Array(buffer.data);
      buffer.uint32View = new Uint32Array(buffer.data);
      this.buffers[i] = buffer;
    }


    // Element Buffer
    const len = this.batchSize * 6;
    const indices = new Uint16Array(len);

    for (let i = 0, j = 0; i < len; i += 6, j += 4) {
      indices[i] = j;
      indices[i + 1] = j + 1;
      indices[i + 2] = j + 2;
      indices[i + 3] = j + 3;
      indices[i + 4] = j + 3;
      indices[i + 5] = j + 4;
    }

    this.mElementBuffer = gl.createBuffer();
    renderer.bindElementBuffer(this.mElementBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STREAM_DRAW);


    // Array Buffer
    this.mArrayBuffer = gl.createBuffer();
    const location = {
      aPosition: gl.getAttribLocation(this.program, `aPosition`),
      aTexCoord: gl.getAttribLocation(this.program, `aTexCoord`),
      aColor   : gl.getAttribLocation(this.program, `aColor`),
      aTexSlot : gl.getAttribLocation(this.program, `aTexSlot`)
    };
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mArrayBuffer);
    gl.vertexAttribPointer(location.aPosition, 2, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer(location.aTexCoord, 2, gl.UNSIGNED_SHORT, true, 20, 8);
    gl.vertexAttribPointer(location.aColor, 4, gl.UNSIGNED_BYTE, true, 20, 12);
    gl.vertexAttribPointer(location.aTexSlot, 1, gl.FLOAT, false, 20, 16);
    gl.enableVertexAttribArray(location.aPosition);
    gl.enableVertexAttribArray(location.aTexCoord);
    gl.enableVertexAttribArray(location.aColor);
    gl.enableVertexAttribArray(location.aTexSlot);


    gl.uniform2f(this.uniforms.uProjection, 2 / renderer.mClientWidth, 2 / renderer.mClientHeight);
    gl.uniform1iv(this.uniforms.uSamplers, new Int32Array(new Array(this.MAX_TEXTURE_IMAGE_UNITS).fill(0).map((v, i) => i)));

    this.stop = this.flush;
  }

  onResize(msg, rect) {
    this.gl.uniform2f(this.uniforms.uProjection, 2 / rect.width, 2 / rect.height);
  }

  drawImage(object) {
    if (object.worldAlpha === 0) return;

    this.objects.push(object);

    if (this.objects.length === this.batchSize) {
      this.flush();
    }
  }
  
  drawText(textField, style, bounds) {
    if (!textField.mNeedInvalidate) {
      return this.drawImage(textField);
    }

    let lines = textField.lines;
    let widths = textField.lineWidths;
    let lineOffset = textField.lineHeight * style.size;
    let strokeThickness = style.strokeThickness;
    let align = style.align;
    let maxWidth = bounds.width;
    let ctx = textField.context;

    if (ctx.mLetterSpacing !== textField.letterSpacing) {
      ctx.mLetterSpacing = textField.letterSpacing;

      let canvas = ctx.canvas;
      canvas.style.letterSpacing = `${textField.letterSpacing}px`;
      // ctx = this.mCtx = canvas.getContext(`2d`);
    }

    ctx.font = `${style.style} ${style.weight} ${style.size}px "${style.name}"`;
    ctx.fillStyle = this.mRenderer.hexColorToString(style.color);
    ctx.textBaseline = `bottom`;

    if (strokeThickness !== 0) {
      ctx.lineJoin = `round`;
      ctx.miterLimit = 2;
      ctx.lineWidth = strokeThickness;
      ctx.strokeStyle = this.mRenderer.hexColorToString(style.strokeColor);
    }

    // ctx.fillRect(0, 0, maxWidth, bounds.height);

    for (let i = 0, l = lines.length; i < l; i++) {
      let width = widths[i];
      let y = bounds.height - strokeThickness / 2 - lineOffset * (l - i - 1);
      let x = strokeThickness / 2;

      if (align === `center`) {
        x += maxWidth / 2 - width / 2;
      } else if (align === `right`) {
        x += maxWidth - width;
      }

      strokeThickness !== 0 && ctx.strokeText(lines[i], x, y);
      ctx.fillText(lines[i], x, y);
    }

    this.drawImage(textField);
  }

  flush() {
    const objects = this.objects;
    const length = objects.length;

    if (length === 0) return;

    const gl = this.gl;
    const renderer = this.mRenderer;
    const rendererBoundTextures = renderer.boundTextures;
    const vBoundTextures = rendererBoundTextures.slice();
    const batches = this.batches;
    const MAX_TEXTURE_IMAGE_UNITS = this.MAX_TEXTURE_IMAGE_UNITS;
    const buffer = this.buffers[this.nextPow2(length)];
    const uint32View = buffer.uint32View;
    const float32View = buffer.float32View;

    let index = 0;
    let currentBatchIndex = 0;
    let currentBatch = batches[0];
    let currentBlend = currentBatch.blend = objects[0].blendMode;
    let currentBatchSlots = currentBatch.slots;
    currentBatch.texturesLength = 0;
    let i;

    for (i = 0; i < length; i++) {
      const object = objects[i];
      const alpha = object.worldAlpha;
      const tint = object.tint;
      const nextBlend = object.blendMode;
      const texture = object.mTexture;
      /* object.lateDirty && */object.refreshVertexData();  // todo late dirt

      if (currentBlend !== nextBlend) {
        currentBlend = nextBlend;

        currentBatchSlots = 0;
        currentBatch.texturesLength = MAX_TEXTURE_IMAGE_UNITS;
      }

      if (currentBatchSlots[texture.id] === undefined) {
        if (currentBatch.texturesLength === MAX_TEXTURE_IMAGE_UNITS) {
          currentBatch.size = i - currentBatch.start;
          // currentBatch.texturesLength = currentBatch.textures.length;

          currentBatch = batches[++currentBatchIndex];
          currentBatch.start = i;
          currentBatch.blend = nextBlend;
          currentBatch.texturesLength = 0;
          currentBatchSlots = currentBatch.slots;
        }

        if (texture._vSlotWebGL === -1) {
          for (let j = 0; j < MAX_TEXTURE_IMAGE_UNITS; j++) {
            const k = (j + LAST_SLOT) % MAX_TEXTURE_IMAGE_UNITS;
            const tex = vBoundTextures[k];

            if (currentBatchSlots[tex.mId] === undefined) {
              tex._vSlotWebGL = -1;
              texture._vSlotWebGL = k;
              vBoundTextures[k] = texture;
              LAST_SLOT++;

              break;
            }
          }
        }

        currentBatchSlots[texture.mId] = texture._vSlotWebGL;
        currentBatch.textures[currentBatch.texturesLength++] = texture;
      }

      const vertexData = object.vertexData;
      float32View[index] = vertexData[0];
      float32View[index + 1] = vertexData[1];
      float32View[index + 5] = vertexData[2];
      float32View[index + 6] = vertexData[3];
      float32View[index + 10] = vertexData[4];
      float32View[index + 11] = vertexData[5];
      float32View[index + 15] = vertexData[6];
      float32View[index + 16] = vertexData[7];

      const texCoord = texture.coord;
      uint32View[index + 2] = texCoord[0];
      uint32View[index + 7] = texCoord[1];
      uint32View[index + 12] = texCoord[2];
      uint32View[index + 17] = texCoord[3];

      uint32View[index + 3] = uint32View[index + 8] = uint32View[index + 13] = uint32View[index + 18] = alpha === 1 ?
      (alpha * 255 << 24) + tint :
      (alpha * 255 << 24) + ((((tint >> 16) & 0xff) * alpha + 0.5 | 0) << 16) +
      ((((tint >> 8) & 0xff) * alpha + 0.5 | 0) << 8) + ((tint & 0xff) * alpha + 0.5 | 0);

      float32View[index + 4] = float32View[index + 9] = 
        float32View[index + 14] = float32View[index + 19] = texture._vSlotWebGL + 0.5;

      index += 20;
    }

    currentBatch.size = i - currentBatch.start;
    gl.bufferData(gl.ARRAY_BUFFER, buffer.data, gl.STREAM_DRAW);

    for (let i = 0, len = currentBatchIndex + 1; i < len; i++) {
      const batch = batches[i];
      const textures = batch.textures;
      const slots = batch.slots;

      for (let j = 0, l = batch.textures.length; j < l; j++) {
        const texture = textures[j];
        const slot = slots[texture.id];
        slots[texture.id] = undefined;

        if (rendererBoundTextures[slot] !== texture) {
          renderer.bindTexture(texture, slot);
        }
      }

      if (renderer.blend !== batch.blend) {
        renderer.setBlend(batch.blend);
      }

      gl.drawElements(gl.TRIANGLE_STRIP, batch.size * 6 - 2, gl.UNSIGNED_SHORT, batch.start * 12);
    }

    objects.length = 0;
  }

  start() {
    this.gl.useProgram(this.program);
  }

  nextPow2(v) {
    v += v === 0;
    --v;
    v |= v >>> 1;
    v |= v >>> 2;
    v |= v >>> 4;
    v |= v >>> 8;
    v |= v >>> 16;

    return v + 1;
  }
}

const vertexShaderSource1 = `
  precision highp float;
  
  attribute vec2 aPosition; // 2 * float = 8
  attribute vec2 aTexCoord; // 2 * unsigned short = 4
  attribute vec4 aColor;    // 4 * UNSIGNED BYTE = 4
  attribute float aTexSlot; // 1 * float = 4
  
  varying vec2 vTexCoord;
  varying float vTexSlot;
  varying vec4 vColor;

  uniform vec2 uProjection;

  void main() {
    gl_Position = vec4(aPosition.x * uProjection.x - 1.0, -aPosition.y * uProjection.y + 1.0, 0.0, 1.0);
    
    vTexCoord = aTexCoord;
    vTexSlot = aTexSlot;
    vColor = aColor;
  }
`;

const fragmentShaderSource1 = `
  precision lowp float;
  
  varying vec2 vTexCoord;
  varying float vTexSlot;
  varying vec4 vColor;
  
  uniform sampler2D uSamplers[MAX_TEXTURE_IMAGE_UNITS];
  
  void main() {
    int texSlot = int(vTexSlot);
    
    for (int i = 0; i < MAX_TEXTURE_IMAGE_UNITS; i++) {
      if (i == texSlot) {
        gl_FragColor = texture2D(uSamplers[i], vTexCoord) * vColor;
        return;
      }
    }
  }
`;

let LAST_SLOT_ = 0;


class WebGLParticlesPlugin extends WebGLBasePlugin {
  constructor(renderer) {
    const gl = renderer.gl;
    const UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);

    super(renderer, vertexShaderSource1, fragmentShaderSource1.replace(/MAX_TEXTURE_IMAGE_UNITS/g, UNITS));

    this.MAX_TEXTURE_IMAGE_UNITS = UNITS;
    this.batchSize = 2048;
    this.objects = new Array(this.batchSize).fill(``)
      .map(v => {
        return {transform: new Matrix(), vertexData: []}
      });
    this.objectsLength = 0;
    this.batches = [];
    this.buffers = [];

    for (let i = 0, l = this.batchSize; i < l; i++) {
      this.batches.push({textures: [], texturesLength: 0, slots: {}, start: 0, size: 0, blend: null});
    }

    for (let i = 1, l = this.nextPow2(this.batchSize); i <= l; i *= 2) {
      const buffer = {data: new ArrayBuffer(i * 4 * 20)};
      buffer.float32View = new Float32Array(buffer.data);
      buffer.uint32View = new Uint32Array(buffer.data);
      this.buffers[i] = buffer;
    }


    // Element Buffer
    const len = this.batchSize * 6;
    const indices = new Uint16Array(len);

    for (let i = 0, j = 0; i < len; i += 6, j += 4) {
      indices[i] = j;
      indices[i + 1] = j + 1;
      indices[i + 2] = j + 2;
      indices[i + 3] = j + 3;
      indices[i + 4] = j + 3;
      indices[i + 5] = j + 4;
    }

    this.mElementBuffer = gl.createBuffer();
    renderer.bindElementBuffer(this.mElementBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STREAM_DRAW);


    // Array Buffer
    this.mArrayBuffer = gl.createBuffer();
    const location = {
      aPosition: gl.getAttribLocation(this.program, `aPosition`),
      aTexCoord: gl.getAttribLocation(this.program, `aTexCoord`),
      aColor   : gl.getAttribLocation(this.program, `aColor`),
      aTexSlot : gl.getAttribLocation(this.program, `aTexSlot`)
    };
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mArrayBuffer);
    gl.vertexAttribPointer(location.aPosition, 2, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer(location.aTexCoord, 2, gl.UNSIGNED_SHORT, true, 20, 8);
    gl.vertexAttribPointer(location.aColor, 4, gl.UNSIGNED_BYTE, true, 20, 12);
    gl.vertexAttribPointer(location.aTexSlot, 1, gl.FLOAT, false, 20, 16);
    gl.enableVertexAttribArray(location.aPosition);
    gl.enableVertexAttribArray(location.aTexCoord);
    gl.enableVertexAttribArray(location.aColor);
    gl.enableVertexAttribArray(location.aTexSlot);


    gl.uniform2f(this.uniforms.uProjection, 2 / renderer.mClientWidth, 2 / renderer.mClientHeight);
    gl.uniform1iv(this.uniforms.uSamplers, new Int32Array(new Array(this.MAX_TEXTURE_IMAGE_UNITS).fill(0).map((v, i) => i)));

    this.stop = this.flush;
  }

  onResize(msg, rect) {
    this.gl.uniform2f(this.uniforms.uProjection, 2 / rect.width, 2 / rect.height);
  }

  set globalBlendMode(blendMode) {
    this.mBlendMode = blendMode;
  }

  setTransform(m) {
    this.mTransform = m;
  }

  set globalAlpha(value) {
    this.mGlobalAlpha = value;
  }

  refreshVertexData(object) {
    const vertexData = object.vertexData;
    const transform = object.transform.value;
    const a = transform[0];
    const b = transform[1];
    const c = transform[2];
    const d = transform[3];
    const tx = transform[4];
    const ty = transform[5];
    const texture = object.mTexture;
    const region = texture.mRegion;
    const w = region.width;
    const h = region.height;

    if (texture.isTrimmed) {
      const untrimmedRegion = texture.untrimmedRect;
      const left = untrimmedRegion.x;
      const top = untrimmedRegion.y;
      const right = left + w;
      const bottom = top + h;

      // left top
      vertexData[0] = a * left + c * top + tx;
      vertexData[1] = d * top + b * left + ty;

      // right top
      vertexData[2] = a * right + c * top + tx;
      vertexData[3] = d * top + b * right + ty;

      // left bottom
      vertexData[4] = a * left + c * bottom + tx;
      vertexData[5] = d * bottom + b * left + ty;

      // right bottom
      vertexData[6] = a * right + c * bottom + tx;
      vertexData[7] = d * bottom + b * right + ty;
    } else {

      // left top
      vertexData[0] = tx;
      vertexData[1] = ty;

      // right top
      vertexData[2] = a * w + tx;
      vertexData[3] = b * w + ty;

      // left bottom
      vertexData[4] = c * h + tx;
      vertexData[5] = d * h + ty;

      // right bottom
      vertexData[6] = a * w + c * h + tx;
      vertexData[7] = d * h + b * w + ty;
    }
  }
  
  drawImage(particle, texture) {
    if (particle.worldAlpha === 0) return;

    let object = this.objects[this.objectsLength++];
    object.transform.copyFrom(this.mTransform);
    object.mTexture = texture;
    object.worldAlpha = particle.worldAlpha;
    object.tint = 0xffffff;
    object.blendMode = this.mBlendMode;

    if (this.objectsLength === this.batchSize) {
      this.flush();
    }
  }

  flush() {
    const objects = this.objects;
    const length = this.objectsLength;

    if (length === 0) return;

    const gl = this.gl;
    const renderer = this.mRenderer;
    const rendererBoundTextures = renderer.boundTextures;
    const vBoundTextures = rendererBoundTextures.slice();
    const batches = this.batches;
    const MAX_TEXTURE_IMAGE_UNITS = this.MAX_TEXTURE_IMAGE_UNITS;
    const buffer = this.buffers[this.nextPow2(length)];
    const uint32View = buffer.uint32View;
    const float32View = buffer.float32View;

    let index = 0;
    let currentBatchIndex = 0;
    let currentBatch = batches[0];
    let currentBlend = currentBatch.blend = objects[0].blendMode;
    let currentBatchSlots = currentBatch.slots;
    currentBatch.texturesLength = 0;
    let i;

    for (i = 0; i < length; i++) {
      const object = objects[i];
      const alpha = object.worldAlpha;
      const tint = object.tint;
      const nextBlend = object.blendMode;
      const texture = object.mTexture;

      if (currentBlend !== nextBlend) {
        currentBlend = nextBlend;

        currentBatchSlots = 0;
        currentBatch.texturesLength = MAX_TEXTURE_IMAGE_UNITS;
      }

      if (currentBatchSlots[texture.id] === undefined) {
        if (currentBatch.texturesLength === MAX_TEXTURE_IMAGE_UNITS) {
          currentBatch.size = i - currentBatch.start;
          // currentBatch.texturesLength = currentBatch.textures.length;

          currentBatch = batches[++currentBatchIndex];
          currentBatch.start = i;
          currentBatch.blend = nextBlend;
          currentBatch.texturesLength = 0;
          currentBatchSlots = currentBatch.slots;
        }

        if (texture._vSlotWebGL === -1) {
          for (let j = 0; j < MAX_TEXTURE_IMAGE_UNITS; j++) {
            const k = (j + LAST_SLOT_) % MAX_TEXTURE_IMAGE_UNITS;
            const tex = vBoundTextures[k];

            if (currentBatchSlots[tex.mId] === undefined) {
              tex._vSlotWebGL = -1;
              texture._vSlotWebGL = k;
              vBoundTextures[k] = texture;
              LAST_SLOT_++;

              break;
            }
          }
        }

        currentBatchSlots[texture.mId] = texture._vSlotWebGL;
        currentBatch.textures[currentBatch.texturesLength++] = texture;
      }

      this.refreshVertexData(object);
      const vertexData = object.vertexData;
      float32View[index] = vertexData[0];
      float32View[index + 1] = vertexData[1];
      float32View[index + 5] = vertexData[2];
      float32View[index + 6] = vertexData[3];
      float32View[index + 10] = vertexData[4];
      float32View[index + 11] = vertexData[5];
      float32View[index + 15] = vertexData[6];
      float32View[index + 16] = vertexData[7];

      const texCoord = texture.coord;
      uint32View[index + 2] = texCoord[0];
      uint32View[index + 7] = texCoord[1];
      uint32View[index + 12] = texCoord[2];
      uint32View[index + 17] = texCoord[3];

      uint32View[index + 3] = uint32View[index + 8] = uint32View[index + 13] = uint32View[index + 18] = alpha === 1 ?
      (alpha * 255 << 24) + tint :
      (alpha * 255 << 24) + ((((tint >> 16) & 0xff) * alpha + 0.5 | 0) << 16) +
      ((((tint >> 8) & 0xff) * alpha + 0.5 | 0) << 8) + ((tint & 0xff) * alpha + 0.5 | 0);

      float32View[index + 4] = float32View[index + 9] = 
        float32View[index + 14] = float32View[index + 19] = texture._vSlotWebGL + 0.5;

      index += 20;
    }

    currentBatch.size = i - currentBatch.start;
    gl.bufferData(gl.ARRAY_BUFFER, buffer.data, gl.STREAM_DRAW);

    for (let i = 0, len = currentBatchIndex + 1; i < len; i++) {
      const batch = batches[i];
      const textures = batch.textures;
      const slots = batch.slots;

      for (let j = 0, l = batch.texturesLength; j < l; j++) {
        const texture = textures[j];
        const slot = slots[texture.id];
        slots[texture.id] = undefined;

        if (rendererBoundTextures[slot] !== texture) {
          renderer.bindTexture(texture, slot);
        }
      }

      if (renderer.blend !== batch.blend) {
        renderer.setBlend(batch.blend);
      }

      gl.drawElements(gl.TRIANGLE_STRIP, batch.size * 6 - 2, gl.UNSIGNED_SHORT, batch.start * 12);
    }

    this.objectsLength = 0;
  }

  start() {
    this.gl.useProgram(this.program);
  }

  nextPow2(v) {
    v += v === 0;
    --v;
    v |= v >>> 1;
    v |= v >>> 2;
    v |= v >>> 4;
    v |= v >>> 8;
    v |= v >>> 16;

    return v + 1;
  }
}

/**
 * The base class for all renderable objects. Adds `alpha` and `visible` properties to GameObject.
 *
 * @cat display
 * @extends GameObject
 */

class DisplayObject extends GameObject {
  constructor() {
    super();

    /**
     * @private
     * @type {number}
     */
    this.mAlpha = 1;

    /**
     * @public
     * @type {string}
     */
    this.blendMode = BlendMode.NORMAL;

    /**
     * @private
     * @type {boolean}
     */
    this.mVisible = true;

    this.mRenderer = new Renderer();
    
    // this.pluginName = WebGLTexPlugin.name;
    // this.vertexData = [];
    // this.tint = 0xffffff;
  }

  onRender(driver, parentRenderer) {
    let renderer = this.mRenderer;

    if (this.mDirty & DirtyFlag.RENDER) {
      renderer.alpha = this.mAlpha * parentRenderer.alpha;
      renderer.blendMode = this.blendMode;
      renderer.visible = this.mVisible;
      this.mDirty ^= DirtyFlag.RENDER;
    }

    return driver.registerRenderer(renderer);
  }

  /**
   * Gets/Sets the opacity of the object.
   *
   * @return {number}
   */
  get alpha() {
    return this.mAlpha;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set alpha(value) {
    if (this.mAlpha === MathEx.clamp(value, 0, 1))
      return;

    this.mAlpha = MathEx.clamp(value, 0, 1);    
    this.setRenderDirty();
  }


  /**
   * Gets/Sets visibility of the object.
   *
   * @return {boolean}
   */
  get visible() {
    return this.mVisible;
  }


  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set visible(value) {
    if (this.mVisible === value)
      return;

    this.mVisible = value;
    this.setRenderDirty();
  }
}

/**
 * Holds TextField's style details.
 *
 * @cat display.text
 */

class TextInfo {
  /**
   * @param  {string=} name Font name
   * @param  {number=} color = Text color as hexadecimal number eg 0xff0000 (total red)
   * @param  {number=} size = Text size
   * @param  {TextInfo.FontStyle=} style = Text style eg italic
   * @param  {TextInfo.FontWeight=} weight = font thick. The value is set from 100 to 900 in increments of 100.
   * @param  {TextInfo.FontAlign=} align = horizontal alignment left | center | right
   * @param  {number=} strokeThickness = thickness of the stroke. 0 means that no stroke
   * @param  {number=} strokeColor = stroke color as hexadecimal number eg 0x00ff00 (total green)
   */
  constructor(name = 'sans-serif', color = 0x000000, size = 14, style = TextInfo.FontStyle.NORMAL, weight = TextInfo.FontWeight.NORMAL, align = TextInfo.FontAlign.LEFT, strokeThickness = 0, strokeColor = 0xffffff) {

    /** @type {string} */
    this.name = name;

    /** @type {number} */
    this.size = size;

    /** @type {number} */
    this.color = color;

    /** @type {TextInfo.FontStyle} */
    this.style = style;

    /** @type {TextInfo.FontWeight} */
    this.weight = weight;

    /** @type {TextInfo.FontAlign} */
    this.align = align;

    /** @type {number} */
    this.strokeThickness = strokeThickness;

    /** @type {number} */
    this.strokeColor = strokeColor;
  }
}

/**
 * @enum {string}
 */
TextInfo.FontStyle = {
  NORMAL: 'normal',
  ITALIC: 'italic'
};

/**
 * @enum {string}
 */
TextInfo.FontWeight = {
  NORMAL: '400',
  BOLD: '700',
  SUPERBOLD: '800'
};

/**
 * @enum {string}
 */
TextInfo.FontAlign = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center'
};

/**
 * Sprite is used to render Texture onto screen.
 *
 * @cat display
 * @extends DisplayObject
 */

class Sprite extends DisplayObject {
  /**
   * Creates a new Sprite instance.
   *
   * @param {Texture|string|null} texture The Texture instance or null.
   */
  constructor(texture = null) {
    super();

    /**
     * @private
     * @type {Texture|null} */
    this.mTexture = null;

    /**
     * @private
     * @type {string|null} */
    this.mTextureName = null;

    if (texture !== null && texture.constructor === String) {
      this.mTextureName = /** @type {string} */ (texture);
      this.mTexture = AssetManager.default.getTexture(/** @type {string} */(texture));
    } else {
      this.mTexture = /** @type {Texture} */ (texture);
    }

    this.mRenderer = Black.instance.video.getRenderer(this);
  }

  onRender(driver, parentRenderer) {
    let renderer = this.mRenderer;

    if (this.mDirty & DirtyFlag.RENDER) {
      renderer.transform = this.worldTransformation;
      renderer.texture = this.mTexture;
      renderer.alpha = this.mAlpha * parentRenderer.alpha;
      renderer.blendMode = this.blendMode;
      renderer.visible = this.mVisible;
      this.mDirty ^= DirtyFlag.RENDER;
    }

    return driver.registerRenderer(renderer);
  }

  /**
   * onGetLocalBounds - Returns a rectangle that completely encloses the object in local coordinate system.
   *
   * @override
   * @protected
   * @param {Rectangle=} outRect Description
   *
   * @return {Rectangle} The new Rectangle or outRect with .
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (!this.mTexture)
      return outRect;

    return outRect.set(0, 0, this.mTexture.untrimmedRect.width, this.mTexture.untrimmedRect.height);
  }

  /**
   * texture - Returns the current Texture on this sprite.
   *
   * @return {Texture|null} The current texture set on this Sprite or null.
   */
  get texture() {
    return this.mTexture;
  }

  /**
   * texture - Sets the Texture on this sprite by name.
   * Only AssetManager.default is used.
   *
   * @param {Texture|null} texture Texture to apply on.
   *
   * @return {void}
   */
  set texture(texture) {
    if (this.mTexture !== texture)
      this.mTexture = texture;
  }

  get textureName() {
    return this.mTextureName;
  }

  /**
   * @editor {TextureEditor}
   */
  set textureName(value) {
    if (this.mTextureName === value)
      return;

    this.mTextureName = value;
    this.texture = AssetManager.default.getTexture(value);
  }

  set touchable(value) {
    let c = this.getComponent(InputComponent);

    if (value === true) {
      if (c === null)
        this.addComponent(new InputComponent());
      else
        c.touchable = true;
    } else {
      if (c !== null)
        this.removeComponent(c);
    }
  }

  get touchable() {
    let c = this.getComponent(InputComponent);
    return c !== null && c.touchable === true;
  }
}

/**
 * This class is used to create display text.
 *
 * @cat display.text
 * @extends DisplayObject
 */

class TextField extends DisplayObject {
  /**
   * @param  {string=} text Text to be displayed inside this text field
   * @param  {number=} size text size
   * @param  {string=} name font name
   * @param {TextInfo=} style TextInfo object
   */
  constructor(text = '', size = 14, name = 'sans-serif', style = undefined) {
    super();

    /**
     * @private
     * @type {string}
     */
    this.mText = text;

    /**
     * @private
     * @type {boolean}
     */
    this.mNeedInvalidate = true;

    /**
     * @private
     * @type {Rectangle}
     */
    this.mCacheBounds = new Rectangle();

    /**
     * @private
     * @type {number}
     */
    this.mTextWidth = 0;

    /**
     * @private
     * @type {number}
     */
    this.mTextHeight = 0;

    /**
     * @private
     * @type {TextInfo}
     */
    this.mStyle = style || new TextInfo();

    /**
     * @private
     * @type {string}
     */
    this.mStyle.name = name || style.name;

    /**
     * @private
     * @type {number}
     */
    this.mStyle.size = size || style.size;

    /**
     * @private
     * @type {boolean}
     */
    this.mAutoSize = true;

    /**
     * @private
     * @type {boolean}
     */
    this.mMultiLine = true;

    /**
     * @private
     * @type {number}
     */
    this.mLineHeight = 1.2;

    /**
     * @public
     * @type {string[]|string}
     */
    this.lines = [];

    /**
     * Useful for drivers
     * @public
     * @type {number[]}
     */
    this.lineWidths = [];

    /**
     * @private
     * @type {number}
     */
    this.mLetterSpacing = 0;

    /**
     * @private
     * @type {number}
     */
    this.mFieldWidth = 0;

    /**
     * @private
     * @type {number}
     */
    this.mFieldHeight = this.mStyle.size * this.mLineHeight;

    this.onGetLocalBounds(this.mCacheBounds);
  }

  /**
   * @ignore
   * @override
   * @protected
   * @param {VideoNullDriver} video
   * @param {number} time
   * @param {number} parentAlpha
   *
   * @return {void}
   */
  __render(video, time, parentAlpha) {
    if (this.mAlpha <= 0 || this.mVisible === false)
      return;

    let worldAlpha = parentAlpha * this.mAlpha;

    if (this.mNeedInvalidate) {
      this.onGetLocalBounds(this.mCacheBounds);
      // this.setTransformDirty();  // no anchor for rebound
    }

    video.setTransform(this.worldTransformation);
    video.globalAlpha = worldAlpha;
    video.globalBlendMode = this.blendMode;
    video.drawText(this, this.mStyle, this.mCacheBounds);

    this.mNeedInvalidate = false;
    super.__render(video, time, worldAlpha);
  }

  /**
   * @protected
   * @override
   * @ignore
   * @param {Rectangle=} outRect
   *
   * @return {Rectangle}
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (this.mNeedInvalidate) {
      Black.instance.video.measureText(this, this.mStyle, this.mCacheBounds);
    }

    return outRect.copyFrom(this.mCacheBounds);
  }

  /**
   * @param {number} value
   * @ignore
   *
   * @return {void}
   */
  set letterSpacing(value) {
    if (this.mLetterSpacing === value) return;

    this.mLetterSpacing = value;
    // this.setTransformDirty();  // needs pivot update and there is no anchor to accomplish
    this.mNeedInvalidate = true;
  }

  /**
   * Get/Set letterSpacing value. Default is 0 in pixels.
   *
   * @return {number}
   */
  get letterSpacing() {
    return this.mLetterSpacing;
  }

  /**
   * @param {boolean} value
   * @ignore
   *
   * @return {void}
   */
  set multiLine(value) {
    this.mMultiLine = value;
    this.mNeedInvalidate = true;
  }

  /**
   * Get/Set multiLine value switcher.
   *
   * @return {boolean}
   */
  get multiLine() {
    return this.mMultiLine;
  }

  /**
   * @param {number} value
   * @ignore
   *
   * @return {void}
   */
  set lineHeight(value) {
    this.mLineHeight = value;
    this.mNeedInvalidate = true;
  }

  /**
   * Get/Set lines vertical offset. From top previous to top next line.
   *
   * @return {number}
   */
  get lineHeight() {
    return this.mLineHeight;
  }

  /**
   * Get/Set text size.
   *
   * @return {number}
   */
  get size() {
    return this.mStyle.size;
  }

  /**
   * @param {number} value
   * @ignore
   *
   * @return {void}
   */
  set size(value) {
    this.mStyle.size = value;
    this.mNeedInvalidate = true;
  }

  /**
   * Get/Set text font.
   *
   * @return {string}
   */
  get font() {
    return this.mStyle.name;
  }

  /**
   * @param {string} value
   * @ignore
   *
   * @return {void}
   */
  set font(value) {
    this.mStyle.name = value;
    this.mNeedInvalidate = true;
  }

  /**
   * Specifies text color as hexadecimal number eg 0xff0000 (total red)
   *
   * @return {number}
   */
  get color() {
    return this.mStyle.color;
  }

  /**
   * @param {number} value
   * @ignore
   *
   * @return {void}
   */
  set color(value) {
    this.mStyle.color = value;
  }

  /**
   * Get/Set text style.
   *
   * @return {TextInfo.FontStyle}
   */
  get style() {
    return this.mStyle.style;
  }

  /**
   *
   * @param {TextInfo.FontStyle} value
   * @ignore
   *
   * @return {void}
   */
  set style(value) {
    this.mStyle.style = value;
    this.mNeedInvalidate = true;
  }

  /**
   * Specifies the font thick. The value is set from 100 to 900 in increments of 100.
   *
   * @return {TextInfo.FontWeight}
   */
  get weight() {
    return this.mStyle.weight;
  }

  /**
   * @param {TextInfo.FontWeight} value
   * @ignore
   *
   * @return {void}
   */
  set weight(value) {
    this.mStyle.weight = value;
    this.mNeedInvalidate = true;
  }

  /**
   * Specifies the horizontal alignment left | center | right
   *
   * @return {TextInfo.FontAlign}
   */
  get align() {
    return this.mStyle.align;
  }

  /**
   * @param {TextInfo.FontAlign} value
   * @ignore
   *
   * @return {void}
   */
  set align(value) {
    this.mStyle.align = value;
  }

  /**
   * Specifies stroke color as hexadecimal number eg 0xff0000 (total red)
   * @return {number}
   */
  get strokeColor() {
    return this.mStyle.strokeColor;
  }

  /**
   * @param {number} value
   * @ignore
   *
   * @return {void}
   */
  set strokeColor(value) {
    this.mStyle.strokeColor = value;
  }

  /**
   * Specifies the thickness of the stroke. 0 means that no stroke
   * @return {number}
   */
  get strokeThickness() {
    return this.mStyle.strokeThickness;
  }

  /**
   * @param {number} value
   * @ignore
   *
   * @return {void}
   */
  set strokeThickness(value) {
    if (value === this.mStyle.strokeThickness)
      return;

    this.mStyle.strokeThickness = value;
    this.mNeedInvalidate = true;
  }

  /**
   * Specifies the width of the text field. If autoSize set as false
   *
   * @return {number}
   */
  get fieldWidth() {
    return this.mFieldWidth;
  }

  /**
   * @param {number} value
   * @ignore
   *
   * @return {void}
   */
  set fieldWidth(value) {
    if (value === this.mFieldWidth)
      return;

    this.mFieldWidth = value;
    this.mNeedInvalidate = true;
  }

  /** Specifies the height of the text field, if autoSize set as false
   *
   * @return {number}
   */
  get fieldHeight() {
    return this.mFieldHeight;
  }


  /**
   * @param {number} value
   * @ignore
   *
   * @return {void}
   */
  set fieldHeight(value) {
    if (value === this.mFieldHeight) return;
    this.mFieldHeight = value;
    this.mNeedInvalidate = true;
  }

  /**Text to be displayed inside this text field.

   * @return {string}
   */
  get text() {
    return this.mText;
  }

  /**
   * @param {string} value
   * @ignore
   *
   * @return {void}
   */
  set text(value) {
    if (this.mText === value)
      return;

    this.mText = value;
    this.mNeedInvalidate = true;
  }

  /**
   * Determines whether the size of the field will adjust to the size of the text. Note: if this set as true, you need to specify fieldHeight and fieldWidth manually
   *
   * @return {boolean}
   */
  get autoSize() {
    return this.mAutoSize;
  }

  /**
   * @param {boolean} value
   * @ignore
   *
   * @return {void}
   */
  set autoSize(value) {
    if (this.mAutoSize === value)
      return;

    this.mAutoSize = value;
    this.mNeedInvalidate = true;
  }

  // alignPivot(ax, ay, includeChildren = false) {
  //   this.mNeedInvalidate = true;
  //   super.alignPivot(ax, ay, includeChildren);
  // }
}

/**
 * Contains system functions.
 * @static
 * @cat system
 */

class Device {
  /**
   * Static class.
   */
  constructor() {
    /**
     * @private
     * @type {Device}
     */
    this.constructor.mInstance = this;

    /**
     * @private
     * @type {number}
     */
    this.mPixelRatio = 0;

    /**
     * @private
     * @type {number}
     */
    Device.mInstance.mPixelRatio = Device.getDevicePixelRatio();
  }

  /**
   * Returns current OS name.
   * @return {string}
   */
  static get os() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent))
      return 'Windows Phone';

    if (/android/i.test(userAgent))
      return 'Android';

    if (/iPad|iPhone|iPod/.test(userAgent)/* && !window.MSStream*/)
      return 'iOS';

    return 'unknown';
  }

  /**
   * Returns True if touch screen is present.
   *
   * @return {boolean}
   */
  static get isTouch() {
    let hasEvent = 'ontouchstart' in window;
    if (hasEvent)
      return true;

    if (navigator.maxTouchPoints > 0)
      return true;

    return false;
  }

  /**
   * Returns True if engine is running on mobile device.
   *
   * @return {boolean}
   */
  static get isMobile() {
    return /Mobi/.test(navigator.userAgent);
  }

  /**
   * Returns screen pixel ratio.
   *
   * @return {number}
   */
  static get pixelRatio() {
    return Device.mInstance.mPixelRatio;
  }

  /**
   * @private
   *
   * @suppress {missingProperties}
   *
   * @return {number} Description
   */
  static getDevicePixelRatio() {
    if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI)
      return window.screen.systemXDPI / window.screen.logicalXDPI;
    else if (window.devicePixelRatio !== undefined)
      return window.devicePixelRatio;

    return 1;
  }

}

/**
 * @private
 * @type {Device}
 * @nocollapse
 */
Device.mInstance = null;

/**
 * Base class for distribution objects.
 *
 * @cat scatters
 */

class Scatter {
  /**
   * Creates new Scatter instance.
   */
  constructor() {}

  /**
   * Returns random value.
   * @return {*} Any object.
   */
  getValue() {}

  /**
   * Returns value at given position.
   *
   * @param {number} t Position to get value at.
   *
   * @return {*} Any object.
   */
  getValueAt(t) {}
}

/**
 * A number scatter for defining a range in 1D space.
 *
 * @cat scatters
 * @extends Scatter
 */

class FloatScatter extends Scatter {
  /**
   * Creates new FloatScatter instance.
   *
   * @param {number}      min             The min value along x-axis.
   * @param {number}      [max=undefined] The max value along x-axis.
   * @param {function(number):number} [ease=null]     Easing function.
   */
  constructor(min, max = undefined, ease = null) {
    super();

    // NOTE: dont make us @private @member

    /** @type {number} */
    this.min = min;

    /** @type {number} */
    this.max = max == null ? min : max;

    /** @type {function(number):number} */
    this.ease = ease;
  }

  /**
   * Returns random number withing defined range.
   *
   * @override
   *
   * @return {number} Random number.
   */
  getValue() {
    return Math.random() * (this.max - this.min) + this.min;
  }

  /**
   * Returns value at given position within defined range.
   *
   * @override
   * @param {number} t The position.
   *
   * @return {number} Number at given position.
   */
  getValueAt(t) {
    if (this.ease !== null)
      t = this.ease(t);

    return this.min + t * (this.max - this.min);
  }
}

/**
 * A number scatter for defining a range in 2D space.
 *
 * @cat scatters
 * @extends Scatter
 */

class VectorScatter extends Scatter {
  /**
   * Creates new VectorScatter instance.
   *
   * @param {number} minX The min value along x-axis.
   * @param {number} minY The min value along y-axis.
   * @param {number} maxX The max value along x-axis.
   * @param {number} maxY The max value along y-axis.
   */
  constructor(minX, minY, maxX, maxY) {
    super();

    // NOTE: dont make us @private @member
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }

  /**
   * Returns a random Vector object at given position within a range specified
   * in the constructor.
   * @override
   *
   * @return {Vector} Vector object with random values withing defined range.
   */
  getValue() {
    let outVector = new Vector();
    outVector.x = Math.random() * (this.maxX - this.minX) + this.minX;
    outVector.y = Math.random() * (this.maxY - this.minY) + this.minY;
    return outVector;
  }

  /**
   * Returns a Vector object at given position.
   * @override
   *
   * @param {number} t The position.
   *
   * @return {Vector} Vector object representing values in a range at
   * given position.
   */
  getValueAt(t) {
    let outVector = new Vector();
    outVector.x = this.minX + t * (this.maxX - this.minX);
    outVector.y = this.minY + t * (this.maxY - this.minY);
    return outVector;
  }
}

/**
 * A number scatter for defining a range in 2D space on a curve.
 *
 * @cat scatters
 * @extends Scatter
 */

class FloatCurveScatter extends Scatter {
  /**
   * Creates new FloatCurveScatter instance.
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  constructor(...points) {
    super();

    /**
     * @private
     * @type {Curve}
     */
    this.mCurve = new Curve();
    this.mCurve.baked = true;
    this.mCurve.set(...points);

    /**
     * @private
     * @type {Vector}
     */
    this.mCache = new Vector();
  }

  /**
   * Returns a value on a curve at random position.
   * @override
   *
   * @return {number} A random number value on a defined curve.
   */
  getValue() {
    let t = Math.random();
    this.mCurve.interpolate(t, this.mCache);
    return this.mCache.y;
  }

  /**
   * Returns a number at given position on a curve.
   * @override
   *
   * @param {number} t The position.
   *
   * @return {number} A value on a curve at given position.
   */
  getValueAt(t) {
    this.mCurve.interpolate(t, this.mCache);
    return this.mCache.y;
  }
}

/**
 * A base class for particle system actions. Every frame each action executed over each particle.
 *
 * @cat particles.actions
 * @abstract
 * @class
 */

class Action {
  /**
   * Creates new Action instance.
   */
  constructor(){
  }

  /**
   * Called for every particle before any update method called.
   *
   * @protected
   * @param {number} dt Amount of seconds since the last update.
   *
   * @return {void} Description
   */
  preUpdate(dt) {}


  /**
   * Called for every particle.
   *
   * @param {Emitter} emmiter   The owner of the particle.
   * @param {Particle} particle The particle to execute update on.
   * @param {number} dt         Amount of seconds since the last update.
   *
   * @return {void}
   */
  update(emmiter, particle, dt) {}


  /**
   * Called after all updates have been executed.
   *
   * @param {number} dt Amount of seconds since the last update.
   *
   * @return {void}
   */
  postUpdate(dt) {}
}

/**
 * Adds acceleration to particles along given direction.
 *
 * @cat particles.actions
 * @extends Action
 * @class
 */

class Acceleration extends Action {
  /**
   * Creates new Acceleration instance.
   *
   * @param {VectorScatter} vectorScatter An VectorScatter which defines acceleration direction.
   */
  constructor(vectorScatter) {
    super();

    /**
     * @private
     * @type {VectorScatter}
     */
    this.mScatter = vectorScatter;
  }

  /**
   * @inheritDoc
   *
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   *
   * @return {void}
   */
  update(emmiter, particle, dt) {
    let v = this.mScatter.getValue();

    particle.ax += v.x;
    particle.ay += v.y;
  }


  /**
   * Returns VectorScatter object that defines acceleration direction.
   * @member {VectorScatter}
   * @return {VectorScatter}
   */
  get scatter() {
    return this.mScatter;
  }
}

/**
 * Sets particle's alpha value according to its energy value.
 *
 * @cat particles.actions
 * @extends Action
 * @class
 */

class AlphaOverLife extends Action {
  /**
   * Creates new AlphaOverLife instance.
   *
   * @param {FloatScatter} floatScatter A starting and ending values of alpha property.
   */
  constructor(floatScatter) {
    super();

    /**
     * @private
     * @type {FloatScatter}
     */
    this.mScatter = floatScatter;
  }

  /**
   * @inheritDoc
   *
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   *
   * @return {void}
   */
  update(emmiter, particle, dt) {
    particle.alpha = this.mScatter.getValueAt(particle.energy);
  }

  /**
   * Returns FloatScatter object that defines alpha value over particle life.
   * @member {FloatScatter}
   * @return {FloatScatter}
   */
  get scatter() {
    return this.mScatter;
  }
}

/**
 * Sets particle's scale value according to its energy value.
 *
 * @cat particles.actions
 * @extends Action
 * @class
 */

class ScaleOverLife extends Action {
  constructor(floatScatter) {
    super();

    /**
     * @private
     * @type {FloatScatter}
     */
    this.mScatter = floatScatter;
  }

  /**
   * @inheritDoc
   * 
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   *
   * @return {void}
   */
  update(emmiter, particle, dt) {
    particle.scale = this.mScatter.getValueAt(particle.energy);
  }

  /**
   * Returns FloatScatter object that defines scale value over particle life.
   * @member {FloatScatter}
   * @return {FloatScatter}
   */
  get scatter() {
    return this.mScatter;
  }
}

/**
 * Sets particle's rotation value according to its energy value.
 *
 * @cat particles.actions
 * @extends Action
 * @class
 */

class RotationOverLife extends Action {
  constructor(floatScatter) {
    super();

    /**
     * @private
     * @type {FloatScatter}
     */
    this.mScatter = floatScatter;
  }

  /**
   * @inheritDoc
   *
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   *
   * @return {void}
   */
  update(emmiter, particle, dt) {
    particle.r = this.mScatter.getValueAt(particle.energy);
  }

  /**
   * Returns FloatScatter object that defines rotation value over particle life.
   * @member {FloatScatter}
   * @return {FloatScatter}
   */
  get scatter() {
    return this.mScatter;
  }
}

/**
 * Sets particle's texture according to its energy value.
 *
 * @cat particles.actions
 * @extends Action
 * @class
 */

class TextureOverLife extends Action {
  constructor(floatScatter) {
    super();

    /**
     * @private
     * @type {FloatScatter}
     */
    this.mScatter = floatScatter;
  }

  /**
   * @inheritDoc
   *
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   *
   * @return {void}
   */
  update(emmiter, particle, dt) {
    particle.textureIndex = ~~this.mScatter.getValueAt(particle.energy);
  }

  /**
   * Returns FloatScatter object that defines texture value over particle life.
   * @member {FloatScatter}
   * @return {FloatScatter}
   */
  get scatter() {
    return this.mScatter;
  }
}

/**
 * Base class for particle's initializators. Each initializer updates particle data once at start, eg when particle added to scene.
 *
 * @cat particles.initializers
 */

class Initializer {
  /**
   * Creates new Initializer instance.
   */
  constructor() {
  }

  /**
   * This method is called on every new particle and sets its starting values.
   * Override this method when creating custom initializers.
   *
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {}
}

/**
 * Sets starting particle's life.
 *
 * @cat particles.initializers
 * @extends Initializer
 */

class Life extends Initializer {
  /**
   * Creates new LIfe instance.
   *
   * @param {FloatScatter} floatScatter The min/max range.
   */
  constructor(floatScatter) {
    super();

    /**
     * The min-max range.
     * @type {FloatScatter}
     */
    this.scatter = floatScatter;
  }

  /**
   * @inheritDoc
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.life = this.scatter.getValue();
  }
}

/**
 * Sets starting particle's mass.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */

class Mass extends Initializer {
  /**
   * Creates new Mass instance.
   *
   * @param {number} mass The mass.
   */
  constructor(mass) {
    super();

    /**
     * The mass value.
     * @type {number}
     */
    this.mass = mass;
  }

  /**
   * @inheritDoc
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.mass = this.mass;
  }
}

/**
 * Sets particle's starting scale.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */

class Scale extends Initializer {
  /**
   * Creates new Scale instance.
   *
   * @param {FloatScatter} floatScatter The min-max range for starting scale.
   */
  constructor(floatScatter) {
    super();

    /**
     * The min-max range for starting scale.
     * @type {FloatScatter}
     */
    this.scatter = floatScatter;
  }

  /**
   * @inheritDoc
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.scale = this.scatter.getValue();
  }
}

/**
 * Sets particle's starting velocity.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */

class Velocity extends Initializer {
  /**
   * Creates new Velocity instance.
   *
   * @param {VectorScatter} vectorScatter The min-max range for starting velocity.
   */
  constructor(vectorScatter) {
    super();

    /**
     * The min-max range for starting velocity.
     * @type {VectorScatter}
     */
    this.scatter = vectorScatter;
  }

  /**
   * @inheritDoc
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    // TODO: optimize!
    let v = this.scatter.getValue();
    particle.vx = v.x;
    particle.vy = v.y;
  }
}

/**
 * Sets starting particle's position.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */

class Position extends Initializer {
  /**
   * Creates new Position instance.
   *
   * @param {VectorScatter} vectorScatter The min/max range.
   */
  constructor(vectorScatter) {
    super();

    /**
     * The min-max range for position distribution.
     * @type {VectorScatter}
     */
    this.scatter = vectorScatter;
  }

  /**
   * @inheritDoc
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    // TODO: optimize!
    let v = this.scatter.getValue();
    particle.x = v.x;
    particle.y = v.y;
  }
}

/**
 * Sets particle's default rotation.
 *
 * @cat particles.initializers
 * @extends Initializer
 */

class Rotation extends Initializer {
  /**
   * Creates new Rotation instance.
   *
   * @param {FloatScatter} floatScatter The min-max range for starting rotation.
   */
  constructor(floatScatter) {
    super();

    /**
     * The min-max range for starting rotation
     * @type {FloatScatter}
     */
    this.scatter = floatScatter;
  }

  /**
   * @inheritDoc
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.r = this.scatter.getValue();
  }
}

/**
 * Sets particle's texture.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */

class RandomTexture extends Initializer {
  /**
   * Creates new RandomTexture instance.
   *
   * @param {FloatScatter} floatScatter
   */
  constructor(floatScatter) {
    super();

    /**
     * The float scatter defines the index of the texture. All values will be
     * rounded.
     *
     * @see {Particle.textureIndex}
     * @type {FloatScatter}
     */
    this.scatter = floatScatter;
  }

  /**
   * @inheritDoc
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.textureIndex = ~~this.scatter.getValue();
  }
}

/**
 * @enum {number}
 */
var EmitterState = {
  PENDING: 0,
  EMITTING: 1,
  FINISHED: 2
};

/**
 * The particle!
 *
 * @cat particles
 * @class
 */

class Particle {
  constructor() {
    this.reset();
  }

  /**
   * Resets particle to default state.
   *
   * @returns {void}
   */
  reset() {
    /**
     * The index of a texture.
     * @type {number}
     */
    this.textureIndex = 0;

    /**
     * The x/y scale of this particle.
     * @type {number}
     */
    this.scale = 1;

    /**
     * Alpha value.
     * @type {number}
     */
    this.alpha = 1;

    /**
     * The life of this particle.
     * @type {number}
     */
    this.life = 1;

    /**
     * The age of this particle.
     * @type {number}
     */
    this.age = 0;

    /**
     * Relation of life to age.
     * @type {number}
     */
    this.energy = this.age / this.life;

    /**
     * The mass.
     * @type {number}
     */
    this.mass = 0;

    /**
     * X-component.
     * @type {number}
     */
    this.x = 0;

    /**
     * Y-component.
     * @type {number}
     */
    this.y = 0;

    /**
     * Rotation of this particle.
     * @type {number}
     */
    this.r = 0

    /**
     * Velocity by x.
     * @type {number}
     */
    this.vx = 0;

    /**
     * Velocity by y.
     * @type {number}
     */
    this.vy = 0;

    /**
     * Particle x-acceleration.
     * @type {number}
     */
    this.ax = 0;

    /**
     * Particle y-acceleration.
     * @type {number}
     */
    this.ay = 0;
  }

  /**
   * Internal update method.
   *
   * @param {number} dt Time since last update.
   *
   * @return {void}
   */
  update(dt) {
    if (this.life <= 0) {
      this.life = 0;
      return;
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if (this.mass > 0) {
      this.ax *= 1 / this.mass;
      this.ay *= 1 / this.mass;
    }

    this.vx += this.ax * dt;
    this.vy += this.ay * dt;

    this.ax = 0;
    this.ay = 0;

    this.life -= dt;
    this.age += dt;

    this.energy = this.age / (this.age + this.life);
  }
}

/**
 * Particle emitter.
 *
 * @cat particles
 * @extends DisplayObject
 * @class
 */

class Emitter extends DisplayObject {
  /**
   * Creates new Emitter instance.
   */
  constructor() {
    super();

    /**
     * @private
     * @type {Array<Texture>}
     */
    this.mTextures = null;

    /**
     * @private
     * @type {Array<Particle>}
     */
    this.mParticles = [];

    /**
     * @private
     * @type {Array<Particle>}
     */
    this.mRecycled = [];

    /**
     * @private
     * @type {Array<Initializer>}
     */
    this.mInitializers = [];

    /**
     * @private
     * @type {Array<Action>}
     */
    this.mActions = [];

    /**
     * @private
     * @type {GameObject}
     */
    this.mSpace = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsLocal = true;

    /**
     * @private
     * @type {number}
     */
    this.mMaxParticles = 10000;

    /**
     * @private
     * @type {FloatScatter}
     */
    this.mEmitCount = new FloatScatter(10);

    /**
     * @private
     * @type {FloatScatter}
     */
    this.mEmitNumRepeats = new FloatScatter(Infinity);

    /**
     * @private
     * @type {number}
     */
    this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();

    /**
     * @private
     * @type {FloatScatter}
     */
    this.mEmitDuration = new FloatScatter(1);

    /**
     * @private
     * @type {number}
     */
    this.mEmitDurationLeft = this.mEmitDuration.getValue();

    /**
     * @private
     * @type {FloatScatter}
     */
    this.mEmitInterval = new FloatScatter(0.1);

    /**
     * @private
     * @type {number}
     */
    this.mEmitIntervalLeft = this.mEmitInterval.getValue();

    /**
     * @private
     * @type {FloatScatter}
     */
    this.mEmitDelay = new FloatScatter(1);

    /**
     * @private
     * @type {number}
     */
    this.mEmitDelayLeft = this.mEmitDelay.getValue();

    /**
     * @private
     * @type {number}
     */
    this.mNextUpdateAt = 0;

    /**
     * @private
     * @type {EmitterState}
     */
    this.mState = EmitterState.PENDING;

    /**
     * @private
     * @type {Matrix}
     */
    this.__tmpLocal = new Matrix();

    /**
     * @private
     * @type {Matrix}
     */
    this.__tmpWorld = new Matrix();

    /**
     * @private
     * @type {EmitterSortOrder}
     */
    this.__sortOrder = EmitterSortOrder.FRONT_TO_BACK;

    this.mRenderer = Black.instance.video.getRenderer(this);
    // /** @type {function(a:Particle, b:Particle):number} */
    // this.mComparer = null;
  }

  resetState() {
    this.mState = EmitterState.PENDING;
  }

  /**
   * updateNextTick - Updates delay, duration, interval. Use this function each time you change one of those values.
   *
   * @param {number} [dt=0]
   *
   * @return {void}
   */
  updateNextTick(dt = 0) {
    let t = Black.instance.uptime;
    let firstEmit = false;

    if (this.mState === EmitterState.PENDING) {
      this.mNextUpdateAt = t + this.mEmitDelayLeft;
      this.mEmitDelayLeft -= dt;

      if (this.mEmitDelayLeft <= 0) {
        this.mEmitDelayLeft = this.mEmitDelay.getValue();
        this.mState = EmitterState.EMITTING;
        firstEmit = true;
      }
    }

    if (this.mState === EmitterState.EMITTING) {
      if (this.mEmitDurationLeft <= 0) {
        this.mEmitDurationLeft = this.mEmitDuration.getValue();

        this.mEmitNumRepeatsLeft--;

        if (this.mEmitNumRepeatsLeft <= 0) {
          this.mState = EmitterState.FINISHED;

          this.post('complete');
          return;
        } else {
          this.mState = EmitterState.PENDING;
          return;
        }
      } else {
        // we are getting value here each update to make sure we are up to date!
        if (firstEmit) {
          // for a first emit we do not want to add an extra delay. emit now!
          this.mNextUpdateAt = t
          this.mEmitIntervalLeft = this.mEmitInterval.getValue();
        }
        else {
          this.mEmitIntervalLeft -= dt;
          this.mNextUpdateAt = t + this.mEmitIntervalLeft;
          //console.log(this.mEmitIntervalLeft);

          // reset interval
          if (this.mEmitIntervalLeft <= 0)
            this.mEmitIntervalLeft = this.mEmitInterval.getValue();
        }
      }

      this.mEmitDurationLeft -= dt;
    }
  }


  /**
   * addInitializer - Adds Initializer to the end of the list.
   *
   * @param {Initializer} initializer
   *
   * @return {Initializer}
   */
  addInitializer(initializer) {
    this.mInitializers.push(initializer);
    return initializer;
  }


  /**
   * addAction - Adds action to the end of the list.
   *
   * @param {Action} action
   *
   * @return {Action}
   */
  addAction(action) {
    this.mActions.push(action);
    return action;
  }

  onRender(driver, parentRenderer) {
    let renderer = this.mRenderer;

    //if (this.mDirty & DirtyFlag.RENDER) {
      renderer.transform = this.worldTransformation;
      renderer.alpha = this.mAlpha * parentRenderer.alpha;
      renderer.blendMode = this.blendMode;
      renderer.visible = this.mVisible;
      renderer.particles = this.mParticles;
      renderer.textures = this.mTextures;
      renderer.dirty = true;
      renderer.space = this.mSpace;
      renderer.isLocal = this.mIsLocal;
    //}

    return driver.registerRenderer(renderer);
  }

  __render(video, time, parentAlpha) {
    // set blend mode
    video.globalBlendMode = this.blendMode;
    let emitterWorldAlpha = parentAlpha * this.alpha;

    // tmp matrices
    let localTransform = this.__tmpLocal;
    let worldTransform = this.__tmpWorld;
    localTransform.identity();

    let texture = null;

    if (this.mTextures.length > 0) {
      let plength = this.mParticles.length;

      if (this.__sortOrder == EmitterSortOrder.FRONT_TO_BACK) {
        for (let i = 0; i < plength; i++)
          this.__renderParticle(this.mParticles[i], video, parentAlpha, localTransform, worldTransform);
      }
      else {
        for (let i = plength - 1; i > 0; i--)
          this.__renderParticle(this.mParticles[i], video, parentAlpha, localTransform, worldTransform);
      }

    }

    super.__render(video, time, parentAlpha);
  }

  __renderParticle(particle, video, parentAlpha, localTransform, worldTransform) {
    let texture = this.mTextures[particle.textureIndex];

    let tw = texture.width * 0.5;
    let th = texture.height * 0.5;

    if (particle.r === 0) {
      let tx = particle.x - tw * particle.scale;
      let ty = particle.y - th * particle.scale;
      localTransform.set(particle.scale, 0, 0, particle.scale, tx, ty);
    } else {
      let cos = Math.cos(particle.r);
      let sin = Math.sin(particle.r);
      let a = particle.scale * cos;
      let b = particle.scale * sin;
      let c = particle.scale * -sin;
      let d = particle.scale * cos;

      let tx = particle.x - tw * a - th * c;
      let ty = particle.y - tw * b - th * d;
      localTransform.set(a, b, c, d, tx, ty);
    }

    if (this.mIsLocal === true) {
      worldTransform.identity();
      worldTransform.copyFrom(localTransform);
      worldTransform.prepend(this.worldTransformation);
    } else {
      this.mSpace.worldTransformation.copyTo(worldTransform);
      worldTransform.append(localTransform);
    }

    particle.worldAlpha = parentAlpha * particle.alpha;

    video.setTransform(worldTransform);
    video.globalAlpha = particle.worldAlpha;

    video.drawImage(particle, texture);
  }

  onUpdate(dt) {
    // rate logic
    this.updateNextTick(dt);

    if (Black.instance.uptime >= this.mNextUpdateAt && this.mState === EmitterState.EMITTING)
      this.__create(this.mEmitCount.getValue());

    // main update login
    let alength = this.mActions.length;
    let plength = this.mParticles.length;

    for (let i = 0; i < alength; i++)
      this.mActions[i].preUpdate(dt);

    let particle;

    let i = this.mParticles.length;
    while (i--) {
      particle = this.mParticles[i];

      for (let k = 0; k < alength; k++)
        this.mActions[k].update(this, particle, dt);

      particle.update(dt);

      if (particle.life === 0) {
        this.mRecycled.push(particle);
        this.mParticles.splice(i, 1);
      }
    }

    for (let j = 0; j < alength; j++)
      this.mActions[j].postUpdate(dt);
  }

  __create(amount) {
    let matrix = this.worldTransformation.clone();
    let minv = null;

    if (this.mIsLocal === false) {
      minv = this.mSpace.worldTransformationInversed.clone();
      matrix.prepend(minv);
    }

    for (let i = 0; i < amount; i++) {
      let p = null;

      if (this.mRecycled.length > 0) {
        p = this.mRecycled.pop();
      } else {
        if (this.mParticles.length >= this.mMaxParticles)
          return;

        p = new Particle();
      }

      p.reset();

      for (let k = 0; k < this.mInitializers.length; k++) {
        let initer = this.mInitializers[k];
        initer.initialize(p);
      }

      if (this.mIsLocal === false) {
        matrix.transformDirectionXY(p.ax, p.ay, Vector.__cache);
        p.ax = Vector.__cache.x;
        p.ay = Vector.__cache.y;

        matrix.transformDirectionXY(p.vx, p.vy, Vector.__cache);
        p.vx = Vector.__cache.x;
        p.vy = Vector.__cache.y;

        matrix.transformXY(p.x, p.y, Vector.__cache);
        p.x = Vector.__cache.x;
        p.y = Vector.__cache.y;
      }

      this.mParticles.push(p);
    }
  }


  /**
   * maxParticles
   *
   * @return {number}
   */
  get maxParticles() {
    return this.mMaxParticles;
  }


  /**
   * maxParticles
   *
   * @param {number} value
   *
   * @return {void}
   */
  set maxParticles(value) {
    if (value < 0)
      throw new Error('Bad argument error.');

    this.mMaxParticles = value;
  }


  /**
   * emitCount
   *
   * @return {FloatScatter}
   */
  get emitCount() {
    return this.mEmitCount;
  }


  /**
   * emitCount
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitCount(value) {
    this.mEmitCount = value;
  }


  /**
   * emitNumRepeats
   *
   * @return {FloatScatter}
   */
  get emitNumRepeats() {
    return this.mEmitNumRepeats;
  }

  /**
   * emitNumRepeats
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitNumRepeats(value) {
    this.mEmitNumRepeats = value;
    this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();
  }


  /**
   * emitDuration
   *
   * @return {FloatScatter}
   */
  get emitDuration() {
    return this.mEmitDuration;
  }

  /**
   * emitDuration
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitDuration(value) {
    this.mEmitDuration = value;
    this.mEmitDurationLeft = this.mEmitDuration.getValue();
  }


  /**
   * emitInterval
   *
   * @return {FloatScatter}
   */
  get emitInterval() {
    return this.mEmitInterval;
  }

  /**
   * emitInterval
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitInterval(value) {
    this.mEmitInterval = value;
    this.mEmitIntervalLeft = this.mEmitInterval.getValue();
  }


  /**
   * emitDelay
   *
   * @return {FloatScatter}
   */
  get emitDelay() {
    return this.mEmitDelay;
  }

  /**
   * emitDelay
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitDelay(value) {
    this.mEmitDelay = value;
    this.mEmitDelayLeft = this.mEmitDelay.getValue();
  }


  /**
   * space
   *
   * @return {GameObject}
   */
  get space() {
    return this.mSpace;
  }

  /**
   * space
   *
   * @param {GameObject} gameObject
   *
   * @return {void}
   */
  set space(gameObject) {
    this.mSpace = gameObject;
    this.mIsLocal = this.mSpace === null || this.mSpace === this;
  }


  /**
   * textures
   *
   * @return {Array<Texture>}
   */
  get textures() {
    return this.mTextures;
  }


  /**
   * textures
   *
   * @param {Array<Texture>} value
   *
   * @return {void}
   */
  set textures(value) {
    if (value.length === 0)
      throw new Error('At least one texture must be provided.');

    this.mTextures = value;
  }

  /**
   * @return {EmitterSortOrder}
   */
  get sortOrder() {
    return this.__sortOrder;
  }

  /**
   *
   * @param {EmitterSortOrder} value The order in which particles will be sorted when rendering.
   *
   * @return {void}
   */
  set sortOrder(value) {
    this.__sortOrder = value;
  }
}

/**
 * A blend mode enum.
 * @cat particles
 * @enum {string}
 */

var EmitterSortOrder = {
  FRONT_TO_BACK: 'frontToBack',
  BACK_TO_FRONT: 'backToFront'
};

// TODO: fix jsdoc to display this enum

/**
 * @readonly
 * @enum {number}
 * @cat input
 */

var Key = {
  /**
   * @type {number}
   */
  A: 65,
  /**
   * @type {number}
   */
  B: 66,
  /**
   * @type {number}
   */
  C: 67,
  /**
   * @type {number}
   */
  D: 68,
  /**
   * @type {number}
   */
  E: 69,
  /**
   * @type {number}
   */
  F: 70,
  /**
   * @type {number}
   */
  G: 71,
  /**
   * @type {number}
   */
  H: 72,
  /**
   * @type {number}
   */
  I: 73,
  /**
   * @type {number}
   */
  J: 74,
  /**
   * @type {number}
   */
  K: 75,
  /**
   * @type {number}
   */
  L: 76,
  /**
   * @type {number}
   */
  M: 77,
  /**
   * @type {number}
   */
  N: 78,
  /**
   * @type {number}
   */
  O: 79,
  /**
   * @type {number}
   */
  P: 80,
  /**
   * @type {number}
   */
  Q: 81,
  /**
   * @type {number}
   */
  R: 82,
  /**
   * @type {number}
   */
  S: 83,
  /**
   * @type {number}
   */
  T: 84,
  /**
   * @type {number}
   */
  U: 85,
  /**
   * @type {number}
   */
  V: 86,
  /**
   * @type {number}
   */
  W: 87,
  /**
   * @type {number}
   */
  X: 88,
  /**
   * @type {number}
   */
  Y: 89,
  /**
   * @type {number}
   */
  Z: 90,
  /**
   * @type {number}
   */
  DIGIT_0: 48,
  /**
   * @type {number}
   */
  DIGIT_1: 49,
  /**
   * @type {number}
   */
  DIGIT_2: 50,
  /**
   * @type {number}
   */
  DIGIT_3: 51,
  /**
   * @type {number}
   */
  DIGIT_4: 52,
  /**
   * @type {number}
   */
  DIGIT_5: 53,
  /**
   * @type {number}
   */
  DIGIT_6: 54,
  /**
   * @type {number}
   */
  DIGIT_7: 55,
  /**
   * @type {number}
   */
  DIGIT_8: 56,
  /**
   * @type {number}
   */
  DIGIT_9: 57,
  /**
   * @type {number}
   */
  NUMPAD_0: 96,
  /**
   * @type {number}
   */
  NUMPAD_1: 97,
  /**
   * @type {number}
   */
  NUMPAD_2: 98,
  /**
   * @type {number}
   */
  NUMPAD_3: 99,
  /**
   * @type {number}
   */
  NUMPAD_4: 100,
  /**
   * @type {number}
   */
  NUMPAD_5: 101,
  /**
   * @type {number}
   */
  NUMPAD_6: 102,
  /**
   * @type {number}
   */
  NUMPAD_7: 103,
  /**
   * @type {number}
   */
  NUMPAD_8: 104,
  /**
   * @type {number}
   */
  NUMPAD_9: 105,
  /**
   * @type {number}
   */
  NUMPAD_MULTIPLY: 106,
  /**
   * @type {number}
   */
  NUMPAD_ADD: 107,
  /**
   * @type {number}
   */
  NUMPAD_SUBTRACT: 109,
  /**
   * @type {number}
   */
  NUMPAD_DECIMAL: 110,
  /**
   * @type {number}
   */
  NUMPAD_DIVIDE: 111,
  /**
   * @type {number}
   */
  LEFT_ARROW: 37,
  /**
   * @type {number}
   */
  UP_ARROW: 38,
  /**
   * @type {number}
   */
  RIGHT_ARROW: 39,
  /**
   * @type {number}
   */
  DOWN_ARROW: 40,
  /**
   * @type {number}
   */
  BACKSPACE: 8,
  /**
   * @type {number}
   */
  TAB: 9,
  /**
   * @type {number}
   */
  ENTER: 13,
  /**
   * @type {number}
   */
  SHIFT: 16,
  /**
   * @type {number}
   */
  CTRL: 17,
  /**
   * @type {number}
   */
  ALT: 18,
  /**
   * @type {number}
   */
  F1: 112,
  /**
   * @type {number}
   */
  F2: 113,
  /**
   * @type {number}
   */
  F3: 114,
  /**
   * @type {number}
   */
  F4: 115,
  /**
   * @type {number}
   */
  F5: 116,
  /**
   * @type {number}
   */
  F6: 117,
  /**
   * @type {number}
   */
  F7: 118,
  /**
   * @type {number}
   */
  F8: 119,
  /**
   * @type {number}
   */
  F9: 120,
  /**
   * @type {number}
   */
  F10: 121,
  /**
   * @type {number}
   */
  F11: 122,
  /**
   * @type {number}
   */
  F12: 123,
  /**
   * @type {number}
   */
  PAUSE_BREAK: 19,
  /**
   * @type {number}
   */
  CAPS_LOCK: 20,
  /**
   * @type {number}
   */
  ESCAPE: 27,
  /**
   * @type {number}
   */
  PAGE_UP: 33,
  /**
   * @type {number}
   */
  PAGE_DOWN: 34,
  /**
   * @type {number}
   */
  END: 35,
  /**
   * @type {number}
   */
  HOME: 36,
  /**
   * @type {number}
   */
  INSERT: 45,
  /**
   * @type {number}
   */
  DELETE: 46,
  /**
   * @type {number}
   */
  LEFT_WINDOW: 91,
  /**
   * @type {number}
   */
  RIGHT_WINDOW: 92,
  /**
   * @type {number}
   */
  CONTEXT_MENU: 93,
  /**
   * @type {number}
   */
  NUM_LOCK: 144,
  /**
   * @type {number}
   */
  SCROLL_LOCK: 145,
  /**
   * @type {number}
   */
  SEMI_COLON: 186,
  /**
   * @type {number}
   */
  EQUAL_SIGN: 187,
  /**
   * @type {number}
   */
  COMMA: 188,
  /**
   * @type {number}
   */
  DASH: 189,
  /**
   * @type {number}
   */
  PERIOD: 190,
  /**
   * @type {number}
   */
  FORWARD_SLASH: 191,
  /**
   * @type {number}
   */
  BACKQUOTE: 192,
  /**
   * @type {number}
   */
  BRAKET_LEFT: 219,
  /**
   * @type {number}
   */
  BACK_SLASH: 220,
  /**
   * @type {number}
   */
  BRAKET_RIGHT: 221,
  /**
   * @type {number}
   */
  SINGLE_QUOTE: 222,
};

/**
 * Holds information about keyboard event.
 *
 * @cat input
 */

class KeyInfo {

  /**
   * constructor - Description
   *
   * @param {Event} nativeEvent Description
   *
   * @return {void} Description
   */
  constructor(nativeEvent) {
    this.keyCode = nativeEvent.keyCode;
    this.code = nativeEvent.code;
    this.char = nativeEvent.key;
    this.shiftKey = nativeEvent.shiftKey;
    this.altKey = nativeEvent.altKey;
    this.ctrlKey = nativeEvent.ctrlKey;
  }
}

/**
 * A input system class is reponsible for mouse, touch and keyboard input events.
 * Pointer events works for a single target only.
 * Global Input messages has higher priority.
 *
 * When GameObject gets a `pointerDown` message it gets target locked. Other
 * objects will not receive `pointerMove` or `pointerUp` messages. Target locked
 * object will receive `pointerUp` message even if pointer is outside of its
 * bounds.
 *
 * @cat input
 * @extends System
 */

class Input extends System {
  /**
   * Private constructor.
   */
  constructor() {
    super();

    /**
     * @private
     * @type {Input}
     */
    this.constructor.instance = this;

    /**
     * @private
     * @type {Vector}
     */
    this.mPointerPosition = new Vector();

    /**
     * @private
     * @type {Element}
     */
    this.mDom = Black.instance.containerElement;

    /**
     * @private
     * @type {Array<string>}
     */
    this.mEventList = null;

    /**
     * @private
     * @type {Array<string>}
     */
    this.mKeyEventList = null;

    this.__initListeners();

    /**
     * @private
     * @type {Array<{e: Event, x: number, y:number}>}
     */
    this.mPointerQueue = [];

    /**
     * @private
     * @type {Array<Event>}
     */
    this.mKeyQueue = [];

    /**
     * @private
     * @type {Array<number>}
     */
    this.mPressedKeys = [];

    /**
     * @private
     * @type {boolean}
     */
    this.mIsPointerDown = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mNeedUpEvent = false;

    /**
     * NOTE: we need guarantee that keys are not going to chage theirs order
     * when iterating.
     * @private
     * @type {Map}
     */
    this.mInputListeners = new Map();

    this.mTarget = null;
    this.mTargetComponent = null;
    this.mLockedTarget = null;

    this.mLastInTargetComponent = null;
  }

  /**
   * @private
   *
   * @returns {void}
   */
  __initListeners() {
    this.mKeyEventList = Input.mKeyEventList;
    //debugger;

    if (window.PointerEvent)
      this.mEventList = Input.mPointerEventList;
    else if (Device.isTouch && Device.isMobile)
      this.mEventList = Input.mTouchEventList;
    else
      this.mEventList = Input.mMouseEventList;

    for (let i = 0; i < 6; i++)
      this.mDom.addEventListener(this.mEventList[i], e => this.__onPointerEvent(e), false);

    document.addEventListener(this.mEventList[Input.IX_POINTER_UP], e => this.__onPointerEventDoc(e), false);

    for (let i = 0; i < this.mKeyEventList.length; i++)
      document.addEventListener(this.mKeyEventList[i], e => this.__onKeyEvent(e), false);
  }

  /**
   * @private
   * @param {Event} e
   *
   * @return {boolean}
   */
  __onKeyEvent(e) {
    if (Black.instance.isPaused === true)
      return false;

    this.mKeyQueue.push(e);
    return true;
  }

  /**
   * @private
   * @param {Event} e
   *
   * @returns {void}
   */
  __onPointerEventDoc(e) {
    if (Black.instance.isPaused === true)
      return;

    // dirty check
    let over = e.target == this.mDom || e.target.parentElement == this.mDom;

    if (over === false && this.mNeedUpEvent === true) {
      this.mNeedUpEvent = false;
      this.__pushEvent(e);
    }
  }

  /**
   * @private
   * @param {Event} e
   *
   * @return {boolean}
   */
  __onPointerEvent(e) {
    if (Black.instance.isPaused === true)
      return false;

    e.preventDefault();

    this.__pushEvent(e);

    return true;
  }

  /**
   * @private
   * @param {Event} e
   *
   * @returns {void}
   */
  __pushEvent(e) {
    let /** @type {Vector|null} */ p = null;
    if (e.type.indexOf('touch') === 0)
      p = this.__getTouchPos(this.mDom, /** @type {TouchEvent} */ (e));
    else
      p = this.__getPointerPos(this.mDom, e);

    this.mPointerQueue.push({
      e: e,
      x: p.x,
      y: p.y
    });
  }

  /**
   * @private
   * @param {Element} canvas
   * @param {Event} evt
   *
   * @return {Vector}
   */
  __getPointerPos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.clientWidth / rect.width;
    let scaleY = canvas.clientHeight / rect.height;
    return new Vector((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY);
  }

  /**
   * @private
   * @param {Element} canvas
   * @param {TouchEvent} evt
   *
   * @return {Vector}
   */
  __getTouchPos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();

    /** @type {Touch} */
    let touch = evt.changedTouches[0]; // ios? what about android?
    let x = touch.clientX;
    let y = touch.clientY;

    let scaleX = canvas.clientWidth / rect.width;
    let scaleY = canvas.clientHeight / rect.height;
    return new Vector((x - rect.left) * scaleX, (y - rect.top) * scaleY);
  }

  /**
   * @inheritDoc
   * 
   * @param {number} dt
   *
   * @return {void}
   */
  onUpdate(dt) {
    // omg, who gave you keyboard?
    this.__updateKeyboard();

    // we had no actual events but still we need to know if something were moved
    if (this.mPointerQueue.length === 0) {
      this.__findTarget(Input.pointerPosition);
      this.__processInOut(Input.pointerPosition);
    }

    for (var i = 0; i < this.mPointerQueue.length; i++) {
      let nativeEvent =  this.mPointerQueue[i];

      // update to the lattest position
      this.mPointerPosition.x = nativeEvent.x;
      this.mPointerPosition.y = nativeEvent.y;

      let pointerPos = new Vector(nativeEvent.x, nativeEvent.y);
      let eventType = Input.mInputEventsLookup[this.mEventList.indexOf(nativeEvent.e.type)];

      this.__findTarget(pointerPos);
      this.__processInOut(Input.pointerPosition);
      this.__processNativeEvent(nativeEvent, pointerPos, eventType);
    }

    // Erase the pointer queue
    this.mPointerQueue.splice(0, this.mPointerQueue.length);
    this.mKeyQueue.splice(0, this.mKeyQueue.length);
  }

  __findTarget(pos) {
    let obj = GameObject.hits(Black.instance.root, pos);

    if (obj === null) {
      this.mTarget = null;
      this.mTargetComponent = null;
      return;
    }

    let c = obj.getComponent(InputComponent);
    if (c === null) {
      this.mTarget = null;
      this.mTargetComponent = null;
      return;
    }

    if (c.touchable === false) {
      this.mTarget = null;
      this.mTargetComponent = null;
      return;
    }

    this.mTarget = obj;
    this.mTargetComponent = c;
  }

  __processNativeEvent(nativeEvent, pos, type) {
    if (type === Input.POINTER_DOWN) {
      this.mIsPointerDown = true;
      this.mNeedUpEvent = true;
    }
    else if (type === Input.POINTER_UP) {
      this.mIsPointerDown = false;
    }

    this.post(type);

    if (this.mTarget === null && this.mLockedTarget === null)
      return;

    let info = new PointerInfo(this.mTarget, pos.x, pos.y);

    if (type === Input.POINTER_DOWN) {
      this.mLockedTarget = this.mTarget;
    }
    else if (type === Input.POINTER_UP && this.mLockedTarget !== null) {
      this.mLockedTarget.post('~pointerUp', info);
      this.mLockedTarget = null;
      return;
    }

    let sameTarget = this.mTarget === this.mLockedTarget;

    if (this.mLockedTarget === null) {
      if (this.mTarget !== null) {
        // regular non locked post
        //console.log('regular');
        this.mTarget.post('~' + type, info);
      }
    } else {
      if (sameTarget === true) {
        // just bubble the event
        this.mLockedTarget.post('~' + type, info);
      }
      else {
        // send skipping this gameObject
        if (this.mLockedTarget.mParent !== null && this.mTarget !== null) {
          console.log('parent');
          this.mLockedTarget.mParent.post('~' + type, info);
        }
      }
    }
  }

  __postInMessage() {
    if (this.mLockedTarget !== null) {
      if (this.mLockedTarget !== this.mTargetComponent.gameObject && this.mTargetComponent.gameObject !== null)
        return;
    }

    this.mTargetComponent.mPointerInDispatched = true;
    this.mTargetComponent.gameObject.post('~pointerIn');
    this.mLastInTargetComponent = this.mTargetComponent;
  }

  __postOutMessage() {
    if (this.mLockedTarget !== null && this.mTargetComponent !== null) {
      if (this.mLockedTarget !== this.mTargetComponent.gameObject)
        return;
    }

    this.mLastInTargetComponent.mPointerInDispatched = false;
    this.mLastInTargetComponent.gameObject.post('~pointerOut');
    this.mLastInTargetComponent = null;
  }

  __processInOut(pos) {

    if (this.mTargetComponent === null) {
      if (this.mLastInTargetComponent !== null)
        this.__postOutMessage();
    } else {
      if (this.mLastInTargetComponent !== null && this.mLastInTargetComponent !== this.mTargetComponent) {
        this.__postOutMessage();
        return;
      }

      if (this.mTargetComponent.mPointerInDispatched === false)
        this.__postInMessage();
    }
  }

  /**
   * @private
   *
   * @returns {void}
   */
  __updateKeyboard() {
    for (let i = 0; i < this.mKeyQueue.length; i++) {
      let nativeEvent = this.mKeyQueue[i];

      let ix = this.mKeyEventList.indexOf(nativeEvent.type);
      let pIx = this.mPressedKeys.indexOf(nativeEvent.keyCode);
      let fnName = Input.mKeyEventsLookup[ix];

      if (fnName === 'keyUp' && pIx !== -1)
        this.mPressedKeys.splice(pIx, 1);

      else if (fnName === 'keyDown' && pIx === -1) {
        this.mPressedKeys.push(nativeEvent.keyCode);
        fnName = 'keyPress';
      }

      this.post(fnName, new KeyInfo(nativeEvent), nativeEvent);
    }
  }

  /**
   * Listens for global input event by given message name.
   *
   * @param {string} name            The name of the message to listen for.
   * @param {Function} callback      The callback function that will be called when message received.
   * @param {Object=} [context=null] Optional context.
   *
   * @return {void}
   */
  static on(name, callback, context = null) {
    Input.instance.on(name, callback, context);
  }

  /**
   * Indicates if mouse or touch in down at this moment.
   *
   * @return {boolean}
   */
  static get isPointerDown() {
    return Input.instance.mIsPointerDown;
  }

  /**
   * Returns mouse or touch pointer x-component.
   * @return {number}
   */
  static get pointerX() {
    return Input.instance.mPointerPosition.x;
  }

  /**
   * Returns mouse or touch pointer x-component.
   *
   * @return {number} Description
   */
  static get pointerY() {
    return Input.instance.mPointerPosition.y;
  }

  /**
   * Returns mouse or touch pointer position.
   *
   * @return {Vector}
   */
  static get pointerPosition() {
    return Input.instance.mPointerPosition;
  }

  /**
   * Returns list of pressed keys.
   *
   * @returns {Array<number>}
   */
  static get pressedKeys() {
    return Input.instance.mPressedKeys;
  }
}

Input.POINTER_DOWN = 'pointerDown';
Input.POINTER_MOVE = 'pointerMove';
Input.POINTER_UP   = 'pointerUp';
Input.POINTER_IN   = 'pointerIn';
Input.POINTER_OUT  = 'pointerOut';

/**
 * @type {Input}
 * @nocollapse
 */
Input.instance = null;

/**
 * @type {number}
 * @const
 */
Input.IX_POINTER_MOVE = 0;

/**
 * @type {number}
 * @const
 */
Input.IX_POINTER_DOWN = 1;

/**
 * @type {number}
 * @const
 */
Input.IX_POINTER_UP = 2;

// /**
//  * @type {number}
//  * @const
//  */
// Input.IX_POINTER_IN = 3;
//
// /**
//  * @type {number}
//  * @const
//  */
// Input.IX_POINTER_OUT = 4;

/**
 * @private
 * @type {Array<string>}
 * @const
 */
Input.mKeyEventList = ['keydown', 'keyup'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
Input.mKeyEventsLookup = ['keyDown', 'keyUp', 'keyPress'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
Input.mInputEventsLookup = ['pointerMove', 'pointerDown', 'pointerUp', 'pointerIn', 'pointerOut'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
Input.mPointerEventList = ['pointermove', 'pointerdown', 'pointerup', 'pointerenter', 'pointerleave'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
Input.mMouseEventList = ['mousemove', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
Input.mTouchEventList = ['touchmove', 'touchstart', 'touchend', 'touchenter', 'touchleave'];


/**
 * Stores additional information about pointer events.
 *
 * @cat input
 */

class PointerInfo {
  /**
   * Creates new PointerInfo instance. For internal use only.
   *
   * @param {GameObject} activeObject
   * @param {number} x
   * @param {number} y
   */
  constructor(activeObject, x, y) {
    /**
     * @private
     * @type {GameObject}
     */
    this.mActiveObject = activeObject;

    /**
     * @private
     * @type {number}
     */
    this.mX = x;

    /**
     * @private
     * @type {number}
     */
    this.mY = y;
  }

  /**
   * Returns the object under cursor right now.
   * @readonly
   *
   * @returns {GameObject}
   */
  get activeObject() {
    return this.mActiveObject;
  }

  get x() {
    return this.mX;
  }

  get y() {
    return this.mY;
  }
}

/**
 * This component will allow you to subscribe for some input messages.
 *
 * @cat input
 * @extends Component
 */

class InputComponent extends Component {
  /**
   * @return {void}
   */
  constructor() {
    super();

    /** @type {boolean} */
    this.touchable = true;

    /* INTERNAL */
    /** @type {boolean} */
    this.mPointerInDispatched = false;
  }
}

/**
 * Basic FPS component. Shows frame rate.
 *
 * @cat components
 * @extends Component
 */

class FPSComponent extends Component  {
  constructor() {
    super();

    /**
     * @private
     * @type {TextField}
     */
    this.txtFPS = null;
  }

  onAdded(){
    this.txtFPS = new TextField('FPS: 0');
    this.txtFPS.x = 0;
    this.txtFPS.y = 0;
    this.gameObject.addChild(this.txtFPS);
  }

  onRemoved(){
  }

  onUpdate(){
    this.txtFPS.text = 'FPS: ' + Black.instance.FPS;
  }
}

/**
 * Basic multi resolution utility component. Resizes an GameObject to match desired resolution.
 *
 * @cat components
 * @extends Component
 */

class MRComponent extends Component {
  /**
   * Creates new instance of MRComponent. Used to scale and position GameObject to a specified width and height.
   * Simplified version of scale manager.
   *
   * @param {number} [width=960]  The width.
   * @param {number} [height=640] The height.
   */
  constructor(width = 960, height = 640) {
    super();

    /**
     * @private
     * @type {number}
     */
    this.mWidth = width;

    /**
     * @private
     * @type {number}
     */
    this.mHeight = height;

    /**
     * @private
     * @type {number}
     */
    this.mScale = 0;

    /**
     * @private
     * @type {number}
     */
    this.mInvScale = 0;

    /**
     * @private
     * @type {number}
     */
    this.mAspect = 0;

    let size = Black.instance.viewport.size;
    this.mCacheWidth = size.width;
    this.mCacheHeight = size.height;

    Black.instance.viewport.on('resize', this.__onResize, this);
  }

  onUpdate() {
    // TODO: performance wise
    let size = Black.instance.viewport.size;

    if (this.mCacheWidth !== size.width || this.mCacheHeight !== size.height)
      this.setSize(this.mWidth, this.mHeight);
  }

  __onResize(msg, rect) {
    this.setSize(this.mWidth, this.mHeight);
  }

  /**
   * Sets size of the latout.
   *
   * @param  {number} width = 960  The width.
   * @param  {number} height = 640 The height.
   * @return {void}
   */
  setSize(width = 960, height = 640){
    this.mWidth = width;
    this.mHeight = height;

    this.updateLayout();

    this.post('~resize', this.isLandscape);
  }

  /**
   * Updates layout to match specified settings.
   *
   * @return {void}
   */
  updateLayout() {
    if (!this.gameObject)
      return;

    /** @type {Rectangle} */
    let size = Black.instance.viewport.size;
    let width = this.mWidth;
    let height = this.mHeight;

    if (size.width <= size.height) {
      width = this.mHeight;
      height = this.mWidth;
    }

    /** @type {number} */
    let scaleX = size.width / width;

    /** @type {number} */
    let scaleY = size.height / height;

    this.mScale = Math.min(scaleX, scaleY);
    this.mInvScale = 1 / this.mScale;

    this.gameObject.scaleX = this.gameObject.scaleY = this.mScale;
    this.gameObject.x = (size.width / 2) - (width / 2) * this.mScale;
    this.gameObject.y = (size.height / 2) - (height / 2) * this.mScale;
  }

  onAdded() {
    this.updateLayout();
  }

  get isLandscape() {
    let size = Black.instance.viewport.size;
    return size.width >= size.height;
  }

  get isPortrait() {
    return !this.isLandscape;
  }
}

/**
 * A static class with many static easing functions.
 *
 * @cat animation
 * @static
 */

class Ease {
  /**
   * linear
   * @param {number} k
   * @return {number}
   */
  static linear(k) {
    return k;
  }

  /**
   * quadraticIn
   *
   * @param {number} k
   *
   * @return {number}
   */
  static quadraticIn(k) {
    return k * k;
  }

  /**
   * quadraticOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static quadraticOut(k) {
    return k * (2 - k);
  }

  /**
   * quadraticInOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static quadraticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k;

    return -0.5 * (--k * (k - 2) - 1);
  }

  /**
   * cubicIn
   *
   * @param {number} k
   *
   * @return {number}
   */
  static cubicIn(k) {
    return k * k * k;
  }

  /**
   * cubicOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static cubicOut(k) {
    return --k * k * k + 1;
  }

  /**
   * cubicInOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static cubicInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k;

    return 0.5 * ((k -= 2) * k * k + 2);
  }

  /**
   * quarticIn
   *
   * @param {number} k
   *
   * @return {number}
   */
  static quarticIn(k) {
    return k * k * k * k;
  }

  /**
   * quarticOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static quarticOut(k) {
    return 1 - (--k * k * k * k);
  }

  /**
   * quarticInOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static quarticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k * k;

    return -0.5 * ((k -= 2) * k * k * k - 2);
  }

  /**
   * quinticIn
   *
   * @param {number} k
   *
   * @return {number}
   */
  static quinticIn(k) {
    return k * k * k * k * k;
  }

  /**
   * quinticOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static quinticOut(k) {
    return --k * k * k * k * k + 1;
  }

  /**
   * quinticInOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static quinticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k * k * k;

    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  }

  /**
   * sinusoidalIn
   *
   * @param {number} k
   *
   * @return {number}
   */
  static sinusoidalIn(k) {
    return 1 - Math.cos(k * Math.PI / 2);
  }

  /**
   * sinusoidalOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static sinusoidalOut(k) {
    return Math.sin(k * Math.PI / 2);
  }

  /**
   * sinusoidalInOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static sinusoidalInOut(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  }

  /**
   * exponentialIn
   *
   * @param {number} k
   *
   * @return {number}
   */
  static exponentialIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  }

  /**
   * exponentialOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static exponentialOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  }

  /**
   * exponentialInOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static exponentialInOut(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    if ((k *= 2) < 1)
      return 0.5 * Math.pow(1024, k - 1);

    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
  }

  /**
   * circularIn
   *
   * @param {number} k
   *
   * @return {number}
   */
  static circularIn(k) {
    return 1 - Math.sqrt(1 - k * k);
  }

  /**
   * circularOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static circularOut(k) {
    return Math.sqrt(1 - (--k * k));
  }

  /**
   * circularInOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static circularInOut(k) {
    if ((k *= 2) < 1)
      return -0.5 * (Math.sqrt(1 - k * k) - 1);

    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
  }

  /**
   * elasticIn
   *
   * @param {number} k
   *
   * @return {number}
   */
  static elasticIn(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
  }

  /**
   * elasticOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static elasticOut(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
  }

  /**
   * elasticInOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static elasticInOut(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    k *= 2;

    if (k < 1)
      return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

    return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

  }

  /**
   * backIn
   *
   * @param {number} k
   *
   * @return {number}
   */
  static backIn(k) {
    const s = 1.70158;
    return k * k * ((s + 1) * k - s);
  }

  /**
   * backOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static backOut(k) {
    const s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
  }

  /**
   * backInOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static backInOut(k) {
    const s = 1.70158 * 1.525;

    if ((k *= 2) < 1)
      return 0.5 * (k * k * ((s + 1) * k - s));

    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  }

  /**
   * bounceIn
   *
   * @param {number} k
   *
   * @return {number}
   */
  static bounceIn(k) {
    return 1 - Ease.bounceOut(1 - k);
  }

  /**
   * bounceOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static bounceOut(k) {
    if (k < (1 / 2.75))
      return 7.5625 * k * k;
    else if (k < (2 / 2.75))
      return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
    else if (k < (2.5 / 2.75))
      return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;

    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
  }

  /**
   * bounceInOut
   *
   * @param {number} k
   *
   * @return {number}
   */
  static bounceInOut(k) {
    if (k < 0.5)
      return Ease.bounceIn(k * 2) * 0.5;

    return Ease.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }

  /**
   * smoothstep
   *
   * @param {number} k
   *
   * @return {number}
   */
  static smootherStep(k) {
    return k * k * k * (k * (6.0 * k - 15.0) + 10.0);
  }
}

/**
 * Interpolation functions.
 *
 * @cat animation
 * @static
 */

class Interpolation {
  /**
   * Singleton.
   */
  constructor() {}

  /**
   * linear
   *
   * @param {Array}  v The input array of values to interpolate between.
   * @param {number} k The percentage of interpolation, between 0 and 1.
   * @return {number}  The interpolated value
   */
  static linear(v, k) {
    let m = v.length - 1;
    let f = m * k;
    let i = Math.floor(f);

    let fn = (p0, p1, t) => {
      return (p1 - p0) * t + p0;
    };

    if (k < 0) {
      return fn(v[0], v[1], f);
    }

    if (k > 1) {
      return fn(v[m], v[m - 1], m - f);
    }

    return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
  }

  /**
   * bezier
   *
   * @param {Array}  v The input array of values to interpolate between.
   * @param {number} k The percentage of interpolation, between 0 and 1.
   * @return {number}  The interpolated value
   */
  static bezier(v, k) {
    let b = 0;
    let n = v.length;
    let pow = Math.pow;
    // Bernstein basis polynomials
    let bn = (n, i) => {
      let fc = Interpolation.__factorial;
      return fc(n) / fc(i) / fc(n - i);
    };

    for (let i = 0; i < n; i++) {
      b += pow(1 - k, n - i) * pow(k, i) * v[i] * bn(n, i);
    }

    return b;
  }

  /**
   * catmullRom
   *
   * @param {Array}  v The input array of values to interpolate between.
   * @param {number} k The percentage of interpolation, between 0 and 1.
   * @return {number}  The interpolated value
   */
  static catmullRom(v, k) {
    let m = v.length - 1;
    let f = m * k;
    let i = Math.floor(f);
    let fn = (p0, p1, p2, p3, t) => {
      let v0 = (p2 - p0) * 0.5;
      let v1 = (p3 - p1) * 0.5;
      let t2 = t * t;
      let t3 = t * t2;

      return ((p1 - p2) * 2 + v0 + v1) * t3 + ((p2 - p1) * 3 - 2 * v0 - v1) * t2 + v0 * t + p1;
    };

    if (v[0] === v[m]) {
      if (k < 0) {
        i = Math.floor(f = m * (1 + k));
      }

      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    } else {
      if (k < 0) {
        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
      }

      if (k > 1) {
        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
      }

      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }
  }
}

/**
 * @private
 * @param {number} n
 *
 * @return {number}
 */
Interpolation.__factorial = (function() {
  let a = [1];

  return function(n) {
    if (a[n]) {
      return a[n];
    }

    let s = n;

    while (--n) {
      s *= n;
    }

    a[n] = s;
    return s;
  };
})();

/**
 * A tweening component.
 *
 * @cat animation
 * @unrestricted
 * @extends Component
 */

class Tween extends Component {
  /**
   * Creates new instance of Tween Component.
   * @param {Object}        values            The values to tween.
   * @param {number}        [duration=0.25]   Duraction in seconds.
   * @param {Object|null}   [properties=null] Tween properties Object.
   */
  constructor(values, duration = 0.250, properties = null) {
    super();

    /**
     * @private
     * @dict
     */
    this.mValues = values;

    /**
     * @private
     * @type {number}
     */
    this.mDuration = duration;

    /**
     * @private
     * @dict
     */
    this.mProperties = properties;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsPlaying = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsPaused = false;

    /**
     * @private
     * @type {number}
     */
    this.mStartTime = 0;

    /**
     * @private
     * @type {number}
     */
    this.mPausedTime = 0;

    /**
     * @private
     * @dict
     */
    this.mValuesStart = {};

    /**
     * @private
     * @type {number}
     */
    this.mElapsed = 0;

    /**
     * @private
     * @type {function (Array, number):number}
     */
    this.mInterpolation = Interpolation.linear;

    /**
     * @private
     * @type {number}
     */
    this.mDelay = 0;

    /**
     * @private
     * @type {number}
     */
    this.mRepeatTimes = 0;

    /**
     * @private
     * @type {boolean}
     */
    this.mInitiated = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mStarted = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mReverse = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mRemoveOnComplete = true;

    /**
     * @private
     * @type {boolean}
     */
    this.mPlayOnAdded = true;

   /**
    * @private
    * @type {function(number):number}
    */
    this.mEase = Ease.smootherStep;

    // TODO: fix ESDOC issue
    if (this.mProperties !== null) {
      for (let f in this.mProperties) {
        this[f] = /** @dict */ (this.mProperties[f]);
      }
    }
  }

  /**
   * Returns active ease function.
   *
   * @return {function(number):number}
   */
  get ease() {
    return this.mEase;
  }

  /**
   * Sets easing function to use.
   *
   * @param {function(number):number} value The easing function.
   * @return {void}
   */
  set ease(value) {
    this.mEase = value;
  }

  /**
   * Returns the interpolation algorithm.
   *
   * @return {function(Array, number):number}
   */
  get interpolation() {
    return this.mInterpolation;
  }

  /**
   * Sets the interpolation algorithm. Possible values Interpolation.linear, Interpolation.bezier, Interpolation.catmullRom or your custom function.
   *
   * @param {function(Array, number):number} value The interpolation function.
   * @return {void}
   */
  set interpolation(value) {
    this.mInterpolation = value;
  }

  /**
   * Time elapsed since tween start in seconds.
   *
   * @return {number}
   */
  get elapsed() {
    return this.mElapsed;
  }

  /**
   * Returns amount of seconds to wait before tweening.
   *
   * @return {number}
   */
  get delay() {
    return this.mDelay;
  }

  /**
   * Set amount of seconds to wait before tweening.
   *
   * @param {number} value Seconds to wait.
   * @return {void}
   */
  set delay(value) {
    this.mDelay = value;
  }

  /**
   * Returns if Tween Component should be automatically detached from owner GameObject after completation.
   *
   * @return {boolean}
   */
  get removeOnComplete() {
    return this.mRemoveOnComplete;
  }

  /**
   * Sets if Tween Component should be automatically detached from owner GameObject after completation.
   *
   * @param {boolean} value
   * @return {void}
   */
  set removeOnComplete(value) {
    this.mRemoveOnComplete = value;
  }

  /**
   * Returns whether the tween should start playing automatically when added to the root.
   * @return {boolean}
   */
  get playOnAdded() {
    return this.mPlayOnAdded;
  }

  /**
   * Sets whether the tween should start playing automatically when added to the root.
   *
   * @param {boolean} value
   * @return {void}
   */
  set playOnAdded(value) {
    this.mPlayOnAdded = value;
  }

  /**
   * @private
   * @param {number} t
   *
   * @return {void}
   */
  __start(t) {
    this.mIsPlaying = true;
    this.mStartTime = t + this.mDelay;
  }

  /**
   * Starts tweening.
   *
   * @return {Tween} Returns this.
   */
  play() {
    if (!this.mIsPaused) {
      this.__start(Black.instance.uptime);
    } else {
      this.__resume();
    }

    return this;
  }

  /**
   * Stops current tween.
   *
   * @return {Tween} Returns this.
   */
  stop() {
    if (!this.mIsPlaying)
      return this;

    this.mIsPlaying = false;

    return this;
  }

  /**
   * Sets the values for tweening.
   *
   * @param {Object} values   Values to tween.
   * @param {number} duration Duration in seconds.
   *
   * @return {Tween} Returns this.
   */
  to(values = {}, duration = 0.250) {
    this.mValues = values;

    this.mDuration = duration;

    this.mInitiated = false;

    return this;
  }

  /**
   * Pauses current tween.
   *
   * @return {Tween} Returns this.
   */
  pause() {
    if (!this.mIsPlaying)
      return this;

    this.mIsPaused = true;
    this.mPausedTime = Black.instance.uptime;

    return this;
  }

  /**
   * @private
   * @return {void} Description
   */
  __resume() {
    if (!this.mIsPaused)
      return;

    this.mIsPaused = false;
    this.mStartTime += Black.instance.uptime - this.mPausedTime;
  }


  /**
   * @protected
   * @return {void}
   */
  removeFromParent() {
    if (this.mIsPlaying)
      this.stop();

    super.removeFromParent();
  }

  // /**
  //  * @return {void}
  //  */
  // dispose() {
  //   this.remove();
  // }

  /**
   * Sets the number of times the tween wiil be repeated after first execution.
   *
   * @return {Tween} Returns this.
   */
  repeat(times) {
    this.mRepeatTimes = times;

    return this;
  }

  /**
   * Sets if tween should be looped over.
   *
   * @return {Tween} Return this.
   */
  loop(value = true) {
    this.mRepeatTimes = value ? Infinity : 0;
    return this;
  }

   /**
   * Enables/disables reversing of tween values.
   *
   * @return {Tween} Returns this.
   */
  reverse(value = true) {
    this.mReverse = value;
    return this;
  }

  /**
   * Add specified tween object into the queue. The specified tween will be executed after completation of this tween,
   *
   * @return {Tween} Returns this.
   */
  chain(tween) {
    if (!tween) {
      return this;
    }

    this.mRemoveOnComplete = false;

    this.on('complete', () => {
      tween.play();
    });

    return this;
  }

  /**
   * @inheritDoc
   * 
   * @param  {GameObject} gameObject
   * @return {void}
   */
  onAdded(gameObject) {
    if (this.mPlayOnAdded) {
      this.__start(Black.instance.uptime);
    }
  }

  /**
   * @private
   * @param {number} t
   *
   * @return {void}
   */
  __update(t) {

  }

  /**
   * Updates tween values.
   *
   * @param {Object} values The Object to get values from.
   * @return {void}
   */
  set(values) {
    this.mValues = values;

    for (let f in this.mValues)
      this.mValuesStart[f] = parseFloat(this.gameObject[f]);
  }

  /**
   * @inheritDoc
   *
   * @param {number} dt
   *
   * @returns {void}
   */
  onPostUpdate(dt){
    let t = Time.time;

    if (t < this.mStartTime || !this.mIsPlaying || this.mIsPaused)
      return;

    // copy values only when starting tween...
    // since values may change
    if (this.mStarted === false) {
      this.mStarted = true;
      this.post('start', this.gameObject);

      for (let f in this.mValues) {
        if (!this.mInitiated && Array.isArray(this.mValues[f])) {
          this.mValues[f] = [this.gameObject[f]].concat(this.mValues[f]);
        }
        this.mValuesStart[f] = parseFloat(this.gameObject[f]);
      }

      this.mInitiated = true;
    }

    this.mElapsed = (t - this.mStartTime) / this.mDuration;

    if (this.mElapsed > 1)
      this.mElapsed = 1;

    let value = this.mEase(this.mElapsed);

    for (let f in this.mValues) {
      let start = /** @type {number} */ (this.mValuesStart[f]);
      let end = /** @type {number|Array} */ (this.mValues[f]);

      if (Array.isArray(end)) {
        this.gameObject[f] = this.mInterpolation(end, value);
      } else {
        this.gameObject[f] = /** @type {number} */ (start + (end - start) * value);
      }
    }

    this.post('update', this.gameObject);

    if (this.mElapsed === 1) {
      if (this.mRepeatTimes-- > 0) {
        if (this.mReverse) {
          for (let f in this.mValues) {
            [this.mValues[f], this.mValuesStart[f]] = [this.mValuesStart[f], this.mValues[f]];
          }
        }

        this.mStartTime = t + this.mDelay;

        this.post('loop', this.gameObject);
      } else {
        this.mIsPlaying = false;
        this.post('complete', this.gameObject);

        if (this.mRemoveOnComplete) {
          this.removeFromParent();
        } else {
          for (let f in this.mValues) {
            this.mValuesStart[f] = this.mValues[f];
          }

          this.mStarted = false;
        }
      }
    }
  }
}

/**
 * Holds details about sprite animation.
 *
 * @cat animation
 */

class AnimationInfo {
  /**
   * Creates an instance of Animation class
   *
   * @param {AnimationController}    controller  Animation controller
   * @param {string}                 name        The name of animation
   * @param {Array<Texture>}         frames      Array of Textures for this animation
   * @param {number}                 [fps=14]    Frame rate
   * @param {boolean}                [loop=true] Is animations should be looped
   */
  constructor(controller, name, frames, fps = 14, loop = true) {
    Debug.assert(fps > 0, 'FPS must be greater than 0.');

    /**
     * @private
     * @type {AnimationController}
     */
    this.mController = controller;

    /**
     * @private
     * @type {string}
     */
    this.mName = name;

    /**
     * @private
     * @type {Array<Texture>}
     */
    this.mFrames = frames;

    /**
     * @private
     * @type {number}
     */
    this.mCurrentFrame = 0;

    /**
     * @private
     * @type {number}
     */
    this.mNextFrameAt = 0;

    /**
     * @private
     * @type {number}
     */
    this.mFPS = fps;

    /**
     * @private
     * @type {number}
     */
    this.mFrameDuration = 1 / this.mFPS;

    /**
     * @private
     * @type {boolean}
     */
    this.mLoop = loop;

    /**
     * @private
     * @type {boolean}
     */
    this.mPaused = false;

    /**
     * @private
     * @type {number}
     */
    this.mElapsed = 0;

    /**
     * @private
     * @type {boolean}
     */
    this.mStopped = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mCompleted = false;
  }

  /**
   * Plays animation. If Animation is completed, current frame is reset to 0.
   *
   * @return {Texture} Returns the current frame Texture.
   */
  play() {
    if (this.mCompleted === true) {
      this.mCurrentFrame = 0;
      this.mElapsed = 0;
    }

    this.mPaused = false;
    this.mStopped = false;
    this.mCompleted = false;

    this.mNextFrameAt = Black.instance.uptime + this.mFrameDuration - this.mElapsed;
    this.mElapsed = 0;

    return this.mFrames[this.mCurrentFrame];
  }

  /**
   * Stops animation and resets the value of current frame.
   *
   * @return {void}
   */
  stop() {
    this.mStopped = true;
    this.mCurrentFrame = 0;
  }

  /**
   * Pauses animation.
   *
   * @return {void}
   */
  pause() {
    this.mPaused = true;
    this.mElapsed = this.mNextFrameAt - Black.instance.uptime;
  }

  /**
   * @private
   * @param {number} dt
   * @param {number} t
   *
   * @return {Texture|null}
   */
  __update(dt, t) {
    if (t < this.mNextFrameAt || this.mPaused === true || this.mStopped === true || this.mCompleted === true)
      return null;

    this.mCurrentFrame++;

    if (this.mCurrentFrame >= this.mFrames.length) {
      if (this.mLoop === true) {
        this.mCurrentFrame = 0;
      } else {
        this.mCurrentFrame = this.mFrames.length - 1;
        this.mController.post('complete', this);
        this.mCompleted = true;
        return null;
      }
    }

    this.mNextFrameAt = Black.instance.uptime + this.mFrameDuration;
    let texture = this.mFrames[this.mCurrentFrame];
    return texture;
  }

  /**
   * Get/Set animation speed in frames per second.
   *
   * @return {number}
   */
  get fps() {
    return this.mFPS;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set fps(value) {
    Debug.assert(value > 0, 'FPS must be greater than 0.');

    this.mFPS = value;
    this.mFrameDuration = 1 / this.mFPS;

    // update next frame start time
    let diff = this.mNextFrameAt - Black.instance.uptime;
    this.mNextFrameAt += diff;
  }

  /**
   * Get/Set if animation should be looped.
   * @return {boolean}
   */
  get loop() {
    return this.mLoop;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set loop(value) {
    this.mLoop = value;
  }

  /**
   * Gets array of Texture.
   *
   * @return {Array<Texture>}
   */
  get frames() {
    return this.mFrames;
  }

  /**
   * Returns true if Animation is playing (neither stopped nor paused).
   *
   * @return {boolean}
   */
  get isPlaying() {
    return this.mPaused === false && this.mStopped === false;
  }

  /**
   * Returns true if animation is completed.
   *
   * @return {boolean}
   */
  get isComplete() {
    return this.mCompleted;
  }

  /**
   * Returns name of this animation.
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }
}

/**
 * A Component which allows to play sprite animations.
 *
 * @cat animation
 * @extends Component
 */

class AnimationController extends Component {
  /**
   * Creates an instance of AnimationController
   */
  constructor() {
    super();

    /**
     * @private
     * @type {Object<string, AnimationInfo>}
     */
    this.mAnimations = {};

    /**
     * @private
     * @type {AnimationInfo|null}
     */
    this.mCurrentAnim = null;
  }

  /**
   * Returns the Animation object that exists with the specified name.
   *
   * @param {string} name The name of the child to return.
   * @returns {AnimationInfo} Returns the Animation object that exists with the specified name.
   */
  getByName(name){
    Debug.assert(name !== null, 'Animation must be set first.');
    Debug.assert(this.mAnimations.hasOwnProperty(name), 'Animation must be set first.');

    return this.mAnimations[name];
  }

  /**
   * Removes Animation object that exists with the specified name. If animation is playing right now it will be stopped.
   *
   * @param {string} name The name of the animation to remove.
   * @returns {void}
   */
  remove(name) {
    Debug.assert(name !== null, 'Animation name shall not be null.');
    Debug.assert(this.mAnimations.hasOwnProperty(name) === true, 'Unable to find animation.');

    let anim = this.mAnimations[name];

    if (this.mCurrentAnim !== null && this.mCurrentAnim === anim) {
      this.stop();
      delete this.mAnimations[name];
    }

    this.mCurrentAnim = null;
  }

  /**
   * Add the Animation object into the list of animations. If animation with given name already exists exception will be thrown.
   *
   * @param {string}          name        The name of animation to update
   * @param {Array<Texture>}  textures    Array of Textures
   * @param {number}          [fps=14]    Frames Per Second
   * @param {boolean}         [loop=true] Indicated if animation should be started over at the end.
   *
   * @return {AnimationInfo} The newly created Animation Object.
   */
  add(name, textures, fps = 14, loop = true) {
    Debug.assert(textures.length > 0, 'Animation cannot be empty.');
    Debug.assert(fps > 0, 'FPS must be greater than 0.');
    Debug.assert(this.mAnimations.hasOwnProperty(name) == false, 'Animatation with same name alredy exists');

    let anim = new AnimationInfo(this, name, textures, fps, loop);
    this.mAnimations[name] = anim;

    return anim;
  }

  /**
   * Plays animation that exists with the specified name.
   *
   * @param {string} name The name of animation to play.
   * @return {void}
   */
  play(name) {
    Debug.assert(this.mAnimations.hasOwnProperty(name), 'Animation must be set first.');

    this.mCurrentAnim = this.mAnimations[name];

    let texture = this.mCurrentAnim.play();

    let sprite = /** @type {Sprite} */ (this.gameObject);
    if (sprite === null)
      return;

    if (texture !== null)
      sprite.texture = texture;
  }

  /**
   * Stops active animation. If no animations are playing at the moment nothing will happen.
   *
   * @return {void}
   */
  stop() {
    if (this.mCurrentAnim === null)
      return;

    this.mCurrentAnim.stop();
  }

  /**
   * Pauses active animation.
   * @return {void}
   */
  pause() {
    if (this.mCurrentAnim === null)
      return;

    this.mCurrentAnim.pause();
  }

  /**
   * @inheritDoc
   * 
   * @param  {number} dt
   * @return {void}
   */
  onPostUpdate(dt) {
    if (this.mCurrentAnim === null)
      return;

    // TODO: replace with time.time
    let newTexture = this.mCurrentAnim.__update(dt, Black.instance.uptime);
    if (newTexture === null)
      return;

    let sprite = /** @type {Sprite} */ (this.gameObject);
    sprite.texture = newTexture;
  }

  /**
   * Returns current active animation.
   *
   * @returns {AnimationInfo|null}
   */
  get currentAnimation() {
    return this.mCurrentAnim;
  }
}

/**
 * THE BLACK ENGINE ITSELF.
 *
 * @extends MessageDispatcher
 */

class Black extends MessageDispatcher {

  /**
   * Creates a new Black instance.
   * @param {string}                          containerElementId The id of an DOM element.
   * @param {function(new: GameObject)}       rootClass          Type name of an GameObject to start execution from.
   * @param {function(new: VideoNullDriver)}  [videoDriverClass] Type name of an VideoDriver (VideoNullDriver, DOMDriver or CanvasDriver)
   */
  constructor(containerElementId, rootClass, videoDriverClass) {
    super();

    // Dirty GCC workaround
    window['Black'] = {};
    window['Black']['instance'] = this;

    console.log('%c                         >>> BLACK <<<                         ', 'background: #000; color: #fff;');

    /**
     * @private
     * @type {string}
     */
    this.mContainerElementId = containerElementId;

    /**
     * @private
     * @type {HTMLElement}
     */
    this.mContainerElement = /** @type {!HTMLElement} */ (document.getElementById(this.mContainerElementId));

    if (!this.mContainerElement)
      throw new Error('Container element was not found');

    /**
     * @private
     * @type {function(new: VideoNullDriver)}
     */
    this.mVideoDriverClass = videoDriverClass;

    /**
     * @private
     * @type {number}
     */
    this.mStageWidth = this.mContainerElement.clientWidth;

    /**
     * @private
     * @type {number}
     */
    this.mStageHeight = this.mContainerElement.clientHeight;

    /**
     * @private
     * @type {number}
     */
    this.mSimulationTimestep = 1000 / 60;

    /**
     * @private
     * @type {number}
     */
    this.mUptime = 0;

    /**
     * @private
     * @type {number}
     */
    this.mFrameAccum = 0;

    /**
     * @private
     * @type {number}
     */
    this.mLastFrameTimeMs = 0;

    /**
     * @private
     * @type {number}
     */
    this.mCurrentTime = 0;

    /**
     * @private
     * @type {number}
     */
    this.mFPS = 60;

    /**
     * @private
     * @type {number}
     */
    this.mLastFpsUpdate = 0;

    /**
     * @private
     * @type {number}
     */
    this.mFramesThisSecond = 0;

    /**
     * @private
     * @type {number}
     */
    this.mNumUpdateSteps = 0;

    /**
     * @private
     * @type {number}
     */
    this.mMinFrameDelay = 0;

    /**
     * @private
     * @type {Array<System>}
     */
    this.mSystems = [];

    /**
     * @private
     * @type {boolean}
     */
    this.mIsRunning = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsStarted = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsPanic = false;

    /**
     * @private
     * @type {number}
     */
    this.mLastFrameUpdateTime = 0;

    /**
     * @private
     * @type {number}
     */
    this.mLastFrameRenderTime = 0;

    /**
     * @private
     * @type {number}
     */
    this.mRAFHandle = -1; // not sure

    /**
     * @private
     * @type {Viewport}
     */
    this.mViewport = null;

    /**
     * @private
     * @type {VideoNullDriver}
     */
    this.mVideo = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mPaused = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mUnpausing = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mPauseOnHide = true;

    /**
     * @private
     * @type {boolean}
     */
    this.mPauseOnBlur = true;

    /**
     * @private
     * @type {Object<string, Array>}
     */
    this.mTagCache = {};

    /**
     * @private
     * @type {function(new: GameObject)|null}
     */
    this.mRootClass = rootClass;

    /**
     * @private
     * @type {GameObject|null}
     */
    this.mRoot = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mEnableFixedTimeStep = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mWasStopped = false;

    this.mStageRenderer = new Renderer();
    this.mStageRenderer.alpha = 1;
    this.mStageRenderer.blendMode = BlendMode.AUTO;
  }

  /**
   * Pauses all engine update logic. Note: RAF is not going to be paused and will work in background.
   *
   * @return {void}
   */
  pause() {
    this.mPaused = true;
  }

  /**
   * Resumes update execution.
   *
   * @return {void}
   */
  resume() {
    this.mUnpausing = true;
  }

  /**
   * @private
   * @returns {void}
   */
  __bootViewport() {
    this.mViewport = new Viewport(this.mContainerElement);
  }

  /**
   * @private
   * @returns {void}
   */
  __bootSystems() {
    //this.addSystem(new Input());
  }

  /**
   * @private
   * @returns {void}
   */
  __bootStage() {
    window.onblur = event => this.__onVisbilityChange(event);
    window.onfocus = event => this.__onVisbilityChange(event);
    window.onpagehide = event => this.__onVisbilityChange(event);
    window.onpageshow = event => this.__onVisbilityChange(event);

    if (document.hidden && this.mPauseOnHide === true)
      this.mPaused = true;
  }

  /**
   * @private
   * @returns {void}
   */
  __onVisbilityChange(event) {
    let type = event.type;

    if (type === 'blur' && this.mPauseOnBlur === true)
      this.mPaused = true;
    else if (type === 'pagehide' && this.mPauseOnHide === true)
      this.mPaused = true;
    else if (type === 'focus' || type === 'pageshow') {
      if (document.hidden === false)
        this.mUnpausing = true;
    }
  }

  /**
   * Adds a given system to the execution list.
   *
   * @param  {System} system The System object you want to add.
   * @return {System}
   */
  addSystem(system) {
    this.mSystems.push(system);
    return system;
  }

  /**
   * Removes the given system from execution list.
   *
   * @param {System} system The System instance to remove.
   * @return {System|null}
   */
  removeSystem(system) {
    // TODO: remove system on next frame
    var ix = this.mSystems.indexOf(system);
    if (ix === -1)
      return null;

    this.mSystems.splice(ix, 1);
    return system;
  }

  /**
   * @private
   * @returns {void}
   */
  __bootVideo() {
    this.mVideo = new this.mVideoDriverClass(this.mContainerElement, this.mStageWidth, this.mStageHeight);
  }

  /**
   * Boots up the engine!
   *
   * @return {void}
   */
  start() {
    if (this.mWasStopped === true) {
      Debug.error('Black engine cannot be re-started.');
      return;
    }

    this.constructor.instance = this;

    if (this.mIsStarted === true)
      return;

    this.__bootViewport();
    this.__bootSystems();
    this.__bootVideo();
    this.__bootStage();

    this.mRoot = new this.mRootClass();
    this.mRoot.name = 'root';
    this.mRoot.mAdded = true; // why are not added actually?
    this.mRoot.onAdded();

    const self = this;

    this.mIsStarted = true;
    this.mVideo.start();

    this.mRAFHandle = requestAnimationFrame(function (timestamp) {
      // TODO: do first update here
      self.mIsRunning = true;

      self.mLastFrameTimeMs = timestamp;
      self.mLastFpsUpdate = timestamp;
      self.mFramesThisSecond = 0;

      // Start the main loop.
      self.mRAFHandle = requestAnimationFrame((x) => {
        self.__update(x);
      });
    });

    // TODO: show only when needed, eg required by any system
    if (this.mEnableFixedTimeStep === false)
      Debug.info('Fixed time-step is disabled, some systems may not work.');
  }

  /**
   * Stops any executions, destroys resources and scene.
   *
   * @return {void}
   */
  stop() {
    this.mIsStarted = false;
    this.mIsRunning = false;
    cancelAnimationFrame(this.mRAFHandle);

    console.log('%c                        <<< BUY BUY >>>                        ', 'background: #000; color: #fff;');
  }

  /**
   * @private
   * @param {number} timestamp
   *
   * @return {void}
   */
  __update(timestamp) {
    // TODO: this method seems to be totaly broken. maxAllowedFPS is not working correctly
    this.constructor.instance = this;

    const self = this;

    if (this.mPaused === true && this.mUnpausing === true) {
      this.mUnpausing = this.mPaused = false;

      this.mLastFrameTimeMs = 0;
      this.mLastFpsUpdate = timestamp;
      this.mLastFrameTimeMs = timestamp;
      this.mCurrentTime = 0; // same as first update
      this.mFrameAccum = 0;
    }

    if (timestamp < this.mLastFrameTimeMs + this.mMinFrameDelay) {
      this.mRAFHandle = window.requestAnimationFrame(this.__update.bind(this));
      return;
    }

    if (this.mPaused === false) {
      this.mFrameAccum += (timestamp - this.mLastFrameTimeMs);
      this.mLastFrameTimeMs = timestamp;

      // BEGIN
      if (timestamp > this.mLastFpsUpdate + 1000) {
        this.mFPS = this.mFramesThisSecond;

        this.mLastFpsUpdate = timestamp;
        this.mFramesThisSecond = 0;
      }
      this.mFramesThisSecond++;

      this.mNumUpdateSteps = 0;

      // fix first update
      if (this.mCurrentTime === 0)
        this.mCurrentTime = timestamp - this.mMinFrameDelay;

      const dt = Time.scale * ((timestamp - this.mCurrentTime) * 0.001);
      this.mCurrentTime = timestamp;
      Time.mDeltaTime = dt;

      if (this.mEnableFixedTimeStep === true) {
        while (this.mFrameAccum >= this.mSimulationTimestep) {
          this.__internalFixedUpdate(this.mSimulationTimestep * 0.001);

          this.mFrameAccum -= this.mSimulationTimestep;

          if (++this.mNumUpdateSteps >= (60 * 3)) { // 3 seconds window
            console.log('[BLACK]: Not enough time to calculate update logic.');
            this.mIsPanic = true;
            break;
          }
        }
      }

      this.__internalUpdate(dt);
      this.__internalPostUpdate(dt);

      this.mVideo.beginFrame();
      this.__renderGameObjects(this.mRoot, this.mVideo, this.mStageRenderer);
      this.mVideo.render(this.mVideo);
      this.mVideo.endFrame();

      // TODO: remove uptime
      this.mUptime += dt;
      Time.mTime = this.mUptime;

      this.mIsPanic = false;
    }

    this.mRAFHandle = window.requestAnimationFrame(this.__update.bind(this));
  }

  __renderGameObjects(gameObject, driver, parentRenderer) {
    let renderer = gameObject.onRender(driver, parentRenderer);

    if (renderer != null)
      parentRenderer = renderer;

    if (driver.skipChildren === true)
      return;

    const len = gameObject.numChildren;
    for (let i = 0; i < len; i++)
      this.__renderGameObjects(gameObject.getChildAt(i), driver, parentRenderer);
  }

  /**
   * @private
   * @param {number} dt
   * @return {void}
   */
  __internalFixedUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onFixedUpdate(dt);

    this.mRoot.__fixedUpdate(dt);
  }

  /**
   * @private
   * @param {number} dt
   * @return {void}
   */
  __internalUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onUpdate(dt, this.mUptime);

    this.mRoot.__update(dt);
  }

  /**
   * @private
   * @param {number} dt
   * @return {void}
   */
  __internalPostUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onPostUpdate(dt, this.mUptime);

    this.mRoot.__postUpdate(dt);
  }

  /**
   * Returns the root GameObject.
   * @return {GameObject}
   */
  get root() {
    return this.mRoot;
  }

  /**
   * Returns current video driver instance.
   * @return {VideoNullDriver}
   */
  get video() {
    return this.mVideo;
  }

  /**
   * If `enableFixedTimeStep` is set to `true` returns number of milliseconds fixed-time-step will run over.
   * @return {number}
   */
  get simulationTimestep() {
    return this.mSimulationTimestep;
  }

  /**
   * Sets the number of milliseconds for fixed-time-step to run over.
   *
   * @param {number} timestep
   * @return {void}
   */
  set simulationTimestep(timestep) {
    this.mSimulationTimestep = timestep;
  }

  /**
   * Returns current frame rate
   * @return {number}
   */
  get FPS() {
    return this.mFPS;
  }

  /**
   * Returns max number of updates engine must do in a second.
   * @return {number}
   */
  get maxAllowedFPS() {
    return 1000 / this.mMinFrameDelay;
  }

  /**
   * maxAllowedFPS - Sets the number of update engine must do per second.
   * @param {number} fps The max allowed FPS. If less then zero engine will be stopped.
   * @return {void}
   */
  set maxAllowedFPS(fps) {
    if (fps <= 0)
      this.stop();
    else
      this.mMinFrameDelay = 1000 / fps;
  }

  /**
   * Returns the current viewport instance. Used to get size of a game screen, or listen for resize messages.
   * @return {Viewport}
   */
  get viewport() {
    return this.mViewport;
  }

  /**
   * Retruns the DOM element the engine runs in.
   * @return {Element}
   */
  get containerElement() {
    return this.mContainerElement;
  }

  /**
   * Returns amount of seconds since engine start.
   * @return {number}
   */
  get uptime() {
    return this.mUptime;
  }

  /**
   * @protected
   * @param {GameObject} child
   * @param {string|null} oldTag
   * @param {string|null} newTag
   *
   * @return {void}
   */
  onTagUpdated(child, oldTag, newTag) {
    if (oldTag !== null) {
      let arr = this.mTagCache[oldTag];
      arr.splice(arr.indexOf(child), 1);

      if (arr.length === 0)
        delete this.mTagCache[oldTag];
    }

    if (newTag !== null) {
      if (this.mTagCache.hasOwnProperty(newTag) === false)
        this.mTagCache[newTag] = [];

      this.mTagCache[newTag].push(child);
    }
  }

  /**
   * @protected
   * @param  {GameObject} child
   * @return {void}
   */
  onChildrenAdded(child) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onChildrenAdded(child);

    GameObject.forEach(child, (x) => {
      if (x.mAdded === true)
        return;

      this.onTagUpdated(x, null, x.mTag);

      x.mAdded = true;
      x.onAdded();

      for (let i = 0; i < x.mComponents.length; i++) {
        let c = x.mComponents[i];

        if (c.mAdded === true)
          continue;

        c.mAdded = true;
        c.onAdded(x);
      }
    });
  }

  /**
   * @protected
   * @param  {GameObject} child
   * @return {void}
   */
  onChildrenRemoved(child) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onChildrenRemoved(child);

    GameObject.forEach(child, (x) => {
      if (x.mAdded === true) {
        this.onTagUpdated(x, x.mTag, null);

        x.mAdded = false;
        x.onRemoved();

        for (let i = 0; i < x.mComponents.length; i++) {
          let c = x.mComponents[i];

          if (c.mAdded === false)
            continue;

          c.mAdded = false;
          c.onRemoved(x);
        }
      }
    });
  }

  /**
   * @protected
   * @param  {GameObject} child
   * @param  {Component} component
   * @return {void}
   */
  onComponentAdded(child, component) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onComponentAdded(child, component);

    if (component.mAdded === true)
      return;

    component.mAdded = true;
    component.onAdded(child);
  }

  /**
   * @param  {GameObject} child
   * @param  {Component} component
   * @return {void}
   */
  onComponentRemoved(child, component) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onComponentRemoved(child, component);

    if (component.mAdded === false)
      return;

    component.mAdded = false;
    component.onRemoved(child);
  }

  /**
   * Returns if engine should be automatically paused when window is hidden.
   * @return {boolean}
   */
  get pauseOnHide() {
    return this.mPauseOnHide;
  }

  /**
   * Sets if engine should be automatically paused when window is hidden.
   * @param {boolean} value
   * @return {void}
   */
  set pauseOnHide(value) {
    this.mPauseOnHide = value;
  }

  /**
   * Returns if engine should be automatically paused when container element is blured.
   * @return {boolean}
   */
  get pauseOnBlur() {
    return this.mPauseOnBlur;
  }

  /**
   * Sets if engine should be automatically paused when container element is blured.
   * @param {boolean} value
   * @return {void}
   */
  set pauseOnBlur(value) {
    this.mPauseOnBlur = value;
  }


  /**
   * Returns if fixed-time-step update should happen. When disabled the physics system and other systems may not work.
   * @return {boolean}
   */
  get enableFixedTimeStep() {
    return this.mEnableFixedTimeStep;
  }


  /**
   * Returns True if engine is paused.
   *
   * @returns {boolean}
   */
  get isPaused() {
    return this.mPaused;
  }

  /**
   * Sets if fixed-time-step update should happen. When disabled the physics system and other systems may not work.
   *
   * @param {boolean} value
   * @return {void}
   */
  set enableFixedTimeStep(value) {
    this.mEnableFixedTimeStep = value;
  }

  dispose() {
    // todo: call dispose on eveyrthing!
  }

  get magic() {
    return Math.random();
  }
}
//# sourceMappingURL=black-es6.js.map
