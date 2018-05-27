class CircleToCirclePair extends Pair {
  test() {
    const a = this.a;
    const b = this.b;
    const offsetX = b.mCenter.x - a.mCenter.x;
    const offsetY = b.mCenter.y - a.mCenter.y;
    const totalRadius = a.mRadius + b.mRadius;

    if (offsetX === 0 && offsetY === 0) {
      this.mOverlap = totalRadius;
      this.mNormal.set(1, 0);

      return this.mInCollision = true;
    }

    const totalRadiusSq = totalRadius * totalRadius;
    const distanceSq = offsetX * offsetX + offsetY * offsetY;

    if (distanceSq > totalRadiusSq) {
      return this.mInCollision = false;
    }

    const dist = Math.sqrt(distanceSq);
    this.mOverlap = totalRadius - dist;
    this.mNormal.set(offsetX / dist, offsetY / dist);

    return this.mInCollision = true;
  }
}

CircleToCirclePair.pool = new ObjectPool(CircleToCirclePair);
CircleToCirclePair.pool.capacity = 1000;
