class Arcade extends System {
  constructor() {
    super();
    
    this.mBodies = []; // All bodies that are on stage
    this.mChanged = true; // Indicates necessity of pairs rebuild
    this.mPairs = []; // All colliders pairs to check collisions within
    this.phases = [new NarrowPhase()]; // Phases for search collision within pairs
    //this.bounds = Phaser.GAMES[0].world.bounds; // World bounds to collide with bodies
    this.gravity = 1;
    this.viscosity = 1;
    this.iterations = 1;
    this.mPairsHash = {};

    this.bounds = new Rectangle(0, 0, 1000, 1000);
  }

  collideCallback(colliderA, colliderB, cb, ctx, ...args) {
    const id = colliderA.id + '&' + colliderB.id;
    const pair = this.mPairsHash[id];

    if (!pair || !pair.isColliding)
      return;

    const sign = pair.a === colliderA ? 1 : -1;
    cb.call(ctx, pair.normal.x * sign, pair.normal.y * sign, pair.overlap, ...args);
  }

  onComponentAdded(sprite, body) {
    if (this.mBodies.indexOf(body) !== -1)
      return;

    body.sprite = sprite;
    this.mBodies.push(body);
    body.onAdded();
    this.mChanged = true; // todo also when body collider added, removed
  }

  remove(body) {
    const index = this.mBodies.indexOf(body);
    if (index === -1)
     return;

    this.mBodies.splice(index, 1);
    this.mChanged = true;
    body.onRemoved();
  }

  onFixedUpdate(dt) {
    this.mChanged && this.__rebuildPairs();
    this.__update();

    for (let i = 0, l = this.iterations; i < l; i++) {
      this.__test();
      this.__solve();
      this.__postUpdate();
      this.mChanged = false;
    }
  }

  // Recreates pairs array
  __rebuildPairs() {
    const bodies = this.mBodies;
    const pairs = this.mPairs;
    this.mPairsHash = {};

    for (let i = 0, l = pairs.length; i < l; i++) {
      pairs[i].constructor.pool.release(pairs[i]);
    }

    pairs.length = 0;

    for (let i = 0, iLen = bodies.length - 1; i < iLen; i++) {
      const bodyA = bodies[i];

      for (let j = i + 1, jLen = bodies.length; j < jLen; j++) {
        const bodyB = bodies[j];
        const boxesA = bodyA.mBoxColliders;
        const boxesB = bodyB.mBoxColliders;
        const circlesA = bodyA.mCircleColliders;
        const circlesB = bodyB.mCircleColliders;

        this.__addPairs(bodyA, bodyB, boxesA, boxesB, BoxesPair);
        this.__addPairs(bodyA, bodyB, circlesA, circlesB, CirclesPair);
        this.__addPairs(bodyA, bodyB, boxesA, circlesB, BoxCirclePair);
        this.__addPairs(bodyB, bodyA, boxesB, circlesA, BoxCirclePair);
      }
    }
  }

  __addPairs(bodyA, bodyB, collidersA, collidersB, Pair) {
    const pairsHash = this.mPairsHash;
    const pairs = this.mPairs;

    for (let i = 0, iLen = collidersA.length; i < iLen; i++) {
      const a = collidersA[i];

      for (let j = 0, jLen = collidersB.length; j < jLen; j++) {
        const b = collidersB[j];

        const pair = Pair.pool.get();
        pair.set(a, b, bodyA, bodyB);
        pairs.push(pair);

        pairsHash[a.id + '&' + b.id] = pair;
        pairsHash[b.id + '&' + a.id] = pair;
      }
    }
  }

  // Updates each sprite position according to its collider
  __update() {
    const gravity = this.gravity;
    const viscosity = this.viscosity;
    const bodies = this.mBodies;
    const bounds = this.bounds;
    const left = bounds.x;
    const right = left + bounds.width;
    const top = bounds.y;
    const bottom = top + bounds.height;

    for (let i = 0, l = bodies.length; i < l; i++) {
      bodies[i].update(gravity, viscosity, left, right, top, bottom);
    }
  }

  // Process pairs trough each pass in phases array
  __test() {
    const phases = this.phases;
    const changed = this.mChanged;
    const pairs = this.mPairs.slice();

    for (let i = 0, l = pairs.length; i < l; i++) {
      pairs[i].isColliding = pairs[i].bodyA.invMass !== 0 || pairs[i].bodyB.invMass !== 0;
    }

    for (let i = 0, l = phases.length; i < l; i++) {
      phases[i].update(pairs, changed);
    }
  }

  // Resolves colliding pairs
  __solve() {
    const pairs = this.mPairs;

    for (let i = 0, l = pairs.length; i < l; i++) {
      pairs[i].isColliding && pairs[i].solve();
    }
  }

  __postUpdate() {
    const bodies = this.mBodies;

    for (let i = 0, l = bodies.length; i < l; i++) {
      bodies[i].postUpdate();
    }
  }
}
