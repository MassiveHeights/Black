import { Component } from "../core/Component";
import { BoxCollider } from "../colliders/BoxCollider";
import { Vector } from "../geom/Vector";
import { Matrix } from "../geom/Matrix";
import { Black } from "../Black";
import { DisplayObject } from "../display/DisplayObject";

/**
 * RigidBody is used to describe physics properties of game object colliders
 *
 * @cat physics
 * @extends black-engine~Component
 */
export class RigidBody extends Component {
  /**
   * Creates new instance of RigidBody.
   */
  constructor() {
    super();

    /** 
     * Default collider. Used in case no any custom colliders provided by user.
     * @private 
     * @type {black-engine~BoxCollider}
     */
    this.mCollider = new BoxCollider(0, 0, 0, 0);

    /** 
     * For internal usage. To mark this body is in island.
     * @private 
     * @type {boolean}
     */
    this.mInGroup = false;

    /**
     * Flag to mark this body is in rest.
     * @private 
     * @type {boolean}
     */
    this.mIsSleeping = false;

    /** 
     * Internal counter. How many times (updates) this body has velocity lower than `Pair.sleepThreshold`.
     * @private 
     * @type {number}
     */
    this.mSleepTime = 0;

    /** 
     * All colliding pairs this body participates in.
     * @private 
     * @type {Array<black-engine~Pair>} 
     */
    this.mContacts = [];

    /**
     * Game object pivot. To track changes and update default collider if needed.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mPivot = new Vector(Number.MAX_VALUE);

    /**  
     * Game bounds position. To track changes and update this position, if object was moved without physics.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mCachedPosition = new Vector();

    /** 
     * All pairs this body participates in.
     * @public 
     * @type {Array<black-engine~Pair>}
     */
    this.mPairs = [];

    /** 
     * Flag to indicate immovable body.
     * @private 
     * @type {boolean}
     */
    this.mIsStatic = false;

    /** 
     * This position in stage coordinates.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mPosition = new Vector();

    /** 
     * This velocity to integrate.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mVelocity = new Vector();

    /** 
     * Force accumulator.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mForce = new Vector();

    /** 
     * Game object transform. To track changes and update this colliders.
     * @private 
     * @type {black-engine~Matrix}
     */
    this.mTransform = new Matrix(Number.MAX_VALUE);

    /**
     * Cached mass
     * @private 
     * @type {number}
     */
    this.mMass = 1;

    /**
     * Inverted mass or zero if body is static. 
     * 
     * @private
     * @ignore 
     * @type {number} 
     */
    this.mInvMass = 1;

    /** 
     * Velocity damper.
     * @public 
     * @type {number}
     */
    this.frictionAir = 0.01;

    /**
     * Friction for collision solving.
     * @public 
     * @type {number}
     */
    this.friction = 0.1;

    /**
     * Bounce for collision solving. 
     * @public 
     * @type {number}
     */
    this.bounce = 0.1;
  }

  /**
   * Returns this cached mass.
   *
   * @return {number}
   */
  get mass() {
    return this.mMass;
  }

  /**
   * Sets the mass of this body.
   *
   * @param {number} v Mass to set.
   * @return {void}
   */
  set mass(v) {
    this.mMass = v;

    if (v === 0 || this.mIsStatic) {
      this.mInvMass = 0;
    } else {
      this.mInvMass = 1 / v;
    }
  }

  /**
   * Returns this static indicator.
   *
   * @return {boolean}
   */
  get isStatic() {
    return this.mIsStatic;
  }

  /**
   * Sets this body movable state. Refresh inverted mass
   *
   * @param {boolean} v Value to set.
   *
   * @return {void}
   */
  set isStatic(v) {
    this.mIsStatic = v;
    this.mass = this.mMass;
  }

  /**
   * Sets the global position x of this body.
   *
   * @param {number} v Position to set.
   * @return {void}
   */
  set x(v) {
    this.mPosition.x = v;
  }

  /**
   * Returns this position x.
   *
   * @return {number}
   */
  get x() {
    return this.mPosition.x;
  }

  /**
   * Sets the global position y of this body.
   *
   * @param {number} v Position to set.
   * @return {void}
   */
  set y(v) {
    this.mPosition.y = v;
  }

  /**
   * Returns this position y.
   *
   * @return {number}
   */
  get y() {
    return this.mPosition.y;
  }

  /**
   * Sets the force x of this body.
   *
   * @param {number} v Force to set.
   * @return {void}
   */
  set forceX(v) {
    this.mIsSleeping = false;
    this.mForce.x = v;
  }

  /**
   * Returns this force x.
   *
   * @return {number}
   */
  get forceX() {
    return this.mForce.x;
  }

  /**
   * Sets the force y of this body.
   *
   * @param {number} v Force to set.
   * @return {void}
   */
  set forceY(v) {
    this.mIsSleeping = false;
    this.mForce.y = v;
  }

  /**
   * Returns this force y.
   *
   * @return {number}
   */
  get forceY() {
    return this.mForce.y;
  }

  /**
   * Sets the velocity x of this body.
   *
   * @param {number} v Velocity to set.
   * @return {void}
   */
  set velocityX(v) {
    this.mVelocity.x = v;
  }

  /**
   * Returns this velocity x.
   *
   * @return {number}
   */
  get velocityX() {
    return this.mVelocity.x;
  }

  /**
   * Sets the velocity y of this body.
   *
   * @param {number} v Velocity to set.
   * @return {void}
   */
  set velocityY(v) {
    this.mVelocity.y = v;
  }

  /**
   * Returns this velocity y.
   *
   * @return {number}
   */
  get velocityY() {
    return this.mVelocity.y;
  }

  /**
   * Updates game object position, colliders
   *
   * @public
   * @return {void}
   */
  update() {
    const gameObject = this.gameObject;
    const colliders = gameObject.mCollidersCache;
    const collider = this.mCollider;
    const position = this.mPosition;
    const wt = gameObject.worldTransformation;
    const wtData = wt.data;
    const transform = this.mTransform;

    // Check scale x, y and rotation (skew is forbidden for arcade physics)
    // Also for circle world scale x and y should be the same
    if (transform.data[0] !== wtData[0] || transform.data[2] !== wtData[2]) {
      transform.set(wtData[0], wtData[1], wtData[2], wtData[3], 0, 0);
      collider.mChanged = true;

      for (let i = 0, l = colliders.length; i < l; i++) {
        colliders[i].mChanged = true;
      }
    }

    if (gameObject !== Black.stage) {
      const cachedPosition = this.mCachedPosition;
      const prevX = cachedPosition.x;
      const prevY = cachedPosition.y;

      wt.transformXY(gameObject.pivotX, gameObject.pivotY, cachedPosition);

      // Update this position if game object position was changed during frame
      position.x += cachedPosition.x - prevX;
      position.y += cachedPosition.y - prevY;

      gameObject.parent.globalToLocal(position, cachedPosition);
      gameObject.x = cachedPosition.x;
      gameObject.y = cachedPosition.y;
      gameObject.worldTransformation.transformXY(gameObject.pivotX, gameObject.pivotY, cachedPosition);
    }

    // Refresh colliders
    if (colliders.length === 0) {
      // TODO; do we need a boundsChanged callback?
      let bounds = gameObject.localBounds;

      if (gameObject instanceof DisplayObject) {
        let disp = /** @type {DisplayObject} */(gameObject);
        if (disp.mClipRect !== null)
          collider.set(0, 0, bounds.width, bounds.height);
        else
          collider.set(-gameObject.pivotX, -gameObject.pivotY, bounds.width, bounds.height);
      } else {
        collider.set(-gameObject.pivotX, -gameObject.pivotY, bounds.width, bounds.height);
      }

      collider.refresh(transform, position);
    } else {
      for (let i = 0, l = colliders.length; i < l; i++) {
        colliders[i].refresh(transform, position);
      }
    }
  }

  /**
   * Resets colliders dirty state after collision test. Sync with update
   *
   * @public
   * @return {void}
   */
  clearFlags() {
    const colliders = this.gameObject.mCollidersCache;
    this.mCollider.mChanged = false;

    for (let i = 0, l = colliders.length; i < l; i++) {
      colliders[i].mChanged = false;
    }
  }

  // /**
  //  * Draws all the colliders
  //  *
  //  * @public
  //  * @return {void}
  //  */
  // debug() {
  //   if (!this.gameObject) return;
  //
  //   if (RigidBody.mDebug.graphics === null) {
  //     RigidBody.mDebug.graphics = new Graphics();
  //   }
  //
  //   const debug = RigidBody.mDebug;
  //   const graphics = debug.graphics;
  //   const colliders = this.gameObject.mCollidersCache;
  //
  //   if (debug.time !== Black.instance.mLastFrameTimeMs) {
  //     debug.time = Black.instance.mLastFrameTimeMs;
  //     Black.stage.add(debug.graphics);
  //
  //     debug.graphics.clear();
  //   }
  //
  //   debug.graphics.lineStyle(2, this.mIsSleeping ? 0x00ff00 : 0xff0000);
  //
  //   if (colliders.length === 0) {
  //     this.mCollider.debug(graphics, this.mCachedPosition);
  //   } else {
  //     for (let i = 0, l = colliders.length; i < l; i++) {
  //       colliders[i].debug(graphics, this.mCachedPosition);
  //     }
  //   }
  // }
}

// /** @private @type {Object} Debug options */
// RigidBody.mDebug = {
//   graphics: null,
//   time    : 0,
// };
