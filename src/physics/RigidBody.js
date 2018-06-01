class RigidBody extends Component {
  constructor() {
    super();

    // default collier
    this.mCollider = new BoxCollider(0, 0, 0, 0);

    // game object pivot and texture to watch changes
    this.mPivot = new Vector(Number.MAX_VALUE);
    this.mTexrure = null;
    this.mCachedPosition = new Vector(Number.MAX_VALUE);

    // all pairs with this body
    this.mPairs = [];

    this.mColliderAddedOrRemoved = false;
    this.mIsStatic = false;

    this.mPosition = new Vector();
    this.mVelocity = new Vector();
    this.mForce = new Vector();
    this.mTransform = new Matrix(Number.MAX_VALUE);

    this.mMass = 0;
    this.mInvMass = 0;

    this.frictionAir = 0.01;
    this.friction = 0.1;
    this.bounce = 0.1;

    this.mass = 1;
  }

  get mass() {
    return this.mMass;
  }

  set mass(v) {
    this.mMass = v;

    if (v === 0 || this.mIsStatic) {
      this.mInvMass = 0;
    } else {
      this.mInvMass = 1 / v;
    }
  }

  get isStatic() {
    return this.mIsStatic;
  }

  set isStatic(v) {
    this.mIsStatic = v;
    this.mass = this.mMass;
  }

  applyForce(x, y) {
    this.mForce.x += x;
    this.mForce.y += y;
  }

  set velocityX(v) {
    this.mVelocity.x = v;
  }

  get velocityX() {
    return this.mVelocity.x;
  }

  set velocityY(v) {
    this.mVelocity.y = v;
  }

  get velocityY() {
    return this.mVelocity.y;
  }

  update() {
    const gameObject = this.gameObject;
    const colliders = gameObject.mCollidersCache;
    const collider = this.mCollider;
    const position = this.mPosition;
    const cachedPosition = this.mCachedPosition;
    const wt = gameObject.worldTransformation;
    const transform = this.mTransform;
    const transformChanged = transform.data[0] !== wt.data[0] || transform.data[2] !== wt.data[2]; // check scale x, y and rotation are the same (skew is forbidden)

    if (transformChanged) {
      transform.set(wt.data[0], wt.data[1], wt.data[2], wt.data[3], 0, 0);
      collider.mChanged = true;

      for (let i = 0, l = colliders.length; i < l; i++) {
        colliders[i].mChanged = true;
      }
    }

    if (cachedPosition.x !== wt.data[4] || cachedPosition.y !== wt.data[5]) {
      wt.transformXY(gameObject.pivotX, gameObject.pivotY, position);
    }

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

    if (gameObject.parent) {
      gameObject.parent.globalToLocal(position, gameObject);

      const wt = gameObject.worldTransformation;
      cachedPosition.x = wt.data[4];
      cachedPosition.y = wt.data[5];
    }
  }

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
      debug.graphics.lineWidth = 30;
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

RigidBody.mDebug = {
  graphics: null,
  time    : 0,
};
