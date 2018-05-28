class RigidBody extends Component {
  constructor() {
    super();

    this.mHash = RigidBody.mHash++;
    this.mCollider = new BoxCollider(0, 0, 0, 0);
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

  set x(v) {
    this.mPosition.x = v;
  }

  get x() {
    return this.mPosition.x;
  }

  set y(v) {
    this.mPosition.y = v;
  }

  get y() {
    return this.mPosition.y;
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

    if (gameObject.texture /* && (pivot changed || texture changed) todo */) {
      collider.set(-gameObject.pivotX, -gameObject.pivotY, gameObject.texture.width, gameObject.texture.height);
    }

    collider.refresh(transform, position);

    for (let i = 0, l = colliders.length; i < l; i++) {
      colliders[i].refresh(transform, position);
    }

    gameObject.parent.globalToLocal(this.mPosition, gameObject);
  }

  debug() {
    // const debug = RigidBody.mDebug;
    //
    // if (debug.graphics === null) {
    //   debug.graphics = new Graphics();
    // }
    //
    // if (debug.time !== Black.instance.mLastFrameTimeMs) {
    //   debug.time = Black.instance.mLastFrameTimeMs;
    //   Black.instance.stage.add(debug.graphics);
    //   debug.graphics.clear();
    // }
  }
}

RigidBody.mHash = 1;

RigidBody.mDebug = {
  graphics: null,
  time    : 0,
};
