import { Vector } from "../../../geom/Vector";
import { MathEx } from "../../../math/MathEx";
import { Black } from "../../../Black";

/**
 * Updates to start sleep if velocities is lower, than sleep threshold.
 *
 * @ignore 
 * @type {number} 
 */
let timeToSleep = 5; //

/**
 * How many pixels colliders can overlap each other without resolve.
 *
 * @ignore 
 * @type {number} 
 */
let slop = 1;

/**
 * Position correction koefficient. Lower is softer and with less twitches.
 *
 * @ignore 
 * @type {number} 
 */
let baumgarte = 0.2;

/**
 * Scale koefficient to normalize physics in some local coordinates or different resolutions.
 *
 * @ignore 
 * @type {number} 
 */
let unitsPerMeter = 1;

/**
 * Maximum body speed to begin sleep process, if sleeping is enabled.
 *
 * @ignore 
 * @type {number} 
 */
let sleepThreshold = 0.1;

/**
 * Minimal relative velocity within two bodies, required for bounce effect.
 *
 * @ignore 
 * @type {number} 
 */
let bounceTreshhold = 1;

/**
 * Pair is used for narrow test, and resolve collision within two colliders.
 *
 * @cat physics.arcade.pairs
 */

export class Pair {
  /**
   * Creates new instance of Pair.
   */
  constructor() {
    /**
     * Collider from body a.
     * @public 
     * @type {Collider|null}
     */
    this.a = null;

    /**
     * Collider from body b.
     * @public 
     * @type {black-engine~Collider|null}
     */
    this.b = null;

    /**
     * Parent of collider a.
     * @public 
     * @type {black-engine~RigidBody|null}
     */
    this.bodyA = null;

    /**
     * Parent of collider b.
     * @public 
     * @type {black-engine~RigidBody|null}
     */
    this.bodyB = null;

    /**
     * Flag to indicate collision state.
     * @private 
     * @type {boolean}
     */
    this.mInCollision = false;

    /**
     * Flag to determine one from two bodies can move. invMass !== 0 and isSleeping === false.
     * @private 
     * @type {boolean}
     */
    this.mIsStatic = false;

    /**
     * Cached normal impulse to apply in next iteration or frame if collision still exist.
     * @private 
     * @type {number}
     */
    this.mNormalImpulse = 0;

    /**
     * Cached tangent impulse to apply in next iteration or frame if collision still exist.
     * @private 
     * @type {number}
     */
    this.mTangentImpulse = 0;

    /**
     * Position impulse cache to use within iterations.
     * @private 
     * @type {number}
     */
    this.mPositionImpulse = 0;

    /**
     * This colliders cached friction.
     * @private 
     * @type {number}
     */
    this.mFriction = 0;

    /**
     * This colliders cached bounce factor.
     * @private 
     * @type {number}
     */
    this.mBias = 0;

    /**
     * This colliders cached inverse mass sum.
     * @private 
     * @type {number}
     */
    this.mMass = 0;

    /**
     * Offset within the colliders on preSolve to correct overlap on each iteration.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mOffset = new Vector();

    /**
     * Normal collision direction from a to b.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mNormal = new Vector();

    /**
     * Positive number. Penetration within colliders.
     * @private 
     * @type {number}
     */
    this.mOverlap = 0;

    /**
     * Flag to indicate this pair needs refresh.
     * @private 
     * @type {boolean}
     */
    this.mChanged = false;
  }

  /**
   * Tests the collision state. Updates normal and overlap for solve.
   *
   * @public
   *
   * @return {boolean} This pair in collision flag
   */
  test() {
    return this.mInCollision;
  }

  /**
   * Prepares the solve properties depends on bodies physics characteristics and test result.
   *
   * @public
   *
   * @return {void}
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

    const bounceThreshold = Pair.bounceTreshhold * Pair.unitsPerMeter * Black.stage.mScaleX;
    this.mBias = relVel < -bounceThreshold ? -Math.max(this.bodyA.bounce, this.bodyB.bounce) * relVel : 0;
    this.mMass = 1 / (invMassA + invMassB);
    this.mFriction = Math.min(this.bodyA.friction, this.bodyB.friction);
    this.mPositionImpulse = 0;
  }

  /**
   * Updates the bodies velocities to solve collision.
   *
   * @public
   *
   * @return {void}
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
   * @return {void}
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
   * @param {black-engine~Collider} a Pair collider
   * @param {black-engine~Collider} b Pair collider
   *
   * @return {string} Pair unique id
   */
  static __id(a, b) {
    return a.mId > b.mId ? `${a.mId}&${b.mId}` : `${b.mId}&${a.mId}`;
  }

  /**
   * Updates to start sleep if velocities is lower, than sleep threshold.
   *
   * @type {number} 
   */
  static get timeToSleep() { return timeToSleep; }
  static set timeToSleep(value) { timeToSleep = value; }

  /**
   * How many pixels colliders can overlap each other without resolve.
   *  
   * @type {number} 
   */
  static get slop() { return slop; }
  static set slop(value) { slop = value; }

  /**
   * Position correction koefficient. Lower is softer and with less twitches.
   *  
   * @type {number} 
   */
  static get baumgarte() { return baumgarte; };
  static set baumgarte(value) { baumgarte = value; };

  /**
   * Scale koefficient to normalize physics in some local coordinates or different resolutions.
   *  
   * @type {number} 
   */
  static get unitsPerMeter() { return unitsPerMeter; }
  static set unitsPerMeter(value) { unitsPerMeter = value; }

  /**
   * Maximum body speed to begin sleep process, if sleeping is enabled.
   *  
   * @type {number} 
   */
  static get sleepThreshold() { return sleepThreshold; };
  static set sleepThreshold(value) { sleepThreshold = value; };

  /**
   * Minimal relative velocity within two bodies, required for bounce effect.
   *  
   * @type {number} 
   */
  static get bounceTreshhold() { return bounceTreshhold; }
  static set bounceTreshhold(value) { bounceTreshhold = value; }
}
