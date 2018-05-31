class BoxToCirclePair extends Pair {
  constructor() {
    super();

    this.mBoxHalfWidth = 0;
    this.mBoxHalfHeight = 0;
    this.mBoxRotate = new Vector();
    this.mChanged = false;
  }

  static __rotate(point, anchorX, anchorY, cos, sin) {
    const x = point.x - anchorX;
    const y = point.y - anchorY;
    const tx = cos * x - sin * y;
    const ty = sin * x + cos * y;

    point.x = tx + anchorX;
    point.y = ty + anchorY;
  }

  test() {
    const box = this.a;
    const circle = this.b;

    if (box.mChanged) {
      this.mChanged = true;
    }

    if (box.mMax.x < circle.mMin.x || box.mMin.x > circle.mMax.x ||
      box.mMax.y < circle.mMin.y || box.mMin.y > circle.mMax.y)
    {
      return this.mInCollision = false;
    }

    if (this.mChanged) {
      const transform = box.gameObject.worldTransformation;
      const scale = Math.sqrt(transform.data[0] * transform.data[0] + transform.data[1] * transform.data[1]);

      this.mBoxRotate.set(transform.data[0] / scale, transform.data[1] / scale);
      this.mBoxHalfWidth = box.mRect.width / 2 * scale;
      this.mBoxHalfHeight = box.mRect.height / 2 * scale;
    }

    const boxRotate = this.mBoxRotate;
    const normal = this.mNormal;
    let hw = this.mBoxHalfWidth;
    let hh = this.mBoxHalfHeight;

    const rotated = boxRotate.y !== 0;

    if (rotated) {
      BoxToCirclePair.__rotate(circle.mCenter, box.mCenter.x, box.mCenter.y, boxRotate.x, -boxRotate.y);
    }

    const dx = circle.mCenter.x - box.mCenter.x;
    const dy = circle.mCenter.y - box.mCenter.y;

    if (dx === 0 && dy === 0) {
      this.mOverlap = circle.mRadius + hw;
      normal.set(-1, 0);

      return this.mInCollision = true;
    }

    let closestX = MathEx.clamp(dx, -hw, hw);
    let closestY = MathEx.clamp(dy, -hh, hh);
    const inside = dx === closestX && dy === closestY;

    if (inside) {
      if (Math.abs(dx) > Math.abs(dy)) {
        closestX = closestX > 0 ? hw : -hw;
      } else {
        closestY = closestY > 0 ? hh : -hh;
      }
    }

    const normalX = dx - closestX;
    const normalY = dy - closestY;
    const sqLength = normalX * normalX + normalY * normalY;
    const r = circle.mRadius;

    if (sqLength > r * r && !inside) {
      return this.mInCollision = false;
    }

    if (sqLength === 0) {
      this.mOverlap = r;
      normal.set(0, 1);
    } else {
      const d = Math.sqrt(sqLength);
      this.mOverlap = r - d;
      inside ? normal.set(-normalX / d, -normalY / d) : normal.set(normalX / d, normalY / d);
    }

    if (rotated) {
      BoxToCirclePair.__rotate(normal, 0, 0, boxRotate.x, boxRotate.y);
    }

    return this.mInCollision = true;
  }
}

BoxToCirclePair.pool = new ObjectPool(BoxToCirclePair);
BoxToCirclePair.pool.capacity = 1000;
