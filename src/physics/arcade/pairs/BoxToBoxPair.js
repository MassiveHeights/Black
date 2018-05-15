class BoxesPair extends Pair {
  constructor() {
    super();

    const projections = [];

    for (let i = 0; i < 8; i++) {
      projections.push(new Projection());
    }

    this.mPprojections = projections;
  }

  set(a, b, bodyA, bodyB) {
    const projections = this.mPprojections;

    for (let i = 0, j = 0; i < 4; i += 2, j += 1) {
      projections[i].set(a.points, b.points, a.normals[j]);
      projections[i + 1].set(a.points, b.points, b.normals[j]);
    }

    return super.set(a, b, bodyA, bodyB);
  }

  refreshProjectionsRanges() {
    const projections = this.mPprojections;

    for (let i = 0; i < 4; i++) {
      projections[i].refresh();
    }
  }

  test() {
    const projections = this.mPprojections;
    const normal = this.normal;
    const bodyA = this.bodyA;
    const bodyB = this.bodyB;
    const a = this.a;
    const b = this.b;
    const offsetX = bodyB.position.x - bodyA.position.x;
    const offsetY = bodyB.position.y - bodyA.position.y;

    this.overlap = Number.MAX_VALUE;
    (a.changed || b.changed) && this.refreshProjectionsRanges();

    for (let i = 0; i < 4; i++) {
      const projection = projections[i];
      projection.offset = projection.axis.x * offsetX + projection.axis.y * offsetY;
      const minA = projection.rangeA.min;
      const maxA = projection.rangeA.max;
      const minB = projection.rangeB.min + projection.offset;
      const maxB = projection.rangeB.max + projection.offset;

      if (minA > maxB || minB > maxA) {
        return this.isColliding = false;
      }
    }

    for (let i = 0; i < 4; i++) {
      const projection = projections[i];
      const minA = projection.rangeA.min;
      const maxA = projection.rangeA.max;
      const minB = projection.rangeB.min + projection.offset;
      const maxB = projection.rangeB.max + projection.offset;

      const optionA = maxA - minB;
      const optionB = maxB - minA;
      let overlap = optionA < optionB ? optionA : -optionB;

      if (minA < minB && maxA < maxB) {
        overlap = maxA - minB;
      } else if (maxA > maxB) {
        overlap = minA - maxB;
      }

      const absOverlap = Math.abs(overlap);

      if (absOverlap < this.overlap) {
        this.overlap = absOverlap;
        normal.copyFrom(projection.axis);
        overlap < 0 && normal.multiplyScalar(-1);
      }
    }

    return this.isColliding = true;
  }
}

BoxesPair.pool = new ObjectPool(BoxesPair);
BoxesPair.pool.capacity = 1000;
