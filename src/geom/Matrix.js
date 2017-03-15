/* @echo EXPORT */
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

  // @ifdef DEBUG
  /**
   * @param  {number=} digits = 2
   * @return {string}
   */
  toString(digits = 2) {
    return `        | ${this.value[0].toFixed(digits)} | ${this.value[1].toFixed(digits)} | ${this.value[4].toFixed(digits)} |
Matrix: | ${this.value[2].toFixed(digits)} | ${this.value[3].toFixed(digits)} | ${this.value[5].toFixed(digits)} |
        | ${(0).toFixed(digits)} | ${(0).toFixed(digits)} | ${(1).toFixed(digits)} |`;
  }
  // @endif
}

/**
 * @type {Matrix}
 * @nocollapse
 */
Matrix.__cache = new Matrix();
