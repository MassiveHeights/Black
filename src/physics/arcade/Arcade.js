class Arcade extends System {
  constructor() {
    super();

    this.mBodies = []; // All bodies that are on stage
    this.mPairs = []; // All colliders pairs to check collisions within
    this.mContacts = [];  // All pairs which are in collision
    this.mBroadPhase = new Phase();
    this.mNarrowPhase = new NarrowPhase();
    this.mPairsHash = Object.create(null); // for quick search in collide callback

    this.gravity = new Vector(0, 1000);
    this.iterations = 1;

    this.mBoundsBody = new RigidBody();
    this.mBoundsBody.isStatic = true;
    this.mBoundsLeft = new BoxCollider(0, 0, 0, 0);
    this.mBoundsRight = new BoxCollider(0, 0, 0, 0);
    this.mBoundsTop = new BoxCollider(0, 0, 0, 0);
    this.mBoundsBottom = new BoxCollider(0, 0, 0, 0);
    this.mBoundsParent = null;
    this.mBoundsInited = false;
  }

  collisionInfo(colliderA, colliderB, cb, ctx, ...args) {
    const pair = this.mPairsHash[Pair.__id(colliderA.a, colliderB.b)];

    if (pair && pair.mInCollision) {
      const sign = pair.a === colliderA ? 1 : -1;
      cb.call(ctx, pair.mNormal.x * sign, pair.mNormal.y * sign, pair.mOverlap, ...args);
    }
  }

  inCollision(bodyA, bodyB, cb = null, ctx = null, ...args) {
    const pairs = bodyA.mPairs;

    for (let i = 0, l = pairs.length; i < l; i++) {
      const pair = pairs[i];

      if (!pair.mInCollision) continue;

      const sign = pair.bodyA === bodyA && pair.bodyB === bodyB ? 1 :
        pair.bodyA === bodyB && pair.bodyB === bodyA ? -1 : 0;

      if (sign === 0) continue;

      if (cb) {
        cb.call(ctx, pair.mNormal.x * sign, pair.mNormal.y * sign, pair.mOverlap, ...args);
      }

      return true;
    }

    return false;
  }

  onChildrenAdded(gameObject) {
    GameObject.forEach(gameObject, object => {
      const body = object.getComponent(RigidBody);

      if (body !== null) {
        this.__addBody(body);
      }
    });
  }

  onChildrenRemoved(gameObject) {
    GameObject.forEach(gameObject, object => {
      const body = object.getComponent(RigidBody);

      if (body !== null) {
        this.__removeBody(body);
      }
    });
  }

  onComponentAdded(child, component) {
    if (component instanceof RigidBody) {
      this.__addBody(component);
    } else if (component instanceof Collider) {
      this.__addCollider(child, component);
    }
  }

  onComponentRemoved(child, component) {
    if (component instanceof RigidBody) {
      this.__removeBody(component);
    } else if (component instanceof Collider) {
      this.__removeCollider(component);
    }
  }

  __addBody(body) {
    const bodies = this.mBodies;
    const colliders = body.gameObject.mCollidersCache;
    body.mPairs.length = 0;

    if (colliders.length === 0) {
      this.__addPairs(body.mCollider, body);
    } else {
      for (let i = 0, l = colliders.length; i < l; i++) {
        this.__addPairs(colliders[i], body);
      }
    }

    bodies.push(body);
  }

  __removeBody(body) {
    const bodies = this.mBodies;
    const colliders = body.gameObject.mCollidersCache;

    if (colliders.length === 0) {
      this.__removePairs(body.mCollider, body);
    } else {
      for (let i = 0, l = colliders.length; i < l; i++) {
        this.__removePairs(colliders[i], body);
      }
    }

    body.mPairs.length = 0;
    bodies.splice(bodies.indexOf(body), 1);
  }

  __addCollider(child, collider) {
    const body = this.__getBody(child);

    if (body !== null) {
      this.__addPairs(collider, body);

      if (child.mCollidersCache.length === 1) {
        this.__removePairs(body.mCollider);
      }
    }
  }

  __removeCollider(child, collider) {
    const body = this.__getBody(child);

    if (body !== null) {
      this.__removePairs(collider);

      if (child.mCollidersCache.length === 0) {
        this.__addCollider(child, body.mCollider);
      }
    }
  }

  __getBody(gameObject) {
    const bodies = this.mBodies;

    for (let i = 0, l = bodies.length; i < l; i++) {
      if (bodies[i].gameObject === gameObject) {
        return bodies[i];
      }
    }

    return null;
  }

  __addPairs(collider, fromBody) {
    const bodies = this.mBodies;
    collider.mChanged = true;

    for (let i = 0, iLen = bodies.length; i < iLen; i++) {
      const body = bodies[i];
      const colliders = body.gameObject.mCollidersCache;

      if (body === fromBody) continue;

      if (colliders.length === 0) {
        this.__addPair(collider, body.mCollider, fromBody, body);
      } else {
        for (let j = 0, jLen = colliders.length; j < jLen; j++) {
          this.__addPair(collider, colliders[j], fromBody, body);
        }
      }
    }
  }

  __addPair(a, b, bodyA, bodyB) {
    const isBoxA = a instanceof BoxCollider;
    const isBoxB = b instanceof BoxCollider;
    let pair;

    if (isBoxA && isBoxB) {
      pair = BoxToBoxPair.pool.get();
    } else if (!isBoxA && !isBoxB) {
      pair = CircleToCirclePair.pool.get();
    } else {
      pair = BoxToCirclePair.pool.get();

      if (isBoxB) {
        const body = bodyA;
        const collider = a;
        a = b;
        bodyA = bodyB;
        b = collider;
        bodyB = body;
      }
    }

    pair.set(a, b, bodyA, bodyB);
    this.mPairs.push(pair);

    this.mPairsHash[Pair.__id(a, b)] = pair;
    bodyA.mPairs.push(pair);
    bodyB.mPairs.push(pair);
  }

  __removePairs(collider) {
    const pairs = this.mPairs;
    const pairsHash = this.mPairsHash;

    for (let i = pairs.length - 1; i >= 0; i--) {
      const pair = pairs[i];

      if (pair.a === collider || pair.b === collider) {
        pairs.splice(i, 1);
        pair.constructor.pool.release(pair);

        delete pairsHash[Pair.__id(pair.a, pair.b)];

        pair.bodyA.mPairs.splice(pair.bodyA.mPairs.indexOf(pair), 1);
        pair.bodyB.mPairs.splice(pair.bodyB.mPairs.indexOf(pair), 1);
      }
    }
  }

  onFixedUpdate(dt) {
    const contacts = this.mContacts;
    const bodies = this.mBodies;
    const pairs = this.mPairs;
    contacts.length = 0;

    // update sprite position
    // refresh body colliders if scale, rotation changed
    for (let i = 0, l = bodies.length; i < l; i++) {
      bodies[i].update();
    }

    // reset each pair to defaults
    // so phases will know, if pair in collision is true, then it needs more precise check
    for (let i = 0, l = pairs.length; i < l; i++) {
      pairs[i].mInCollision = true;
    }

    // update pairs in collision flag, overlap, normal properties
    this.mBroadPhase.test(pairs);
    this.mNarrowPhase.test(pairs);

    for (let i = 0, l = pairs.length; i < l; i++) {
      if (pairs[i].mInCollision) {
        contacts.push(pairs[i]);
      } else {
        pairs[i].mNormalImpulse = 0;
        pairs[i].mTangentImpulse = 0;
      }
    }

    this.__solve(dt);
  }

  __solve(dt) {
    const iterations = this.iterations;
    const bodies = this.mBodies;
    const contacts = this.mContacts;
    const gravity = this.gravity;

    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];

      if (body.mInvMass === 0) continue;

      const velocity = body.mVelocity;
      const invMass = body.mInvMass;
      const force = body.mForce;
      const damping = 1 - body.frictionAir;

      velocity.x = (velocity.x + (force.x * invMass + gravity.x) * dt) * damping;
      velocity.y = (velocity.y + (force.y * invMass + gravity.y) * dt) * damping;
    }

    for (let i = 0, l = contacts.length; i < l; i++) {
      contacts[i].preSolve();
    }

    for (let i = 0; i < iterations; i++) {
      for (let j = 0, l = contacts.length; j < l; j++) {
        contacts[j].solveVelocity();
      }
    }

    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];
      body.mForce.set(0, 0);

      if (body.mInvMass === 0) continue;

      const position = body.mPosition;
      const velocity = body.mVelocity;

      position.x += velocity.x * dt * Pair.pixelsPerMeter;
      position.y += velocity.y * dt * Pair.pixelsPerMeter;
    }

    for (let i = 0; i < iterations; i++) {
      for (let j = 0, l = contacts.length; j < l; j++) {
        contacts[j].solvePosition();
      }
    }
  }

  __initBounds() {
    const bounds = Black.stage.bounds;
    const thickness = Number.MAX_SAFE_INTEGER;

    this.mBoundsLeft.set(bounds.x - thickness, bounds.y, thickness, bounds.height);
    this.mBoundsRight.set(bounds.x + bounds.width, bounds.y, thickness, bounds.height);
    this.mBoundsTop.set(bounds.x - thickness, bounds.y - thickness, bounds.width + thickness * 2, thickness);
    this.mBoundsBottom.set(bounds.x - thickness, bounds.y + bounds.height, bounds.width + thickness * 2, thickness);

    this.mBoundsParent = Black.stage;
    this.mBoundsInited = true;

    this.mBoundsParent.addComponent(this.mBoundsLeft);
    this.mBoundsParent.addComponent(this.mBoundsRight);
    this.mBoundsParent.addComponent(this.mBoundsTop);
    this.mBoundsParent.addComponent(this.mBoundsBottom);
  }

  enableBounds() {
    if (!this.mBoundsInited) {
      this.__initBounds();
    }

    this.mBoundsParent.addComponent(this.mBoundsBody);
  }

  disableBounds() {
    this.mBoundsParent.removeComponent(this.mBoundsBody);
  }

  setBounds(x, y, width, height, parent = Black.stage) {
    const thickness = Number.MAX_SAFE_INTEGER;

    this.mBoundsLeft.set(x - thickness, y, thickness, height);
    this.mBoundsRight.set(x + width, y, thickness, height);
    this.mBoundsTop.set(x - thickness, y - thickness, width + thickness * 2, thickness);
    this.mBoundsBottom.set(x - thickness, y + height, width + thickness * 2, thickness);

    this.mBoundsParent = parent;
    this.mBoundsInited = true;
  }
}
