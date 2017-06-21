"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathEx = function () {
  function MathEx() {
    _classCallCheck(this, MathEx);
  }

  _createClass(MathEx, null, [{
    key: "randomBetween",

    /**
     * randomBetween
     *
     * @param {number} a
     * @param {number} b
     *
     * @return {number}
     */
    value: function randomBetween(a, b) {
      return Math.floor(Math.random() * (b - a + 1) + a);
    }
  }, {
    key: "clamp",


    /**
     * clamp
     *
     * @param {number} value
     * @param {number} min
     * @param {number} max
     *
     * @return {number}
     */
    value: function clamp(value, min, max) {
      return value < min ? min : value > max ? max : value;
    }
  }, {
    key: "lerp",


    /**
     * lerp
     *
     * @param {number} a
     * @param {number} b
     * @param {number} t
     *
     * @return {number}
     */
    value: function lerp(a, b, t) {
      return a + t * (b - a);
    }
  }, {
    key: "lerpp",


    /**
     * lerpp
     *
     * @param {number} a
     * @param {number} b
     * @param {number} t
     *
     * @return {number}
     */
    value: function lerpp(a, b, t) {
      return (1 - t) * a + t * b;
    }
  }]);

  return MathEx;
}();

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

  }, {
    key: "lerp",
    value: function lerp(vector, t) {
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
     * Copies values from this rectangle into given rectangle.
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
     * Adds given rectangle into this.
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
     * @param {number} left
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
      return new Vector(this.x, this.bottom);
    }

    /**
     * @ignore
     *
     * @param {Vector} vector
     */
    ,
    set: function set(vector) {
      this.x = vector.x;
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
      var polygonVertices = polygon.mVertices;
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
      if (!this.mBounds.intersects(polygon.mBounds)) {
        return false;
      }

      var thisLines = this.mLines;
      var thisLen = thisLines.length;
      var polygonLines = polygon.mLines;
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
      if (this.mBounds.width < polygon.mBounds.width || this.mBounds.height < polygon.mBounds.height) {
        return false;
      }

      if (!this.contains(polygon.mCenter)) {
        return false;
      }

      var thisLines = this.mLines;
      var thisLen = thisLines.length;
      var polygonLines = polygon.mLines;
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
   * Sets new points coordinates.
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
     * Enables or disables interpolation from cache (lookup).
     * Returns true or false depending on baked is enabled or not.
     *
     * @return {boolean}
     */

  }, {
    key: "__initPoints",


    /**
     * Wides points array. Sets first point for next bezier same as last of previous.
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
     * Refresh cache (lookup) for fast interpolations.
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
     * Refresh local interpolation kof for each bezier in curve.
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

  }, {
    key: "interpolate",


    /**
     * Interpolates across whole curve.
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
     * Returns single bezier length.
     *
     * @param  {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX, endY
     *
     * @return {number} Length.
     */

  }, {
    key: "getFullLength",


    /**
     * Returns this curve length.
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
     * @ignore
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

/**
 * @private
 * @type {Curve}
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
 * Message holds all information about dispatched event.
 *
 * @cat core
 */

var Message = function () {
  function Message() {
    _classCallCheck(this, Message);

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


  _createClass(Message, [{
    key: 'path',
    get: function get() {
      var hasComponentMask = this.mComponentMask !== null;

      if (this.mPathMask !== null) {
        if (hasComponentMask === true) return this.mPathMask + '#' + this.mComponentMask;else return this.mPathMask;
      } else if (hasComponentMask === true) {
        return this.mComponentMask;
      }

      return null;
    }

    /**
     * Who send the message.
     *
     * @return {*}
     */

  }, {
    key: 'sender',
    get: function get() {
      return this.mSender;
    }

    /**
     * The name of the message.
     *
     * @return {string}
     */

  }, {
    key: 'name',
    get: function get() {
      return this.mName;
    }

    /**
     * Direction in what message was sent. Can be 'none', 'up' and 'down'.
     *
     * @return {string}
     */

  }, {
    key: 'direction',
    get: function get() {
      return this.mDirection;
    }

    /**
     * Indicates if sibblings should be included into dispatching process.
     *
     * @return {boolean}
     */

  }, {
    key: 'sibblings',
    get: function get() {
      return this.mSibblings;
    }

    /**
     * The GameObject.name mask string if was used.
     *
     * @return {string|null}
     */

  }, {
    key: 'pathMask',
    get: function get() {
      return this.mPathMask;
    }

    /**
     * Component mask string if was used.
     *
     * @return {string|null}
     */

  }, {
    key: 'componentMask',
    get: function get() {
      return this.mComponentMask;
    }

    /**
     * The original sender of a message.
     *
     * @return {*|null}
     */

  }, {
    key: 'origin',
    get: function get() {
      return this.mOrigin;
    }

    /**
     * The listener object.
     *
     * @return {*|null}
     */

  }, {
    key: 'target',
    get: function get() {
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
 * The MessageDispatcher class is the base class for all classes that posts messages.
 *
 * Global messages will not be dispatched on non GameObject objects.
 *
 *
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

        if (MessageDispatcher.mOverheardHandlers.hasOwnProperty(pureName) === false) MessageDispatcher.mOverheardHandlers[pureName] = [];

        var _dispatchers = MessageDispatcher.mOverheardHandlers[pureName];
        // for (let i = 0; i < dispatchers.length; i++)
        //   if (dispatchers[i].callback === callback)
        //     return;

        _dispatchers.push({
          callback: callback,
          context: context,
          pathMask: pathMask
        });

        return;
      }

      if (this.mListeners === null) this.mListeners = {};

      if (this.mListeners.hasOwnProperty(name) === false) this.mListeners[name] = [];

      var dispatchers = /** @type {Array<{callback: Function, context}>} */this.mListeners[name];

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

  }, {
    key: 'hasOn',
    value: function hasOn(name) {
      Debug.assert(name !== null, 'name cannot be null.');

      var filterIx = name.indexOf('@');
      if (filterIx !== -1) {
        var pureName = name.substring(0, filterIx);
        if (MessageDispatcher.mOverheardHandlers.hasOwnProperty(pureName) === false) return false;
      } else {
        if (this.mListeners === null) return false;else if (this.mListeners.hasOwnProperty(name) === false) return false;
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

  }, {
    key: 'removeOn',
    value: function removeOn(name) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      Debug.assert(name !== null, 'name cannot be null.');
      //Debug.assert(callback !== null, 'callback cannot be null.');

      var filterIx = name.indexOf('@');
      if (filterIx !== -1) {
        //we are working with overheared message
        var pureName = name.substring(0, filterIx);
        var pathMask = name.substring(filterIx + 1);

        if (MessageDispatcher.mOverheardHandlers.hasOwnProperty(pureName) === false) return;

        var dispatchers = MessageDispatcher.mOverheardHandlers[pureName];

        if (callback === null) {
          dispatchers.splice(0, dispatchers.length);
          return;
        } else {
          for (var i = dispatchers.length; i--;) {
            if (dispatchers[i].callback === callback) {
              dispatchers.splice(i, 1);
              return;
            }
          }
        }
      } else {
        // regular message
        if (this.mListeners === null) return;

        var _dispatchers2 = /** @type {Array<{callback: Function, context}>} */this.mListeners[name];

        if (_dispatchers2 === undefined) return;

        if (callback === null) {
          _dispatchers2.splice(0, _dispatchers2.length);
          return;
        } else {
          for (var _i = _dispatchers2.length; _i--;) {
            if (_dispatchers2[_i].callback === callback) {
              _dispatchers2.splice(_i, 1);
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

  }, {
    key: 'post',
    value: function post(name) {
      // TODO: add wildcard support and name mask annotation support
      Debug.assert(name !== null, 'name cannot be null.');
      // if (name === null || name.length === 0)
      //   throw new Error('Name cannot be null.');

      var message = this.__parseMessage(this, name);

      //if (message.name === null && message.name === '')
      Debug.assert(message.name !== '', 'Message.name cannot be null.');

      // TODO: o'really 62?
      var isGameObjectOrComponent = this instanceof GameObject || this instanceof Component;
      if (message.mDirection !== 'none' && isGameObjectOrComponent === false) throw new Error('Dispatching not direct messages are not allowed on non Game Objects.');

      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      if (message.mDirection === 'none') {
        this.__invoke.apply(this, [this, message].concat(params));
        this.__invokeComponents.apply(this, [this, message].concat(params));
        this.__invokeOverheard.apply(this, [this, message].concat(params));
      } else if (message.mDirection === 'down') {
        message.mOrigin = /** @type {GameObject} */this.root;

        if (message.mSibblings === true) {
          var _message$mOrigin;

          this.__sendGlobal.apply(this, [this, message, null].concat(params));
          (_message$mOrigin = message.mOrigin).__invokeOverheard.apply(_message$mOrigin, [this, message].concat(params));
        } else {
          var _message$mSender;

          this.__sendBubbles.apply(this, [this, message, false].concat(params));
          (_message$mSender = message.mSender).__invokeOverheard.apply(_message$mSender, [message.sender, message].concat(params));
        }
      } else if (message.mDirection === 'up') {
        var _message$mSender2;

        this.__sendBubbles.apply(this, [this, message, true].concat(params));
        (_message$mSender2 = message.mSender).__invokeOverheard.apply(_message$mSender2, [message.sender, message].concat(params));
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

  }, {
    key: '__sendBubbles',
    value: function __sendBubbles(sender, message, toTop) {
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
          dispatcher.__invokeComponents.apply(dispatcher, [sender, message].concat(params));
        }
      } else {
        for (var _i2 = list.length - 1; _i2 >= 0; _i2--) {
          var _dispatcher = /** @type {GameObject} */list[_i2];
          _dispatcher.__invoke.apply(_dispatcher, [sender, message].concat(params));
          _dispatcher.__invokeComponents.apply(_dispatcher, [sender, message].concat(params));
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

  }, {
    key: '__sendGlobal',
    value: function __sendGlobal(sender, message, origin) {
      var _origin, _origin2;

      if (origin === null) origin = /** @type {GameObject} */message.mOrigin;

      for (var _len3 = arguments.length, params = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
        params[_key3 - 3] = arguments[_key3];
      }

      (_origin = origin).__invoke.apply(_origin, [sender, message].concat(params));
      (_origin2 = origin).__invokeComponents.apply(_origin2, [sender, message].concat(params));

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

      if (message.path !== null) {
        var inPath = this.__checkPath(this.path, message.path);
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
  }, {
    key: '__invokeComponents',
    value: function __invokeComponents(sender, message, toTop) {
      var isGameObject = this instanceof GameObject;
      if (isGameObject === false) return;

      var go = /** @type {GameObject} */this;

      var len = go.mComponents.length;

      for (var _len5 = arguments.length, params = Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
        params[_key5 - 3] = arguments[_key5];
      }

      for (var i = 0; i < len; i++) {
        var c = go.mComponents[i];
        c.__invoke.apply(c, [sender, message].concat(params));
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
    key: '__invokeOverheard',
    value: function __invokeOverheard(sender, message) {
      var dispatchers = MessageDispatcher.mOverheardHandlers[message.mName];

      if (dispatchers === undefined || dispatchers.length === 0) return;

      var clone = dispatchers.slice(0);

      for (var _len6 = arguments.length, params = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
        params[_key6 - 2] = arguments[_key6];
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
     * @param {string} pathMask
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
     * @private
     * @param {*} sender
     * @param {string} info
     *
     * @return {Message}
     */

  }, {
    key: '__parseMessage',
    value: function __parseMessage(sender, info) {
      // TODO: make message pool... this type of objects shall not be
      // but dont forget to take care about cancel property

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

      Debug.assert(ixHash !== -1 && ixAt >= 0, 'Message syntax is not correct. Did you miss @?');

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

/**
 * @private
 * @dict
 */


MessageDispatcher.mOverheardHandlers = {};
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

  /**
   * Time since start in seconds.
   * @returns {number}
   */


  _createClass(Time, null, [{
    key: 'time',
    get: function get() {
      return Time.mTime;
    }

    /**
     * @ignore
     */

  }, {
    key: 'dt',
    get: function get() {
      return Time.mDeltaTime;
    }

    /**
     * @ignore
     */

  }, {
    key: 'scale',
    get: function get() {
      return Time.mScale;
    }

    /**
     * @ignore
     */
    ,
    set: function set(value) {
      Debug.assert(value >= 0, 'Time.scale must be >= 0.');

      Time.mScale = value;
    }
  }]);

  return Time;
}();

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
'use strict';

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
    _this.mGameObject = null;

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
   * @public
   * @param  {GameObject} gameObject The owner of this component.
   * @return {void}
   */


  _createClass(Component, [{
    key: 'onAdded',
    value: function onAdded(gameObject) {}

    /**
     * Called when detached from GameObject.
     *
     * @public
     * @param  {GameObject} gameObject The owner of this component.
     * @return {void}
     */

  }, {
    key: 'onRemoved',
    value: function onRemoved(gameObject) {}

    /**
     * Called at every fixed frame update.
     * @public
     * @param  {number} dt Amount of seconds since the last update.
     * @return {void}
     */

  }, {
    key: 'onFixedUpdate',
    value: function onFixedUpdate(dt) {}

    /**
     * Called at every engine update.
     * @public
     * @param  {number} dt Amount of seconds since the last update.
     * @return {void}
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate(dt) {}

    /**
     * Called after all updates have been executed.
     * @public
     * @param  {number} dt Amount of seconds since the last update.
     * @return {void}
     */

  }, {
    key: 'onPostUpdate',
    value: function onPostUpdate(dt) {}

    // TODO: finish

  }, {
    key: 'dispose',
    value: function dispose() {}

    // TODO: finish

    /**
     * Detaches this Component from its parent GameObject.
     * @returns {void}
     */

  }, {
    key: 'removeFromParent',
    value: function removeFromParent() {
      if (this.mGameObject === null) return;

      this.mGameObject.removeComponent(this);
    }

    /**
     * Returns owner of this component.
     *
     * @returns {GameObject}
     */

  }, {
    key: 'gameObject',
    get: function get() {
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

  }, {
    key: 'path',
    get: function get() {
      if (this.mGameObject !== null) return this.mGameObject.path + '#' + this.constructor.name;

      return this.constructor.name;
    }
  }]);

  return Component;
}(MessageDispatcher);

/**
 * @ignore
 * @type {number}
 * @nocollapse
 */


Component.ID = 0;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Building block in Black Engine.
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

    /**
     * @private
     * @type {number}
     */
    _this.mNumChildrenRemoved = 0;

    /**
     * @private
     * @type {number}
     */
    _this.mNumComponentsRemoved = 0;
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
     * @public
     * @return {void}
     */
    value: function onAdded() {}

    /**
     * Called when object is removed from stage.
     *
     * @public
     * @return {void}
     */

  }, {
    key: 'onRemoved',
    value: function onRemoved() {}

    /**
     * Sugar method for adding child GameObjects or Components in a simple manner.
     *
     * @param {...(GameObject|Component)} gameObjectsAndOrComponents A GameObject or Component to add.
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

        if (gooc instanceof GameObject) this.addChild( /** @type {!GameObject} */gooc);else this.addComponent( /** @type {!Component} */gooc);
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
      this.mChildren.splice(index, 0, child);

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
     * Sets the index (layer) of the specified GameObject to the specified index (layer).
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

      if (ix < 0) throw new Error('Given child element was not found in children list.');

      if (ix === index) return child;

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

  }, {
    key: 'removeFromParent',
    value: function removeFromParent() {
      var dispose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.mParent !== null) this.mParent.removeChild(this);

      if (dispose) this.dispose();

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

  }, {
    key: 'removeChild',
    value: function removeChild(child, dispose) {
      var ix = this.mChildren.indexOf(child);

      if (ix < 0) return null;

      return this.removeChildAt(ix);
    }

    /**
     * Finds children by name.
     *
     * @param {string} name Name of the child object to find.
     *
     * @return {GameObject|null} GameObject instance of null if not found.
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
     * Removes GameObjects instance from specified index.
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
      instance.mGameObject = this;

      if (this.root !== null) Black.instance.onComponentAdded(this, instance);

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

  }, {
    key: 'removeComponent',
    value: function removeComponent(instance) {
      if (!instance) return null;

      var index = this.mComponents.indexOf(instance);
      if (index > -1) this.mComponents.splice(index, 1);

      // detach game object after or before?
      instance.mGameObject = null;
      instance.onRemoved(this);

      if (this.root !== null) Black.instance.onComponentRemoved(this, instance);

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
     * Returns number of component's of this GameObject.
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
     * @ignore
     * @param {number} dt
     *
     * @return {void}
     */
    value: function __fixedUpdate(dt) {
      this.onFixedUpdate(dt);

      for (var k = 0; k < this.mComponents.length; k++) {
        var c = this.mComponents[k];
        c.mGameObject = this;
        c.onFixedUpdate(dt);

        if (this.__checkRemovedComponents(k)) break;
      }

      for (var i = 0; i < this.mChildren.length; i++) {
        this.mChildren[i].__fixedUpdate(dt);

        if (this.__checkRemovedChildren(i)) break;
      }
    }

    /**
     * @ignore
     * @param {number} dt time since the last frame
     *
     * @return {void}
     */

  }, {
    key: '__update',
    value: function __update(dt) {
      this.onUpdate(dt);

      for (var k = 0; k < this.mComponents.length; k++) {
        var c = this.mComponents[k];
        c.mGameObject = this;
        c.onUpdate(dt);

        if (this.__checkRemovedComponents(k)) break;
      }

      for (var i = 0; i < this.mChildren.length; i++) {
        this.mChildren[i].__update(dt);

        if (this.__checkRemovedChildren(i)) break;
      }
    }

    /**
     * @ignore
     * @param {number} dt time since the last frame
     *
     * @return {void}
     */

  }, {
    key: '__postUpdate',
    value: function __postUpdate(dt) {
      this.onPostUpdate(dt);

      for (var k = 0; k < this.mComponents.length; k++) {
        var c = this.mComponents[k];
        c.mGameObject = this;
        c.onPostUpdate(dt);

        if (this.__checkRemovedComponents(k)) break;
      }

      for (var i = 0; i < this.mChildren.length; i++) {
        this.mChildren[i].__postUpdate(dt);

        if (this.__checkRemovedChildren(i)) break;
      }
    }
  }, {
    key: '__checkRemovedComponents',
    value: function __checkRemovedComponents(i) {
      if (this.mComponents == 0) return false;

      i -= this.mNumComponentsRemoved;
      this.mNumComponentsRemoved = 0;

      if (i < 0) return true;

      return false;
    }
  }, {
    key: '__checkRemovedChildren',
    value: function __checkRemovedChildren(i) {
      if (this.mNumChildrenRemoved == 0) return false;

      i -= this.mNumChildrenRemoved;
      this.mNumChildrenRemoved = 0;

      if (i < 0) return true;

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

  }, {
    key: 'onFixedUpdate',
    value: function onFixedUpdate(dt) {}

    /**
     * Called at every engine update.
     *
     * @public
     * @param {number} dt time since the last frame
     *
     * @return {void}
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate(dt) {}

    /**
     * Called after all updates have been executed.
     *
     * @public
     * @param {number} dt Description
     *
     * @return {void}
     */

  }, {
    key: 'onPostUpdate',
    value: function onPostUpdate(dt) {}

    /**
     * @ignore
     * @param {VideoNullDriver} video   *
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
      var childLen = this.mChildren.length;
      for (var i = 0; i < childLen; i++) {
        child = this.mChildren[i];
        child.__render(video, time, parentAlpha, parentBlendMode);
      }
    }

    /**
     * @protected
     * @param {VideoNullDriver} video Description
     * @param {number} time  Description
     *
     * @return {void}
     */

  }, {
    key: 'onRender',
    value: function onRender(video, time) {}

    /**
     * Override this method if you need to specify GameObject size. Should be always be a local coordinates.
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
    /**
     * Gets/Sets count of children elements.
     *
     * @return {number}
     */

  }, {
    key: 'alignPivot',


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
     * Gets/Sets the scale factor of this object along x-axis.
     *
     * @return {number}
     */

  }, {
    key: 'spawn',


    /**
     * Starts coroutine.
     *
     * @param {Function} gen  Generator function.
     * @param {*=} [ctx=null] Context for Generator function.
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
     * Waits for given amount of seconds before processing.
     *
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
     * Waits for a speceific message.
     *
     * @param {string} message The name of the message to wait for.
     *
     * @return {function(*):*}
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
     * Marks this GameObject and/or its children elements as dirty.
     *
     * @param {DirtyFlag} flag                 The flag or flag bit mask.
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

    /**
     * Marks this GameObject as Local dirty and all children elements as World
     * dirty.
     *
     * @returns {void}
     */

  }, {
    key: 'setTransformDirty',
    value: function setTransformDirty() {
      this.setDirty(DirtyFlag.LOCAL, false);
      this.setDirty(DirtyFlag.WORLD, true);
    }

    /**
     * @ignore
     *
     * @return {void}
     */

  }, {
    key: 'dispose',
    value: function dispose() {}

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
     * Returns cloned Matrix object which represents object orientation in world space.
     *
     * @return {Matrix}
     */

  }, {
    key: 'worldTransformation',
    get: function get() {
      if (this.mDirty & DirtyFlag.WORLD) {
        this.mDirty ^= DirtyFlag.WORLD;

        if (this.mParent !== null) this.mParent.worldTransformation.copyTo(this.mWorldTransform).append(this.localTransformation);else this.localTransformation.copyTo(this.mWorldTransform);
      }

      return this.mWorldTransform;
    }

    /**
     * Returns cloned and inversed Matrix object which represents object orientation in world space
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
     * Returns name of this GameoObject instance.
     *
     * @return {string|null}
     */

  }, {
    key: 'name',
    get: function get() {
      return this.mName;
    }

    /**
     * @ignore
     * @param {string|null} value Description
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mName = value;
    }

    /**
     * Gets/Sets the x coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
     *
     * @return {number}
     */

  }, {
    key: 'x',
    get: function get() {
      return this.mX;
    }

    /**
     * @ignore
     * @param {number} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (this.mX == value) return;

      this.mX = value;
      this.setTransformDirty();
    }

    /**
     * Gets/Sets the y coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
     *
     * @return {number}
     */

  }, {
    key: 'y',
    get: function get() {
      return this.mY;
    }

    /**
     * @ignore
     * @param {number} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (this.mY == value) return;

      this.mY = value;
      this.setTransformDirty();
    }

    /**
     * Gets/Sets the x coordinate of the object's origin in its local space.
     *
     * @return {number}
     */

  }, {
    key: 'pivotX',
    get: function get() {
      return this.mPivotX;
    }

    /**
     * @ignore
     * @param {number} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (this.mPivotX == value) return;

      this.mPivotX = value;
      this.setTransformDirty();
    }

    /**
     * Gets/Sets the y coordinate of the object's origin in its local space.
     *
     * @return {number}
     */

  }, {
    key: 'pivotY',
    get: function get() {
      return this.mPivotY;
    }

    /**
     * @ignore
     * @param {number} value
     *
     * @return {void}
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
     * @ignore
     * @param {number} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (this.mScaleX == value) return;

      this.mScaleX = value;
      this.setTransformDirty();
    }

    /**
     * Gets/Sets the scale factor of this object along y-axis.
     *
     * @return {number} Description
     */

  }, {
    key: 'scaleY',
    get: function get() {
      return this.mScaleY;
    }

    /**
     * @ignore
     * @param {number} value Description
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (this.mScaleY == value) return;

      this.mScaleY = value;
      this.setTransformDirty();
    }

    /**
     * Gets/Sets rotation in radians.
     *
     * @return {number}
     */

  }, {
    key: 'rotation',
    get: function get() {
      return this.mRotation;
    }

    /**
     * @ignore
     * @param {number} value Description
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      if (this.mRotation == value) return;

      this.mRotation = value;
      this.setTransformDirty();
    }

    /**
     * Returns this GameObject parent GameObject.
     * @readonly
     *
     * @return {GameObject}
     */

  }, {
    key: 'parent',
    get: function get() {
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
     * Returns how deep this GameObject in the display tree.
     *
     * @readonly
     *
     * @return {number}
     */

  }, {
    key: 'depth',
    get: function get() {
      if (this.mParent) return this.mParent.depth + 1;else return 0;
    }
  }, {
    key: 'displayDepth',
    get: function get() {
      // Many thanks to Roman Kopansky
      var flatten = function flatten(arr) {
        return arr.reduce(function (acc, val) {
          return acc.concat(val.mChildren.length ? flatten(val.mChildren) : val);
        }, []);
      };
      return flatten(this.root.mChildren).indexOf(this);
    }
    /**
     * @ignore
     * @return {number}
     */

  }, {
    key: 'index',
    get: function get() {
      // TODO: this is only required by Input component and its pretty heavy.
      // Try to workaround it.
      return this.parent.mChildren.indexOf(this);
    }

    /**
     * Gets/sets the width of this object.
     *
     * @return {number}
     */

  }, {
    key: 'width',
    get: function get() {
      return this.getBounds(this.mParent).width;
    }

    /**
     * @ignore
     *
     * @param {number} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.scaleX = 1;
      var currentWidth = this.width;

      if (currentWidth != 0.0) this.scaleX = value / currentWidth;
    }

    /**
     * Gets/sets the height of this object.
     *
     * @return {number}
     */

  }, {
    key: 'height',
    get: function get() {
      return this.getBounds(this.mParent).height;
    }

    /**
     * @ignore
     * @param {number} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.scaleY = 1;
      var currentHeight = this.height;

      if (currentHeight != 0) this.scaleY = value / currentHeight;
    }

    /**
     * Returns width of this GameObject in local space without including children
     * elements.
     *
     * @readonly
     *
     * @return {number}
     */

  }, {
    key: 'localWidth',
    get: function get() {
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

  }, {
    key: 'localHeight',
    get: function get() {
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

  }, {
    key: 'path',
    get: function get() {
      if (this.mParent !== null) return this.mParent.path + '/' + this.mName;

      return this.mName;
    }

    /**
     * Gets/Sets tag of this GameObject.
     *
     * @return {string|null}
     */

  }, {
    key: 'tag',
    get: function get() {
      return this.mTag;
    }

    /**
     * @ignore
     *
     * @param {string|null} value
     *
     * @return {void}
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
     * Returns whenever a given GameObject intersects with a point.
     *
     * @param {GameObject} gameObject GameObject to test.
     * @param {Vector} point          A point to test.
     *
     * @return {boolean} True if intersects.
     */

  }, {
    key: 'intersects',
    value: function intersects(gameObject, point) {
      var tmpVector = new Vector();
      var inv = gameObject.worldTransformationInversed;

      inv.transformVector(point, tmpVector);

      var rect = gameObject.getBounds(gameObject, false);
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
     * Checks if GameObject or any of its children elements intersects the given
     * point, the difference between `hits` and `intersectsWith` that `hits` also
     * checks for presence of `InputComponent`.
     *
     * @param {GameObject} gameObject GameObject to test.
     * @param {Vector} point          Point to test.
     *
     * @return {GameObject|null} Intersecting object or null.
     */

  }, {
    key: 'hits',
    value: function hits(gameObject, point) {
      // TODO: add colliders

      var obj = null;
      for (var i = gameObject.numChildren - 1; i >= 0; --i) {
        var child = gameObject.mChildren[i];

        obj = GameObject.hits(child, point);
        if (obj != null) return obj;

        var c = child.getComponent(InputComponent);
        var touchable = c !== null && c.touchable;
        if (touchable && GameObject.intersects(child, point)) {
          obj = child;
          break;
        }
      }

      if (obj === null) {
        var _c = gameObject.getComponent(InputComponent);
        var _touchable = _c !== null && _c.touchable;

        if (_touchable && GameObject.intersects(gameObject, point)) return gameObject;
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

      if (obj === null && GameObject.intersects(gameObject, point)) return gameObject;

      return null;
    }

    /**
     * Returns all GameObject with given tag.
     *
     * @param {string} tag Tag to find.
     *
     * @returns {Array<GameObject>|null} Array of GameObject or null if not found.
     */

  }, {
    key: 'findWithTag',
    value: function findWithTag(tag) {
      if (Black.instance.mTagCache.hasOwnProperty(tag) === false) return null;

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
     * Runs action accross all GameObjects.
     *
     * @param {GameObject} node                  GameObject to start iteration from.
     * @param {function(GameObject)} action The function to be executed on
     * every GameObject.
     *
     * @return {void}
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
     * Finds object by its name. If node is not passed the root will be taken as
     * starting point.
     *
     * @param {string} name      Name to search.
     * @param {GameObject=} node Starting GameObject.
     *
     * @return {GameObject} GameObject or null.
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

/**
 * A number scatter for defining a range in 2D space.
 *
 * @cat video
 * @extends Scatter
 */

var Texture = function () {
  /**
   * Creates new Texture instance.
   * @param  {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement} nativeTexture A source of the texture.
   * @param  {Rectangle=} region = undefined                                     A region to be drawn.
   * @param  {Rectangle=} untrimmedRect = undefined                              Actual size of a texture when not trimmed.
   */
  function Texture(nativeTexture, region, untrimmedRect) {
    _classCallCheck(this, Texture);

    /**
     * @private
     * @type {Image}
     */
    this.mTexture = nativeTexture;

    /**
     * @private
     * @type {Rectangle}
     */
    this.mRegion;

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
      if (nativeTexture instanceof HTMLImageElement) this.mRegion = new Rectangle(0, 0, nativeTexture.naturalWidth, nativeTexture.naturalHeight);else this.mRegion = new Rectangle(0, 0, nativeTexture.width, nativeTexture.height);
    } else {
      this.mRegion = /** @type {Rectangle} */region;
      this.mIsSubtexture = true;
    }

    /**
     * @private
     * @type {boolean}
     */
    this.mTrimmed = untrimmedRect !== undefined;

    if (this.mTrimmed === false) untrimmedRect = new Rectangle(0, 0, this.mRegion.width, this.mRegion.height);

    /**
     * @private
     * @type {Rectangle}
     */
    this.mUntrimmedRect = /** @type {Rectangle} */untrimmedRect;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsLoaded = true;

    var w = nativeTexture.naturalWidth || nativeTexture.width;
    var h = nativeTexture.naturalHeight || nativeTexture.height;

    this.mRelativeRegion = new Rectangle(this.mRegion.x / w, this.mRegion.y / h, this.mRegion.width / w, this.mRegion.height / h);

    this.mRelativeRegion.top = this.mRelativeRegion.top;
    this.mRelativeRegion.left = this.mRelativeRegion.left;
    this.mRelativeRegion.right = this.mRelativeRegion.right;
    this.mRelativeRegion.bottom = this.mRelativeRegion.bottom;
  }

  _createClass(Texture, [{
    key: 'dispose',


    /**
     * Dispose and releases all resources related to this texture.
     *
     * @return {void}
     */
    value: function dispose() {
      this.mTexture = null;
    }

    /**
     * @ignore
     *
     * @param {string} string
     *
     * @return {Texture}
     */

  }, {
    key: 'relativeRegion',
    get: function get() {
      return this.mRelativeRegion;
    }

    /**
     * Returns the unique id of this texture.
     *
     * @return {number}
     */

  }, {
    key: 'id',
    get: function get() {
      return this.mId;
    }

    /**
     * Returns True if this texture has been trimmed.
     *
     * @return {boolean}
     */

  }, {
    key: 'isTrimmed',
    get: function get() {
      return this.mTrimmed;
    }

    /**
     * Returns True if this texture is a part of other Texture object
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
     * Returns a Rect object representing the untrimmed size and position of this
     * texture withing other texture if so.
     *
     * @return {Rectangle}
     */

  }, {
    key: 'untrimmedRect',
    get: function get() {
      return this.mUntrimmedRect;
    }

    /**
     * The width of this texture.
     *
     * @return {number}
     */

  }, {
    key: 'width',
    get: function get() {
      if (this.mRegion) return this.mRegion.width;

      return this.mTexture.naturalWidth;
    }

    /**
     * The width of this texture.
     *
     * @return {number}
     */

  }, {
    key: 'height',
    get: function get() {
      if (this.mRegion) return this.mRegion.height;

      return this.mTexture.naturalHeight;
    }

    /**
     * If isSubTexture, returns the physical region inside parent texture.
     *
     * @return {Rectangle}
     */

  }, {
    key: 'region',
    get: function get() {
      return this.mRegion;
    }

    /**
     * Returns native object. Usually DOM Image element.
     *
     * @return {Image}
     */

  }, {
    key: 'native',
    get: function get() {
      return this.mTexture;
    }

    /**
     * True if fully loaded and ready.
     *
     * @return {boolean}
     */

  }, {
    key: 'isLoaded',
    get: function get() {
      return this.mIsLoaded;
    }
  }], [{
    key: 'fromBase64String',
    value: function fromBase64String(string) {
      var imgElement = new Image();
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
     * @ignore
     *
     * @param {HTMLElement} canvas
     *
     * @return {Texture}
     */

  }, {
    key: 'fromCanvas',
    value: function fromCanvas(canvas) {
      return Black.instance.video.getTextureFromCanvas(canvas);
    }
  }]);

  return Texture;
}();

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
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A number scatter for defining a range in 2D space.
 *
 * @cat video
 * @extends Texture
 */

var AtlasTexture = function (_Texture) {
  _inherits(AtlasTexture, _Texture);

  /**
   * Creates new AtlasTexture instance.
   *
   * @param {Texture}              texture A base texture object.
   * @param {{meta: *, frames: *}} Black json object.
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
   * @private
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
     * Returns the texture by a given name.
     *
     * @param {string} name The name of the texture to find.
     *
     * @return {Texture} The Texture or null if not found.
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
      } //names.sort(AtlasTexture.__naturalComparer);
      AtlasTexture.naturalSort(names);

      for (var i = 0; i < names.length; i++) {
        out.push(this.mSubTextures[names[i]]);
      }return out;
    }
  }], [{
    key: "naturalSort",
    value: function naturalSort(dataset) {
      var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      dataset.sort(AtlasTexture.__naturalComparer(field));
    }
  }, {
    key: "__naturalComparer",
    value: function __naturalComparer() {
      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var useAbs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      return function (a, b) {
        var NUMBER_GROUPS = /(-?\d*\.?\d+)/g;
        var aa = String(field == null ? a : a[field]).split(NUMBER_GROUPS);
        var bb = String(field == null ? b : b[field]).split(NUMBER_GROUPS);
        var min = Math.min(aa.length, bb.length);

        for (var i = 0; i < min; i++) {
          var x = 0;
          var y = 0;

          if (useAbs) {
            x = Math.abs(parseFloat(aa[i])) || aa[i].toLowerCase();
            y = Math.abs(parseFloat(bb[i])) || bb[i].toLowerCase();
          } else {
            x = parseFloat(aa[i]) || aa[i].toLowerCase();
            y = parseFloat(bb[i]) || bb[i].toLowerCase();
          }

          if (x < y) return -1;else if (x > y) return 1;
        }

        return 0;
      };
    }

    //dispose() {}

  }]);

  return AtlasTexture;
}(Texture);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Holds information about external assets.
 *
 * @cat loaders
 * @extends MessageDispatcher
 */

var Asset = function (_MessageDispatcher) {
  _inherits(Asset, _MessageDispatcher);

  /**
   * Creates new Assets instance.
   * @param  {string} name Name of asset.
   * @param  {string} url  URL of the asset to load it from.
   */
  function Asset(name, url) {
    _classCallCheck(this, Asset);

    /**
     * @private
     * @type {string}
     */
    var _this = _possibleConstructorReturn(this, (Asset.__proto__ || Object.getPrototypeOf(Asset)).call(this));

    _this.mName = name;

    /**
     * @private
     * @type {string}
     */
    _this.mUrl = url;

    /**
     * @private
     * @type {*|null}
     */
    _this.mData = null;

    /**
     * @private
     * @type {boolean}
     */
    _this.mIsLoaded = false;

    /**
     * @private
     * @type {string|undefined}
     */
    _this.mMimeType = undefined;

    /**
     * @private
     * @type {string}
     */
    _this.mResponseType = '';

    /**
     * @private
     * @type {string}
     */
    _this.mExtension = _this.getExtension(url);

    /**
     * @private
     * @type {XMLHttpRequest|null}
     */
    _this.mRequest = null;
    return _this;
  }

  /**
   * Loads asset from an external source.
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
     * Called when asset is fully loaded.
     *
     * @protected
     * @fires complete
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
     * Returns the name of this asset.
     *
     * @return {string}
     */

  }, {
    key: 'dispose',


    // TODO: finish
    value: function dispose() {}

    /**
     * Helper function. Returns the file extension.
     *
     * @param {string} url Url to get extension from.
     *
     * @return {string} Empty string if no extension were found or extension itself.
     */

  }, {
    key: 'getExtension',
    value: function getExtension(url) {
      if (url.indexOf('.') === -1) return '';

      return url.substring(url.indexOf('.')).toLowerCase();
    }
  }, {
    key: 'name',
    get: function get() {
      return this.mName;
    }

    /**
     * Returns loaded data object associated with this asset.
     *
     * @return {*}
     */

  }, {
    key: 'data',
    get: function get() {
      return this.mData;
    }

    /**
     * Returns true if asset is preloaded.
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

/**
 * Single Texture file asset class responsible for loading images file and
 * converting them into Textures.
 *
 * @cat loaders
 * @extends Asset
 */

var TextureAsset = function (_Asset) {
  _inherits(TextureAsset, _Asset);

  /**
   * Creates TextureAsset instance.
   *
   * @param {string} name Asset name.
   * @param {string} url  URL to load image from.
   */
  function TextureAsset(name, url) {
    _classCallCheck(this, TextureAsset);

    /**
     * @private
     * @type {Image}
     */
    var _this = _possibleConstructorReturn(this, (TextureAsset.__proto__ || Object.getPrototypeOf(TextureAsset)).call(this, name, url));

    _this.mImageElement = new Image();
    return _this;
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */


  _createClass(TextureAsset, [{
    key: "onLoaded",
    value: function onLoaded() {
      this.mData = new Texture(this.mImageElement);

      _get(TextureAsset.prototype.__proto__ || Object.getPrototypeOf(TextureAsset.prototype), "onLoaded", this).call(this);
    }

    /**
     * @override
     * @inheritDoc
     *
     * @return {void}
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
  }]);

  return TextureAsset;
}(Asset);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat loaders
 * @extends Asset
 */

var JSONAsset = function (_Asset) {
  _inherits(JSONAsset, _Asset);

  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name The name of asset.
   * @param {string} url  URL to the json file.
   *
   * @return {void}
   */
  function JSONAsset(name, url) {
    _classCallCheck(this, JSONAsset);

    var _this = _possibleConstructorReturn(this, (JSONAsset.__proto__ || Object.getPrototypeOf(JSONAsset)).call(this, name, url));

    _this.mimeType = 'application/json';
    return _this;
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */


  _createClass(JSONAsset, [{
    key: 'onLoaded',
    value: function onLoaded() {
      this.mData = JSON.parse( /** @type {string} */this.mRequest.responseText);
      _get(JSONAsset.prototype.__proto__ || Object.getPrototypeOf(JSONAsset.prototype), 'onLoaded', this).call(this);
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

/**
 * Font file asset class responsible for loading local font files.
 *
 * Note: this class need a body to work preoperly.
 *
 * @cat loaders
 * @extends Asset
 */

var FontAsset = function (_Asset) {
  _inherits(FontAsset, _Asset);

  /**
   * @param {string} name        The custom name of the font
   * @param {string|null} url    The path to the font
   * @param {boolean} local      Is this font local?
   */
  function FontAsset(name, url, local) {
    _classCallCheck(this, FontAsset);

    if (local === false) url = 'https://fonts.googleapis.com/css?family=' + name.replace(new RegExp(' ', 'g'), '+');

    /**
     * @private
     * @type {string}
     */
    var _this = _possibleConstructorReturn(this, (FontAsset.__proto__ || Object.getPrototypeOf(FontAsset)).call(this, name, url));

    _this.mTestingFontName = 'Courier New';

    /**
     * @private
     * @type {boolean}
     */
    _this.mLocal = local;

    /**
     * @private
     * @type {string}
     */
    _this.mTestingString = '~ GHBDTN,.#$Mlck';

    /**
     * @private
     * @type {number}
     */
    _this.mLoadingTimeout = 2500;

    /**
     * @private
     * @type {number}
     */
    _this.mCheckDelay = 50;

    /**
     * @private
     * @type {HTMLElement}
     */
    _this.mTestingElement = _this.__getTestingElement();

    /**
     * @private
     * @type {HTMLElement}
     */
    _this.mLoaderElement = _this.__getLoaderElement(_this.mLocal);
    _this.mTestingElement.style.fontFamily = _this.mTestingFontName;

    /**
     * @private
     * @type {number}
     */
    _this.mDefaultFontWidth = _this.mTestingElement.offsetWidth;

    _this.mTestingElement.style.fontFamily = name + ',' + _this.mTestingFontName;
    return _this;
  }

  /**
   * @private
   * @return {HTMLElement}
   */


  _createClass(FontAsset, [{
    key: '__getLoaderElement',
    value: function __getLoaderElement(local) {
      var loaderElement = document.createElement(local ? 'style' : 'link');
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

  }, {
    key: '__getTestingElement',
    value: function __getTestingElement() {
      var testingElement = document.createElement('span');
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

  }, {
    key: 'load',
    value: function load() {
      if (this.mLocal) this.mLoaderElement.innerHTML += '\n @font-face {font-family: ' + this.mName + '; src: url(' + this.mUrl + ');}';else this.mLoaderElement.href = this.mUrl;

      this.checkLoadingStatus();
    }

    /**
     * @return {void}
     */

  }, {
    key: 'checkLoadingStatus',
    value: function checkLoadingStatus() {
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
  }, {
    key: 'onLoaded',
    value: function onLoaded() {
      var a = this.mLoaderElement;

      _get(FontAsset.prototype.__proto__ || Object.getPrototypeOf(FontAsset.prototype), 'onLoaded', this).call(this);
      this.mTestingElement.parentNode.removeChild(this.mTestingElement);
    }

    /**
     * @return {void}
     */

  }, {
    key: 'onLoadingFail',
    value: function onLoadingFail() {
      console.warn('loading ' + this.name + ' font failed.');
      this.onLoaded(); //TODO what to do here?
    }
  }]);

  return FontAsset;
}(Asset);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Texture Atlas asset responsible for loading Image file and coresponding Json
 * file.
 *
 * @cat loaders
 * @extends Asset
 */

var AtlasTextureAsset = function (_Asset) {
  _inherits(AtlasTextureAsset, _Asset);

  /**
   * Creates new AtlasTextureAsset instance.
   *
   * @param {string} name     Name of the asset.
   * @param {string} imageUrl Image URL.
   * @param {string} dataUrl  Json URL.
   */
  function AtlasTextureAsset(name, imageUrl, dataUrl) {
    _classCallCheck(this, AtlasTextureAsset);

    /**
     * @private
     * @type {Image}
     */
    var _this = _possibleConstructorReturn(this, (AtlasTextureAsset.__proto__ || Object.getPrototypeOf(AtlasTextureAsset)).call(this, name, imageUrl));

    _this.mImageElement = new Image();

    /**
     * @private
     * @type {JSONAsset}
     */
    _this.dataAsset = new JSONAsset(name, dataUrl);
    _this.dataAsset.on('complete', _this.onJsonLoaded, _this);
    return _this;
  }

  /**
   * @ignore
   * @returns {void}
   */


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
     * @override
     * @inheritDoc
     * @return {void}
     */

  }, {
    key: 'onLoaded',
    value: function onLoaded() {
      this.mData = new AtlasTexture(new Texture(this.mImageElement), /** @type {{meta: *, frames: *}} */this.dataAsset.data);

      _get(AtlasTextureAsset.prototype.__proto__ || Object.getPrototypeOf(AtlasTextureAsset.prototype), 'onLoaded', this).call(this);
    }

    /**
     * @inheritDoc
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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sound file asset class responsible for preloading audio files.
 *
 * @cat loaders
 * @extends Asset
 */

var SoundAsset = function (_Asset) {
  _inherits(SoundAsset, _Asset);

  /**
   * Creates SoundAsset instance.
   *
   * @param {string} name Sound name.
   * @param {string} url  URL to load audio from.
   */
  function SoundAsset(name, url) {
    _classCallCheck(this, SoundAsset);

    /**
     * @private
     * @type {Audio}
     */
    var _this = _possibleConstructorReturn(this, (SoundAsset.__proto__ || Object.getPrototypeOf(SoundAsset)).call(this, name, url));

    _this.mAudioElement = new Audio();
    return _this;
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */


  _createClass(SoundAsset, [{
    key: 'onLoaded',
    value: function onLoaded() {
      this.mData = this.mAudioElement;

      _get(SoundAsset.prototype.__proto__ || Object.getPrototypeOf(SoundAsset.prototype), 'onLoaded', this).call(this);
    }

    /**
     * @override
     * @inheritDoc
     *
     * @return {void}
     */

  }, {
    key: 'load',
    value: function load() {
      var _this2 = this;

      this.mAudioElement.autoplay = false;
      this.mAudioElement.src = this.mUrl;
      this.mAudioElement.preload = 'auto';
      this.mAudioElement.load();
      this.mAudioElement.oncanplaythrough = function () {
        if (!_this2.mData) {
          _this2.onLoaded();
        }
      };
    }
  }]);

  return SoundAsset;
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

/**
 * Reponsible for preloading assets and manages its in memory state.
 *
 * @cat loaders
 * @extends MessageDispatcher
 */

var AssetManager = function (_MessageDispatcher) {
  _inherits(AssetManager, _MessageDispatcher);

  /**
   * Creates new AssetManager instance. AssetManager exposes static property
   * called 'default' and many internal classes uses default instance.
   */
  function AssetManager() {
    _classCallCheck(this, AssetManager);

    /**
     * @private
     * @type {string}
     */
    var _this = _possibleConstructorReturn(this, (AssetManager.__proto__ || Object.getPrototypeOf(AssetManager)).call(this));

    _this.mDefaultPath = '';

    /**
     * @private
     * @type {number}
     */
    _this.mTotalLoaded = 0;

    /**
     * @private
     * @type {boolean}
     */
    _this.mIsAllLoaded = false;

    /**
     * @private
     * @type {number}
     */
    _this.mLoadingProgress = 0;

    /**
     * @private
     * @type {Array<Asset>}
     */
    _this.mQueue = [];

    /**
     * @private
     * @member
     * @dict
     */
    _this.mTextures = {};

    /**
     * @private
     * @member
     * @dict
     */
    _this.mAtlases = {};

    /**
     * @private
     * @member
     * @dict
     */
    _this.mJsons = {};

    /**
     * @private
     * @member
     * @dict
     */
    _this.mSounds = {};

    /**
     * @private
     * @member
     * @dict
     */
    _this.mFonts = {};
    return _this;
  }

  /**
   * Adds single image to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the image.
   *
   * @returns {void}
   */


  _createClass(AssetManager, [{
    key: 'enqueueImage',
    value: function enqueueImage(name, url) {
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

  }, {
    key: 'enqueueAtlas',
    value: function enqueueAtlas(name, imageUrl, dataUrl) {
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

  }, {
    key: 'enqueueJson',
    value: function enqueueJson(name, url) {
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

  }, {
    key: 'enqueueSound',
    value: function enqueueSound(name, url) {
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

  }, {
    key: 'enqueueFont',
    value: function enqueueFont(name, url) {
      this.mQueue.push(new FontAsset(name, this.mDefaultPath + url, true));
    }

    /**
     * Adds Google Font to the loading queue.
     *
     * @param {string} name Name of the asset.
     *
     * @returns {void}
     */

  }, {
    key: 'enqueueGoogleFont',
    value: function enqueueGoogleFont(name) {
      this.mQueue.push(new FontAsset(name, null, false));
    }

    /**
     * Starts preloading all enqueued assets.
     * @fires complete
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
     * @protected
     * @ignore
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
      if (item.constructor === TextureAsset) this.mTextures[item.name] = item.data;else if (item.constructor === AtlasTextureAsset) this.mAtlases[item.name] = item.data;else if (item.constructor === JSONAsset) this.mJsons[item.name] = item.data;else if (item.constructor === SoundAsset) this.mSounds[item.name] = item.data;else if (item.constructor === FontAsset) {
        this.mFonts[item.name] = item.data;
      } else console.error('Unable to handle asset type.', item);

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
     * Returns array of Texture by given name mask.
     * Searches across all loaded images and atlasses.
     *
     * @param {string} nameMask
     *
     * @returns {Array<Texture>|null}
     */

  }, {
    key: 'getTextures',
    value: function getTextures(nameMask) {
      //if (nameMask == null)

      var out = [];
      var names = [];

      var re = new RegExp("^" + nameMask.split("*").join(".*") + "$");

      // collect single textures
      for (var key in this.mTextures) {
        if (re.test(key)) names.push({ name: key, atlas: null });
      } // collect textures from all atlases
      for (var _key in this.mAtlases) {
        var atlas = this.mAtlases[_key];

        for (var key2 in atlas.mSubTextures) {
          if (re.test(key2)) names.push({ name: key2, atlas: atlas });
        }
      }

      AtlasTexture.naturalSort(names, 'name');

      for (var i = 0; i < names.length; i++) {
        var ao = names[i];

        if (ao.atlas == null) out.push(this.mTextures[ao.name]);else out.push(ao.atlas.mSubTextures[ao.name]);
      }

      if (out.length > 0) return out;

      return null;
    }

    /**
     * Returns AtlasTexture by given name.
     *
     * @param {string} name The name of the Asset.
     *
     * @return {AtlasTexture} Returns atlas or null.
     */

  }, {
    key: 'getAtlas',
    value: function getAtlas(name) {
      return this.mAtlases[name];
    }

    /**
     * Returns Sound by given name.
     *
     * @param {string} name The name of the sound.
     *
     * @return {Audio} Returns sound or null.
     */

  }, {
    key: 'getSound',
    value: function getSound(name) {
      return this.mSounds[name];
    }

    /**
     * Gets/Sets default path for preloading. Usefull when url's getting too long.
     * The asset path will be concatenated with defaultPath.
     *
     * @return {string}
     */

  }, {
    key: 'defaultPath',
    get: function get() {
      return this.mDefaultPath;
    }

    /**
     * @ignore
     * @param {string} value
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      this.mDefaultPath = value;
    }

    /**
     * Returns True if all assets were loaded.
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

/**
 * Default instance. Sprite and other classes uses this instance to find textures by name.
 * @static
 * @type {AssetManager}
 */


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
   * @param {Message} msg
   * @param {Rectangle} rect
   *
   * @returns {void}
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
     * @param  {number} px
     * @param  {number} py
     */
    value: function drawImage(texture, px, py) {}

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
  }, {
    key: 'setMaterial',
    value: function setMaterial(material) {}

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
    _this.mCurrentObject = null;

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
     * @inheritDoc
     * @override
     *
     * @param {Texture} texture
     * @param {number} px
     * @param {number} py
     *
     * @return {void}
     */
    value: function drawImage(texture, px, py) {
      var w = texture.width;
      var h = texture.height;
      var ox = texture.untrimmedRect.x;
      var oy = texture.untrimmedRect.y;

      this.mCtx.drawImage(texture.native, texture.region.x, texture.region.y, w, h, ox, oy, w, h);
    }

    /**
     * drawText
     *
     * @inheritDoc
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
      this.mCtx.save();
      this.mCtx.beginPath();
      this.mCtx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
      this.mCtx.clip();

      this.mCtx.font = style.style + ' ' + style.weight + ' ' + style.size + 'px "' + style.name + '"';
      this.mCtx.fillStyle = this.hexColorToString(style.color);

      var x = 0;
      var y = 0;
      if (style.align === 'center') x += (bounds.width - textWidth) * 0.5;else if (style.align === 'right') x += bounds.width - textWidth;

      this.mCtx.textBaseline = 'top';

      if (style.strokeThickness > 0) {
        this.mCtx.lineJoin = 'round';
        this.mCtx.miterLimit = 2;
        this.mCtx.lineWidth = style.strokeThickness;
        this.mCtx.strokeStyle = this.hexColorToString(style.strokeColor);
        this.mCtx.strokeText(text, x + bounds.x, y + bounds.y);
      }

      this.mCtx.fillText(text, x + bounds.x, y + bounds.y);

      this.mCtx.closePath();
      this.mCtx.restore();
    }

    /**
     * clear
     * @inheritDoc
     * @override
     *
     * @return {void}
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.mCtx.setTransform(1, 0, 0, 1, 0, 0);
      this.mCtx.clearRect(0, 0, this.mCtx.canvas.width, this.mCtx.canvas.height);
    }

    /**
     * @inheritDoc
     * @override
     *
     * @return {void}
     */

  }, {
    key: 'beginFrame',
    value: function beginFrame() {
      _get(CanvasDriver.prototype.__proto__ || Object.getPrototypeOf(CanvasDriver.prototype), 'beginFrame', this).call(this);

      this.clear();
      //this.mCtx.save();

      this.mCtx.globalCompositeOperation = this.mGlobalBlendMode;
    }

    /**
     * @inheritDoc
     * @override
     *
     * @return {void}
     */

  }, {
    key: 'endFrame',
    value: function endFrame() {
      _get(CanvasDriver.prototype.__proto__ || Object.getPrototypeOf(CanvasDriver.prototype), 'endFrame', this).call(this);

      //this.mCtx.restore();
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
      return new Texture(canvas);
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
      this.mCurrentObject = gameObject;
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
    key: 'clip',
    value: function clip(rect) {
      //this.mCtx.beginPath();
      console.log('123');

      this.mCtx.rect(rect.x, rect.y, rect.width, rect.height);
      this.mCtx.clip();

      //this.mCtx.endPath();
    }
  }, {
    key: 'globalAlpha',
    set: function set(value) {
      if (value == this.mGlobalAlpha) return;

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

  }, {
    key: 'globalBlendMode',
    set: function set(blendMode) {
      // if (blendMode === BlendMode.AUTO)
      //   return;

      if (this.mGlobalBlendMode === blendMode) return;

      // small performance win
      // if (this.mCtx.globalCompositeOperation === blendMode)
      //   return;

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
     * @inheritDoc
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
         * @inheritDoc
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
         * @inheritDoc
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
         * @inheritDoc
         *
         * @param  {Texture} texture
         * @param  {Rectangle} bounds
         * @return {void}
         */

    }, {
        key: 'drawImage',
        value: function drawImage(texture, px, py) {
            /** @type {Matrix|null} */
            var oldTransform = this.mTransform;
            var uw = texture.untrimmedRect.x;
            var uh = texture.untrimmedRect.y;

            //this.mTransform.translate(px, py);

            var el = this.__popElement(this.mPixelated ? 'sprite-p' : 'sprite');
            this.__updateElementCommon(el);
            this.__updateImageElement(el, texture);

            this.mTransform = oldTransform;
        }

        /**
         * @inheritDoc
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

            this.mTransform.translate(bounds.x, bounds.y);

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

                if (el.style.webkitTextStrokeWidth != style.strokeThickness + 'px') el.style.webkitTextStrokeWidth = style.strokeThickness + 'px';
            }

            if (el.style.backgroundImage !== 'none') el.style.backgroundImage = 'none';
        }
    }]);

    return DOMDriver;
}(VideoNullDriver);
"use strict";

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

var WebGLDriver = function (_VideoNullDriver) {
  _inherits(WebGLDriver, _VideoNullDriver);

  /**
   * @param  {HTMLElement} containerElement description
   * @param  {number} width            description
   * @param  {number} height           description
   */
  function WebGLDriver(containerElement, width, height) {
    _classCallCheck(this, WebGLDriver);

    var _this = _possibleConstructorReturn(this, (WebGLDriver.__proto__ || Object.getPrototypeOf(WebGLDriver)).call(this, containerElement, width, height));

    console.log("WebGL-");

    _this.gl = null;

    _this.__createCanvas();

    _this.mPrograms = {};
    _this.mActiveProgram = null;
    _this.state = new WebGLState(_this);
    return _this;
  }

  /**
   * __createCanvas
   *
   * @return {void}
   */


  _createClass(WebGLDriver, [{
    key: "__createCanvas",
    value: function __createCanvas() {
      var cvs = /** @type {HTMLCanvasElement} */document.createElement("canvas");
      cvs.id = "canvas";
      this.mContainerElement.appendChild(cvs);

      var config = {
        antialias: true, // default true
        alpha: false,
        premultipliedAlpha: false
      };

      var gl = this.gl = cvs.getContext("webgl", config) || cvs.getContext("webgl-experimental", config);
      gl.canvas.width = this.mClientWidth;
      gl.canvas.height = this.mClientHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0, 0, 0, 1);
    }
  }, {
    key: "__onResize",
    value: function __onResize(msg, rect) {
      _get(WebGLDriver.prototype.__proto__ || Object.getPrototypeOf(WebGLDriver.prototype), "__onResize", this).call(this, msg, rect);

      var gl = this.gl;
      gl.canvas.width = this.mClientWidth;
      gl.canvas.height = this.mClientHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      Object.values(this.mPrograms).forEach(function (program) {
        return program.onResize(msg, rect);
      });
    }
  }, {
    key: "setMaterial",
    value: function setMaterial(material) {
      var program = this.mPrograms[material.Program.name];

      if (!program) {
        program = this.mPrograms[material.Program.name] = new material.Program(this);
        this.__flush();
        program.activate();
        program.init(this.mClientWidth, this.mClientHeight);
        this.mActiveProgram = program;
      } else if (program !== this.mActiveProgram) {
        this.__flush();
        program.activate();
        this.mActiveProgram = program;
      }

      program.setMaterial(material);
    }
  }, {
    key: "setTransform",
    value: function setTransform(m) {
      this.mActiveProgram.setTransform(m);
    }
  }, {
    key: "drawImage",
    value: function drawImage(texture, bounds) {
      this.mActiveProgram.drawImage(texture, bounds);
    }
  }, {
    key: "drawText",
    value: function drawText(text, style, bounds, textWidth, textHeight) {
      this.mActiveProgram.drawText(text, style, bounds, textWidth, textHeight);
    }
  }, {
    key: "beginFrame",
    value: function beginFrame() {
      _get(WebGLDriver.prototype.__proto__ || Object.getPrototypeOf(WebGLDriver.prototype), "beginFrame", this).call(this);
      // this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
  }, {
    key: "endFrame",
    value: function endFrame() {
      _get(WebGLDriver.prototype.__proto__ || Object.getPrototypeOf(WebGLDriver.prototype), "endFrame", this).call(this);
      this.__flush();
    }
  }, {
    key: "__flush",
    value: function __flush() {
      this.mActiveProgram && this.mActiveProgram.flush();
    }
  }, {
    key: "globalAlpha",
    set: function set(value) {
      this.mActiveProgram.globalAlpha = value;
    }
  }, {
    key: "globalBlendMode",
    set: function set(blendMode) {
      var same = this.state.checkBlendMode(blendMode);

      if (!same) {
        this.__flush();
        this.state.setBlendMode(blendMode);
      }
    }
  }]);

  return WebGLDriver;
}(VideoNullDriver);
"use strict";

var WebGLConstants = {
  FLOAT: 0x1406,
  FLOAT_VEC2: 0x8B50,
  FLOAT_VEC3: 0x8B51,
  FLOAT_VEC4: 0x8B52,
  INT: 0x1404,
  INT_VEC2: 0x8B53,
  INT_VEC3: 0x8B54,
  INT_VEC4: 0x8B55,
  BOOL: 0x8B56,
  BOOL_VEC2: 0x8B57,
  BOOL_VEC3: 0x8B58,
  BOOL_VEC4: 0x8B59,
  FLOAT_MAT2: 0x8B5A,
  FLOAT_MAT3: 0x8B5B,
  FLOAT_MAT4: 0x8B5C,
  SAMPLER_2D: 0x8B5E,
  SAMPLER_CUBE: 0x8B60,
  SAMPLER_3D: 0x8B5F,
  SAMPLER_2D_SHADOW: 0x8B62,
  FLOAT_MAT2x3: 0x8B65,
  FLOAT_MAT2x4: 0x8B66,
  FLOAT_MAT3x2: 0x8B67,
  FLOAT_MAT3x4: 0x8B68,
  FLOAT_MAT4x2: 0x8B69,
  FLOAT_MAT4x3: 0x8B6A,
  SAMPLER_2D_ARRAY: 0x8DC1,
  SAMPLER_2D_ARRAY_SHADOW: 0x8DC4,
  SAMPLER_CUBE_SHADOW: 0x8DC5,
  UNSIGNED_INT: 0x1405,
  UNSIGNED_INT_VEC2: 0x8DC6,
  UNSIGNED_INT_VEC3: 0x8DC7,
  UNSIGNED_INT_VEC4: 0x8DC8,
  INT_SAMPLER_2D: 0x8DCA,
  INT_SAMPLER_3D: 0x8DCB,
  INT_SAMPLER_CUBE: 0x8DCC,
  INT_SAMPLER_2D_ARRAY: 0x8DCF,
  UNSIGNED_INT_SAMPLER_2D: 0x8DD2,
  UNSIGNED_INT_SAMPLER_3D: 0x8DD3,
  UNSIGNED_INT_SAMPLER_CUBE: 0x8DD4,
  UNSIGNED_INT_SAMPLER_2D_ARRAY: 0x8DD7,

  TEXTURE_2D: 0x0DE1,
  TEXTURE_CUBE_MAP: 0x8513,
  TEXTURE_3D: 0x806F,
  TEXTURE_2D_ARRAY: 0x8C1A
};
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Maps black blend modes to WebGl blend functions.
 */

var _WebGLBlendMode = function WebGLBlendMode(blendMode, gl) {
  var _map;

  var map = (_map = {}, _defineProperty(_map, BlendMode.NORMAL, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.ADD, { src: gl.ONE, dst: gl.DST_ALPHA }), _defineProperty(_map, BlendMode.MULTIPLY, { src: gl.DST_COLOR, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.SCREEN, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_COLOR }), _defineProperty(_map, BlendMode.OVERLAY, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.DARKEN, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.LIGHTEN, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.COLOR_DODGE, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.COLOR_BURN, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.HARD_LIGHT, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.SOFT_LIGHT, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.DIFFERENCE, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.EXCLUSION, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.HUE, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.SATURATE, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.COLOR, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _defineProperty(_map, BlendMode.LUMINOSITY, { src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA }), _map);

  return (_WebGLBlendMode = function WebGLBlendMode(blendMode) {
    return map[blendMode];
  })(blendMode);
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeMap;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var typeMap = (_typeMap = {}, _defineProperty(_typeMap, WebGLConstants.FLOAT, "uniform1f"), _defineProperty(_typeMap, WebGLConstants.FLOAT_VEC2, "uniform2fv"), _defineProperty(_typeMap, WebGLConstants.FLOAT_VEC3, "uniform3fv"), _defineProperty(_typeMap, WebGLConstants.FLOAT_VEC4, "uniform4fv"), _defineProperty(_typeMap, WebGLConstants.INT, "uniform1i"), _defineProperty(_typeMap, WebGLConstants.INT_VEC2, "uniform2iv"), _defineProperty(_typeMap, WebGLConstants.INT_VEC3, "uniform3iv"), _defineProperty(_typeMap, WebGLConstants.INT_VEC4, "uniform4iv"), _defineProperty(_typeMap, WebGLConstants.FLOAT_MAT2, "uniformMatrix2fv"), _defineProperty(_typeMap, WebGLConstants.FLOAT_MAT3, "uniformMatrix3fv"), _defineProperty(_typeMap, WebGLConstants.FLOAT_MAT4, "uniformMatrix4fv"), _defineProperty(_typeMap, WebGLConstants.SAMPLER_2D, "uniform1i"), _typeMap);

var WebGLBaseProgramInfo = function () {
  function WebGLBaseProgramInfo(renderer, vertexShaderSource, fragmentShaderSource, attributesInfo) {
    _classCallCheck(this, WebGLBaseProgramInfo);

    this.mRenderer = renderer;

    var gl = this.gl = renderer.gl;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    var program = this.program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    var uniforms = this.uniforms = {};
    var uniformsAmount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    var _loop = function _loop(i) {
      var uniformInfo = gl.getActiveUniform(program, i);
      var name = uniformInfo.name;
      var isArray = name.slice(-3) === "[0]";
      name = isArray ? name.slice(0, -3) : name;

      var location = gl.getUniformLocation(program, uniformInfo.name);
      var sSetter = typeMap[uniformInfo.type] + (isArray ? "v" : "");
      var setter = gl[sSetter].length === 2 ? function (v) {
        return gl[sSetter](location, v);
      } : function (v) {
        return gl[sSetter](location, false, v);
      };

      // setter.location = location;
      Object.defineProperty(uniforms, name, { set: setter });
    };

    for (var i = 0; i < uniformsAmount; i++) {
      _loop(i);
    }

    this.mGLArrayBuffer = gl.createBuffer();
    this.mRenderer.state.bindArrayBuffer(this.mGLArrayBuffer);
    this.attributes = new WebGLVAO(this, attributesInfo);
  }

  _createClass(WebGLBaseProgramInfo, [{
    key: "init",
    value: function init(clientWidth, clientHeight) {}
  }, {
    key: "onResize",
    value: function onResize(msg, rect) {}
  }, {
    key: "setMaterial",
    value: function setMaterial(material) {}
  }, {
    key: "setTransform",
    value: function setTransform(m) {}
  }, {
    key: "drawImage",
    value: function drawImage(texture, bounds) {}
  }, {
    key: "drawText",
    value: function drawText(text, style, bounds, textWidth, textHeight) {}
  }, {
    key: "activate",
    value: function activate() {
      this.gl.useProgram(this.program);
    }
  }, {
    key: "flush",
    value: function flush() {
      this.mRenderer.state.endBatch();
    }
  }, {
    key: "globalAlpha",
    set: function set(value) {}
  }]);

  return WebGLBaseProgramInfo;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebGLState = function () {
  function WebGLState(renderer) {
    _classCallCheck(this, WebGLState);

    var gl = this.gl = renderer.gl;
    this.mRenderer = renderer;

    this.mTexturesManager = new WebGLTexturesManager(renderer);
    this.mBoundElementBuffer = null;
    this.mBoundArrayBuffer = null;
    this.mBlendMode = null;

    gl.enable(gl.BLEND);
    this.setBlendMode(BlendMode.NORMAL);
  }

  _createClass(WebGLState, [{
    key: "bindArrayBuffer",
    value: function bindArrayBuffer(buffer) {
      if (buffer === this.mBoundArrayBuffer) return;

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
      this.mBoundArrayBuffer = buffer;
    }
  }, {
    key: "bindElementBuffer",
    value: function bindElementBuffer(buffer) {
      if (buffer === this.mBoundElementBuffer) return;

      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
      this.mBoundElementBuffer = buffer;
    }
  }, {
    key: "bindTexture",
    value: function bindTexture(texture) {
      return this.mTexturesManager.bindTexture(texture);
    }
  }, {
    key: "setBlendMode",
    value: function setBlendMode(blend) {
      if (blend === this.mBlendMode) return;

      this.mBlendMode = blend;
      var blendFunc = WebGLBlendMode(blend, this.gl);
      this.gl.blendFunc(blendFunc.src, blendFunc.dst);

      return true;
    }
  }, {
    key: "checkBlendMode",
    value: function checkBlendMode(blend) {
      return blend === this.mBlendMode;
    }
  }, {
    key: "endBatch",
    value: function endBatch() {
      this.mTexturesManager.endBatch();
    }
  }]);

  return WebGLState;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebGLTexturesManager = function () {
  function WebGLTexturesManager(renderer) {
    _classCallCheck(this, WebGLTexturesManager);

    var gl = this.gl = renderer.gl;
    var UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);

    this.mRenderer = renderer;
    this.mBoundTextures = new Array(UNITS).fill(null);
    this.mBatchTextures = new Array(UNITS).fill(null);
    this.mGLTextures = [];

    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = 8;
    ctx.fillRect(0, 0, 8, 8);

    for (var i = 0; i < UNITS; i++) {
      var glTexture = this.mGLTextures[i] = gl.createTexture();

      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, glTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
  }

  _createClass(WebGLTexturesManager, [{
    key: "bindTexture",
    value: function bindTexture(texture) {
      var gl = this.gl;
      var boundTextures = this.mBoundTextures;
      var batchTextures = this.mBatchTextures;
      var index = boundTextures.indexOf(texture);

      if (index === -1) {

        index = boundTextures.indexOf(null);
        index = index === -1 ? batchTextures.indexOf(null) : index;

        if (index === -1) {
          return -1;
        }

        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, this.mGLTextures[index]);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.native);
        // todo texture settings repeat nearest clamp from sprite
      }

      boundTextures[index] = texture;
      batchTextures[index] = texture;

      return index;
    }
  }, {
    key: "endBatch",
    value: function endBatch() {
      this.mBatchTextures.fill(null);
    }
  }]);

  return WebGLTexturesManager;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attribTypeMap;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var attribTypeMap = (_attribTypeMap = {}, _defineProperty(_attribTypeMap, WebGLConstants.FLOAT, { size: 1 }), _defineProperty(_attribTypeMap, WebGLConstants.FLOAT_VEC2, { size: 2 }), _defineProperty(_attribTypeMap, WebGLConstants.FLOAT_VEC3, { size: 3 }), _defineProperty(_attribTypeMap, WebGLConstants.FLOAT_VEC4, { size: 4 }), _defineProperty(_attribTypeMap, WebGLConstants.INT, { size: 1 }), _defineProperty(_attribTypeMap, WebGLConstants.INT_VEC2, { size: 2 }), _defineProperty(_attribTypeMap, WebGLConstants.INT_VEC3, { size: 3 }), _defineProperty(_attribTypeMap, WebGLConstants.INT_VEC4, { size: 4 }), _defineProperty(_attribTypeMap, WebGLConstants.UNSIGNED_INT, { size: 1 }), _defineProperty(_attribTypeMap, WebGLConstants.UNSIGNED_INT_VEC2, { size: 2 }), _defineProperty(_attribTypeMap, WebGLConstants.UNSIGNED_INT_VEC3, { size: 3 }), _defineProperty(_attribTypeMap, WebGLConstants.UNSIGNED_INT_VEC4, { size: 4 }), _defineProperty(_attribTypeMap, WebGLConstants.BOOL, { size: 1 }), _defineProperty(_attribTypeMap, WebGLConstants.BOOL_VEC2, { size: 2 }), _defineProperty(_attribTypeMap, WebGLConstants.BOOL_VEC3, { size: 3 }), _defineProperty(_attribTypeMap, WebGLConstants.BOOL_VEC4, { size: 4 }), _attribTypeMap);

var WebGLVAO = function () {
  function WebGLVAO(programInfo, attributesInfo) {
    var _this = this;

    _classCallCheck(this, WebGLVAO);

    var gl = programInfo.gl;
    var viewsHash = this.viewsHash = {};
    this.mViews = [];

    var createSetter = function createSetter(attribInfo) {
      var view = viewsHash[attribInfo.Type.name];

      if (!view) {
        view = viewsHash[attribInfo.Type.name] = new attribInfo.Type(_this.mBuffer);
        _this.mViews.push(view);
        view.batchOffset = 0;
      }

      var BYTES_PER_ELEMENT = view.BYTES_PER_ELEMENT;
      attribInfo.offsetInView = attribInfo.offset / BYTES_PER_ELEMENT;

      if (attribInfo.size === 1) {
        Object.defineProperty(_this, attribInfo.name, {
          set: function set(v) {
            return view[attribInfo.offsetInView + view.batchOffset] = v;
          },
          get: function get() {
            return attribInfo.location;
          }
        });
      } else {
        Object.defineProperty(_this, attribInfo.name, {
          set: function set(v) {
            for (var i = 0, l = v.length; i < l; i++) {
              view[attribInfo.offsetInView + view.batchOffset + i] = v[i];
            }
          },
          get: function get() {
            return attribInfo.location;
          }
        });
      }
    };

    var offset = 0;
    var program = programInfo.program;
    var attribsAmount = gl.getProgramParameter(programInfo.program, gl.ACTIVE_ATTRIBUTES);

    for (var i = 0; i < attribsAmount; i++) {
      var attrib = gl.getActiveAttrib(program, i);
      var name = attrib.name;
      var type = attrib.type;

      var attribInfo = attributesInfo[name] = attributesInfo[name] || {
        Type: Float32Array,
        normalize: false,
        type: gl.FLOAT
      };

      attribInfo.location = gl.getAttribLocation(program, name);
      attribInfo.size = attribTypeMap[type].size;
      attribInfo.name = name;

      offset += offset % attribInfo.Type.BYTES_PER_ELEMENT;
      attribInfo.offset = offset;
      offset += attribInfo.size * attribInfo.Type.BYTES_PER_ELEMENT;
    }

    var mod = offset % 4;
    this.mStride = offset + (mod ? 4 - mod : 0);
    this.mBuffer = new ArrayBuffer(4 * 2000 * this.mStride); // todo 2000 pass
    this.mBatchOffsetInBytes = 0;

    var infos = Object.values(attributesInfo);

    for (var _i = 0, l = infos.length; _i < l; _i++) {
      var _attribInfo = infos[_i];
      createSetter(_attribInfo);
      gl.vertexAttribPointer(_attribInfo.location, _attribInfo.size, _attribInfo.type, _attribInfo.normalize, this.mStride, _attribInfo.offset);
      gl.enableVertexAttribArray(_attribInfo.location);
    }
  }

  _createClass(WebGLVAO, [{
    key: "nextVertex",
    value: function nextVertex() {
      this.mBatchOffsetInBytes += this.mStride;

      for (var i = 0, l = this.mViews.length; i < l; i++) {
        this.mViews[i].batchOffset = this.mBatchOffsetInBytes / this.mViews[i].BYTES_PER_ELEMENT;
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.mBatchOffsetInBytes = 0;

      for (var i = 0, l = this.mViews.length; i < l; i++) {
        this.mViews[i].batchOffset = 0;
      }
    }
  }, {
    key: "data",
    get: function get() {
      return this.mBuffer.slice(0, this.mBatchOffsetInBytes);
    }
  }, {
    key: "countForElementsDraw",
    get: function get() {
      return this.mBatchOffsetInBytes / this.mStride * 6 / 4 - 2;
    }
  }, {
    key: "countForArraysDraw",
    get: function get() {
      return this.mBatchOffsetInBytes / this.mStride;
    }
  }]);

  return WebGLVAO;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vertexShaderSource = "\n  attribute vec2 aVertexPos;\n  attribute vec4 aModelMatrix;\n  attribute vec2 aModelPos;\n  attribute float aAlpha;\n  attribute vec2 aTexCoord;\n  attribute float aTexSlot;\n  attribute vec3 aTint;\n  \n  varying vec2 vTexCoord;\n  varying float vTexSlot;\n  varying vec4 vColor;\n\n  uniform vec2 uProjection;\n\n  void main() {\n    vec2 pos = mat2(aModelMatrix) * aVertexPos + aModelPos;\n    gl_Position = vec4(pos.x * uProjection.x - 1.0, -pos.y * uProjection.y + 1.0, 0.0, 1.0);\n    \n    vTexCoord = aTexCoord;\n    vTexSlot = aTexSlot + 0.5;\n    vColor = vec4(aTint * aAlpha, aAlpha);\n  }\n";

var fragmentShaderSource = "\n  precision lowp float;\n  \n  varying vec2 vTexCoord;\n  varying float vTexSlot;\n  varying vec4 vColor;\n  \n  uniform sampler2D uSamplers[MAX_TEXTURE_IMAGE_UNITS];\n  \n  void main() {\n    int texSlot = int(vTexSlot);\n    \n    for (int i = 0; i < MAX_TEXTURE_IMAGE_UNITS; i++) {\n      if (i == texSlot) {\n        gl_FragColor = texture2D(uSamplers[i], vTexCoord) * vColor;\n        return;\n      }\n    }\n  }\n";

var QUAD = ["left", "top", "right", "top", "left", "bottom", "right", "bottom"];

var WebGLTexProgramInfo = function (_WebGLBaseProgramInfo) {
  _inherits(WebGLTexProgramInfo, _WebGLBaseProgramInfo);

  function WebGLTexProgramInfo(renderer) {
    _classCallCheck(this, WebGLTexProgramInfo);

    var gl = renderer.gl;
    var UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);

    var attributesInfo = {
      aTint: { Type: Uint8Array, normalize: true, type: gl.UNSIGNED_BYTE }
    };

    var _this = _possibleConstructorReturn(this, (WebGLTexProgramInfo.__proto__ || Object.getPrototypeOf(WebGLTexProgramInfo)).call(this, renderer, vertexShaderSource, fragmentShaderSource.replace(/MAX_TEXTURE_IMAGE_UNITS/g, UNITS), attributesInfo));

    _this.MAX_TEXTURE_IMAGE_UNITS = UNITS;
    _this.mBatchObjects = 0;

    // Elements Buffer
    _this.mGLElementArrayBuffer = gl.createBuffer();
    renderer.state.bindElementBuffer(_this.mGLElementArrayBuffer);

    _this.maxBatchSize = 2000;

    var QUAD_INDICES = [0, 1, 2, 3, 3, 4];
    var len = _this.maxBatchSize * 6;
    var indices = new Uint16Array(len);

    for (var i = 0; i < len; i++) {
      indices[i] = QUAD_INDICES[i % 6] + (i / 6 | 0) * 4;
    }

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STREAM_DRAW);
    return _this;
  }

  _createClass(WebGLTexProgramInfo, [{
    key: "init",
    value: function init(clientWidth, clientHeight) {
      this.uniforms.uProjection = new Float32Array([2 / clientWidth, 2 / clientHeight]);
      this.uniforms.uSamplers = new Int32Array(new Array(this.MAX_TEXTURE_IMAGE_UNITS).fill(0).map(function (v, i) {
        return i;
      }));
    }
  }, {
    key: "onResize",
    value: function onResize(msg, rect) {
      this.uniforms.uProjection = new Float32Array([2 / rect.width, 2 / rect.height]);
    }
  }, {
    key: "setMaterial",
    value: function setMaterial(material) {
      this.mMaterial = material;
    }
  }, {
    key: "setTransform",
    value: function setTransform(m) {
      this.mTransform = m;
    }
  }, {
    key: "drawImage",
    value: function drawImage(texture, pivotX, pivotY) {
      var modelMatrix = this.mTransform.value;
      var attributes = this.attributes;
      var region = texture.relativeRegion;
      var alpha = this.mGlobalAlpha;
      var tint = this.mMaterial.tint;
      var r = tint >> 16 & 255;
      var g = tint >> 8 & 255;
      var b = tint & 255;
      var texSlot = this.mRenderer.state.bindTexture(texture);

      if (++this.mBatchObjects > this.maxBatchSize) {
        this.flush();
        this.mBatchObjects = 1;
      }

      if (texSlot === -1) {
        this.flush();
        this.mBatchObjects = 1;
        texSlot = this.mRenderer.state.bindTexture(texture);
      }

      var uintView = attributes.viewsHash.Uint8Array;
      var floatView = attributes.viewsHash.Float32Array;

      var bounds = Rectangle.__cache;
      bounds.set(0, 0, texture.width, texture.height);

      for (var i = 0; i < 4; i++) {
        var batchOffset = floatView.batchOffset;

        floatView[batchOffset + 0] = bounds[QUAD[i * 2]];
        floatView[batchOffset + 1] = bounds[QUAD[i * 2 + 1]];

        floatView[batchOffset + 2] = modelMatrix[0];
        floatView[batchOffset + 3] = modelMatrix[1];
        floatView[batchOffset + 4] = modelMatrix[2];
        floatView[batchOffset + 5] = modelMatrix[3];

        floatView[batchOffset + 6] = modelMatrix[4];
        floatView[batchOffset + 7] = modelMatrix[5];

        floatView[batchOffset + 8] = alpha;

        floatView[batchOffset + 9] = region[QUAD[i * 2]];
        floatView[batchOffset + 10] = region[QUAD[i * 2 + 1]];

        floatView[batchOffset + 11] = texSlot;

        var offset = (batchOffset + 12) * 4;
        uintView[offset] = r;
        uintView[offset + 1] = g;
        uintView[offset + 2] = b;

        attributes.nextVertex();
      }
    }
  }, {
    key: "drawText",
    value: function drawText(text, style, bounds, textWidth, textHeight) {
      var font = style.style + " " + style.weight + " " + style.size + "px \"" + style.name + "\"";
      var key = "" + text + font + style.align + style.color + style.strokeThickness + style.strokeColor;
      var material = this.mMaterial;
      var tex = material.tex;

      if (key !== material.key) {
        var ctx = material.ctx;
        var canvas = void 0;

        if (!ctx) {
          canvas = document.createElement("canvas");
          ctx = canvas.getContext("2d");
        } else {
          canvas = ctx.canvas;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        canvas.width = textWidth;
        canvas.height = textHeight;

        ctx.font = font;
        ctx.fillStyle = this.mRenderer.hexColorToString(style.color);

        ctx.textAlign = style.align;
        ctx.textBaseline = "top";

        var x = style.align === "center" ? textWidth / 2 : style.align === "left" ? 0 : textWidth;
        var lines = text.split("\n");
        var lineHeight = textHeight / lines.length;

        for (var i = 0, l = lines.length; i < l; i++) {
          var y = lineHeight * i;
          ctx.fillText(lines[i], x, y);

          if (style.strokeThickness > 0) {
            ctx.lineWidth = style.strokeThickness;
            ctx.strokeStyle = this.mRenderer.hexColorToString(style.strokeColor);
            ctx.strokeText(text, x, y);
          }
        }

        tex = new Texture(canvas, Rectangle.__cache.set(0, 0, canvas.width, canvas.height));
      }

      this.drawImage(tex, bounds.x, bounds.y); // todo there is no pivots there
    }
  }, {
    key: "flush",
    value: function flush() {
      _get(WebGLTexProgramInfo.prototype.__proto__ || Object.getPrototypeOf(WebGLTexProgramInfo.prototype), "flush", this).call(this);

      var gl = this.gl;

      this.mRenderer.state.bindArrayBuffer(this.mGLArrayBuffer);
      this.mRenderer.state.bindElementBuffer(this.mGLElementArrayBuffer);

      var count = this.attributes.countForElementsDraw;

      if (count > 0) {
        gl.bufferData(gl.ARRAY_BUFFER, this.attributes.data, gl.STREAM_DRAW);
        gl.drawElements(gl.TRIANGLE_STRIP, count, gl.UNSIGNED_SHORT, 0);

        this.attributes.clear();
        this.mBatchObjects = 0;
        this.mRenderer.state.endBatch();
      }
    }
  }, {
    key: "globalAlpha",
    set: function set(value) {
      this.mGlobalAlpha = value;
    }
  }]);

  return WebGLTexProgramInfo;
}(WebGLBaseProgramInfo);
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
    _this.blendMode = BlendMode.NORMAL;

    /**
     * @private
     * @type {boolean}
     */
    _this.mVisible = true;

    _this.material = {
      Program: WebGLTexProgramInfo,
      tint: 0xffffff,

      // text
      ctx: null,
      key: null,
      tex: null
    };
    return _this;
  }

  _createClass(DisplayObject, [{
    key: "__render",


    /**
     * @ignore
     * @param {VideoNullDriver} video
     * @param {number} time
     * @param {number} parentAlpha
     * @param {string} parentBlendMode
     *
     * @return {void}
     */
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
    key: "tint",
    get: function get() {
      return this.material.tint;
    },
    set: function set(value) {
      this.material.tint = value;
    }
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
      this.mAlpha = MathEx.clamp(value, 0, 1);
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
        video.setMaterial(this.material);
        video.setTransform(this.worldTransformation);
        video.globalAlpha = parentAlpha * this.mAlpha;
        video.globalBlendMode = tmpBlendMode = this.blendMode === BlendMode.AUTO ? parentBlendMode : this.blendMode;

        // if (this.mClipRect != null) {
        //   video.save();
        //   video.clip(this.mClipRect);
        // }

        video.drawImage(this.mTexture);
        // if (this.mClipRect != null) {
        //   video.restore();
        // }
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

      video.setMaterial(this.material);
      video.setTransform(this.worldTransformation);
      video.globalAlpha = parentAlpha * this.mAlpha;
      video.globalBlendMode = tmpBlendMode = this.blendMode === BlendMode.AUTO ? parentBlendMode : this.blendMode;

      video.drawText(this.mText, this.mStyle, this.mCacheBounds, this.mTextWidth, this.mTextHeight);

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
      var strokeCorrection = 0;
      if (this.mNeedInvalidate === false) return outRect.set(strokeCorrection, strokeCorrection, this.mFieldWidth, this.mFieldHeight);

      var driver = Black.instance.video;
      var vSize = driver.measureText(this.mText, this.mStyle);
      this.mTextWidth = vSize.x;
      this.mTextHeight = vSize.y;

      if (this.mAutoSize) {
        this.mFieldWidth = this.mTextWidth;
        this.mFieldHeight = this.mTextHeight;
      }

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

/**
 * Contains system functions.
 * @static
 * @cat system
 */

var Device = function () {
  /**
   * Static class.
   */
  function Device() {
    _classCallCheck(this, Device);

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


  _createClass(Device, null, [{
    key: 'getDevicePixelRatio',


    /**
     * @private
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
     * Returns True if touch screen is present.
     *
     * @return {boolean}
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
     * Returns True if engine is running on mobile device.
     *
     * @return {boolean}
     */

  }, {
    key: 'isMobile',
    get: function get() {
      return (/Mobi/.test(navigator.userAgent)
      );
    }

    /**
     * Returns screen pixel ratio.
     *
     * @return {number}
     */

  }, {
    key: 'pixelRatio',
    get: function get() {
      return Device.mInstance.mPixelRatio;
    }
  }]);

  return Device;
}();

/**
 * @private
 * @type {Device}
 * @nocollapse
 */


Device.mInstance = null;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for distribution objects.
 *
 * @cat scatters
 */

var Scatter = function () {
  /**
   * Creates new Scatter instance.
   */
  function Scatter() {
    _classCallCheck(this, Scatter);
  }

  /**
   * Returns random value.
   * @return {*} Any object.
   */


  _createClass(Scatter, [{
    key: "getValue",
    value: function getValue() {}

    /**
     * Returns value at given position.
     *
     * @param {number} t Position to get value at.
     *
     * @return {*} Any object.
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

/**
 * A number scatter for defining a range in 1D space.
 *
 * @cat scatters
 * @extends Scatter
 */

var FloatScatter = function (_Scatter) {
  _inherits(FloatScatter, _Scatter);

  /**
   * Creates new FloatScatter instance.
   *
   * @param {number}      min             The min value along x-axis.
   * @param {number}      [max=undefined] The max value along x-axis.
   * @param {function(number):Number} [ease=null]     Easing function.
   */
  function FloatScatter(min) {
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var ease = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, FloatScatter);

    // NOTE: dont make us @private @member

    /** @type {number} */
    var _this = _possibleConstructorReturn(this, (FloatScatter.__proto__ || Object.getPrototypeOf(FloatScatter)).call(this));

    _this.min = min;

    /** @type {number} */
    _this.max = max == null ? min : max;

    /** @type {function(number):number} */
    _this.ease = ease;
    return _this;
  }

  /**
   * Returns random number withing defined range.
   *
   * @override
   *
   * @return {number} Random number.
   */


  _createClass(FloatScatter, [{
    key: "getValue",
    value: function getValue() {
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

/**
 * A number scatter for defining a range in 2D space.
 *
 * @cat scatters
 * @extends Scatter
 */

var VectorScatter = function (_Scatter) {
  _inherits(VectorScatter, _Scatter);

  /**
   * Creates new VectorScatter instance.
   *
   * @param {number} minX The min value along x-axis.
   * @param {number} minY The min value along y-axis.
   * @param {number} maxX The max value along x-axis.
   * @param {number} maxY The max value along y-axis.
   */
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
   * Returns a random Vector object at given position within a range specified
   * in the constructor.
   * @override
   *
   * @return {Vector} Vector object with random values withing defined range.
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
     * Returns a Vector object at given position.
     * @override
     *
     * @param {number} t The position.
     *
     * @return {Vector} Vector object representing values in a range at
     * given position.
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

/**
 * A number scatter for defining a range in 2D space on a curve.
 *
 * @cat scatters
 * @extends Scatter
 */

var FloatCurveScatter = function (_Scatter) {
  _inherits(FloatCurveScatter, _Scatter);

  /**
   * Creates new FloatCurveScatter instance.
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  function FloatCurveScatter() {
    var _this$mCurve;

    _classCallCheck(this, FloatCurveScatter);

    /**
     * @private
     * @type {Curve}
     */
    var _this = _possibleConstructorReturn(this, (FloatCurveScatter.__proto__ || Object.getPrototypeOf(FloatCurveScatter)).call(this));

    _this.mCurve = new Curve();
    _this.mCurve.baked = true;
    (_this$mCurve = _this.mCurve).set.apply(_this$mCurve, arguments);

    /**
     * @private
     * @type {Vector}
     */
    _this.mCache = new Vector();
    return _this;
  }

  /**
   * Returns a value on a curve at random position.
   * @override
   *
   * @return {number} A random number value on a defined curve.
   */


  _createClass(FloatCurveScatter, [{
    key: "getValue",
    value: function getValue() {
      var t = Math.random();
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

  }, {
    key: "getValueAt",
    value: function getValueAt(t) {
      this.mCurve.interpolate(t, this.mCache);
      return this.mCache.y;
    }
  }]);

  return FloatCurveScatter;
}(Scatter);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A base class for particle system actions. Every frame each action executed over each particle.
 *
 * @cat particles.actions
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
 * @cat particles.actions
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
   *
   * @return {void}
   */


  _createClass(Acceleration, [{
    key: "update",
    value: function update(emmiter, particle, dt) {
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
 * @cat particles.actions
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
   *
   * @return {void}
   */


  _createClass(AlphaOverLife, [{
    key: "update",
    value: function update(emmiter, particle, dt) {
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
 * @cat particles.actions
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
   *
   * @return {void}
   */


  _createClass(ScaleOverLife, [{
    key: "update",
    value: function update(emmiter, particle, dt) {
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
 * @cat particles.actions
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
   *
   * @return {void}
   */


  _createClass(RotationOverLife, [{
    key: "update",
    value: function update(emmiter, particle, dt) {
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
 * @cat particles.actions
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
   *
   * @return {void}
   */


  _createClass(TextureOverLife, [{
    key: "update",
    value: function update(emmiter, particle, dt) {
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
 * @cat particles.initializers
 */

var Initializer = function () {
  /**
   * Creates new Initializer instance.
   */
  function Initializer() {
    _classCallCheck(this, Initializer);
  }

  /**
   * @param {Particle} particle
   *
   * @return {void}
   */


  _createClass(Initializer, [{
    key: "initialize",
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
 * Sets starting particle's life.
 *
 * @cat particles.initializers
 * @extends Initializer
 */

var Life = function (_Initializer) {
  _inherits(Life, _Initializer);

  /**
   * Creates new LIfe instance.
   *
   * @param {FloatScatter} floatScatter The min/max range.
   */
  function Life(floatScatter) {
    _classCallCheck(this, Life);

    /**
     * The min-max range.
     * @type {FloatScatter}
     */
    var _this = _possibleConstructorReturn(this, (Life.__proto__ || Object.getPrototypeOf(Life)).call(this));

    _this.scatter = floatScatter;
    return _this;
  }

  /**
   * @inheritDoc
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
 * Sets starting particle's mass.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */

var Mass = function (_Initializer) {
  _inherits(Mass, _Initializer);

  /**
   * Creates new Mass instance.
   *
   * @param {number} mass The mass.
   */
  function Mass(mass) {
    _classCallCheck(this, Mass);

    /**
     * The mass value.
     * @type {number}
     */
    var _this = _possibleConstructorReturn(this, (Mass.__proto__ || Object.getPrototypeOf(Mass)).call(this));

    _this.mass = mass;
    return _this;
  }

  /**
   * @inheritDoc
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
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */

var Scale = function (_Initializer) {
  _inherits(Scale, _Initializer);

  /**
   * Creates new Scale instance.
   *
   * @param {FloatScatter} floatScatter The min-max range for starting scale.
   */
  function Scale(floatScatter) {
    _classCallCheck(this, Scale);

    /**
     * The min-max range for starting scale.
     * @type {FloatScatter}
     */
    var _this = _possibleConstructorReturn(this, (Scale.__proto__ || Object.getPrototypeOf(Scale)).call(this));

    _this.scatter = floatScatter;
    return _this;
  }

  /**
   * @inheritDoc
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
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */

var Velocity = function (_Initializer) {
  _inherits(Velocity, _Initializer);

  /**
   * Creates new Velocity instance.
   *
   * @param {VectorScatter} vectorScatter The min-max range for starting velocity.
   */
  function Velocity(vectorScatter) {
    _classCallCheck(this, Velocity);

    /**
     * The min-max range for starting velocity.
     * @type {VectorScatter}
     */
    var _this = _possibleConstructorReturn(this, (Velocity.__proto__ || Object.getPrototypeOf(Velocity)).call(this));

    _this.scatter = vectorScatter;
    return _this;
  }

  /**
   * @inheritDoc
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
 * Sets starting particle's position.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */

var Position = function (_Initializer) {
  _inherits(Position, _Initializer);

  /**
   * Creates new Position instance.
   *
   * @param {VectorScatter} vectorScatter The min/max range.
   */
  function Position(vectorScatter) {
    _classCallCheck(this, Position);

    /**
     * The min-max range for position distribution.
     * @type {VectorScatter}
     */
    var _this = _possibleConstructorReturn(this, (Position.__proto__ || Object.getPrototypeOf(Position)).call(this));

    _this.scatter = vectorScatter;
    return _this;
  }

  /**
   * @inheritDoc
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
 * @cat particles.initializers
 * @extends Initializer
 */

var Rotation = function (_Initializer) {
  _inherits(Rotation, _Initializer);

  /**
   * Creates new Rotation instance.
   *
   * @param {FloatScatter} floatScatter The min-max range for starting rotation.
   */
  function Rotation(floatScatter) {
    _classCallCheck(this, Rotation);

    /**
     * The min-max range for starting rotation
     * @type {FloatScatter}
     */
    var _this = _possibleConstructorReturn(this, (Rotation.__proto__ || Object.getPrototypeOf(Rotation)).call(this));

    _this.scatter = floatScatter;
    return _this;
  }

  /**
   * @inheritDoc
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
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */

var RandomTexture = function (_Initializer) {
  _inherits(RandomTexture, _Initializer);

  /**
   * Creates new RandomTexture instance.
   *
   * @param {FloatScatter} floatScatter
   */
  function RandomTexture(floatScatter) {
    _classCallCheck(this, RandomTexture);

    /**
     * The float scatter defines the index of the texture. All values will be
     * rounded.
     *
     * @see {Particle.textureIndex}
     * @type {FloatScatter}
     */
    var _this = _possibleConstructorReturn(this, (RandomTexture.__proto__ || Object.getPrototypeOf(RandomTexture)).call(this));

    _this.scatter = floatScatter;
    return _this;
  }

  /**
   * @inheritDoc
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

/**
 * The particle!
 *
 * @cat particles
 * @class
 */

var Particle = function () {
    function Particle() {
        _classCallCheck(this, Particle);

        this.reset();
    }

    /**
     * Resets particle to default state.
     *
     * @returns {void}
     */


    _createClass(Particle, [{
        key: "reset",
        value: function reset() {
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
            this.r = 0;

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

/**
 * Particle emitter.
 *
 * @cat particles
 * @extends DisplayObject
 * @class
 */

var Emitter = function (_DisplayObject) {
  _inherits(Emitter, _DisplayObject);

  /**
   * Creates new Emitter instance.
   */
  function Emitter() {
    _classCallCheck(this, Emitter);

    /**
     * @private
     * @type {Array<Texture>}
     */
    var _this = _possibleConstructorReturn(this, (Emitter.__proto__ || Object.getPrototypeOf(Emitter)).call(this));

    _this.mTextures = null;

    /**
     * @private
     * @type {Array<Particle>}
     */
    _this.mParticles = [];

    /**
     * @private
     * @type {Array<Particle>}
     */
    _this.mRecycled = [];

    /**
     * @private
     * @type {Array<Initializer>}
     */
    _this.mInitializers = [];

    /**
     * @private
     * @type {Array<Action>}
     */
    _this.mActions = [];

    /**
     * @private
     * @type {GameObject}
     */
    _this.mSpace = null;

    /**
     * @private
     * @type {boolean}
     */
    _this.mIsLocal = true;

    /**
     * @private
     * @type {number}
     */
    _this.mMaxParticles = 10000;

    /**
     * @private
     * @type {FloatScatter}
     */
    _this.mEmitCount = new FloatScatter(10);

    /**
     * @private
     * @type {FloatScatter}
     */
    _this.mEmitNumRepeats = new FloatScatter(Infinity);

    /**
     * @private
     * @type {number}
     */
    _this.mEmitNumRepeatsLeft = _this.mEmitNumRepeats.getValue();

    /**
     * @private
     * @type {FloatScatter}
     */
    _this.mEmitDuration = new FloatScatter(1);

    /**
     * @private
     * @type {number}
     */
    _this.mEmitDurationLeft = _this.mEmitDuration.getValue();

    /**
     * @private
     * @type {FloatScatter}
     */
    _this.mEmitInterval = new FloatScatter(0.1);

    /**
     * @private
     * @type {number}
     */
    _this.mEmitIntervalLeft = _this.mEmitInterval.getValue();

    /**
     * @private
     * @type {FloatScatter}
     */
    _this.mEmitDelay = new FloatScatter(1);

    /**
     * @private
     * @type {number}
     */
    _this.mEmitDelayLeft = _this.mEmitDelay.getValue();

    /**
     * @private
     * @type {number}
     */
    _this.mNextUpdateAt = 0;

    /**
     * @private
     * @type {EmitterState}
     */
    _this.mState = EmitterState.PENDING;

    /**
     * @private
     * @type {Matrix}
     */
    _this.__tmpLocal = new Matrix();

    /**
     * @private
     * @type {Matrix}
     */
    _this.__tmpWorld = new Matrix();

    /**
     * @private
     * @type {EmitterSortOrder}
     */
    _this.__sortOrder = EmitterSortOrder.FRONT_TO_BACK;

    // /** @type {function(a:Particle, b:Particle):number} */
    // this.mComparer = null;
    return _this;
  }

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
      var pbounds = new Rectangle();

      if (this.mTextures.length > 0) {
        var plength = this.mParticles.length;

        if (this.__sortOrder == EmitterSortOrder.FRONT_TO_BACK) {
          for (var i = 0; i < plength; i++) {
            this.__renderParticle(this.mParticles[i], video, parentAlpha, localTransform, worldTransform);
          }
        } else {
          for (var _i = plength - 1; _i > 0; _i--) {
            this.__renderParticle(this.mParticles[_i], video, parentAlpha, localTransform, worldTransform);
          }
        }
      }

      video.restore();
      _get(Emitter.prototype.__proto__ || Object.getPrototypeOf(Emitter.prototype), '__render', this).call(this, video, time, parentAlpha, parentBlendMode);
    }
  }, {
    key: '__renderParticle',
    value: function __renderParticle(particle, video, parentAlpha, localTransform, worldTransform) {
      var texture = this.mTextures[particle.textureIndex];

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

      //pbounds.set(0, 0, texture.untrimmedRect.width, texture.untrimmedRect.height);
      video.drawImage(texture, tw, th);
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

      for (var _i2 = 0; _i2 < alength; _i2++) {
        this.mActions[_i2].preUpdate(dt);
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

    /**
     * @return {EmitterSortOrder}
     */

  }, {
    key: 'sortOrder',
    get: function get() {
      return this.__sortOrder;
    }

    /**
     *
     * @param {EmitterSortOrder} value The order in which particles will be sorted when rendering.
     *
     * @return {void}
     */
    ,
    set: function set(value) {
      return this.__sortOrder = value;
    }
  }]);

  return Emitter;
}(DisplayObject);

/**
 * A blend mode enum.
 * @cat particles
 * @enum {string}
 */

var EmitterSortOrder = {
  FRONT_TO_BACK: 'frontToBack',
  BACK_TO_FRONT: 'backToFront'
};
"use strict";

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
  SINGLE_QUOTE: 222
};
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Holds information about keyboard event.
 *
 * @cat input
 */

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

var Input = function (_System) {
  _inherits(Input, _System);

  /**
   * Private constructor.
   */
  function Input() {
    _classCallCheck(this, Input);

    /**
     * @private
     * @type {Input}
     */
    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this));

    _this.constructor.instance = _this;

    /**
     * @private
     * @type {Vector}
     */
    _this.mPointerPosition = new Vector();

    /**
     * @private
     * @type {Element}
     */
    _this.mDom = Black.instance.containerElement;

    /**
     * @private
     * @type {Array<string>}
     */
    _this.mEventList = null;

    /**
     * @private
     * @type {Array<string>}
     */
    _this.mKeyEventList = null;

    _this.__initListeners();

    /**
     * @private
     * @type {Array<{e: Event, x: number, y:number}>}
     */
    _this.mPointerQueue = [];

    /**
     * @private
     * @type {Array<Event>}
     */
    _this.mKeyQueue = [];

    /**
     * @private
     * @type {Array<number>}
     */
    _this.mPressedKeys = [];

    /**
     * @private
     * @type {boolean}
     */
    _this.mIsPointerDown = false;

    /**
     * @private
     * @type {boolean}
     */
    _this.mNeedUpEvent = false;

    /**
     * NOTE: we need guarantee that keys are not going to chage theirs order
     * when iterating.
     * @private
     * @type {Map}
     */
    _this.mInputListeners = new Map();

    _this.mTarget = null;
    _this.mTargetComponent = null;
    _this.mLockedTarget = null;

    _this.mLastInTargetComponent = null;
    return _this;
  }

  /**
   * @private
   *
   * @returns {void}
   */


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
      }document.addEventListener(this.mEventList[Input.IX_POINTER_UP], function (e) {
        return _this2.__onPointerEventDoc(e);
      }, false);

      for (var _i = 0; _i < this.mKeyEventList.length; _i++) {
        document.addEventListener(this.mKeyEventList[_i], function (e) {
          return _this2.__onKeyEvent(e);
        }, false);
      }
    }

    /**
     * @private
     * @param {Event} e
     *
     * @return {boolean}
     */

  }, {
    key: '__onKeyEvent',
    value: function __onKeyEvent(e) {
      if (Black.instance.isPaused === true) return false;

      this.mKeyQueue.push(e);
      return true;
    }

    /**
     * @private
     * @param {Event} e
     *
     * @returns {void}
     */

  }, {
    key: '__onPointerEventDoc',
    value: function __onPointerEventDoc(e) {
      if (Black.instance.isPaused === true) return;

      // dirty check
      var over = e.target == this.mDom || e.target.parentElement == this.mDom;

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

  }, {
    key: '__onPointerEvent',
    value: function __onPointerEvent(e) {
      if (Black.instance.isPaused === true) return false;

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

  }, {
    key: '__pushEvent',
    value: function __pushEvent(e) {
      var /** @type {Vector|null} */p = null;
      if (e.type.indexOf('touch') === 0) p = this.__getTouchPos(this.mDom, /** @type {TouchEvent} */e);else p = this.__getPointerPos(this.mDom, e);

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

  }, {
    key: '__getPointerPos',
    value: function __getPointerPos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.clientWidth / rect.width;
      var scaleY = canvas.clientHeight / rect.height;
      return new Vector((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY);
    }

    /**
     * @private
     * @param {Element} canvas
     * @param {TouchEvent} evt
     *
     * @return {Vector}
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
     * @inheritDoc
     * @override
     * @param {number} dt
     *
     * @return {void}
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate(dt) {
      // omg, who gave you keyboard?
      this.__updateKeyboard();

      // we had no actual events but still we need to know if something were moved
      if (this.mPointerQueue.length === 0) {
        this.__findTarget(Input.pointerPosition);
        this.__processInOut(Input.pointerPosition);
      }

      for (var i = 0; i < this.mPointerQueue.length; i++) {
        var nativeEvent = this.mPointerQueue[i];

        // update to the lattest position
        this.mPointerPosition.x = nativeEvent.x;
        this.mPointerPosition.y = nativeEvent.y;

        var pointerPos = new Vector(nativeEvent.x, nativeEvent.y);
        var eventType = Input.mInputEventsLookup[this.mEventList.indexOf(nativeEvent.e.type)];

        this.__findTarget(pointerPos);
        this.__processInOut(Input.pointerPosition);
        this.__processNativeEvent(nativeEvent, pointerPos, eventType);
      }

      // Erase the pointer queue
      this.mPointerQueue.splice(0, this.mPointerQueue.length);
      this.mKeyQueue.splice(0, this.mKeyQueue.length);
    }
  }, {
    key: '__findTarget',
    value: function __findTarget(pos) {
      var obj = GameObject.hits(Black.instance.root, pos);

      if (obj === null) {
        this.mTarget = null;
        this.mTargetComponent = null;
        return;
      }

      var c = obj.getComponent(InputComponent);
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
  }, {
    key: '__processNativeEvent',
    value: function __processNativeEvent(nativeEvent, pos, type) {
      if (type === Input.POINTER_DOWN) {
        this.mIsPointerDown = true;
        this.mNeedUpEvent = true;
      } else if (type === Input.POINTER_UP) {
        this.mIsPointerDown = false;
      }

      this.post(type);

      if (this.mTarget === null && this.mLockedTarget === null) return;

      var info = new PointerInfo(this.mTarget, pos.x, pos.y);

      if (type === Input.POINTER_DOWN) {
        this.mLockedTarget = this.mTarget;
      } else if (type === Input.POINTER_UP && this.mLockedTarget !== null) {
        this.mLockedTarget.post('~pointerUp', info);
        this.mLockedTarget = null;
        return;
      }

      var sameTarget = this.mTarget === this.mLockedTarget;

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
        } else {
          // send skipping this gameObject
          if (this.mLockedTarget.mParent !== null && this.mTarget !== null) {
            console.log('parent');
            this.mLockedTarget.mParent.post('~' + type, info);
          }
        }
      }
    }
  }, {
    key: '__postInMessage',
    value: function __postInMessage() {
      if (this.mLockedTarget !== null) {
        if (this.mLockedTarget !== this.mTargetComponent.gameObject && this.mTargetComponent.gameObject !== null) return;
      }

      this.mTargetComponent.mPointerInDispatched = true;
      this.mTargetComponent.gameObject.post('~pointerIn');
      this.mLastInTargetComponent = this.mTargetComponent;
    }
  }, {
    key: '__postOutMessage',
    value: function __postOutMessage() {
      if (this.mLockedTarget !== null && this.mTargetComponent !== null) {
        if (this.mLockedTarget !== this.mTargetComponent.gameObject) return;
      }

      this.mLastInTargetComponent.mPointerInDispatched = false;
      this.mLastInTargetComponent.gameObject.post('~pointerOut');
      this.mLastInTargetComponent = null;
    }
  }, {
    key: '__processInOut',
    value: function __processInOut(pos) {

      if (this.mTargetComponent === null) {
        if (this.mLastInTargetComponent !== null) this.__postOutMessage();
      } else {
        if (this.mLastInTargetComponent !== null && this.mLastInTargetComponent !== this.mTargetComponent) {
          this.__postOutMessage();
          return;
        }

        if (this.mTargetComponent.mPointerInDispatched === false) this.__postInMessage();
      }
    }

    /**
     * @private
     *
     * @returns {void}
     */

  }, {
    key: '__updateKeyboard',
    value: function __updateKeyboard() {
      for (var i = 0; i < this.mKeyQueue.length; i++) {
        var nativeEvent = this.mKeyQueue[i];

        var ix = this.mKeyEventList.indexOf(nativeEvent.type);
        var pIx = this.mPressedKeys.indexOf(nativeEvent.keyCode);
        var fnName = Input.mKeyEventsLookup[ix];

        if (fnName === 'keyUp' && pIx !== -1) this.mPressedKeys.splice(pIx, 1);else if (fnName === 'keyDown' && pIx === -1) {
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

  }], [{
    key: 'on',
    value: function on(name, callback) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      Input.instance.on(name, callback, context);
    }

    /**
     * Indicates if mouse or touch in down at this moment.
     *
     * @return {boolean}
     */

  }, {
    key: 'isPointerDown',
    get: function get() {
      return Input.instance.mIsPointerDown;
    }

    /**
     * Returns mouse or touch pointer x-component.
     * @return {number}
     */

  }, {
    key: 'pointerX',
    get: function get() {
      return Input.instance.mPointerPosition.x;
    }

    /**
     * Returns mouse or touch pointer x-component.
     *
     * @return {number} Description
     */

  }, {
    key: 'pointerY',
    get: function get() {
      return Input.instance.mPointerPosition.y;
    }

    /**
     * Returns mouse or touch pointer position.
     *
     * @return {Vector}
     */

  }, {
    key: 'pointerPosition',
    get: function get() {
      return Input.instance.mPointerPosition;
    }

    /**
     * Returns list of pressed keys.
     *
     * @returns {Array<number>}
     */

  }, {
    key: 'pressedKeys',
    get: function get() {
      return Input.instance.mPressedKeys;
    }
  }]);

  return Input;
}(System);

Input.POINTER_DOWN = 'pointerDown';
Input.POINTER_MOVE = 'pointerMove';
Input.POINTER_UP = 'pointerUp';
Input.POINTER_IN = 'pointerIn';
Input.POINTER_OUT = 'pointerOut';

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

var PointerInfo = function () {
  /**
   * Creates new PointerInfo instance. For internal use only.
   *
   * @param {GameObject} activeObject
   * @param {number} x
   * @param {number} y
   */
  function PointerInfo(activeObject, x, y) {
    _classCallCheck(this, PointerInfo);

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


  _createClass(PointerInfo, [{
    key: 'activeObject',
    get: function get() {
      return this.mActiveObject;
    }
  }, {
    key: 'x',
    get: function get() {
      return this.mX;
    }
  }, {
    key: 'y',
    get: function get() {
      return this.mY;
    }
  }]);

  return PointerInfo;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This component will allow you to subscribe for some input messages.
 *
 * @cat input
 * @extends Component
 */

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
    _this.mPointerInDispatched = false;
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
        if (this.mRepeatTimes-- > 0) {
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
            this.removeFromParent();
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
   * @returns {AnimationInfo} Returns the Animation object that exists with the specified name.
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
     * @returns {AnimationInfo|null}
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

/**
 * THE BLACK ENGINE ITSELF.
 *
 * @extends MessageDispatcher
 */

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
    value: function __bootSystems() {}
    //this.addSystem(new Input());


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

      console.log('%c                        <<< BUY BUY >>>                        ', 'background: #000; color: #fff;');
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
    key: 'dispose',
    value: function dispose() {
      // todo: call dispose on eveyrthing!
    }
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
     * @param {number} timestep
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
     * Returns True if engine is paused.
     *
     * @returns {boolean}
     */
    ,


    /**
     * Sets if fixed-time-step update should happen. When disabled the physics system and other systems may not work.
     *
     * @param {boolean} value
     * @return {void}
     */
    set: function set(value) {
      this.mEnableFixedTimeStep = value;
    }
  }, {
    key: 'isPaused',
    get: function get() {
      return this.mPaused;
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
