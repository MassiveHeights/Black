/**
 * Mathematical representation of a rectangle.
 *
 * @cat geom
 */
/* @echo EXPORT */
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
    Debug.assert(!isNaN(x), 'x cannot be NaN');
    Debug.assert(!isNaN(y), 'y cannot be NaN');
    Debug.assert(!isNaN(w), 'width cannot be NaN');
    Debug.assert(!isNaN(h), 'height cannot be NaN');

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

  intersection(toIntersect, outRect) {
    outRect = outRect || new Rectangle();

    var x0 = this.x < toIntersect.x ? toIntersect.x : this.x;
    var x1 = this.right > toIntersect.right ? toIntersect.right : this.right;

    if (x1 <= x0)
      return new Rectangle();

    var y0 = this.y < toIntersect.y ? toIntersect.y : this.y;
    var y1 = this.bottom > toIntersect.bottom ? toIntersect.bottom : this.bottom;

    if (y1 <= y0)
      return new Rectangle();

    outRect.set(x0, y0, x1 - x0, y1 - y0);
    return outRect;
  }


  /**
   * Adds given rectangle into this.
   *
   * @param {Rectangle} toUnion A rectangle object to add to this rect.
   *
   * @return {Rectangle} New rectangle object that is the union.
   */
  union(toUnion) {
    let x0 = this.x > toUnion.x ? toUnion.x : this.x;
    let x1 = this.right < toUnion.right ? toUnion.right : this.right;
    let y0 = this.y > toUnion.y ? toUnion.y : this.y;
    let y1 = this.bottom < toUnion.bottom ? toUnion.bottom : this.bottom;

    return this.set(x0, y0, x1 - x0, y1 - y0);
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
  get isEmpty() {
    return this.width <= 0 || this.height <= 0;
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

  static get(x = 0, y = 0, w = 0, h = 0) {
    return Rectangle.__recycled.length > 0 ? Rectangle.__recycled.pop().set(a, b, w, h) : new Rectangle(x, y, w, h);
  }

  static free(rectangle) {
    Rectangle.__recycled.push(rectangle);
  }
}

/**
 * @ignore
 * @type {Rectangle}
 * @nocollapse
 */
Rectangle.__cache = new Rectangle();
Rectangle.__recycled = [];