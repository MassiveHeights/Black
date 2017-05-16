"use strict";

/**
 * randomBetween
 *
 * @param {number} a
 * @param {number} b
 *
 * @return {number}
 */
Math.randomBetween = function (a, b) {
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
Math.clamp = function (value, min, max) {
  return value < min ? min : value > max ? max : value;
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
Math.lerp = function (a, b, t) {
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
Math.lerpp = function (a, b, t) {
  return (1 - t) * a + t * b;
};

/** @const
 *  @type {number}
 */
Math.PI_Q = Math.PI / 4;

/** @const
 *  @type {number}
 */
Math.PI2 = Math.PI * 2;

/** @const
 *  @type {number}
 */
Math.DEG2RAD = 0.01745329251994329576923690768489;

/** @const
 *  @type {number}
 */
Math.RAD2DEG = 57.295779513082320876798154814105;
// 
//
//
// /**
//  * fsin - Fast sin
//  *
//  * @param {number} x
//  *
//  * @return {number}
//  */
// Math.fsin = function(x) {
//   if (x === 0)
//     return 0;
//
//   // modulo to range of -PI..PI
//   const width = 3.14159265 - -3.14159265;
//   const offsetValue = x - -3.14159265;
//   x = (offsetValue - (Math.floor(offsetValue / width) * width)) + -3.14159265;
//
//   return x < 0 ? 1.27323954 * x + 0.405284735 * x * x : 1.27323954 * x - 0.405284735 * x * x;
// }
//
//
// /**
//  * fcos - Fast cos
//  *
//  * @param {number} x
//  *
//  * @return {number}
//  */
// Math.fcos = function(x) {
//   x += 1.57079632;
//
//   // modulo to range of -PI..PI
//   const width = 3.14159265 - -3.14159265;
//   const offsetValue = x - -3.14159265;
//   x = (offsetValue - (Math.floor(offsetValue / width) * width)) + -3.14159265;
//
//   return x < 0 ? 1.27323954 * x + 0.405284735 * x * x : 1.27323954 * x - 0.405284735 * x * x;
// }
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
"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Mathematical representation of a vector.
 *
 * @cat geom
 */

var Vector = function () {
  /**
   * Creates new Vector instance.
   *
   * @param  {number=} x = 0 X-component.
   * @param  {number=} y = 0 y-component.
   */
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vector);

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


  _createClass(Vector, [{
    key: "set",
    value: function set() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

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

  }, {
    key: "add",
    value: function add(vector) {
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

  }, {
    key: "subtract",
    value: function subtract(vector) {
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

  }, {
    key: "distance",
    value: function distance(vector) {
      var x = this.x - vector.x;
      var y = this.y - vector.y;

      return Math.sqrt(x * x + y * y);
    }

    /**
     * Multiplies two vectors.
     *
     * @param {Vector} vector A second vector to multiply with.
     *
     * @return {Vector} This.
     */

  }, {
    key: "multiply",
    value: function multiply(vector) {
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

  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(scalar) {
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

  }, {
    key: "dot",
    value: function dot(vector) {
      return this.x * vector.x + this.y * vector.y;
    }

    /**
     * Returns the length of this vector.
     *
     * @return {number} The length of the vector.
     */

  }, {
    key: "length",
    value: function length() {
      var x = this.x;
      var y = this.y;

      return Math.sqrt(x * x + y * y);
    }

    /**
     * Returns the squared length of this vector.
     *
     * @return {number} Squared length.
     */

  }, {
    key: "lengthSqr",
    value: function lengthSqr() {
      var x = this.x;
      var y = this.y;

      return x * x + y * y;
    }

    /**
     * Creates unit vector out of this one.
     *
     * @returns {Vector} This.
     */

  }, {
    key: "normalize",
    value: function normalize() {
      var sum = this.lengthSqr();

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

  }, {
    key: "clamp",
    value: function clamp(min, max) {
      this.x = Math.clamp(this.x, min, max);
      this.y = Math.clamp(this.y, min, max);

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

  }, {
    key: "lerp",
    value: function lerp(vector, t) {
      this.x = Math.lerp(this.x, vector.x, t);
      this.y = Math.lerp(this.y, vector.y, t);

      return this;
    }

    /**
     * Copies this vector values into given vector.
     *
     * @param {Vector} vector The vector to store values in.
     *
     * @return {Vector} Given vector.
     */

  }, {
    key: "copyTo",
    value: function copyTo(vector) {
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

  }, {
    key: "copyFrom",
    value: function copyFrom(vector) {
      this.x = vector.x;
      this.y = vector.y;

      return this;
    }

    /**
     * Clones this vector object.
     *
     * @return {Vector} New Vector instance.
     */

  }, {
    key: "clone",
    value: function clone() {
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

  }, {
    key: "equals",
    value: function equals(vector) {
      var epsilon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.EPSILON;

      return vector !== null && Math.abs(vector.x - this.x) < epsilon && Math.abs(vector.y - this.y) < epsilon;
    }

    /**
     * Checks if this vector is empty.
     *
     * @return {boolean} True if both components equal to zero,
     */

  }, {
    key: "isEmpty",
    value: function isEmpty() {
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

  }, {
    key: "setRotationFrom",
    value: function setRotationFrom(vector, rotation) {
      return this.subtract(vector).setRotation(rotation).add(vector);
    }

    /**
     *  Rotates this vector around zero vector.
     *
     * @param {number} rotation Angle in radians
     *
     * @return {Vector} This rotated vector.
     */

  }, {
    key: "setRotation",
    value: function setRotation(rotation) {
      var cos = Math.cos(rotation).toFixed(15);
      var sin = Math.sin(rotation).toFixed(15);

      return this.set(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
    }

    /**
     * Calculates angle in radians within this and specified vectors.
     *
     * @return {number} Angle in radians.
     */

  }, {
    key: "theta",
    value: function theta(vector) {
      return Math.acos(this.dot(vector) / this.length() / vector.length());
    }

    /**
     * Rotates this vector to normal.
     *
     * @return {Vector} This vector.
     */

  }, {
    key: "perp",
    value: function perp() {
      return this.set(this.y, -this.x);
    }

    /**
     * Creates new Vector from given angle in radians.
     *
     * @param {number=} [angle=0] Angle.
     *
     * @return {Vector} New Vector object.
     */

  }], [{
    key: "fromAngle",
    value: function fromAngle() {
      var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

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

  }, {
    key: "randomRange",
    value: function randomRange(vectorMin, vectorMax) {
      var outVector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      outVector = outVector || new Vector();

      outVector.x = Math.random() * (vectorMax.x - vectorMin.x) + vectorMin.x;
      outVector.y = Math.random() * (vectorMax.y - vectorMin.y) + vectorMin.y;

      return outVector;
    }
  }]);

  return Vector;
}();

/**
 * @ignore
 * @type {Vector}
 * @nocollapse
 */


Vector.__cache = new Vector();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A 2x3 matrix allows you to transform objects in space.
 *
 * @cat geom
 */

var Matrix = function () {
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
  function Matrix() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var tx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var ty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    _classCallCheck(this, Matrix);

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


  _createClass(Matrix, [{
    key: "set",
    value: function set() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var tx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var ty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

      var m = this._matrix;

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

  }, {
    key: "translate",
    value: function translate(dx, dy) {
      var a = this._matrix;

      var /** @type {number} */a0 = a[0]; // a
      var /** @type {number} */a1 = a[1]; // b
      var /** @type {number} */a2 = a[2]; // c
      var /** @type {number} */a3 = a[3]; // d
      var /** @type {number} */a4 = a[4]; // tx
      var /** @type {number} */a5 = a[5]; // ty

      this._matrix[4] += dx;
      this._matrix[5] += dy;

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

  }, {
    key: "setTranslation",
    value: function setTranslation(x, y) {
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

  }, {
    key: "setRotation",
    value: function setRotation(theta) {
      var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var m = this._matrix;
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

  }, {
    key: "rotate",
    value: function rotate(angle) {
      var a = this._matrix;
      var cos = Math.cos(angle);
      var sin = Math.sin(angle);
      var a0 = a[0];
      var a2 = a[2];
      var a4 = a[4];

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

  }, {
    key: "scale",
    value: function scale(sx, sy) {
      var a = this._matrix;
      var /** @type {number} */a0 = a[0]; // a
      var /** @type {number} */a1 = a[1]; // b
      var /** @type {number} */a2 = a[2]; // c
      var /** @type {number} */a3 = a[3]; // d
      var /** @type {number} */a4 = a[4]; // tx
      var /** @type {number} */a5 = a[5]; // ty

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

  }, {
    key: "identity",
    value: function identity() {
      return this.set(1, 0, 0, 1, 0, 0);
    }

    /**
     * Concatenates a given matrix with the current one.
     *
     * @param  {Matrix} b The matrix to be concatenated.
     * @return {Matrix}   This.
     */

  }, {
    key: "prepend",
    value: function prepend(b) {
      var a = this._matrix;
      var bv = b._matrix;

      var /** @type {number} */a0 = a[0]; // a
      var /** @type {number} */a1 = a[1]; // b
      var /** @type {number} */a2 = a[2]; // c
      var /** @type {number} */a3 = a[3]; // d
      var /** @type {number} */a4 = a[4]; // tx
      var /** @type {number} */a5 = a[5]; // ty

      var /** @type {number} */b0 = bv[0]; // a
      var /** @type {number} */b1 = bv[1]; // b
      var /** @type {number} */b2 = bv[2]; // c
      var /** @type {number} */b3 = bv[3]; // d
      var /** @type {number} */b4 = bv[4]; // tx
      var /** @type {number} */b5 = bv[5]; // ty

      var a11 = a0 * b0 + a1 * b2;
      a[1] = a0 * b1 + a1 * b3;
      a[0] = a11;

      var c11 = a2 * b0 + a3 * b2;
      a[3] = a2 * b1 + a3 * b3;
      a[2] = c11;

      var tx11 = a4 * b0 + a5 * b2 + b4;
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

  }, {
    key: "append",
    value: function append(b) {
      var a = this._matrix;
      var bv = b._matrix;

      var /** @type {number} */a0 = a[0];
      var /** @type {number} */a1 = a[1];
      var /** @type {number} */a2 = a[2];
      var /** @type {number} */a3 = a[3];
      var /** @type {number} */a4 = a[4];
      var /** @type {number} */a5 = a[5];
      var /** @type {number} */b0 = bv[0];
      var /** @type {number} */b1 = bv[1];
      var /** @type {number} */b2 = bv[2];
      var /** @type {number} */b3 = bv[3];
      var /** @type {number} */b4 = bv[4];
      var /** @type {number} */b5 = bv[5];

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

  }, {
    key: "transformXY",
    value: function transformXY(x, y, outVector) {
      outVector = outVector || new Vector();
      var m = this._matrix;

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

  }, {
    key: "transformDirectionXY",
    value: function transformDirectionXY(x, y, outVector) {
      var m = this._matrix;
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

  }, {
    key: "transformVector",
    value: function transformVector(vector, outVector) {
      outVector = outVector || new Vector();
      var m = this._matrix;

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

  }, {
    key: "transformRect",
    value: function transformRect(rect, outRect) {
      outRect = outRect || new Rectangle();

      var minX = Number.MAX_VALUE;
      var maxX = -Number.MAX_VALUE;
      var minY = Number.MAX_VALUE;
      var maxY = -Number.MAX_VALUE;
      var xx = 0;
      var yy = 0;
      var tmpVector = new Vector();

      // TODO: fix dirty hack. rewrite to use rect
      //let points = [rect.x, rect.y, rect.x + rect.width, rect.y + rect.height];

      /** @type {Array<number>} */
      var points = [rect.x, rect.y, rect.x + rect.width, rect.y, rect.x, rect.y + rect.height, rect.x + rect.width, rect.y + rect.height];

      for (var i = 0; i < points.length; i += 2) {
        xx = points[i];
        yy = points[i + 1];

        this.transformXY(xx, yy, tmpVector);

        if (minX > tmpVector.x) minX = tmpVector.x;
        if (maxX < tmpVector.x) maxX = tmpVector.x;
        if (minY > tmpVector.y) minY = tmpVector.y;
        if (maxY < tmpVector.y) maxY = tmpVector.y;
      }

      outRect.set(minX, minY, maxX - minX, maxY - minY);
      return outRect;
    }

    /**
     * Inverts current matrix.
     *
     * @return {Matrix} This.
     */

  }, {
    key: "invert",
    value: function invert() {
      var a = this._matrix;

      var aa = a[0];
      var ab = a[1];
      var ac = a[2];
      var ad = a[3];
      var atx = a[4];
      var aty = a[5];

      var det = aa * ad - ab * ac;
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

  }, {
    key: "__decompose",
    value: function __decompose() {
      var m = this._matrix;
      var a = m[0];
      var b = m[1];
      var c = m[2];
      var d = m[3];
      var tx = m[4];
      var ty = m[5];

      var skewX = -Math.atan2(-c, d);
      var skewY = Math.atan2(b, a);

      var delta = Math.abs(skewX + skewY);

      var r_rotation = 0;
      var r_skewX = 0;
      var r_skewY = 0;
      var r_scaleX = 0;
      var r_scaleY = 0;
      var r_x = 0;
      var r_y = 0;

      if (delta < 0.00001) {
        r_rotation = skewY;

        if (a < 0 && d >= 0) r_rotation += r_rotation <= 0 ? Math.PI : -Math.PI;
      } else {
        r_skewX = skewX;
        r_skewY = skewY;
      }

      r_scaleX = Math.sqrt(a * a + b * b);
      r_scaleY = Math.sqrt(c * c + d * d);

      r_x = tx;
      r_y = ty;

      return [r_x, r_y, r_rotation, r_scaleX, r_scaleY, r_skewX, r_skewY];
    }

    /**
     * Clones the current matrix and returns new cloned object.
     *
     * @return {Matrix} New cloned object.
     */

  }, {
    key: "clone",
    value: function clone() {
      var m = new Matrix();
      var v = this._matrix;
      m.set(v[0], v[1], v[2], v[3], v[4], v[5]);
      return m;
    }

    /**
     * Copies values to given matrix.
     *
     * @param  {Matrix} matrix The destination matrix.
     * @return {Matrix} This.
     */

  }, {
    key: "copyTo",
    value: function copyTo(matrix) {
      var a = this._matrix;
      var b = matrix._matrix;

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

  }, {
    key: "copyFrom",
    value: function copyFrom(matrix) {
      return matrix.copyTo(this);
    }

    /**
     * Compares this matrix values with given matrix and checks if they are the same.
     *
     * @param  {Matrix} matrix                   Matrix object to compare with.
     * @param  {number} epsilon = Number.EPSILON Comparision threshold.
     * @return {boolean} True if equal.
     */

  }, {
    key: "equals",
    value: function equals(matrix) {
      var epsilon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.EPSILON;

      var a = this._matrix;
      var b = matrix._matrix;
      if (!matrix) return false;

      return Math.abs(a[0] - b[0]) < epsilon && Math.abs(a[1] - b[1]) < epsilon && Math.abs(a[2] - b[2]) < epsilon && Math.abs(a[3] - b[3]) < epsilon && Math.abs(a[4] - b[4]) < epsilon && Math.abs(a[5] - b[5]) < epsilon;
    }

    /**
     * Returns array of values representing this matrix object.
     *
     * @return {Float32Array}
     */

  }, {
    key: "value",
    get: function get() {
      return this._matrix;
    }
  }]);

  return Matrix;
}();

/**
 * @type {Matrix}
 * @nocollapse
 */


Matrix.__cache = new Matrix();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Mathematical representation of a rectangle.
 *
 * @cat geom
 */

var Rectangle = function () {
  /**
   * Creates new instance of Rectangle.
   *
   * @param  {number=} y = 0 X-component.
   * @param  {number=} x = 0 Y-component.
   * @param  {number=} w = 0 The width.
   * @param  {number=} h = 0 The height.
   */
  function Rectangle() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, Rectangle);

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


  _createClass(Rectangle, [{
    key: "set",
    value: function set(x, y, w, h) {
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

  }, {
    key: "copyFrom",
    value: function copyFrom(rect) {
      this.x = rect.x;
      this.y = rect.y;
      this.width = rect.width;
      this.height = rect.height;

      return this;
    }

    /**
     * Copies values from this rectangle into description.
     *
     * @param {Rectangle} rect The destination rect.
     *
     * @return {Rectangle} Given rect object.
     */

  }, {
    key: "copyTo",
    value: function copyTo(rect) {
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

  }, {
    key: "size",


    /**
     * Creates a new Rectangle instance with width and height equal to current
     * instance.
     *
     * @param {Vector=} outVector Resulting rect to save values in.
     *
     * @return {Vector} New Rectangle instance or `outVector` if passed.
     */
    value: function size() {
      var outVector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      outVector = outVector || new Vector();
      return outVector.set(this.width, this.height);
    }

    /**
     * Sets all components of this Rectangle to zero.
     *
     * @return {Rectangle} This.
     */

  }, {
    key: "zero",
    value: function zero() {
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

  }, {
    key: "equals",
    value: function equals(rect) {
      var epsilon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.EPSILON;

      return rect !== null && Math.abs(this.x - rect.x) < epsilon && Math.abs(this.y - rect.y) < epsilon && Math.abs(this.width - rect.width) < epsilon && Math.abs(this.height - rect.height) < epsilon;
    }

    /**
     * Checks if a given point is inside this rectangle.
     *
     * @param {number} x The x-component of a point.
     * @param {number} y The y-component of a point.
     *
     * @return {boolean} True if point is inside.
     */

  }, {
    key: "containsXY",
    value: function containsXY(x, y) {
      return x >= this.x && x <= this.right && y >= this.y && y <= this.bottom;
    }

    /**
     * Checks if a given rectangle is inside this rect.
     *
     * @param {Rectangle} rect Rectangle to check with.
     *
     * @return {boolean} True if given rectangle is inside this one.
     */

  }, {
    key: "contains",
    value: function contains(rect) {
      return rect.x >= this.x && rect.y >= this.y && rect.right <= this.right && rect.bottom <= this.bottom;
    }

    /**
     * Checks if this rect intersects with a given rectangle.
     *
     * @param {Rectangle} rect The rect to check intersection with.
     *
     * @return {boolean} True if intersects.
     */

  }, {
    key: "intersects",
    value: function intersects(rect) {
      return rect.right > this.x && rect.bottom > this.y && rect.x < this.right && rect.y < this.bottom;
    }

    /**
     * Adds two rects ]
     *
     * @param {Rectangle} toUnion A rectangle object to add to this rect.
     *
     * @return {Rectangle} New rectangle object that is the union.
     */

  }, {
    key: "union",
    value: function union(toUnion) {
      if (this.width === 0 || this.height === 0) return toUnion.clone();else if (toUnion.width === 0 || toUnion.height === 0) return this.clone();

      var x0 = this.x > toUnion.x ? toUnion.x : this.x;
      var x1 = this.right < toUnion.right ? toUnion.right : this.right;
      var y0 = this.y > toUnion.y ? toUnion.y : this.y;
      var y1 = this.bottom < toUnion.bottom ? toUnion.bottom : this.bottom;

      return new Rectangle(x0, y0, x1 - x0, y1 - y0);
    }

    /**
     * Returns volume of this Rectangle.
     *
     * @return {number}
     */

  }, {
    key: "expand",


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
    value: function expand(x, y, width, height) {
      if (this.volume === 0) return this.set(x, y, width, height);

      var cacheRight = this.right;
      var cacheBottom = this.bottom;

      if (this.x > x) {
        this.x = x;
        this.width = cacheRight - x;
      }

      if (this.y > y) {
        this.y = y;
        this.height = cacheBottom - y;
      }

      if (cacheRight < x + width) this.width = x + width - this.x;

      if (cacheBottom < y + height) this.height = y + height - this.y;

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

  }, {
    key: "inflate",
    value: function inflate() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

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

  }, {
    key: "clone",
    value: function clone() {
      return new Rectangle(this.x, this.y, this.width, this.height);
    }

    /**
     * perimeter - Description
     *
     * @return {number} Description
     */

  }, {
    key: "center",


    /**
     * Returns the center point of this rectangle.
     *
     * @param {Vector=} outVector The out-Vector to store values in.
     *
     * @return {Vector} New rectangle object.
     */
    value: function center() {
      var outVector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

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

  }, {
    key: "scale",
    value: function scale(x, y) {
      this.width *= x;
      this.height *= y;

      return this;
    }

    /**
     * Checks if rectangle has area.
     *
     * @return {boolean} True if has.
     */

  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.width === 0 && this.height === 0;
    }
  }, {
    key: "left",
    get: function get() {
      return this.x;
    }

    /**
     * @ignore
     *
     * @param {number} keft
     */
    ,
    set: function set(left) {
      this.x = left;
    }

    /**
     * Get/Sets the rightmost point of this rectangle.
     *
     * @return {number}
     */

  }, {
    key: "right",
    get: function get() {
      return this.x + this.width;
    }

    /**
     * @ignore
     *
     * @param {number} right
     */
    ,
    set: function set(right) {
      this.x = right - this.width;
    }

    /**
     * Get/Sets the topmost point of this rectangle.
     *
     * @return {number}
     */

  }, {
    key: "top",
    get: function get() {
      return this.y;
    }

    /**
     * @ignore
     *
     * @param {number} top
     */
    ,
    set: function set(top) {
      this.y = top;
    }

    /**
     * Get/Sets the bottommost point of this rectangle.
     *
     * @return {number} Description
     */

  }, {
    key: "bottom",
    get: function get() {
      return this.y + this.height;
    }

    /**
     * @ignore
     *
     * @param {number} bottom
     */
    ,
    set: function set(bottom) {
      this.y = bottom - this.height;
    }

    /**
     * Get/Sets the top left point for this rectangle.
     *
     * @return {Vector}
     */

  }, {
    key: "topLeft",
    get: function get() {
      return new Vector(this.x, this.y);
    }

    /**
     * @ignore
     *
     * @param {Vector} vector
     */
    ,
    set: function set(vector) {
      this.left = vector.x;
      this.top = vector.y;
    }

    /**
     * Get/Sets the top right point for this rectangle.
     *
     * @return {Vector} Description
     */

  }, {
    key: "topRight",
    get: function get() {
      return new Vector(this.right, this.y);
    }

    /**
     * @ignore
     *
     * @param {Vector} vector
     */
    ,
    set: function set(vector) {
      this.right = vector.x;
      this.top = vector.y;
    }

    /**
     * Get/Sets the top left point for this rectangle.
     *
     * @return {Vector} Description
     */

  }, {
    key: "bottomRight",
    get: function get() {
      return new Vector(this.right, this.bottom);
    }

    /**
     * @ignore
     *
     * @param {Vector} vector
     */
    ,
    set: function set(vector) {
      this.right = vector.x;
      this.bottom = vector.y;
    }

    /**
     * Get/Sets the top left point for this rectangle.
     *
     * @return {Vector} Description
     */

  }, {
    key: "bottomLeft",
    get: function get() {
      return new Vector(this.right, this.bottom);
    }

    /**
     * @ignore
     *
     * @param {Vector} vector
     */
    ,
    set: function set(vector) {
      this.left = vector.x;
      this.bottom = vector.y;
    }
  }, {
    key: "volume",
    get: function get() {
      return this.width * this.height;
    }
  }, {
    key: "perimeter",
    get: function get() {
      return 2 * (this.width + this.height);
    }
  }, {
    key: "lines",
    get: function get() {
      // todo
      return [new Line(this.topLeft, this.topRight), new Line(this.topRight, this.bottomRight), new Line(this.bottomRight, this.bottomLeft), new Line(this.bottomLeft, this.topLeft)];
    }
  }]);

  return Rectangle;
}();

/**
 * @ignore
 * @type {Rectangle}
 * @nocollapse
 */


Rectangle.__cache = new Rectangle();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Mathematical representation of a circle.
 *
 * @cat geom
 */

var Circle = function () {
  /**
   * Creates new Circle instance.
   * 
   * @param  {number=} x = 0 Position x.
   * @param  {number=} y = 0 Position y.
   * @param  {number=} r = 1 Radius.
   */
  function Circle() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    _classCallCheck(this, Circle);

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


  _createClass(Circle, [{
    key: "set",
    value: function set(x, y, r) {
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

  }, {
    key: "clone",
    value: function clone() {
      return new Circle(this.x, this.y, this.r);
    }

    /**
     * Copy this properties to another circle.
     *
     * @param {Circle} circle Object to copy to.
     *
     * @return {Circle} Passed circle.
     */

  }, {
    key: "copyTo",
    value: function copyTo(circle) {
      return circle.set(this.x, this.y, this.r);
    }

    /**
     * Copy another circle properties to this.
     *
     * @param {Circle} circle Object to copy from.
     *
     * @return {Circle} This circle.
     */

  }, {
    key: "copyFrom",
    value: function copyFrom(circle) {
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

  }, {
    key: "equals",
    value: function equals(circle) {
      var epsilon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.EPSILON;

      return circle !== null && Math.abs(this.x - circle.x) < epsilon && Math.abs(this.y - circle.y) < epsilon && Math.abs(this.r - circle.r) < epsilon;
    }

    /**
     * Shows whether point is in circle.
     *
     * @param {number} x Point position x.
     * @param {number} y Point position y.
     *
     * @return {boolean} True if circle contains point.
     */

  }, {
    key: "containsXY",
    value: function containsXY(x, y) {
      return this.contains(new Vector(x, y));
    }

    /**
     * Shows whether point is in circle.
     *
     * @param {Vector} vector Point to check.
     *
     * @return {boolean} True if circle contains point.
     */

  }, {
    key: "contains",
    value: function contains(vector) {
      return new Vector(this.x, this.y).subtract(vector).length() <= this.r;
    }

    /**
     * Finds left X position.
     *
     * @return {number} Left X position.
     */

  }, {
    key: "zero",


    /**
     * Resets all values to zero.
     *
     * @return {Circle} Returns this.
     */
    value: function zero() {
      return this.set(0, 0, 0);
    }

    /**
     * Shows whether this circle intersects another.
     *
     * @param {Circle} circle Circle to check.
     *
     * @return {boolean} True if intersects.
     */

  }, {
    key: "intersects",
    value: function intersects(circle) {
      var d = new Vector(this.x, this.y).distance(new Vector(circle.x, circle.y));
      return d <= this.r + circle.r && d >= this.r - circle.r;
    }

    /**
     * Shows whether this circle collide with another.
     *
     * @param {Circle} circle Circle to check.
     *
     * @return {boolean} True if collide.
     */

  }, {
    key: "collide",
    value: function collide(circle) {
      var d = new Vector(this.x, this.y).distance(new Vector(circle.x, circle.y));
      return d <= this.r + circle.r;
    }

    /**
     * overlap - Shows whether this circle overlap another.
     *
     * @param {Circle} circle Circle to check.
     *
     * @return {boolean} True if overlap.
     */

  }, {
    key: "overlap",
    value: function overlap(circle) {
      if (this.r < circle.r) {
        return false;
      }

      var d = new Vector(this.x, this.y).distance(new Vector(circle.x, circle.y));
      return d <= this.r - circle.r;
    }

    /**
     * Returns area of this circle.
     *
     * @return {number} area.
     */

  }, {
    key: "center",


    /**
     * Represents center as vector.
     *
     * @param {Vector=} outVector Object for result.
     *
     * @return {Vector} Center point.
     */
    value: function center() {
      var outVector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      outVector = outVector || new Vector();
      return outVector.set(this.x, this.y);
    }
  }, {
    key: "left",
    get: function get() {
      return this.x - this.r;
    }

    /**
     * Finds right X position.
     *
     * @return {number} Right X position.
     */

  }, {
    key: "right",
    get: function get() {
      return this.x + this.r;
    }

    /**
     * Finds top Y position.
     *
     * @return {number} Top Y position.
     */

  }, {
    key: "top",
    get: function get() {
      return this.y - this.r;
    }

    /**
     * Finds bottom Y position.
     *
     * @return {number} Bottom Y position.
     */

  }, {
    key: "bottom",
    get: function get() {
      return this.y + this.r;
    }

    /**
     * Returns top point of this circle.
     *
     * @return {Vector}
     */

  }, {
    key: "topPoint",
    get: function get() {
      return new Vector(this.x, this.top);
    }

    /**
     * Returns bottom point of this circle.
     *
     * @return {Vector}
     */

  }, {
    key: "bottomPoint",
    get: function get() {
      return new Vector(this.x, this.bottom);
    }
  }, {
    key: "volume",
    get: function get() {
      return Math.PI * this.r * this.r;
    }

    /**
     * Returns perimeter of this circle.
     *
     * @return {number} perimeter.
     */

  }, {
    key: "perimeter",
    get: function get() {
      return 2 * Math.PI * this.r;
    }
  }]);

  return Circle;
}();

/** @type {Circle}
 * @nocollapse
 */


Circle.__cache = new Circle();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Mathematical representation of a bezier curve.
 *
 * @cat geom
 */

var Line = function () {
  /**
   * Creates new Line instance.
   * @param  {Vector} start Start point.
   * @param  {Vector} end End point.
   */
  function Line(start, end) {
    _classCallCheck(this, Line);

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


  _createClass(Line, [{
    key: 'set',
    value: function set(start, end) {
      this.start = start;
      this.end = end;

      return this;
    }

    /**
     * clone - Clones this line.
     *
     * @return {Line} Created line.
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new Line(this.start.clone(), this.end.clone());
    }

    /**
     * copyTo - Copy this properties to another line.
     *
     * @param {Line} line Object to copy to.
     *
     * @return {Line} Passed line.
     */

  }, {
    key: 'copyTo',
    value: function copyTo(line) {
      return line.set(this.start.clone(), this.end.clone());
    }

    /**
     * copyFrom - Copy another line properties to this.
     *
     * @param {Line} line Object to copy from.
     *
     * @return {Line} This circle.
     */

  }, {
    key: 'copyFrom',
    value: function copyFrom(line) {
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

  }, {
    key: 'equals',
    value: function equals(line) {
      var epsilon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.EPSILON;

      return this.start.equals(line.start, epsilon) && this.end.equals(line.end, epsilon) || this.start.equals(line.end, epsilon) && this.end.equals(line.start, epsilon);
    }

    /**
     * left - Finds left X position.
     *
     * @return {number} Left X position.
     */

  }, {
    key: 'reverse',


    /**
     * reverse - Replace line start and end points.
     *
     * @return {Line} This line.
     */
    value: function reverse() {
      var start = this.start;
      this.start = this.end;
      this.end = start;

      return this;
    }

    /**
     * normalize - Change line's length to one. Moves end point.
     *
     * @return {Line} This line.
     */

  }, {
    key: 'normalize',
    value: function normalize() {
      this.end.subtract(this.start).normalize().add(this.start);

      return this;
    }

    /**
     * scale - Change line's length to scaled. Moves end point.
     *
     * @return {Line} This line.
     */

  }, {
    key: 'scale',
    value: function scale(multyplier) {
      this.end.subtract(this.start).multiplyScalar(multyplier).add(this.start);

      return this;
    }

    /**
     * zero - Description
     *
     * @return {Line} Description
     */

  }, {
    key: 'zero',
    value: function zero() {
      return this.set(new Vector(), new Vector());
    }

    /**
     * length - Length of this line.
     *
     * @return {number} length.
     */

  }, {
    key: 'length',
    value: function length() {
      return this.start.distance(this.end);
    }

    /**
     * center - Represents center as vector.
     *
     * @param {Vector=} outVector Object for result.
     *
     * @return {Vector} Center point.
     */

  }, {
    key: 'center',
    value: function center() {
      var outVector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      outVector = outVector || new Vector();
      return outVector.set((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);
    }

    /**
     * type - Description
     *
     * @return {string} Description
     */

  }, {
    key: 'containsXY',


    /**
     * containsXY - Shows whether point is on line.
     *
     * @param {number} x Point position x.
     * @param {number} y Point position y.
     *
     * @return {boolean} True if line contains point.
     */
    value: function containsXY(x, y) {
      return this.contains(new Vector(x, y));
    }

    /**
     * contains - Shows whether point is on line.
     *
     * @param {Vector} vector Point to check.
     *
     * @return {boolean} True if line contains point.
     */

  }, {
    key: 'contains',
    value: function contains(vector) {
      return this.start.distance(vector) + this.end.distance(vector) === this.length();
    }

    /**
     * intersects - Shows whether this line intersects another.
     *
     * @param {Line} line Line to check.
     *
     * @return {boolean} True if intersects.
     */

  }, {
    key: 'intersects',
    value: function intersects(line) {
      var start1 = this.start;
      var end1 = this.end;
      var start2 = line.start;
      var end2 = line.end;

      var denominator = (end2.y - start2.y) * (end1.x - start1.x) - (end2.x - start2.x) * (end1.y - start1.y);

      if (denominator === 0) {
        return false;
      }

      var a = start1.y - start2.y;
      var b = start1.x - start2.x;
      var numerator1 = (end2.x - start2.x) * a - (end2.y - start2.y) * b;
      var numerator2 = (end1.x - start1.x) * a - (end1.y - start1.y) * b;
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

  }, {
    key: 'intersectsCircle',
    value: function intersectsCircle(circle) {
      var start = this.start;
      var end = this.end;

      if (circle.contains(start) || circle.contains(end)) {
        return true;
      }

      var distance = start.distance(end);
      var directionX = (end.x - start.x) / distance;
      var directionY = (end.y - start.y) / distance;

      var t = directionX * (circle.x - start.x) + directionY * (circle.y - start.y);

      var nearest = new Vector(t * directionX + start.x, t * directionY + start.y);
      var nearestDistance = nearest.distance(new Vector(circle.x, circle.y));

      if (nearestDistance < circle.r) {
        var dt = Math.sqrt(Math.pow(circle.r, 2) - Math.pow(nearestDistance, 2));

        var x1 = ((t - dt) * directionX + start.x).toFixed(15);
        var y1 = ((t - dt) * directionY + start.y).toFixed(15);
        var x2 = ((t + dt) * directionX + start.x).toFixed(15);
        var y2 = ((t + dt) * directionY + start.y).toFixed(15);

        return this.__isInBoundsXY(x1, y1) || this.__isInBoundsXY(x2, y2);
      }

      return false;
    }
  }, {
    key: '__isInBoundsXY',
    value: function __isInBoundsXY(x, y) {
      var x1 = this.start.x;
      var y1 = this.start.y;
      var x2 = this.end.x;
      var y2 = this.end.y;

      return x > Math.min(x1, x2) && x < Math.max(x1, x2) && y > Math.min(y1, y2) && y < Math.max(y1, y2);
    }
  }, {
    key: 'left',
    get: function get() {
      return Math.min(this.start.x, this.end.x);
    }

    /**
     * right - Finds right X position.
     *
     * @return {number} Right X position.
     */

  }, {
    key: 'right',
    get: function get() {
      return Math.max(this.start.x, this.end.x);
    }

    /**
     * top - Finds top Y position.
     *
     * @return {number} Top Y position.
     */

  }, {
    key: 'top',
    get: function get() {
      return Math.min(this.start.y, this.end.y);
    }

    /**
     * bottom - Finds bottom Y position.
     *
     * @return {number} Bottom Y position.
     */

  }, {
    key: 'bottom',
    get: function get() {
      return Math.max(this.start.y, this.end.y);
    }
  }, {
    key: 'type',
    get: function get() {
      return 'Line';
    }
  }]);

  return Line;
}();

/** @type {Line}
 * @nocollapse
 */


Line.__cache = new Line(new Vector(), new Vector());
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @cat geom
 */

var Polygon = function () {
  /**
   * Creates new Polygon instance.
   *
   * @param  {Array<Vector>} vertices = [] Array of vertex points;
   */
  function Polygon() {
    var vertices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Polygon);

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


  _createClass(Polygon, [{
    key: 'set',
    value: function set(vertices) {
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

  }, {
    key: 'copyTo',
    value: function copyTo(polygon) {
      var len = this.mVertices.length;
      var vertices = [];

      for (var i = 0; i < len; i++) {
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

  }, {
    key: 'copyFrom',
    value: function copyFrom(polygon) {
      var polygonVertices = polygon.vertices;
      var len = polygonVertices.length;
      var vertices = [];

      for (var i = 0; i < len; i++) {
        vertices.push(polygonVertices[i].clone());
      }

      return this.set(vertices);
    }

    /**
     * clone - Clones this polygon.
     *
     * @return {Polygon} Created polygon.
     */

  }, {
    key: 'clone',
    value: function clone() {
      var thisVertices = this.mVertices;
      var len = thisVertices.length;
      var vertices = [];

      for (var i = 0; i < len; i++) {
        vertices.push(thisVertices[i].clone());
      }

      return new Polygon(vertices);
    }
  }, {
    key: 'containsXY',


    /**
     * containsXY - Shows whether point is in polygon.
     *
     * @param {number} x Point position x.
     * @param {number} y Point position y.
     *
     * @return {boolean} True if polygon contains point.
     */
    value: function containsXY(x, y) {
      return this.contains(new Vector(x, y));
    }

    /**
     * contains - Shows whether point is in polygon.
     *
     * @param {Vector} vector Point to check.
     *
     * @return {boolean} True if polygon contains point.
     */

  }, {
    key: 'contains',
    value: function contains(vector) {
      var center = this.mCenter;
      var lines = this.mLines;
      var len = lines.length;

      if (center.equals(vector)) {
        return true;
      }

      var intersectionLine = new Line(vector, center.clone());
      var intersects = 0;
      intersectionLine.scale((this.width + this.height) / intersectionLine.length());

      for (var i = 0; i < len; i++) {
        intersects += lines[i].intersects(intersectionLine) ? 1 : 0;
      }

      return intersects % 2 !== 0;
    }

    /**
     * perimeter - Perimeter of this polygon.
     *
     * @return {number} perimeter.
     */

  }, {
    key: 'collide',


    /**
     * collide - Checks collides between two polygons.
     *
     * @param {Polygon} polygon Object to check.
     *
     * @return {boolean} True if polygon collides with another polygon.
     */
    value: function collide(polygon) {
      if (!this.mBounds.intersects(polygon.bounds)) {
        return false;
      }

      var thisLines = this.mLines;
      var thisLen = thisLines.length;
      var polygonLines = polygon.lines;
      var polygonLen = polygonLines.length;

      for (var i = 0; i < thisLen; i++) {
        for (var j = 0; j < polygonLen; j++) {
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

  }, {
    key: 'collideCircle',
    value: function collideCircle(circle) {
      var bounds = this.mBounds;
      var lines = this.mLines;

      if (bounds.left > circle.right || bounds.right < circle.left || bounds.top > circle.bottom || bounds.bottom < circle.top) {
        return false;
      }

      var len = lines.length;
      for (var i = 0; i < len; i++) {
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

  }, {
    key: 'collideRectangle',
    value: function collideRectangle(rectangle) {
      if (!this.mBounds.intersects(rectangle)) {
        return false;
      }

      var thisLines = this.mLines;
      var thisLen = thisLines.length;
      var rectangleLines = rectangle.lines;
      var rectangleLen = rectangleLines.length;

      for (var i = 0; i < thisLen; i++) {
        for (var j = 0; j < rectangleLen; j++) {
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

  }, {
    key: 'overlap',
    value: function overlap(polygon) {
      if (this.mBounds.width < polygon.bounds.width || this.mBounds.height < polygon.bounds.height) {
        return false;
      }

      if (!this.contains(polygon.center)) {
        return false;
      }

      var thisLines = this.mLines;
      var thisLen = thisLines.length;
      var polygonLines = polygon.lines;
      var polygonLen = polygonLines.length;

      for (var i = 0; i < thisLen; i++) {
        for (var j = 0; j < polygonLen; j++) {
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

  }, {
    key: 'overlapCircle',
    value: function overlapCircle(circle) {
      if (!this.containsXY(circle.x, circle.y)) {
        return false;
      }

      var thisLines = this.mLines;
      var len = thisLines.length;

      for (var i = 0; i < len; i++) {
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

  }, {
    key: 'overlapRectangle',
    value: function overlapRectangle(rectangle) {
      if (!this.contains(rectangle.center())) {
        return false;
      }

      var thisLines = this.mLines;
      var thisLen = thisLines.length;
      var rectangleLines = rectangle.lines;
      var rectangleLen = rectangleLines.length;

      for (var i = 0; i < thisLen; i++) {
        for (var j = 0; j < rectangleLen; j++) {
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

  }, {
    key: 'refresh',
    value: function refresh() {
      var center = this.mCenter;
      var bounds = this.mBounds;
      var vertices = this.mVertices;
      var lines = this.mLines = [];
      center.set(0, 0);

      // bounds
      var maxX = -Number.MAX_VALUE;
      var maxY = -Number.MAX_VALUE;
      var minX = Number.MAX_VALUE;
      var minY = Number.MAX_VALUE;

      for (var i = 0; i < vertices.length; i++) {
        var vector = vertices[i];
        center.add(vector);

        // bounds
        var x = vector.x,
            y = vector.y;

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

  }, {
    key: 'refreshCenter',
    value: function refreshCenter() {
      var center = this.mCenter;
      var vertices = this.mVertices;
      var len = vertices.length;
      center.set(0, 0);

      for (var i = 0; i < len; i++) {
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

  }, {
    key: 'refreshBounds',
    value: function refreshBounds() {
      var bounds = this.mBounds;
      var vertices = this.mVertices;
      var maxX = -Number.MAX_VALUE;
      var maxY = -Number.MAX_VALUE;
      var minX = Number.MAX_VALUE;
      var minY = Number.MAX_VALUE;
      var len = vertices.length;
      var x = void 0;
      var y = void 0;

      for (var i = 0; i < len; i++) {
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

  }, {
    key: 'refreshLines',
    value: function refreshLines() {
      var vertices = this.mVertices;
      var lines = this.mLines = [];

      for (var i = 0; i < vertices.length; i += 2) {
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

  }, {
    key: 'setRotation',


    /**
     * setRotation - Sets rotation. Rotate this polygon around it center.
     *
     * @param {number} rotation Angle in radians.
     *
     * @return {Polygon} This polygon.
     */
    value: function setRotation(rotation) {
      var center = this.mCenter;
      var vertices = this.mVertices;
      var cos = Math.cos(rotation).toFixed(15);
      var sin = Math.sin(rotation).toFixed(15);

      for (var i = 0, len = vertices.length; i < len; i++) {
        var vector = vertices[i];
        vector.subtract(center).set(vector.x * cos - vector.y * sin, vector.x * sin + vector.y * cos).add(center);
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

  }, {
    key: 'setTranslation',
    value: function setTranslation(point) {
      var center = this.mCenter;
      var vertices = this.mVertices;
      var len = vertices.length;
      point.subtract(center);

      for (var i = 0; i < len; i++) {
        vertices[i].add(point);
      }

      return this.refresh();
    }
  }, {
    key: 'width',
    get: function get() {
      return this.mBounds.width;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.mBounds.height;
    }
  }, {
    key: 'perimeter',
    get: function get() {
      var thisLines = this.mLines;
      var len = thisLines.length;
      var perimeter = 0;

      for (var i = 0; i < len; i++) {
        perimeter += thisLines[i].length();
      }

      return perimeter;
    }
  }], [{
    key: 'fromPath',
    value: function fromPath(path) {
      var vertices = [];
      var path2 = path.split(' ');

      for (var i = 0; i < path2.length; i += 2) {
        vertices.push(new Vector(Number(path2[i]), Number(path2[i + 1])));
      }

      return new Polygon(vertices);
    }
  }]);

  return Polygon;
}();

/** @type {Polygon}
 * @nocollapse
 */


Polygon.__cache = new Polygon();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Mathematical representation of a bezier curve.
 *
 * @cat geom
 */

var Curve = function () {

  /**
   * Creates new Curve instance.
   */
  function Curve() {
    _classCallCheck(this, Curve);

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
   * set - Sets new points coordinates.
   *
   * @param  {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   *
   * @return {Curve} This curve.
   */


  _createClass(Curve, [{
    key: "set",
    value: function set() {
      for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
        points[_key] = arguments[_key];
      }

      this.mPoints = this.__initPoints(points);
      this.__refreshEachT();

      if (this.mBaked) this.__refreshCache();

      return this;
    }

    /**
     * baked - Returns true or false depending on baked is enabled or not.
     *
     * @return {boolean}
     */

  }, {
    key: "__initPoints",


    /**
     * __initPoints - Wides points array. Sets first point for next bezier same as last of previous.
     * @private
     * @param  {Array<number>} points Array of points coordinates.
     *
     * @return {Array<number>} Points coordinates array.
     */
    value: function __initPoints(points) {
      var res = [];

      for (var i = 6; i < points.length; i += 6) {
        res = res.concat(points.slice(i - 6, i + 2));
      }

      return res;
    }

    /**
     * __refreshCache - Refresh cache (lookup) for fast interpolations.
     *
     * @private
     *
     * @return {Curve} This curve.
     */

  }, {
    key: "__refreshCache",
    value: function __refreshCache() {
      var lookup = this.mLookup = [];
      var getFullLength = this.getFullLength();
      var points = this.mPoints;
      var pointsLen = points.length;

      for (var i = 0; i < pointsLen; i += 8) {
        var length = Curve.getLength.apply(Curve, _toConsumableArray(points.slice(i, i + 8)));
        var step = this.mStep * getFullLength / length;

        for (var t = step; t < 1; t += step) {
          lookup.push(Curve.lerp.apply(Curve, [t].concat(_toConsumableArray(points.slice(i, i + 8)))));
        }
      }

      return this;
    }

    /**
     * __refreshEachT - Refresh local interpolation kof for each bezier in curve.
     * @private
     * @return {Curve} This curve.
     */

  }, {
    key: "__refreshEachT",
    value: function __refreshEachT() {
      var points = this.mPoints;
      var eachT = this.mEachT = [];
      var pointsLen = points.length;
      var eachLength = [];

      for (var i = 0; i < pointsLen; i += 8) {
        eachLength.push(Curve.getLength.apply(Curve, _toConsumableArray(points.slice(i, i + 8))));
      }var length = this.getFullLength();
      var s = 0;
      for (var _i = 0; _i < pointsLen; _i += 8) {
        s += eachLength[_i / 8];
        eachT.push(s / length);
      }

      return this;
    }

    /**
     * lerp - Interpolates single bezier on t position.
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

  }, {
    key: "interpolate",


    /**
     * interpolate - Interpolates across whole curve.
     *
     * @param  {number} t Interpolation position (0...1).
     * @param  {Vector=} outVector
     *
     * @return {Vector} Position on curve.
     */
    value: function interpolate(t, outVector) {
      var res = outVector || new Vector();
      var lookup = this.mLookup;

      if (this.mBaked) {
        var _i2 = Math.ceil((lookup.length - 1) * t);
        var p = lookup[_i2];
        res.copyFrom(p);

        return res;
      }

      // not backed
      var mEachT = this.mEachT,
          mPoints = this.mPoints;

      var i = 0;

      while (mEachT[i] < t) {
        i++;
      }var minT = mEachT[i - 1] || 0;
      var maxT = mEachT[i];
      var bezier = mPoints.slice(i * 8, i * 8 + 8);

      return Curve.lerp.apply(Curve, [(t - minT) / (maxT - minT)].concat(_toConsumableArray(bezier), [res]));
    }

    /**
     * length - Returns single bezier length.
     *
     * @param  {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX, endY
     *
     * @return {number} Length.
     */

  }, {
    key: "getFullLength",


    /**
     * getFullLength - Returns this curve length.
     *
     * @return {number} Length.
     */
    value: function getFullLength() {
      var points = this.mPoints;
      var mPointsLen = points.length;
      var res = 0;

      for (var i = 0; i < mPointsLen; i += 8) {
        res += Curve.getLength.apply(Curve, _toConsumableArray(points.slice(i, i + 8)));
      }return res;
    }
  }, {
    key: "baked",
    get: function get() {
      return this.mBaked;
    }

    /**
     * baked - Enables or disables interpolation from cache (lookup).
     *
     * @param  {boolean} label
     */
    ,
    set: function set(label) {
      this.mBaked = label;

      if (!this.mLookup && this.mPoints) {
        this.__refreshCache();
      }
    }
  }], [{
    key: "lerp",
    value: function lerp(t, startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX, endY, outVector) {
      var u = 1 - t;
      var tt = t * t;
      var uu = u * u;
      var uuu = uu * u;
      var ttt = tt * t;

      var p = outVector || new Vector();
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
  }, {
    key: "getLength",
    value: function getLength() {
      var p0 = new Vector(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
      var p1 = new Vector(arguments.length <= 2 ? undefined : arguments[2], arguments.length <= 3 ? undefined : arguments[3]);
      var p2 = new Vector(arguments.length <= 4 ? undefined : arguments[4], arguments.length <= 5 ? undefined : arguments[5]);
      var p3 = new Vector(arguments.length <= 6 ? undefined : arguments[6], arguments.length <= 7 ? undefined : arguments[7]);

      return (p3.distance(p0) + p0.distance(p1) + p1.distance(p2) + p2.distance(p3)) / 2;
    }
  }]);

  return Curve;
}();

/** @type {Curve}
 * @nocollapse
 */


Curve.__cache = new Curve();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Utility class for logging and debugging.
 *
 * @cat core
 */

var Debug = function () {
  function Debug() {
    _classCallCheck(this, Debug);

    Debug.assert(false, 'Static class.');
  }

  _createClass(Debug, null, [{
    key: 'assert',
    value: function assert(value, message) {
      if (value === true) return;

      message = message == null ? 'Assertation failed.' : message;

      if (Debug.logOnFail) console.error('[ASSERT]', message);

      if (Debug.throwOnFail) throw new Error(message);
    }
  }, {
    key: 'log',
    value: function log() {
      var _console;

      for (var _len = arguments.length, message = Array(_len), _key = 0; _key < _len; _key++) {
        message[_key] = arguments[_key];
      }

      (_console = console).info.apply(_console, ['  %c%s', 'color: black;', 'LOG:'].concat(message));
    }
  }, {
    key: 'info',
    value: function info() {
      var _console2;

      for (var _len2 = arguments.length, message = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        message[_key2] = arguments[_key2];
      }

      (_console2 = console).info.apply(_console2, [' %c%s', 'color: #003bd2;', 'INFO:'].concat(message));
    }
  }, {
    key: 'warn',
    value: function warn() {
      var _console3;

      for (var _len3 = arguments.length, message = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        message[_key3] = arguments[_key3];
      }

      (_console3 = console).info.apply(_console3, [' %c%s', 'color: #f67400;', 'WARN:'].concat(message));
    }
  }, {
    key: 'error',
    value: function error() {
      var _console4;

      for (var _len4 = arguments.length, message = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        message[_key4] = arguments[_key4];
      }

      (_console4 = console).info.apply(_console4, ['%c%s', 'color: #d50000;', 'ERROR:'].concat(message));
    }
  }]);

  return Debug;
}();

Debug.throwOnFail = false;
Debug.logOnFail = true;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The MessageDispatcher class is the base class for all classes that posts messages.
 *
 * @cat core
 * @unrestricted
 */

var MessageDispatcher = function () {
  function MessageDispatcher() {
    _classCallCheck(this, MessageDispatcher);

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


  _createClass(MessageDispatcher, [{
    key: 'on',
    value: function on(name, callback) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      Debug.assert(name !== null, 'name cannot be null.');
      Debug.assert(callback !== null, 'callback cannot be null.');

      // TODO: refactor, expore dispatching provider
      var filterIx = name.indexOf('@');
      if (filterIx !== -1) {
        // global handler

        var pureName = name.substring(0, filterIx);
        var pathMask = name.substring(filterIx + 1);

        //console.log(pureName, pathMask);

        if (MessageDispatcher.mGlobalHandlers.hasOwnProperty(pureName) === false) MessageDispatcher.mGlobalHandlers[pureName] = [];

        var _dispatchers = MessageDispatcher.mGlobalHandlers[pureName];
        for (var i = 0; i < _dispatchers.length; i++) {
          if (_dispatchers[i].callback === callback) return;
        }_dispatchers.push({
          callback: callback,
          context: context,
          pathMask: pathMask
        });

        return;
      }

      if (this.mListeners === null) this.mListeners = {};

      if (this.mListeners.hasOwnProperty(name) === false) this.mListeners[name] = [];

      var dispatchers = /** @type {Array<{callback: Function, context}>} */this.mListeners[name];

      for (var _i = 0; _i < dispatchers.length; _i++) {
        if (dispatchers[_i].callback === callback) return;
      }dispatchers.push({
        callback: callback,
        context: context
      });
    }

    /**
     * Removes listener
     *
     * @param {string} name            Description
     * @param {Function=} [callback=null] Description
     *
     * @return {void} Description
     */

  }, {
    key: 'removeOn',
    value: function removeOn(name) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (name === null || name.length === 0) throw new Error('Name cannot be null.');

      if (this.mListeners === null) return;

      var dispatchers = /** @type {Array<{callback: Function, context}>} */this.mListeners[name];

      if (dispatchers === undefined) return;

      if (callback === null) {
        dispatchers.splice(0, dispatchers.length);
        return;
      }

      for (var i = dispatchers.length; i--;) {
        if (dispatchers[i].callback === callback) {
          dispatchers.splice(i, 1);
          return;
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

  }, {
    key: 'post',
    value: function post(name) {
      // TODO: add wildcard support and name mask annotation support
      Debug.assert(name !== null, 'name cannot be null.');
      // if (name === null || name.length === 0)
      //   throw new Error('Name cannot be null.');

      var message = this.__parseMessage(this, name);

      // TODO: o'really 62?
      var isGameObject = this instanceof GameObject;
      if (message.mDirection !== 'none' && isGameObject === false) throw new Error('Dispatching not direct messages are not allowed on non Game Objects.');

      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      if (message.mDirection === 'none') {
        this.__invoke.apply(this, [this, message].concat(params));
        this.__invokeGlobal.apply(this, [this, message].concat(params));
      } else if (message.mDirection === 'down') {
        message.mOrigin = /** @type {GameObject} */this.root;

        if (message.mSibblings === true) {
          var _message$mOrigin;

          this.__sendGlobal.apply(this, [this, message, null].concat(params));
          (_message$mOrigin = message.mOrigin).__invokeGlobal.apply(_message$mOrigin, [this, message].concat(params));
        } else this.__sendBubbles.apply(this, [this, message, false].concat(params));
      } else if (message.mDirection === 'up') {
        this.__sendBubbles.apply(this, [this, message, true].concat(params));
      } else {
        throw new Error('Unknown message type.');
      }
    }

    /**
     * __sendBubbles - Description
     *
     * @private
     * @param {*}  sender  Description
     * @param {string}  message Description
     * @param {boolean}  toTop   Description
     * @param {...*} params  Description
     *
     * @return {void} Description
     */

  }, {
    key: '__sendBubbles',
    value: function __sendBubbles(sender, message, toTop) {
      var _message$sender;

      message.mOrigin = toTop === true ? this : /** @type {GameObject} */this.root;

      var list = [this];

      var current = /** @type {GameObject} */this;
      while (current.parent !== null) {
        list.push(current.parent);
        current = current.parent;
      }

      for (var _len2 = arguments.length, params = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        params[_key2 - 3] = arguments[_key2];
      }

      if (toTop) {
        for (var i = 0; i < list.length; i++) {
          var dispatcher = /** @type {GameObject} */list[i];
          dispatcher.__invoke.apply(dispatcher, [sender, message].concat(params));
        }
      } else {
        for (var _i2 = list.length - 1; _i2 >= 0; _i2--) {
          var _dispatcher = /** @type {GameObject} */list[_i2];
          _dispatcher.__invoke.apply(_dispatcher, [sender, message].concat(params));
        }
      }

      (_message$sender = message.sender).__invokeGlobal.apply(_message$sender, [message.sender, message].concat(params));
    }

    /**
     * __sendGlobal - Description
     *
     * @private
     * @param {*}  sender  Description
     * @param {Message}  message Description
     * @param {GameObject=}  origin  Description
     * @param {...*} params  Description
     *
     * @return {void} Description
     */

  }, {
    key: '__sendGlobal',
    value: function __sendGlobal(sender, message, origin) {
      var _origin;

      if (origin === null) origin = /** @type {GameObject} */message.mOrigin;

      for (var _len3 = arguments.length, params = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
        params[_key3 - 3] = arguments[_key3];
      }

      (_origin = origin).__invoke.apply(_origin, [sender, message].concat(params));

      for (var i = 0; i < origin.numChildren; i++) {
        var child = origin.getChildAt(i);
        child.__sendGlobal.apply(child, [sender, message, child].concat(params));
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

  }, {
    key: '__invoke',
    value: function __invoke(sender, message) {
      if (this.mListeners === null) return;

      var dispatchers = /** @type {Array<{callback: Function, context}>} */this.mListeners[message.mName];

      if (dispatchers === undefined || dispatchers.length === 0) return;

      if (message.mPathMask !== null) {
        var inPath = this.__checkPath(this.path, message.mPathMask);
        if (!inPath) return;
      }

      // no path filter found - just invoke it
      var clone = dispatchers.slice(0);

      for (var _len4 = arguments.length, params = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        params[_key4 - 2] = arguments[_key4];
      }

      for (var i = 0; i < clone.length; i++) {
        var _dispatcher$callback;

        var dispatcher = /** @type {{callback: Function, context: *}} */clone[i];
        message.mTarget = this;
        (_dispatcher$callback = dispatcher.callback).call.apply(_dispatcher$callback, [dispatcher.context, message].concat(params));
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

  }, {
    key: '__invokeGlobal',
    value: function __invokeGlobal(sender, message) {
      var dispatchers = MessageDispatcher.mGlobalHandlers[message.mName];

      if (dispatchers === undefined || dispatchers.length === 0) return;

      var clone = dispatchers.slice(0);

      for (var _len5 = arguments.length, params = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        params[_key5 - 2] = arguments[_key5];
      }

      for (var i = 0; i < clone.length; i++) {
        var _dispatcher$callback2;

        var dispatcher = /** @type {{callback: Function, context: *}} */clone[i];

        if (!this.__checkPath(sender.path, dispatcher.pathMask)) continue;

        message.mTarget = this;
        (_dispatcher$callback2 = dispatcher.callback).call.apply(_dispatcher$callback2, [dispatcher.context, message].concat(params));
      }
    }

    /**
     * @private
     * @param {string} path
     * @param {string} pattern
     *
     * @return {boolean}
     */

  }, {
    key: '__checkPath',
    value: function __checkPath(path, pathMask) {
      if (path == null || pathMask == null) return false;

      if (path === pathMask) return true;

      if (pathMask.indexOf('*') === -1) return path === pathMask;else return new RegExp("^" + pathMask.split("*").join(".*") + "$").test(path);
    }

    // TODO: parse exception path'ses like: ~tatata@@@omg####imnotidiout###@@~~
    /**
     * __parseMessage - Description
     *
     * @private
     * @param {*} sender Description
     * @param {string} info   Description
     *
     * @return {Message} Description
     */

  }, {
    key: '__parseMessage',
    value: function __parseMessage(sender, info) {
      // TODO: make message pool... this type of objects shall not be
      // but dont forget to take care about cancel property

      // EXAMPLES:
      //  this.post('clicked', data); // Sends to all listeners of this
      //  this.post('~clicked', data); // Sends to all listeners of this and to each parent of this object
      //  this.post('clicked@mySprite'); // From top to bottom looking for mySprite
      //  this.post('~clicked@mySprite'); // From this to top over each parent looks for mySprite
      //  this.post('clicked@mySprite#ColliderComponent'); // message to a component with type of ColliderComponent
      //  this.post('~clicked@mySprite#ColliderComponent');

      // DIRECTIONS
      // clicked - none, direct
      // ~clicked - up, bubbling
      // clicked@ - down starting from root, with no filter to everyone
      // clicked@mySpriter - down with 'mySprite' filter
      // ~clicked@ - inversed bubbling starting from the root, ending at this

      var result = new Message();
      result.mSender = sender;
      result.mDirection = 'none';
      result.mSibblings = true;
      result.mPathMask = null;
      result.mComponentMask = null;

      if (info.charAt(0) === '~') {
        result.mSibblings = false;
        result.mDirection = 'up';
      }

      var ixAt = info.indexOf('@');
      var ixHash = info.indexOf('#');

      if (ixAt === -1 && ixHash === -1) {
        result.mSibblings = false;
        result.mName = info.substr(result.mDirection === 'up' ? 1 : 0);
        return result;
      }

      result.mDirection = 'down';

      if (ixHash === -1) {
        // we got no hash but we have a dog
        result.mName = info.substring(result.mSibblings ? 0 : 1, ixAt);

        if (info.length === ixAt + 1) result.mPathMask = null;else result.mPathMask = info.substring(ixAt + 1);

        return result;
      } else {
        if (ixAt !== -1) {
          result.mPathMask = info.substring(ixAt + 1, ixHash);
          result.mName = info.substring(result.mSibblings ? 0 : 1, ixAt);
        } else {
          result.mName = info.substring(result.mSibblings ? 0 : 1, ixHash);
        }

        if (info.length === ixHash + 1) result.mComponentMask = null;else result.mComponentMask = info.substring(ixHash + 1);

        return result;
      }
    }
  }]);

  return MessageDispatcher;
}();

MessageDispatcher.mGlobalHandlers = {};

var Message = function () {
  function Message() {
    _classCallCheck(this, Message);

    /** @type {*} */
    this.mSender = null;

    /** @type {string} */
    this.mName;

    /** @type {string|null} */
    this.mPathMask = null;

    /** @type {string|null} */
    this.mComponentMask = null;

    /** @type {string} */
    this.mDirection = 'none';

    /** @type {boolean} */
    this.mSibblings = false;

    /** @type {Object} */
    this.mOrigin = null;

    /** @type {Object} */
    this.mTarget = null;

    /** @type {boolean} */
    this.mCanceled = false;
  }

  /**
   * sender - Who send the message
   *
   * @return {*} Description
   */


  _createClass(Message, [{
    key: 'cancel',


    /**
     * cancel - Stops propagation of the message.
     *
     * @return {void}
     */
    value: function cancel() {
      this.mCanceled = true;
    }

    /**
     * canceled - True/False if
     *
     * @return {boolean}
     */

  }, {
    key: 'sender',
    get: function get() {
      return this.mSender;
    }

    /**
     * name - The name of the message
     *
     * @return {string}
     */

  }, {
    key: 'name',
    get: function get() {
      return this.mName;
    }

    /**
     * direction - direction in what message was sent. Can be 'none', 'up' and 'down'.
     *
     * @return {string}
     */

  }, {
    key: 'direction',
    get: function get() {
      return this.mDirection;
    }

    /**
     * sibblings - Indicates if sibblings should be included into dispatching process.
     *
     * @return {boolean} Description
     */

  }, {
    key: 'sibblings',
    get: function get() {
      return this.mSibblings;
    }

    /**
     * pathMask - The GameObject.name mask string if was used.
     *
     * @return {string|null} Description
     */

  }, {
    key: 'pathMask',
    get: function get() {
      return this.mPathMask;
    }

    /**
     * componentMask - Component mask string if was used.
     *
     * @return {string|null}
     */

  }, {
    key: 'componentMask',
    get: function get() {
      return this.mComponentMask;
    }

    /**
     * origin - The original sender of a message.
     *
     * @return {*|null}
     */

  }, {
    key: 'origin',
    get: function get() {
      return this.mOrigin;
    }

    /**
     * target - The destination object for this message.
     *
     * @return {*|null}
     */

  }, {
    key: 'target',
    get: function get() {
      return this.mTarget;
    }
  }, {
    key: 'canceled',
    get: function get() {
      return this.mCanceled;
    }
  }], [{
    key: 'PROGRESS',
    get: function get() {
      return 'progress';
    }
  }, {
    key: 'COMPLETE',
    get: function get() {
      return 'complete';
    }
  }]);

  return Message;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides time related methods.
 *
 * @cat core
 * @static
 */

var Time = function () {
  function Time() {
    _classCallCheck(this, Time);
  }

  _createClass(Time, null, [{
    key: 'time',
    get: function get() {
      return Time.mTime;
    }
  }, {
    key: 'dt',
    get: function get() {
      return Time.mDeltaTime;
    }
  }, {
    key: 'scale',
    get: function get() {
      return Time.mScale;
    },
    set: function set(value) {
      Debug.assert(value >= 0, 'Time.scale must be >= 0.');

      Time.mScale = value;
    }
  }]);

  return Time;
}();

/** @type {number} */


Time.mTime = 0;

/** @type {number} */
Time.mDeltaTime = 0;

/** @type {number} */
Time.mScale = 1;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Base class for custom systems. System is used to listen scene changes.
 *
 * @cat core
 * @extends MessageDispatcher
 */

var System = function (_MessageDispatcher) {
  _inherits(System, _MessageDispatcher);

  function System() {
    _classCallCheck(this, System);

    return _possibleConstructorReturn(this, (System.__proto__ || Object.getPrototypeOf(System)).call(this));
  }

  /**
   * onFixedUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */


  _createClass(System, [{
    key: "onFixedUpdate",
    value: function onFixedUpdate(dt) {}

    /**
     * onUpdate - Description
     *
     * @param {number} dt Description
     * @param {number} t Description
     *
     * @return {void} Description
     */

  }, {
    key: "onUpdate",
    value: function onUpdate(dt, t) {}

    /**
     * onPostUpdate - Description
     *
     * @param {number} dt Description
     * @param {number} t Description
     *
     * @return {void} Description
     */

  }, {
    key: "onPostUpdate",
    value: function onPostUpdate(dt, t) {}

    /**
     * onChildrenAdded - Description
     *
     * @param {GameObject} child Description
     *
     * @return {void} Description
     */

  }, {
    key: "onChildrenAdded",
    value: function onChildrenAdded(child) {}

    /**
     * onChildrenRemoved - Description
     *
     * @param {GameObject} child Description
     *
     * @return {void} Description
     */

  }, {
    key: "onChildrenRemoved",
    value: function onChildrenRemoved(child) {}

    /**
     * onComponentAdded - Description
     *
     * @param {GameObject} child     Description
     * @param {Component} component Description
     *
     * @return {void} Description
     */

  }, {
    key: "onComponentAdded",
    value: function onComponentAdded(child, component) {}

    /**
     * onComponentRemoved - Description
     *
     * @param {GameObject} child     Description
     * @param {Component} component Description
     *
     * @return {void} Description
     */

  }, {
    key: "onComponentRemoved",
    value: function onComponentRemoved(child, component) {}
  }]);

  return System;
}(MessageDispatcher);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Manages viewport, handles DOM container resize events and updates internal data.
 *
 * @cat core
 * @fires resize
 * @extends MessageDispatcher
 */

var Viewport = function (_MessageDispatcher) {
  _inherits(Viewport, _MessageDispatcher);

  /**
   * constructor
   * @param {HTMLElement} containerElement
   * @return {void}
   */
  function Viewport(containerElement) {
    _classCallCheck(this, Viewport);

    /** @type {HTMLElement} */
    var _this = _possibleConstructorReturn(this, (Viewport.__proto__ || Object.getPrototypeOf(Viewport)).call(this));

    _this.mContainerElement = containerElement;

    _this.mContainerElement.style.userSelect = 'none';
    _this.mContainerElement.style.touchAction = 'none';
    _this.mContainerElement.style.overflow = 'hidden';
    _this.mContainerElement.style.cursor = 'auto';
    _this.mContainerElement.style.WebkitTapHighlightColor = 'rgba(0, 0, 0, 0)';

    var size = _this.mContainerElement.getBoundingClientRect();

    /** @type {Rectangle} */
    _this.mSize = new Rectangle(size.left, size.top, size.width, size.height);

    window.addEventListener('resize', function (x) {
      return _this.__onResize();
    });
    return _this;
  }

  _createClass(Viewport, [{
    key: '__onResize',
    value: function __onResize() {
      var size = this.mContainerElement.getBoundingClientRect();
      this.mSize = new Rectangle(size.left, size.top, size.width, size.height);

      this.post('resize', this.mSize);
    }

    /**
     * size - Returns the size of a viewport.
     * @return {Rectangle}
     */

  }, {
    key: 'size',
    get: function get() {
      return this.mSize;
    }

    /**
     * nativeDOM - Retruns the HTML container element the engine runs in.
     * @return {Element}
     */

  }, {
    key: 'nativeDOM',
    get: function get() {
      return this.mContainerElement;
    }

    // TODO: dispose, remove resize event

  }]);

  return Viewport;
}(MessageDispatcher);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A base class for custom components.
 *
 * @cat core
 * @unrestricted
 * @extends MessageDispatcher
 */

var Component = function (_MessageDispatcher) {
  _inherits(Component, _MessageDispatcher);

  /**
   * Creates new Component instance.
   */
  function Component() {
    _classCallCheck(this, Component);

    /**
     * @private
     * @type {number}
     */
    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

    _this.mId = ++GameObject.ID;

    /**
     * @private
     * @type {GameObject|null}
     */
    _this.gameObject = null;

    /**
     * @private
     * @type {boolean}
     */
    _this.mAdded = false;
    return _this;
  }

  /**
   * Called when attached to GameObject.
   *
   * @protected
   * @param  {GameObject} gameObject The owner of this component.
   * @return {void}
   */


  _createClass(Component, [{
    key: "onAdded",
    value: function onAdded(gameObject) {}

    /**
     * Called when detached from GameObject.
     *
     * @protected
     * @param  {GameObject} gameObject The owner of this component.
     * @return {void}
     */

  }, {
    key: "onRemoved",
    value: function onRemoved(gameObject) {}

    /**
     * Called at every fixed frame update.
     * @protected
     * @param  {number} dt Amount of seconds since the last update.
     * @return {void}
     */

  }, {
    key: "onFixedUpdate",
    value: function onFixedUpdate(dt) {}

    /**
     * Called at every engine update.
     * @protected
     * @param  {number} dt Amount of seconds since the last update.
     * @return {void}
     */

  }, {
    key: "onUpdate",
    value: function onUpdate(dt) {}

    /**
     * Called after all updates have been executed.
     * @protected
     * @param  {number} dt Amount of seconds since the last update.
     * @return {void}
     */

  }, {
    key: "onPostUpdate",
    value: function onPostUpdate(dt) {}

    // TODO: finish

  }, {
    key: "dispose",
    value: function dispose() {}

    // TODO: finish

    /**
     * Detaches this Component from its parent GameObject.
     * @returns {void}
     */

  }, {
    key: "removeFromParent",
    value: function removeFromParent() {
      if (this.gameObject === null) return;

      this.gameObject.removeComponent(this);
    }
  }]);

  return Component;
}(MessageDispatcher);

/** @type {number}
 * @nocollapse
 */


Component.ID = 0;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * GameObject - Base class for all black game objects.
 *
 * @cat core
 * @unrestricted
 * @extends MessageDispatcher
 */

var GameObject = function (_MessageDispatcher) {
  _inherits(GameObject, _MessageDispatcher);

  /**
   * Creates new instance of GameObject.
   */
  function GameObject() {
    _classCallCheck(this, GameObject);

    /**
     * @private
     * @type {number}
     */
    var _this = _possibleConstructorReturn(this, (GameObject.__proto__ || Object.getPrototypeOf(GameObject)).call(this));

    _this.mId = ++GameObject.ID;

    /**
     * @private
     * @type {string|null}
     */
    _this.mName = null;

    /**
     * @private
     * @type {Array<Component>}
     */
    _this.mComponents = [];

    /**
     * @private
     * @type {Array<GameObject>}
     */
    _this.mChildren = [];

    /**
     * @private
     * @type {number}
     */
    _this.mX = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mY = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mScaleX = 1;

    /**
     * @private
     * @type {number}
     */
    _this.mScaleY = 1;

    /**
     * @private
     * @type {number}
     */
    _this.mPivotX = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mPivotY = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mRotation = 0;

    /**
     * @private
     * @type {Rectangle}
     */
    _this.mBounds = null;

    /**
     * @private
     * @type {Matrix}
     */
    _this.mLocalTransform = new Matrix();

    /**
     * @private
     * @type {Matrix}
     */
    _this.mWorldTransform = new Matrix();

    /**
     * @private
     * @type {DirtyFlag}
     */
    _this.mDirty = DirtyFlag.DIRTY;

    /**
     * @private
     * @type {GameObject}
     */
    _this.mParent = null;

    /**
     * @private
     * @type {string|null}
     */
    _this.mTag = null;

    /**
     * @private
     * @type {number}
     */
    _this.mIndex = 0;

    /**
     * @private
     * @type {boolean}
     */
    _this.mAdded = false;
    return _this;
  }

  /**
   * Returns unique object id.
   *
   * @returns {number}
   */


  _createClass(GameObject, [{
    key: 'onAdded',


    /**
     * This method called each time object added to stage.
     *
     * @protected
     * @return {void}
     */
    value: function onAdded() {}

    /**
     * Called when object is removed from stage.
     *
     * @protected
     * @return {void}
     */

  }, {
    key: 'onRemoved',
    value: function onRemoved() {}

    /**
     * add - Sugar method for adding child GameObjects or Components.
     *
     * @param {...GameObject|...Component} gameObjectsAndOrComponents A GameObject or Component to add.
     * @return {Array<GameObject|Component>} The passed GameObject or Component.
     */

  }, {
    key: 'add',
    value: function add() {
      for (var _len = arguments.length, gameObjectsAndOrComponents = Array(_len), _key = 0; _key < _len; _key++) {
        gameObjectsAndOrComponents[_key] = arguments[_key];
      }

      for (var i = 0; i < gameObjectsAndOrComponents.length; i++) {
        var gooc = gameObjectsAndOrComponents[i];

        if (gooc instanceof GameObject) this.addChild( /* @type {!GameObject} */gooc);else this.addComponent( /* @type {!Component} */gooc);
      }

      return gameObjectsAndOrComponents;
    }

    /**
     * Adds a child GameObject instance to this GameObject instance. The child is added to the top of all other children in this GameObject instance.
     *
     * @param  {GameObject} child The GameObject instance to add as a child of this GameObject instance.
     * @return {GameObject}
     */

  }, {
    key: 'addChild',
    value: function addChild(child) {
      return this.addChildAt(child, this.mChildren.length);
    }

    /**
     * Adds a child GameObject instance to this GameObject instance. The child is added to the top of all other children in this GameObject instance.
     *
     * @param  {GameObject} child The GameObject instance to add as a child of this GameObject instance.
     * @param  {number=} index = 0 The index position to which the child is added.
     * @return {GameObject} The GameObject instance that you pass in the child parameter.
     */

  }, {
    key: 'addChildAt',
    value: function addChildAt(child) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var numChildren = this.mChildren.length;

      if (index < 0 || index > numChildren) throw new Error('Child index is out of bounds.');

      if (child.mParent === this) return this.setChildIndex(child, index);

      // this operation should be atomic. since __setParent can throw exception.
      this.mChildren.splice(index, 1, child);

      child.removeFromParent();
      child.__setParent(this);

      if (this.root !== null) Black.instance.onChildrenAdded(child);

      return child;
    }

    /**
     * @protected
     * @ignore
     * @param {GameObject} value
     *
     * @return {boolean}
     */

  }, {
    key: '__setParent',
    value: function __setParent(value) {
      var p = value;

      while (p !== null && p !== this) {
        p = p.mParent;
      }if (p === this) throw new Error('Object cannot be a child to itself.');

      this.mParent = value;
      this.setTransformDirty();
      return true;
    }

    /**
     * setChildIndex - Sets the index (layer) of the specified GameObject to the specified index (layer).
     *
     * @param {GameObject} child The GameObject instance to change index for.
     * @param {number} index Desired index.
     *
     * @returns {GameObject} The GameObject instance that you pass in the child parameter.
     */

  }, {
    key: 'setChildIndex',
    value: function setChildIndex(child, index) {
      var ix = this.mChildren.indexOf(child);

      if (ix < 0) throw new Error('Child is not a child of this object.');

      if (ix === index) return child;

      this.mChildren.splice(ix, 1);
      this.mChildren.splice(index, 1, child);
      this.setTransformDirty();

      return child;
    }

    /**
     * removeFromParent - Removes this GameObject instance from its parent.
     *
     * @param {boolean} [dispose=false]
     *
     * @return {void}
     */

  }, {
    key: 'removeFromParent',
    value: function removeFromParent() {
      var dispose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.mParent) this.mParent.removeChild(this);

      if (dispose) this.dispose();

      this.setTransformDirty();
    }

    /**
     * removeChild - Removes specified GameObjects instance.
     *
     * @param {GameObject} child GameObject instance to remove.
     * @param {boolean} [dispose=false]
     *
     * @return {GameObject} The GameObject instance that you pass in the child parameter.
     */

  }, {
    key: 'removeChild',
    value: function removeChild(child, dispose) {
      var ix = this.mChildren.indexOf(child);

      if (ix < 0) return null;

      return this.removeChildAt(ix);
    }

    /**
     * get child by name
     *
     * @param {string} name
     *
     * @return {GameObject|null}
     */

  }, {
    key: 'getChildByName',
    value: function getChildByName(name) {
      for (var i = 0; i < this.mChildren.length; i++) {
        if (this.mChildren[i].name === name) return this.mChildren[i];
      }

      return null;
    }

    /**
     *Removes GameObjects instance from specified index.
     *
     * @param {number} index Description
     * @param {boolean} [dispose=false]
     *
     * @return {GameObject} The removed GameObject instance.
     */

  }, {
    key: 'removeChildAt',
    value: function removeChildAt(index, dispose) {
      if (index < 0 || index > this.numChildren) throw new Error('Child index is out of bounds.');

      var hadRoot = this.root !== null;

      var child = this.mChildren[index];
      child.__setParent(null);

      this.mChildren.splice(index, 1);

      if (hadRoot) Black.instance.onChildrenRemoved(child);

      if (dispose) child.dispose();

      this.setTransformDirty();

      return child;
    }

    /**
     * Returns GameObject at specified index.
     *
     * @param {number} index The index of child GameObject.
     *
     * @return {GameObject} The GameObject at specified index.
     */

  }, {
    key: 'getChildAt',
    value: function getChildAt(index) {
      return this.mChildren[index];
    }

    /**
     * Adds Component instance to the end of the list,
     *
     * @param  {Component} component Component instance or instances.
     * @return {Component} The Component instance you pass in the instances parameter.
     */

  }, {
    key: 'addComponent',
    value: function addComponent(component) {
      var instance = component;

      if (instance.gameObject) throw new Error('Component cannot be added to two game objects at the same time.');

      this.mComponents.push(instance);
      instance.gameObject = this;

      if (this.root !== null) Black.instance.onComponentAdded(this, instance);

      instance.onAdded(this);

      return instance;
    }

    /**
     * Remove specified component
     *
     * @param {Component} instance
     *
     * @return {Component|null}
     */

  }, {
    key: 'removeComponent',
    value: function removeComponent(instance) {
      if (!instance) return null;

      var index = this.mComponents.indexOf(instance);
      if (index > -1) this.mComponents.splice(index, 1);

      // detach game object after or before?
      instance.gameObject = null;
      instance.onRemoved(this);

      if (this.root !== null) Black.instance.onComponentRemoved(this, instance);

      return instance;
    }

    /**
     * get component by type
     *
     * @param {*} typeName
     *
     * @return {Component|null}
     */

  }, {
    key: 'getComponent',
    value: function getComponent(typeName) {
      for (var i = 0; i < this.mComponents.length; i++) {
        var c = this.mComponents[i];
        if (c instanceof typeName) return c;
      }

      return null;
    }

    /**
     * Returns number of component's
     *
     * @return {number}
     */

  }, {
    key: 'getComponentAt',


    /**
     * Retrives Component at given index.
     *
     * @param {number} index
     *
     * @return {Component|null}
     */
    value: function getComponentAt(index) {
      if (index >= 0 && index < this.mComponents.length) return this.mComponents[index];

      return null;
    }

    /**
     * Retun local transformation Matrix
     *
     * @return {Matrix}
     */

  }, {
    key: '__fixedUpdate',


    /**
     * @param {number} dt
     * @private
     *
     * @return {void}
     */
    value: function __fixedUpdate(dt) {
      this.onFixedUpdate(dt);

      for (var k = 0; k < this.mComponents.length; k++) {
        var c = this.mComponents[k];
        c.gameObject = this;
        c.onFixedUpdate(dt);
      }

      for (var i = 0; i < this.mChildren.length; i++) {
        this.mChildren[i].__fixedUpdate(dt);
      }
    }

    /**
     * @param {number} dt time since the last frame
     * @private
     *
     * @return {void}
     */

  }, {
    key: '__update',
    value: function __update(dt) {
      this.onUpdate(dt);

      for (var k = 0; k < this.mComponents.length; k++) {
        var c = this.mComponents[k];
        c.gameObject = this;
        c.onUpdate(dt);
      }

      for (var i = 0; i < this.mChildren.length; i++) {
        this.mChildren[i].__update(dt);
      }
    }

    /**
     *
     * @param {number} dt time since the last frame
     * @private
     *
     * @return {void}
     */

  }, {
    key: '__postUpdate',
    value: function __postUpdate(dt) {
      this.onPostUpdate(dt);

      for (var k = 0; k < this.mComponents.length; k++) {
        var c = this.mComponents[k];
        c.gameObject = this;
        c.onPostUpdate(dt);
      }

      for (var i = 0; i < this.mChildren.length; i++) {
        this.mChildren[i].__postUpdate(dt);
      }
    }

    /**
     * Called at every fixed frame update.
     * @protected
     * @param {number} dt time since the last frame
     *
     * @return {void}
     */

  }, {
    key: 'onFixedUpdate',
    value: function onFixedUpdate(dt) {}

    /**
     * Called at every engine update.
     * @protected
     * @param {number} dt time since the last frame
     *
     * @return {void}
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate(dt) {}

    /**
     * Called after all updates have been executed.
     * @protected
     * @param {number} dt Description
     *
     * @return {void} Description
     */

  }, {
    key: 'onPostUpdate',
    value: function onPostUpdate(dt) {}

    /**
     * @param {VideoNullDriver} video
     * @protected
     * @ignore
     * @param {number} time
     * @param {number} parentAlpha
     * @param {string} parentBlendMode
     *
     * @return {void}
     */

  }, {
    key: '__render',
    value: function __render(video, time, parentAlpha, parentBlendMode) {
      this.onRender(video, time);

      var child = null;
      for (var i = 0; i < this.mChildren.length; i++) {
        child = this.mChildren[i];
        child.__render(video, time, parentAlpha, parentBlendMode);
      }
    }

    /**
     * @protected
     * @param {VideoNullDriver} video Description
     * @param {number} time  Description
     *
     * @return {void} Description
     */

  }, {
    key: 'onRender',
    value: function onRender(video, time) {}

    /**
     * onGetLocalBounds - Override this method if you need to specify GameObject size. Should be always be a local coordinates.
     *
     * @protected
     * @param {Rectangle=} outRect Description
     *
     * @return {Rectangle} bounds in local space withoout taking care about transformation matrix
     */

  }, {
    key: 'onGetLocalBounds',
    value: function onGetLocalBounds() {
      var outRect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      outRect = outRect || new Rectangle();
      return outRect.set(0, 0, 0, 0);
    }

    /**
     * getBounds - Returns world bounds of this object and all children if specified (true by default).
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

  }, {
    key: 'getBounds',
    value: function getBounds() {
      var space = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var includeChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var outRect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      outRect = outRect || new Rectangle();

      var matrix = this.worldTransformation;

      // TODO: optimize, check if space == null, space == this, space == parent
      // TODO: use wtInversed instead
      if (space != null) {
        matrix = this.worldTransformation.clone();
        matrix.prepend(space.worldTransformation.clone().invert());
      }

      var bounds = new Rectangle();
      this.onGetLocalBounds(bounds);

      matrix.transformRect(bounds, bounds);
      outRect.expand(bounds.x, bounds.y, bounds.width, bounds.height);

      if (includeChildren) for (var i = 0; i < this.numChildren; i++) {
        this.getChildAt(i).getBounds(space, includeChildren, outRect);
      }return outRect;
    }

    /**
     * setTransform -
     *
     * @param {number} [x=0]      x-cord
     * @param {number} [y=0]      y-cord
     * @param {number} [r=0]      rotation
     * @param {number} [scaleX=1] scale-x
     * @param {number} [scaleY=1] scale-y
     * @param {number} [anchorX=0] anchor-x
     * @param {number} [anchorY=0] anchor-y
     * @param {number} [includeChildren=true] include children when adjusting pivot?
     *
     * @return {GameObject}
     */

  }, {
    key: 'setTransform',
    value: function setTransform() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var scaleX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var scaleY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var anchorX = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      var anchorY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      var includeChildren = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;

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

  }, {
    key: 'localToGlobal',
    value: function localToGlobal(localPoint) {
      var outVector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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

  }, {
    key: 'globalToLocal',
    value: function globalToLocal(globalPoint) {
      var outVector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      return this.worldTransformationInversed.transformVector(globalPoint, outVector);
    }

    /*:--- PROPERTIES ---:*/

    /**
     * numChildren - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'alignPivot',


    /**
     * alignPivot
     *
     * @param {number}  [ax=0.5]
     * @param {number}  [ay=0.5]
     * @param {boolean} [includeChildren=true]
     *
     * @return {GameObject}
     */
    value: function alignPivot() {
      var ax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;
      var ay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
      var includeChildren = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      this.getBounds(this, includeChildren, Rectangle.__cache.zero());

      this.mPivotX = Rectangle.__cache.width * ax;
      this.mPivotY = Rectangle.__cache.height * ay;
      this.setTransformDirty();

      return this;
    }

    /**
     * scaleX - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'spawn',


    /**
     * co - Starts coroutine.
     *
     * @param {Function} gen
     * @param {*=} [ctx=null]
     *
     * @return {Generator}
     */
    value: function spawn(gen) {
      var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var iter = gen.apply(ctx == null ? this : ctx);

      function step(it) {
        if (it.done) return;

        if (typeof it.value === 'function') it.value(function (x) {
          return step(iter.next(x));
        });else step(iter.next(it.value));
      }

      step(iter.next());
      return iter;
    }

    /**
     * @return {function(*):*}
     */

  }, {
    key: 'wait',
    value: function wait() {
      var _this2 = this;

      var seconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      return function (cb) {
        return setTimeout(cb.bind(_this2, seconds * 1000), seconds * 1000);
      };
    }

    /**
     * waitMessage - Waits for a speceific message
     *
     * @param {string} message The name of the message to wait for
     *
     * @return {function(*):*} Description
     */

  }, {
    key: 'waitMessage',
    value: function waitMessage(message) {
      var _this3 = this;

      return function (cb) {
        return _this3.on(message, cb.bind(_this3));
      };
    }

    /**
     * setDirty
     *
     * @param {DirtyFlag} flag
     * @param {boolean} [includeChildren=true] Description
     *
     * @return {void}
     */

  }, {
    key: 'setDirty',
    value: function setDirty(flag) {
      var includeChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (includeChildren) {
        GameObject.forEach(this, function (x) {
          x.mDirty |= flag;
        });
      } else {
        this.mDirty |= flag;
      }
    }
  }, {
    key: 'setTransformDirty',
    value: function setTransformDirty() {
      this.setDirty(DirtyFlag.LOCAL, false);
      this.setDirty(DirtyFlag.WORLD, true);
    }

    /**
     * dispose
     *
     * @return {void}
     */

  }, {
    key: 'dispose',
    value: function dispose() {}

    // TODO: rename method
    /**
     * getBoundsWithPoints - Description
     *
     * @param {Array<number>} points              Description
     * @param {Matrix} worldTransformation Description
     * @param {Rectangle=} outRect             Description
     *
     * @return {Rectangle} Description
     */

  }, {
    key: 'id',
    get: function get() {
      return this.mId;
    }
  }, {
    key: 'numComponenets',
    get: function get() {
      return this.mComponents.length;
    }
  }, {
    key: 'localTransformation',
    get: function get() {
      if (this.mDirty & DirtyFlag.LOCAL) {
        this.mDirty ^= DirtyFlag.LOCAL;

        if (this.mRotation === 0) {
          var tx = this.mX - this.mPivotX * this.mScaleX;
          var ty = this.mY - this.mPivotY * this.mScaleY;
          return this.mLocalTransform.set(this.mScaleX, 0, 0, this.mScaleY, tx, ty);
        } else {
          var cos = Math.cos(this.mRotation);
          var sin = Math.sin(this.mRotation);
          var a = this.mScaleX * cos;
          var b = this.mScaleX * sin;
          var c = this.mScaleY * -sin;
          var d = this.mScaleY * cos;
          var _tx = this.mX - this.mPivotX * a - this.mPivotY * c;
          var _ty = this.mY - this.mPivotX * b - this.mPivotY * d;
          return this.mLocalTransform.set(a, b, c, d, _tx, _ty);
        }
      }

      return this.mLocalTransform;
    }

    /**
     *  returns cloned Matrix object which represents object orientation in world space.
     *
     * @return {Matrix}
     */

  }, {
    key: 'worldTransformation',
    get: function get() {
      if (this.mDirty & DirtyFlag.WORLD) {
        this.mDirty ^= DirtyFlag.WORLD;

        if (this.mParent) this.mParent.worldTransformation.copyTo(this.mWorldTransform).append(this.localTransformation);else this.localTransformation.copyTo(this.mWorldTransform);
      }

      return this.mWorldTransform.clone();
    }

    /**
     * returns cloned and inversed Matrix object which represents object orientation in world space
     *
     * @return {Matrix}
     */

  }, {
    key: 'worldTransformationInversed',
    get: function get() {
      // TODO: optimize, cache
      return this.worldTransformation.clone().invert();
    }
  }, {
    key: 'numChildren',
    get: function get() {
      return this.mChildren.length;
    }

    /**
     * name - Description
     *
     * @return {string|null} Description
     */

  }, {
    key: 'name',
    get: function get() {
      return this.mName;
    }

    /**
     * name - Description
     *
     * @param {string|null} value Description
     *
     * @return {void} Description
     */
    ,
    set: function set(value) {
      this.mName = value;
    }

    /**
     * x - Gets the x coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
     *
     * @return {number} Description
     */

  }, {
    key: 'x',
    get: function get() {
      return this.mX;
    }

    /**
     * x - Sets the x coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
     *
     * @param {number} value Description
     *
     * @return {void} Description
     */
    ,
    set: function set(value) {
      if (this.mX == value) return;

      this.mX = value;
      this.setTransformDirty();
    }

    /**
     * y - Gets the y coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
     *
     * @return {number} Description
     */

  }, {
    key: 'y',
    get: function get() {
      return this.mY;
    }

    /**
     * y - Sets the y coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
     *
     * @param {number} value Description
     *
     * @return {void} Description
     */
    ,
    set: function set(value) {
      if (this.mY == value) return;

      this.mY = value;
      this.setTransformDirty();
    }

    /**
     * pivotX - Description
     * @export
     * @return {number} Description
     */

  }, {
    key: 'pivotX',
    get: function get() {
      return this.mPivotX;
    }

    /**
     * pivotX - Description
     *
     * @export
     * @param {number} value Description
     *
     * @return {void} Description
     */
    ,
    set: function set(value) {
      if (this.mPivotX == value) return;

      this.mPivotX = value;
      this.setTransformDirty();
    }

    /**
     * pivotY - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'pivotY',
    get: function get() {
      return this.mPivotY;
    }

    /**
     * pivotY - Description
     *
     * @param {number} value Description
     *
     * @return {void} Description
     */
    ,
    set: function set(value) {
      if (this.mPivotY == value) return;

      this.mPivotY = value;
      this.setTransformDirty();
    }
  }, {
    key: 'scaleX',
    get: function get() {
      return this.mScaleX;
    }

    /**
     * scaleX - Description
     *
     * @param {number} value Description
     *
     * @return {void} Description
     */
    ,
    set: function set(value) {
      if (this.mScaleX == value) return;

      this.mScaleX = value;
      this.setTransformDirty();
    }

    /**
     * scaleY - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'scaleY',
    get: function get() {
      return this.mScaleY;
    }

    /**
     * scaleY - Description
     *
     * @param {number} value Description
     *
     * @return {void} Description
     */
    ,
    set: function set(value) {
      if (this.mScaleY == value) return;

      this.mScaleY = value;
      this.setTransformDirty();
    }

    /**
     * rotation - returns current rotation
     *
     * @return {number} Description
     */

  }, {
    key: 'rotation',
    get: function get() {
      return this.mRotation;
    }

    /**
     * rotation - Description
     *
     * @param {number} value Description
     *
     * @return {void} Description
     */
    ,
    set: function set(value) {
      if (this.mRotation == value) return;

      this.mRotation = value;
      this.setTransformDirty();
    }

    /**
     * parent - Description
     *
     * @return {GameObject} Description
     */

  }, {
    key: 'parent',
    get: function get() {
      return this.mParent;
    }

    /**
     * root - Description
     *
     * @return {GameObject|null} Description
     */

  }, {
    key: 'root',
    get: function get() {
      var current = this;

      if (current === Black.instance.root) return current;

      while (current.mParent) {
        if (current === Black.instance.root) return current;else if (current.mParent === Black.instance.root) return Black.instance.root;else current = current.mParent;
      }

      return null;
    }

    /**
     * depth - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'depth',
    get: function get() {
      if (this.mParent) return this.mParent.depth + 1;else return 0;
    }

    /**
     * index - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'index',
    get: function get() {
      return this.mIndex;
    }

    /**
     * width - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'width',
    get: function get() {
      return this.getBounds(this.mParent).width;
    }

    /**
     * width - Description
     *
     * @param {number} value Description
     *
     * @return {void} Description
     */
    ,
    set: function set(value) {
      this.scaleX = 1;
      var currentWidth = this.width;

      if (currentWidth != 0.0) this.scaleX = value / currentWidth;
    }

    /**
     * height - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'height',
    get: function get() {
      return this.getBounds(this.mParent).height;
    }

    /**
     * height - Description
     *
     * @param {number} value Description
     *
     * @return {void} Description
     */
    ,
    set: function set(value) {
      this.scaleY = 1;
      var currentHeight = this.height;

      if (currentHeight != 0) this.scaleY = value / currentHeight;
    }

    /**
     * localWidth - returns height in local space without children.
     *
     * @return {number}
     */

  }, {
    key: 'localWidth',
    get: function get() {
      return this.getBounds(this, false).width;
    }

    /**
     * localHeight - returns height in local space without children.
     *
     * @return {number}
     */

  }, {
    key: 'localHeight',
    get: function get() {
      return this.getBounds(this, false).height;
    }

    // TODO: precache
    /**
     * path - Description
     *
     * @return {string} Description
     */

  }, {
    key: 'path',
    get: function get() {
      if (this.mParent !== null) return this.mParent.path + '/' + this.mName;

      return this.mName;
    }

    /**
     * tag - Description
     *
     * @return {string|null} Description
     */

  }, {
    key: 'tag',
    get: function get() {
      return this.mTag;
    }

    /**
     * tag - Description
     *
     * @param {string|null} value Description
     *
     * @return {void} Description
     */
    ,
    set: function set(value) {
      if (this.mTag === value) return;

      /** @type {string|null} */
      var old = this.mTag;
      this.mTag = value;

      if (this.mAdded) Black.instance.onTagUpdated(this, old, value);
    }
  }], [{
    key: 'getBoundsWithPoints',
    value: function getBoundsWithPoints(points, worldTransformation, outRect) {
      outRect = outRect || new Rectangle();

      var minX = Number.MAX_VALUE;
      var maxX = -Number.MAX_VALUE;
      var minY = Number.MAX_VALUE;
      var maxY = -Number.MAX_VALUE;
      var xx = 0;
      var yy = 0;
      var tmpVector = new Vector();

      for (var i = 0; i < points.length; i += 2) {
        worldTransformation.transformXY(points[i], points[i + 1], tmpVector);

        if (minX > tmpVector.x) minX = tmpVector.x;

        if (maxX < tmpVector.x) maxX = tmpVector.x;

        if (minY > tmpVector.y) minY = tmpVector.y;

        if (maxY < tmpVector.y) maxY = tmpVector.y;
      }

      outRect.set(minX, minY, maxX - minX, maxY - minY);
      return outRect;
    }

    /**
     * intersects - Description
     *
     * @param {GameObject} gameObject Description
     * @param {Vector} point      Description
     *
     * @return {boolean} Description
     */

  }, {
    key: 'intersects',
    value: function intersects(gameObject, point) {
      var tmpVector = new Vector();
      var inv = gameObject.worldTransformation.invert();

      inv.transformVector(point, tmpVector);

      var rect = gameObject.getBounds(gameObject, false);
      return rect.containsXY(tmpVector.x, tmpVector.y);
    }

    /**
     * intersectsAt - Description
     *
     * @param {GameObject} gameObject Description
     * @param {Vector} point      Description
     * @param {Vector=} outVector  Description
     *
     * @return {boolean} Description
     */

  }, {
    key: 'intersectsAt',
    value: function intersectsAt(gameObject, point) {
      var outVector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      outVector = outVector || new Vector();

      var tmpVector = Vector.__cache;
      var inv = gameObject.worldTransformationInversed;

      inv.transformVector(point, tmpVector);

      var rect = gameObject.getBounds(gameObject, false);
      var contains = rect.containsXY(tmpVector.x, tmpVector.y);

      if (!contains) return false;

      outVector.x = tmpVector.x - rect.x;
      outVector.y = tmpVector.y - rect.y;
      return true;
    }

    /**
     * intersectsWith - Description
     *
     * @param {GameObject} gameObject Description
     * @param {Vector} point      Description
     *
     * @return {GameObject|null} returns object or null
     */

  }, {
    key: 'intersectsWith',
    value: function intersectsWith(gameObject, point) {
      var obj = null;
      for (var i = gameObject.numChildren - 1; i >= 0; --i) {
        var child = gameObject.mChildren[i];

        obj = GameObject.intersectsWith(child, point);
        if (obj != null) return obj;

        var inside = GameObject.intersects(child, point);
        if (inside) {
          obj = child;
          break;
        }
      }

      if (obj === null && GameObject.intersects(gameObject, point)) {
        return gameObject;
      }

      return null;
    }

    /**
     * findWithTag - Description
     *
     * @param {string} tag Description
     *
     * @return {Array<GameObject>|null} Description
     */

  }, {
    key: 'findWithTag',
    value: function findWithTag(tag) {
      if (Black.instance.mTagCache.hasOwnProperty(tag) === false) return null;

      return Black.instance.mTagCache[tag];
    }

    /**
     * findComponents - Returns a list of Components
     *
     * @param {GameObject} gameObject
     * @param {function (new:Component)} type
     *
     * @return {Array<Component>}
     */

  }, {
    key: 'findComponents',
    value: function findComponents(gameObject, type) {
      Debug.assert(gameObject !== null, 'gameObject cannot be null.');
      Debug.assert(type !== null, 'type cannot be null.');

      /** @type {Array<Component>} */
      var list = [];

      /** @type {function(GameObject, function(new:Component)):void} */
      var f = function f(gameObject, type) {
        for (var i = 0; i < gameObject.mComponents.length; i++) {
          var c = gameObject.mComponents[i];
          if (c instanceof type) list.push(c);
        }

        for (var _i = 0; _i < gameObject.mChildren.length; _i++) {
          f(gameObject.mChildren[_i], type);
        }
      };

      f(gameObject, type);

      return list;
    }

    /**
     * forEach - Runs action accross all object mathing the name.
     *
     * @param {GameObject} node   Description
     * @param {function(node:GameObject)} action Description
     *
     * @return {void} Description
     */

  }, {
    key: 'forEach',
    value: function forEach(node, action) {
      if (node == null) node = Black.instance.root;

      action(node);

      for (var i = 0; i < node.numChildren; i++) {
        GameObject.forEach(node.getChildAt(i), action);
      }
    }

    /**
     * find - Finds object by its name.
     *
     * @param {string} name Description
     * @param {GameObject} node Description
     *
     * @return {GameObject} Description
     */

  }, {
    key: 'find',
    value: function find(name, node) {
      if (node == null) node = Black.instance.root;

      if (node.name === name) return node;

      for (var i = 0; i < node.numChildren; i++) {
        var r = GameObject.find(name, node.getChildAt(i));
        if (r != null) return r;
      }

      return null;
    }
  }]);

  return GameObject;
}(MessageDispatcher);

/** @type {number}
 * @nocollapse
 */


GameObject.ID = 0;

/**
 * @enum {number}
 */

var DirtyFlag = {
  LOCAL: 1,
  WORLD: 2,
  DIRTY: 0xffffff
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO:
// [_] Do not handle is loaded or not.
// Texture shall not be responsible for loading itself.
// We have TextureAsset for it.
// native size - always the size of physical texture
// source size - the original size of a texture to
//


var Texture = function () {
  /**
   * @param  {Image} nativeTexture description
   * @param  {Rectangle=} region = undefined description
   * @param  {Rectangle=} untrimmedRect = undefined description
   */
  function Texture(nativeTexture, region, untrimmedRect) {
    _classCallCheck(this, Texture);

    /** @type {Image} */
    this.mTexture = nativeTexture;

    /** @type {Rectangle} */
    this.mRegion;

    /** @type {boolean} */
    this.mIsSubtexture = false;

    /** @type {number} */
    this.mId = ++Texture.__ID;

    if (region === undefined) {
      this.mRegion = new Rectangle(0, 0, nativeTexture.naturalWidth, nativeTexture.naturalHeight);
    } else {
      this.mRegion = /** @type {Rectangle} */region;
      this.mIsSubtexture = true;
    }

    /** @type {boolean} */
    this.mTrimmed = untrimmedRect !== undefined;

    if (this.mTrimmed === false) untrimmedRect = new Rectangle(0, 0, this.mRegion.width, this.mRegion.height);

    /** @type {Rectangle} */
    this.mUntrimmedRect = /** @type {Rectangle} */untrimmedRect;

    /** @type {boolean} */
    this.mIsLoaded = true;
  }

  /**
   * id - Description
   *
   * @return {number} Description
   */


  _createClass(Texture, [{
    key: 'dispose',


    /**
     * dispose - Description
     *
     * @return {void} Description
     */
    value: function dispose() {
      this.mTexture = null;
    }

    /**
     * fromBase64String - Description
     *
     * @param {string} string Description
     *
     * @return {Texture} Description
     */

  }, {
    key: 'id',
    get: function get() {
      return this.mId;
    }

    /**
     * isTrimmed - Description
     *
     * @return {boolean} Description
     */

  }, {
    key: 'isTrimmed',
    get: function get() {
      return this.mTrimmed;
    }

    /**
     * isSubTexture - Description
     *
     * @return {boolean} Description
     */

  }, {
    key: 'isSubTexture',
    get: function get() {
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
     * untrimmedRect - Description
     *
     * @return {Rectangle} Description
     */

  }, {
    key: 'untrimmedRect',
    get: function get() {
      return this.mUntrimmedRect;
    }

    /**
     * width - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'width',
    get: function get() {
      if (this.mRegion) return this.mRegion.width;

      return this.mTexture.naturalWidth;
    }

    /**
     * height - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'height',
    get: function get() {
      if (this.mRegion) return this.mRegion.height;

      return this.mTexture.naturalHeight;
    }

    /**
     * region - Description
     *
     * @return {Rectangle} Description
     */

  }, {
    key: 'region',
    get: function get() {
      return this.mRegion;
    }

    /**
     * native - Description
     *
     * @return {Image} Description
     */

  }, {
    key: 'native',
    get: function get() {
      return this.mTexture;
    }

    /**
     * isLoaded - Description
     *
     * @return {boolean} Description
     */

  }, {
    key: 'isLoaded',
    get: function get() {
      return this.mIsLoaded;
    }

    /**
     * type - Description
     *
     * @return {string} Description
     */

  }, {
    key: 'type',
    get: function get() {
      return 'Texture';
    }

    /**
     * baseType - Description
     *
     * @return {string} Description
     */

  }, {
    key: 'baseType',
    get: function get() {
      return 'Texture';
    }
  }], [{
    key: 'fromBase64String',
    value: function fromBase64String(string) {
      var imgElement = new Image();
      imgElement.src = string;
      return new Texture(imgElement);
    }

    /**
     * fromCanvasAsImage - Description
     *
     * @param {HTMLElement}   canvas           Description
     * @param {string} [type=image/png] Description
     * @param {number} [quality=1]      Description
     *
     * @return {Texture} Description
     */

  }, {
    key: 'fromCanvasAsImage',
    value: function fromCanvasAsImage(canvas) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image/png';
      var quality = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      var imgElement = new Image();
      imgElement.src = canvas.toDataURL(type, quality);

      return new Texture(imgElement);
    }

    /**
     * fromCanvas - Description
     *
     * @param {HTMLElement} canvas Description
     *
     * @return {Texture} Description
     */

  }, {
    key: 'fromCanvas',
    value: function fromCanvas(canvas) {
      return Black.instance.video.getTextureFromCanvas(canvas);
    }
  }]);

  return Texture;
}();

/** @type {number}
 * @nocollapse
 */


Texture.__ID = 0;

/** @type {Image|null}
 * @nocollapse
 */
Texture.MISSING_IMAGE_CACHE = null;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AtlasTexture = function (_Texture) {
  _inherits(AtlasTexture, _Texture);

  /**
   * constructor - Creates an Texture Atlas
   *
   * @param {Texture} texture A base texture object.
   * @param {{meta: *, frames: *}} jsonObject
   *
   * @return {void}
   */
  function AtlasTexture(texture, jsonObject) {
    _classCallCheck(this, AtlasTexture);

    /** @type {Object} */
    var _this = _possibleConstructorReturn(this, (AtlasTexture.__proto__ || Object.getPrototypeOf(AtlasTexture)).call(this, texture.native));

    _this.mMeta = {};

    /** @dict */
    _this.mSubTextures = {}; // dictionary

    _this.__parseJson(jsonObject);
    return _this;
  }

  /**
   * __parseJson
   *
   * @param  {{meta: *, frames: *}} o
   * @return {void}
   */


  _createClass(AtlasTexture, [{
    key: "__parseJson",
    value: function __parseJson(o) {
      var NEGATIVE_HALF_PI = -(Math.PI / 2);

      // if (o.meta.format)
      //   this.mMeta.format = o.meta.format;
      //
      // if (o.meta.scale)
      //   this.mMeta.scale = parseFloat(o.meta.scale);

      for (var key in o.frames) {
        var data = /** @type {Array<number>} */o.frames[key];

        var region = new Rectangle(data[0], data[1], data[2], data[3]);
        var untrimmedRect = new Rectangle(data[4], data[5], data[6], data[7]);

        this.mSubTextures[key] = new Texture(this.native, region, untrimmedRect);
      }
    }

    // addRegion(name, region, frame) {}
    //
    // removeRegion() {}

    /**
     * getTexture - Returns the textures by a given name.
     *
     * @param {string} name
     *
     * @return {Texture} The Texture or null;
     */

  }, {
    key: "getTexture",
    value: function getTexture(name) {
      /** @type {Texture} */
      var t = this.mSubTextures[name];
      if (t === undefined) console.warn('Texture \'%s\' was not found in cache.', name);

      return (/** @type {Texture} */t
      );
    }

    /**
     * getTextures - Returns list of Textures.
     *
     * @param {string|null} [nameMask=null] The mask to filter by.
     * @param {Array<Texture>|null} outTextures
     *
     * @return {Array<Texture>} The list of found textures.
     */

  }, {
    key: "getTextures",
    value: function getTextures() {
      var nameMask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var outTextures = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var out = outTextures || [];
      if (nameMask === null) {
        for (var key in this.mSubTextures) {
          out.push(this.mSubTextures[key]);
        }return (/** @type {Array<Texture>} */out
        );
      }

      var names = [];

      // TODO: make helper wild function
      var re = new RegExp("^" + nameMask.split("*").join(".*") + "$");
      for (var _key in this.mSubTextures) {
        if (re.test(_key)) names.push(_key);
      }names.sort(this.__naturalComparer);

      for (var i = 0; i < names.length; i++) {
        out.push(this.mSubTextures[names[i]]);
      }return out;
    }

    /**
     * @param {*} a
     * @param {*} b
     *
     * @return {number}
     */

  }, {
    key: "__naturalComparer",
    value: function __naturalComparer(a, b) {
      var NUMBER_GROUPS = /(-?\d*\.?\d+)/g;
      var aa = String(a).split(NUMBER_GROUPS);
      var bb = String(b).split(NUMBER_GROUPS);
      var min = Math.min(aa.length, bb.length);

      for (var i = 0; i < min; i++) {
        var x = parseFloat(aa[i]) || aa[i].toLowerCase();
        var y = parseFloat(bb[i]) || bb[i].toLowerCase();

        if (x < y) return -1;else if (x > y) return 1;
      }

      return 0;
    }
  }]);

  return AtlasTexture;
}(Texture);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: handle errors
// TODO: v2: parallel loading?
//
//

var Asset = function (_MessageDispatcher) {
  _inherits(Asset, _MessageDispatcher);

  /**
   * @param  {string} name description
   * @param  {string} url  description
   */
  function Asset(name, url) {
    _classCallCheck(this, Asset);

    /** @type {string} */
    var _this = _possibleConstructorReturn(this, (Asset.__proto__ || Object.getPrototypeOf(Asset)).call(this));

    _this.mName = name;

    /** @type {string} */
    _this.mUrl = url;

    /** @type {*|null} */
    _this.mData = null;

    /** @type {boolean} */
    _this.mIsLoaded = false;

    /** @type {string|undefined} */
    _this.mMimeType = undefined;

    /** @type {string} */
    _this.mResponseType = '';

    /** @type {string} */
    _this.mExtension = _this.getExtension(url);

    /** @type {XMLHttpRequest|null} */
    _this.mRequest = null;
    return _this;
  }

  /**
   * load
   *
   * @return {void}
   */


  _createClass(Asset, [{
    key: 'load',
    value: function load() {
      var _this2 = this;

      //console.log('Asset: loading asset \'%s\' from \'%s\'', this.mName, this.mUrl);

      this.mRequest = new XMLHttpRequest();
      //this.mRequest.onprogress = (pe) => this.onProgressChanged(pe);

      if (this.mRequest.overrideMimeType && this.mMimeType) this.mRequest.overrideMimeType(this.mMimeType);

      this.mRequest.responseType = this.mResponseType;
      this.mRequest.open("GET", this.mUrl, true);
      this.mRequest.onreadystatechange = function () {
        if (_this2.mRequest.readyState === 4) {
          if (_this2.mRequest.status === 200 || _this2.mRequest.status === 0 && _this2.mRequest.responseText) _this2.onLoaded();else throw new Error('Error loading ' + _this2.mUrl + " (" + _this2.mRequest.status + ":" + _this2.mRequest.responseText + ")"); //TODO handle errors
        }
      };

      this.mRequest.send(null);
    }

    /**
     * onLoaded
     *
     * @return {void}
     */

  }, {
    key: 'onLoaded',
    value: function onLoaded() {
      this.mIsLoaded = true;
      this.post('complete');
    }

    /**
     * name
     *
     * @return {string}
     */

  }, {
    key: 'dispose',


    // TODO: finish
    value: function dispose() {}

    /**
     * getExtension
     *
     * @param {string} url
     *
     * @return {string}
     */

  }, {
    key: 'getExtension',
    value: function getExtension(url) {
      if (url.indexOf(".") === -1) return '';

      return url.substring(url.indexOf(".")).toLowerCase();
    }
  }, {
    key: 'name',
    get: function get() {
      return this.mName;
    }

    /**
     * data
     *
     * @return {*}
     */

  }, {
    key: 'data',
    get: function get() {
      return this.mData;
    }

    /**
     * isLoaded
     *
     * @return {boolean}
     */

  }, {
    key: 'isLoaded',
    get: function get() {
      return this.mIsLoaded;
    }
  }]);

  return Asset;
}(MessageDispatcher);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextureAsset = function (_Asset) {
  _inherits(TextureAsset, _Asset);

  /**
   * constructor - Description
   *
   * @param {string} name Description
   * @param {string} url  Description
   *
   * @return {void} Description
   */
  function TextureAsset(name, url) {
    _classCallCheck(this, TextureAsset);

    /** @type {Image} */
    var _this = _possibleConstructorReturn(this, (TextureAsset.__proto__ || Object.getPrototypeOf(TextureAsset)).call(this, name, url));

    _this.mImageElement = new Image();
    return _this;
  }

  /**
   * onLoaded - Description
   *
   * @return {void} Description
   */


  _createClass(TextureAsset, [{
    key: "onLoaded",
    value: function onLoaded() {
      //console.log('TextureAsset: \'%s\' loaded', this.mName);

      this.mData = new Texture(this.mImageElement);

      _get(TextureAsset.prototype.__proto__ || Object.getPrototypeOf(TextureAsset.prototype), "onLoaded", this).call(this);
    }

    /**
     * load - Description
     *
     * @return {void} Description
     */

  }, {
    key: "load",
    value: function load() {
      var _this2 = this;

      this.mImageElement.src = this.mUrl;
      this.mImageElement.onload = function () {
        _this2.onLoaded();
      };
    }

    /**
     * type - Description
     *
     * @return {string} Description
     */

  }, {
    key: "type",
    get: function get() {
      return "TextureAsset";
    }
  }]);

  return TextureAsset;
}(Asset);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JSONAsset = function (_Asset) {
  _inherits(JSONAsset, _Asset);

  /**
   * constructor
   *
   * @param {string} name
   * @param {string} url
   *
   * @return {void}
   */
  function JSONAsset(name, url) {
    _classCallCheck(this, JSONAsset);

    var _this = _possibleConstructorReturn(this, (JSONAsset.__proto__ || Object.getPrototypeOf(JSONAsset)).call(this, name, url));

    _this.mimeType = "application/json";
    return _this;
  }

  /**
   * onLoaded
   *
   * @return {void}
   */


  _createClass(JSONAsset, [{
    key: "onLoaded",
    value: function onLoaded() {
      this.mData = JSON.parse( /** @type {string} */this.mRequest.responseText);
      _get(JSONAsset.prototype.__proto__ || Object.getPrototypeOf(JSONAsset.prototype), "onLoaded", this).call(this);
    }
  }]);

  return JSONAsset;
}(Asset);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AtlasTextureAsset = function (_Asset) {
  _inherits(AtlasTextureAsset, _Asset);

  /**
   * constructor
   *
   * @param {string} name
   * @param {string} imageUrl
   * @param {string} dataUrl
   *
   * @return {void}
   */
  function AtlasTextureAsset(name, imageUrl, dataUrl) {
    _classCallCheck(this, AtlasTextureAsset);

    /** @type {Image} */
    var _this = _possibleConstructorReturn(this, (AtlasTextureAsset.__proto__ || Object.getPrototypeOf(AtlasTextureAsset)).call(this, name, imageUrl));

    _this.mImageElement = new Image();

    /** @type {JSONAsset} */
    _this.dataAsset = new JSONAsset(name, dataUrl);
    _this.dataAsset.on('complete', _this.onJsonLoaded, _this);
    return _this;
  }

  _createClass(AtlasTextureAsset, [{
    key: 'onJsonLoaded',
    value: function onJsonLoaded() {
      var _this2 = this;

      this.mImageElement.src = this.mUrl;
      this.mImageElement.onload = function () {
        _this2.onLoaded();
      };
    }

    /**
     * onLoaded
     *
     * @return {void}
     */

  }, {
    key: 'onLoaded',
    value: function onLoaded() {
      this.mData = new AtlasTexture(new Texture(this.mImageElement), /** @type {{meta: *, frames: *}} */this.dataAsset.data);

      _get(AtlasTextureAsset.prototype.__proto__ || Object.getPrototypeOf(AtlasTextureAsset.prototype), 'onLoaded', this).call(this);
    }

    /**
     * load
     * @override
     *
     * @return {void}
     */

  }, {
    key: 'load',
    value: function load() {
      this.dataAsset.load();
    }
  }]);

  return AtlasTextureAsset;
}(Asset);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
TODO:
  1. propper error handling
  2. max parallel downloads
  3. check for name dublicates
  4. load progress
*/

var AssetManager = function (_MessageDispatcher) {
  _inherits(AssetManager, _MessageDispatcher);

  function AssetManager() {
    _classCallCheck(this, AssetManager);

    /** @type {string} */
    var _this = _possibleConstructorReturn(this, (AssetManager.__proto__ || Object.getPrototypeOf(AssetManager)).call(this));

    _this.mDefaultPath = '';

    /** @type {number} */
    _this.mTotalLoaded = 0;

    /** @type {boolean} */
    _this.mIsAllLoaded = false;

    /** @type {number} */
    _this.mLoadingProgress = 0;

    /** @type {Array<Asset>} */
    _this.mQueue = [];

    /** @dict */
    _this.mTextures = {};

    /** @dict */
    _this.mAtlases = {};

    /** @dict */
    _this.mJsons = {};
    return _this;
  }

  _createClass(AssetManager, [{
    key: 'enqueueImage',
    value: function enqueueImage(name, url) {
      this.mQueue.push(new TextureAsset(name, this.mDefaultPath + url));
    }
  }, {
    key: 'enqueueAtlas',
    value: function enqueueAtlas(name, imageUrl, dataUrl) {
      this.mQueue.push(new AtlasTextureAsset(name, this.mDefaultPath + imageUrl, this.mDefaultPath + dataUrl));
    }
  }, {
    key: 'enqueueJson',
    value: function enqueueJson(name, url) {
      this.mQueue.push(new JSONAsset(name, this.mDefaultPath + url));
    }

    /**
     * loadQueue
     *
     * @return {void}
     */

  }, {
    key: 'loadQueue',
    value: function loadQueue() {
      for (var i = 0; i < this.mQueue.length; i++) {
        var item = this.mQueue[i];

        item.on(Message.COMPLETE, this.onAssetLoaded, this);
        item.load();
      }
    }

    /**
     * onAssetLoaded
     *
     * @param {Message} msg
     *
     * @return {void}
     */

  }, {
    key: 'onAssetLoaded',
    value: function onAssetLoaded(msg) {
      this.mTotalLoaded++;
      this.mLoadingProgress = this.mTotalLoaded / this.mQueue.length;

      var item = msg.sender;

      // TODO: rework this
      // TODO: check for dups
      if (item.constructor === TextureAsset) this.mTextures[item.name] = item.data;else if (item.constructor === AtlasTextureAsset) this.mAtlases[item.name] = item.data;else if (item.constructor === JSONAsset) this.mJsons[item.name] = item.data;else console.error('Unable to handle asset type.', item);

      this.post(Message.PROGRESS, this.mLoadingProgress);

      if (this.mTotalLoaded === this.mQueue.length) {
        this.mQueue.splice(0, this.mQueue.length);

        this.mIsAllLoaded = true;
        this.post(Message.COMPLETE);
      }
    }

    /**
     * getTexture
     *
     * @param {string} name
     *
     * @return {Texture|null}
     */

  }, {
    key: 'getTexture',
    value: function getTexture(name) {
      /** @type {Texture} */
      var t = this.mTextures[name];

      if (t != null) return t;

      for (var key in this.mAtlases) {
        t = this.mAtlases[key].getTexture(name);
        if (t != null) return t;
      }

      return null;
    }

    /**
     * @param {string} name
     *
     * @return {AtlasTexture}
     */

  }, {
    key: 'getAtlas',
    value: function getAtlas(name) {
      return this.mAtlases[name];
    }

    /**
     * defaultPath
     *
     * @return {string}
     */

  }, {
    key: 'defaultPath',
    get: function get() {
      return this.mDefaultPath;
    }

    /**
     * defaultPath
     *
     * @param {string} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mDefaultPath = value;
    }

    /**
     * isAllLoaded
     *
     * @return {boolean}
     */

  }, {
    key: 'isAllLoaded',
    get: function get() {
      return this.mIsAllLoaded;
    }
  }]);

  return AssetManager;
}(MessageDispatcher);

/** @type {AssetManager} */


AssetManager.default = new AssetManager();
'use strict';

/**
 * A blend mode enum.
 * @cat drivers
 * @enum {string}
 */

var BlendMode = {
  AUTO: 'auto',
  NORMAL: 'source-over',
  ADD: 'lighter',
  MULTIPLY: 'multiply',
  SCREEN: 'screen',
  OVERLAY: 'overlay',
  DARKEN: 'darken',
  LIGHTEN: 'lighten',
  COLOR_DODGE: 'color-dodge',
  COLOR_BURN: 'color-burn',
  HARD_LIGHT: 'hard-light',
  SOFT_LIGHT: 'soft-light',
  DIFFERENCE: 'difference',
  EXCLUSION: 'exclusion',
  HUE: 'hue',
  SATURATE: 'saturate',
  COLOR: 'color',
  LUMINOSITY: 'luminosity'
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for custom video drivers. VideoDriver is used to render things
 * onto the screen.
 *
 * @cat drivers
 */

var VideoNullDriver = function () {
  /**
   * @param  {HTMLElement} containerElement
   * @param  {number} width
   * @param  {number} height
   */
  function VideoNullDriver(containerElement, width, height) {
    _classCallCheck(this, VideoNullDriver);

    /**
     * @private
     * @type {string}
     */
    this.mGlobalBlendMode = 'auto';

    /**
     * @private
     * @type {HTMLElement}
     */
    this.mContainerElement = /**
                             * @private
                             * @type {HTMLElement} */containerElement;

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

    /**
     * @private
     * @type {HTMLElement}
     */
    this.mMeasureElement = /** @type {HTMLElement} */document.createElement('span');
    this.mMeasureElement.style.position = 'absolute';
    this.mContainerElement.appendChild(this.mMeasureElement);

    Black.instance.viewport.on('resize', this.__onResize, this);
  }

  /**
   * @protected
   * @ignore
   * @param {type} msg
   * @param {type} rect
   *
   * @returns {type}
   */


  _createClass(VideoNullDriver, [{
    key: '__onResize',
    value: function __onResize(msg, rect) {
      var w = this.mContainerElement.clientWidth;
      var h = this.mContainerElement.clientHeight;

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

  }, {
    key: 'start',
    value: function start() {}

    /**
     * Called before rendering anything. Usually used to clear back-buffer.
     *
     * @protected
     *
     * @returns {void}
     */

  }, {
    key: 'beginFrame',
    value: function beginFrame() {}

    /**
     * Called after rendering is finished.
     * @protected
     *
     * @returns {void}
     */

  }, {
    key: 'endFrame',
    value: function endFrame() {}

    /**
     * @ignore
     * @param {HTMLElement} canvas
     * @return {Texture|null}
     */

  }, {
    key: 'getTextureFromCanvas',
    value: function getTextureFromCanvas(canvas) {
      return null;
    }

    /**
     * Sets world transformation for future use.
     *
     * @protected
     * @param {Matrix} m An transformation matrix to store.
     *
     * @return {void}
     */

  }, {
    key: 'setTransform',
    value: function setTransform(m) {
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

  }, {
    key: 'drawImage',


    /**
     * Draws image onto the back-buffer. GlobalAlpha, BlendMode and transformation
     * matrix must be set prior to calling this method.
     *
     * @protected
     *
     * @param  {Texture} texture
     */
    value: function drawImage(texture) {}

    /**
     * Draws text onto back-buffer.
     *
     * @protected
     *
     * @param {string} text Text string to draw.
     * @param {TextInfo} style The style information.
     * @param {Rectangle} bounds Clipping bounds, text wont be drawn outside this bounds.
     * @param {number} textWidth The width of the text.
     * @param {number} textHeight The height of the text.
     *
     * @return {void}
     */

  }, {
    key: 'drawText',
    value: function drawText(text, style, bounds, textWidth, textHeight) {}

    /**
     * Clears back-buffer.
     *
     * @protected
     *
     * @returns {void}
     */

  }, {
    key: 'clear',
    value: function clear() {}

    /**
     * Used to save context if extists.
     *
     * @ignore
     * @protected
     * @param {GameObject|null} gameObject Used for internal binding.
     *
     * @return {void}
     */

  }, {
    key: 'save',
    value: function save(gameObject) {}

    /**
     * Used to restore context if extists.
     *
     * @protected
     * @ignore
     * @returns {type}
     */

  }, {
    key: 'restore',
    value: function restore() {}

    /**
     * Convers number color to hex string.
     *
     * @param {number} color The color to convert.
     *
     * @returns {string} The resuling hex string.
     */

  }, {
    key: 'hexColorToString',
    value: function hexColorToString(color) {
      var parsedColor = color.toString(16);
      return '#000000'.substring(0, 7 - parsedColor.length) + parsedColor;
    }

    /**
     * Measures text with a given style.
     *
     * @param {string} text    Text to measure.
     * @param {TextInfo} style Text style to apply onto text.
     *
     * @return {Vector} A Vector with width and height of the text bounds.
     */

  }, {
    key: 'measureText',
    value: function measureText(text, style) {
      var el = this.mMeasureElement;
      el.innerHTML = text;
      el.style.whiteSpace = 'pre';
      el.style.fontSize = style.size + 'px';
      el.style.fontFamily = style.name;
      el.style.fontStyle = style.style;
      el.style.fontWeight = style.weight;

      var v = new Vector(el.offsetWidth + style.strokeThickness, el.offsetHeight + style.strokeThickness);
      el.innerHTML = '';

      return v;
    }
  }, {
    key: 'globalAlpha',
    get: function get() {
      return this.mGlobalAlpha;
    }

    /**
     * @ignore
     * @param {number} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mGlobalAlpha = value;
    }

    /**
     * Gets/Sets global blending mode. Used to calculate blend mode relative to
     * parent object.
     *
     * @return {string}
     */

  }, {
    key: 'globalBlendMode',
    get: function get() {
      return this.mGlobalBlendMode;
    }

    /**
     * @ignore
     * @param {string} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mGlobalBlendMode = value;
    }
  }]);

  return VideoNullDriver;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An video driver that draw everything into DOM Canvas element.
 *
 * @cat drivers
 * @extends VideoNullDriver
 */

var CanvasDriver = function (_VideoNullDriver) {
  _inherits(CanvasDriver, _VideoNullDriver);

  /**
   * @param  {HTMLElement} containerElement The DOM element to draw into.
   * @param  {number} width                 The width of the viewport.
   * @param  {number} height                The height of the viewport.
   */
  function CanvasDriver(containerElement, width, height) {
    _classCallCheck(this, CanvasDriver);

    /**
     * @private
     * @type {CanvasRenderingContext2D|null}
     */
    var _this = _possibleConstructorReturn(this, (CanvasDriver.__proto__ || Object.getPrototypeOf(CanvasDriver)).call(this, containerElement, width, height));

    _this.mCtx = null;

    _this.mGlobalAlpha = 1;
    _this.mGlobalBlendMode = BlendMode.NORMAL;

    _this.__createCanvas();
    return _this;
  }

  /**
   * @private
   * @return {void}
   */


  _createClass(CanvasDriver, [{
    key: '__createCanvas',
    value: function __createCanvas() {
      var cvs = /** @type {HTMLCanvasElement} */document.createElement('canvas');
      cvs.id = 'canvas';
      this.mContainerElement.appendChild(cvs);

      this.mCtx = /** @type {CanvasRenderingContext2D} */cvs.getContext('2d');
      this.mCtx.canvas.width = this.mClientWidth;
      this.mCtx.canvas.height = this.mClientHeight;
    }

    /**
     * @private
     * @param {Message} msg
     * @param {Rectangle} rect
     *
     * @returns {void}
     */

  }, {
    key: '__onResize',
    value: function __onResize(msg, rect) {
      _get(CanvasDriver.prototype.__proto__ || Object.getPrototypeOf(CanvasDriver.prototype), '__onResize', this).call(this, msg, rect);

      this.mCtx.canvas.width = this.mClientWidth;
      this.mCtx.canvas.height = this.mClientHeight;
    }

    /**
     * @ignore
     * @param {Matrix} m
     *
     * @return {void}
     */

  }, {
    key: 'setTransform',
    value: function setTransform(m) {
      _get(CanvasDriver.prototype.__proto__ || Object.getPrototypeOf(CanvasDriver.prototype), 'setTransform', this).call(this, m);

      var v = m.value;
      this.mCtx.setTransform(v[0], v[1], v[2], v[3], v[4], v[5]);
    }

    /**
     * @param {number} value
     *
     * @return {void}
     */

  }, {
    key: 'drawImage',


    /**
     * drawImage
     *
     * @inheritdoc
     * @override
     *
     * @param {Texture} texture
     *
     * @return {void}
     */
    value: function drawImage(texture) {
      var w = texture.width;
      var h = texture.height;
      var ox = texture.untrimmedRect.x;
      var oy = texture.untrimmedRect.y;

      this.mCtx.drawImage(texture.native, texture.region.x, texture.region.y, w, h, ox, oy, w, h);
    }

    /**
     * drawText
     *
     * @inheritdoc
     * @override
     *
     * @param {string} text
     * @param {TextInfo} style
     * @param {Rectangle} bounds
     * @param {number} textWidth
     * @param {number} textHeight
     *
     * @return {void}
     */

  }, {
    key: 'drawText',
    value: function drawText(text, style, bounds, textWidth, textHeight) {
      this.mCtx.beginPath();
      this.mCtx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
      this.mCtx.clip();

      this.mCtx.font = style.style + ' ' + style.weight + ' ' + style.size + 'px "' + style.name + '"';
      this.mCtx.fillStyle = this.hexColorToString(style.color);

      var x = 0;
      if (style.align === 'center') x = bounds.width * 0.5 - textWidth * 0.5;else if (style.align === 'right') x = bounds.width - textWidth;

      this.mCtx.textBaseline = 'top';
      this.mCtx.fillText(text, x, 0);

      if (style.strokeThickness > 0) {
        this.mCtx.lineWidth = style.strokeThickness;
        this.mCtx.strokeStyle = this.hexColorToString(style.strokeColor);
        this.mCtx.strokeText(text, x, 0);
      }
      this.mCtx.closePath();
    }

    /**
     * clear
     * @inheritdoc
     * @override
     *
     * @return {void}
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.mCtx.clearRect(0, 0, this.mCtx.canvas.width, this.mCtx.canvas.height);
    }

    /**
     * @inheritdoc
     * @override
     *
     * @return {void}
     */

  }, {
    key: 'beginFrame',
    value: function beginFrame() {
      _get(CanvasDriver.prototype.__proto__ || Object.getPrototypeOf(CanvasDriver.prototype), 'beginFrame', this).call(this);

      this.clear();
      this.mCtx.save();
    }

    /**
     * @inheritdoc
     * @override
     *
     * @return {void}
     */

  }, {
    key: 'endFrame',
    value: function endFrame() {
      _get(CanvasDriver.prototype.__proto__ || Object.getPrototypeOf(CanvasDriver.prototype), 'endFrame', this).call(this);

      this.mCtx.restore();
    }

    /**
     * @ignore
     * @param {HTMLElement} canvas
     *
     * @return {Texture|null}
     */

  }, {
    key: 'getTextureFromCanvas',
    value: function getTextureFromCanvas(canvas) {
      return new Texture(canvas, new Rectangle(0, 0, canvas.width, canvas.height));
    }

    /**
     * save
     *
     * @override
     * @param {GameObject|null} gameObject Used for internal binding.
     *
     * @return {void}
     */

  }, {
    key: 'save',
    value: function save(gameObject) {
      this.mCtx.save();
    }

    /**
     * restore
     *
     * @return {void}
     */

  }, {
    key: 'restore',
    value: function restore() {
      this.mCtx.restore();
    }
  }, {
    key: 'globalAlpha',
    set: function set(value) {
      this.mGlobalAlpha = value;
      this.mCtx.globalAlpha = value;
    }

    /**
     * @inheritdoc
     * @override
     *
     * @param {string} blendMode
     *
     * @return {void}
     */

  }, {
    key: 'globalBlendMode',
    set: function set(blendMode) {
      if (blendMode === BlendMode.AUTO) return;

      this.mGlobalBlendMode = blendMode;
      this.mCtx.globalCompositeOperation = blendMode;
    }
  }]);

  return CanvasDriver;
}(VideoNullDriver);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An video driver that draw everything into DOM elements itself.
 *
 * @cat drivers
 * @extends VideoNullDriver
 */

var DOMDriver = function (_VideoNullDriver) {
  _inherits(DOMDriver, _VideoNullDriver);

  /**
   * @param  {HTMLElement} containerElement The DOM element to draw into.
   * @param  {number} width                 The width of the viewport.
   * @param  {number} height                The height of the viewport.
   */
  function DOMDriver(containerElement, width, height) {
    _classCallCheck(this, DOMDriver);

    /** @type {number} */
    var _this = _possibleConstructorReturn(this, (DOMDriver.__proto__ || Object.getPrototypeOf(DOMDriver)).call(this, containerElement, width, height));

    _this.mGlobalAlpha = 1;

    /** @type {Array<Element>} */
    _this.mCache = [];

    /** @type {number} */
    _this.mCounter = 0;

    /** @type {boolean} */
    _this.mPixelated = true;

    /** @type {GameObject|null} */
    _this.mCurrentObject = null;
    _this.__initCSS();
    return _this;
  }

  /**
   * @inheritdoc
   * @override
   * @param {GameObject|null} gameObject Used for internal binding.
   *
   * @return {void} Description
   */


  _createClass(DOMDriver, [{
    key: 'save',
    value: function save(gameObject) {
      this.mCurrentObject = gameObject;
    }

    /**
     * @private
     *
     * @return {void}  description
     */

  }, {
    key: '__initCSS',
    value: function __initCSS() {
      var imgRendering = 'image-rendering:optimizeSpeed; image-rendering:optimize-contrast; image-rendering:crisp-edges; image-rendering:pixelated';

      var sSprite = document.createElement('style');
      sSprite.type = 'text/css';
      sSprite.innerHTML = '.sprite { position: absolute; background-repeat: no-repeat; cursor: default !important; -webkit-transform-origin: 0px 0px;}';
      document.getElementsByTagName('head')[0].appendChild(sSprite);

      var sSpritePixelated = document.createElement('style');
      sSpritePixelated.type = 'text/css';
      sSpritePixelated.innerHTML = '.sprite-p { position: absolute; background-repeat: no-repeat; cursor: default !important; -webkit-transform-origin: 0px 0px; ' + imgRendering + '}';
      document.getElementsByTagName('head')[0].appendChild(sSpritePixelated);

      var sText = document.createElement('style');
      sText.type = 'text/css';
      sText.innerHTML = '.text { position: absolute; white-space: pre; overflow: hidden; cursor: default !important; -webkit-transform-origin: 0px 0px;}';
      document.getElementsByTagName('head')[0].appendChild(sText);

      var sViewport = document.createElement('style');
      sViewport.type = 'text/css';
      sViewport.innerHTML = '.viewport { width: 100%; height: 100%; position: relative; overflow: hidden; cursor: default; }';
      document.getElementsByTagName('head')[0].appendChild(sViewport);

      this.mContainerElement.className = 'viewport';
    }

    /**
     * @inheritdoc
     * @override
     *
     * @return {void}  description
     */

  }, {
    key: 'beginFrame',
    value: function beginFrame() {
      this.mCounter = 0;
    }

    /**
     * @inheritdoc
     * @override
     *
     * @return {void}  description
     */

  }, {
    key: 'endFrame',
    value: function endFrame() {
      if (this.mCounter === this.mCache.length) return;

      //TODO: cleanup unused divs
      //TODO: remove them instead of hiding
      for (var i = this.mCounter; i < this.mCache.length; i++) {
        var el = this.mCache[i];

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

  }, {
    key: 'getTextureFromCanvas',
    value: function getTextureFromCanvas(canvas) {
      return Texture.fromCanvasAsImage(canvas);
    }

    /**
     * @override
     * @inheritdoc
     *
     * @param  {Texture} texture
     * @return {void}
     */

  }, {
    key: 'drawImage',
    value: function drawImage(texture) {
      /** @type {Matrix|null} */
      var oldTransform = this.mTransform;

      if (texture.untrimmedRect.x !== 0 || texture.untrimmedRect.y !== 0) {
        Matrix.__cache.set(1, 0, 0, 1, texture.untrimmedRect.x, texture.untrimmedRect.y);
        this.mTransform.append(Matrix.__cache);
      }

      var el = this.__popElement(this.mPixelated ? 'sprite-p' : 'sprite');
      this.__updateElementCommon(el);
      this.__updateImageElement(el, texture);

      this.mTransform = oldTransform;
    }

    /**
     * @inheritdoc
     * @override
     *
     * @param {string} text
     * @param {TextInfo} style
     * @param {Rectangle} bounds
     * @param {number} textWidth
     * @param {number} textHeight
     *
     * @return {void}
     */

  }, {
    key: 'drawText',
    value: function drawText(text, style, bounds, textWidth, textHeight) {
      var el = this.__popElement('text');
      this.__updateElementCommon(el);

      // TODO: check this type. review the code.
      this.__updateTextElement( /** @type {HTMLElement} */el, text, style, bounds);
    }

    /**
     * @private
     * @param {string} className
     *
     * @return {Element}
     */

  }, {
    key: '__popElement',
    value: function __popElement(className) {
      this.mCounter++;

      if (this.mCounter <= this.mCache.length) return this.mCache[this.mCounter - 1];

      var el = document.createElement('div');
      el.className = className;
      this.mContainerElement.appendChild(el);

      this.mCache.push(el);
      return el;
    }

    /**
     * @private
     * @param {Element} el
     *
     * @return {void}
     */

  }, {
    key: '__updateElementCommon',
    value: function __updateElementCommon(el) {
      var v = this.mTransform.value;

      // TODO: slow, rework
      // NOTE: toFixed(0) is faster then toFixed(6)
      var transform = 'matrix(' + v[0].toFixed(6) + ', ' + v[1].toFixed(6) + ', ' + v[2].toFixed(6) + ', ' + v[3].toFixed(6) + ', ' + v[4].toFixed(6) + ', ' + v[5].toFixed(6) + ')';
      //let transform = `matrix(${v[0]}, ${v[1]}, ${v[2]}, ${v[3]}, ${v[4]}, ${v[5]})`;

      //console.log(el.style.transform, transform);
      if (el.style.webkitTransform !== transform) el.style.webkitTransform = transform;

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

  }, {
    key: '__updateImageElement',
    value: function __updateImageElement(el, texture) {
      if (texture) {
        var url = 'url(' + texture.native.src + ')';

        if (el.style.backgroundImage !== url) el.style.backgroundImage = url;

        if (texture.isSubTexture) {
          var vBackgroundPosition = -texture.region.x + 'px ' + -texture.region.y + 'px';

          if (el.style.backgroundPosition !== vBackgroundPosition) el.style.backgroundPosition = vBackgroundPosition;
        }
      } else {
        el.style.backgroundImage = 'none';
      }

      if (el.style.width != texture.width + 'px') el.style.width = texture.width + 'px';

      if (el.style.height != texture.height + 'px') el.style.height = texture.height + 'px';

      if (el.innerHTML !== '') el.innerHTML = '';
    }

    /**
     * @private
     * @param {HTMLElement} el
     * @param {string} text
     * @param {TextInfo} style
     * @param {Rectangle} bounds
     *
     * @return {void}
     */

  }, {
    key: '__updateTextElement',
    value: function __updateTextElement(el, text, style, bounds) {
      el.innerHTML = text;
      el.style.fontSize = style.size + 'px';

      if (el.style.width !== bounds.width + 'px') el.style.width = bounds.width + 'px';

      if (el.style.height !== bounds.height + 'px') el.style.height = bounds.height + 'px';

      if (el.style.fontFamily !== style.name) el.style.fontFamily = style.name;

      var color = this.hexColorToString(style.color);

      if (el.style.color != color) el.style.color = color;

      if (el.style.fontStyle !== style.style) el.style.fontStyle = style.style;

      if (el.style.fontWeight != style.weight) el.style.fontWeight = style.weight;

      if (el.style.textAlign !== style.align) el.style.textAlign = style.align;

      if (style.strokeThickness > 0) {
        var strokeColor = this.hexColorToString(style.strokeColor);

        if (el.style.webkitTextStrokeColor != strokeColor) el.style.webkitTextStrokeColor = strokeColor;

        if (el.style.webkitTextStrokeWidth != style.strokeThickness + 'px') {
          el.style.webkitTextStrokeWidth = style.strokeThickness + 'px';
        }
      }

      if (el.style.backgroundImage !== 'none') el.style.backgroundImage = 'none';
    }
  }]);

  return DOMDriver;
}(VideoNullDriver);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The base class for all renderable objects. Adds `alpha` and `visible` properties to GameObject.
 *
 * @cat display
 * @extends GameObject
 */

var DisplayObject = function (_GameObject) {
  _inherits(DisplayObject, _GameObject);

  function DisplayObject() {
    _classCallCheck(this, DisplayObject);

    /**
     * @private
     * @type {number}
     */
    var _this = _possibleConstructorReturn(this, (DisplayObject.__proto__ || Object.getPrototypeOf(DisplayObject)).call(this));

    _this.mAlpha = 1;

    /**
     * @private
     * @type {string}
     */
    _this.blendMode = BlendMode.AUTO;

    /**
     * @private
     * @type {boolean}
     */
    _this.mVisible = true;
    return _this;
  }

  /**
   * @ignore
   * @param {VideoNullDriver} video
   * @param {number} time
   * @param {number} parentAlpha
   * @param {string} parentBlendMode
   *
   * @return {void}
   */


  _createClass(DisplayObject, [{
    key: "__render",
    value: function __render(video, time, parentAlpha, parentBlendMode) {
      if (this.mVisible === false) return;

      this.onRender(video, time);

      var child = null;
      for (var i = 0; i < this.mChildren.length; i++) {
        child = this.mChildren[i];
        child.__render(video, time, parentAlpha, parentBlendMode);
      }
    }

    /**
     * Gets/Sets the opacity of the object.
     *
     * @return {number}
     */

  }, {
    key: "alpha",
    get: function get() {
      return this.mAlpha;
    }

    /**
     * @ignore
     * @param {number} value
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mAlpha = Math.clamp(value, 0, 1);
    }

    /**
     * Gets/Sets visibility of the object.
     *
     * @return {boolean}
     */

  }, {
    key: "visible",
    get: function get() {
      return this.mVisible;
    }

    /**
     * @ignore
     * @param {boolean} value
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mVisible = value;
    }
  }]);

  return DisplayObject;
}(GameObject);
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Holds TextField's style details.
 *
 * @cat display.text
 */

var TextInfo =
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
function TextInfo() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'sans-serif';
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0x000000;
    var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 14;
    var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TextInfo.FontStyle.NORMAL;
    var weight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : TextInfo.FontWeight.NORMAL;
    var align = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : TextInfo.FontAlign.LEFT;
    var strokeThickness = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var strokeColor = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0xffffff;

    _classCallCheck(this, TextInfo);

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
};

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
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sprite is used to render Texture onto screen.
 *
 * @cat display
 * @extends DisplayObject
 */

var Sprite = function (_DisplayObject) {
  _inherits(Sprite, _DisplayObject);

  /**
   * constructor - Creates a new Sprite object instance.
   *
   * @param {Texture|string|null} texture The Texture instance or null.
   */
  function Sprite() {
    var texture = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Sprite);

    /**
     * @private
     * @type {Texture|null} */
    var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this));

    _this.mTexture = null;

    if (texture !== null && texture.constructor === String) _this.mTexture = AssetManager.default.getTexture( /** @type {string} */texture);else _this.mTexture = /** @type {Texture} */texture;
    return _this;
  }

  /**
   * @override
   * @private
   * @param {VideoNullDriver} video
   * @param {number} time
   * @param {number} parentAlpha
   * @param {string} parentBlendMode
   *
   * @return {void}
   */


  _createClass(Sprite, [{
    key: "__render",
    value: function __render(video, time, parentAlpha, parentBlendMode) {
      if (this.mAlpha <= 0 || this.mVisible === false) return;

      var tmpBlendMode = BlendMode.AUTO;

      if (this.mTexture !== null) {
        video.save(this);
        video.setTransform(this.worldTransformation);
        video.globalAlpha = parentAlpha * this.mAlpha;
        video.globalBlendMode = tmpBlendMode = this.blendMode === BlendMode.AUTO ? parentBlendMode : this.blendMode;
        video.drawImage(this.mTexture);
        video.restore();
      }

      _get(Sprite.prototype.__proto__ || Object.getPrototypeOf(Sprite.prototype), "__render", this).call(this, video, time, parentAlpha * this.mAlpha, tmpBlendMode);
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

  }, {
    key: "onGetLocalBounds",
    value: function onGetLocalBounds() {
      var outRect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      outRect = outRect || new Rectangle();

      if (!this.mTexture) return outRect;

      return outRect.set(0, 0, this.mTexture.untrimmedRect.width, this.mTexture.untrimmedRect.height);
    }

    /**
     * texture - Returns the current Texture on this sprite.
     *
     * @return {Texture|null} The current texture set on this Sprite or null.
     */

  }, {
    key: "texture",
    get: function get() {
      return this.mTexture;
    }

    /**
     * texture - Sets the Texture on this sprite.
     *
     * @param {Texture|null} texture Texture to apply on.
     *
     * @return {void}
     */
    ,
    set: function set(texture) {
      if (this.mTexture === texture) return;

      this.mTexture = texture;
    }
  }, {
    key: "touchable",
    set: function set(value) {
      var c = this.getComponent(InputComponent);

      if (value === true) {
        if (c === null) this.addComponent(new InputComponent());else c.touchable = true;
      } else {
        if (c !== null) this.removeComponent(c);
      }
    },
    get: function get() {
      var c = this.getComponent(InputComponent);
      return c !== null && c.touchable === true;
    }
  }]);

  return Sprite;
}(DisplayObject);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class is used to create display text.
 *
 * @cat display.text
 * @extends DisplayObject
 */

var TextField = function (_DisplayObject) {
  _inherits(TextField, _DisplayObject);

  /**
   * @param  {string=} text Text to be displayed inside this text field
   * @param  {number=} size text size
   * @param  {string=} name font name
   * @param {TextInfo=} style TextInfo object
   */
  function TextField() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 14;
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'sans-serif';
    var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    _classCallCheck(this, TextField);

    /**
     * @private
     * @type {string}
     */
    var _this = _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this));

    _this.mText = text;

    /**
     * @private
     * @type {boolean}
     */
    _this.mNeedInvalidate = true;

    /**
     * @private
     * @type {Rectangle}
     */
    _this.mCacheBounds = new Rectangle();

    /**
     * @private
     * @type {number}
     */
    _this.mFieldWidth = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mFieldHeight = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mTextWidth = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mTextHeight = 0;

    /**
     * @private
     * @type {TextInfo}
     */
    _this.mStyle = style || new TextInfo();

    /**
     * @private
     * @type {string}
     */
    _this.mStyle.name = name || style.name;

    /**
     * @private
     * @type {number}
     */
    _this.mStyle.size = size || style.size;

    /**
     * @private
     * @type {boolean}
     */
    _this.mAutoSize = true;

    _this.__validate(_this.mCacheBounds);
    return _this;
  }

  /**
   * @ignore
   * @override
   * @protected
   * @param {VideoNullDriver} video
   * @param {number} time
   * @param {number} parentAlpha
   * @param {string} parentBlendMode
   *
   * @return {void}
   */


  _createClass(TextField, [{
    key: '__render',
    value: function __render(video, time, parentAlpha, parentBlendMode) {
      if (this.mAlpha <= 0 || this.mVisible === false) return;

      this.__validate(this.mCacheBounds);

      var tmpBlendMode = BlendMode.AUTO;

      video.save(this);
      video.setTransform(this.worldTransformation);
      video.globalAlpha = parentAlpha * this.mAlpha;
      video.globalBlendMode = tmpBlendMode = this.blendMode === BlendMode.AUTO ? parentBlendMode : this.blendMode;
      video.drawText(this.mText, this.mStyle, this.mCacheBounds, this.mTextWidth, this.mTextHeight);
      video.restore();

      _get(TextField.prototype.__proto__ || Object.getPrototypeOf(TextField.prototype), '__render', this).call(this, video, time, parentAlpha * this.mAlpha, tmpBlendMode);
    }

    /**
     * @protected
     * @override
     * @ignore
     * @param {Rectangle=} outRect
     *
     * @return {Rectangle}
     */

  }, {
    key: 'onGetLocalBounds',
    value: function onGetLocalBounds() {
      var outRect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      outRect = outRect || new Rectangle();
      return this.__validate(outRect);
    }

    /**
     * @private
     * @ignore
     * @param {Rectangle} outRect
     *
     * @return {Rectangle}
     */

  }, {
    key: '__validate',
    value: function __validate(outRect) {
      var strokeCorrection = 0 - this.mStyle.strokeThickness * 0.5;
      if (this.mNeedInvalidate === false) return outRect.set(strokeCorrection, strokeCorrection, this.mFieldWidth, this.mFieldHeight);

      var driver = Black.instance.video;
      var vSize = driver.measureText(this.mText, this.mStyle);
      this.mTextWidth = vSize.x;
      this.mTextHeight = vSize.y;

      if (this.mAutoSize) {
        this.mFieldWidth = this.mTextWidth;
        this.mFieldHeight = this.mTextHeight;
      }

      this.mNeedInvalidate = false;
      return outRect.set(strokeCorrection, strokeCorrection, this.mFieldWidth, this.mFieldHeight);
    }

    /**
     * Get/Set text size.
     *
     * @return {number}
     */

  }, {
    key: 'size',
    get: function get() {
      return this.mStyle.size;
    }

    /**
     * @param {number} value
     * @ignore
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mStyle.size = value;
      this.mNeedInvalidate = true;
    }

    /**
     * Get/Set text font.
     *
     * @return {string}
     */

  }, {
    key: 'font',
    get: function get() {
      return this.mStyle.name;
    }

    /**
     * @param {string} value
     * @ignore
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mStyle.name = value;
      this.mNeedInvalidate = true;
    }

    /**
     * Specifies text color as hexadecimal number eg 0xff0000 (total red)
     *
     * @return {number}
     */

  }, {
    key: 'color',
    get: function get() {
      return this.mStyle.color;
    }

    /**
     * @param {number} value
     * @ignore
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mStyle.color = value;
    }

    /**
     * Get/Set text style.
     *
     * @return {TextInfo.FontStyle}
     */

  }, {
    key: 'style',
    get: function get() {
      return this.mStyle.style;
    }

    /**
     *
     * @param {TextInfo.FontStyle} value
     * @ignore
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mStyle.style = value;
      this.mNeedInvalidate = true;
    }

    /**
     * Specifies the font thick. The value is set from 100 to 900 in increments of 100.
     *
     * @return {TextInfo.FontWeight}
     */

  }, {
    key: 'weight',
    get: function get() {
      return this.mStyle.weight;
    }

    /**
     * @param {TextInfo.FontWeight} value
     * @ignore
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mStyle.weight = value;
      this.mNeedInvalidate = true;
    }

    /**
     * Specifies the horizontal alignment left | center | right
     *
     * @return {TextInfo.FontAlign}
     */

  }, {
    key: 'align',
    get: function get() {
      return this.mStyle.align;
    }

    /**
     * @param {TextInfo.FontAlign} value
     * @ignore
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mStyle.align = value;
    }

    /**
     * Specifies stroke color as hexadecimal number eg 0xff0000 (total red)
     * @return {number}
     */

  }, {
    key: 'strokeColor',
    get: function get() {
      return this.mStyle.strokeColor;
    }

    /**
     * @param {number} value
     * @ignore
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mStyle.strokeColor = value;
    }

    /**
     * Specifies the thickness of the stroke. 0 means that no stroke
     * @return {number}
     */

  }, {
    key: 'strokeThickness',
    get: function get() {
      return this.mStyle.strokeThickness;
    }

    /**
     * @param {number} value
     * @ignore
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (value === this.mStyle.strokeThickness) return;

      this.mStyle.strokeThickness = value;
      this.mNeedInvalidate = true;
    }

    /**
     * Specifies the width of the text field. If autoSize set as false
     *
     * @return {number}
     */

  }, {
    key: 'fieldWidth',
    get: function get() {
      return this.mFieldWidth;
    }

    /**
     * @param {number} value
     * @ignore
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (this.mAutoSize || value === this.mFieldWidth) return;

      this.mFieldWidth = value;
      this.mNeedInvalidate = true;
    }

    /** Specifies the height of the text field, if autoSize set as false
     *
     * @return {number}
     */

  }, {
    key: 'fieldHeight',
    get: function get() {
      return this.mFieldHeight;
    }

    /**
     * @param {number} value
     * @ignore
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (this.mAutoSize || value === this.mFieldHeight) return;

      this.mFieldHeight = value;
      this.mNeedInvalidate = true;
    }

    /**Text to be displayed inside this text field.
       * @return {string}
     */

  }, {
    key: 'text',
    get: function get() {
      return this.mText;
    }

    /**
     * @param {string} value
     * @ignore
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (this.mText === value) return;

      this.mText = value;
      this.mNeedInvalidate = true;
    }

    /**
     * Determines whether the size of the field will adjust to the size of the text. Note: if this set as true, you need to specify fieldHeight and fieldWidth manually
     *
     * @return {boolean}
     */

  }, {
    key: 'autoSize',
    get: function get() {
      return this.mAutoSize;
    }

    /**
     * @param {boolean} value
     * @ignore
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (this.mAutoSize === value) return;

      this.mAutoSize = value;
      this.mNeedInvalidate = true;
    }
  }]);

  return TextField;
}(DisplayObject);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Device = function () {
  function Device() {
    _classCallCheck(this, Device);

    /** @type {Device} */
    this.constructor.mInstance = this;

    /** @type {number} */
    this.mPixelRatio = 0;

    /** @type {number} */
    Device.mInstance.mPixelRatio = Device.getDevicePixelRatio();
  }

  /**
   * @return {string}
   */


  _createClass(Device, null, [{
    key: 'getDevicePixelRatio',


    /**
     * getDevicePixelRatio - Description
     *
     * @suppress {missingProperties}
     *
     * @return {number} Description
     */
    value: function getDevicePixelRatio() {
      if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) return window.screen.systemXDPI / window.screen.logicalXDPI;else if (window.devicePixelRatio !== undefined) return window.devicePixelRatio;

      return 1;
    }
  }, {
    key: 'os',
    get: function get() {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/windows phone/i.test(userAgent)) return 'Windows Phone';

      if (/android/i.test(userAgent)) return 'Android';

      if (/iPad|iPhone|iPod/.test(userAgent) /* && !window.MSStream*/) return 'iOS';

      return 'unknown';
    }

    /**
     * isTouch - Description
     *
     * @return {boolean} Description
     */

  }, {
    key: 'isTouch',
    get: function get() {
      var hasEvent = 'ontouchstart' in window;
      if (hasEvent) return true;

      if (navigator.maxTouchPoints > 0) return true;

      return false;
    }

    /**
     * isMobile - Description
     *
     * @return {boolean} Description
     */

  }, {
    key: 'isMobile',
    get: function get() {
      return (/Mobi/.test(navigator.userAgent)
      );
    }

    /**
     * pixelRatio - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'pixelRatio',
    get: function get() {
      return Device.mInstance.mPixelRatio;
    }
  }]);

  return Device;
}();

/** @type {Device}
 * @nocollapse
 */


Device.mInstance = null;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scatter = function () {
  function Scatter() {
    _classCallCheck(this, Scatter);
  }

  /**
   * getValue
   *
   * @return {*}
   */


  _createClass(Scatter, [{
    key: "getValue",
    value: function getValue() {}

    /**
     * getValueAt
     *
     * @param {number} t
     *
     * @return {*}
     */

  }, {
    key: "getValueAt",
    value: function getValueAt(t) {}
  }]);

  return Scatter;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FloatScatter = function (_Scatter) {
  _inherits(FloatScatter, _Scatter);

  function FloatScatter(min) {
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var ease = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, FloatScatter);

    // NOTE: dont make us @private @member
    var _this = _possibleConstructorReturn(this, (FloatScatter.__proto__ || Object.getPrototypeOf(FloatScatter)).call(this));

    _this.min = min;
    _this.max = max == null ? min : max;

    _this.ease = ease;
    return _this;
  }

  /**
   * getValue
   *
   * @return {number}
   */


  _createClass(FloatScatter, [{
    key: "getValue",
    value: function getValue() {
      return Math.random() * (this.max - this.min) + this.min;
    }

    /**
     * getValueAt
     *
     * @param {number} t
     *
     * @return {number}
     */

  }, {
    key: "getValueAt",
    value: function getValueAt(t) {
      if (this.ease !== null) t = this.ease(t);

      return this.min + t * (this.max - this.min);
    }
  }]);

  return FloatScatter;
}(Scatter);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VectorScatter = function (_Scatter) {
  _inherits(VectorScatter, _Scatter);

  function VectorScatter(minX, minY, maxX, maxY) {
    _classCallCheck(this, VectorScatter);

    // NOTE: dont make us @private @member
    var _this = _possibleConstructorReturn(this, (VectorScatter.__proto__ || Object.getPrototypeOf(VectorScatter)).call(this));

    _this.minX = minX;
    _this.minY = minY;
    _this.maxX = maxX;
    _this.maxY = maxY;
    return _this;
  }

  /**
   * getValue
   *
   * @return {Vector}
   */


  _createClass(VectorScatter, [{
    key: "getValue",
    value: function getValue() {
      var outVector = new Vector();
      outVector.x = Math.random() * (this.maxX - this.minX) + this.minX;
      outVector.y = Math.random() * (this.maxY - this.minY) + this.minY;
      return outVector;
    }

    /**
     * getValueAt
     *
     * @param {number} t
     *
     * @return {Vector}
     */

  }, {
    key: "getValueAt",
    value: function getValueAt(t) {
      var outVector = new Vector();
      outVector.x = this.minX + t * (this.maxX - this.minX);
      outVector.y = this.minY + t * (this.maxY - this.minY);
      return outVector;
    }
  }]);

  return VectorScatter;
}(Scatter);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FloatCurveScatter = function (_Scatter) {
  _inherits(FloatCurveScatter, _Scatter);

  /**
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  function FloatCurveScatter() {
    var _this$mCurve;

    _classCallCheck(this, FloatCurveScatter);

    var _this = _possibleConstructorReturn(this, (FloatCurveScatter.__proto__ || Object.getPrototypeOf(FloatCurveScatter)).call(this));

    _this.mCurve = new Curve();
    _this.mCurve.baked = true;
    (_this$mCurve = _this.mCurve).set.apply(_this$mCurve, arguments);

    _this.mCache = new Vector();
    return _this;
  }

  _createClass(FloatCurveScatter, [{
    key: "getValue",
    value: function getValue() {
      var t = Math.random();
      this.mCurve.interpolate(t, this.mCache);
      return this.mCache.y;
    }
  }, {
    key: "getValueAt",
    value: function getValueAt(t) {
      this.mCurve.interpolate(t, this.mCache);
      return this.mCache.y;
    }
  }]);

  return FloatCurveScatter;
}(Scatter);

var VectorCurveScatter = function (_Scatter2) {
  _inherits(VectorCurveScatter, _Scatter2);

  /**
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  function VectorCurveScatter() {
    var _this2$mCurve;

    _classCallCheck(this, VectorCurveScatter);

    var _this2 = _possibleConstructorReturn(this, (VectorCurveScatter.__proto__ || Object.getPrototypeOf(VectorCurveScatter)).call(this));

    _this2.mCurve = new Curve();
    _this2.mCurve.baked = true;
    (_this2$mCurve = _this2.mCurve).set.apply(_this2$mCurve, arguments);

    _this2.mCache = new Vector();
    return _this2;
  }

  _createClass(VectorCurveScatter, [{
    key: "getValue",
    value: function getValue() {
      var t = Math.random();
      this.mCurve.interpolate(t, this.mCache);
      return this.mCache;
    }
  }, {
    key: "getValueAt",
    value: function getValueAt(t) {
      this.mCurve.interpolate(t, this.mCache);
      return this.mCache;
    }
  }]);

  return VectorCurveScatter;
}(Scatter);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A base class for particle system actions. Every frame each action executed over each particle.
 * 
 * @category particles.actions
 * @abstract
 * @class
 */

var Action = function () {
  /**
   * Creates new Action instance.
   */
  function Action() {
    _classCallCheck(this, Action);
  }

  /**
   * Called for every particle before any update method called.
   *
   * @protected
   * @param {number} dt Amount of seconds since the last update.
   *
   * @return {void} Description
   */


  _createClass(Action, [{
    key: "preUpdate",
    value: function preUpdate(dt) {}

    /**
     * Called for every particle.
     *
     * @protected
     * @param {Emitter} emmiter   The owner of the particle.
     * @param {Particle} particle The particle to execute update on.
     * @param {number} dt         Amount of seconds since the last update.
     *
     * @return {void}
     */

  }, {
    key: "update",
    value: function update(emmiter, particle, dt) {}

    /**
     * Called after all updates have been executed.
     *
     * @protected
     * @param {number} dt Amount of seconds since the last update.
     *
     * @return {void}
     */

  }, {
    key: "postUpdate",
    value: function postUpdate(dt) {}
  }]);

  return Action;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Adds acceleration to particles along given direction.
 * 
 * @category particles.actions
 * @extends Action
 * @class
 */

var Acceleration = function (_Action) {
  _inherits(Acceleration, _Action);

  /**
   * Creates new Acceleration instance.
   *
   * @param {VectorScatter} vectorScatter An VectorScatter which defines acceleration direction.
   */
  function Acceleration(vectorScatter) {
    _classCallCheck(this, Acceleration);

    /**
     * @private
     * @type {VectorScatter}
     */
    var _this = _possibleConstructorReturn(this, (Acceleration.__proto__ || Object.getPrototypeOf(Acceleration)).call(this));

    _this.mScatter = vectorScatter;
    return _this;
  }

  /**
   * @ignore
   * @override
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */


  _createClass(Acceleration, [{
    key: "update",
    value: function update(emmiter, particle, dt, t) {
      var v = this.mScatter.getValue();

      particle.ax += v.x;
      particle.ay += v.y;
    }

    /**
     * Returns VectorScatter object that defines acceleration direction.
     * @member {VectorScatter}
     * @return {VectorScatter}
     */

  }, {
    key: "scatter",
    get: function get() {
      return this.mScatter;
    }
  }]);

  return Acceleration;
}(Action);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets particle's alpha value according to its energy value.
 * 
 * @category particles.actions
 * @extends Action
 * @class
 */

var AlphaOverLife = function (_Action) {
  _inherits(AlphaOverLife, _Action);

  /**
   * Creates new AlphaOverLife instance.
   *
   * @param {FloatScatter} floatScatter A starting and ending values of alpha property.
   */
  function AlphaOverLife(floatScatter) {
    _classCallCheck(this, AlphaOverLife);

    /**
     * @private
     * @type {FloatScatter}
     */
    var _this = _possibleConstructorReturn(this, (AlphaOverLife.__proto__ || Object.getPrototypeOf(AlphaOverLife)).call(this));

    _this.mScatter = floatScatter;
    return _this;
  }

  /**
   * @ignore
   * @override
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */


  _createClass(AlphaOverLife, [{
    key: "update",
    value: function update(emmiter, particle, dt, t) {
      particle.alpha = this.mScatter.getValueAt(particle.energy);
    }

    /**
     * Returns FloatScatter object that defines alpha value over particle life.
     * @member {FloatScatter}
     * @return {FloatScatter}
     */

  }, {
    key: "scatter",
    get: function get() {
      return this.mScatter;
    }
  }]);

  return AlphaOverLife;
}(Action);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets particle's scale value according to its energy value.
 * 
 * @category particles.actions
 * @extends Action
 * @class
 */

var ScaleOverLife = function (_Action) {
  _inherits(ScaleOverLife, _Action);

  function ScaleOverLife(floatScatter) {
    _classCallCheck(this, ScaleOverLife);

    /**
     * @private
     * @type {FloatScatter}
     */
    var _this = _possibleConstructorReturn(this, (ScaleOverLife.__proto__ || Object.getPrototypeOf(ScaleOverLife)).call(this));

    _this.mScatter = floatScatter;
    return _this;
  }

  /**
   * @ignore
   * @override
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */


  _createClass(ScaleOverLife, [{
    key: "update",
    value: function update(emmiter, particle, dt, t) {
      particle.scale = this.mScatter.getValueAt(particle.energy);
    }

    /**
     * Returns FloatScatter object that defines scale value over particle life.
     * @member {FloatScatter}
     * @return {FloatScatter}
     */

  }, {
    key: "scatter",
    get: function get() {
      return this.mScatter;
    }
  }]);

  return ScaleOverLife;
}(Action);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets particle's rotation value according to its energy value.
 * 
 * @category particles.actions
 * @extends Action
 * @class
 */

var RotationOverLife = function (_Action) {
  _inherits(RotationOverLife, _Action);

  function RotationOverLife(floatScatter) {
    _classCallCheck(this, RotationOverLife);

    /**
     * @private
     * @type {FloatScatter}
     */
    var _this = _possibleConstructorReturn(this, (RotationOverLife.__proto__ || Object.getPrototypeOf(RotationOverLife)).call(this));

    _this.mScatter = floatScatter;
    return _this;
  }

  /**
   * @ignore
   * @override
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */


  _createClass(RotationOverLife, [{
    key: "update",
    value: function update(emmiter, particle, dt, t) {
      particle.r = this.mScatter.getValueAt(particle.energy);
    }

    /**
     * Returns FloatScatter object that defines rotation value over particle life.
     * @member {FloatScatter}
     * @return {FloatScatter}
     */

  }, {
    key: "scatter",
    get: function get() {
      return this.mScatter;
    }
  }]);

  return RotationOverLife;
}(Action);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets particle's texture according to its energy value.
 * 
 * @category particles.actions
 * @extends Action
 * @class
 */

var TextureOverLife = function (_Action) {
  _inherits(TextureOverLife, _Action);

  function TextureOverLife(floatScatter) {
    _classCallCheck(this, TextureOverLife);

    /**
     * @private
     * @type {FloatScatter}
     */
    var _this = _possibleConstructorReturn(this, (TextureOverLife.__proto__ || Object.getPrototypeOf(TextureOverLife)).call(this));

    _this.mScatter = floatScatter;
    return _this;
  }

  /**
   * @ignore
   * @override
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */


  _createClass(TextureOverLife, [{
    key: "update",
    value: function update(emmiter, particle, dt, t) {
      particle.textureIndex = ~~this.mScatter.getValueAt(particle.energy);
    }

    /**
     * Returns FloatScatter object that defines texture value over particle life.
     * @member {FloatScatter}
     * @return {FloatScatter}
     */

  }, {
    key: "scatter",
    get: function get() {
      return this.mScatter;
    }
  }]);

  return TextureOverLife;
}(Action);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for particle's initializators. Each initializer updates particle data once at start, eg when particle added to scene.
 *
 * @category particles.initializers
 * @class
 */

var Initializer = function () {
  function Initializer() {
    _classCallCheck(this, Initializer);
  }

  _createClass(Initializer, [{
    key: "initialize",

    /**
     * @param {Particle} particle
     *
     * @return {void}
     */
    value: function initialize(particle) {}
  }]);

  return Initializer;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets particle's life.
 *
 * @category particles.initializers
 * @extends Initializer
 * @class
 */

var Life = function (_Initializer) {
  _inherits(Life, _Initializer);

  /**
   * constructor - Description
   *
   * @param {FloatScatter} floatScatter Description
   *
   * @return {void} Description
   */
  function Life(floatScatter) {
    _classCallCheck(this, Life);

    /** @type {FloatScatter} */
    var _this = _possibleConstructorReturn(this, (Life.__proto__ || Object.getPrototypeOf(Life)).call(this));

    _this.scatter = floatScatter;
    return _this;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */


  _createClass(Life, [{
    key: "initialize",
    value: function initialize(particle) {
      particle.life = this.scatter.getValue();
    }
  }]);

  return Life;
}(Initializer);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets particle's mass.
 *
 * @category particles.initializers
 * @extends Initializer
 * @class
 */

var Mass = function (_Initializer) {
  _inherits(Mass, _Initializer);

  /**
   * constructor - Description
   *
   * @param {number} mass Description
   *
   * @return {void} Description
   */
  function Mass(mass) {
    _classCallCheck(this, Mass);

    /** @type {number} */
    var _this = _possibleConstructorReturn(this, (Mass.__proto__ || Object.getPrototypeOf(Mass)).call(this));

    _this.mass = mass;
    return _this;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */


  _createClass(Mass, [{
    key: "initialize",
    value: function initialize(particle) {
      particle.mass = this.mass;
    }
  }]);

  return Mass;
}(Initializer);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets particle's starting scale.
 *
 * @category particles.initializers
 * @extends Initializer
 * @class
 */

var Scale = function (_Initializer) {
  _inherits(Scale, _Initializer);

  /**
   * constructor - Description
   *
   * @param {FloatScatter} floatScatter Description
   *
   * @return {void} Description
   */
  function Scale(floatScatter) {
    _classCallCheck(this, Scale);

    /** @type {FloatScatter} */
    var _this = _possibleConstructorReturn(this, (Scale.__proto__ || Object.getPrototypeOf(Scale)).call(this));

    _this.scatter = floatScatter;
    return _this;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */


  _createClass(Scale, [{
    key: "initialize",
    value: function initialize(particle) {
      particle.scale = this.scatter.getValue();
    }
  }]);

  return Scale;
}(Initializer);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets particle's starting velocity.
 *
 * @category particles.initializers
 * @extends Initializer
 * @class
 */

var Velocity = function (_Initializer) {
  _inherits(Velocity, _Initializer);

  /**
   * constructor - Description
   *
   * @param {VectorScatter} vectorScatter Description
   *
   * @return {void} Description
   */
  function Velocity(vectorScatter) {
    _classCallCheck(this, Velocity);

    /** @type {VectorScatter} */
    var _this = _possibleConstructorReturn(this, (Velocity.__proto__ || Object.getPrototypeOf(Velocity)).call(this));

    _this.scatter = vectorScatter;
    return _this;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */


  _createClass(Velocity, [{
    key: "initialize",
    value: function initialize(particle) {
      // TODO: optimize!
      var v = this.scatter.getValue();
      particle.vx = v.x;
      particle.vy = v.y;
    }
  }]);

  return Velocity;
}(Initializer);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets particle's position.
 *
 * @category particles.initializers
 * @extends Initializer
 * @class
 */

var Position = function (_Initializer) {
  _inherits(Position, _Initializer);

  /**
   * constructor - Description
   *
   * @param {VectorScatter} vectorScatter Description
   *
   * @return {void} Description
   */
  function Position(vectorScatter) {
    _classCallCheck(this, Position);

    /** @type {VectorScatter} */
    var _this = _possibleConstructorReturn(this, (Position.__proto__ || Object.getPrototypeOf(Position)).call(this));

    _this.scatter = vectorScatter;
    return _this;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */


  _createClass(Position, [{
    key: "initialize",
    value: function initialize(particle) {
      // TODO: optimize!
      var v = this.scatter.getValue();
      particle.x = v.x;
      particle.y = v.y;
    }
  }]);

  return Position;
}(Initializer);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets particle's default rotation.
 *
 * @category particles.initializers
 * @extends Initializer
 * @class
 */

var Rotation = function (_Initializer) {
  _inherits(Rotation, _Initializer);

  /**
   * constructor - Description
   *
   * @param {FloatScatter} floatScatter Description
   *
   * @return {void} Description
   */
  function Rotation(floatScatter) {
    _classCallCheck(this, Rotation);

    /** @type {FloatScatter} */
    var _this = _possibleConstructorReturn(this, (Rotation.__proto__ || Object.getPrototypeOf(Rotation)).call(this));

    _this.scatter = floatScatter;
    return _this;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */


  _createClass(Rotation, [{
    key: "initialize",
    value: function initialize(particle) {
      particle.r = this.scatter.getValue();
    }
  }]);

  return Rotation;
}(Initializer);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets particle's texture.
 *
 * @category particles.initializers
 * @extends Initializer
 * @class
 */

var RandomTexture = function (_Initializer) {
  _inherits(RandomTexture, _Initializer);

  /**
   * constructor - Description
   *
   * @param {FloatScatter} floatScatter Description
   *
   * @return {void} Description
   */
  function RandomTexture(floatScatter) {
    _classCallCheck(this, RandomTexture);

    /** @type {FloatScatter} */
    var _this = _possibleConstructorReturn(this, (RandomTexture.__proto__ || Object.getPrototypeOf(RandomTexture)).call(this));

    _this.scatter = floatScatter;
    return _this;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */


  _createClass(RandomTexture, [{
    key: "initialize",
    value: function initialize(particle) {
      particle.textureIndex = ~~this.scatter.getValue();
    }
  }]);

  return RandomTexture;
}(Initializer);
"use strict";

/**
 * @enum {number}
 */
var EmitterState = {
  PENDING: 0,
  EMITTING: 1,
  FINISHED: 2
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
    function Particle() {
        _classCallCheck(this, Particle);

        this.reset();
    }

    _createClass(Particle, [{
        key: "reset",
        value: function reset() {
            /** @type {number} */
            this.textureIndex = 0;

            /** @type {number} */
            this.scale = 1;

            /** @type {number} */
            this.alpha = 1;

            /** @type {number} */
            this.life = 1;

            /** @type {number} */
            this.age = 0;

            /** @type {number} */
            this.energy = this.age / this.life;

            /** @type {number} */
            this.mass = 0;

            /** @type {number} */
            this.x = 0;

            /** @type {number} */
            this.y = 0;

            /** @type {number} */
            this.r = 0;

            /** @type {number} */
            this.vx = 0;

            /** @type {number} */
            this.vy = 0;

            /** @type {number} */
            this.ax = 0;

            /** @type {number} */
            this.ay = 0;
        }

        /**
         * update
         *
         * @param {number} dt
         *
         * @return {void}
         */

    }, {
        key: "update",
        value: function update(dt) {
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
    }]);

    return Particle;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Emitter = function (_DisplayObject) {
  _inherits(Emitter, _DisplayObject);

  function Emitter() {
    _classCallCheck(this, Emitter);

    /** @type {Array<Texture>} */
    var _this = _possibleConstructorReturn(this, (Emitter.__proto__ || Object.getPrototypeOf(Emitter)).call(this));

    _this.mTextures = null;

    /** @type {Array<Particle>} */
    _this.mParticles = [];

    /** @type {Array<Particle>} */
    _this.mRecycled = [];

    /** @type {Array<Initializer>} */
    _this.mInitializers = [];

    /** @type {Array<Action>} */
    _this.mActions = [];

    /** @type {GameObject} */
    _this.mSpace = null;

    /** @type {boolean} */
    _this.mIsLocal = true;

    /** @type {number} */
    _this.mMaxParticles = 10000;

    /** @type {FloatScatter} */
    _this.mEmitCount = new FloatScatter(10);

    /** @type {FloatScatter} */
    _this.mEmitNumRepeats = new FloatScatter(Infinity);

    /** @type {number} */
    _this.mEmitNumRepeatsLeft = _this.mEmitNumRepeats.getValue();

    /** @type {FloatScatter} */
    _this.mEmitDuration = new FloatScatter(1);

    /** @type {number} */
    _this.mEmitDurationLeft = _this.mEmitDuration.getValue();

    /** @type {FloatScatter} */
    _this.mEmitInterval = new FloatScatter(0.1);

    /** @type {number} */
    _this.mEmitIntervalLeft = _this.mEmitInterval.getValue();

    /** @type {FloatScatter} */
    _this.mEmitDelay = new FloatScatter(1);

    /** @type {number} */
    _this.mEmitDelayLeft = _this.mEmitDelay.getValue();

    /** @type {number} */
    _this.mNextUpdateAt = 0;

    /** @type {EmitterState} */
    _this.mState = EmitterState.PENDING;

    // /** @type {function(a:Particle, b:Particle):number} */
    // this.mComparer = null;

    /** @type {Matrix} */
    _this.__tmpLocal = new Matrix();

    /** @type {Matrix} */
    _this.__tmpWorld = new Matrix();
    return _this;
  }

  // reset() {
  //   this.mState = 0;
  //
  //   // todo: reset simulation
  //   // todo: clear all particles
  //   this.updateNextTick(0);
  // }

  _createClass(Emitter, [{
    key: 'resetState',
    value: function resetState() {
      this.mState = EmitterState.PENDING;
    }

    /**
     * updateNextTick - Updates delay, duration, interval. Use this function each time you change one of those values.
     *
     * @param {number} [dt=0]
     *
     * @return {void}
     */

  }, {
    key: 'updateNextTick',
    value: function updateNextTick() {
      var dt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var t = Black.instance.uptime;
      var firstEmit = false;

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
            this.mNextUpdateAt = t;
            this.mEmitIntervalLeft = this.mEmitInterval.getValue();
          } else {
            this.mEmitIntervalLeft -= dt;
            this.mNextUpdateAt = t + this.mEmitIntervalLeft;
            //console.log(this.mEmitIntervalLeft);

            // reset interval
            if (this.mEmitIntervalLeft <= 0) this.mEmitIntervalLeft = this.mEmitInterval.getValue();
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

  }, {
    key: 'addInitializer',
    value: function addInitializer(initializer) {
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

  }, {
    key: 'addAction',
    value: function addAction(action) {
      this.mActions.push(action);
      return action;
    }
  }, {
    key: '__render',
    value: function __render(video, time, parentAlpha, parentBlendMode) {
      video.save(this);

      // set blend mode
      var tmpBlendMode = BlendMode.AUTO;
      video.globalBlendMode = tmpBlendMode = this.blendMode === BlendMode.AUTO ? parentBlendMode : this.blendMode;

      // tmp matrices
      var localTransform = this.__tmpLocal;
      var worldTransform = this.__tmpWorld;
      localTransform.identity();

      var texture = null;

      if (this.mTextures.length > 0) {
        var plength = this.mParticles.length;
        var particle = void 0;
        for (var i = 0; i < plength; i++) {
          //for (let i = plength - 1; i > 0; i--) {
          particle = this.mParticles[i];
          texture = this.mTextures[particle.textureIndex];

          var tw = texture.width * 0.5;
          var th = texture.height * 0.5;

          if (particle.r === 0) {
            var tx = particle.x - tw * particle.scale;
            var ty = particle.y - th * particle.scale;
            localTransform.set(particle.scale, 0, 0, particle.scale, tx, ty);
          } else {
            var cos = Math.cos(particle.r);
            var sin = Math.sin(particle.r);
            var a = particle.scale * cos;
            var b = particle.scale * sin;
            var c = particle.scale * -sin;
            var d = particle.scale * cos;

            var _tx = particle.x - tw * a - th * c;
            var _ty = particle.y - tw * b - th * d;
            localTransform.set(a, b, c, d, _tx, _ty);
          }

          if (this.mIsLocal === true) {
            worldTransform.identity();
            worldTransform.copyFrom(localTransform);
            worldTransform.prepend(this.worldTransformation);
          } else {
            this.mSpace.worldTransformation.copyTo(worldTransform);
            worldTransform.append(localTransform);
          }

          video.setTransform(worldTransform);
          video.globalAlpha = parentAlpha * this.mAlpha * particle.alpha;
          video.drawImage(texture);
        }
      }

      video.restore();
      _get(Emitter.prototype.__proto__ || Object.getPrototypeOf(Emitter.prototype), '__render', this).call(this, video, time, parentAlpha, parentBlendMode);
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(dt) {
      // rate logic
      this.updateNextTick(dt);

      if (Black.instance.uptime >= this.mNextUpdateAt && this.mState === EmitterState.EMITTING) this.__create(this.mEmitCount.getValue());

      // main update login
      var alength = this.mActions.length;
      var plength = this.mParticles.length;

      for (var _i = 0; _i < alength; _i++) {
        this.mActions[_i].preUpdate(dt);
      }var particle = void 0;

      var i = this.mParticles.length;
      while (i--) {
        particle = this.mParticles[i];

        for (var k = 0; k < alength; k++) {
          this.mActions[k].update(this, particle, dt);
        }particle.update(dt);

        if (particle.life === 0) {
          this.mRecycled.push(particle);
          this.mParticles.splice(i, 1);
        }
      }

      for (var j = 0; j < alength; j++) {
        this.mActions[j].postUpdate(dt);
      }
    }
  }, {
    key: '__create',
    value: function __create(amount) {
      var matrix = this.worldTransformation.clone();
      var minv = null;

      if (this.mIsLocal === false) {
        minv = this.mSpace.worldTransformationInversed.clone();
        matrix.prepend(minv);
      }

      for (var i = 0; i < amount; i++) {
        var p = null;

        if (this.mRecycled.length > 0) {
          p = this.mRecycled.pop();
        } else {
          if (this.mParticles.length >= this.mMaxParticles) return;

          p = new Particle();
        }

        p.reset();

        for (var k = 0; k < this.mInitializers.length; k++) {
          var initer = this.mInitializers[k];
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

  }, {
    key: 'maxParticles',
    get: function get() {
      return this.mMaxParticles;
    }

    /**
     * maxParticles
     *
     * @param {number} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (value < 0) throw new Error('Bad argument error.');

      this.mMaxParticles = value;
    }

    /**
     * emitCount
     *
     * @return {FloatScatter}
     */

  }, {
    key: 'emitCount',
    get: function get() {
      return this.mEmitCount;
    }

    /**
     * emitCount
     *
     * @param {FloatScatter} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mEmitCount = value;
    }

    /**
     * emitNumRepeats
     *
     * @return {FloatScatter}
     */

  }, {
    key: 'emitNumRepeats',
    get: function get() {
      return this.mEmitNumRepeats;
    }

    /**
     * emitNumRepeats
     *
     * @param {FloatScatter} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mEmitNumRepeats = value;this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();
    }

    /**
     * emitDuration
     *
     * @return {FloatScatter}
     */

  }, {
    key: 'emitDuration',
    get: function get() {
      return this.mEmitDuration;
    }

    /**
     * emitDuration
     *
     * @param {FloatScatter} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mEmitDuration = value;this.mEmitDurationLeft = this.mEmitDuration.getValue();
    }

    /**
     * emitInterval
     *
     * @return {FloatScatter}
     */

  }, {
    key: 'emitInterval',
    get: function get() {
      return this.mEmitInterval;
    }

    /**
     * emitInterval
     *
     * @param {FloatScatter} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mEmitInterval = value;this.mEmitIntervalLeft = this.mEmitInterval.getValue();
    }

    /**
     * emitDelay
     *
     * @return {FloatScatter}
     */

  }, {
    key: 'emitDelay',
    get: function get() {
      return this.mEmitDelay;
    }

    /**
     * emitDelay
     *
     * @param {FloatScatter} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mEmitDelay = value;this.mEmitDelayLeft = this.mEmitDelay.getValue();
    }

    /**
     * space
     *
     * @return {GameObject}
     */

  }, {
    key: 'space',
    get: function get() {
      return this.mSpace;
    }

    /**
     * space
     *
     * @param {GameObject} gameObject
     *
     * @return {void}
     */
    ,
    set: function set(gameObject) {
      this.mSpace = gameObject;
      this.mIsLocal = this.mSpace === null || this.mSpace === this;
    }

    /**
     * textures
     *
     * @return {Array<Texture>}
     */

  }, {
    key: 'textures',
    get: function get() {
      return this.mTextures;
    }

    /**
     * textures
     *
     * @param {Array<Texture>} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (value.length === 0) throw new Error('At least one texture must be provided.');

      this.mTextures = value;
    }
  }]);

  return Emitter;
}(DisplayObject);
"use strict";

/**
 * @enum {number}
 */

var Key = {
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  DIGIT_0: 48,
  DIGIT_1: 49,
  DIGIT_2: 50,
  DIGIT_3: 51,
  DIGIT_4: 52,
  DIGIT_5: 53,
  DIGIT_6: 54,
  DIGIT_7: 55,
  DIGIT_8: 56,
  DIGIT_9: 57,
  NUMPAD_0: 96,
  NUMPAD_1: 97,
  NUMPAD_2: 98,
  NUMPAD_3: 99,
  NUMPAD_4: 100,
  NUMPAD_5: 101,
  NUMPAD_6: 102,
  NUMPAD_7: 103,
  NUMPAD_8: 104,
  NUMPAD_9: 105,
  NUMPAD_MULTIPLY: 106,
  NUMPAD_ADD: 107,
  NUMPAD_SUBTRACT: 109,
  NUMPAD_DECIMAL: 110,
  NUMPAD_DIVIDE: 111,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  PAUSE_BREAK: 19,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  INSERT: 45,
  DELETE: 46,
  LEFT_WINDOW: 91,
  RIGHT_WINDOW: 92,
  CONTEXT_MENU: 93,
  NUM_LOCK: 144,
  SCROLL_LOCK: 145,
  SEMI_COLON: 186,
  EQUAL_SIGN: 187,
  COMMA: 188,
  DASH: 189,
  PERIOD: 190,
  FORWARD_SLASH: 191,
  BACKQUOTE: 192,
  BRAKET_LEFT: 219,
  BACK_SLASH: 220,
  BRAKET_RIGHT: 221,
  SINGLE_QUOTE: 222
};
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyInfo =

/**
 * constructor - Description
 *
 * @param {Event} nativeEvent Description
 *
 * @return {void} Description
 */
function KeyInfo(nativeEvent) {
  _classCallCheck(this, KeyInfo);

  this.keyCode = nativeEvent.keyCode;
  this.code = nativeEvent.code;
  this.char = nativeEvent.key;
  this.shiftKey = nativeEvent.shiftKey;
  this.altKey = nativeEvent.altKey;
  this.ctrlKey = nativeEvent.ctrlKey;
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Has to be static class.

+ before update store all events locally
- check root object! add collider automatically? or do it on demand?
*/

var Input = function (_System) {
  _inherits(Input, _System);

  function Input() {
    _classCallCheck(this, Input);

    /** @type {Input} */
    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this));

    _this.constructor.instance = _this;

    /** @type {Vector} */
    _this.mPointerPosition = new Vector();

    /** @type {Element} */
    _this.mDom = Black.instance.containerElement;

    /** @type {Array<string>} */
    _this.mEventList = null;

    /** @type {Array<string>} */
    _this.mKeyEventList = null;

    _this.__initListeners();

    /** @type {Array<{e: Event, x: number, y:number}>} */
    _this.mPointerQueue = [];

    /** @type {Array<Event>} */
    _this.mKeyQueue = [];

    /** @type {Array<number>} */
    _this.mPressedKeys = [];

    /** @type {boolean} */
    _this.mIsPointerDown = false;

    _this.mNeedUpEvent = false;

    /** @type {Array<InputComponent>} */
    _this.mInputListeners = [];
    return _this;
  }

  _createClass(Input, [{
    key: '__initListeners',
    value: function __initListeners() {
      var _this2 = this;

      this.mKeyEventList = Input.mKeyEventList;
      //debugger;

      if (window.PointerEvent) this.mEventList = Input.mPointerEventList;else if (Device.isTouch && Device.isMobile) this.mEventList = Input.mTouchEventList;else this.mEventList = Input.mMouseEventList;

      for (var i = 0; i < 6; i++) {
        this.mDom.addEventListener(this.mEventList[i], function (e) {
          return _this2.__onPointerEvent(e);
        }, false);
      }document.addEventListener(this.mEventList[Input.POINTER_UP], function (e) {
        return _this2.__onPointerEventDoc(e);
      }, false);

      for (var _i = 0; _i < this.mKeyEventList.length; _i++) {
        document.addEventListener(this.mKeyEventList[_i], function (e) {
          return _this2.__onKeyEvent(e);
        }, false);
      }
    }
  }, {
    key: '__sortListeners',
    value: function __sortListeners() {
      // TODO: make it faster
      // - try insert sort
      this.mInputListeners.sort(function (x, y) {
        return y.gameObject.depth - x.gameObject.depth || y.gameObject.index - x.gameObject.index;
      });
    }

    /**
     * @param {Event} e
     *
     * @return {boolean}
     */

  }, {
    key: '__onKeyEvent',
    value: function __onKeyEvent(e) {
      this.mKeyQueue.push(e);
      return true;
    }
  }, {
    key: '__onPointerEventDoc',
    value: function __onPointerEventDoc(e) {
      var over = e.target == this.mDom || e.target.parentElement == this.mDom;

      if (over === false && this.mNeedUpEvent === true) {
        this.mNeedUpEvent = false;
        this.__pushEvent(e);
      }
    }

    /**
     * @param {Event} e Description
     *
     * @return {boolean} Description
     */

  }, {
    key: '__onPointerEvent',
    value: function __onPointerEvent(e) {
      e.preventDefault();

      this.__pushEvent(e);

      return true;
    }
  }, {
    key: '__pushEvent',
    value: function __pushEvent(e) {
      var /** @type {Vector|null} */p = null;
      if (e.type.indexOf('touch') === 0) p = this.__getTouchPos(this.mDom, /** @type {TouchEvent} */e);else p = this.__getPointerPos(this.mDom, e);

      this.mPointerPosition.x = p.x;
      this.mPointerPosition.y = p.y;

      this.mPointerQueue.push({
        e: e,
        x: p.x,
        y: p.y
      });
    }

    /**
     * __getPointerPos - Description
     *
     * @param {Element} canvas Description
     * @param {Event} evt    Description
     *
     * @return {Vector} Description
     */

  }, {
    key: '__getPointerPos',
    value: function __getPointerPos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.clientWidth / rect.width;
      var scaleY = canvas.clientHeight / rect.height;
      return new Vector((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY);
    }

    /**
     * __getTouchPos - Description
     *
     * @param {Element} canvas Description
     * @param {TouchEvent} evt    Description
     *
     * @return {Vector} Description
     */

  }, {
    key: '__getTouchPos',
    value: function __getTouchPos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();

      /** @type {Touch} */
      var touch = evt.changedTouches[0]; // ios? what about android?
      var x = touch.clientX;
      var y = touch.clientY;

      var scaleX = canvas.clientWidth / rect.width;
      var scaleY = canvas.clientHeight / rect.height;
      return new Vector((x - rect.left) * scaleX, (y - rect.top) * scaleY);
    }

    /**
     * __addListener - Description
     *
     * @param {Array<InputComponent>} array Description
     *
     * @return {void} Description
     */

  }, {
    key: '__addListener',
    value: function __addListener(array) {
      // check for duplicates
      for (var i = 0; i < array.length; i++) {
        var item = /** @type {InputComponent} */array[i];

        if (this.mInputListeners.indexOf(item) === -1) this.mInputListeners.push(item);
      }

      this.__sortListeners();
    }

    /**
     * onChildrenAdded - Description
     *
     * @param {GameObject} child Description
     *
     * @return {void} Description
     */

  }, {
    key: 'onChildrenAdded',
    value: function onChildrenAdded(child) {
      var cs = GameObject.findComponents(child, InputComponent);
      if (!cs || cs.length === 0) return;

      this.__addListener(cs);
    }

    /**
     * onChildrenRemoved - Description
     *
     * @param {GameObject} child Description
     *
     * @return {void} Description
     */

  }, {
    key: 'onChildrenRemoved',
    value: function onChildrenRemoved(child) {
      var cs = GameObject.findComponents(child, InputComponent);
      if (!cs || cs.length === 0) return;

      for (var i = cs.length - 1; i >= 0; i--) {
        var component = cs[i];
        var index = this.mInputListeners.indexOf( /** @type {InputComponent} */component);

        if (index !== -1) this.mInputListeners.splice(index, 1);
      }

      this.__sortListeners();
    }

    /**
     * onComponentAdded - Description
     *
     * @param {GameObject} child     Description
     * @param {Component} component Description
     *
     * @return {void} Description
     */

  }, {
    key: 'onComponentAdded',
    value: function onComponentAdded(child, component) {
      if (component.constructor !== InputComponent) return;

      this.__addListener([component]);
    }

    /**
     * onComponentRemoved - Description
     *
     * @param {GameObject} child     Description
     * @param {Component} component Description
     *
     * @return {void} Description
     */

  }, {
    key: 'onComponentRemoved',
    value: function onComponentRemoved(child, component) {
      if (component.constructor !== InputComponent) return;

      var index = this.mInputListeners.indexOf( /** @type {InputComponent} */component);
      if (index !== -1) {
        this.mInputListeners.splice(index, 1);
        this.__sortListeners();
      }
    }

    /**
     * onUpdate - Description
     *
     * @param {number} dt Description
     *
     * @return {void} Description
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate(dt) {
      var pointerPos = new Vector();

      for (var i = 0; i < this.mPointerQueue.length; i++) {
        var nativeEvent = this.mPointerQueue[i];

        var ix = this.mEventList.indexOf(nativeEvent.e.type);
        var fnName = Input.mInputEventsLookup[ix];

        if (fnName === 'pointerDown') this.mNeedUpEvent = true;

        pointerPos.set(nativeEvent.x, nativeEvent.y);

        /** @type {InputComponent|null} */
        var currentComponent = null;
        for (var k = 0; k < this.mInputListeners.length; k++) {
          currentComponent = this.mInputListeners[k];

          // if (currentComponent.gameObject === null)
          //   console.log(currentComponent);

          if (GameObject.intersects(currentComponent.gameObject, pointerPos) === false) {
            // check for out events
            if (currentComponent.mPointerInside === true) {
              currentComponent.mPointerInside = false;
              currentComponent.gameObject.post('~pointerOut');
            }

            continue;
          }

          // TODO: fix weird extra pointerMove bug on chrome, happens right after down and before up
          if (ix === Input.POINTER_DOWN) this.mIsPointerDown = true;else if (ix === Input.POINTER_UP) this.mIsPointerDown = false;

          if (currentComponent.mPointerInside === false) {
            currentComponent.mPointerInside = true;
            currentComponent.gameObject.post('~pointerIn');
          }

          currentComponent.gameObject.post('~' + fnName);
        }

        this.post(fnName);
      }

      for (var _i2 = 0; _i2 < this.mKeyQueue.length; _i2++) {
        var _nativeEvent = this.mKeyQueue[_i2];

        var _ix = this.mKeyEventList.indexOf(_nativeEvent.type);
        var pIx = this.mPressedKeys.indexOf(_nativeEvent.keyCode);
        var _fnName = Input.mKeyEventsLookup[_ix];

        if (_fnName === 'keyUp' && pIx !== -1) this.mPressedKeys.splice(pIx, 1);else if (_fnName === 'keyDown' && pIx === -1) {
          this.mPressedKeys.push(_nativeEvent.keyCode);
          _fnName = 'keyPress';
        }

        this.post(_fnName, new KeyInfo(_nativeEvent), _nativeEvent);
      }

      this.mPointerQueue.splice(0, this.mPointerQueue.length);
      this.mKeyQueue.splice(0, this.mKeyQueue.length);
    }

    /**
     * on - Description
     *
     * @param {string} name           Description
     * @param {Function} callback       Description
     * @param {Object=} [context=null] Description
     *
     * @return {void} Description
     */

  }], [{
    key: 'on',
    value: function on(name, callback) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      Input.instance.on(name, callback, context);
    }

    /**
     * isPointerDown - Description
     *
     * @return {boolean} Description
     */

  }, {
    key: 'isPointerDown',
    get: function get() {
      return Input.instance.mIsPointerDown;
    }

    /**
     * pointerX - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'pointerX',
    get: function get() {
      return Input.instance.mPointerPosition.x;
    }

    /**
     * pointerY - Description
     *
     * @return {number} Description
     */

  }, {
    key: 'pointerY',
    get: function get() {
      return Input.instance.mPointerPosition.y;
    }

    /**
     * pointerPosition - Description
     *
     * @return {Vector} Description
     */

  }, {
    key: 'pointerPosition',
    get: function get() {
      return Input.instance.mPointerPosition;
    }
  }, {
    key: 'pressedKeys',
    get: function get() {
      return Input.instance.mPressedKeys;
    }
  }]);

  return Input;
}(System);

/** @type {Input}
 * @nocollapse
 */


Input.instance = null;

/** @type {number}
 *  @const
 */
Input.POINTER_MOVE = 0;

/** @type {number}
 *  @const
 */
Input.POINTER_DOWN = 1;

/** @type {number}
 *  @const
 */
Input.POINTER_UP = 2;

/** @type {number}
 *  @const
 */
Input.POINTER_CANCEL = 3;

/** @type {number}
 *  @const
 */
Input.POINTER_IN = 4;

/** @type {number}
 *  @const
 */
Input.POINTER_OUT = 5;

/** @type {Array<string>}
 *  @const
 */
Input.mKeyEventList = ['keydown', 'keyup'];

/** @type {Array<string>}
 *  @const
 */
Input.mKeyEventsLookup = ['keyDown', 'keyUp', 'keyPress'];

/** @type {Array<string>}
 *  @const
 */
Input.mInputEventsLookup = ['pointerMove', 'pointerDown', 'pointerUp', 'pointerIn', 'pointerOut'];

/** @type {Array<string>}
 *  @const
 */
Input.mPointerEventList = ['pointermove', 'pointerdown', 'pointerup', 'pointerenter', 'pointerleave'];

/** @type {Array<string>}
 *  @const
 */
Input.mMouseEventList = ['mousemove', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'];

/** @type {Array<string>}
 *  @const
 */
Input.mTouchEventList = ['touchmove', 'touchstart', 'touchend', 'touchenter', 'touchleave'];
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputComponent = function (_Component) {
    _inherits(InputComponent, _Component);

    /**
     * @return {void}
     */
    function InputComponent() {
        _classCallCheck(this, InputComponent);

        /** @type {boolean} */
        var _this = _possibleConstructorReturn(this, (InputComponent.__proto__ || Object.getPrototypeOf(InputComponent)).call(this));

        _this.touchable = true;

        /* INTERNAL */

        /** @type {boolean} */
        _this.mPointerInside = false;
        return _this;
    }

    return InputComponent;
}(Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Basic FPS component. Shows frame rate.
 *
 * @cat components
 * @extends Component
 */

var FPSComponent = function (_Component) {
  _inherits(FPSComponent, _Component);

  function FPSComponent() {
    _classCallCheck(this, FPSComponent);

    /**
     * @private
     * @type {TextField}
     */
    var _this = _possibleConstructorReturn(this, (FPSComponent.__proto__ || Object.getPrototypeOf(FPSComponent)).call(this));

    _this.txtFPS = null;
    return _this;
  }

  _createClass(FPSComponent, [{
    key: 'onAdded',
    value: function onAdded() {
      this.txtFPS = new TextField('FPS: 0');
      this.txtFPS.x = 0;
      this.txtFPS.y = 0;
      this.gameObject.addChild(this.txtFPS);
    }
  }, {
    key: 'onRemoved',
    value: function onRemoved() {}
  }, {
    key: 'onUpdate',
    value: function onUpdate() {
      this.txtFPS.text = 'FPS: ' + Black.instance.FPS;
    }
  }]);

  return FPSComponent;
}(Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Basic mulri resolution utility component. Resizes an GameObject to match desired resolution.
 *
 * @cat components
 * @extends Component
 */

var MRComponent = function (_Component) {
    _inherits(MRComponent, _Component);

    /**
     * Creates new instance of MRComponent. Used to scale and position GameObject to a specified width and height.
     * Simplified version of scale manager.
     *
     * @param {number} [width=960]  The width.
     * @param {number} [height=640] The height.
     */
    function MRComponent() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 960;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 640;

        _classCallCheck(this, MRComponent);

        /**
         * @private
         * @type {number}
         */
        var _this = _possibleConstructorReturn(this, (MRComponent.__proto__ || Object.getPrototypeOf(MRComponent)).call(this));

        _this.mWidth = width;

        /**
         * @private
         * @type {number}
         */
        _this.mHeight = height;

        /**
         * @private
         * @type {number}
         */
        _this.mScale = 0;

        /**
         * @private
         * @type {number}
         */
        _this.mInvScale = 0;

        /**
         * @private
         * @type {number}
         */
        _this.mAspect = 0;

        Black.instance.viewport.on('resize', _this.__onResize, _this);
        return _this;
    }

    _createClass(MRComponent, [{
        key: '__onResize',
        value: function __onResize(msg, rect) {
            this.setSize(this.mWidth, this.mHeight);
        }

        /**
         * Sets size of the latout.
         *
         * @param  {number} width = 960  The width.
         * @param  {number} height = 640 The height.
         * @return {void}
         */

    }, {
        key: 'setSize',
        value: function setSize() {
            var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 960;
            var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 640;

            this.mWidth = width;
            this.mHeight = height;

            this.updateLayout();
        }

        /**
         * Updates layout to match specified settings.
         *
         * @return {void}
         */

    }, {
        key: 'updateLayout',
        value: function updateLayout() {
            if (!this.gameObject) return;

            /** @type {Rectangle} */
            var size = Black.instance.viewport.size;

            /** @type {number} */
            var scaleX = size.width / this.mWidth;

            /** @type {number} */
            var scaleY = size.height / this.mHeight;

            this.mScale = Math.min(scaleX, scaleY);
            this.mInvScale = 1 / this.mScale;

            this.gameObject.scaleX = this.gameObject.scaleY = this.mScale;
            this.gameObject.x = size.width / 2 - this.mWidth / 2 * this.mScale;
            this.gameObject.y = size.height / 2 - this.mHeight / 2 * this.mScale;
        }
    }, {
        key: 'onAdded',
        value: function onAdded() {
            this.updateLayout();
        }
    }]);

    return MRComponent;
}(Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A static class with many static easing functions.
 *
 * @cat animation
 * @static
 */

var Ease = function () {
  function Ease() {
    _classCallCheck(this, Ease);
  }

  _createClass(Ease, null, [{
    key: "linear",

    /**
     * linear
     * @param {number} k
     * @return {number}
     */
    value: function linear(k) {
      return k;
    }

    /**
     * quadraticIn
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "quadraticIn",
    value: function quadraticIn(k) {
      return k * k;
    }

    /**
     * quadraticOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "quadraticOut",
    value: function quadraticOut(k) {
      return k * (2 - k);
    }

    /**
     * quadraticInOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "quadraticInOut",
    value: function quadraticInOut(k) {
      if ((k *= 2) < 1) return 0.5 * k * k;

      return -0.5 * (--k * (k - 2) - 1);
    }

    /**
     * cubicIn
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "cubicIn",
    value: function cubicIn(k) {
      return k * k * k;
    }

    /**
     * cubicOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "cubicOut",
    value: function cubicOut(k) {
      return --k * k * k + 1;
    }

    /**
     * cubicInOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "cubicInOut",
    value: function cubicInOut(k) {
      if ((k *= 2) < 1) return 0.5 * k * k * k;

      return 0.5 * ((k -= 2) * k * k + 2);
    }

    /**
     * quarticIn
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "quarticIn",
    value: function quarticIn(k) {
      return k * k * k * k;
    }

    /**
     * quarticOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "quarticOut",
    value: function quarticOut(k) {
      return 1 - --k * k * k * k;
    }

    /**
     * quarticInOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "quarticInOut",
    value: function quarticInOut(k) {
      if ((k *= 2) < 1) return 0.5 * k * k * k * k;

      return -0.5 * ((k -= 2) * k * k * k - 2);
    }

    /**
     * quinticIn
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "quinticIn",
    value: function quinticIn(k) {
      return k * k * k * k * k;
    }

    /**
     * quinticOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "quinticOut",
    value: function quinticOut(k) {
      return --k * k * k * k * k + 1;
    }

    /**
     * quinticInOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "quinticInOut",
    value: function quinticInOut(k) {
      if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;

      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }

    /**
     * sinusoidalIn
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "sinusoidalIn",
    value: function sinusoidalIn(k) {
      return 1 - Math.cos(k * Math.PI / 2);
    }

    /**
     * sinusoidalOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "sinusoidalOut",
    value: function sinusoidalOut(k) {
      return Math.sin(k * Math.PI / 2);
    }

    /**
     * sinusoidalInOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "sinusoidalInOut",
    value: function sinusoidalInOut(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * exponentialIn
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "exponentialIn",
    value: function exponentialIn(k) {
      return k === 0 ? 0 : Math.pow(1024, k - 1);
    }

    /**
     * exponentialOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "exponentialOut",
    value: function exponentialOut(k) {
      return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    }

    /**
     * exponentialInOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "exponentialInOut",
    value: function exponentialInOut(k) {
      if (k === 0) return 0;

      if (k === 1) return 1;

      if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);

      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    }

    /**
     * circularIn
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "circularIn",
    value: function circularIn(k) {
      return 1 - Math.sqrt(1 - k * k);
    }

    /**
     * circularOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "circularOut",
    value: function circularOut(k) {
      return Math.sqrt(1 - --k * k);
    }

    /**
     * circularInOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "circularInOut",
    value: function circularInOut(k) {
      if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);

      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }

    /**
     * elasticIn
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "elasticIn",
    value: function elasticIn(k) {
      if (k === 0) return 0;

      if (k === 1) return 1;

      return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
    }

    /**
     * elasticOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "elasticOut",
    value: function elasticOut(k) {
      if (k === 0) return 0;

      if (k === 1) return 1;

      return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
    }

    /**
     * elasticInOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "elasticInOut",
    value: function elasticInOut(k) {
      if (k === 0) return 0;

      if (k === 1) return 1;

      k *= 2;

      if (k < 1) return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

      return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
    }

    /**
     * backIn
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "backIn",
    value: function backIn(k) {
      var s = 1.70158;
      return k * k * ((s + 1) * k - s);
    }

    /**
     * backOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "backOut",
    value: function backOut(k) {
      var s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    }

    /**
     * backInOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "backInOut",
    value: function backInOut(k) {
      var s = 1.70158 * 1.525;

      if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));

      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }

    /**
     * bounceIn
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "bounceIn",
    value: function bounceIn(k) {
      return 1 - Ease.bounceOut(1 - k);
    }

    /**
     * bounceOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "bounceOut",
    value: function bounceOut(k) {
      if (k < 1 / 2.75) return 7.5625 * k * k;else if (k < 2 / 2.75) return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;else if (k < 2.5 / 2.75) return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;

      return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
    }

    /**
     * bounceInOut
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "bounceInOut",
    value: function bounceInOut(k) {
      if (k < 0.5) return Ease.bounceIn(k * 2) * 0.5;

      return Ease.bounceOut(k * 2 - 1) * 0.5 + 0.5;
    }

    /**
     * smoothstep
     *
     * @param {number} k
     *
     * @return {number}
     */

  }, {
    key: "smootherStep",
    value: function smootherStep(k) {
      return k * k * k * (k * (6.0 * k - 15.0) + 10.0);
    }
  }]);

  return Ease;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Interpolation functions.
 *
 * @cat animation
 * @static
 */

var Interpolation = function () {
  /**
   * Singleton.
   */
  function Interpolation() {
    _classCallCheck(this, Interpolation);
  }

  /**
   * linear
   *
   * @param {Array}  v The input array of values to interpolate between.
   * @param {number} k The percentage of interpolation, between 0 and 1.
   * @return {number}  The interpolated value
   */


  _createClass(Interpolation, null, [{
    key: "linear",
    value: function linear(v, k) {
      var m = v.length - 1;
      var f = m * k;
      var i = Math.floor(f);

      var fn = function fn(p0, p1, t) {
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

  }, {
    key: "bezier",
    value: function bezier(v, k) {
      var b = 0;
      var n = v.length;
      var pow = Math.pow;
      // Bernstein basis polynomials
      var bn = function bn(n, i) {
        var fc = Interpolation.__factorial;
        return fc(n) / fc(i) / fc(n - i);
      };

      for (var i = 0; i < n; i++) {
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

  }, {
    key: "catmullRom",
    value: function catmullRom(v, k) {
      var m = v.length - 1;
      var f = m * k;
      var i = Math.floor(f);
      var fn = function fn(p0, p1, p2, p3, t) {
        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
        var t2 = t * t;
        var t3 = t * t2;

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
  }]);

  return Interpolation;
}();

/**
 * @private
 * @param {number} n
 *
 * @return {number}
 */


Interpolation.__factorial = function () {
  var a = [1];

  return function (n) {
    if (a[n]) {
      return a[n];
    }

    var s = n;

    while (--n) {
      s *= n;
    }

    a[n] = s;
    return s;
  };
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A tweening component.
 *
 * @cat animation
 * @unrestricted
 * @extends Component
 */

var Tween = function (_Component) {
  _inherits(Tween, _Component);

  /**
   * Creates new instance of Tween Component.
   * @param {Object}        values            The values to tween.
   * @param {number}        [duration=0.25]   Duraction in seconds.
   * @param {Object|null}   [properties=null] Tween properties Object.
   */
  function Tween(values) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.250;
    var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Tween);

    /**
     * @private
     * @dict
     */
    var _this = _possibleConstructorReturn(this, (Tween.__proto__ || Object.getPrototypeOf(Tween)).call(this));

    _this.mValues = values;

    /**
     * @private
     * @type {number}
     */
    _this.mDuration = duration;

    /**
     * @private
     * @dict
     */
    _this.mProperties = properties;

    /**
     * @private
     * @type {boolean}
     */
    _this.mIsPlaying = false;

    /**
     * @private
     * @type {boolean}
     */
    _this.mIsPaused = false;

    /**
     * @private
     * @type {number}
     */
    _this.mStartTime = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mPausedTime = 0;

    /**
     * @private
     * @dict
     */
    _this.mValuesStart = {};

    /**
     * @private
     * @type {number}
     */
    _this.mElapsed = 0;

    /**
     * @private
     * @type {function (Array, number):number}
     */
    _this.mInterpolation = Interpolation.linear;

    /**
     * @private
     * @type {number}
     */
    _this.mDelay = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mRepeatTimes = 0;

    /**
     * @private
     * @type {boolean}
     */
    _this.mInitiated = false;

    /**
     * @private
     * @type {boolean}
     */
    _this.mStarted = false;

    /**
     * @private
     * @type {boolean}
     */
    _this.mReverse = false;

    /**
     * @private
     * @type {boolean}
     */
    _this.mRemoveOnComplete = true;

    /**
     * @private
     * @type {boolean}
     */
    _this.mPlayOnAdded = true;

    /**
     * @private
     * @type {function(number):number}
     */
    _this.mEase = Ease.smootherStep;

    // TODO: fix ESDOC issue
    if (_this.mProperties !== null) {
      for (var f in _this.mProperties) {
        _this[f] = /** @dict */_this.mProperties[f];
      }
    }
    return _this;
  }

  /**
   * Returns active ease function.
   *
   * @return {function(number):number}
   */


  _createClass(Tween, [{
    key: '__start',


    /**
     * @private
     * @param {number} t
     *
     * @return {void}
     */
    value: function __start(t) {
      this.mIsPlaying = true;
      this.mStartTime = t + this.mDelay;
    }

    /**
     * Starts tweening.
     *
     * @return {Tween} Returns this.
     */

  }, {
    key: 'play',
    value: function play() {
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

  }, {
    key: 'stop',
    value: function stop() {
      if (!this.mIsPlaying) return this;

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

  }, {
    key: 'to',
    value: function to() {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.250;

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

  }, {
    key: 'pause',
    value: function pause() {
      if (!this.mIsPlaying) return this;

      this.mIsPaused = true;
      this.mPausedTime = Black.instance.uptime;

      return this;
    }

    /**
     * @private
     * @return {void} Description
     */

  }, {
    key: '__resume',
    value: function __resume() {
      if (!this.mIsPaused) return;

      this.mIsPaused = false;
      this.mStartTime += Black.instance.uptime - this.mPausedTime;
    }

    /**
     * @protected
     * @return {void}
     */

  }, {
    key: 'removeFromParent',
    value: function removeFromParent() {
      if (this.mIsPlaying) this.stop();

      _get(Tween.prototype.__proto__ || Object.getPrototypeOf(Tween.prototype), 'removeFromParent', this).call(this);
    }

    /**
     * @return {void}
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      this.remove();
    }

    /**
     * Sets the number of times the tween wiil be repeated after first execution.
     *
     * @return {Tween} Returns this.
     */

  }, {
    key: 'repeat',
    value: function repeat(times) {
      this.mRepeatTimes = times;

      return this;
    }

    /**
     * Sets if tween should be looped over.
     *
     * @return {Tween} Return this.
     */

  }, {
    key: 'loop',
    value: function loop() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.mRepeatTimes = value ? Infinity : 0;
      return this;
    }

    /**
    * Enables/disables reversing of tween values.
    *
    * @return {Tween} Returns this.
    */

  }, {
    key: 'reverse',
    value: function reverse() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.mReverse = value;
      return this;
    }

    /**
     * Add specified tween object into the queue. The specified tween will be executed after completation of this tween,
     *
     * @return {Tween} Returns this.
     */

  }, {
    key: 'chain',
    value: function chain(tween) {
      if (!tween) {
        return this;
      }

      this.mRemoveOnComplete = false;

      this.on('complete', function () {
        tween.play();
      });

      return this;
    }

    /**
     * @override
     * @protected
     * @param  {GameObject} gameObject
     * @return {void}
     */

  }, {
    key: 'onAdded',
    value: function onAdded(gameObject) {
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

  }, {
    key: '__update',
    value: function __update(t) {}

    /**
     * Updates tween values.
     *
     * @param {Object} values The Object to get values from.
     * @return {void}
     */

  }, {
    key: 'set',
    value: function set(values) {
      this.mValues = values;

      for (var f in this.mValues) {
        this.mValuesStart[f] = parseFloat(this.gameObject[f]);
      }
    }

    /**
     * @protected
     * @override
     * @param {number} dt
     *
     * @returns {void}
     */

  }, {
    key: 'onPostUpdate',
    value: function onPostUpdate(dt) {
      var t = Time.time;

      if (t < this.mStartTime || !this.mIsPlaying || this.mIsPaused) return;

      // copy values only when starting tween...
      // since values may change
      if (this.mStarted === false) {
        this.mStarted = true;
        this.post('start', this.gameObject);

        for (var f in this.mValues) {
          if (!this.mInitiated && Array.isArray(this.mValues[f])) {
            this.mValues[f] = [this.gameObject[f]].concat(this.mValues[f]);
          }
          this.mValuesStart[f] = parseFloat(this.gameObject[f]);
        }

        this.mInitiated = true;
      }

      this.mElapsed = (t - this.mStartTime) / this.mDuration;

      if (this.mElapsed > 1) this.mElapsed = 1;

      var value = this.mEase(this.mElapsed);

      for (var _f in this.mValues) {
        var start = /** @type {number} */this.mValuesStart[_f];
        var end = /** @type {number|Array} */this.mValues[_f];

        if (Array.isArray(end)) {
          this.gameObject[_f] = this.mInterpolation(end, value);
        } else {
          this.gameObject[_f] = /** @type {number} */start + (end - start) * value;
        }
      }

      this.post('update', this.gameObject);

      if (this.mElapsed === 1) {
        if (this.mRepeatTimes > 0) {
          this.mRepeatTimes -= 1;

          if (this.mReverse) {
            for (var _f2 in this.mValues) {
              var _ref = [this.mValuesStart[_f2], this.mValues[_f2]];
              this.mValues[_f2] = _ref[0];
              this.mValuesStart[_f2] = _ref[1];
            }
          }

          this.mStartTime = t + this.mDelay;

          this.post('loop', this.gameObject);
        } else {
          this.mIsPlaying = false;
          this.post('complete', this.gameObject);

          if (this.mRemoveOnComplete) {
            this.dispose();
          } else {
            for (var _f3 in this.mValues) {
              this.mValuesStart[_f3] = this.mValues[_f3];
            }

            this.mStarted = false;
          }
        }
      }
    }
  }, {
    key: 'ease',
    get: function get() {
      return this.mEase;
    }

    /**
     * Sets easing function to use.
     *
     * @param {function(number):number} value The easing function.
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mEase = value;
    }

    /**
     * Returns the interpolation algorithm.
     *
     * @return {function(Array, number):number}
     */

  }, {
    key: 'interpolation',
    get: function get() {
      return this.mInterpolation;
    }

    /**
     * Sets the interpolation algorithm. Possible values Interpolation.linear, Interpolation.bezier, Interpolation.catmullRom or your custom function.
     *
     * @param {function(Array, number):number} value The interpolation function.
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mInterpolation = value;
    }

    /**
     * Time elapsed since tween start in seconds.
     *
     * @return {number}
     */

  }, {
    key: 'elapsed',
    get: function get() {
      return this.mElapsed;
    }

    /**
     * Returns amount of seconds to wait before tweening.
     *
     * @return {number}
     */

  }, {
    key: 'delay',
    get: function get() {
      return this.mDelay;
    }

    /**
     * Set amount of seconds to wait before tweening.
     *
     * @param {number} value Seconds to wait.
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mDelay = value;
    }

    /**
     * Returns if Tween Component should be automatically detached from owner GameObject after completation.
     *
     * @return {boolean}
     */

  }, {
    key: 'removeOnComplete',
    get: function get() {
      return this.mRemoveOnComplete;
    }

    /**
     * Sets if Tween Component should be automatically detached from owner GameObject after completation.
     *
     * @param {boolean} value
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mRemoveOnComplete = value;
    }

    /**
     * Returns whether the tween should start playing automatically when added to the root.
     * @return {boolean}
     */

  }, {
    key: 'playOnAdded',
    get: function get() {
      return this.mPlayOnAdded;
    }

    /**
     * Sets whether the tween should start playing automatically when added to the root.
     *
     * @param {boolean} value
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mPlayOnAdded = value;
    }
  }]);

  return Tween;
}(Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Holds details about sprite animation.
 *
 * @cat animation
 */

var AnimationInfo = function () {
  /**
   * Creates an instance of Animation class
   *
   * @param {AnimationController}    controller  Animation controller
   * @param {string}                 name        The name of animation
   * @param {Array<Texture>}         frames      Array of Textures for this animation
   * @param {number}                 [fps=14]    Frame rate
   * @param {boolean}                [loop=true] Is animations should be looped
   */
  function AnimationInfo(controller, name, frames) {
    var fps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 14;
    var loop = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    _classCallCheck(this, AnimationInfo);

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
   * @internal
   * @return {Texture} Returns the current frame Texture.
   */


  _createClass(AnimationInfo, [{
    key: 'play',
    value: function play() {
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

  }, {
    key: 'stop',
    value: function stop() {
      this.mStopped = true;
      this.mCurrentFrame = 0;
    }

    /**
     * Pauses animation.
     *
     * @return {void}
     */

  }, {
    key: 'pause',
    value: function pause() {
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

  }, {
    key: '__update',
    value: function __update(dt, t) {
      if (t < this.mNextFrameAt || this.mPaused === true || this.mStopped === true || this.mCompleted === true) return null;

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
      var texture = this.mFrames[this.mCurrentFrame];
      return texture;
    }

    /**
     * Get/Set animation speed in frames per second.
     *
     * @return {number}
     */

  }, {
    key: 'fps',
    get: function get() {
      return this.mFPS;
    }

    /**
     * @ignore
     * @param {number} value
     * @return {void}
     */
    ,
    set: function set(value) {
      Debug.assert(value > 0, 'FPS must be greater than 0.');

      this.mFPS = value;
      this.mFrameDuration = 1 / this.mFPS;

      // update next frame start time
      var diff = this.mNextFrameAt - Black.instance.uptime;
      this.mNextFrameAt += diff;
    }

    /**
     * Get/Set if animation should be looped.
     * @return {boolean}
     */

  }, {
    key: 'loop',
    get: function get() {
      return this.mLoop;
    }

    /**
     * @ignore
     * @param {boolean} value
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mLoop = value;
    }

    /**
     * Gets array of Texture.
     *
     * @return {Array<Texture>}
     */

  }, {
    key: 'frames',
    get: function get() {
      return this.mFrames;
    }

    /**
     * Returns true if Animation is playing (neither stopped nor paused).
     *
     * @return {boolean}
     */

  }, {
    key: 'isPlaying',
    get: function get() {
      return this.mPaused === false && this.mStopped === false;
    }

    /**
     * Returns true if animation is completed.
     *
     * @return {boolean}
     */

  }, {
    key: 'isComplete',
    get: function get() {
      return this.mCompleted;
    }

    /**
     * Returns name of this animation.
     *
     * @return {string}
     */

  }, {
    key: 'name',
    get: function get() {
      return this.mName;
    }
  }]);

  return AnimationInfo;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Component which allows to play sprite animations.
 *
 * @cat animation
 * @extends Component
 */

var AnimationController = function (_Component) {
  _inherits(AnimationController, _Component);

  /**
   * Creates an instance of AnimationController
   */
  function AnimationController() {
    _classCallCheck(this, AnimationController);

    /**
     * @private
     * @type {Object<string, AnimationInfo>}
     */
    var _this = _possibleConstructorReturn(this, (AnimationController.__proto__ || Object.getPrototypeOf(AnimationController)).call(this));

    _this.mAnimations = {};

    /**
     * @private
     * @type {AnimationInfo|null}
     */
    _this.mCurrentAnim = null;
    return _this;
  }

  /**
   * Returns the Animation object that exists with the specified name.
   *
   * @param {string} name The name of the child to return.
   * @returns {Animation} Returns the Animation object that exists with the specified name.
   */


  _createClass(AnimationController, [{
    key: 'getByName',
    value: function getByName(name) {
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

  }, {
    key: 'remove',
    value: function remove(name) {
      Debug.assert(name !== null, 'Animation name shall not be null.');
      Debug.assert(this.mAnimations.hasOwnProperty(name) === true, 'Unable to find animation.');

      var anim = this.mAnimations[name];

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

  }, {
    key: 'add',
    value: function add(name, textures) {
      var fps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 14;
      var loop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      Debug.assert(textures.length > 0, 'Animation cannot be empty.');
      Debug.assert(fps > 0, 'FPS must be greater than 0.');
      Debug.assert(this.mAnimations.hasOwnProperty(name) == false, 'Animatation with same name alredy exists');

      var anim = new AnimationInfo(this, name, textures, fps, loop);
      this.mAnimations[name] = anim;

      return anim;
    }

    /**
     * Plays animation that exists with the specified name.
     *
     * @param {string} name The name of animation to play.
     * @return {void}
     */

  }, {
    key: 'play',
    value: function play(name) {
      Debug.assert(this.mAnimations.hasOwnProperty(name), 'Animation must be set first.');

      this.mCurrentAnim = this.mAnimations[name];

      var texture = this.mCurrentAnim.play();

      var sprite = /** @type {Sprite} */this.gameObject;
      if (sprite === null) return;

      if (texture !== null) sprite.texture = texture;
    }

    /**
     * Stops active animation. If no animations are playing at the moment nothing will happen.
     *
     * @return {void}
     */

  }, {
    key: 'stop',
    value: function stop() {
      if (this.mCurrentAnim === null) return;

      this.mCurrentAnim.stop();
    }

    /**
     * Pauses active animation.
     * @return {void}
     */

  }, {
    key: 'pause',
    value: function pause() {
      if (this.mCurrentAnim === null) return;

      this.mCurrentAnim.pause();
    }

    /**
     * @ignore
     * @override
     * @protected
     * @param  {number} dt
     * @return {void}
     */

  }, {
    key: 'onPostUpdate',
    value: function onPostUpdate(dt) {
      if (this.mCurrentAnim === null) return;

      // TODO: replace with time.time
      var newTexture = this.mCurrentAnim.__update(dt, Black.instance.uptime);
      if (newTexture === null) return;

      var sprite = /** @type {Sprite} */this.gameObject;
      sprite.texture = newTexture;
    }

    /**
     * Returns current active animation.
     *
     * @returns {Animation|null}
     */

  }, {
    key: 'currentAnimation',
    get: function get() {
      return this.mCurrentAnim;
    }
  }]);

  return AnimationController;
}(Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Black = function (_MessageDispatcher) {
  _inherits(Black, _MessageDispatcher);

  /**
   * Creates a new Black instance.
   * @param {string}                          containerElementId The id of an DOM element.
   * @param {function(new: GameObject)}       rootClass          Type name of an GameObject to start execution from.
   * @param {function(new: VideoNullDriver)}  [videoDriverClass] Type name of an VideoDriver (VideoNullDriver, DOMDriver or CanvasDriver)
   */
  function Black(containerElementId, rootClass, videoDriverClass) {
    _classCallCheck(this, Black);

    // Dirty GCC workaround
    var _this = _possibleConstructorReturn(this, (Black.__proto__ || Object.getPrototypeOf(Black)).call(this));

    window['Black'] = {};
    window['Black']['instance'] = _this;

    console.log('%c                         >>> BLACK <<<                         ', 'background: #000; color: #fff;');

    /**
     * @private
     * @type {string}
     */
    _this.mContainerElementId = containerElementId;

    /**
     * @private
     * @type {HTMLElement}
     */
    _this.mContainerElement = /** @type {!HTMLElement} */document.getElementById(_this.mContainerElementId);

    if (!_this.mContainerElement) throw new Error('Container element was not found');

    /**
     * @private
     * @type {function(new: VideoNullDriver)}
     */
    _this.mVideoDriverClass = videoDriverClass;

    /**
     * @private
     * @type {number}
     */
    _this.mStageWidth = _this.mContainerElement.clientWidth;

    /**
     * @private
     * @type {number}
     */
    _this.mStageHeight = _this.mContainerElement.clientHeight;

    /**
     * @private
     * @type {number}
     */
    _this.mSimulationTimestep = 1000 / 60;

    /**
     * @private
     * @type {number}
     */
    _this.mUptime = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mFrameAccum = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mLastFrameTimeMs = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mCurrentTime = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mFPS = 60;

    /**
     * @private
     * @type {number}
     */
    _this.mLastFpsUpdate = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mFramesThisSecond = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mNumUpdateSteps = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mMinFrameDelay = 0;

    /**
     * @private
     * @type {Array<System>}
     */
    _this.mSystems = [];

    /**
     * @private
     * @type {boolean}
     */
    _this.mIsRunning = false;

    /**
     * @private
     * @type {boolean}
     */
    _this.mIsStarted = false;

    /**
     * @private
     * @type {boolean}
     */
    _this.mIsPanic = false;

    /**
     * @private
     * @type {number}
     */
    _this.mLastFrameUpdateTime = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mLastFrameRenderTime = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mRAFHandle = -1; // not sure

    /**
     * @private
     * @type {Viewport}
     */
    _this.mViewport = null;

    /**
     * @private
     * @type {VideoNullDriver}
     */
    _this.mVideo = null;

    /**
     * @private
     * @type {boolean}
     */
    _this.mPaused = false;

    /**
     * @private
     * @type {boolean}
     */
    _this.mUnpausing = false;

    /**
     * @private
     * @type {boolean}
     */
    _this.mPauseOnHide = true;

    /**
     * @private
     * @type {boolean}
     */
    _this.mPauseOnBlur = true;

    /**
     * @private
     * @type {Object<string, Array>}
     */
    _this.mTagCache = {};

    /**
     * @private
     * @type {function(new: GameObject)|null}
     */
    _this.mRootClass = rootClass;

    /**
     * @private
     * @type {GameObject|null}
     */
    _this.mRoot = null;

    /**
     * @private
     * @type {boolean}
     */
    _this.mEnableFixedTimeStep = false;

    /**
     * @private
     * @type {boolean}
     */
    _this.mWasStopped = false;
    return _this;
  }

  /**
   * Pauses all engine update logic. Note: RAF is not going to be paused and will work in background.
   *
   * @return {void}
   */


  _createClass(Black, [{
    key: 'pause',
    value: function pause() {
      this.mPaused = true;
    }

    /**
     * Resumes update execution.
     *
     * @return {void}
     */

  }, {
    key: 'resume',
    value: function resume() {
      this.mUnpausing = true;
    }

    /**
     * @private
     * @returns {void}
     */

  }, {
    key: '__bootViewport',
    value: function __bootViewport() {
      this.mViewport = new Viewport(this.mContainerElement);
    }

    /**
     * @private
     * @returns {void}
     */

  }, {
    key: '__bootSystems',
    value: function __bootSystems() {
      this.addSystem(new Input());
    }

    /**
     * @private
     * @returns {void}
     */

  }, {
    key: '__bootStage',
    value: function __bootStage() {
      var _this2 = this;

      window.onblur = function (event) {
        return _this2.__onVisbilityChange(event);
      };
      window.onfocus = function (event) {
        return _this2.__onVisbilityChange(event);
      };
      window.onpagehide = function (event) {
        return _this2.__onVisbilityChange(event);
      };
      window.onpageshow = function (event) {
        return _this2.__onVisbilityChange(event);
      };

      if (document.hidden && this.mPauseOnHide === true) this.mPaused = true;
    }

    /**
     * @private
     * @returns {void}
     */

  }, {
    key: '__onVisbilityChange',
    value: function __onVisbilityChange(event) {
      var type = event.type;

      if (type === 'blur' && this.mPauseOnBlur === true) this.mPaused = true;else if (type === 'pagehide' && this.mPauseOnHide === true) this.mPaused = true;else if (type === 'focus' || type === 'pageshow') {
        if (document.hidden === false) this.mUnpausing = true;
      }
    }

    /**
     * Adds a given system to the execution list.
     *
     * @param  {System} system The System object you want to add.
     * @return {System}
     */

  }, {
    key: 'addSystem',
    value: function addSystem(system) {
      this.mSystems.push(system);
      return system;
    }

    /**
     * Removes the given system from execution list.
     *
     * @param {System} system The System instance to remove.
     * @return {System|null}
     */

  }, {
    key: 'removeSystem',
    value: function removeSystem(system) {
      // TODO: remove system on next frame
      var ix = this.mSystems.indexOf(system);
      if (ix === -1) return null;

      this.mSystems.splice(ix, 1);
      return system;
    }

    /**
     * @private
     * @returns {void}
     */

  }, {
    key: '__bootVideo',
    value: function __bootVideo() {
      this.mVideo = new this.mVideoDriverClass(this.mContainerElement, this.mStageWidth, this.mStageHeight);
    }

    /**
     * Boots up the engine!
     *
     * @return {void}
     */

  }, {
    key: 'start',
    value: function start() {
      if (this.mWasStopped === true) {
        Debug.error('Black engine cannot be re-started.');
        return;
      }

      this.constructor.instance = this;

      if (this.mIsStarted === true) return;

      this.__bootViewport();
      this.__bootSystems();
      this.__bootVideo();
      this.__bootStage();

      this.mRoot = new this.mRootClass();
      this.mRoot.name = 'root';
      this.mRoot.mAdded = true; // why are not added actually?
      this.mRoot.onAdded();

      var self = this;

      this.mIsStarted = true;
      this.mVideo.start();

      this.mRAFHandle = requestAnimationFrame(function (timestamp) {
        // TODO: do first update here
        self.mIsRunning = true;

        self.mLastFrameTimeMs = timestamp;
        self.mLastFpsUpdate = timestamp;
        self.mFramesThisSecond = 0;

        // Start the main loop.
        self.mRAFHandle = requestAnimationFrame(function (x) {
          self.__update(x);
        });
      });

      // TODO: show only when needed, eg required by any system
      if (this.mEnableFixedTimeStep === false) Debug.info('Fixed time-step is disabled, some systems may not work.');
    }

    /**
     * Stops any executions, destroys resources and scene.
     *
     * @return {void}
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.mIsStarted = false;
      this.mIsRunning = false;
      cancelAnimationFrame(this.mRAFHandle);
    }

    /**
     * @private
     * @param {number} timestamp
     *
     * @return {void}
     */

  }, {
    key: '__update',
    value: function __update(timestamp) {
      // TODO: this method seems to be totaly broken. maxAllowedFPS is not working correctly
      this.constructor.instance = this;

      var self = this;

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
        this.mFrameAccum += timestamp - this.mLastFrameTimeMs;
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
        if (this.mCurrentTime === 0) this.mCurrentTime = timestamp - this.mMinFrameDelay;

        var dt = Time.scale * ((timestamp - this.mCurrentTime) * 0.001);
        this.mCurrentTime = timestamp;
        Time.mDeltaTime = dt;

        if (this.mEnableFixedTimeStep === true) {
          while (this.mFrameAccum >= this.mSimulationTimestep) {
            this.__internalFixedUpdate(this.mSimulationTimestep * 0.001);

            this.mFrameAccum -= this.mSimulationTimestep;

            if (++this.mNumUpdateSteps >= 60 * 3) {
              // 3 seconds window
              console.log('[BLACK]: Not enough time to calculate update logic.');
              this.mIsPanic = true;
              break;
            }
          }
        }

        this.__internalUpdate(dt);
        this.__internalPostUpdate(dt);

        this.mVideo.beginFrame();
        this.mRoot.__render(this.mVideo, this.mUptime, 1, BlendMode.AUTO);
        this.mVideo.endFrame();

        // TODO: remove uptime
        this.mUptime += dt;
        Time.mTime = this.mUptime;

        this.mIsPanic = false;
      }

      this.mRAFHandle = window.requestAnimationFrame(this.__update.bind(this));
    }

    /**
     * @private
     * @param {number} dt
     * @return {void}
     */

  }, {
    key: '__internalFixedUpdate',
    value: function __internalFixedUpdate(dt) {
      for (var i = 0; i < this.mSystems.length; i++) {
        this.mSystems[i].onFixedUpdate(dt);
      }this.mRoot.__fixedUpdate(dt);
    }

    /**
     * @private
     * @param {number} dt
     * @return {void}
     */

  }, {
    key: '__internalUpdate',
    value: function __internalUpdate(dt) {
      for (var i = 0; i < this.mSystems.length; i++) {
        this.mSystems[i].onUpdate(dt, this.mUptime);
      }this.mRoot.__update(dt);
    }

    /**
     * @private
     * @param {number} dt
     * @return {void}
     */

  }, {
    key: '__internalPostUpdate',
    value: function __internalPostUpdate(dt) {
      for (var i = 0; i < this.mSystems.length; i++) {
        this.mSystems[i].onPostUpdate(dt, this.mUptime);
      }this.mRoot.__postUpdate(dt);
    }

    /**
     * Returns the root GameObject.
     * @return {GameObject}
     */

  }, {
    key: 'onTagUpdated',


    /**
     * @protected
     * @param {GameObject} child
     * @param {string|null} oldTag
     * @param {string|null} newTag
     *
     * @return {void}
     */
    value: function onTagUpdated(child, oldTag, newTag) {
      if (oldTag !== null) {
        var arr = this.mTagCache[oldTag];
        arr.splice(arr.indexOf(child), 1);

        if (arr.length === 0) delete this.mTagCache[oldTag];
      }

      if (newTag !== null) {
        if (this.mTagCache.hasOwnProperty(newTag) === false) this.mTagCache[newTag] = [];

        this.mTagCache[newTag].push(child);
      }
    }

    /**
     * @protected
     * @param  {GameObject} child
     * @return {void}
     */

  }, {
    key: 'onChildrenAdded',
    value: function onChildrenAdded(child) {
      var _this3 = this;

      for (var i = 0; i < this.mSystems.length; i++) {
        this.mSystems[i].onChildrenAdded(child);
      }GameObject.forEach(child, function (x) {
        if (x.mAdded === true) return;

        _this3.onTagUpdated(x, null, x.mTag);

        x.mAdded = true;
        x.onAdded();

        for (var _i = 0; _i < x.mComponents.length; _i++) {
          var c = x.mComponents[_i];

          if (c.mAdded === true) continue;

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

  }, {
    key: 'onChildrenRemoved',
    value: function onChildrenRemoved(child) {
      var _this4 = this;

      for (var i = 0; i < this.mSystems.length; i++) {
        this.mSystems[i].onChildrenRemoved(child);
      }GameObject.forEach(child, function (x) {
        if (x.mAdded === true) {
          _this4.onTagUpdated(x, x.mTag, null);

          x.mAdded = false;
          x.onRemoved();

          for (var _i2 = 0; _i2 < x.mComponents.length; _i2++) {
            var c = x.mComponents[_i2];

            if (c.mAdded === false) continue;

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

  }, {
    key: 'onComponentAdded',
    value: function onComponentAdded(child, component) {
      for (var i = 0; i < this.mSystems.length; i++) {
        this.mSystems[i].onComponentAdded(child, component);
      }if (component.mAdded === true) return;

      component.mAdded = true;
      component.onAdded(child);
    }

    /**
     * @param  {GameObject} child
     * @param  {Component} component
     * @return {void}
     */

  }, {
    key: 'onComponentRemoved',
    value: function onComponentRemoved(child, component) {
      for (var i = 0; i < this.mSystems.length; i++) {
        this.mSystems[i].onComponentRemoved(child, component);
      }if (component.mAdded === false) return;

      component.mAdded = false;
      component.onRemoved(child);
    }

    /**
     * Returns if engine should be automatically paused when window is hidden.
     * @return {boolean}
     */

  }, {
    key: 'root',
    get: function get() {
      return this.mRoot;
    }

    /**
     * Returns current video driver instance.
     * @return {VideoNullDriver}
     */

  }, {
    key: 'video',
    get: function get() {
      return this.mVideo;
    }

    /**
     * If `enableFixedTimeStep` is set to `true` returns number of milliseconds fixed-time-step will run over.
     * @return {number}
     */

  }, {
    key: 'simulationTimestep',
    get: function get() {
      return this.mSimulationTimestep;
    }

    /**
     * Sets the number of milliseconds for fixed-time-step to run over.
     *
     * @param {type} timestep
     * @return {void}
     */
    ,
    set: function set(timestep) {
      this.mSimulationTimestep = timestep;
    }

    /**
     * Returns current frame rate
     * @return {number}
     */

  }, {
    key: 'FPS',
    get: function get() {
      return this.mFPS;
    }

    /**
     * Returns max number of updates engine must do in a second.
     * @return {number}
     */

  }, {
    key: 'maxAllowedFPS',
    get: function get() {
      return 1000 / this.mMinFrameDelay;
    }

    /**
     * maxAllowedFPS - Sets the number of update engine must do per second.
     * @param {number} fps The max allowed FPS. If less then zero engine will be stopped.
     * @return {void}
     */
    ,
    set: function set(fps) {
      if (fps <= 0) this.stop();else this.mMinFrameDelay = 1000 / fps;
    }

    /**
     * Returns the current viewport instance. Used to get size of a game screen, or listen for resize messages.
     * @return {Viewport}
     */

  }, {
    key: 'viewport',
    get: function get() {
      return this.mViewport;
    }

    /**
     * Retruns the DOM element the engine runs in.
     * @return {Element}
     */

  }, {
    key: 'containerElement',
    get: function get() {
      return this.mContainerElement;
    }

    /**
     * Returns amount of seconds since engine start.
     * @return {number}
     */

  }, {
    key: 'uptime',
    get: function get() {
      return this.mUptime;
    }
  }, {
    key: 'pauseOnHide',
    get: function get() {
      return this.mPauseOnHide;
    }

    /**
     * Sets if engine should be automatically paused when window is hidden.
     * @param {boolean} value
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mPauseOnHide = value;
    }

    /**
     * Returns if engine should be automatically paused when container element is blured.
     * @return {boolean}
     */

  }, {
    key: 'pauseOnBlur',
    get: function get() {
      return this.mPauseOnBlur;
    }

    /**
     * Sets if engine should be automatically paused when container element is blured.
     * @param {boolean} value
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mPauseOnBlur = value;
    }

    /**
     * Returns if fixed-time-step update should happen. When disabled the physics system and other systems may not work.
     * @return {boolean}
     */

  }, {
    key: 'enableFixedTimeStep',
    get: function get() {
      return this.mEnableFixedTimeStep;
    }

    /**
     * Sets if fixed-time-step update should happen. When disabled the physics system and other systems may not work.
     *
     * @param {boolean} value
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mEnableFixedTimeStep = value;
    }
  }, {
    key: 'magic',
    get: function get() {
      return Math.random();
    }
  }]);

  return Black;
}(MessageDispatcher);
//# sourceMappingURL=black-es5.js.map
