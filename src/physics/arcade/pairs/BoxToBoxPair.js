import { Pair } from "./Pair";
import { ObjectPool } from "../../../utils/ObjectPool";
import { Projection } from "../helpers/Projection";

var pool = null;

/**
 * BoxToBoxPair is used to test collision within boxes
 *
 * @cat physics.arcade.pairs
 * @extends black-engine~Pair
 */
export class BoxToBoxPair extends Pair {
  /**
   * Creates new instance of BoxToBoxPair.
   */
  constructor() {
    super();

    /**
     * Collider from body a.
     * 
     * @public 
     * @type {black-engine~BoxCollider|null}
     */
    this.a = null;

    /**
     * Collider from body b. 
     * 
     * @public 
     * @type {black-engine~BoxCollider|null}
     */
    this.b = null;

    const projections = [];

    for (let i = 0; i < 4; i++) {
      projections.push(new Projection());
    }

    /**
     * Projection keeps range of projected vertices. For each normal from both the colliders.
     * @private 
     * @type {Array<black-engine~Projection>}
     */
    this.mProjections = projections;
  }

  /**
   * Updates this pair with a new given colliders and bodies.
   *
   * @public
   *
   * @param {black-engine~BoxCollider} a   Pair collider
   * @param {black-engine~BoxCollider} b   Pair collider
   * @param {black-engine~RigidBody} bodyA Pair body
   * @param {black-engine~RigidBody} bodyB Pair body
   *
   * @return {Pair} This
   */
  set(a, b, bodyA, bodyB) {
    this.a = a;
    this.b = b;
    this.bodyA = bodyA;
    this.bodyB = bodyB;

    const projections = this.mProjections;

    for (let i = 0, j = 0; i < 4; i += 2, j += 1) {
      projections[i].set(a.mVertices, b.mVertices, a.mNormals[j]);
      projections[i + 1].set(a.mVertices, b.mVertices, b.mNormals[j]);
    }

    return this;
  }

  /**
   * Refreshes projections.
   *
   * @private
   *
   * @return {void}
   */
  __refreshProjectionsRanges() {
    const projections = this.mProjections;

    for (let i = 0; i < 4; i++) {
      projections[i].refresh();
    }
  }

  /**
   * @inheritDoc
   */
  test() {
    const a = this.a;
    const b = this.b;

    if (a.mChanged || b.mChanged) {
      this.mChanged = true;
    }

    if (a.mMax.x < b.mMin.x || a.mMin.x > b.mMax.x || a.mMax.y < b.mMin.y || a.mMin.y > b.mMax.y) {
      return this.mInCollision = false;
    }

    const projections = this.mProjections;
    const normal = this.mNormal;
    const offsetX = this.bodyB.mPosition.x - this.bodyA.mPosition.x;
    const offsetY = this.bodyB.mPosition.y - this.bodyA.mPosition.y;

    if (this.mChanged) {
      this.mChanged = false;
      this.__refreshProjectionsRanges();
    }

    this.mOverlap = Number.MAX_VALUE;

    for (let i = 0; i < 4; i++) {
      const projection = projections[i];
      projection.offset = projection.axis.x * offsetX + projection.axis.y * offsetY;
      const minA = projection.rangeA.min;
      const maxA = projection.rangeA.max;
      const minB = projection.rangeB.min + projection.offset;
      const maxB = projection.rangeB.max + projection.offset;

      if (minA > maxB || minB > maxA) {
        return this.mInCollision = false;
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

      if (absOverlap < this.mOverlap) {
        this.mOverlap = absOverlap;
        normal.copyFrom(projection.axis);
        overlap < 0 && normal.multiplyScalar(-1);
      }
    }

    return this.mInCollision = true;
  }

  static get pool() {
    if (pool === null)
      pool = new ObjectPool(BoxToBoxPair, 100);

    return pool;
  }
}