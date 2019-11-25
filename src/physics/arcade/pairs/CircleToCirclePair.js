import { Pair } from "./Pair";
import { ObjectPool } from "../../../utils/ObjectPool";

var pool = null;

/**
 * CircleToCirclePair is used to test collision within circles colliders.
 *
 * @cat physics.arcade.pairs
 * @extends black-engine~Pair
 */
export class CircleToCirclePair extends Pair {
  /**
   * Creates new instance of CircleToCirclePair.
   */
  constructor() {
    super();

    /**
     * Collider from body a. 
     * @public 
     * @type {black-engine~CircleCollider|null}
     */
    this.a = null;

    /**
     * Collider from body b. 
     * @public 
     * @type {black-engine~CircleCollider|null}
     */
    this.b = null;
  }

  /**
   * Setter
   *
   * @public
   *
   * @param {black-engine~CircleCollider} a  Pair circle collider
   * @param {black-engine~CircleCollider} b  Pair circle collider
   * @param {black-engine~RigidBody} bodyA   Pair body
   * @param {black-engine~RigidBody} bodyB   Pair body
   *
   * @return {Pair} This
   */
  set(a, b, bodyA, bodyB) {
    this.a = a;
    this.b = b;
    this.bodyA = bodyA;
    this.bodyB = bodyB;

    return this;
  }

  /**
   * @inheritDoc
   */
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

  static get pool() {
    if (pool === null)
      pool = new ObjectPool(CircleToCirclePair, 100);

    return pool;
  }
}
