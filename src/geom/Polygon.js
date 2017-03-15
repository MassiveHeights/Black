/* @echo EXPORT */
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

  // @ifdef DEBUG
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

  // @endif
}

/** @type {Polygon}
 * @nocollapse
 */
Polygon.__cache = new Polygon();
