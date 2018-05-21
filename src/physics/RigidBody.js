class RigidBody extends Component {
  constructor() {
    super();

    this.mBoxColliders = [];
    this.mCircleColliders = [];
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
    this.mBounce = 0.1;

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
    const debug = RigidBody.mDebug;

    if (debug.graphics === null) {
      debug.graphics = new Graphics();
    }

    if (debug.time !== Black.instance.mLastFrameTimeMs) {
      debug.time = Black.instance.mLastFrameTimeMs;
      Black.instance.stage.add(debug.graphics);
      debug.graphics.clear();
    }

    const dpr = this.gameObject.stage.dpr;
    const graphics = debug.graphics;
    const boxColliders = this.mBoxColliders;
    const circleColliders = this.mCircleColliders;
    const position = this.position;
    graphics.lineStyle(5 * dpr, 0x00ff00);

    for (let i = 0, l = boxColliders.length; i < l; i++) {
      const collider = boxColliders[i];
      const points = collider.points;

      for (let j = 0; j < 4; j++) {
        const point = points[j];
        const next = points[j + 1] || points[0];

        graphics.drawLine((position.x + point.x) * dpr, (position.y + point.y) * dpr,
          (position.x + next.x) * dpr, (position.y + next.y) * dpr);
      }
    }

    for (let i = 0, l = circleColliders.length; i < l; i++) {
      const collider = circleColliders[i];
      graphics.drawCircle((position.x + collider.position.x) * dpr,
        (position.y + collider.position.y) * dpr, collider.radius * dpr);
    }
  }
}

RigidBody.mDebug = {
  graphics: null,
  time    : 0,
};
