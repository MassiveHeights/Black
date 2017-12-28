/* @echo EXPORT */
class BoxCollider extends Collider {
  constructor(x, y, width, height) {
    super();

    this.mRect = new Rectangle(x, y, width, height);
  }

  containsPoint(point) {
    return this.mRect.containsXY(point.x, point.y);
  }
}