class RigidBody extends Component {
  constructor() {
    super();

    this.mCollider = new BoxCollider(0, 0, 0, 0);
    this.mContacts = [];

    this.mInIsland = false;
    this.mIsStatic = false;
    this.mIsSleeping = false;
    this.mColliderAddedOrRemoved = false;

    this.mPosition = new Vector();
    this.mVelocity = new Vector();
    this.mForce = new Vector();
    this.mTransform = new Matrix(Number.MAX_VALUE);

    this.mMass = 0;
    this.mInvMass = 0;

    this.mFrictionAir = 0.01;
    this.mFriction = 0.1;
    this.mBounce = 0.2;

    this.mass = 1;
  }

  get mass() {
    return this.mMass;
  }

  set mass(v) {
    this.mInvMass = v === 0 ? 0 : 1 / v;
    this.mMass = v === 0 ? 0 : v;
  }

  update() {
    const gameObject = this.gameObject;
    const colliders = gameObject.mCollidersCache;
    const collider = this.mCollider;
    const wt = gameObject.worldTransformation;
    const transform = this.mTransform;
    const transformChanged = transform.data[0] !== wt.data[0] || transform.data[2] !== wt.data[2]; // check scale x, y and rotation are the same (skew is forbidden)
    const colliderAddedOrRemoved = this.mColliderAddedOrRemoved;
    let colliderChanged = false;

    if (gameObject.texture) {
      collider.set(-gameObject.pivotX, -gameObject.pivotY, gameObject.texture.width, gameObject.texture.height); // todo
    }

    if (transformChanged || colliderAddedOrRemoved) {
      transform.set(wt.data[0], wt.data[1], wt.data[2], wt.data[3], 0, 0);

      collider.refresh(transform);
      collider.mChanged = true;

      for (let i = 0, l = colliders.length; i < l; i++) {
        colliders[i].refresh(transform);
        colliders[i].mChanged = true;
      }
    } else {
      for (let i = 0, l = colliders.length; i < l; i++) {
        if (colliders[i].mChanged) {
          colliders[i].refresh(transform);
          colliderChanged = true;
          break;
        }
      }
    }

    if (transformChanged || colliderChanged || colliderAddedOrRemoved) {
      if (colliders.length === 0) {
        this.minX = collider.minX;
        this.minY = collider.minY;
        this.maxX = collider.maxX;
        this.maxY = collider.maxY;
      } else {
        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = -Number.MAX_VALUE;
        let maxY = -Number.MAX_VALUE;

        for (let i = 0, l = colliders.length; i < l; i++) {
          const collider = colliders[i];
          minX = Math.min(minX, collider.minX);
          minY = Math.min(minY, collider.minY);
          maxX = Math.max(maxX, collider.maxX);
          maxY = Math.max(maxY, collider.maxY);
        }

        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
      }
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

RigidBody.mDebug = {
  graphics: null,
  time    : 0,
};
