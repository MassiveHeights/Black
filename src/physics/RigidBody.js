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

    /** @private @type {Vector} Game object pivot. To track changes and update default collider if needed */
    this.mPivot = new Vector(Number.MAX_VALUE);

    /** @private @type {Texture|null} Game object texture. To track changes and update default collider if needed */
    this.mTexrure = null;

    /** @private @type {Vector} Game object global position.
     * To track changes and update this position, if object was moved without physics */
    this.mCachedPosition = new Vector(Number.MAX_VALUE);

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
   * Adds force to this force accumulator
   *
   * @public
   * @param x Force to add on x-axis
   * @param y Force to add on y-axis.
   *
   * @return {void}
   */
  applyForce(x, y) {
    this.mForce.x += x;
    this.mForce.y += y;
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
    const cachedPosition = this.mCachedPosition;
    const wt = gameObject.worldTransformation;
    const wtData = wt.data;
    const transform = this.mTransform;

    // Check scale x, y and rotation (skew is forbidden for arcade physics)
    // Also for circle world scale x and y should be the same
    const transformChanged = transform.data[0] !== wtData[0] || transform.data[2] !== wtData[2];

    // Set colliders dirty
    if (transformChanged) {
      transform.set(wtData[0], wtData[1], wtData[2], wtData[3], 0, 0);
      collider.mChanged = true;

      for (let i = 0, l = colliders.length; i < l; i++) {
        colliders[i].mChanged = true;
      }
    }

    // Update this position if game object position was changed during frame
    if (cachedPosition.x !== wt.data[4] || cachedPosition.y !== wt.data[5]) {
      wt.transformXY(gameObject.pivotX, gameObject.pivotY, position);
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

    // In case gameObject is not stage
    if (gameObject.parent) {
      gameObject.parent.globalToLocal(position, gameObject);

      const wtData = gameObject.worldTransformation.data;
      cachedPosition.x = wtData[4];
      cachedPosition.y = wtData[5];
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
      debug.graphics.lineColor = 0xffffff;
      debug.graphics.lineWidth = 5;
    }

    if (colliders.length === 0) {
      this.mCollider.debug(graphics);
    } else {
      for (let i = 0, l = colliders.length; i < l; i++) {
        colliders[i].debug(graphics);
      }
    }
  }
}

/** @private @type {Object} Debug options */
RigidBody.mDebug = {
  graphics: null,
  time    : 0,
};
