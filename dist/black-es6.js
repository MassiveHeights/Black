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

/** @type {Vector}
 * @nocollapse
 */
Vector.__cache = new Vector();


class Matrix {
  /**
   * @param  {number} a = 1  description
   * @param  {number} b = 0  description
   * @param  {number} c = 0  description
   * @param  {number} d = 1  description
   * @param  {number} tx = 0 description
   * @param  {number} ty = 0 description
   * @return {number}        description
   */
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    /** @type {Float32Array} */
    this._matrix = new Float32Array(6);

    this.set(a, b, c, d, tx, ty);
  }

  /**

   * @param  {number} a  description
   * @param  {number} b  description
   * @param  {number} c  description
   * @param  {number} d  description
   * @param  {number} tx description
   * @param  {number} ty description
   * @return {Matrix}    description
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
   * translate - Description
   *
   * @param {number} dx Description
   * @param {number} dy Description
   *
   * @return {Matrix} Description
   */
  translate(dx, dy) {
    let a = this._matrix;

    let /** @type {number} */ a0 = a[0]; // a
    let /** @type {number} */ a1 = a[1]; // b
    let /** @type {number} */ a2 = a[2]; // c
    let /** @type {number} */ a3 = a[3]; // d
    let /** @type {number} */ a4 = a[4]; // tx
    let /** @type {number} */ a5 = a[5]; // ty

    this._matrix[4] += dx;
    this._matrix[5] += dy;

    return this;
  }

  /**
   * setTranslation - Description
   *
   * @param {number} x Description
   * @param {number} y Description
   *
   * @return {Matrix} Description
   */
  setTranslation(x, y) {
    this._matrix[4] = x;
    this._matrix[5] = y;

    return this;
  }

  /**
   * @param  {number} theta     description
   * @param  {number} scale = 1 description
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
   * rotate - angle
   *
   * @param  {number} angle description
   * @return {Matrix}       description
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
   * scale - Description
   *
   * @param {number} sx Description
   * @param {number} sy Description
   *
   * @return {Matrix} Description
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
   * identity - Description
   *
   * @return {Matrix} Description
   */
  identity() {
    return this.set(1, 0, 0, 1, 0, 0);
  }

  /**
   * Same as concat in flash
   * @param  {Matrix} b description
   * @return {Matrix}   description
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
   * @param  {Matrix} b description
   * @return {Matrix}   description
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
   * @param  {number} x         description
   * @param  {number} y         description
   * @param  {Vector=} outVector description
   * @return {Vector}           description
   */
  transformXY(x, y, outVector) {
    outVector = outVector || new Vector();
    let m = this._matrix;

    outVector.x = m[0] * x + m[2] * y + m[4];
    outVector.y = m[1] * x + m[3] * y + m[5];

    return outVector;
  }

  /**
   * @param  {number} x         description
   * @param  {number} y         description
   * @param  {Vector=} outVector description
   * @return {Vector}           description
   */
  transformDirectionXY(x, y, outVector) {
    let m = this._matrix;
    outVector = outVector || new Vector();

    outVector.x = m[0] * x + m[2] * y;
    outVector.y = m[1] * x + m[3] * y;

    return outVector;
  }

  /**
   * transformVector - transforms vector by current matrix object.
   *
   * @param  {Vector} vector    description
   * @param  {Vector=} outVector description
   * @return {Vector}           description
   */
  transformVector(vector, outVector) {
    outVector = outVector || new Vector();
    let m = this._matrix;

    outVector.x = m[0] * vector.x + m[2] * vector.y + m[4];
    outVector.y = m[1] * vector.x + m[3] * vector.y + m[5];

    return outVector;
  }

  /**
   * transformRect - transforms rectangle by current matrix object.
   *
   * @param  {Rectangle} rect    description
   * @param  {Rectangle|null} outRect description
   * @return {Rectangle}         description
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
   * invert - inverts current matrix.
   *
   * @return {Matrix}  description
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

  // NOTE: remove or finish
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
   * clone - clones the current matrix and returns new cloned object.
   *
   * @return {Matrix}  description
   */
  clone() {
    let m = new Matrix();
    let v = this._matrix;
    m.set(v[0], v[1], v[2], v[3], v[4], v[5]);
    return m;
  }

  /**
   * copyTo - copies
   *
   * @param  {Matrix} matrix description
   * @return {Matrix}        description
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
   * copyFrom - description
   *
   * @param  {Matrix} matrix description
   * @return {Matrix}        description
   */
  copyFrom(matrix) {
    return matrix.copyTo(this);
  }

  /**
   * equals - description
   *
   * @param  {Matrix} matrix                   description
   * @param  {number} epsilon = Number.EPSILON description
   * @return {boolean}                          description
   */
  equals(matrix, epsilon = Number.EPSILON) {
    let a = this._matrix;
    let b = matrix._matrix;
    if (!matrix)
      return false;

    return (Math.abs(a[0] - b[0]) < epsilon) && (Math.abs(a[1] - b[1]) < epsilon) && (Math.abs(a[2] - b[2]) < epsilon) &&
      (Math.abs(a[3] - b[3]) < epsilon) && (Math.abs(a[4] - b[4]) < epsilon) && (Math.abs(a[5] - b[5]) < epsilon);
  }

  /**
   * get - description
   *
   * @return {Float32Array}  description
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


class Rectangle {
  /**
   * @param  {number=} y = 0 description
   * @param  {number=} x = 0 description
   * @param  {number=} w = 0 description
   * @param  {number=} h = 0 description
   */
  constructor(x = 0, y = 0, w = 0, h = 0) {
    /** @type {number} */
    this.x = x;

    /** @type {number} */
    this.y = y;

    /** @type {number} */
    this.width = w;

    /** @type {number} */
    this.height = h;
  }

  /**
   * set - Description
   *
   * @param {number} x Description
   * @param {number} y Description
   * @param {number} w Description
   * @param {number} h Description
   *
   * @return {Rectangle} Description
   */
  set(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    return this;
  }

  /**
   * copyFrom - Description
   *
   * @param {Rectangle} rect Description
   *
   * @return {Rectangle} Description
   */
  copyFrom(rect) {
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;

    return this;
  }

  /**
   * copyTo - Description
   *
   * @param {Rectangle} rect Description
   *
   * @return {Rectangle} Description
   */
  copyTo(rect) {
    rect.x = this.x;
    rect.y = this.y;
    rect.width = this.width;
    rect.height = this.height;

    return rect;
  }


  /**
   * left - Description
   *
   * @return {number} Description
   */
  get left() {
    return this.x;
  }

  /**
   * left - Description
   *
   * @param {number} left Left x position.
   */
  set left(left) {
    this.x = left;
  }

  /**
   * right - Description
   *
   * @return {number} Description
   */
  get right() {
    return this.x + this.width;
  }

  /**
   * right - Description
   *
   * @param {number} right Right x position.
   */
  set right(right) {
    this.x = right - this.width;
  }

  /**
   * top - Description
   *
   * @return {number} Description
   */
  get top() {
    return this.y;
  }

  /**
   * top - Description
   *
   * @param {number} top Top y position.
   */
  set top(top) {
    this.y = top;
  }

  /**
   * bottom - Description
   *
   * @return {number} Description
   */
  get bottom() {
    return this.y + this.height;
  }

  /**
   * bottom - Description
   *
   * @param {number} bottom Bottom y position.
   */
  set bottom(bottom) {
    this.y = bottom - this.height;
  }

  /**
   * topLeft - Description
   *
   * @return {Vector} Description
   */
  get topLeft() {
    return new Vector(this.x, this.y);
  }

  /**
   * topLeft - Description
   *
   * @param {Vector} vector Top left position.
   */
  set topLeft(vector) {
    this.left = vector.x;
    this.top = vector.y;
  }

  /**
   * topRight - Description
   *
   * @return {Vector} Description
   */
  get topRight() {
    return new Vector(this.right, this.y);
  }

  /**
   * topRight - Description
   *
   * @param {Vector} vector Top right position.
   */
  set topRight(vector) {
    this.right = vector.x;
    this.top = vector.y;
  }

  /**
   * bottomRight - Description
   *
   * @return {Vector} Description
   */
  get bottomRight() {
    return new Vector(this.right, this.bottom);
  }

  /**
   * bottomRight - Description
   *
   * @param {Vector} vector Right bottom position.
   */
  set bottomRight(vector) {
    this.right = vector.x;
    this.bottom = vector.y;
  }

  /**
   * bottomLeft - Description
   *
   * @return {Vector} Description
   */
  get bottomLeft() {
    return new Vector(this.right, this.bottom);
  }

  /**
   * bottomLeft - Description
   *
   * @param {Vector} vector Left bottom position.
   */
  set bottomLeft(vector) {
    this.left = vector.x;
    this.bottom = vector.y;
  }

  /**
   * size - Description
   *
   * @param {Vector=} outVector Description
   *
   * @return {Vector} Description
   */
  size(outVector = undefined) {
    outVector = outVector || new Vector();
    return outVector.set(this.width, this.height);
  }

  /**
   * zero - Description
   *
   * @return {Rectangle} Description
   */
  zero() {
    return this.set(0, 0, 0, 0);
  }


  /**
   * equals - Description
   *
   * @param {Rectangle} rect Description
   * @param {number=} epsilon Description
   *
   * @return {boolean}
   */
  equals(rect, epsilon = Number.EPSILON) {
    return rect !== null && (Math.abs(this.x - rect.x) < epsilon) && (Math.abs(this.y - rect.y) < epsilon) &&
           (Math.abs(this.width - rect.width) < epsilon) && (Math.abs(this.height - rect.height) < epsilon);
  }


  /**
   * containsXY - Description
   *
   * @param {number} x Description
   * @param {number} y Description
   *
   * @return {boolean} Description
   */
  containsXY(x, y) {
    return x >= this.x && x <= this.right && y >= this.y && y <= this.bottom;
  }


  /**
   * contains - Description
   *
   * @param {Rectangle} rect Description
   *
   * @return {boolean} Description
   */
  contains(rect) {
    return rect.x >= this.x && rect.y >= this.y && rect.right <= this.right && rect.bottom <= this.bottom;
  }

  /**
   * intersects - Description
   *
   * @param {Rectangle} rect Description
   *
   * @return {boolean} Description
   */
  intersects(rect) {
    return rect.right > this.x && rect.bottom > this.y &&
           rect.x < this.right && rect.y < this.bottom;
  }


  /**
   * union - Description
   *
   * @param {Rectangle} toUnion Description
   *
   * @return {Rectangle} Description
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
   * volume - Description
   *
   * @return {number} Description
   */
  get volume() {
    return this.width * this.height;
  }


  /**
   * expand - Description
   *
   * @param {number} x      Description
   * @param {number} y      Description
   * @param {number} width  Description
   * @param {number} height Description
   *
   * @return {Rectangle} Description
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
   * inflate - Description
   *
   * @param {number=} [x=0] Description
   * @param {number=} [y=0] Description
   *
   * @return {Rectangle} Description
   */
  inflate(x = 0, y = 0) {
    this.x -= x;
    this.y -= y;
    this.width += 2 * x;
    this.height += 2 * y;

    return this;
  }


  /**
   * clone - Description
   *
   * @return {Rectangle} Description
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
   * center - Description
   *
   * @param {Vector=} outVector Description
   *
   * @return {Vector} Description
   */
  center(outVector = undefined) {
    outVector = outVector || new Vector();
    return outVector.set(this.x + this.width * 0.5, this.y + this.height * 0.5);
  }

  /**
   * scale - Scales this rectangle.
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
   * isEmpty - Checks rectangle has area.
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

/** @type {Rectangle}
  * @nocollapse
  */
Rectangle.__cache = new Rectangle();


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
}

/** @type {Circle}
 * @nocollapse
 */
Circle.__cache = new Circle();


class Line {
  /**
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


class Polygon {

  /**
   * @param  {Array<Vector>} vertices = [] Array of vertex points;
   */
  constructor(vertices = []) {

    /** @type {Array<Vector>} */
    this.vertices = vertices;

    /** @type {Array<Line>} */
    this.lines = [];

    /** @type {Rectangle} */
    this.bounds = new Rectangle();

    /** @type {Vector} */
    this.center = new Vector();

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
    this.vertices = vertices;
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
    let len = this.vertices.length;
    let vertices = [];

    for (let i = 0; i < len; i++) {
      vertices.push(this.vertices[i].clone());
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
    let polygonVertices = polygon.vertices;
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
    let thisVertices = this.vertices;
    let len = thisVertices.length;
    let vertices = [];

    for (let i = 0; i < len; i++) {
      vertices.push(thisVertices[i].clone());
    }

    return new Polygon(vertices);
  }

  get width() {
    return this.bounds.width;
  }

  get height() {
    return this.bounds.height;
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
    let center = this.center;
    let lines = this.lines;
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
    let thisLines = this.lines;
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
    if (!this.bounds.intersects(polygon.bounds)) {
      return false;
    }

    let thisLines = this.lines;
    let thisLen = thisLines.length;
    let polygonLines = polygon.lines;
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
    let bounds = this.bounds;
    let lines = this.lines;

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
    if (!this.bounds.intersects(rectangle)) {
      return false;
    }

    let thisLines = this.lines;
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
    if (this.bounds.width < polygon.bounds.width || this.bounds.height < polygon.bounds.height) {
      return false;
    }

    if (!this.contains(polygon.center)) {
      return false;
    }

    let thisLines = this.lines;
    let thisLen = thisLines.length;
    let polygonLines = polygon.lines;
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

    let thisLines = this.lines;
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

    let thisLines = this.lines;
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
    let center = this.center;
    let bounds = this.bounds;
    let vertices = this.vertices;
    let lines = this.lines = [];
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
    let center = this.center;
    let vertices = this.vertices;
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
    let bounds = this.bounds;
    let vertices = this.vertices;
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
    let vertices = this.vertices;
    let lines = this.lines = [];

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
    let center = this.center;
    let vertices = this.vertices;
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
    let center = this.center;
    let vertices = this.vertices;
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
    let thisLines = this.lines;
    let thisVertices = this.vertices;
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

    return `Polygon { vertices: ${vertices}, bounds: ${this.bounds.toString(digits)}, center: ${this.center.toString()}, lines: ${lines} }`;
  }

}

/** @type {Polygon}
 * @nocollapse
 */
Polygon.__cache = new Polygon();


class Curve {
  constructor() {

    /** @private @type {Array<number>} */
    this.mPoints = [];

    /** @private @type {Array<Vector>} */
    this.mLookup = null;

    /** @private @type {boolean} */
    this.mBaked = false;

    /** @private @type {number} */
    this.mStep = 1 / 60;

    /** @private @type {Array<number>} */
    this.mEachT = [];
  }

  /**
   * set - Sets new points coordinates.
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
   * baked - Returns true or false depending on baked is enabled or not.
   *
   * @return {boolean}
   */
  get baked() {
    return this.mBaked;
  }

  /**
   * baked - Enables or disables interpolation from cache (lookup).
   *
   * @param  {boolean} label
   */
  set baked(label) {
    this.mBaked = label;

    if (!this.mLookup && this.mPoints) {
      this.__refreshCache();
    }
  }

  /**
   * __initPoints - Wides points array. Sets first point for next bezier same as last of previous.
   *
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
   * __refreshCache - Refresh cache (lookup) for fast interpolations.
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
   * __refreshEachT - Refresh local interpolation kof for each bezier in curve.
   *
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
   * interpolate - Interpolates across whole curve.
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
   * length - Returns single bezier length.
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
   * getFullLength - Returns this curve length.
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

/** @type {Curve}
 * @nocollapse
 */
Curve.__cache = new Curve();


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
}

Debug.throwOnFail = false;
Debug.logOnFail = true;

/**
 * MessageDispatcher - Description
 * @unrestricted
 */

class MessageDispatcher {
  constructor() {
    // object of arrays

    /** @type {Object<string, Array>} */
    this.mListeners = null;
  }

  /**
   * on - Listens to message by given name
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
    let filterIx = name.indexOf('@') ;
    if (filterIx !== -1) {
      // global handler

      let pureName = name.substring(0, filterIx);
      let pathMask = name.substring(filterIx + 1);

      //console.log(pureName, pathMask);

      if (MessageDispatcher.mGlobalHandlers.hasOwnProperty(pureName) === false)
        MessageDispatcher.mGlobalHandlers[pureName] = [];

      let dispatchers = (MessageDispatcher.mGlobalHandlers[pureName]);
      for (let i = 0; i < dispatchers.length; i++)
        if (dispatchers[i].callback === callback)
          return;

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

    for (let i = 0; i < dispatchers.length; i++)
      if (dispatchers[i].callback === callback)
        return;

    dispatchers.push({
      callback: callback,
      context: context
    });
  }

  /**
   * removeOn - Description
   *
   * @param {string} name            Description
   * @param {Function=} [callback=null] Description
   *
   * @return {void} Description
   */
  removeOn(name, callback = null) {
    if (name === null || name.length === 0)
      throw new Error('Name cannot be null.');

    if (this.mListeners === null)
      return;

    let dispatchers = /** @type {Array<{callback: Function, context}>} */ (this.mListeners[name]);

    if (dispatchers === undefined)
      return;

    if (callback === null) {
      dispatchers.splice(0, dispatchers.length);
      return;
    }

    for (let i = dispatchers.length; i--;) {
      if (dispatchers[i].callback === callback) {
        dispatchers.splice(i, 1);
        return;
      }
    }
  }

  /**
   * post - Sends message with given pattern and params
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

    // TODO: o'really 62?
    let isGameObject = this instanceof GameObject;
    if (message.mDirection !== 'none' && isGameObject === false)
      throw new Error('Dispatching not direct messages are not allowed on non Game Objects.');

    if (message.mDirection === 'none') {
      this.__invoke(this, message, ...params);
      this.__invokeGlobal(this, message, ...params);
    } else if (message.mDirection === 'down') {
      message.mOrigin = ( /** @type {GameObject} */ (this)).root;

      if (message.mSibblings === true) {
        this.__sendGlobal(this, message, null, ...params);
        message.mOrigin.__invokeGlobal(this, message, ...params);
      }
      else
        this.__sendBubbles(this, message, false, ...params);
    } else if (message.mDirection === 'up') {
      this.__sendBubbles(this, message, true, ...params);
    } else {
      throw new Error('Unknown message type.');
    }
  }

  /**
   * __sendBubbles - Description
   *
   * @param {*}  sender  Description
   * @param {string}  message Description
   * @param {boolean}  toTop   Description
   * @param {...*} params  Description
   *
   * @return {void} Description
   */
  __sendBubbles(sender, message, toTop, ...params) {
    message.mOrigin = toTop === true ? this : ( /** @type {GameObject} */ (this)).root;

    let list = [this];

    let current = /** @type {GameObject} */ (this);
    while (current.parent !== null) {
      list.push(current.parent);
      current = current.parent;
    }

    if (toTop) {
      for (let i = 0; i < list.length; i++) {
        let dispatcher = /** @type {GameObject} */ (list[i]);
        dispatcher.__invoke(sender, message, ...params);
      }
    } else {
      for (let i = list.length - 1; i >= 0; i--) {
        let dispatcher = /** @type {GameObject} */ (list[i]);
        dispatcher.__invoke(sender, message, ...params);
      }
    }

    message.sender.__invokeGlobal(message.sender, message, ...params);
  }

  /**
   * __sendGlobal - Description
   *
   * @param {*}  sender  Description
   * @param {Message}  message Description
   * @param {GameObject=}  origin  Description
   * @param {...*} params  Description
   *
   * @return {void} Description
   */
  __sendGlobal(sender, message, origin, ...params) {
    if (origin === null)
      origin = /** @type {GameObject} */ (message.mOrigin);

    origin.__invoke(sender, message, ...params);

    for (let i = 0; i < origin.numChildren; i++) {
      let child = origin.getChildAt(i);
      child.__sendGlobal(sender, message, child, ...params);
    }
  }

  /**
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

    if (message.mPathMask !== null) {
      let inPath = this.__checkPath(this.path, message.mPathMask);
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

  /**
   * @param {*}  sender
   * @param {Message}  message
   * @param {...*} params
   *
   * @return {void}
   */
  __invokeGlobal(sender, message, ...params) {
    let dispatchers = MessageDispatcher.mGlobalHandlers[message.mName];

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
   * @param {string} path
   * @param {string} pattern
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
   * __parseMessage - Description
   *
   * @param {*} sender Description
   * @param {string} info   Description
   *
   * @return {Message} Description
   */
  __parseMessage(sender, info) {
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

MessageDispatcher.mGlobalHandlers = {};


class Message {
  constructor() {
    /** @private @type {*} */
    this.mSender = null;

    /** @private @type {string} */
    this.mName;

    /** @private @type {string|null} */
    this.mPathMask = null;

    /** @private @type {string|null} */
    this.mComponentMask = null;

    /** @private @type {string} */
    this.mDirection = 'none';

    /** @private @type {boolean} */
    this.mSibblings = false;

    /** @private @type {Object} */
    this.mOrigin = null;

    /** @private @type {Object} */
    this.mTarget = null;

    /** @private @type {boolean} */
    this.mCanceled = false;
  }

  /**
   * sender - Who send the message
   *
   * @return {*} Description
   */
  get sender() {
    return this.mSender;
  }

  /**
   * name - The name of the message
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }

  /**
   * direction - direction in what message was sent. Can be 'none', 'up' and 'down'.
   *
   * @return {string}
   */
  get direction() {
    return this.mDirection;
  }

  /**
   * sibblings - Indicates if sibblings should be included into dispatching process.
   *
   * @return {boolean} Description
   */
  get sibblings() {
    return this.mSibblings;
  }

  /**
   * pathMask - The GameObject.name mask string if was used.
   *
   * @return {string|null} Description
   */
  get pathMask() {
    return this.mPathMask;
  }

  /**
   * componentMask - Component mask string if was used.
   *
   * @return {string|null}
   */
  get componentMask() {
    return this.mComponentMask;
  }

  /**
   * origin - The original sender of a message.
   *
   * @return {*|null}
   */
  get origin() {
    return this.mOrigin;
  }

  /**
   * target - The destination object for this message.
   *
   * @return {*|null}
   */
  get target() {
    return this.mTarget;
  }

  /**
   * cancel - Stops propagation of the message.
   *
   * @return {void}
   */
  cancel() {
    this.mCanceled = true;
  }

  /**
   * canceled - True/False if
   *
   * @return {boolean}
   */
  get canceled() {
    return this.mCanceled;
  }

  static get PROGRESS() {
    return 'progress';
  }
  static get COMPLETE() {
    return 'complete';
  }
}


class Time {
  constructor() {
  }

  static get time(){
    return Time.mTime;
  }

  static get dt() {
    return Time.mDeltaTime;
  }

  static get scale() {
    return Time.mScale;
  }

  static set scale(value) {
    Debug.assert(value >= 0, 'Time.scale must be >= 0.');

    Time.mScale = value;
  }
}

/** @type {number} */
Time.mTime = 0;

/** @type {number} */
Time.mDeltaTime = 0;

/** @type {number} */
Time.mScale = 1;


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
   *
   * @return {void} Description
   */
  onUpdate(dt, t){
  }

  /**
   * onPostUpdate - Description
   *
   * @param {number} dt Description
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


class Viewport extends MessageDispatcher {
  /**
   * constructor - Description
   *
   * @param {HTMLElement} containerElement Description
   *
   * @return {void} Description
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
   * size - Description
   *
   * @return {Rectangle} Description
   */
  get size(){
    return this.mSize;
  }

  /**
   * nativeDOM - Description
   *
   * @return {Element} Description
   */
  get nativeDOM(){
    return this.mContainerElement;
  }

  // TODO: dispose, remove resize event
}

/**
 * Component - Description
 * @unrestricted
 * @extends MessageDispatcher
 */

class Component extends MessageDispatcher {
  /**
   * constructor - description
   *
   * @return {void}          description
   */
  constructor() {
    super();

    /** @type {number} */
    this.mId = ++GameObject.ID;

    /** @type {GameObject|null} */
    this.gameObject = null;

    /** @type {boolean} */
    this.mAdded = false;
  }

  /**
   * onAdded - description
   *
   * @param  {GameObject} gameObject description
   * @return {void}            description
   */
  onAdded(gameObject) {}

  /**
   * onRemoved - description
   *
   * @param  {GameObject} gameObject description
   * @return {void}            description
   */
  onRemoved(gameObject) {}

  /**
   * onFixedUpdate - description
   *
   * @param  {number} dt description
   * @return {void}    description
   */
  onFixedUpdate(dt) {}

  /**
   * onUpdate - description
   *
   * @param  {number} dt description
   * @return {void}    description
   */
  onUpdate(dt) {}

  /**
   * onUpdate - description
   *
   * @param  {number} dt description
   * @return {void}    description
   */
  onPostUpdate(dt) {}

  // TODO: finish
  dispose() {}

  // TODO: finish
  removeFromParent() {
    if (this.gameObject === null)
      return;

    this.gameObject.removeComponent(this);
  }
}


/** @type {number}
 * @nocollapse
 */
Component.ID = 0;

/**
 * GameObject - Base class for all black game objects.
 * @unrestricted
 * @extends MessageDispatcher
 */

class GameObject extends MessageDispatcher {
  constructor() {
    super();

    /** @type {number} */
    this.mId = ++GameObject.ID;

    /** @type {string|null} */
    this.mName = null;

    /** @type {Array<Component>} */
    this.mComponents = [];

    /** @type {Array<GameObject>} */
    this.mChildren = [];

    /** @type {number} */
    this.mX = 0;

    /** @type {number} */
    this.mY = 0;

    /** @type {number} */
    this.mScaleX = 1;

    /** @type {number} */
    this.mScaleY = 1;

    /** @type {number} */
    this.mPivotX = 0;

    /** @type {number} */
    this.mPivotY = 0;

    /** @type {number} */
    this.mRotation = 0;

    /** @type {Rectangle} */
    this.mBounds = null;

    /** @type {Matrix} */
    this.mLocalTransform = new Matrix();

    /** @type {Matrix} */
    this.mWorldTransform = new Matrix();

    /** @type {DirtyFlag} */
    this.mDirty = DirtyFlag.DIRTY;

    /** @type {GameObject} */
    this.mParent = null;

    /** @type {string|null} */
    this.mTag = null;

    /** @type {number} */
    this.mIndex = 0;

    /** @type {boolean} */
    this.mAdded = false;
  }

  /**
   * id - Unique object id.
   *
   * @returns {number} Unique object id.
   */
  get id() {
    return this.mId;
  }

  /**
   * onAdded - This method called each time object added to stage.
   *
   * @return {void}
   */
  onAdded() { }

  /**
   * onRemoved - Called when object is removed from stage.
   *
   * @return {void}
   */
  onRemoved() {}


  /**
   * add - Sugar method for adding child GameObjects or Components.
   *
   * @param {...GameObject|...Component} gameObjectsAndOrComponents A GameObject or Component to add.
   *
   * @return {Array<GameObject|Component>} The passed GameObject or Component.
   */
  add(...gameObjectsAndOrComponents) {
    for (let i = 0; i < gameObjectsAndOrComponents.length; i++) {
      let gooc = gameObjectsAndOrComponents[i];

      if (gooc instanceof GameObject)
        this.addChild(/* @type {!GameObject} */ (gooc));
      else
        this.addComponent(/* @type {!Component} */ (gooc));
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
    this.mChildren.splice(index, 1, child);

    child.removeFromParent();
    child.__setParent(this);

    if (this.root !== null)
      Black.instance.onChildrenAdded(child);

    return child;
  }

  /**
   * @protected
   * @param {GameObject} value Description
   *
   * @return {boolean} Description
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
   * setChildIndex - Sets the index (layer) of the specified GameObject to the specified index (layer).
   *
   * @param {GameObject} child The GameObject instance to change index for.
   * @param {number} index Desired index.
   *
   * @returns {GameObject} The GameObject instance that you pass in the child parameter.
   */
  setChildIndex(child, index) {
    let ix = this.mChildren.indexOf(child);

    if (ix < 0)
      throw new Error('Child is not a child of this object.');

    if (ix === index)
      return child;

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
   * @return {void} Description
   */
  removeFromParent(dispose = false) {
    if (this.mParent)
      this.mParent.removeChild(this);

    if (dispose)
      this.dispose();

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
  removeChild(child, dispose) {
    let ix = this.mChildren.indexOf(child);

    if (ix < 0)
      return null;

    return this.removeChildAt(ix);
  }


  /**
   * getChildByName
   *
   * @param {string} name
   *
   * @return {GameObject|null}
   */
  getChildByName(name) {
    for (var i = 0; i < this.mChildren.length; i++) {
      if (this.mChildren[i].name === name)
        return this.mChildren[i];
    }

    return null;
  }

  /**
   * removeChildAt - Removes GameObjects instance from specified index.
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

    return child;
  }

  /**
   * getChildAt - Returns GameObject at specified index.
   *
   * @param {number} index The index of child GameObject.
   *
   * @return {GameObject} The GameObject at specified index.
   */
  getChildAt(index) {
    return this.mChildren[index];
  }

  /**
   * addComponent - Adds Component instance to the end of the list,
   *
   * @param  {Component} instances Component instance or instances.
   * @return {Component} The Component instance you pass in the instances parameter.
   */
  addComponent(component) {
    let instance = component;

    if (instance.gameObject)
      throw new Error('Component cannot be added to two game objects at the same time.');

    this.mComponents.push(instance);
    instance.gameObject = this;

    if (this.root !== null)
      Black.instance.onComponentAdded(this, instance);

    return instance;
  }

  /**
   * removeComponent - Description
   *
   * @param {Component} instance Description
   *
   * @return {Component|null} Description
   */
  removeComponent(instance) {
    if (!instance)
      return null;

    let index = this.mComponents.indexOf(instance);
    if (index > -1)
      this.mComponents.splice(index, 1);

    // detach game object after or before?
    instance.gameObject = null;
    instance.onRemoved(this);

    if (this.root !== null)
      Black.instance.onComponentRemoved(this, instance);

    return instance;
  }

  /**
   * getComponent
   *
   * @param {*} typeName
   *
   * @return {Component|null}
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
   * numComponenets - Returns number of component's
   *
   * @return {number}
   */
  get numComponenets() {
    return this.mComponents.length;
  }


  /**
   * getComponentAt - Retrives Component at given index.
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
   * localTransformation - Description
   *
   * @return {Matrix} Description
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
   * worldTransformation - returns cloned Matrix object which represents object orientation in world space.
   *
   * @return {Matrix}
   */
  get worldTransformation() {
    if (this.mDirty & DirtyFlag.WORLD) {
      this.mDirty ^= DirtyFlag.WORLD;

      if (this.mParent)
        this.mParent.worldTransformation.copyTo(this.mWorldTransform).append(this.localTransformation);
      else
        this.localTransformation.copyTo(this.mWorldTransform);
    }

    return this.mWorldTransform.clone();
  }

  /**
   * worldTransformationInversed - Description
   *
   * @return {Matrix} Description
   */
  get worldTransformationInversed() {
    // TODO: optimize, cache
    return this.worldTransformation.clone().invert();
  }

  /**
   * __fixedUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  __fixedUpdate(dt) {
    this.onFixedUpdate(dt);

    for (let k = 0; k < this.mComponents.length; k++) {
      let c = this.mComponents[k];
      c.gameObject = this;
      c.onFixedUpdate(dt);
    }

    for (let i = 0; i < this.mChildren.length; i++)
      this.mChildren[i].__fixedUpdate(dt);
  }

  /**
   * __update - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  __update(dt) {
    this.onUpdate(dt);

    for (let k = 0; k < this.mComponents.length; k++) {
      let c = this.mComponents[k];
      c.gameObject = this;
      c.onUpdate(dt);
    }

    for (let i = 0; i < this.mChildren.length; i++)
      this.mChildren[i].__update(dt);
  }

  /**
   * __update - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  __postUpdate(dt) {
    this.onPostUpdate(dt);

    for (let k = 0; k < this.mComponents.length; k++) {
      let c = this.mComponents[k];
      c.gameObject = this;
      c.onPostUpdate(dt);
    }

    for (let i = 0; i < this.mChildren.length; i++) {
      this.mChildren[i].__postUpdate(dt);
    }
  }

  /**
   * onFixedUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  onFixedUpdate(dt) {}

  /**
   * onUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  onUpdate(dt) {}

  /**
   * onUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  onPostUpdate(dt) {}

  /**
   * __render - Description
   *
   * @param {NullDriver} video           Description
   * @param {number} time            Description
   * @param {number} parentAlpha     Description
   * @param {string} parentBlendMode Description
   *
   * @return {void} Description
   */
  __render(video, time, parentAlpha, parentBlendMode) {
    this.onRender(video, time);

    let child = null;
    for (let i = 0; i < this.mChildren.length; i++) {
      child = this.mChildren[i];
      child.__render(video, time, parentAlpha, parentBlendMode);
    }
  }

  /**
   * onRender - Description
   *
   * @param {NullDriver} video Description
   * @param {number} time  Description
   *
   * @return {void} Description
   */
  onRender(video, time) {}

  /**
   * onGetLocalBounds - Override this method if you need to specify GameObject size. Should be always be a local coordinates.
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
   * localToGlobal - Description
   *
   * @param {Vector} localPoint       Description
   * @param {Vector|null} [outVector=null] Description
   *
   * @return {Vector} Description
   */
  localToGlobal(localPoint, outVector = null) {
    return this.worldTransformation.transformVector(localPoint, outVector);
  }

  /**
   * globalToLocal - Description
   *
   * @param {Vector} localPoint       Description
   * @param {Vector|null} [outVector=null] Description
   *
   * @return {Vector} Description
   */
  globalToLocal(globalPoint, outVector = null) {
    return this.worldTransformationInversed.transformVector(globalPoint, outVector);
  }

  /*:--- PROPERTIES ---:*/

  /**
   * numChildren - Description
   *
   * @return {number} Description
   */
  get numChildren() {
    return this.mChildren.length;
  }

  /**
   * name - Description
   *
   * @return {string|null} Description
   */
  get name() {
    return this.mName;
  }

  /**
   * name - Description
   *
   * @param {string|null} value Description
   *
   * @return {void} Description
   */
  set name(value) {
    this.mName = value;
  }

  /**
   * x - Gets the x coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
   *
   * @return {number} Description
   */
  get x() {
    return this.mX;
  }

  /**
   * x - Sets the x coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set x(value) {
    if (this.mX == value)
      return;

    this.mX = value;
    this.setTransformDirty();
  }

  /**
   * y - Gets the y coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
   *
   * @return {number} Description
   */
  get y() {
    return this.mY;
  }

  /**
   * y - Sets the y coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set y(value) {
    if (this.mY == value)
      return;

    this.mY = value;
    this.setTransformDirty();
  }

  /**
   * pivotX - Description
   * @export
   * @return {number} Description
   */
  get pivotX() {
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
  set pivotX(value) {
    if (this.mPivotX == value)
      return;

    this.mPivotX = value;
    this.setTransformDirty();
  }

  /**
   * pivotY - Description
   *
   * @return {number} Description
   */
  get pivotY() {
    return this.mPivotY;
  }

  /**
   * pivotY - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set pivotY(value) {
    if (this.mPivotY == value)
      return;

    this.mPivotY = value;
    this.setTransformDirty();
  }

  /**
   * alignPivot
   *
   * @param {number}  [px=0.5]
   * @param {number}  [py=0.5]
   * @param {boolean} [includeChildren=true]
   *
   * @return {GameObject}
   */
  alignPivot(ax = 0.5, ay = 0.5, includeChildren = true) {
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
  get scaleX() {
    return this.mScaleX;
  }

  /**
   * scaleX - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set scaleX(value) {
    if (this.mScaleX == value)
      return;

    this.mScaleX = value;
    this.setTransformDirty();
  }

  /**
   * scaleY - Description
   *
   * @return {number} Description
   */
  get scaleY() {
    return this.mScaleY;
  }

  /**
   * scaleY - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set scaleY(value) {
    if (this.mScaleY == value)
      return;

    this.mScaleY = value;
    this.setTransformDirty();
  }

  /**
   * rotation - returns current rotation
   *
   * @return {number} Description
   */
  get rotation() {
    return this.mRotation;
  }

  /**
   * rotation - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set rotation(value) {
    if (this.mRotation == value)
      return;

    this.mRotation = value;
    this.setTransformDirty();
  }

  /**
   * parent - Description
   *
   * @return {GameObject} Description
   */
  get parent() {
    return this.mParent;
  }

  /**
   * root - Description
   *
   * @return {GameObject|null} Description
   */
  get root() {
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

  /**
   * depth - Description
   *
   * @return {number} Description
   */
  get depth() {
    if (this.mParent)
      return this.mParent.depth + 1;
    else
      return 0;
  }

  /**
   * index - Description
   *
   * @return {number} Description
   */
  get index() {
    return this.mIndex;
  }

  /**
   * width - Description
   *
   * @return {number} Description
   */
  get width() {
    return this.getBounds(this.mParent).width;
  }

  /**
   * width - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set width(value) {
    this.scaleX = 1;
    const currentWidth = this.width;

    if (currentWidth != 0.0)
      this.scaleX = value / currentWidth;
  }

  /**
   * height - Description
   *
   * @return {number} Description
   */
  get height() {
    return this.getBounds(this.mParent).height;
  }

  /**
   * height - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set height(value) {
    this.scaleY = 1;
    const currentHeight = this.height;

    if (currentHeight != 0)
      this.scaleY = value / currentHeight;
  }


  /**
   * localWidth - returns height in local space without children.
   *
   * @return {number}
   */
  get localWidth() {
    return this.getBounds(this, false).width;
  }


  /**
   * localHeight - returns height in local space without children.
   *
   * @return {number}
   */
  get localHeight() {
    return this.getBounds(this, false).height;
  }

  // TODO: precache
  /**
   * path - Description
   *
   * @return {string} Description
   */
  get path() {
    if (this.mParent !== null)
      return this.mParent.path + '/' + this.mName;

    return this.mName;
  }

  /**
   * tag - Description
   *
   * @return {string|null} Description
   */
  get tag() {
    return this.mTag;
  }

  /**
   * tag - Description
   *
   * @param {string|null} value Description
   *
   * @return {void} Description
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
   * co - Starts coroutine.
   *
   * @param {Function} gen
   * @param {*=} [ctx=null]
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
   * @param {number} [seconds=1]
   *
   * @return {function(*):*}
   */
  wait(seconds = 1) {
    return cb => setTimeout(cb.bind(this, seconds * 1000), seconds * 1000);
  }


  /**
   * waitMessage - Waits for a speceific message
   *
   * @param {string} message The name of the message to wait for
   *
   * @return {function(?):?} Description
   */
  waitMessage(message) {
    return cb => this.on(message, cb.bind(this));
  }


  /**
   * setDirty
   *
   * @param {DirtyFlag} flag
   * @param {boolean} [includeChildren=true] Description
   *
   * @return {void}
   */
  setDirty(flag, includeChildren = true) {
    if (includeChildren) {
      GameObject.forEach(this, x=> {
        x.mDirty |= flag;
      });
    } else {
      this.mDirty |= flag;
    }
  }

  setTransformDirty() {
    this.setDirty(DirtyFlag.LOCAL, false);
    this.setDirty(DirtyFlag.WORLD, true);
  }

  /**
   * dispose
   *
   * @return {void}
   */
  dispose() {
  }

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
   * intersects - Description
   *
   * @param {GameObject} gameObject Description
   * @param {Vector} point      Description
   *
   * @return {boolean} Description
   */
  static intersects(gameObject, point) {
    let tmpVector = new Vector();
    let inv = gameObject.worldTransformation.invert();

    inv.transformVector(point, tmpVector);

    let rect = gameObject.getBounds(gameObject, false);
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
   * intersectsWith - Description
   *
   * @param {GameObject} gameObject Description
   * @param {Vector} point      Description
   *
   * @return {GameObject|null} returns object or null
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
  static findWithTag(tag) {
    if (Black.instance.mTagCache.hasOwnProperty(tag) === false)
      return null;

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
  static findComponents(gameObject, type) {
    Debug.assert(gameObject !== null, 'gameObject cannot be null.');
    Debug.assert(type !== null, 'type cannot be null.');

    /** @type {Array<Component>} */
    let list = [];

    /** @type {function(GameObject, function(new:Component)):void} */
    let f = function(gameObject, type) {
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
   * forEach - Runs action accross all object mathing the name.
   *
   * @param {GameObject} node   Description
   * @param {function(GameObject)} action Description
   *
   * @return {void} Description
   */
  static forEach(node, action) {
    if (node == null)
      node = Black.instance.root;

    action(node);

    for (let i = 0; i < node.numChildren; i++)
      GameObject.forEach(node.getChildAt(i), action);
  }


  /**
   * find - Finds object by its name.
   *
   * @param {string} name Description
   * @param {GameObject} node Description
   *
   * @return {GameObject} Description
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
}

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

// TODO:
// [_] Do not handle is loaded or not.
// Texture shall not be responsible for loading itself.
// We have TextureAsset for it.
// native size - always the size of physical texture
// source size - the original size of a texture to
//


class Texture {
  /**
   * @param  {Image} nativeTexture description
   * @param  {Rectangle=} region = undefined description
   * @param  {Rectangle=} untrimmedRect = undefined description
   */
  constructor(nativeTexture, region, untrimmedRect) {
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
      this.mRegion = /** @type {Rectangle} */ (region);
      this.mIsSubtexture = true;
    }

    /** @type {boolean} */
    this.mTrimmed = untrimmedRect !== undefined;

    if (this.mTrimmed === false)
      untrimmedRect = new Rectangle(0, 0, this.mRegion.width, this.mRegion.height);

    /** @type {Rectangle} */
    this.mUntrimmedRect = /** @type {Rectangle} */ (untrimmedRect);

    /** @type {boolean} */
    this.mIsLoaded = true;
  }

  /**
   * id - Description
   *
   * @return {number} Description
   */
  get id() {
    return this.mId;
  }

  /**
   * isTrimmed - Description
   *
   * @return {boolean} Description
   */
  get isTrimmed() {
    return this.mTrimmed;
  }

  /**
   * isSubTexture - Description
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
   * untrimmedRect - Description
   *
   * @return {Rectangle} Description
   */
  get untrimmedRect() {
    return this.mUntrimmedRect;
  }

  /**
   * width - Description
   *
   * @return {number} Description
   */
  get width() {
    if (this.mRegion)
      return this.mRegion.width;

    return this.mTexture.naturalWidth;
  }

  /**
   * height - Description
   *
   * @return {number} Description
   */
  get height() {
    if (this.mRegion)
      return this.mRegion.height;

    return this.mTexture.naturalHeight;
  }

  /**
   * region - Description
   *
   * @return {Rectangle} Description
   */
  get region() {
    return this.mRegion;
  }

  /**
   * native - Description
   *
   * @return {Image} Description
   */
  get native() {
    return this.mTexture;
  }

  /**
   * isLoaded - Description
   *
   * @return {boolean} Description
   */
  get isLoaded() {
    return this.mIsLoaded;
  }

  /**
   * type - Description
   *
   * @return {string} Description
   */
  get type() {
    return 'Texture';
  }

  /**
   * baseType - Description
   *
   * @return {string} Description
   */
  get baseType() {
    return 'Texture';
  }

  /**
   * dispose - Description
   *
   * @return {void} Description
   */
  dispose() {
    this.mTexture = null;
  }

  /**
   * fromBase64String - Description
   *
   * @param {string} string Description
   *
   * @return {Texture} Description
   */
  static fromBase64String(string) {
    let imgElement = new Image();
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
  static fromCanvasAsImage(canvas, type = 'image/png', quality = 1) {
    let imgElement = new Image();
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
  static fromCanvas(canvas) {
    return Black.instance.video.getTextureFromCanvas(canvas);
  }
}

/** @type {number}
 * @nocollapse
 */
Texture.__ID = 0;

/** @type {Image|null}
 * @nocollapse
 */
Texture.MISSING_IMAGE_CACHE = null;


class AtlasTexture extends Texture {
  /**
   * constructor - Creates an Texture Atlas
   *
   * @param {Texture} texture A base texture object.
   * @param {{meta: *, frames: *}} jsonObject
   *
   * @return {void}
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
   * __parseJson
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
   * getTexture - Returns the textures by a given name.
   *
   * @param {string} name
   *
   * @return {Texture} The Texture or null;
   */
  getTexture(name) {
    /** @type {Texture} */
    let t = this.mSubTextures[name];
    if (t === undefined)
      console.warn('Texture \'%s\' was not found in cache.', name);

    return /** @type {Texture} */ (t);
  }

  /**
   * getTextures - Returns list of Textures.
   *
   * @param {string|null} [nameMask=null] The mask to filter by.
   * @param {Array<Texture>|null} outTextures
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

    names.sort(this.__naturalComparer);

    for (let i = 0; i < names.length; i++)
      out.push(this.mSubTextures[names[i]]);

    return out;
  }

  /**
   * @param {*} a
   * @param {*} b
   *
   * @return {number}
   */
  __naturalComparer(a, b) {
    const NUMBER_GROUPS = /(-?\d*\.?\d+)/g;
    let aa = String(a).split(NUMBER_GROUPS);
    let bb = String(b).split(NUMBER_GROUPS);
    let min = Math.min(aa.length, bb.length);

    for (let i = 0; i < min; i++) {
      let x = parseFloat(aa[i]) || aa[i].toLowerCase();
      let y = parseFloat(bb[i]) || bb[i].toLowerCase();

      if (x < y)
        return -1;
      else if (x > y)
        return 1;
    }

    return 0;
  };

  //dispose() {}
}

// TODO: handle errors
// TODO: v2: parallel loading?
//
//

class Asset extends MessageDispatcher {
  /**
   * @param  {string} name description
   * @param  {string} url  description
   */
  constructor(name, url) {
    super();

    /** @type {string} */
    this.mName = name;

    /** @type {string} */
    this.mUrl = url;

    /** @type {*|null} */
    this.mData = null;

    /** @type {boolean} */
    this.mIsLoaded = false;

    /** @type {string|undefined} */
    this.mMimeType = undefined;

    /** @type {string} */
    this.mResponseType = '';

    /** @type {string} */
    this.mExtension = this.getExtension(url);

    /** @type {XMLHttpRequest|null} */
    this.mRequest = null;
  }

  /**
   * load
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
   * onLoaded
   *
   * @return {void}
   */
  onLoaded() {
    this.mIsLoaded = true;
    this.post('complete');
  }

  /**
   * name
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }

  /**
   * data
   *
   * @return {*}
   */
  get data() {
    return this.mData;
  }

  /**
   * isLoaded
   *
   * @return {boolean}
   */
  get isLoaded() {
    return this.mIsLoaded;
  }

  // TODO: finish
  dispose() {}

  /**
   * getExtension
   *
   * @param {string} url
   *
   * @return {string}
   */
  getExtension(url) {
    if (url.indexOf(".") === -1)
      return '';

    return url.substring(url.indexOf(".")).toLowerCase();
  }
}


class TextureAsset extends Asset {
  /**
   * constructor - Description
   *
   * @param {string} name Description
   * @param {string} url  Description
   *
   * @return {void} Description
   */
  constructor(name, url) {
    super(name, url);

    /** @type {Image} */
    this.mImageElement = new Image();
  }

  /**
   * onLoaded - Description
   *
   * @return {void} Description
   */
  onLoaded() {
    //console.log('TextureAsset: \'%s\' loaded', this.mName);

    this.mData = new Texture(this.mImageElement);

    super.onLoaded();
  }

  /**
   * load - Description
   *
   * @return {void} Description
   */
  load() {
    this.mImageElement.src = this.mUrl;
    this.mImageElement.onload = () => {
      this.onLoaded();
    }
  }

  /**
   * type - Description
   *
   * @return {string} Description
   */
  get type() {
    return "TextureAsset";
  }
}


class JSONAsset extends Asset {
  /**
   * constructor
   *
   * @param {string} name
   * @param {string} url
   *
   * @return {void}
   */
  constructor(name, url) {
    super(name, url);
    this.mimeType = "application/json";
  }

  /**
   * onLoaded
   *
   * @return {void}
   */
  onLoaded(){
    this.mData = JSON.parse(/** @type {string} */ (this.mRequest.responseText) );
    super.onLoaded();
  }
}


class AtlasTextureAsset extends Asset {
  /**
   * constructor
   *
   * @param {string} name
   * @param {string} imageUrl
   * @param {string} dataUrl
   *
   * @return {void}
   */
  constructor(name, imageUrl, dataUrl) {
    super(name, imageUrl);

    /** @type {Image} */
    this.mImageElement = new Image();

    /** @type {JSONAsset} */
    this.dataAsset = new JSONAsset(name, dataUrl);
    this.dataAsset.on('complete', this.onJsonLoaded, this);
  }

  onJsonLoaded() {
    this.mImageElement.src = this.mUrl;
    this.mImageElement.onload = () => {
      this.onLoaded();
    }
  }

  /**
   * onLoaded
   *
   * @return {void}
   */
  onLoaded() {
    this.mData = new AtlasTexture(new Texture(this.mImageElement), /** @type {{meta: *, frames: *}} */ (this.dataAsset.data));

    super.onLoaded();
  }

  /**
   * load
   * @override
   *
   * @return {void}
   */
  load() {
    this.dataAsset.load();
  }
}

/*
TODO:
  1. propper error handling
  2. max parallel downloads
  3. check for name dublicates
  4. load progress
*/


class AssetManager extends MessageDispatcher {
  constructor() {
    super();

    /** @type {string} */
    this.mDefaultPath = '';

    /** @type {number} */
    this.mTotalLoaded = 0;

    /** @type {boolean} */
    this.mIsAllLoaded = false;

    /** @type {number} */
    this.mLoadingProgress = 0;

    /** @type {Array<Asset>} */
    this.mQueue = [];

    /** @dict */
    this.mTextures = {};

    /** @dict */
    this.mAtlases = {};

    /** @dict */
    this.mJsons = {};
  }

  enqueueImage(name, url) {
    this.mQueue.push(new TextureAsset(name, this.mDefaultPath + url));
  }

  enqueueAtlas(name, imageUrl, dataUrl) {
    this.mQueue.push(new AtlasTextureAsset(name, this.mDefaultPath + imageUrl, this.mDefaultPath + dataUrl));
  }

  enqueueJson(name, url) {
    this.mQueue.push(new JSONAsset(name, this.mDefaultPath + url));
  }

  /**
   * loadQueue
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
   * onAssetLoaded
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
    else
      console.error('Unable to handle asset type.', item);

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

    return null;
  }


  /**
   * @param {string} name
   *
   * @return {AtlasTexture}
   */
  getAtlas(name) {
    return this.mAtlases[name];
  }

  /**
   * defaultPath
   *
   * @return {string}
   */
  get defaultPath() {
    return this.mDefaultPath;
  }

  /**
   * defaultPath
   *
   * @param {string} value
   *
   * @return {void}
   */
  set defaultPath(value) {
    this.mDefaultPath = value;
  }

  /**
   * isAllLoaded
   *
   * @return {boolean}
   */
  get isAllLoaded() {
    return this.mIsAllLoaded;
  }
}

/** @type {AssetManager} */
AssetManager.default = new AssetManager();

/**
 * A blend mode enum.
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


class NullDriver {
  /**
   * @param  {HTMLElement} containerElement description
   * @param  {number} width            description
   * @param  {number} height           description
   */
  constructor(containerElement, width, height) {
    /** @type {string} */
    this.mGlobalBlendMode = 'auto';

    /** @type {HTMLElement} */
    this.mContainerElement = /** @type {HTMLElement} */ (containerElement);

    /** @type {number} */
    this.mClientWidth = width;

    /** @type {number} */
    this.mClientHeight = height;

    /** @type {Matrix} */
    this.mTransform = new Matrix();

    /** @type {number} */
    this.mGlobalAlpha = 1;

    /** @type {HTMLElement} */
    this.mMeasureElement = /** @type {HTMLElement} */ (document.createElement('span'));
    this.mMeasureElement.style.position = 'absolute';
    this.mContainerElement.appendChild(this.mMeasureElement);

    Black.instance.viewport.on('resize', this.__onResize, this);
  }

  __onResize(msg, rect) {
    let w = this.mContainerElement.clientWidth;
    let h = this.mContainerElement.clientHeight;

    this.mClientWidth = w;
    this.mClientHeight = h;
  }

  /**
   * start - Description
   *
   * @return {void} Description
   */
  start() {}

  beginFrame() {}

  endFrame() {}


  /**
   * getTextureFromCanvas - Description
   *
   * @param {HTMLElement} canvas Description
   *
   * @return {Texture|null} Description
   */
  getTextureFromCanvas(canvas){
    return null;
  }

  /**
   * setTransform - Description
   *
   * @param {Matrix} m Description
   *
   * @return {void} Description
   */
  setTransform(m) {
    this.mTransform = m;
  }

  /**
   * globalAlpha - Description
   *
   * @return {number} Description
   */
  get globalAlpha() {
    return this.mGlobalAlpha;
  }

  /**
   * globalAlpha - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set globalAlpha(value) {
    this.mGlobalAlpha = value;
  }

  /**
   * mGlobalBlendMode - Description
   *
   * @return {string} Description
   */
  get globalBlendMode() {
    return this.mGlobalBlendMode;
  }

  /**
   * globalBlendMode - Description
   *
   * @param {string} value Description
   *
   * @return {void} Description
   */
  set globalBlendMode(value) {
    this.mGlobalBlendMode = value;
  }

  /**
   * drawImage - description
   *
   * @param  {Texture} texture description
   */
  drawImage(texture) {}

  /**
   * drawText
   *
   * @param {string} text
   * @param {TextInfo} style
   * @param {Rectangle} bounds
   * @param {number} textWidth
   * @param {number} textHeight
   *
   * @return {void}
   */
  drawText(text, style, bounds, textWidth, textHeight) {}

  clear() {}

  /**
   * save - Description
   *
   * @param {GameObject|null} gameObject Used for internal binding.
   *
   * @return {void} Description
   */
  save(gameObject) {}

  restore() {}

  hexColorToString(color) {
    let parsedColor = color.toString(16);
    return '#000000'.substring(0, 7 - parsedColor.length) + parsedColor;
  }

  /**
   * measureText - Description
   *
   * @param {string} text  Description
   * @param {TextInfo} style Description
   *
   * @return {Vector} Description
   */
  measureText(text, style) {
    let el = this.mMeasureElement;
    el.innerHTML = text;
    el.style.whiteSpace = 'pre';
    el.style.fontSize = style.size + 'px';
    el.style.fontFamily = style.name;
    el.style.fontStyle = style.style;
    el.style.fontWeight = style.weight;

    let v = new Vector(el.offsetWidth + style.strokeThickness, el.offsetHeight + style.strokeThickness);
    el.innerHTML = '';

    return v;
  }
}


class CanvasDriver extends NullDriver {
  /**
   * @param  {HTMLElement} containerElement description
   * @param  {number} width            description
   * @param  {number} height           description
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    /** @type {CanvasRenderingContext2D|null} */
    this.mCtx = null;

    this.mGlobalAlpha = 1;
    this.mGlobalBlendMode = BlendMode.NORMAL;

    this.__createCanvas();
  }

  /**
   * __createCanvas
   *
   * @return {void}
   */
  __createCanvas() {
    let cvs = /** @type {HTMLCanvasElement} */ (document.createElement("canvas"));
    cvs.id = "canvas";
    this.mContainerElement.appendChild(cvs);

    this.mCtx = /** @type {CanvasRenderingContext2D} */ (cvs.getContext('2d'));
    this.mCtx.canvas.width = this.mClientWidth;
    this.mCtx.canvas.height = this.mClientHeight;
  }

  __onResize(msg, rect) {
    super.__onResize(msg, rect);

    this.mCtx.canvas.width = this.mClientWidth;
    this.mCtx.canvas.height = this.mClientHeight;
  }

  /**
   * setTransform
   *
   * @param {Matrix} m
   *
   * @return {void}
   */
  setTransform(m) {
    super.setTransform(m);

    let v = m.value;
    this.mCtx.setTransform(v[0], v[1], v[2], v[3], v[4], v[5]);
  }


  /**
   * globalAlpha
   *
   * @param {number} value
   *
   * @return {void}
   */
  set globalAlpha(value) {
    this.mGlobalAlpha = value;
    this.mCtx.globalAlpha = value;
  }


  /**
   * globalBlendMode
   *
   * @param {string} blendMode
   *
   * @return {void}
   */
  set globalBlendMode(blendMode) {
    if (blendMode === BlendMode.AUTO)
      return;

    this.mGlobalBlendMode = blendMode;
    this.mCtx.globalCompositeOperation = blendMode;
  }

  /**
   * drawImage
   *
   * @param {Texture} texture
   *
   * @return {void}
   */
  drawImage(texture) {
    let w = texture.width;
    let h = texture.height;
    let ox = texture.untrimmedRect.x;
    let oy = texture.untrimmedRect.y;

    this.mCtx.drawImage(texture.native, texture.region.x, texture.region.y, w, h, ox, oy, w, h);
  }

  /**
   * drawText
   *
   * @override
   * @param {string} text
   * @param {TextInfo} style
   * @param {Rectangle} bounds
   * @param {number} textWidth
   * @param {number} textHeight
   *
   * @return {void}
   */
  drawText(text, style, bounds, textWidth, textHeight) {
    this.mCtx.beginPath();
    this.mCtx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
    this.mCtx.clip();

    this.mCtx.font = `${style.style} ${style.weight} ${style.size}px "${style.name}"`;
    this.mCtx.fillStyle = this.hexColorToString(style.color);

    let x = 0;
    if (style.align === 'center')
      x = (bounds.width * 0.5) - textWidth * 0.5;

    else if (style.align === 'right')
      x = bounds.width - textWidth;

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
   *
   * @return {void}
   */
  clear() {
    this.mCtx.clearRect(0, 0, this.mCtx.canvas.width, this.mCtx.canvas.height);
  }

  /**
   * beginFrame
   *
   * @return {void}
   */
  beginFrame() {
    super.beginFrame();

    this.clear();
    this.mCtx.save();
  }

  /**
   * endFrame
   *
   * @return {void}
   */
  endFrame() {
    super.endFrame();

    this.mCtx.restore();
  }

  /**
   * getTextureFromCanvas - Description
   *
   * @param {HTMLElement} canvas Description
   *
   * @return {Texture|null} Description
   */
  getTextureFromCanvas(canvas) {
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
  save(gameObject) {
    this.mCtx.save();
  }

  /**
   * restore
   *
   * @return {void}
   */
  restore() {
    this.mCtx.restore();
  }
}


class DOMDriver extends NullDriver {
  /**
   * @param  {HTMLElement} containerElement description
   * @param  {number} width            description
   * @param  {number} height           description
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
  }

  /**
   * save - Description
   *
   * @override
   * @param {GameObject|null} gameObject Used for internal binding.
   *
   * @return {void} Description
   */
  save(gameObject) {
    this.mCurrentObject = gameObject;
  }

  /**
   * __initCSS - description
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
   * beginFrame - description
   *
   * @return {void}  description
   */
  beginFrame() {
    this.mCounter = 0;
  }

  /**
   * endFrame - description
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
   * getTextureFromCanvas - Description
   *
   * @param {HTMLElement} canvas Description
   *
   * @return {Texture|null} Description
   */
  getTextureFromCanvas(canvas) {
    return Texture.fromCanvasAsImage(canvas);
  }

  /**
   * drawImage - description
   *
   * @param  {Texture} texture description
   * @return {void}         description
   */
  drawImage(texture) {
    /** @type {Matrix|null} */
    let oldTransform = this.mTransform;

    if (texture.untrimmedRect.x !== 0 || texture.untrimmedRect.y !== 0) {
      Matrix.__cache.set(1, 0, 0, 1, texture.untrimmedRect.x, texture.untrimmedRect.y);
      this.mTransform.append(Matrix.__cache);
    }

    let el = this.__popElement(this.mPixelated ? 'sprite-p' : 'sprite');
    this.__updateElementCommon(el);
    this.__updateImageElement(el, texture);

    this.mTransform = oldTransform;
  }

  /**
   * drawText - description
   *
   * @override
   * @param {string} text
   * @param {TextInfo} style
   * @param {Rectangle} bounds
   * @param {number} textWidth
   * @param {number} textHeight
   *
   * @return {void}                      description
   */
  drawText(text, style, bounds, textWidth, textHeight) {
    let el = this.__popElement('text');
    this.__updateElementCommon(el);

    // TODO: check this type. review the code.
    this.__updateTextElement( /** @type {HTMLElement} */ (el), text, style, bounds);
  }

  /**
   * __popElement - Description
   *
   * @param {string} className Description
   *
   * @return {Element} Description
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
   * __updateElementCommon - Description
   *
   * @param {Element} el Description
   *
   * @return {void} Description
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
   * __updateImageElement - description
   *
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
   * __updateTextElement - Description
   *
   * @param {HTMLElement} el     Description
   * @param {string} text   Description
   * @param {TextInfo} style  Description
   * @param {Rectangle} bounds Description
   *
   * @return {void} Description
   */
  __updateTextElement(el, text, style, bounds) {
    el.innerHTML = text;
    el.style.fontSize = style.size + 'px';

    if (el.style.width !== bounds.width + 'px')
      el.style.width = bounds.width + 'px';

    if (el.style.height !== bounds.height + 'px')
      el.style.height = bounds.height + 'px';

    if (el.style.fontFamily !== style.name)
      el.style.fontFamily = style.name;

    let color = this.hexColorToString(style.color);

    if (el.style.color != color)
      el.style.color = color;

    if (el.style.fontStyle !== style.style)
      el.style.fontStyle = style.style;

    if (el.style.fontWeight != style.weight)
      el.style.fontWeight = style.weight;

    if (el.style.textAlign !== style.align)
      el.style.textAlign = style.align;

    if (style.strokeThickness > 0) {
      let strokeColor = this.hexColorToString(style.strokeColor);

      if (el.style.webkitTextStrokeColor != strokeColor)
        el.style.webkitTextStrokeColor = strokeColor;

      if (el.style.webkitTextStrokeWidth != style.strokeThickness + 'px') {
        el.style.webkitTextStrokeWidth = style.strokeThickness + 'px';
      }
    }

    if (el.style.backgroundImage !== 'none')
      el.style.backgroundImage = 'none';
  }
}


class DisplayObject extends GameObject {
  constructor() {
    super();

    /** @type {number} */
    this.mAlpha = 1;

    /** @type {string} */
    this.blendMode = BlendMode.AUTO;

    /** @type {boolean} */
    this.mVisible = true;
  }

  /**
   * __render - Description
   *
   * @param {NullDriver} video           Description
   * @param {number} time            Description
   * @param {number} parentAlpha     Description
   * @param {string} parentBlendMode Description
   *
   * @return {void} Description
   */
  __render(video, time, parentAlpha, parentBlendMode) {
    if (this.mVisible === false)
      return;

    this.onRender(video, time);

    let child = null;
    for (var i = 0; i < this.mChildren.length; i++) {
      child = this.mChildren[i];
      child.__render(video, time, parentAlpha, parentBlendMode);
    }
  }

  /**
   * alpha - Description
   *
   * @return {number} Description
   */
  get alpha() {
    return this.mAlpha;
  }

  /**
   * alpha - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set alpha(value) {
    this.mAlpha = Math.clamp(value, 0, 1);
  }


  /**
   * visible - Description
   *
   * @return {boolean} Description
   */
  get visible() {
    return this.mVisible;
  }


  /**
   * visible - Description
   *
   * @param {boolean} value Description
   *
   * @return {void} Description
   */
  set visible(value) {
    this.mVisible = value;
  }
}


class TextInfo {
  /**
   * @param  {string=} name = 'sans-serif' description
   * @param  {number=} color = '0x000000' description
   * @param  {number=} size = '14' description
   * @param  {TextInfo.FontStyle=} style = 'normal' description
   * @param  {TextInfo.FontWeight=} weight = '400' description
   * @param  {TextInfo.FontAlign=} align = 'left' description
   * @param  {number=} strokeThickness = '0' description
   * @param  {number=} strokeColor = '0xffffff' description
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


class Sprite extends DisplayObject {

  /**
   * constructor - Creates a new Sprite object instance.
   *
   * @param {Texture|string|null} texture The Texture instance or null.
   */
  constructor(texture = null) {
    super();

    /**
     * @private
     * @type {Texture|null} */
    this.mTexture = null;

    if (texture !== null && texture.constructor === String)
      this.mTexture = AssetManager.default.getTexture(/** @type {string} */ (texture));
    else
      this.mTexture = /** @type {Texture} */ (texture);
  }

  /**
   * @override
   * @private
   * @param {NullDriver} video
   * @param {number} time
   * @param {number} parentAlpha
   * @param {string} parentBlendMode
   *
   * @return {void}
   */
  __render(video, time, parentAlpha, parentBlendMode) {
    if (this.mAlpha <= 0 || this.mVisible === false)
      return;

    let tmpBlendMode = BlendMode.AUTO;

    if (this.mTexture !== null) {
      video.save(this);
      video.setTransform(this.worldTransformation);
      video.globalAlpha = parentAlpha * this.mAlpha;
      video.globalBlendMode = tmpBlendMode = this.blendMode === BlendMode.AUTO ? parentBlendMode : this.blendMode;
      video.drawImage(this.mTexture);
      video.restore();
    }

    super.__render(video, time, parentAlpha * this.mAlpha, tmpBlendMode);
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
   * texture - Sets the Texture on this sprite.
   *
   * @param {Texture|null} texture Texture to apply on.
   *
   * @return {void}
   */
  set texture(texture) {
    if (this.mTexture === texture)
      return;

    this.mTexture = texture;
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


class TextField extends DisplayObject {
  /**
   * @param  {string=} text = ''            description
   * @param  {number=} size = 14        description
   * @param  {string=} name = "sans-serif" description
   * @param {TextInfo=} style
   */
  constructor(text = '', size = 14, name = 'sans-serif', style = undefined) {
    super();

    /** @private @type {string} */
    this.mText = text;

    /** @private @type {boolean} */
    this.mNeedInvalidate = true;

    /** @private @type {Rectangle} */
    this.mCacheBounds = new Rectangle();

    /** @private @type {number} */
    this.mFieldWidth = 0;

    /** @private @type {number} */
    this.mFieldHeight = 0;

    /** @private @type {number} */
    this.mTextWidth = 0;

    /** @private @type {number} */
    this.mTextHeight = 0;

    /** @private @type {TextInfo} */
    this.mStyle = style || new TextInfo();

    /** @private @type {string} */
    this.mStyle.name = name || style.name;

    /** @private @type {number} */
    this.mStyle.size = size || style.size;

    /** @public @type {boolean} */
    this.mAutoSize = true;

    this.__validate(this.mCacheBounds);
  }

  /**
   * __render - Description
   * @private @override
   * @param {NullDriver} video           Description
   * @param {number} time            Description
   * @param {number} parentAlpha     Description
   * @param {string} parentBlendMode Description
   *
   * @return {void} Description
   */
  __render(video, time, parentAlpha, parentBlendMode) {
    if (this.mAlpha <= 0 || this.mVisible === false)
      return;

    this.__validate(this.mCacheBounds);

    let tmpBlendMode = BlendMode.AUTO;

    video.save(this);
    video.setTransform(this.worldTransformation);
    video.globalAlpha = parentAlpha * this.mAlpha;
    video.globalBlendMode = tmpBlendMode = this.blendMode === BlendMode.AUTO ? parentBlendMode : this.blendMode;
    video.drawText(this.mText, this.mStyle, this.mCacheBounds, this.mTextWidth, this.mTextHeight);
    video.restore();

    super.__render(video, time, parentAlpha * this.mAlpha, tmpBlendMode);
  }

  /**
   * onGetLocalBounds - Description
   *
   * @protected @override
   * @param {Rectangle=} outRect Description
   *
   * @return {Rectangle} bounds in local space withoout taking care about transformation matrix
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();
    return this.__validate(outRect);
  }


  /**
   * __validate - Description
   *
   * @private
   * @param {Rectangle} outRect Description
   *
   * @return {Rectangle} bounds in local space withoout taking care about transformation matrix
   */
  __validate(outRect) {
    let strokeCorrection = 0 - this.mStyle.strokeThickness * 0.5;
    if (this.mNeedInvalidate === false)
      return outRect.set(strokeCorrection, strokeCorrection, this.mFieldWidth, this.mFieldHeight);

    let driver = Black.instance.video;
    let vSize = driver.measureText(this.mText, this.mStyle);
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
   * size - Description
   *
   * @public
   * @return {number} Description
   */
  get size() {
    return this.mStyle.size;
  }

  /**
   * size - Description
   *
   * @param {number} value Description
   * @public
   *
   * @return {void} Description
   */
  set size(value) {
    this.mStyle.size = value;
    this.mNeedInvalidate = true;
  }

  /**
   * font - Description
   *
   * @public
   * @return {string} Description
   */
  get font() {
      return this.mStyle.name;
    }
    /**
     * font - Description
     *
     * @param {string} value Description
     * @public
     *
     * @return {void} Description
     */

  set font(value) {
    this.mStyle.name = value;
    this.mNeedInvalidate = true;
  }

  /**
   * color - Description
   *
   * @public
   * @return {number} Description
   */
  get color() {
    return this.mStyle.color;
  }

  /**
   * color - Description
   *
   * @param {number} value Description
   * @public
   *
   * @return {void} Description
   */
  set color(value) {
    this.mStyle.color = value;
  }

  /**
   * style - Description
   *
   * @public
   * @return {TextInfo.FontStyle} Description
   */
  get style() {
    return this.mStyle.style;
  }

  /**
   * style - Description
   *
   * @param {TextInfo.FontStyle} value Description
   * @public
   *
   * @return {void} Description
   */
  set style(value) {
    this.mStyle.style = value;
    this.mNeedInvalidate = true;
  }

  /**
   * weight - Description
   *
   * @public
   * @return {TextInfo.FontWeight} Description
   */
  get weight() {
    return this.mStyle.weight;
  }

  /**
   * weight - Description
   *
   * @param {TextInfo.FontWeight} value Description
   * @public
   *
   * @return {void} Description
   */
  set weight(value) {
    this.mStyle.weight = value;
    this.mNeedInvalidate = true;
  }

  /**
   * align - Description
   *
   * @public
   * @return {TextInfo.FontAlign} Description
   */
  get align() {
    return this.mStyle.align;
  }

  /**
   * align - Description
   *
   * @param {TextInfo.FontAlign} value Description
   * @public
   *
   * @return {void} Description
   */
  set align(value) {
    this.mStyle.align = value;
  }

  /**
   * strokeColor - Description
   *
   * @public
   * @return {number} Description
   */
  get strokeColor() {
    return this.mStyle.strokeColor;
  }

  /**
   * strokeColor - Description
   *
   * @param {number} value Description
   * @public
   *
   * @return {void} Description
   */
  set strokeColor(value) {
    this.mStyle.strokeColor = value;
  }

  /**
   * strokeThickness - Description
   *
   * @public
   * @return {number} Description
   */
  get strokeThickness() {
    return this.mStyle.strokeThickness;
  }

  //noinspection JSAnnotator
  /**
   * strokeThickness - Description
   * @public
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set strokeThickness(value) {
    if (value === this.mStyle.strokeThickness)
      return;

    this.mStyle.strokeThickness = value;
    this.mNeedInvalidate = true;
  }

  /**
   * fieldWidth - Description
   *
   * @public
   * @return {number} Description
   */
  get fieldWidth() {
    return this.mFieldWidth;
  }

  /**
   * fieldWidth - Description
   *
   * @param {number} value Description
   * @public
   *
   * @return {void} Description
   */
  set fieldWidth(value) {
    if (this.mAutoSize || value === this.mFieldWidth)
      return;

    this.mFieldWidth = value;
    this.mNeedInvalidate = true;
  }

  /**
   * fieldHeight - Description
   *
   * @public
   * @return {number} Description
   */
  get fieldHeight() {
    return this.mFieldHeight;
  }


  /**
   * fieldHeight - Description
   *
   * @param {number} value Description
   * @public
   *
   * @return {void} Description
   */
  set fieldHeight(value) {
    if (this.mAutoSize || value === this.mFieldHeight)
      return;

    this.mFieldHeight = value;
    this.mNeedInvalidate = true;
  }

  /**
   * @public text - Description
   *
   * @return {string} Description
   */
  get text() {
    return this.mText;
  }

  /**
   * text - Description
   *
   * @param {string} value Description
   * @public
   *
   * @return {void} Description
   */
  set text(value) {
    if (this.mText === value)
      return;

    this.mText = value;
    this.mNeedInvalidate = true;
  }

  /**
   * autoSize - Description
   *
   * @return {boolean} Description
   */
  get autoSize() {
    return this.mAutoSize;
  }

  /**
   * autoSize - Description
   *
   * @param {boolean} value Description
   *
   * @return {void} Description
   */
  set autoSize(value) {
    if (this.mAutoSize === value)
      return;

    this.mAutoSize = value;
    this.mNeedInvalidate = true;
  }
}


class Device {
  constructor() {
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
   * isTouch - Description
   *
   * @return {boolean} Description
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
   * isMobile - Description
   *
   * @return {boolean} Description
   */
  static get isMobile() {
    return /Mobi/.test(navigator.userAgent);
  }

  /**
   * pixelRatio - Description
   *
   * @return {number} Description
   */
  static get pixelRatio() {
    return Device.mInstance.mPixelRatio;
  }

  /**
   * getDevicePixelRatio - Description
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

/** @type {Device}
 * @nocollapse
 */
Device.mInstance = null;


class Scatter {
  constructor() {}

  /**
   * getValue
   *
   * @return {*}
   */
  getValue() {}


  /**
   * getValueAt
   *
   * @param {number} t
   *
   * @return {*}
   */
  getValueAt(t) {}
}


class FloatScatter extends Scatter {
  constructor(min, max = undefined, ease = null) {
    super();

    this.mMin = min;
    this.mMax = max == null ? min : max;
    this.ease = ease;
  }


  /**
   * getValue
   *
   * @return {number}
   */
  getValue() {
    return Math.random() * (this.mMax - this.mMin) + this.mMin;
  }


  /**
   * getValueAt
   *
   * @param {number} t
   *
   * @return {number}
   */
  getValueAt(t) {
    if (this.ease !== null)
      t = this.ease(t);

    return this.mMin + t * (this.mMax - this.mMin);
  }
}


class VectorScatter extends Scatter {
  constructor(minX, minY, maxX, maxY) {
    super();

    this.minX = minX;
    this.minY = minY;

    this.maxX = maxX;
    this.maxY = maxY;
  }


  /**
   * getValue
   *
   * @return {Vector}
   */
  getValue() {
    let outVector = new Vector();
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
  getValueAt(t) {
    let outVector = new Vector();
    outVector.x = this.minX + t * (this.maxX - this.minX);
    outVector.y = this.minY + t * (this.maxY - this.minY);
    return outVector;
  }
}


class FloatCurveScatter extends Scatter {
  /**
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  constructor(...points) {
    super();

    this.mCurve = new Curve();
    this.mCurve.baked = true;
    this.mCurve.set(...points);

    this.mCache = new Vector();
  }

  getValue() {
    let t = Math.random();
    this.mCurve.interpolate(t, this.mCache);
    return this.mCache.y;
  }

  getValueAt(t) {
    this.mCurve.interpolate(t, this.mCache);
    return this.mCache.y;
  }
}


class VectorCurveScatter extends Scatter {
  /**
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  constructor(...points) {
    super();

    this.mCurve = new Curve();
    this.mCurve.baked = true;
    this.mCurve.set(...points);

    this.mCache = new Vector();
  }


  getValue() {
    let t = Math.random();
    this.mCurve.interpolate(t, this.mCache);
    return this.mCache;
  }


  getValueAt(t) {
    this.mCurve.interpolate(t, this.mCache);
    return this.mCache;
  }
}


class Action {

  /**
   * preUpdate - Description
   *
   * @param {number} dt Description
   * @param {number} t  Description
   *
   * @return {void} Description
   */
  preUpdate(dt, t) {}


  /**
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */
  update(emmiter, particle, dt, t) {}


  /**
   * postUpdate
   *
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */
  postUpdate(dt, t) {}
}

/**
 * @extends Action
 */

class Acceleration extends Action {
  constructor(vectorScatter) {
    super();

    this.scatter = vectorScatter;
  }

  /**
   * @override
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */
  update(emmiter, particle, dt, t) {
    let v = this.scatter.getValue();

    particle.ax += v.x;
    particle.ay += v.y;
  }
}

/**
 * @extends Action
 */

class AlphaOverLife extends Action {
  constructor(floatScatter) {
    super();

    this.scatter = floatScatter;
  }

  /**
   * @override
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */
  update(emmiter, particle, dt, t) {
    particle.alpha = this.scatter.getValueAt(particle.energy);
  }
}

/**
 * @extends Action
 */

class ScaleOverLife extends Action {
  constructor(floatScatter) {
    super();

    this.scatter = floatScatter;
  }

  /**
   * @override
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */
  update(emmiter, particle, dt, t) {
    particle.scale = this.scatter.getValueAt(particle.energy);
  }
}

/**
 * @extends Action
 */

class RotationOverLife extends Action {
  constructor(floatScatter) {
    super();

    this.scatter = floatScatter;
  }

  /**
   * @override
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */
  update(emmiter, particle, dt, t) {
    particle.r = this.scatter.getValueAt(particle.energy);
  }
}

/**
 * @extends Action
 */

class TextureOverLife extends Action {
  constructor(floatScatter) {
    super();

    this.scatter = floatScatter;
  }

  /**
   * @override
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */
  update(emmiter, particle, dt, t) {
    particle.textureIndex = ~~this.scatter.getValueAt(particle.energy);
  }
}


class Initializer {
  /**
   * @param {Particle} particle
   *
   * @return {void}
   */  
  initialize(particle) {}
}


class Life extends Initializer {
  /**
   * constructor - Description
   *
   * @param {FloatScatter} floatScatter Description
   *
   * @return {void} Description
   */
  constructor(floatScatter) {
    super();

    /** @type {FloatScatter} */
    this.scatter = floatScatter;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.life = this.scatter.getValue();
  }
}


class Mass extends Initializer {

  /**
   * constructor - Description
   *
   * @param {number} mass Description
   *
   * @return {void} Description
   */
  constructor(mass) {
    super();

    /** @type {number} */
    this.mass = mass;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.mass = this.mass;
  }
}


class Scale extends Initializer {
  /**
   * constructor - Description
   *
   * @param {FloatScatter} floatScatter Description
   *
   * @return {void} Description
   */
  constructor(floatScatter) {
    super();

    /** @type {FloatScatter} */
    this.scatter = floatScatter;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.scale = this.scatter.getValue();
  }
}


class Velocity extends Initializer {
  /**
   * constructor - Description
   *
   * @param {VectorScatter} vectorScatter Description
   *
   * @return {void} Description
   */
  constructor(vectorScatter) {
    super();

    /** @type {VectorScatter} */
    this.scatter = vectorScatter;
  }

  /**
   * @override
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


class Position extends Initializer {

  /**
   * constructor - Description
   *
   * @param {VectorScatter} vectorScatter Description
   *
   * @return {void} Description
   */
  constructor(vectorScatter) {
    super();

    /** @type {VectorScatter} */
    this.scatter = vectorScatter;
  }

  /**
   * @override
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


class Rotation extends Initializer {
  /**
   * constructor - Description
   *
   * @param {FloatScatter} floatScatter Description
   *
   * @return {void} Description
   */
  constructor(floatScatter) {
    super();

    /** @type {FloatScatter} */
    this.scatter = floatScatter;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.r = this.scatter.getValue();
  }
}


class RandomTexture extends Initializer {
  /**
   * constructor - Description
   *
   * @param {FloatScatter} floatScatter Description
   *
   * @return {void} Description
   */
  constructor(floatScatter) {
    super();

    /** @type {FloatScatter} */
    this.scatter = floatScatter;
  }

  /**
   * @override
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


class Particle {
  constructor() {
    this.reset();
  }

  reset() {
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
    this.r = 0

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


class Emitter extends DisplayObject {
  constructor() {
    super();

    /** @type {Array<Texture>} */
    this.mTextures = null;

    /** @type {Array<Particle>} */
    this.mParticles = [];

    /** @type {Array<Particle>} */
    this.mRecycled = [];

    /** @type {Array<Initializer>} */
    this.mInitializers = [];

    /** @type {Array<Action>} */
    this.mActions = [];

    /** @type {GameObject} */
    this.mSpace = null;

    /** @type {boolean} */
    this.mIsLocal = true;

    /** @type {number} */
    this.mMaxParticles = 10000;

    /** @type {FloatScatter} */
    this.mEmitCount = new FloatScatter(10);

    /** @type {FloatScatter} */
    this.mEmitNumRepeats = new FloatScatter(10);

    /** @type {number} */
    this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();

    /** @type {FloatScatter} */
    this.mEmitDuration = new FloatScatter(1);

    /** @type {number} */
    this.mEmitDurationLeft = this.mEmitDuration.getValue();

    /** @type {FloatScatter} */
    this.mEmitInterval = new FloatScatter(0.1);

    /** @type {number} */
    this.mEmitIntervalLeft = this.mEmitInterval.getValue();

    /** @type {FloatScatter} */
    this.mEmitDelay = new FloatScatter(1);

    /** @type {number} */
    this.mEmitDelayLeft = this.mEmitDelay.getValue();

    /** @type {number} */
    this.mNextUpdateAt = 0;

    /** @type {EmitterState} */
    this.mState = EmitterState.PENDING;

    // /** @type {function(a:Particle, b:Particle):number} */
    // this.mComparer = null;

    /** @type {Matrix} */
    this.__tmpLocal = new Matrix();

    /** @type {Matrix} */
    this.__tmpWorld = new Matrix();
  }

  // reset() {
  //   this.mState = 0;
  //
  //   // todo: reset simulation
  //   // todo: clear all particles
  //   this.updateNextTick(0);
  // }

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

  __render(video, time, parentAlpha, parentBlendMode) {
    video.save(this);

    // set blend mode
    let tmpBlendMode = BlendMode.AUTO;
    video.globalBlendMode = tmpBlendMode = this.blendMode === BlendMode.AUTO ? parentBlendMode : this.blendMode;

    // tmp matrices
    let localTransform = this.__tmpLocal;
    let worldTransform = this.__tmpWorld;
    localTransform.identity();

    let texture = null;

    if (this.mTextures.length > 0) {
      let plength = this.mParticles.length;
      let particle;
      for (let i = 0; i < plength; i++) {
      //for (let i = plength - 1; i > 0; i--) {
        particle = this.mParticles[i];
        texture = this.mTextures[particle.textureIndex];

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

        video.setTransform(worldTransform);
        video.globalAlpha = parentAlpha * this.mAlpha * particle.alpha;
        video.drawImage(texture);
      }
    }

    video.restore();
    super.__render(video, time, parentAlpha, parentBlendMode);
  }

  onUpdate(dt) {
    // rate logic
    this.updateNextTick(dt);

    if (Black.instance.uptime >= this.mNextUpdateAt && this.mState === EmitterState.EMITTING)
      this.__create(this.mEmitCount.getValue());

    // main update login
    let alength = this.mActions.length;
    let plength = this.mParticles.length;

    let t = Black.instance.uptime;

    for (let i = 0; i < alength; i++)
      this.mActions[i].preUpdate(dt, t);

    let particle;

    let i = this.mParticles.length;
    while (i--) {
      particle = this.mParticles[i];

      for (let k = 0; k < alength; k++)
        this.mActions[k].update(this, particle, dt, t);

      particle.update(dt);

      if (particle.life === 0) {
        this.mRecycled.push(particle);
        this.mParticles.splice(i, 1);
      }
    }

    for (let j = 0; j < alength; j++)
      this.mActions[j].postUpdate(dt, t);
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
  get emitNumRepeats() { return this.mEmitNumRepeats; }

  /**
   * emitNumRepeats
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitNumRepeats(value) { this.mEmitNumRepeats = value; this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue(); }


  /**
   * emitDuration
   *
   * @return {FloatScatter}
   */
  get emitDuration() { return this.mEmitDuration; }

  /**
   * emitDuration
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitDuration(value) { this.mEmitDuration = value; this.mEmitDurationLeft = this.mEmitDuration.getValue(); }


  /**
   * emitInterval
   *
   * @return {FloatScatter}
   */
  get emitInterval() { return this.mEmitInterval; }

  /**
   * emitInterval
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitInterval(value) { this.mEmitInterval = value; this.mEmitIntervalLeft = this.mEmitInterval.getValue(); }


  /**
   * emitDelay
   *
   * @return {FloatScatter}
   */
  get emitDelay() { return this.mEmitDelay; }

  /**
   * emitDelay
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitDelay(value) { this.mEmitDelay = value; this.mEmitDelayLeft = this.mEmitDelay.getValue(); }


  /**
   * space
   *
   * @return {GameObject}
   */
  get space() { return this.mSpace; }

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
}

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
  SINGLE_QUOTE: 222,
};


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

/*
Has to be static class.

+ before update store all events locally
- check root object! add collider automatically? or do it on demand?
*/


class Input extends System {
  constructor() {
    super();

    /** @type {Input} */
    this.constructor.instance = this;

    /** @type {Vector} */
    this.mPointerPosition = new Vector();

    /** @type {Element} */
    this.mDom = Black.instance.containerElement;

    /** @type {Array<string>} */
    this.mEventList = null;

    /** @type {Array<string>} */
    this.mKeyEventList = null;

    this.__initListeners();

    /** @type {Array<{e: Event, x: number, y:number}>} */
    this.mPointerQueue = [];

    /** @type {Array<Event>} */
    this.mKeyQueue = [];

    /** @type {Array<number>} */
    this.mPressedKeys = [];

    /** @type {boolean} */
    this.mIsPointerDown = false;

    /** @type {Array<InputComponent>} */
    this.mInputListeners = [];
  }

  __initListeners() {
    this.mKeyEventList = Input.mKeyEventList;

    if (window.PointerEvent)
      this.mEventList = Input.mPointerEventList;
    // else if (window.MSPointerEvent)
    //   this.mEventList = Input.mMSPointerEventList;
    else if (Device.isTouch && Device.isMobile)
      this.mEventList = Input.mTouchEventList;
    else
      this.mEventList = Input.mMouseEventList;

    // TODO: handle enter, cancel events too
    for (let i = 0; i < 6; i++)
      this.mDom.addEventListener(this.mEventList[i], e => this.__onPointerEvent(e), false);


    for (let i = 0; i < this.mKeyEventList.length; i++)
      document.addEventListener(this.mKeyEventList[i], e => this.__onKeyEvent(e), false);
  }

  __sortListeners() {
    // TODO: make it faster
    // - try insert sort
    this.mInputListeners.sort((x, y) => {
      return y.gameObject.depth - x.gameObject.depth || y.gameObject.index - x.gameObject.index;
    });
  }


  /**
   * __onKeyEvent - Description
   *
   * @param {Event} e Description
   *
   * @return {boolean} Description
   */
  __onKeyEvent(e) {
    this.mKeyQueue.push(e);
    return true;
  }


  /**
   * __onPointerEvent - Description
   *
   * @param {Event} e Description
   *
   * @return {boolean} Description
   */
  __onPointerEvent(e) {
    e.preventDefault();

    let /** @type {Vector|null} */ p = null;
    if (e.type.indexOf('touch') === 0)
      p = this.__getTouchPos(this.mDom, /** @type {TouchEvent} */ (e));
    else
      p = this.__getPointerPos(this.mDom, e);

    this.mPointerPosition.x = p.x;
    this.mPointerPosition.y = p.y;

    this.mPointerQueue.push({
      e: e,
      x: p.x,
      y: p.y
    });

    return true;
  }


  /**
   * __getPointerPos - Description
   *
   * @param {Element} canvas Description
   * @param {Event} evt    Description
   *
   * @return {Vector} Description
   */
  __getPointerPos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.clientWidth / rect.width;
    let scaleY = canvas.clientHeight / rect.height;
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
  __getTouchPos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();

    /** @type {Touch} */
    let touch = evt.changedTouches[0]; // ios? what about android?
    let x = touch.pageX;
    let y = touch.pageY;

    let scaleX = canvas.clientWidth / rect.width;
    let scaleY = canvas.clientHeight / rect.height;
    return new Vector((x - rect.left) * scaleX, (y - rect.top) * scaleY);
  }


  /**
   * __addListener - Description
   *
   * @param {Array<InputComponent>} array Description
   *
   * @return {void} Description
   */
  __addListener(array) {
    // check for duplicates
    for (let i = 0; i < array.length; i++) {
      let item = /** @type {InputComponent} */ (array[i]);

      if (this.mInputListeners.indexOf(item) === -1)
        this.mInputListeners.push(item);
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
  onChildrenAdded(child) {
    let cs = GameObject.findComponents(child, InputComponent);
    if (!cs || cs.length === 0)
      return;

    this.__addListener(cs);
  }


  /**
   * onChildrenRemoved - Description
   *
   * @param {GameObject} child Description
   *
   * @return {void} Description
   */
  onChildrenRemoved(child) {
    let cs = GameObject.findComponents(child, InputComponent);
    if (!cs || cs.length === 0)
      return;

    for (var i = cs.length - 1; i >= 0; i--) {
      let component = cs[i];
      let index = this.mInputListeners.indexOf( /** @type {InputComponent} */ (component));

      if (index !== -1)
        this.mInputListeners.splice(index, 1);
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
  onComponentAdded(child, component) {
    if (component.constructor !== InputComponent)
      return;

    this.__addListener([component]);
    //this.mInputListeners.push(/** @type {InputComponent} */ (component));
    //this.__sortListeners();
  }


  /**
   * onComponentRemoved - Description
   *
   * @param {GameObject} child     Description
   * @param {Component} component Description
   *
   * @return {void} Description
   */
  onComponentRemoved(child, component) {
    if (component.constructor !== InputComponent)
      return;

    let index = this.mInputListeners.indexOf( /** @type {InputComponent} */ (component));
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
  onUpdate(dt) {
    let pointerPos = new Vector();

    for (let i = 0; i < this.mPointerQueue.length; i++) {
      let nativeEvent = this.mPointerQueue[i];

      let ix = this.mEventList.indexOf(nativeEvent.e.type);
      let fnName = Input.mInputEventsLookup[ix];

      pointerPos.set(nativeEvent.x, nativeEvent.y);

      /** @type {InputComponent|null} */
      let currentComponent = null;
      for (let k = 0; k < this.mInputListeners.length; k++) {
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

        if (ix === Input.POINTER_DOWN)
          this.mIsPointerDown = true;
        else if (ix === Input.POINTER_UP)
          this.mIsPointerDown = false;

        if (currentComponent.mPointerInside === false) {
          currentComponent.mPointerInside = true;
          currentComponent.gameObject.post('~pointerIn');
        }

        currentComponent.gameObject.post('~' + fnName);
      }

      //console.log(fnName);
      this.post(fnName);
    }

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
  static on(name, callback, context = null) {
    Input.instance.on(name, callback, context);
  }


  /**
   * isPointerDown - Description
   *
   * @return {boolean} Description
   */
  static get isPointerDown() {
    return Input.instance.mIsPointerDown;
  }


  /**
   * pointerX - Description
   *
   * @return {number} Description
   */
  static get pointerX() {
    return Input.instance.mPointerPosition.x;
  }


  /**
   * pointerY - Description
   *
   * @return {number} Description
   */
  static get pointerY() {
    return Input.instance.mPointerPosition.y;
  }


  /**
   * pointerPosition - Description
   *
   * @return {Vector} Description
   */
  static get pointerPosition() {
    return Input.instance.mPointerPosition;
  }

  static get pressedKeys() {
    return Input.instance.mPressedKeys;
  }
}

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

Input.mInputEventsLookup = ['pointerMove', 'pointerDown', 'pointerUp', 'pointerCancel', 'pointerIn', 'pointerOut'];

/** @type {Array<string>}
 *  @const
 */
Input.mPointerEventList = ['pointermove', 'pointerdown', 'pointerup', 'pointercancel', 'pointerenter', 'pointerleave'];

// /** @type {Array<string>}
//  *  @const
//  */
// Input.mMSPointerEventList = ['MSPointerMove', 'MSPointerDown', 'MSPointerUp', 'MSPointerCancel', 'MSPointerEnter', 'MSPointerLeave'];

/** @type {Array<string>}
 *  @const
 */
Input.mMouseEventList = ['mousemove', 'mousedown', 'mouseup', 'mousecancel', 'mouseenter', 'mouseleave'];

/** @type {Array<string>}
 *  @const
 */
Input.mTouchEventList = ['touchmove', 'touchstart', 'touchend', 'touchcancel', 'touchenter', 'touchleave'];


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
    this.mPointerInside = false;
  }
}


class FPSComponent extends Component  {
  constructor() {
    super();

    /** @type {TextField} */
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


class MRComponent extends Component {

  /**
   * constructor - Description
   *
   * @param {number} [width=960]  Description
   * @param {number} [height=640] Description
   */
  constructor(width = 960, height = 640) {
    super();

    /** @type {number} */
    this.mWidth = width;

    /** @type {number} */
    this.mHeight = height;

    /** @type {number} */
    this.mScale = 0;

    /** @type {number} */
    this.mInvScale = 0;

    /** @type {number} */
    this.mAspect = 0;

    this.setSize(this.mWidth, this.mHeight);

    Black.instance.viewport.on('resize', this.__onResize, this);
  }

  __onResize(msg, rect) {
    this.setSize(this.mWidth, this.mHeight);
  }

  /**
   * setSize - description
   *
   * @param  {number} width = 960  description
   * @param  {number} height = 640 description
   * @return {void}              description
   */
  setSize(width = 960, height = 640){
    this.mWidth = width;
    this.mHeight = height;

    this.updateLayout();
  }

  /**
   * updateLayout - description
   *
   * @return {void}  description
   */
  updateLayout() {
    if (!this.gameObject)
      return;

    /** @type {Rectangle} */
    let size = Black.instance.viewport.size;

    /** @type {number} */
    let scaleX = size.width / this.mWidth;

    /** @type {number} */
    let scaleY = size.height / this.mHeight;

    this.mScale = Math.min(scaleX, scaleY);
    this.mInvScale = 1 / this.mScale;

    this.gameObject.scaleX = this.gameObject.scaleY = this.mScale;
    this.gameObject.x = (size.width / 2) - (this.mWidth / 2) * this.mScale;
    this.gameObject.y = (size.height / 2) - (this.mHeight / 2) * this.mScale;
  }

  onAdded(){
    this.updateLayout();
  }

  onRemoved(){
  }

  onUpdate(){
  }
}


class Ease {
  constructor() {}

  /**
   * linear - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static linear(k) {
    return k;
  }

  /**
   * quadraticIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quadraticIn(k) {
    return k * k;
  }

  /**
   * quadraticOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quadraticOut(k) {
    return k * (2 - k);
  }

  /**
   * quadraticInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quadraticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k;

    return -0.5 * (--k * (k - 2) - 1);
  }

  /**
   * cubicIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static cubicIn(k) {
    return k * k * k;
  }

  /**
   * cubicOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static cubicOut(k) {
    return --k * k * k + 1;
  }

  /**
   * cubicInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static cubicInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k;

    return 0.5 * ((k -= 2) * k * k + 2);
  }

  /**
   * quarticIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quarticIn(k) {
    return k * k * k * k;
  }

  /**
   * quarticOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quarticOut(k) {
    return 1 - (--k * k * k * k);
  }

  /**
   * quarticInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quarticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k * k;

    return -0.5 * ((k -= 2) * k * k * k - 2);
  }

  /**
   * quinticIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quinticIn(k) {
    return k * k * k * k * k;
  }

  /**
   * quinticOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quinticOut(k) {
    return --k * k * k * k * k + 1;
  }

  /**
   * quinticInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quinticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k * k * k;

    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  }

  /**
   * sinusoidalIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static sinusoidalIn(k) {
    return 1 - Math.cos(k * Math.PI / 2);
  }

  /**
   * sinusoidalOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static sinusoidalOut(k) {
    return Math.sin(k * Math.PI / 2);
  }

  /**
   * sinusoidalInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static sinusoidalInOut(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  }

  /**
   * exponentialIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static exponentialIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  }

  /**
   * exponentialOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static exponentialOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  }

  /**
   * exponentialInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
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
   * circularIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static circularIn(k) {
    return 1 - Math.sqrt(1 - k * k);
  }

  /**
   * circularOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static circularOut(k) {
    return Math.sqrt(1 - (--k * k));
  }

  /**
   * circularInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static circularInOut(k) {
    if ((k *= 2) < 1)
      return -0.5 * (Math.sqrt(1 - k * k) - 1);

    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
  }

  /**
   * elasticIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static elasticIn(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
  }

  /**
   * elasticOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static elasticOut(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
  }

  /**
   * elasticInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
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
   * backIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static backIn(k) {
    const s = 1.70158;
    return k * k * ((s + 1) * k - s);
  }

  /**
   * backOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static backOut(k) {
    const s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
  }

  /**
   * backInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static backInOut(k) {
    const s = 1.70158 * 1.525;

    if ((k *= 2) < 1)
      return 0.5 * (k * k * ((s + 1) * k - s));

    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  }

  /**
   * bounceIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static bounceIn(k) {
    return 1 - Ease.bounceOut(1 - k);
  }

  /**
   * bounceOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
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
   * bounceInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static bounceInOut(k) {
    if (k < 0.5)
      return Ease.bounceIn(k * 2) * 0.5;

    return Ease.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }

  /**
   * smoothstep - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static smootherStep(k) {
    return k * k * k * (k * (6.0 * k - 15.0) + 10.0);
  }
}


class Interpolation {
  constructor() {}

  /**
   * linear - Description
   *
   * @param {Array} v - The input array of values to interpolate between.
   *
   * @param {number} k - The percentage of interpolation, between 0 and 1.
   *
   * @return {number} The interpolated value
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
   * bezier - Description
   *
   * @param {Array} v - The input array of values to interpolate between.
   *
   * @param {number} k - The percentage of interpolation, between 0 and 1.
   *
   * @return {number} The interpolated value
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
   * catmullRom - Description
   *
   * @param {Array} v - The input array of values to interpolate between.
   *
   * @param {number} k - The percentage of interpolation, between 0 and 1.
   *
   * @return {number} The interpolated value
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
 * __factorial
 *
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
 * Tween
 * @unrestricted
 * @extends Component
 */

class Tween extends Component {
  /**
   * constructor - Description
   * @param {Object}   values            Description
   * @param {number} [duration=0.25]   Description
   * @param {Object|null}   [properties=null] Description
   */
  constructor(values, duration = 0.250, properties = null) {
    super();

    /** @dict */
    this.mValues = values;

    /** @type {number} */
    this.mDuration = duration;

    /** @dict */
    this.mProperties = properties;

    /** @type {boolean} */
    this.mIsPlaying = false;

    /** @type {boolean} */
    this.mIsPaused = false;

    /** @type {number} */
    this.mStartTime = 0;

    /** @type {number} */
    this.mPausedTime = 0;

    /** @dict */
    this.mValuesStart = {};

    /** @type {number} */
    this.mElapsed = 0;

    /** @type {function ((Array|null), number):number} */
    this.mInterpolation = Interpolation.linear;

    /** @type {number} */
    this.mDelay = 0;

    /** @type {number} */
    this.mRepeatTimes = 0;

    /** @type {boolean} */
    this.mInitiated = false;

    /** @type {boolean} */
    this.mStarted = false;

    /** @type {boolean} */
    this.mReverse = false;

    /** @type {boolean} */
    this.mRemoveOnComplete = true;

    /** @type {boolean} */
    this.mPlayOnAdded = true;

   /** @type {function(number):number} */
    this.mEase = Ease.smootherStep;

    if (this.mProperties !== null) {
      for (let f in this.mProperties) {
        this[f] = /** @dict */ (this.mProperties[f]);
      }
    }
  }

  /**
   * ease - Description
   *
   * @return {function(number):number} Description
   */
  get ease() {
    return this.mEase;
  }

  /**
   * ease - Description
   *
   * @param {function(number):number} value Description
   *
   * @return {void} Description
   */
  set ease(value) {
    this.mEase = value;
  }

  /**
   * interpolation - Description
   *
   * @return {function(Array, number):number} Description
   */
  get interpolation() {
    return this.mInterpolation;
  }

  /**
   * interpolation - Description
   *
   * @param {function(Array, number):number} value Description
   *
   * @return {void} Description
   */
  set interpolation(value) {
    this.mInterpolation = value;
  }

  /**
   * elapsed - Description
   *
   * @return {number} Description
   */
  get elapsed() {
    return this.mElapsed;
  }

  /**
   * delay - Description
   *
   * @return {number} Description
   */
  get delay() {
    return this.mDelay;
  }

  /**
   * delay - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set delay(value) {
    this.mDelay = value;
  }

  /**
   * removeOnComplete - Description
   *
   * @return {boolean} Description
   */
  get removeOnComplete() {
    return this.mRemoveOnComplete;
  }

  /**
   * removeOnComplete - Description
   *
   * @param {boolean} value Description
   *
   * @return {void} Description
   */
  set removeOnComplete(value) {
    this.mRemoveOnComplete = value;
  }

  /**
   * playOnAdded - Description
   *
   * @return {boolean} Description
   */
  get playOnAdded() {
    return this.mPlayOnAdded;
  }

  /**
   * playOnAdded - Description
   *
   * @param {boolean} value Description
   *
   * @return {void} Description
   */
  set playOnAdded(value) {
    this.mPlayOnAdded = value;
  }


  /**
   * __start - Description
   *
   * @param {number} t Description
   *
   * @return {void} Description
   */
  __start(t) {
    this.mIsPlaying = true;
    this.mStartTime = t + this.mDelay;
  }

  /**
   * play - Description
   *
   * @return {Tween} Description
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
   * stop - Description
   *
   * @return {Tween} Description
   */
  stop() {
    if (!this.mIsPlaying)
      return this;

    this.mIsPlaying = false;

    return this;
  }

  /**
   * to - Description
   *
   * @param {Object} values - Description
   *
   * @return {Tween} Description
   */
  to(values = {}, duration = 0.250) {
    this.mValues = values;

    this.mDuration = duration;

    this.mInitiated = false;

    return this;
  }

  /**
   * pause - Description
   *
   * @return {Tween} Description
   */
  pause() {
    if (!this.mIsPlaying)
      return this;

    this.mIsPaused = true;
    this.mPausedTime = Black.instance.uptime;

    return this;
  }

  /**
   * __resume - Description
   *
   * @return {void} Description
   */
  __resume() {
    if (!this.mIsPaused)
      return;

    this.mIsPaused = false;
    this.mStartTime += Black.instance.uptime - this.mPausedTime;
  }


  /**
   * @return {void}
   */
  remove() {
    if (this.mIsPlaying)
      this.stop();

    this.gameObject.removeComponent(this);
  }

  /**
   * dispose - Description
   *
   * @return {void} Description
   */
  dispose() {
    this.remove();
  }

  /**
   * repeat - Description
   *
   * @return {Tween} Description
   */
  repeat(times) {
    this.mRepeatTimes = times;

    return this;
  }

  /**
   * loop - Description
   *
   * @return {Tween} Description
   */
  loop(value = true) {
    this.mRepeatTimes = value ? Infinity : 0;

    return this;
  }

   /**
   * reverse - Description
   *
   * @return {Tween} Description
   */
  reverse(value = true) {
    this.mReverse = value;

    return this;
  }

  /**
   * chain - Description
   *
   * @return {Tween} Description
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
   * onAdded - description
   *
   * @override
   * @param  {GameObject} gameObject description
   * @return {void}            description
   */
  onAdded(gameObject) {
    if (this.mPlayOnAdded) {
      this.__start(Black.instance.uptime);
    }
  }

  /**
   * __update - Description
   *
   * @param {number} t Description
   *
   * @return {void} Description
   */
  __update(t) {
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
      if (this.mRepeatTimes > 0) {
        this.mRepeatTimes -= 1;

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
          this.dispose();
        } else {
          for (let f in this.mValues) {
            this.mValuesStart[f] = this.mValues[f];
          }

          this.mStarted = false;
        }
      }
    }
  }


  /**
   * set - Description
   *
   * @param {Object} values Description
   *
   * @return {void} Description
   */
  set(values) {
    this.mValues = values;

    for (let f in this.mValues)
      this.mValuesStart[f] = parseFloat(this.gameObject[f]);
  }

  onPostUpdate(dt){
    let t = Black.instance.uptime;
    this.__update(t);
  }
}


class Animation {
  /**
   * constructor - Description
   *
   * @param {AnimationController}    controller  Description
   * @param {string}    name        Description
   * @param {Array<Texture>}    frames      Description
   * @param {number}  [fps=14]    Description
   * @param {boolean} [loop=true] Description
   */
  constructor(controller, name, frames, fps = 14, loop = true) {
    Debug.assert(fps > 0, 'FPS must be greater than 0.');
    assert(fps > 0, '');

    this.mController = controller;

    /** @type {string} */
    this.mName = name;

    /** @type {Array<Texture>} */
    this.mFrames = frames;

    /** @type {number} */
    this.mCurrentFrame = 0;

    /** @type {number} */
    this.mNextFrameAt = 0;

    /** @type {number} */
    this.mFPS = fps;

    /** @type {number} */
    this.mFrameDuration = 1 / this.mFPS;

    /** @type {boolean} */
    this.mLoop = loop;

    /** @type {boolean} */
    this.mPaused = false;

    /** @type {number} */
    this.mElapsed = 0;

    /** @type {boolean} */
    this.mStopped = false;

    /** @type {boolean} */
    this.mCompleted = false;
  }


  /**
   * play - Description
   *
   * @return {Texture} Description
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
   * stop - Description
   *
   * @return {void} Description
   */
  stop() {
    this.mStopped = true;
    this.mCurrentFrame = 0;
  }


  /**
   * pause - Description
   *
   * @return {void} Description
   */
  pause() {
    this.mPaused = true;
    this.mElapsed = this.mNextFrameAt - Black.instance.uptime;
  }


  /**
   * __update - Description
   *
   * @param {number} dt Description
   * @param {number} t  Description
   *
   * @return {Texture|null} Description
   */
  __update(dt, t) {
    if (t < this.mNextFrameAt || this.mPaused === true || this.mStopped === true || this.mCompleted === true)
      return null;

    this.mCurrentFrame++;

    if (this.mCurrentFrame >= this.mFrames.length) {
      if (this.mLoop === true) {
        this.mCurrentFrame = 0;
      }
      else {
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
   * fps - Description
   *
   * @return {number} Description
   */
  get fps() {
    return this.mFPS;
  }

  /**
   * fps - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
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
   * loop - Description
   *
   * @return {boolean} Description
   */
  get loop() {
    return this.mLoop;
  }

  /**
   * loop - Description
   *
   * @param {boolean} value Description
   *
   * @return {void} Description
   */
  set loop(value) {
    this.mLoop = value;
  }


  /**
   * frames - Description
   *
   * @return {Array<Texture>} Description
   */
  get frames() {
    return this.mFrames;
  }


  /**
   * playing - Description
   *
   * @return {boolean} Description
   */
  get isPlaying(){
    return this.mPaused === false && this.mStopped === false;
  }

  /**
   * playing - Description
   *
   * @return {boolean} Description
   */
  get isComplete(){
    return this.mCompleted;
  }

  get name() {
    return this.mName;
  }
}


class AnimationController extends Component {
  constructor() {
    super();

    /** @type {Object<string, Animation>} */
    this.mAnimations = {};

    /** @type {Animation|null} */
    this.mCurrentAnim = null;
  }


  /**
   * get - Description
   *
   * @param {string} name Description
   *
   * @return {Animation} Description
   */
  get(name){
    Debug.assert(this.mAnimations.hasOwnProperty(name), 'Animation must be set first.');

    return this.mAnimations[name];
  }


  /**
   * set - Description
   *
   * @param {string}    name        Description
   * @param {Array<Texture>}    textures    Description
   * @param {number}  [fps=14]    Description
   * @param {boolean} [loop=true] Description
   *
   * @return {Animation} Description
   */
  set(name, textures, fps = 14, loop = true) {
    Debug.assert(textures.length > 0, 'Animation cannot be empty.');
    Debug.assert(fps > 0, 'FPS must be greater than 0.');

    let anim = new Animation(this, name, textures, fps, loop);
    this.mAnimations[name] = anim;

    return anim;
  }


  /**
   * play - Description
   *
   * @param {string} name Description
   *
   * @return {void} Description
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
   * stop - Description
   *
   * @return {void} Description
   */
  stop() {
    if (this.mCurrentAnim === null)
      return;

    this.mCurrentAnim.stop();
  }


  /**
   * pause - Description
   *
   * @return {void} Description
   */
  pause() {
    if (this.mCurrentAnim === null)
      return;

    this.mCurrentAnim.pause();
  }


  /**
   * onPostUpdate - Description
   *
   * @override
   * @param {number} dt Description
   *
   * @return {void} Description
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
   * currentAnimation
   *
   * @return {Animation|null}
   */
  get currentAnimation() {
    return this.mCurrentAnim;
  }
}

//.########::'##::::::::::'###:::::'######::'##:::'##:
// ##.... ##: ##:::::::::'## ##:::'##... ##: ##::'##::
// ##:::: ##: ##::::::::'##:. ##:: ##:::..:: ##:'##:::
// ########:: ##:::::::'##:::. ##: ##::::::: #####::::
// ##.... ##: ##::::::: #########: ##::::::: ##. ##:::
// ##:::: ##: ##::::::: ##.... ##: ##::: ##: ##:. ##::
// ########:: ########: ##:::: ##:. ######:: ##::. ##:
//........:::........::..:::::..:::......:::..::::..::


class Black extends MessageDispatcher {

  /**
   * constructor
   * @param {string}   containerElementId
   * @param {function(new: GameObject)}   rootClass
   * @param {string=} [videoDriverName=canvas]
   */
  constructor(containerElementId, rootClass, videoDriverName = 'canvas') {
    super();

    // Dirty GCC workaround
    window['Black'] = {};
    window['Black']['instance'] = this;

    var css = "background: #000; color: #fff;";
    console.log('%c ~Black ', css);

    /** @type {string} */
    this.mContainerElementId = containerElementId;

    /** @type {HTMLElement} */
    this.mContainerElement = /** @type {!HTMLElement} */ (document.getElementById(this.mContainerElementId));

    if (!this.mContainerElement)
      throw new Error('Container element was not found');

    /** @type {string} */
    this.mVideoName = videoDriverName;

    /** @type {number} */
    this.mStageWidth = this.mContainerElement.clientWidth;

    /** @type {number} */
    this.mStageHeight = this.mContainerElement.clientHeight;

    /** @type {number} */
    this.mSimulationTimestep = 1000 / 60;

    /** @type {number} */
    this.mUptime = 0;

    /** @type {number} */
    this.mFrameAccum = 0;

    /** @type {number} */
    this.mLastFrameTimeMs = 0;

    /** @type {number} */
    this.mCurrentTime = 0;

    /** @type {number} */
    this.mFPS = 60;

    /** @type {number} */
    this.mLastFpsUpdate = 0;

    /** @type {number} */
    this.mFramesThisSecond = 0;

    /** @type {number} */
    this.mNumUpdateSteps = 0;

    /** @type {number} */
    this.mMinFrameDelay = 0;

    /** @type {Array<System>} */
    this.mSystems = [];

    /** @type {Rectangle} */
    this.mBounds = new Rectangle();

    /** @type {boolean} */
    this.mIsRunning = false;

    /** @type {boolean} */
    this.mIsStarted = false;

    /** @type {boolean} */
    this.mIsPanic = false;

    /** @type {number} */
    this.mLastFrameUpdateTime = 0;

    /** @type {number} */
    this.mLastFrameRenderTime = 0;

    /** @type {number} */
    this.mRAFHandle = -1; // not sure

    /** @type {Viewport} */
    this.mViewport = null;

    /** @type {NullDriver} */
    this.mVideo = null;

    /** @type {boolean} */
    this.mPaused = false;

    /** @type {boolean} */
    this.mUnpausing = false;

    /** @type {boolean} */
    this.mPauseOnHide = true;

    /** @type {boolean} */
    this.mPauseOnBlur = false;

    /** @type {Object<string, Array>} */
    this.mTagCache = {};

    /** @type {function(new: GameObject)|null} */
    this.mRootClass = rootClass;

    /** @type {GameObject|null} */
    this.mRoot = null;
  }

  pause() {
    this.mPaused = true;
  }

  resume() {
    this.mUnpausing = true;
  }

  __bootViewport() {
    this.mViewport = new Viewport(this.mContainerElement);
  }

  __bootSystems() {
    this.addSystem(new Input());
  }

  __bootStage() {
    window.onblur = event => this.__onVisbilityChange(event);
    window.onfocus = event => this.__onVisbilityChange(event);
    window.onpagehide = event => this.__onVisbilityChange(event);
    window.onpageshow = event => this.__onVisbilityChange(event);

    if (document.hidden && this.mPauseOnHide === true)
      this.mPaused = true;
  }

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
   * addSystem - Adds a given system to the system list.
   *
   * @param  {System} system
   * @return {System}
   */
  addSystem(system) {
    this.mSystems.push(system);
    return system;
  }


  /**
   * removeSystem - Removes the given system to the system list.
   *
   * @param {System} system
   *
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

  __bootVideo() {
    if (this.mVideoName === 'canvas')
      this.mVideo = new CanvasDriver(this.mContainerElement, this.mStageWidth, this.mStageHeight);
    else if (this.mVideoName === 'dom')
      this.mVideo = new DOMDriver(this.mContainerElement, this.mStageWidth, this.mStageHeight);
    else if (this.mVideoName === 'null' || this.mVideoName == null)
      this.mVideo = new NullDriver(this.mContainerElement, this.mStageWidth, this.mStageHeight);
    else
      Debug.assert(false, 'Unsupported video driver. Use canvas or dom.');
  }

  start() {
    this.constructor.instance = this;

    if (this.mIsStarted)
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
  }


  stop() {
    this.mIsStarted = false;
    this.mIsRunning = false;
    cancelAnimationFrame(this.mRAFHandle);
  }


  /**
   * __update - Description
   *
   * @param {number} timestamp Description
   *
   * @return {void} Description
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

      while (this.mFrameAccum >= this.mSimulationTimestep) {
        this.__internalFixedUpdate(this.mSimulationTimestep * 0.001);

        this.mFrameAccum -= this.mSimulationTimestep;

        if (++this.mNumUpdateSteps >= (60 * 3)) {
          console.log('[BLACK]: Not enough time to calculate update logic.');
          this.mIsPanic = true;
          break;
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
   * __internalFixedUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  __internalFixedUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onFixedUpdate(dt);

    this.mRoot.__fixedUpdate(dt);
  }


  /**
   * __internalUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  __internalUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onUpdate(dt, this.mUptime);

    this.mRoot.__update(dt);
  }

  /**
   * __internalUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  __internalPostUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onPostUpdate(dt, this.mUptime);

    this.mRoot.__postUpdate(dt);
  }

  /**
   * bounds - Description
   *
   * @return {Rectangle} Description
   */
  get bounds() {
    return this.mBounds;
  }


  /**
   * root - Description
   *
   * @return {GameObject} Description
   */
  get root() {
    return this.mRoot;
  }


  /**
   * video - Description
   *
   * @return {NullDriver} Description
   */
  get video() {
    return this.mVideo;
  }


  /**
   * simulationTimestep - Description
   *
   * @return {number} Description
   */
  get simulationTimestep() {
    return this.mSimulationTimestep;
  }


  /**
   * simulationTimestep - Description
   *
   * @param {number} timestep Description
   *
   * @return {void} Description
   */
  set simulationTimestep(timestep) {
    this.mSimulationTimestep = timestep;
  }


  /**
   * FPS - Description
   *
   * @return {number} Description
   */
  get FPS() {
    return this.mFPS;
  }


  /**
   * maxFPS - Description
   *
   * @return {number} Description
   */
  get maxFPS() {
    return 1000 / this.mMinFrameDelay;
  }


  /**
   * maxAllowedFPS - Description
   *
   * @param {number} fps Description
   *
   * @return {void} Description
   */
  set maxAllowedFPS(fps) {
    if (fps <= 0)
      this.stop();
    else
      this.mMinFrameDelay = 1000 / fps;
  }


  /**
   * viewport - Description
   *
   * @return {Viewport} Description
   */
  get viewport() {
    return this.mViewport;
  }


  /**
   * containerElement - Description
   *
   * @return {Element} Description
   */
  get containerElement() {
    return this.mContainerElement;
  }


  /**
   * uptime - Description
   *
   * @return {number} Description
   */
  get uptime() {
    return this.mUptime;
  }

  /**
   * onTagUpdated - Description
   *
   * @param {GameObject} child Description
   * @param {string|null} oldTag   Description
   * @param {string|null} newTag   Description
   *
   * @return {void} Description
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
   * @param  {GameObject} child     description
   * @return {void}           description
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
   * @param  {GameObject} child     description
   * @return {void}           description
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
   * @param  {GameObject} child     description
   * @param  {Component} component description
   * @return {void}           description
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
   * @param  {GameObject} child     description
   * @param  {Component} component description
   * @return {void}           description
   */
  onComponentRemoved(child, component) {
    //child.mBlack = null;
    //console.log('onComponentRemoved', child, component);

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onComponentRemoved(child, component);

    if (component.mAdded === false)
      return;

    component.mAdded = false;
    component.onRemoved(child);
  }

  /**
   * pauseOnHide
   *
   * @return {boolean}
   */
  get pauseOnHide() {
    return this.mPauseOnHide;
  }

  /**
   * pauseOnHide
   *
   * @param {boolean} value
   *
   * @return {void}
   */
  set pauseOnHide(value) {
    this.mPauseOnHide = value;
  }

  /**
   * pauseOnBlur
   *
   * @return {boolean}
   */
  get pauseOnBlur() {
    return this.mPauseOnBlur;
  }

  /**
   * pauseOnBlur
   *
   * @param {boolean} value
   *
   * @return {void}
   */
  set pauseOnBlur(value) {
    this.mPauseOnBlur = value;
  }

  /**
   * videoName
   *
   * @return {string}
   */
  get videoName() {
    return this.mVideoName;
  }
}

//# sourceMappingURL=black-es6.js.map
