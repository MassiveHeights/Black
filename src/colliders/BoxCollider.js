/* @echo EXPORT */
class BoxCollider extends Collider {
  constructor(x, y, width, height) {
    super();

    this.mRect = new Rectangle(x, y, width, height);
  }

  containsPoint(point) {
    if (this.gameObject != null) {
      let matrix = this.gameObject.worldTransformation;

      let transformed = matrix.transformRect(this.mRect);
      return transformed.containsXY(point.x, point.y);
    }

    return point.x >= this.mRect.x && point.x <= this.mRect.x + this.mRect.width && point.y >= this.mRect.y && point.y <= this.mRect.y + this.mRect.height;
  }
}