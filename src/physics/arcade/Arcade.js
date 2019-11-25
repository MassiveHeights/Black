import { System } from "../../core/System";
import { BroadPhase } from "./phases/BroadPhase";
import { BoxCollider } from "../../colliders/BoxCollider";
import { Vector } from "../../geom/Vector";
import { GameObject } from "../../core/GameObject";
import { Collider } from "../../colliders/Collider";
import { RigidBody } from "../RigidBody";
import { Black } from "../../Black";
import { BoxToCirclePair } from "./pairs/BoxToCirclePair";
import { CircleToCirclePair } from "./pairs/CircleToCirclePair";
import { BoxToBoxPair } from "./pairs/BoxToBoxPair";
import { Pair } from "./pairs/Pair";

/**
 * Simple AABB physics engine (beta).
 *
 * @cat physics.arcade
 * @extends black-engine~System
 */
export class Arcade extends System {
  /**
   * Creates new Arcade instance.
   */
  constructor() {
    super();

    /**
     * Bodies that are on stage.
     * @private 
     * @type {Array<black-engine~RigidBody>}
     */
    this.mBodies = [];

    /**
     * Pairs to check collisions within. With colliders which bodies are on stage.
     * @private 
     * @type {Array<black-engine~Pair>}
     */
    this.mPairs = [];

    /**
     * Pairs which are in collision per frame.
     * @private 
     * @type {Array<black-engine~Pair>}
     */
    this.mContacts = [];

    /**
     * Broad collision test instance.
     * @private 
     * @type {black-engine~BroadPhase}
     */
    this.mBroadPhase = new BroadPhase();

    /**
     * Object to store pairs by their id. For quick search in collision callbacks.
     * @private 
     * @type {Object}
     */
    this.mPairsHash = Object.create(null);

    /**
     * Reference to world bounds body.
     * @private 
     * @type {black-engine~RigidBody|null}
     */
    this.mBoundsBody = null;

    /** @private 
     * @type {black-engine~BoxCollider} */
    this.mBoundsLeft = new BoxCollider(0, 0, 0, 0);

    /** @private 
     * @type {black-engine~BoxCollider} */
    this.mBoundsRight = new BoxCollider(0, 0, 0, 0);

    /** @private 
     * @type {black-engine~BoxCollider} */
    this.mBoundsTop = new BoxCollider(0, 0, 0, 0);

    /** @private 
     * @type {black-engine~BoxCollider} */
    this.mBoundsBottom = new BoxCollider(0, 0, 0, 0);

    /** @private 
     * @type {black-engine~Vector} */
    this.mGravity = new Vector(0, 1000);

    /**
     * Bigger value gives better resolver result, but require more calculations.
     * @private 
     * @type {number}
     */
    this.mIterations = 5;

    /**
     * Switch for sleep calculations.
     * @private 
     * @type {boolean}
     */
    this.mSleepEnabled = true;

    /**
     * Update delta time, secs.
     * @public
     * @type {number}
     */
    this.delta = 1 / 60;
  }

  /**
   * Invokes passed callback if given colliders are in collision.
   *
   * Callback params:
   * normalX - collision normal projected on x axis. In direction from colliderA to colliderB.
   * normalY - collision normal projected on y axis. In direction from colliderA to colliderB.
   * overlap - positive number.
   * [args] - rest arguments.
   *
   * @public
   *
   * @param {black-engine~Collider} colliderA Collider to check
   * @param {black-engine~Collider} colliderB Collider to check
   * @param {Function} cb        Callback
   * @param {Object} ctx         Callback context
   * @param {...*} [args]        Rest arguments
   *
   * @return {void}
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
   * If no bodyB provided result will show that bodyA is in collision with any other body if so.
   *
   * Note: if more than one collision occurred within bodies, callback will be invoked only with a first found.
   *
   * Callback params:
   * normalX - collision normal projected on x axis. In direction from bodyA collider to bodyB collider.
   * normalY - collision normal projected on y axis. In direction from bodyA collider to bodyB collider.
   * overlap - positive number.
   * [args] - rest arguments.
   *
   * @public
   *
   * @param {black-engine~RigidBody} bodyA         Body to check
   * @param {black-engine~RigidBody=} [bodyB=null] Body to check
   * @param {Function=} [cb=null]     Callback
   * @param {Object=} [ctx=null]      Callback context
   * @param {...*} [args]             Rest arguments
   *
   * @return {boolean} Indicator of bodies collision.
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

      if (body) {
        this.__addBody(/** @type {RigidBody} */(body));
      }
    });
  }

  /**
   * @inheritDoc
   */
  onChildrenRemoved(gameObject) {
    GameObject.forEach(gameObject, object => {
      const body = /** @type {!RigidBody} */ (object.getComponent(RigidBody));

      if (body) {
        this.__removeBody(body, gameObject);
      }
    });
  }

  /**
   * @inheritDoc
   */
  onComponentAdded(child, component) {
    if (component instanceof RigidBody) {
      this.__addBody(/** @type {RigidBody} */(component));
    } else if (component instanceof Collider) {
      this.__addCollider(child, /** @type {Collider} */(component));
    }
  }

  /**
   * @inheritDoc
   */
  onComponentRemoved(child, component) {
    if (component instanceof RigidBody) {
      this.__removeBody(/** @type {RigidBody} */(component), child);
    } else if (component instanceof Collider) {
      this.__removeCollider(child, /** @type {Collider} */(component));
    }
  }

  /**
   * Adds body to arcade world. Start tracking its gameObject colliders.
   *
   * @private
   * @param {black-engine~RigidBody} body Body to add
   *
   * @return {void}
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
   * Removes body from arcade world.
   *
   * @private
   * @param {black-engine~RigidBody} body        Body to remove
   * @param {black-engine~GameObject} gameObject Body's game object
   *
   * @return {void}
   */
  __removeBody(body, gameObject) {
    const bodies = this.mBodies;
    const colliders = gameObject.mCollidersCache;

    if (colliders.length === 0) {
      this.__removePairs(body.mCollider);
    } else {
      for (let i = 0, l = colliders.length; i < l; i++) {
        this.__removePairs(colliders[i]);
      }
    }

    body.mPairs.length = 0;
    bodies.splice(bodies.indexOf(body), 1);
  }

  /**
   * Adds collider to arcade world.
   *
   * @private
   * @param {black-engine~GameObject} child  Parent of the collider
   * @param {black-engine~Collider} collider Collider to add
   *
   * @return {void}
   */
  __addCollider(child, collider) {
    const body = /** @type {RigidBody} */ (child.getComponent(RigidBody));

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
   * @param {black-engine~GameObject} child  Parent of the collider
   * @param {black-engine~Collider} collider Collider to remove
   *
   * @return {void}
   */
  __removeCollider(child, collider) {
    const body = /** @type {RigidBody} */ (child.getComponent(RigidBody));

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
   * Generate pairs, passed collider with all present colliders.
   *
   * @private
   * @param {black-engine~Collider} collider   Collider to generate with
   * @param {black-engine~RigidBody} fromBody  The collider body
   *
   * @return {void}
   */
  __addPairs(collider, fromBody) {
    const bodies = this.mBodies;
    collider.mChanged = true;

    for (let i = 0, iLen = bodies.length; i < iLen; i++) {
      const body = bodies[i];
      const colliders = body.gameObject.mCollidersCache;

      if (body === fromBody)
        continue;

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
   * Creates pair and adds it to world.
   *
   * @private
   * @param {black-engine~Collider} a      Pair collider
   * @param {black-engine~Collider} b      Pair collider
   * @param {black-engine~RigidBody} bodyA Pair body
   * @param {black-engine~RigidBody} bodyB Pair body
   *
   * @return {void}
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
    pair.mInCollision = false;
    this.mPairs.push(pair);

    this.mPairsHash[Pair.__id(a, b)] = pair;
    bodyA.mPairs.push(pair);
    bodyB.mPairs.push(pair);
  }

  /**
   * Removes all pairs with given collider.
   *
   * @private
   * @param {black-engine~Collider} collider Pairs collider
   *
   * @return {void}
   */
  __removePairs(collider) {
    const pairs = this.mPairs;
    const pairsHash = this.mPairsHash;

    for (let i = pairs.length - 1; i >= 0; i--) {
      const pair = pairs[i];

      if (pair.a === collider || pair.b === collider) {
        pairs.splice(i, 1);

        if (pair instanceof BoxToBoxPair)
          BoxToBoxPair.pool.release(pair);
        else if (pair instanceof BoxToCirclePair)
          BoxToCirclePair.pool.release(pair);
        else if (pair instanceof CircleToCirclePair)
          CircleToCirclePair.pool.release(pair);

        //pair.constructor.pool.release(pair);

        delete pairsHash[Pair.__id(pair.a, pair.b)];

        pair.bodyA.mPairs.splice(pair.bodyA.mPairs.indexOf(pair), 1);
        pair.bodyB.mPairs.splice(pair.bodyB.mPairs.indexOf(pair), 1);
      }
    }
  }

  /**
   * @inheritDoc
   */
  onPostUpdate() {
    const dt = this.delta;
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

      pair.mIsStatic = (pair.bodyA.mIsSleeping || pair.bodyA.mInvMass === 0) &&
        (pair.bodyB.mIsSleeping || pair.bodyB.mInvMass === 0);

      if (pair.mIsStatic === false) {
        pair.mInCollision = true;
      }
    }

    // update pairs in collision flag todo
    // this.mBroadPhase.test(pairs);

    // narrow collision test
    for (let i = 0, l = pairs.length; i < l; i++) {
      const pair = pairs[i];

      if (pair.mInCollision && pair.mIsStatic === false) {
        pair.test();
      }
    }

    for (let i = 0, l = pairs.length; i < l; i++) {
      const pair = pairs[i];

      if (pair.mInCollision) {
        pair.mIsStatic === false && contacts.push(pair);
        pair.bodyA.mContacts.push(pair);
        pair.bodyB.mContacts.push(pair);
      } else {
        pair.mNormalImpulse = 0;
        pair.mTangentImpulse = 0;
      }
    }

    this.__solve(dt);

    if (!this.mSleepEnabled)
      return;

    const group = [];
    const stack = [];

    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];
      body.clearFlags(); // clear colliders dirty flags

      if (body.mInGroup || body.mIsSleeping || body.mInvMass === 0)
        continue;

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

          if (other.mInGroup || other.mInvMass === 0)
            continue;

          stack.push(other);
        }
      }

      let isSleeping = true;
      const sleepThreshold = Pair.sleepThreshold * Pair.unitsPerMeter * Black.stage.mScaleX;

      for (let i = 0, l = group.length; i < l; i++) {
        const body = group[i];
        const velocity = body.mVelocity;
        body.mSleepTime = velocity.x * velocity.x + velocity.y * velocity.y < sleepThreshold ? body.mSleepTime + 1 : 0;
        isSleeping = isSleeping && body.mSleepTime > Pair.timeToSleep;
      }

      for (let i = 0, l = group.length; i < l; i++) {
        group[i].mIsSleeping = isSleeping;
      }
    }
  }

  /**
   * Solve contacts.
   *
   * @private
   * @param {number} dt Time from last update, ms.
   *
   * @return {void}
   */
  __solve(dt) {
    const iterations = this.mIterations;
    const contacts = this.mContacts;
    const bodies = this.mBodies;
    const gravity = this.mGravity;

    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];

      if (body.mInvMass === 0 || body.mIsSleeping)
        continue;

      const force = body.mForce;
      const velocity = body.mVelocity;
      const invMass = body.mInvMass;
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

    const unitsPerMeterDt = Black.stage.mScaleX * Pair.unitsPerMeter * dt;

    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];
      body.mForce.set(0, 0);

      if (body.mInvMass === 0 || body.mIsSleeping)
        continue;

      const position = body.mPosition;
      const velocity = body.mVelocity;

      position.x += velocity.x * unitsPerMeterDt;
      position.y += velocity.y * unitsPerMeterDt;
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

    this.mBoundsLeft.set(-thickness, 0, thickness, bounds.height);
    this.mBoundsRight.set(bounds.width, 0, thickness, bounds.height);
    this.mBoundsTop.set(-thickness, -thickness, bounds.width + thickness * 2, thickness);
    this.mBoundsBottom.set(-thickness, bounds.height, bounds.width + thickness * 2, thickness);
  }

  /**
   * Enabled or disables world colliding bounds.
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
   * @param {number} v Value to set.
   * @return {void}
   */
  set gravityX(v) {
    this.mGravity.x = v;
  }

  /**
   * Returns this gravity x.
   *
   * @return {number}
   */
  get gravityX() {
    return this.mGravity.x;
  }

  /**
   * Sets the gravity y.
   *
   * @param {number} v Value to set.
   * @return {void}
   */
  set gravityY(v) {
    this.mGravity.y = v;
  }

  /**
   * Returns this gravity y.
   *
   * @return {number}
   */
  get gravityY() {
    return this.mGravity.y;
  }

  /**
   * Sets the count of solving iterations.
   *
   * @param {number} v Value to set.
   * @return {void}
   */
  set iterations(v) {
    this.mIterations = v;
  }

  /**
   * Returns this count of solving iterations.
   *
   * @return {number}
   */
  get iterations() {
    return this.mIterations;
  }

  /**
   * Sets the sleep allowed flag.
   *
   * @param {boolean} v Value to set.
   * @return {void}
   */
  set sleepEnabled(v) {
    this.mSleepEnabled = v;
  }

  /**
   * Returns this sleepAllowed flag.
   *
   * @return {boolean}
   */
  get sleepEnabled() {
    return this.mSleepEnabled;
  }
}
