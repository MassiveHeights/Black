/**
 * Simple AABB physics engine (beta).
 *
 * @cat physics.arcade
 * @extends System
 */

/* @echo EXPORT */
class Arcade extends System {
  /**
   * Creates new Arcade instance.
   */
  constructor() {
    super();

    /** @private @type {Array<RigidBody>} Bodies that are on stage */
    this.mBodies = [];

    /** @private @type {Array<Pair>} Pairs to check collisions within. With colliders which bodies are on stage */
    this.mPairs = [];

    /** @private @type {Array<Pair>} Pairs which are in collision per frame */
    this.mContacts = [];

    /** @private @type {BroadPhase} Broad collision test instance */
    this.mBroadPhase = new BroadPhase();

    /** @private @type {Object} Object to store pairs by their id. For quick search in collision callbacks */
    this.mPairsHash = Object.create(null);

    /** @private @type {RigidBody|null} Reference to world bounds body */
    this.mBoundsBody = null;

    /** @private @type {BoxCollider} */
    this.mBoundsLeft = new BoxCollider(0, 0, 0, 0);

    /** @private @type {BoxCollider} */
    this.mBoundsRight = new BoxCollider(0, 0, 0, 0);

    /** @private @type {BoxCollider} */
    this.mBoundsTop = new BoxCollider(0, 0, 0, 0);

    /** @private @type {BoxCollider} */
    this.mBoundsBottom = new BoxCollider(0, 0, 0, 0);

    /** @private @type {Boolean} Marks this dirty state. Necessity to rebuild pairs */
    this.mChanged = false;

    /** @private @type {Vector} */
    this.mGravity = new Vector(0, 1000);

    /** @private @type {Number} Bigger value gives better resolver result, but require more calculations */
    this.mIterations = 5;

    /** @private @type {Boolean} Switch for sleep calculations */
    this.mSleepAllowed = true;
  }

  /**
   * Invokes passed callback if given colliders are in collision
   *
   * Callback params:
   *
   * normalX - collision normal projected on x axis. In direction from colliderA to colliderB.
   * normalY - collision normal projected on y axis. In direction from colliderA to colliderB.
   * overlap - positive number.
   * [args] - rest arguments.
   *
   * @public
   *
   * @param {Collider} colliderA
   * @param {Collider} colliderB
   * @param {Function} cb Callback
   * @param {Object}   ctx
   * @param {...*} args Rest arguments
   */
  collisionInfo(colliderA, colliderB, cb, ctx, ...args) {
    const pair = this.mPairsHash[Pair.__id(colliderA, colliderB)];

    if (pair && pair.mInCollision) {
      const sign = pair.a === colliderA ? 1 : -1;
      cb.call(ctx, pair.mNormal.x * sign, pair.mNormal.y * sign, pair.mOverlap, ...args);
    }
  }

  /**
   * If callback passed and given bodies are in collision invokes callback.
   * if no bodyB provided result will show that is bodyA in collision with any other body or no
   *
   * Note: if more than one collision occurred within bodies, callback will be invoked only with first found.
   *
   * Callback params:
   *
   * normalX - collision normal projected on x axis. In direction from bodyA collider to bodyB collider.
   * normalY - collision normal projected on y axis. In direction from bodyA collider to bodyB collider.
   * overlap - positive number.
   * [args] - rest arguments.
   *
   * @public
   *
   * @param {RigidBody} bodyA
   * @param {RigidBody=} [bodyB=null]
   * @param {Function=} [cb=null]     Callback
   * @param {Object=} [ctx=null]
   * @param {...*} [args] Rest arguments
   *
   * @returns {boolean} Indicator of bodies collision.
   */
  isColliding(bodyA, bodyB = null, cb = null, ctx = null, ...args) {
    const pairs = bodyA.mPairs;

    if (bodyB === null) {
      for (let i = 0, l = pairs.length; i < l; i++) {
        if (pairs[i].mInCollision) {
          return true;
        }
      }

      return false;
    }

    for (let i = 0, l = pairs.length; i < l; i++) {
      const pair = pairs[i];

      if (pair.mInCollision === false)
        continue;

      const sign = pair.bodyA === bodyA && pair.bodyB === bodyB ? 1 :
        pair.bodyA === bodyB && pair.bodyB === bodyA ? -1 : 0;

      if (sign === 0)
        continue;

      if (cb)
        cb.call(ctx, pair.mNormal.x * sign, pair.mNormal.y * sign, pair.mOverlap, ...args);

      return true;
    }

    return false;
  }

  /**
   * @inheritDoc
   */
  onChildrenAdded(gameObject) {
    GameObject.forEach(gameObject, object => {
      const body = object.getComponent(RigidBody);

      if (body !== null) {
        this.__addBody(body);
      }
    });
  }

  /**
   * @inheritDoc
   */
  onChildrenRemoved(gameObject) {
    GameObject.forEach(gameObject, object => {
      const body = object.getComponent(RigidBody);

      if (body !== null) {
        this.__removeBody(body, gameObject);
      }
    });
  }

  /**
   * @inheritDoc
   */
  onComponentAdded(child, component) {
    if (component instanceof RigidBody) {
      this.__addBody(component);
    } else if (component instanceof Collider) {
      this.__addCollider(child, component);
    }
  }

  /**
   * @inheritDoc
   */
  onComponentRemoved(child, component) {
    if (component instanceof RigidBody) {
      this.__removeBody(component, child);
    } else if (component instanceof Collider) {
      this.__removeCollider(component);
    }
  }

  /**
   * Adds body to arcade world. Start tracking its gameObject colliders
   *
   * @private
   * @param {RigidBody} body
   */
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

  /**
   * Removes body from arcade world
   *
   * @private
   * @param {RigidBody} body
   */
  __removeBody(body, gameObject) {
    const bodies = this.mBodies;
    const colliders = gameObject.mCollidersCache;

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

  /**
   * Adds collider to arcade world.
   *
   * @private
   * @param {GameObject} child
   * @param {Collider} collider
   */
  __addCollider(child, collider) {
    const body = child.getComponent(RigidBody);

    if (body && this.mBodies.indexOf(body) !== -1) {
      this.__addPairs(collider, body);

      if (child.mCollidersCache.length === 1) {
        this.__removePairs(body.mCollider);
      }
    }
  }

  /**
   * Removes collider from arcade world.
   *
   * @private
   * @param {GameObject} child
   * @param {Collider} collider
   */
  __removeCollider(child, collider) {
    const body = child.getComponent(RigidBody);

    if (body && this.mBodies.indexOf(body) !== -1) {
      this.__removePairs(collider);

      const pairs = body.mPairs;

      for (let i = pairs.length - 1; i >= 0; i--) {
        const pair = pairs[i];

        if (pair.a === collider || pair.b === collider) {
          pairs.splice(i, 1);
        }
      }

      if (child.mCollidersCache.length === 0) {
        this.__addCollider(child, body.mCollider);
      }
    }
  }

  /**
   * Generate pairs, passed collider with all present colliders
   *
   * @private
   * @param {Collider} collider
   * @param {RigidBody} fromBody
   */
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

  /**
   * Creates pair and adds it to world
   *
   * @private
   * @param {Collider} a
   * @param {Collider} b
   * @param {RigidBody} bodyA
   * @param {RigidBody} bodyB
   */
  __addPair(a, b, bodyA, bodyB) {
    const isBoxA = a.constructor === BoxCollider;
    const isBoxB = b.constructor === BoxCollider;
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

    pair.mChanged = true;
    pair.set(a, b, bodyA, bodyB);
    this.mPairs.push(pair);

    this.mPairsHash[Pair.__id(a, b)] = pair;
    bodyA.mPairs.push(pair);
    bodyB.mPairs.push(pair);
  }

  /**
   * Removes all pairs with given collider
   *
   * @private
   * @param {Collider} collider
   */
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

  /**
   * @inheritDoc
   */
  onFixedUpdate(dt) {
    const contacts = this.mContacts;
    const bodies = this.mBodies;
    const pairs = this.mPairs;
    contacts.length = 0;

    // refresh body colliders if scale, rotation changed
    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];
      body.update();
      body.mContacts.length = 0;
      body.mInGroup = false;
    }

    // reset each pair to defaults
    // so phases will know, if pair in collision is true, then it needs more precise check
    for (let i = 0, l = pairs.length; i < l; i++) {
      const pair = pairs[i];

      pair.mInCollision = !((pair.bodyA.mIsSleeping || pair.bodyA.mInvMass === 0) &&
        (pair.bodyB.mIsSleeping || pair.bodyB.mInvMass === 0));
    }

    // update pairs in collision flag todo
    // this.mBroadPhase.test(pairs);

    // narrow collision test
    for (let i = 0, l = pairs.length; i < l; i++) {
      pairs[i].mInCollision && pairs[i].test();
    }

    for (let i = 0, l = pairs.length; i < l; i++) {
      const pair = pairs[i];

      if (pair.mInCollision) {
        contacts.push(pair);
        pair.bodyA.mContacts.push(pair);
        pair.bodyB.mContacts.push(pair);
      } else {
        pair.mNormalImpulse = 0;
        pair.mTangentImpulse = 0;
      }
    }

    this.__solve(dt);

    if (!this.mSleepAllowed) return;

    const group = [];
    const stack = [];

    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];
      body.postUpdate(); // clear colliders dirty flags

      if (body.mInGroup || body.mIsSleeping || body.mInvMass === 0) continue;

      group.length = 0;
      stack.length = 0;

      stack.push(body);

      while (stack.length !== 0) {
        const body = stack.pop();
        const contacts = body.mContacts;

        group.push(body);
        body.mInGroup = true;

        for (let i = 0, l = contacts.length; i < l; i++) {
          const contact = contacts[i];
          const other = contact.bodyA === body ? contact.bodyB : contact.bodyA;

          if (other.mInGroup || other.mInvMass === 0) continue;

          stack.push(other);
        }
      }

      let isSleeping = true;

      for (let i = 0, l = group.length; i < l; i++) {
        const body = group[i];
        const velocity = body.mVelocity;
        body.mSleepTime = velocity.x * velocity.x + velocity.y * velocity.y < Pair.sleepThreshold ? body.mSleepTime + 1 : 0;
        isSleeping = isSleeping && body.mSleepTime > Pair.timeToSleep;
      }

      for (let i = 0, l = group.length; i < l; i++) {
        group[i].mIsSleeping = isSleeping;
      }
    }
  }

  /**
   * Solve contacts
   *
   * @private
   * @param {Number} dt
   */
  __solve(dt) {
    const iterations = this.mIterations;
    const bodies = this.mBodies;
    const contacts = this.mContacts;
    const gravity = this.mGravity;

    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];

      if (body.mInvMass === 0 || body.mIsSleeping)
        continue;

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

      if (body.mInvMass === 0 || body.mIsSleeping)
        continue;

      const position = body.mPosition;
      const velocity = body.mVelocity;

      position.x += velocity.x * dt * Pair.unitsPerMeter;
      position.y += velocity.y * dt * Pair.unitsPerMeter;
    }

    for (let i = 0; i < iterations; i++) {
      for (let j = 0, l = contacts.length; j < l; j++) {
        contacts[j].solvePosition();
      }
    }
  }

  /**
   * Sets bounds to default values.
   * Should be called on start and on resize.
   *
   * @private
   * @return {void}
   */
  __setBounds() {
    const bounds = Black.stage.bounds;
    const thickness = Number.MAX_SAFE_INTEGER;

    this.mBoundsLeft.set(bounds.x - thickness, bounds.y, thickness, bounds.height);
    this.mBoundsRight.set(bounds.x + bounds.width, bounds.y, thickness, bounds.height);
    this.mBoundsTop.set(bounds.x - thickness, bounds.y - thickness, bounds.width + thickness * 2, thickness);
    this.mBoundsBottom.set(bounds.x - thickness, bounds.y + bounds.height, bounds.width + thickness * 2, thickness);
  }

  /**
   * Enabled or disables world colliding bounds
   *
   * @public
   * @param {boolean} v Value to set
   *
   * @return {void}
   */
  set boundsEnabled(v) {
    if (v) {
      if (!this.mBoundsBody) {
        this.mBoundsBody = new RigidBody();
        this.mBoundsBody.isStatic = true;

        Black.stage.addComponent(this.mBoundsLeft);
        Black.stage.addComponent(this.mBoundsRight);
        Black.stage.addComponent(this.mBoundsTop);
        Black.stage.addComponent(this.mBoundsBottom);

        this.__setBounds();
      }

      Black.stage.addComponent(this.mBoundsBody);
    } else {
      Black.stage.removeComponent(this.mBoundsBody);
    }
  }

  /**
   * Sets the gravity x.
   *
   * @param {Number} v Value to set.
   * @return {void}
   */
  set gravityX(v) {
    this.mGravity.x = v;
  }

  /**
   * Returns this gravity x.
   *
   * @return {Number}
   */
  get gravityX() {
    return this.mGravity.x;
  }

  /**
   * Sets the gravity y.
   *
   * @param {Number} v Value to set.
   * @return {void}
   */
  set gravityY(v) {
    this.mGravity.y = v;
  }

  /**
   * Returns this gravity y.
   *
   * @return {Number}
   */
  get gravityY() {
    return this.mGravity.y;
  }

  /**
   * Sets the count of solving iterations.
   *
   * @param {Number} v Value to set.
   * @return {void}
   */
  set iterations(v) {
    this.mIterations = v;
  }

  /**
   * Returns this count of solving iterations.
   *
   * @return {Number}
   */
  get iterations() {
    return this.mIterations;
  }

  /**
   * Sets the sleep allowed flag.
   *
   * @param {Boolean} v Value to set.
   * @return {void}
   */
  set sleepAllowed(v) {
    this.mSleepAllowed = v;
  }

  /**
   * Returns this sleepAllowed flag.
   *
   * @return {Boolean}
   */
  get sleepAllowed() {
    return this.mSleepAllowed;
  }
}
