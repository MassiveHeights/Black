class CirclesPair extends Pair {
  test() {
    const bodyA = this.bodyA;
    const bodyB = this.bodyB;
    const a = this.a;
    const b = this.b;
    const offsetX = bodyB.position.x + b.position.x - bodyA.position.x - a.position.x;
    const offsetY = bodyB.position.y + b.position.y - bodyA.position.y - a.position.y;
    const totalRadius = a.radius + b.radius;

    if (offsetX === 0 && offsetY === 0) {
      this.overlap = totalRadius;
      this.normal.set(1, 0);
      return this.isColliding = true;
    }

    const totalRadiusSq = totalRadius * totalRadius;
    const distanceSq = offsetX * offsetX + offsetY * offsetY;

    if (distanceSq > totalRadiusSq) {
      return this.isColliding = false;
    }

    const dist = Math.sqrt(distanceSq);
    this.overlap = totalRadius - dist;
    this.normal.set(offsetX / dist, offsetY / dist);

    return this.isColliding = true;
  }
}

CirclesPair.pool = new ObjectPool(CirclesPair);
CirclesPair.pool.capacity = 1000;
