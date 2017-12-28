/* @echo EXPORT */
class CircleCollider extends Collider {
  constructor(x, y, radius) {
    super();

    this.mX = x;
    this.mY = y;
    this.mRadius = radius;

    this.mCircle = new Circle(x, y, radius);
  }

  containsPoint(point) {
    if (this.gameObject != null) { 
      let pos = new Vector(this.mX, this.mY);
      
      if (pos.distance(point) <= this.mRadius)
        return true;
    }

    return false;
  }
}