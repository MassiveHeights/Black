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
      let matrix = this.gameObject.worldTransformation;

      let pos = matrix.transformXY(this.mX, this.mY);
      if (pos.distance(point) <= this.mRadius)
        return true;
      // let transformed = this.mCircle.clone().transform(matrix);
      // console.log(transformed.contains(point));
      
      // return transformed.contains(point);
    }

    return false;
  }
}