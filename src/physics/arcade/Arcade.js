/**
 * Base arcade physics class
 *
 * @cat physics.arcade
 * @extends System
 */

/* @echo EXPORT */
class Arcade extends System {

  /**
   * Creates new instance of Arcade.
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

    /** @private @type {RigidBody} Reference to world bounds body */
    this.mBoundsBody = new RigidBody();

    /** @private @type {BoxCollider} */
    this.mBoundsLeft = new BoxCollider(0, 0, 0, 0);

    /** @private @type {BoxCollider} */
    this.mBoundsRight = new BoxCollider(0, 0, 0, 0);

    /** @private @type {BoxCollider} */
    this.mBoundsTop = new BoxCollider(0, 0, 0, 0);

    /** @private @type {BoxCollider} */
    this.mBoundsBottom = new BoxCollider(0, 0, 0, 0);

    /** @private @type {GameObject} */
    this.mBoundsParent = null;

    /** @private @type {Boolean} */
    this.mBoundsInited = false;

    /** @public @type {Vector} */
    this.gravity = new Vector(0, 1000);

    /** @public @type {Number} Bigger value gives better resolver result, but require more calculations */
    this.iterations = 1;


    this.mBoundsBody.isStatic = true;
  }

  /**
   * Invokes passed callback if given colliders are in collision
   *
   * Callback params:
   *
   * normalX - collision normal projected on x axis. In direction from colliderA to colliderB
   * normalY - collision normal projected on y axis. In direction from colliderA to colliderB
   * overlap - positive number
   * [args] - rest arguments
   *
   * @public
   *
   * @param {Collider} colliderA
   * @param {Collider} colliderB
   * @param {Function} cb Callback
   * @param {Object} ctx
   * @param {...*} [args] Rest arguments
   */
  collisionInfo(colliderA, colliderB, cb, ctx, ...args) {
    const pair = this.mPairsHash[Pair.__id(colliderA, colliderB)];

    if (pair && pair.mInCollision) {
      const sign = pair.a === colliderA ? 1 : -1;
      cb.call(ctx, pair.mNormal.x * sign, pair.mNormal.y * sign, pair.mOverlap, ...args);
    }
  }

  /**
   * If callback passed and given bodies are in collision invokes callback
   *
   * Note: if more than one collision occurred within bodies, callback will be invoked only with first found
   *
   * Callback params:
   *
   * normalX - collision normal projected on x axis. In direction from bodyA collider to bodyB collider
   * normalY - collision normal projected on y axis. In direction from bodyA collider to bodyB collider
   * overlap - positive number
   * [args] - rest arguments
   *
   * @public
   *
   * @param {RigidBody} bodyA
   * @param {RigidBody} bodyB
   * @param {Function} [cb = null] Callback
   * @param {Object} [ctx = null]
   * @param {...*} [args] Rest arguments
   *
   * @returns {boolean} Indicator of bodies collision
   */
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
        this.__removeBody(body);
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
      this.__removeBody(component);
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
  __removeBody(body) {
    const bodies = this.mBodies;
    const pairs = this.mPairs;
    const pairsHash = this.mPairsHash;

    for (let i = pairs.length - 1; i >= 0; i--) {
      const pair = pairs[i];

      if (pair.bodyA === body || pair.bodyB === body) {
        pairs.splice(i, 1);
        pair.constructor.pool.release(pair);

        delete pairsHash[Pair.__id(pair.a, pair.b)];
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

  __rebuildPairs() {
    const bodies = this.mBodies;
    const pairs = this.mPairs;
    this.mPairsHash = Object.create(null);
    const pairsHash = this.mPairsHash;

    for (let i = 0, l = pairs.length; i < l; i++) {
      pairs[i].constructor.pool.release(pairs[i]);
    }

    for (let i = 0, iLen = bodies.length - 1; i < iLen; i++) {
      let bodyA = bodies[i];
      const collidersA = bodyA.gameObject.mCollidersCache.slice();
      collidersA.length === 0 && collidersA.push(bodyA.mCollider);

      for (let j = i + 1, jLen = bodies.length; j < jLen; j++) {
        let bodyB = bodies[j];
        const collidersB = bodyB.gameObject.mCollidersCache.slice();
        collidersB.length === 0 && collidersB.push(bodyB.mCollider);

        for (let k = 0, kLen = collidersA.length; k < kLen; k++) {
          let colliderA = collidersA[k];

          for (let l = 0, lLen = collidersB.length; l < lLen; l++) {
            let colliderB = collidersB[l];

            const isBoxA = colliderA instanceof BoxCollider;
            const isBoxB = colliderB instanceof BoxCollider;
            let pair;

            if (isBoxA && isBoxB) {
              pair = BoxToBoxPair.pool.get();
            } else if (!isBoxA && !isBoxB) {
              pair = CircleToCirclePair.pool.get();
            } else {
              pair = BoxToCirclePair.pool.get();

              if (isBoxB) {
                let tmp = bodyA;
                bodyA = bodyB;
                bodyB = tmp;

                tmp = colliderA;
                colliderA = colliderB;
                colliderB = tmp;
              }
            }

            pair.set(colliderA, colliderB, bodyA, bodyB);
            pairs.push(pair);

            pairsHash[Pair.__id(colliderA, colliderB)] = pair;
            bodyA.mPairs.push(pair);
            bodyB.mPairs.push(pair);
          }
        }
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
      bodies[i].update();
    }

    // reset each pair to defaults
    // so phases will know, if pair in collision is true, then it needs more precise check
    for (let i = 0, l = pairs.length; i < l; i++) {
      pairs[i].mInCollision = !(pairs[i].bodyA.mInvMass === 0 && pairs[i].bodyB.mInvMass === 0);
    }

    // update pairs in collision flag todo
    // this.mBroadPhase.test(pairs);

    // narrow collision test
    for (let i = 0, l = pairs.length; i < l; i++) {
      pairs[i].mInCollision && pairs[i].test();
    }

    // clear colliders dirty flags
    for (let i = 0, l = bodies.length; i < l; i++) {
      bodies[i].postUpdate();
    }

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

  /**
   * Solve contacts
   *
   * @private
   * @param {Number} dt
   */
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
   * Sets bounds to default values
   *
   * @private
   */
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

  /**
   * Allows objects to collide with bounds body
   *
   * @public
   */
  enableBounds() {
    if (!this.mBoundsInited) {
      this.__initBounds();
    }

    this.mBoundsParent.addComponent(this.mBoundsBody);
  }

  /**
   * Removes world bounds
   *
   * @public
   */
  disableBounds() {
    this.mBoundsParent.removeComponent(this.mBoundsBody);
  }

  /**
   * Sets bounds rectangle to passed values
   *
   * @private
   * @param x
   * @param y
   * @param width
   * @param height
   * @param [parent=Black.stage]
   */
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
