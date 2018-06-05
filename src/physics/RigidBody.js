/**
 * RigidBody is used to describe physics properties of game object colliders
 *
 * @cat physics
 * @extends Component
 */

/* @echo EXPORT */
class RigidBody extends Component {

  /**
   * Creates new instance of RigidBody.
   */
  constructor() {
    super();

    /** @private @type {BoxCollider} Default collider. Used in case no any custom colliders provided by user */
    this.mCollider = new BoxCollider(0, 0, 0, 0);

    /** @private @type {Array<Collider>} Stores all used colliders. Default or sprite collidersCache. Used for rebuild pairs */
    this.mColliders = [];

    /** @private @type {Vector} Game object pivot. To track changes and update default collider if needed */
    this.mPivot = new Vector(Number.MAX_VALUE);

    /** @private @type {Texture|null} Game object texture. To track changes and update default collider if needed */
    this.mTexrure = null;

    /** @private @type {Vector} Game object global position.
     * To track changes and update this position, if object was moved without physics */
    this.mCachedPosition = new Vector();

    /** @private @type {Array<Pair>} All pairs this body participates in */
    this.mPairs = [];

    /** @private @type {Boolean} Flag to indicate immovable body */
    this.mIsStatic = false;

    /** @private @type {Vector} This position in stage coordinates */
    this.mPosition = new Vector();

    /** @private @type {Vector} This velocity to integrate */
    this.mVelocity = new Vector();

    /** @private @type {Vector} Force accumulator */
    this.mForce = new Vector();

    /** @private @type {Matrix} Game object transform. To track changes and update this colliders */
    this.mTransform = new Matrix(Number.MAX_VALUE);

    /** @private @type {number} Cached mass */
    this.mMass = 0;

    /** @private @type {number} Inverted mass or zero if body is static */
    this.mInvMass = 0;

    /** @private @type {number} Velocity damper */
    this.frictionAir = 0.01;

    /** @private @type {number} Friction for collision solving */
    this.friction = 0.1;

    /** @private @type {number} Bounce for collision solving */
    this.bounce = 0.1;

    this.mass = 1;
  }

  /**
   * Returns this cached mass.
   *
   * @return {Number}
   */
  get mass() {
    return this.mMass;
  }

  /**
   * Sets the mass of this body.
   *
   * @param {Number} v Mass to set.
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
   * @return {Boolean}
   */
  get isStatic() {
    return this.mIsStatic;
  }

  /**
   * Sets this body movable state. Refresh inverted mass
   *
   * @param {Boolean} v Value to set.
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
   * @param {Number} v Position to set.
   * @return {void}
   */
  set x(v) {
    this.mPosition.x = v;
  }

  /**
   * Returns this position x.
   *
   * @return {Number}
   */
  get x() {
    return this.mPosition.x;
  }

  /**
   * Sets the global position y of this body.
   *
   * @param {Number} v Position to set.
   * @return {void}
   */
  set y(v) {
    this.mPosition.y = v;
  }

  /**
   * Returns this position y.
   *
   * @return {Number}
   */
  get y() {
    return this.mPosition.y;
  }

  /**
   * Sets the force x of this body.
   *
   * @param {Number} v Force to set.
   * @return {void}
   */
  set forceX(v) {
    this.mForce.x = v;
  }

  /**
   * Returns this force x.
   *
   * @return {Number}
   */
  get forceX() {
    return this.mForce.x;
  }

  /**
   * Sets the force y of this body.
   *
   * @param {Number} v Force to set.
   * @return {void}
   */
  set forceY(v) {
    this.mForce.y = v;
  }

  /**
   * Returns this force y.
   *
   * @return {Number}
   */
  get forceY() {
    return this.mForce.y;
  }

  /**
   * Sets the velocity x of this body.
   *
   * @param {Number} v Velocity to set.
   * @return {void}
   */
  set velocityX(v) {
    this.mVelocity.x = v;
  }

  /**
   * Returns this velocity x.
   *
   * @return {Number}
   */
  get velocityX() {
    return this.mVelocity.x;
  }

  /**
   * Sets the velocity y of this body.
   *
   * @param {Number} v Velocity to set.
   * @return {void}
   */
  set velocityY(v) {
    this.mVelocity.y = v;
  }

  /**
   * Returns this velocity y.
   *
   * @return {Number}
   */
  get velocityY() {
    return this.mVelocity.y;
  }

  /**
   * Updates game object position, colliders
   *
   * @internal
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

    if (gameObject.parent) {
      const cachedPosition = this.mCachedPosition;
      const prevX = cachedPosition.x;
      const prevY = cachedPosition.y;

      wt.transformXY(gameObject.pivotX, gameObject.pivotY, cachedPosition);

      // Update this position if game object position was changed during frame
      if (cachedPosition.x !== prevX || cachedPosition.y !== prevY) {
        position.x += cachedPosition.x - prevX;
        position.y += cachedPosition.y - prevY;
      }

      gameObject.parent.globalToLocal(this.mPosition, gameObject);
      gameObject.worldTransformation.transformXY(gameObject.pivotX, gameObject.pivotY, cachedPosition);
    }

    // Refresh colliders
    if (colliders.length === 0 && gameObject.texture) {
      const pivot = this.mPivot;

      if (pivot.x !== gameObject.pivotX || pivot.y !== gameObject.pivotY || this.mTexrure !== gameObject.texture) {
        pivot.x = gameObject.pivotX;
        pivot.y = gameObject.pivotY;
        this.mTexrure = gameObject.texture;

        collider.set(-gameObject.pivotX, -gameObject.pivotY, gameObject.texture.width, gameObject.texture.height);
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
   * @param {Number} dt
   */
  postUpdate(dt) {
    const colliders = this.gameObject.mCollidersCache;
    this.mCollider.mChanged = false;

    for (let i = 0, l = colliders.length; i < l; i++) {
      colliders[i].mChanged = false;
    }
  }

  /**
   * Draws all the colliders
   *
   * @public
   * @return {void}
   */
  debug() {
    if (!this.gameObject) return;

    if (RigidBody.mDebug.graphics === null) {
      RigidBody.mDebug.graphics = new Graphics();
    }

    const debug = RigidBody.mDebug;
    const graphics = debug.graphics;
    const colliders = this.gameObject.mCollidersCache;

    if (debug.time !== Black.instance.mLastFrameTimeMs) {
      debug.time = Black.instance.mLastFrameTimeMs;
      Black.stage.add(debug.graphics);

      debug.graphics.clear();
      debug.graphics.lineStyle(2, 0x00ff00);
    }

    if (colliders.length === 0) {
      this.mCollider.debug(graphics, this.mCachedPosition);
    } else {
      for (let i = 0, l = colliders.length; i < l; i++) {
        colliders[i].debug(graphics, this.mCachedPosition);
      }
    }
  }
}

/** @private @type {Object} Debug options */
RigidBody.mDebug = {
  graphics: null,
  time    : 0,
};
