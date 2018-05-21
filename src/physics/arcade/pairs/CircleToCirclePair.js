class CircleToCirclePair extends Pair {
  test() {
    const bodyA = this.bodyA;
    const bodyB = this.bodyB;
    const a = this.a;
    const b = this.b;
    const offsetX = bodyB.mPosition.x + b.position.x - bodyA.mPosition.x - a.position.x;
    const offsetY = bodyB.mPosition.y + b.position.y - bodyA.mPosition.y - a.position.y;
    const totalRadius = a.radius + b.radius;

    if (offsetX === 0 && offsetY === 0) {
      this.overlap = totalRadius;
      this.normal.set(1, 0);
      return this.mInCollision = true;
    }

    const totalRadiusSq = totalRadius * totalRadius;
    const distanceSq = offsetX * offsetX + offsetY * offsetY;

    if (distanceSq > totalRadiusSq) {
      return this.mInCollision = false;
    }

    const dist = Math.sqrt(distanceSq);
    this.overlap = totalRadius - dist;
    this.normal.set(offsetX / dist, offsetY / dist);

    return this.mInCollision = true;
  }
}

CircleToCirclePair.pool = new ObjectPool(CircleToCirclePair);
CircleToCirclePair.pool.capacity = 1000;
