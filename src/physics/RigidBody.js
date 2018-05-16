class RigidBody extends Component {
  constructor() {
    super();

    this.mBoxColliders = [];
    this.mCircleColliders = [];
    this.mDefaultCollider = new BoxCollider(0, 0, 0, 0);

    this.position = new Vector();
    this.velocity = new Vector();
    this.transform = new Matrix();

    this.mMass = 0;
    this.invMass = 0;
    this.friction = 0.1;
    this.frictionAir = 0.01;
    this.prevPosition = new Vector();
    this.correction = new Vector();
    this.isStatic = false;
    this.isBoundsCheckable = false;
    this.worldBounds = null;
    this.boundsCollide = {left: false, right: false, top: false, bottom: false};
    this.mass = 1;
  }

  validateColliders() {
    const gameObject = this.gameObject;
    const colliders = gameObject.mCollidersCache;
    this.mBoxColliders.length = 0;
    this.mCircleColliders.length = 0;

    if (colliders.length === 0) {
      this.mDefaultCollider.set(-gameObject.pivotX, -gameObject.pivotY,
        gameObject.texture.width, gameObject.texture.height); // todo refresh on texture changed

      this.mBoxColliders.push(this.mDefaultCollider);
    } else {
      for (let i = 0, l = colliders.length; i < l; i++) {
        const collider = colliders[i];
        const collection = collider instanceof BoxCollider ? this.mBoxColliders : this.mCircleColliders;
        collection.push(collider);
      }
    }
  }

  reset() {
    const pos = this.gameObject.parent.localToGlobal(this.gameObject);
    const position = this.position;
    const dx = pos.x - position.x;
    const dy = pos.y - position.y;
    this.applyTranslate(dx, dy);
  }

  get mass() {
    return this.mMass;
  }

  set mass(v) {
    this.invMass = v === 0 ? 0 : 1 / v;
    this.mMass = v === 0 ? 0 : v;
  }

  applyTranslate(x, y) {
    this.position.x += x;
    this.position.y += y;
    this.prevPosition.x += x;
    this.prevPosition.y += y;
  }

  applyVelocity(x, y) {
    this.prevPosition.x -= x;
    this.prevPosition.y -= y;
  }

  setVelocity(x, y) {
    this.prevPosition.x = this.position.x - x;
    this.prevPosition.y = this.position.y - y;
  }

  update(dt, sqDt, gravity, left, right, top, bottom) {
    const gameObject = this.gameObject;
    const colliders = gameObject.mCollidersCache;
    const wt = gameObject.worldTransformation;
    const t = this.transform;
    const transformChanged = t.data[0] !== wt.data[0] || t.data[2] !== wt.data[2]; // check scale x, y and rotation are the same (skew is forbidden)
    let colliderChanged = false;

    if (transformChanged) {
      t.set(wt.data[0], wt.data[1], wt.data[2], wt.data[3], 0, 0);
    } else {
      for (let i = 0, l = colliders.length; i < l; i++) {
        if (colliders[i].changed) {
          colliderChanged = true;
          break;
        }
      }
    }

    if (transformChanged || colliderChanged) {
      if (colliders.length !== 0) {
        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = -Number.MAX_VALUE;
        let maxY = -Number.MAX_VALUE;

        for (let i = 0, l = colliders.length; i < l; i++) {
          const collider = colliders[i];
          collider.refresh(t);
          minX = Math.min(minX, collider.minX);
          minY = Math.min(minY, collider.minY);
          maxX = Math.max(maxX, collider.maxX);
          maxY = Math.max(maxY, collider.maxY);
        }

        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
      } else {
        const collider = this.mDefaultCollider;
        collider.refresh(t);
        this.minX = collider.minX;
        this.minY = collider.minY;
        this.maxX = collider.maxX;
        this.maxY = collider.maxY;
      }
    }

    const position = this.position;
    const prevPosition = this.prevPosition;
    const x = position.x;
    const y = position.y;

    if (!this.isStatic) {
      const velocity = this.velocity;
      const frictionAir = 1 - this.frictionAir;

      velocity.x = position.x - prevPosition.x;
      velocity.y = position.y - prevPosition.y;

      position.x += velocity.x * frictionAir;
      position.y += velocity.y * frictionAir + gravity * sqDt;

      if (this.isBoundsCheckable) {
        const worldBounds = this.worldBounds;
        const boundsCollide = this.boundsCollide;
        boundsCollide.left = boundsCollide.right = boundsCollide.top = boundsCollide.bottom = false;

        if (worldBounds) {
          left = worldBounds.x;
          right = worldBounds.x + worldBounds.width;
          top = worldBounds.y;
          bottom = worldBounds.y + worldBounds.height;
        }

        const minX = this.minX + position.x;
        const minY = this.minY + position.y;
        const maxX = this.maxX + position.x;
        const maxY = this.maxY + position.y;

        if (minX < left) {
          boundsCollide.left = true;
          position.x += left - minX;
        } else if (maxX > right) {
          boundsCollide.right = true;
          position.x -= maxX - right;
        }

        if (minY < top) {
          boundsCollide.top = true;
          position.y += top - minY;
        } else if (maxY > bottom) {
          boundsCollide.bottom = true;
          position.y -= maxY - bottom;
          position.x -= (position.x - prevPosition.x) * this.friction;
        }
      }
    }

    prevPosition.set(x, y);
    gameObject.parent.globalToLocal(position, gameObject);
  }

  postUpdate() {
    const colliders = this.gameObject.mCollidersCache;
    const position = this.position;
    const correction = this.correction;

    position.x += correction.x;
    position.y += correction.y;
    correction.set(0, 0);

    this.mDefaultCollider.changed = false;

    for (let i = 0, l = colliders.length; i < l; i++) {
      colliders[i].changed = false;
    }
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
