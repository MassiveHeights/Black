class RigidBody extends Component {
  constructor() {
    super();

    //this.id = String(RigidBody.mId++);
    this.mBoxColliders = [];
    this.mCircleColliders = [];
    this.colliders = [];
    this.mDefaultCollider = null;

    this.sprite = null;
    this.position = new Vector();
    this.velocity = new Vector();
    this.transform = new Matrix();

    this.mMass = 0;
    this.invMass = 0;
    this.friction = 0.1;
    this.frictionAir = 0.01;
    this.prevPosition = new Vector();
    this.impulse = new Vector();
    this.isStatic = false;
    this.isBoundsCheckable = false;
    this.worldBounds = null;
    this.boundsCollide = { left: false, right: false, top: false, bottom: false };
    this.mass = 1;

    this.mSpritePrevPos = new Vector();
    this.mIsInWorld = false;
  }

  onAdded() {
    this.mIsInWorld = true;
    this.reset();
    this.validateColliders();
  }

  onRemoved() {
    this.mIsInWorld = false;
    this.sprite = null;
  }

  validateColliders() {
    if (this.colliders.length === 0) {
      const sprite = this.sprite;
      const w = sprite.width / sprite.scaleX;
      const h = sprite.height / sprite.scaleY;

      this.mDefaultCollider = new BoxCollider(-sprite.pivotX, -sprite.pivotY, w, h);
      this.addCollider(this.mDefaultCollider);
    } else if (this.mDefaultCollider && this.colliders.length > 1) {
      this.removeCollider(this.mDefaultCollider);
      this.mDefaultCollider = null;
    }
  }

  reset() {
    const pos = this.sprite.parent.localToGlobal(this.sprite);
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

  addCollider(collider) {
    const colliders = this.colliders;

    if (colliders.indexOf(collider) !== -1)
      return;

    const collection = collider instanceof BoxCollider ? this.mBoxColliders : this.mCircleColliders;
    collection.push(collider);
    colliders.push(collider);
    this.validateColliders();
  }

  removeCollider(collider) {
    const colliders = this.colliders;
    const i = colliders.indexOf(collider);

    if (i === -1)
      return;

    const collection = collider instanceof BoxCollider ? this.mBoxColliders : this.mCircleColliders;
    collection.splice(collection.indexOf(collider), 1);
    colliders.splice(i, 1);
    this.validateColliders();
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

  update(gravity, viscosity, left, right, top, bottom) {
    const sprite = this.sprite;
    const colliders = this.colliders;
    const wt = sprite.worldTransformation;
    const t = this.transform;
    const transformChanged = t.data[0] !== wt.data[0]/* || t.b !== wt.b || t.c !== wt.c*/ || t.data[3] !== wt.data[3];
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
    }

    const position = this.position;
    const prevPosition = this.prevPosition;
    const spritePrevPos = this.mSpritePrevPos;

    if (Math.abs(wt.data[4] - spritePrevPos.x) > 0.1 || Math.abs(wt.data[5] - spritePrevPos.y) > 0.1) {
      this.reset(); // sprite was moved without physics
    }

    const x = position.x;
    const y = position.y;

    if (!this.isStatic) {
      const velocity = this.velocity;
      const frictionAir = 1 - this.frictionAir;

      velocity.x = position.x - prevPosition.x;
      velocity.y = position.y - prevPosition.y;

      position.x += viscosity * velocity.x * frictionAir;
      position.y += viscosity * velocity.y * frictionAir + gravity;

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
    spritePrevPos.copyFrom(position);
    sprite.position.copyFrom(sprite.parent.globalToLocal(position));
  }

  postUpdate() {
    const colliders = this.colliders;
    const position = this.position;
    const impulse = this.impulse;

    position.x += impulse.x;
    position.y += impulse.y;
    impulse.set(0, 0);

    for (let i = 0, l = colliders.length; i < l; i++) {
      colliders[i].changed = false;
    }
  }
}

RigidBody.debugBmd = null;
RigidBody.debugCtx = null;
RigidBody.debugClearTime = 0;
RigidBody.mId = 0;
