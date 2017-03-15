/* @echo EXPORT */
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


  // @ifdef DEBUG
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
  // @endif
}

/** @type {Rectangle}
  * @nocollapse
  */
Rectangle.__cache = new Rectangle();
