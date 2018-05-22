class Arcade extends System {
  constructor() {
    super();

    this.mBodies = []; // All bodies that are on stage
    this.mPairs = []; // All colliders pairs to check collisions within
    this.mContacts = [];  // All pairs which are in collision
    this.mBroadPhase = new Phase();
    this.mNarrowPhase = new NarrowPhase();
    this.gravity = new Vector(0, 2000);
    this.iterations = 2;
    this.mPairsHash = {};

    this.mIslandBodies = [];
    this.mIslandContacts = [];
  }

  collideCallback(colliderA, colliderB, cb, ctx, ...args) {
    const id = colliderA.id + '&' + colliderB.id;
    const pair = this.mPairsHash[id];

    if (!pair || !pair.mInCollision)
      return;

    const sign = pair.a === colliderA ? 1 : -1;
    cb.call(ctx, pair.normal.x * sign, pair.normal.y * sign, pair.overlap, ...args);
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
    if (!child.stage) return;

    if (component instanceof RigidBody) {
      this.__addBody(component);
    } else if (component instanceof Collider) {
      this.__addCollider(child, component);
    }
  }

  onComponentRemoved(child, component) {
    if (!child.stage) return;

    if (component instanceof RigidBody) {
      this.__removeBody(component);
    } else if (component instanceof Collider) {
      this.__removeCollider(component);
    }
  }

  __addBody(body) {
    const bodies = this.mBodies;
    const colliders = body.gameObject.mCollidersCache;

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

    bodies.splice(bodies.indexOf(body), 1);
  }

  __addCollider(child, collider) {
    const body = this.__getBody(child);

    if (body !== null) {
      body.mColliderAddedOrRemoved = true;
      this.__addPairs(collider, body);

      if (child.mCollidersCache.length === 1) {
        this.__removePairs(body.mCollider);
      }
    }
  }

  __removeCollider(child, collider) {
    const body = this.__getBody(child);

    if (body !== null) {
      body.mColliderAddedOrRemoved = true;
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
    this.mPairsHash[a.id + '&' + b.id] = pair;
    this.mPairsHash[b.id + '&' + a.id] = pair;
  }

  __removePairs(collider) {
    const pairs = this.mPairs;

    for (let i = pairs.length - 1; i >= 0; i--) {
      const pair = pairs[i];

      if (pair.a === collider || pair.b === collider) {
        pairs.splice(i, 1);
        pair.constructor.pool.release(pair);
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
    // todo: refresh default collider if anchor or frame changed
    // todo: change body position if sprite was moved without physics
    for (let i = 0, l = bodies.length; i < l; i++) {
      bodies[i].update();
    }

    // reset each pair to defaults
    // so phases will know, if pair in collision is true, then it needs more precise check
    for (let i = 0, l = pairs.length; i < l; i++) {
      const pair = pairs[i];
      pair.mInCollision = true;
    }

    // update pairs in collision flag, overlap, normal properties
    this.mBroadPhase.test(pairs);
    this.mNarrowPhase.test(pairs);

    for (let i = 0, l = pairs.length; i < l; i++) {
      if (pairs[i].mInCollision) {
        contacts.push(pairs[i]);
      }
    }

    this.__solve(dt);

    // if (this.sleepEnabled)
    // pair.mInIsland = false;
    // const islandBodies = this.mIslandBodies;
    // const islandContacts = this.mIslandContacts;
    //
    // for (let i = 0, iLen = bodies.length; i < iLen; i++) {
    //   const body = bodies[i];
    //   const colliders = body.gameObject.mCollidersCache;
    //   body.mInIsland = false;
    //   body.mContacts.length = 0;
    //   body.mColliderAddedOrRemoved = false;
    //   body.mCollider.mChanged = false;
    //
    //   for (let j = 0, jLen = colliders.length; j < jLen; j++) {
    //     colliders[j].mChanged = false;
    //   }
    // }
    //
    // for (let i = 0, l = pairs.length; i < l; i++) {
    //   const pair = pairs[i];
    //
    //   if (pair.mInCollision) {
    //     pair.bodyA.mContacts.push(pair);
    //     pair.bodyB.mContacts.push(pair);
    //   }
    // }
    //
    // for (let i = 0, l = bodies.length; i < l; i++) {
    //   const body = bodies[i];
    //
    //   if (body.mInIsland || body.mIsSleeping || body.mIsStatic) continue;
    //
    //   islandBodies.length = 0;
    //   islandContacts.length = 0;
    //
    //   this.__fillIsland(body);
    //
    //   this.__solve(dt);
    // }
  }

  __solve(dt) {
    const iterations = this.iterations;
    const contacts = this.mContacts;
    const gravity = this.gravity;
    const bodies = this.mBodies;

    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];

      if (body.mInvMass === 0) continue;

      const velocity = body.mVelocity;
      const invMass = body.mInvMass;
      const force = body.mForce;
      const damping = 1 - body.mFrictionAir;

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

      position.x += velocity.x * dt;
      position.y += velocity.y * dt;
    }

    for (let i = 0; i < iterations; i++) {
      for (let j = 0, l = contacts.length; j < l; j++) {
        contacts[j].solvePosition();
      }
    }
  }

  // __fillIsland(body) {
  //   this.mIslandBodies.push(body);
  //   body.mInIsland = true;
  //
  //   if (body.mIsStatic) return;
  //
  //   const contacts = body.mContacts;
  //
  //   for (let i = 0, l = contacts.length; i < l; i++) {
  //     const contact = contacts[i];
  //
  //     if (contact.mInIsland) continue;
  //
  //     this.mIslandContacts.push(contact);
  //     contact.mInIsland = true;
  //
  //     const other = body === contact.bodyA ? contact.bodyB : contact.bodyA;
  //
  //     if (other.mInIsland) continue;
  //
  //     this.__fillIsland(other);
  //   }
  // }
}
