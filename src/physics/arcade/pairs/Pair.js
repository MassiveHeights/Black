class Pair {
  constructor() {
    this.a = null;
    this.b = null;
    this.bodyA = null;
    this.bodyB = null;

    this.mInCollision = false;
    this.mInIsland = false;

    this.mNormalImpulse = 0;
    this.mTangentImpulse = 0;
    this.mPositionImpulse = 0;
    this.mSeparation = 0;

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
    return this.mInCollision;
  }

  preSolve() {
    const normalX = this.normal.x;
    const normalY = this.normal.y;
    const tangentX = -normalY;
    const tangentY = +normalX;
    const velocityA = this.bodyA.mVelocity;
    const velocityB = this.bodyB.mVelocity;
    const invMassA = this.bodyA.mInvMass;
    const invMassB = this.bodyB.mInvMass;

    const impulseX = this.mNormalImpulse * normalX + this.mTangentImpulse * tangentX;
    const impulseY = this.mNormalImpulse * normalY + this.mTangentImpulse * tangentY;

    velocityA.x -= impulseX * invMassA;
    velocityA.y -= impulseY * invMassA;

    velocityB.x += impulseX * invMassB;
    velocityB.y += impulseY * invMassB;

    this.mPositionImpulse = 0;
    this.mVelocityBias = 0;
    this.mSeparation = -this.overlap;

    if (!this.mInCollision) {
      this.mVelocityBias = 60 * this.overlap;
    }

    const relVelX = velocityB.x - velocityA.x;
    const relVelY = velocityB.y - velocityA.y;
    const relVel = relVelX * normalX + relVelY * normalY;

    if (relVel < -30) {
      this.mVelocityBias -= Math.min(this.bodyA.mBounce, this.bodyB.mBounce) * relVel;
    }
  }

  solveVelocity() {
    const normalX = this.normal.x;
    const normalY = this.normal.y;
    const tangentX = -normalY;
    const tangentY = +normalX;
    const velocityA = this.bodyA.mVelocity;
    const velocityB = this.bodyB.mVelocity;
    const invMassA = this.bodyA.mInvMass;
    const invMassB = this.bodyB.mInvMass;
    const k = 1 / (invMassA + invMassB);

    {
      const relVelX = velocityB.x - velocityA.x;
      const relVelY = velocityB.y - velocityA.y;

      const relVel = relVelX * normalX + relVelY * normalY;
      let lambda = -k * (relVel - this.mVelocityBias);

      const newImpulse = Math.max(this.mNormalImpulse + lambda, 0);
      lambda = newImpulse - this.mNormalImpulse;

      const impulseX = lambda * normalX;
      const impulseY = lambda * normalY;

      velocityA.x -= impulseX * invMassA;
      velocityA.y -= impulseY * invMassA;

      velocityB.x += impulseX * invMassB;
      velocityB.y += impulseY * invMassB;

      this.mNormalImpulse = newImpulse;
    }

    const relVelX = velocityB.x - velocityA.x;
    const relVelY = velocityB.y - velocityA.y;

    const relVel = relVelX * tangentX + relVelY * tangentY;
    let lambda = -k * relVel;

    const maxFriction = Math.min(this.bodyA.friction, this.bodyB.friction) * this.mNormalImpulse;
    const newImpulse = MathEx.clamp(this.mTangentImpulse + lambda, -maxFriction, maxFriction);
    lambda = newImpulse - this.mTangentImpulse;

    const impulseX = lambda * tangentX;
    const impulseY = lambda * tangentY;

    velocityA.x -= impulseX * invMassA;
    velocityA.y -= impulseY * invMassA;

    velocityB.x += impulseX * invMassB;
    velocityB.y += impulseY * invMassB;

    this.mTangentImpulse = newImpulse;
  }

  // todo change overlap for each iteration
  solvePosition() {
    const invMassA = this.bodyA.mInvMass;
    const invMassB = this.bodyB.mInvMass;
    const positionA = this.bodyA.mPosition;
    const positionB = this.bodyB.mPosition;
    const separation = this.mSeparation;
    const correction = Pair.baumgarte * MathEx.clamp(separation + Pair.slop, -Pair.maxCorrection, 0);
    let normalImpulse = -correction / (invMassA + invMassB);

    const impulsePrev = this.mPositionImpulse;
    this.mPositionImpulse = Math.max(impulsePrev + normalImpulse, 0);
    normalImpulse = this.mPositionImpulse - impulsePrev;

    const impulseX = normalImpulse * this.normal.x;
    const impulseY = normalImpulse * this.normal.y;

    positionA.x -= impulseX * invMassA;
    positionA.y -= impulseY * invMassA;

    positionB.x += impulseX * invMassB;
    positionB.y += impulseY * invMassB;

    return separation;
  }
}

Pair.slop = 0.15;
Pair.baumgarte = 0.2;
Pair.maxCorrection = 5;
