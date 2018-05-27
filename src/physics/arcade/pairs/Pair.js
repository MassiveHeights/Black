class Pair {
  constructor() {
    this.a = null;
    this.b = null;
    this.bodyA = null;
    this.bodyB = null;

    this.mInCollision = false;
    this.mInCollisionPrev = false;
    this.mNormalImpulse = 0;
    this.mTangentImpulse = 0;
    this.mPositionImpulse = 0;
    this.mFriction = 0;
    this.mBias = 0;
    this.mMass = 0;
    this.mOffset = new Vector();

    this.mNormal = new Vector();
    this.mOverlap = 0;
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
    const normalX = this.mNormal.x;
    const normalY = this.mNormal.y;
    const tangentX = -normalY;
    const tangentY = +normalX;
    const positionA = this.bodyA.mPosition;
    const positionB = this.bodyB.mPosition;
    const velocityA = this.bodyA.mVelocity;
    const velocityB = this.bodyB.mVelocity;
    const invMassA = this.bodyA.mInvMass;
    const invMassB = this.bodyB.mInvMass;
    const offset = this.mOffset;

    const impulseX = this.mNormalImpulse * normalX + this.mTangentImpulse * tangentX;
    const impulseY = this.mNormalImpulse * normalY + this.mTangentImpulse * tangentY;

    offset.x = positionB.x - positionA.x;
    offset.y = positionB.y - positionA.y;

    velocityA.x -= impulseX * invMassA;
    velocityA.y -= impulseY * invMassA;

    velocityB.x += impulseX * invMassB;
    velocityB.y += impulseY * invMassB;

    const relVelX = velocityB.x - velocityA.x;
    const relVelY = velocityB.y - velocityA.y;
    const relVel = relVelX * normalX + relVelY * normalY;

    this.mBias = relVel < -30 ? -Math.max(this.bodyA.bounce, this.bodyB.bounce) * relVel : 0;
    this.mMass = 1 / (invMassA + invMassB);
    this.mFriction = Math.min(this.bodyA.friction, this.bodyB.friction);
    this.mPositionImpulse = 0;
  }

  solveVelocity() {
    const normalX = this.mNormal.x;
    const normalY = this.mNormal.y;
    const tangentX = -normalY;
    const tangentY = +normalX;
    const velocityA = this.bodyA.mVelocity;
    const velocityB = this.bodyB.mVelocity;
    const invMassA = this.bodyA.mInvMass;
    const invMassB = this.bodyB.mInvMass;

    {
      const relVelX = velocityB.x - velocityA.x;
      const relVelY = velocityB.y - velocityA.y;
      const relVel = relVelX * normalX + relVelY * normalY;
      let impulse = -(relVel - this.mBias) * this.mMass;
      const newImpulse = Math.max(this.mNormalImpulse + impulse, 0);
      impulse = newImpulse - this.mNormalImpulse;
      this.mNormalImpulse = newImpulse;

      const impulseX = impulse * normalX;
      const impulseY = impulse * normalY;

      velocityA.x -= impulseX * invMassA;
      velocityA.y -= impulseY * invMassA;

      velocityB.x += impulseX * invMassB;
      velocityB.y += impulseY * invMassB;
    }

    {
      const relVelX = velocityB.x - velocityA.x;
      const relVelY = velocityB.y - velocityA.y;
      const relVel = relVelX * tangentX + relVelY * tangentY;
      let impulse = -relVel * this.mMass;
      const maxFriction = this.mFriction * this.mNormalImpulse;
      const newImpulse = MathEx.clamp(this.mTangentImpulse + impulse, -maxFriction, maxFriction);
      impulse = newImpulse - this.mTangentImpulse;
      this.mTangentImpulse = newImpulse;

      const impulseX = impulse * tangentX;
      const impulseY = impulse * tangentY;

      velocityA.x -= impulseX * invMassA;
      velocityA.y -= impulseY * invMassA;

      velocityB.x += impulseX * invMassB;
      velocityB.y += impulseY * invMassB;
    }
  }

  solvePosition() {
    const normalX = this.mNormal.x;
    const normalY = this.mNormal.y;
    const invMassA = this.bodyA.mInvMass;
    const invMassB = this.bodyB.mInvMass;
    const positionA = this.bodyA.mPosition;
    const positionB = this.bodyB.mPosition;
    const offset = this.mOffset;

    const dx = offset.x - positionB.x + positionA.x;
    const dy = offset.y - positionB.y + positionA.y;

    const overlap = this.mOverlap + (dx * normalX + dy * normalY);
    const correction = (overlap - Pair.slop) * Pair.baumgarte;

    if (correction <= 0) return;

    let normalImpulse = correction * this.mMass;
    const impulsePrev = this.mPositionImpulse;
    this.mPositionImpulse = Math.max(impulsePrev + normalImpulse, 0);
    normalImpulse = this.mPositionImpulse - impulsePrev;

    const impulseX = normalImpulse * normalX;
    const impulseY = normalImpulse * normalY;

    positionA.x -= impulseX * invMassA;
    positionA.y -= impulseY * invMassA;

    positionB.x += impulseX * invMassB;
    positionB.y += impulseY * invMassB;
  }
}

Pair.slop = 0.15;
Pair.baumgarte = 0.8;
