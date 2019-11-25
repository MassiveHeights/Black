import { Vector } from "./Vector";
import { Rectangle } from "./Rectangle";
import { Line } from "./Line";

/**
 * @cat geom
 */
export class Polygon {
  /**
   * Creates new Polygon instance.
   *
   * @param  {Array<black-engine~Vector>} vertices = [] Array of vertex points;
   */
  constructor(vertices = []) {

    /** 
     * @private 
     * @type {Array<black-engine~Vector>} 
     */
    this.mVertices = vertices;

    /** 
     * @private 
     * @type {Array<black-engine~Line>} 
     */
    this.mLines = [];

    /** 
     * @private 
     * @type {black-engine~Rectangle} 
     */
    this.mBounds = new Rectangle();

    /** 
     * @private 
     * @type {black-engine~Vector} 
     */
    this.mCenter = new Vector();

    if (vertices.length > 2)
      this.refresh();
  }

  /**
   * Sets new vertices.
   *
   * @param {Array<black-engine~Vector>} vertices New points.
   * @return {black-engine~Polygon} This polygon.
   */
  set(vertices) {
    this.mVertices = vertices;
    this.refresh();
    return this;
  }

  /**
   * Copies this properties to another polygon.
   *
   * @param {black-engine~Polygon} polygon Object to copy to.
   * @return {black-engine~Polygon} Passed polygon.
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
   * Copies another polygon properties to this.
   *
   * @param {black-engine~Polygon} polygon Object to copy from.
   * @return {black-engine~Polygon} This polygon.
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
   * Clones this polygon.
   *
   * @return {black-engine~Polygon} Created polygon.
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

  /**
   * Gets the width of this polygon.
   *
   * @readonly
   * @returns {number}
   */
  get width() {
    return this.mBounds.width;
  }

  /**
   * Gets the height of this polygon.
   *
   * @readonly
   * @returns {number}
   */
  get height() {
    return this.mBounds.height;
  }

  /**
   * Shows whether point is within polygon area.
   *
   * @param {number} x Point position x.
   * @param {number} y Point position y.
   * @return {boolean} True if polygon contains point.
   */
  containsXY(x, y) {
    return this.contains(new Vector(x, y));
  }

  /**
   * Shows whether point is within polygon area.
   *
   * @param {black-engine~Vector} vector Point to check.
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
   * Perimeter of this polygon.
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
   * Checks collision between two polygons.
   *
   * @param {black-engine~Polygon} polygon Object to check.
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
   * Checks collision between this polygon and circle.
   *
   * @param {black-engine~Circle} circle Object to check.
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
   * Checks collision between this polygon and rectangle.
   *
   * @param {black-engine~Rectangle} rectangle Object to check.
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
   * Checks if this polygon overlaps another.
   *
   * @param {black-engine~Polygon} polygon Object to check.
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
   * Checks if this polygon overlaps passed circle.
   *
   * @param {black-engine~Circle} circle Object to check.
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
   * Checks if this polygon overlaps given rectangle.
   *
   * @param {black-engine~Rectangle} rectangle Object to check.
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
   * Calculates center, bounds, and edges of this polygon.
   *
   * @return {black-engine~Polygon} This polygon.
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
   * Calculates center of this polygon.
   *
   * @return {black-engine~Polygon} This polygon.
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
   * Calculates bounds of this polygon.
   *
   * @return {black-engine~Polygon} This polygon.
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
   * Calculates edges of this polygon.
   *
   * @return {black-engine~Polygon} This polygon.
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
   * Creates instance of Polygon.
   *
   * @param {string} path Numbers x y divided with space.
   * @return {black-engine~Polygon} Created polygon.
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
   * Sets rotation. Rotates this polygon around it center.
   *
   * @param {number} rotation Angle in radians.
   * @return {black-engine~Polygon} This polygon.
   */
  setRotation(rotation) {
    let center = this.mCenter;
    let vertices = this.mVertices;
    let cos = Math.cos(rotation);
    let sin = Math.sin(rotation);

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
   * Translates this polygon to specified position.
   *
   * @param {black-engine~Vector} point Translation vector.
   * @return {black-engine~Polygon} This vertices.
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
   * Returns array of vertices.
   * 
   * @returns {Array<black-engine~Vector>}
   */
  get vertices() {
    return this.mVertices;
  }

  /**
   * Returns center points of this polygon.
   * @returns {black-engine~Vector}
   */
  get center() {
    return this.mCenter;  
  }

  // @ifdef DEBUG
  /**
   * String representation of this polygon.
   *
   * @ignore
   * @param {number=} [digits=2] Number of digits after float point.
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

  // @endif
}

/**
 * @ignore
 * @type {black-engine~Polygon}
 * @nocollapse
 */
Polygon.__cache = new Polygon();
