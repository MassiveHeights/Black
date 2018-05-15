class BoxCirclePair extends Pair {
  constructor() {
    super();

    this.mBoxHalfWidth = 0;
    this.mBoxHalfHeight = 0;
    this.mBoxCos = 0;
    this.mBoxSin = 0;
    this.mCircleCenter = new Phaser.Point();
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
    const normal = this.normal;
    const boxBody = this.bodyA;
    const circleBody = this.bodyB;
    const box = this.a;
    const circle = this.b;

    const circleCenter = this.mCircleCenter;
    const boxCenterX = boxBody.position.x + box.center.x;
    const boxCenterY = boxBody.position.y + box.center.y;

    let boxCos = this.mBoxCos;
    let boxSin = this.mBoxSin;
    let hw = this.mBoxHalfWidth;
    let hh = this.mBoxHalfHeight;

    if (box.changed) {
      boxCos = this.mBoxCos = Math.cos(boxBody.sprite.worldRotation);
      boxSin = this.mBoxSin = Math.sin(boxBody.sprite.worldRotation);
      hw = this.mBoxHalfWidth = box.localRect.width * boxBody.transform.a / boxCos / 2;
      hh = this.mBoxHalfHeight = box.localRect.height * boxBody.transform.d / boxCos / 2;
    }

    circleCenter.x = circleBody.position.x + circle.position.x;
    circleCenter.y = circleBody.position.y + circle.position.y;
    BoxCirclePair.__rotate(circleCenter, boxCenterX, boxCenterY, boxCos, -boxSin);

    const dx = circleCenter.x - boxCenterX;
    const dy = circleCenter.y - boxCenterY;

    if (dx === 0 && dy === 0) {
      this.overlap = circle.radius + hw;
      normal.set(-1, 0);
      return this.isColliding = true;
    }

    let closestX = Phaser.Math.clamp(dx, -hw, hw);
    let closestY = Phaser.Math.clamp(dy, -hh, hh);
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
    const r = circle.radius;

    if (sqLength > r * r && !inside) {
      return this.isColliding = false;
    }

    const d = Math.sqrt(sqLength);
    this.overlap = r - d;
    inside ? normal.set(-normalX / d, -normalY / d) : normal.set(normalX / d, normalY / d);
    BoxCirclePair.__rotate(normal, 0, 0, boxCos, boxSin);

    return this.isColliding = true;
  }
}

BoxCirclePair.pool = new ObjectPool(BoxCirclePair);
BoxCirclePair.pool.capacity = 1000;
