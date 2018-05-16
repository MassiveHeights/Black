class Pair {
  constructor() {
    this.a = null;
    this.b = null;
    this.bodyA = null;
    this.bodyB = null;

    this.isColliding = true;
    this.normal = new Vector();
    this.overlap = 0;
  }

  set(a, b, bodyA, bodyB) {
    this.a = a;
    this.b = b;
    this.bodyA = bodyA;
    this.bodyB = bodyB;

    return this;
  }

  test() {
    return this.isColliding;
  }

  static integrate(impulse, dx, dy) {
    const dist = impulse.x * impulse.x + impulse.y * impulse.y;
    const delta = dist / (dx * dx + dy * dy + dist) - 0.5;

    if (delta) {
      dx *= delta;
      dy *= delta;
    }

    impulse.x += dx;
    impulse.y += dy;
  }

  solve() {
    const bodyA = this.bodyA;
    const bodyB = this.bodyB;
    const normal = this.normal;
    const overlap = this.overlap;
    const posA = bodyA.position;
    const posB = bodyB.position;
    const prevPosA = bodyA.prevPosition;
    const prevPosB = bodyB.prevPosition;
    const overlapX = normal.x * overlap;
    const overlapY = normal.y * overlap;
    const relVelX = (prevPosB.x - posB.x) - (prevPosA.x - posA.x);
    const relVelY = (prevPosB.y - posB.y) - (prevPosA.y - posA.y);
    const tangentX = -normal.y;
    const tangentY = +normal.x;
    const tangentVel = relVelX * tangentX + relVelY * tangentY;
    const tangentVelX = tangentX * tangentVel;
    const tangentVelY = tangentY * tangentVel;
    const totalMass = bodyA.mass + bodyB.mass;
    const massA = bodyA.mass / totalMass;
    const massB = bodyB.mass / totalMass;
    const friction = Math.min(bodyA.friction, bodyB.friction);

    !bodyA.isStatic && Pair.integrate(bodyA.correction,
      overlapX * massA + tangentVelX * friction * massA,
      overlapY * massA + tangentVelY * friction * massA);

    !bodyB.isStatic && Pair.integrate(bodyB.correction,
      -(overlapX * massB + tangentVelX * friction * massB),
      -(overlapY * massB + tangentVelY * friction * massB));
  }
}
