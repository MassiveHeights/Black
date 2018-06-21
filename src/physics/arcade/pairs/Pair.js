/**
 * Pair is used for narrow test, and resolve collision within two colliders.
 *
 * @cat physics.arcade.pairs
 */
/* @echo EXPORT */
class Pair {
  /**
   * Creates new instance of Pair.
   */
  constructor() {
    /** @public @type {Collider|null} Collider from body A */
    this.a = null;

    /** @public @type {Collider|null} Collider from body B */
    this.b = null;

    /** @public @type {RigidBody|null} Parent of collider a */
    this.bodyA = null;

    /** @public @type {RigidBody|null} Parent of collider b */
    this.bodyB = null;

    /** @public @type {boolean} Flag to indicate collision state */
    this.mInCollision = false;

    /** @public @type {boolean} Flag to determine one from two bodies can move. invMass !== 0 and isSleeping === false */
    this.mIsStatic = false;

    /** @private @type {number} Cached normal impulse to apply in next iteration or frame if collision still exist */
    this.mNormalImpulse = 0;

    /** @private @type {number} Cached tangent impulse to apply in next iteration or frame if collision still exist */
    this.mTangentImpulse = 0;

    /** @private @type {number} Position impulse cache to use within iterations */
    this.mPositionImpulse = 0;

    /** @private @type {number} This colliders cached friction */
    this.mFriction = 0;

    /** @private @type {number} This colliders cached bounce factor */
    this.mBias = 0;

    /** @private @type {number} This colliders cached inverse mass sum */
    this.mMass = 0;

    /** @private @type {Vector} Offset within the colliders on preSolve to correct overlap on each iteration */
    this.mOffset = new Vector();

    /** @public @type {Vector} Normal collision direction from a to b */
    this.mNormal = new Vector();

    /** @public @type {number} Positive number. Penetration within colliders */
    this.mOverlap = 0;

    /** @public @type {boolean} Flag to indicate this pair needs refresh */
    this.mChanged = false;
  }

  /**
   * Tests the collision state. Updates normal and overlap for solve.
   *
   * @public
   *
   * return {boolean} This pair in collision flag
   */
  test() {
    return this.mInCollision;
  }

  /**
   * Prepares the solve properties depends on bodies physics characteristics and test result.
   *
   * @public
   *
   * return {void}
   */
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

    this.mBias = relVel < -Pair.bounceTrashhold ? -Math.max(this.bodyA.bounce, this.bodyB.bounce) * relVel : 0;
    this.mMass = 1 / (invMassA + invMassB);
    this.mFriction = Math.min(this.bodyA.friction, this.bodyB.friction);
    this.mPositionImpulse = 0;
  }

  /**
   * Updates the bodies velocities to solve collision.
   *
   * @public
   *
   * return {void}
   */
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

  /**
   * Updates the bodies positions to solve collision.
   *
   * @public
   *
   * return {void}
   */
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

    if (correction <= 0)
      return;

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

  /**
   * Generates pair id.
   *
   * @public
   * @param {Collider} a Pair collider
   * @param {Collider} b Pair collider
   *
   * return {String} Pair unique id
   */
  static __id(a, b) {
    return a.mId > b.mId ? `${a.mId}&${b.mId}` : `${b.mId}&${a.mId}`;
  }
}

Pair.timeToSleep = 5; // 30 updates to start sleep if velocities is lower threshold
Pair.slop = 0.5;
Pair.baumgarte = 0.2;
Pair.unitsPerMeter = 1;
Pair.sleepThreshold = 0.1 * Pair.unitsPerMeter;
Pair.bounceTrashhold = Pair.unitsPerMeter;
