import { Pair } from "./Pair";
import { Vector } from "../../../geom/Vector";
import { MathEx } from "../../../math/MathEx";
import { ObjectPool } from "../../../utils/ObjectPool";

var pool = null;

/**
 * BoxToCirclePair is used to test collision within box - circle colliders.
 *
 * @cat physics.arcade.pairs
 * @extends black-engine~Pair
 */

export class BoxToCirclePair extends Pair {

  /**
   * Creates new instance of BoxToBoxPair.
   */
  constructor() {
    super();

    /**
     * Collider from body a. 
     * @public 
     * @type {BoxCollider|null}
     */
    this.a = null;

    /**
     * Collider from body a. 
     * @public 
     * @type {CircleCollider|null}
     */
    this.b = null;

    /** 
     * Cached half width of box in stage coordinates.
     * @private 
     * @type {number}
     */
    this.mBoxHalfWidth = 0;

    /** 
     * Cached half height of box in stage coordinates,
     * @private 
     * @type {number}
     */
    this.mBoxHalfHeight = 0;

    /**
     * Cached cos and sin from box game object world transformation without scale, to rotate.
     * @private 
     * @type {Vector}
     */
    this.mBoxRotate = new Vector();

    /**
     * Tmp point to rotate. 
     * @private 
     * @type {Vector}
     */
    this.mCircleCenter = new Vector();
  }

  /**
   * Assigns colliders and bodies to this pair.
   *
   * @public
   *
   * @param {BoxCollider} a     Pair box collider
   * @param {CircleCollider} b  Pair circle collider
   * @param {RigidBody} bodyA   Pair body
   * @param {RigidBody} bodyB   Pair body
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
   * Rotates point around anchor
   *
   * @private
   *
   * @return {void}
   */
  __rotate(point, anchorX, anchorY, cos, sin) {
    const x = point.x - anchorX;
    const y = point.y - anchorY;
    const tx = cos * x - sin * y;
    const ty = sin * x + cos * y;

    point.x = tx + anchorX;
    point.y = ty + anchorY;
  }

  /**
   * @inheritDoc
   */
  test() {
    const box = this.a;
    const circle = this.b;

    if (box.mChanged) {
      this.mChanged = true;
    }

    if (box.mMax.x < circle.mMin.x || box.mMin.x > circle.mMax.x ||
      box.mMax.y < circle.mMin.y || box.mMin.y > circle.mMax.y) {
      return this.mInCollision = false;
    }

    if (this.mChanged) {
      this.mChanged = false;
      const transformData = this.bodyA.mTransform.data;
      const scaleX = Math.sqrt(transformData[0] * transformData[0] + transformData[1] * transformData[1]);
      const scaleY = Math.sqrt(transformData[2] * transformData[2] + transformData[3] * transformData[3]);

      this.mBoxRotate.set(transformData[0] / scaleX, transformData[1] / scaleX);
      this.mBoxHalfWidth = box.mRect.width / 2 * scaleX;
      this.mBoxHalfHeight = box.mRect.height / 2 * scaleY;
    }

    const boxRotate = this.mBoxRotate;
    const normal = this.mNormal;
    const circleCenter = this.mCircleCenter.copyFrom(circle.mCenter);
    let hw = this.mBoxHalfWidth;
    let hh = this.mBoxHalfHeight;

    const rotated = boxRotate.y !== 0;

    if (rotated) {
      this.__rotate(circleCenter, box.mCenter.x, box.mCenter.y, boxRotate.x, -boxRotate.y);
    }

    const dx = circleCenter.x - box.mCenter.x;
    const dy = circleCenter.y - box.mCenter.y;

    if (dx === 0 && dy === 0) {
      this.mOverlap = circle.mRadius + hw;
      normal.set(-1, 0);

      return this.mInCollision = true;
    }

    let closestX = MathEx.clamp(dx, -hw, hw);
    let closestY = MathEx.clamp(dy, -hh, hh);
    const inside = dx === closestX && dy === closestY;

    if (inside) {
      if (Math.abs(dx) > Math.abs(dy)) {
        closestX = closestX > 0 ? hw : -hw;
      } else {
        closestY = closestY > 0 ? hh : -hh;
      }
    }

    const normalX = dx - closestX;
    const normalY = dy - closestY;
    const sqLength = normalX * normalX + normalY * normalY;
    const r = circle.mRadius;

    if (sqLength > r * r && !inside) {
      return this.mInCollision = false;
    }

    if (sqLength === 0) {
      this.mOverlap = r;
      normal.set(0, 1);
    } else {
      const d = Math.sqrt(sqLength);
      this.mOverlap = r - d;
      inside ? normal.set(-normalX / d, -normalY / d) : normal.set(normalX / d, normalY / d);
    }

    if (rotated) {
      this.__rotate(normal, 0, 0, boxRotate.x, boxRotate.y);
    }

    return this.mInCollision = true;
  }

  static get pool() {
    if (pool === null)
      pool = new ObjectPool(BoxToCirclePair, 100);

    return pool;
  }
}