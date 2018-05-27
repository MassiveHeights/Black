class Arcade extends System {
  constructor() {
    super();

    this.mBodies = []; // All bodies that are on stage
    this.mPairs = []; // All colliders pairs to check collisions within
    this.mContacts = [];  // All pairs which are in collision
    this.mBroadPhase = new Phase();
    this.mNarrowPhase = new NarrowPhase();
    this.mBodiesHash = Object.create(null); // for quick search in collide callback

    this.gravity = new Vector(0, 1000);
    this.iterations = 1;
  }

  collisionInfo(bodyA, bodyB, colliderA, colliderB, cb, ctx, ...args) {
    const bodiesHash = this.mBodiesHash;
    const pairsHash = bodiesHash[bodyA.mHash];

    if (!pairsHash) return;

    const pair = pairsHash[colliderA.mHash + '&' + colliderB.mHash] ||
      pairsHash[colliderB.mHash + '&' + colliderA.mHash];

    if (pair && pair.mInCollision) {
      const sign = pair.a === colliderA ? 1 : -1;
      cb.call(ctx, pair.mNormal.x * sign, pair.mNormal.y * sign, pair.mOverlap, ...args);
    }
  }

  inCollision(bodyA, bodyB) {
    const bodiesHash = this.mBodiesHash;
    const pairsHash = bodiesHash[bodyA.mHash];

    for (let id in pairsHash) {
      if (pairsHash[id].bodyB === bodyB) {
        return true;
      }
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

    this.mBodiesHash[body.mHash] = Object.create(null);

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

    delete this.mBodiesHash[body.mHash];

    bodies.splice(bodies.indexOf(body), 1);
  }

  __addCollider(child, collider) {
    const body = this.__getBody(child);

    if (body !== null) {
      collider.mChanged = true;
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

    this.mBodiesHash[bodyA.mHash][a.mHash + '&' + b.mHash] = pair;
    this.mBodiesHash[bodyB.mHash][b.mHash + '&' + a.mHash] = pair;
  }

  __removePairs(collider) {
    const pairs = this.mPairs;
    const pairsHash = this.mBodiesHash;

    for (let i = pairs.length - 1; i >= 0; i--) {
      const pair = pairs[i];

      if (pair.a === collider || pair.b === collider) {
        pairs.splice(i, 1);
        pair.constructor.pool.release(pair);

        delete pairsHash[pair.bodyA.mHash][pair.a.mHash + '&' + pair.b.mHash];
        delete pairsHash[pair.bodyB.mHash][pair.b.mHash + '&' + pair.a.mHash];
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
      pairs[i].mInCollision = true;
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

      position.x += velocity.x * dt;
      position.y += velocity.y * dt;
    }

    for (let i = 0; i < iterations; i++) {
      for (let j = 0, l = contacts.length; j < l; j++) {
        contacts[j].solvePosition();
      }
    }
  }

  createBounds(x = 0, y = 0, width = Black.stage.width, height = Black.stage.height, parent = Black.stage, thickness = 1000) {
    parent.addComponent(new BoxCollider(x - thickness, y - thickness, width + thickness * 2, thickness)); // top
    parent.addComponent(new BoxCollider(x + width, y, thickness, height)); // right
    parent.addComponent(new BoxCollider(x - thickness, y + height, width + thickness * 2, thickness)); // bottom
    parent.addComponent(new BoxCollider(x - thickness, y, thickness, height)); // left
    parent.addComponent(new RigidBody());
  }
}
