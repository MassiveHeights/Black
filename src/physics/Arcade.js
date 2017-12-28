/* @echo EXPORT */
class Arcade extends System {
  constructor() {
    super();

    this.mIterations = 10;
    this.mGravity = new Vector(0, 0.98);

    this.mContacts = [];
    this.mBodies = [];
  }

  onChildrenAdded(gameObject) {
    let body = gameObject.getComponent(RigidBody); // take only 1, ignore the rest
    if (body == null)
      return;

    let bounds = gameObject.getBounds(gameObject.parent, false);

    body.position.x = bounds.x;
    body.position.y = bounds.y;

    body.size.x = bounds.width;
    body.size.y = bounds.height;

    body.updateBounds();

    this.mBodies.push(body);
  }

  onFixedUpdate(dt) {
    this.__find();
    this.__forces();

    // initialize collisions
    const clength = this.mContacts.length;
    for (let i = 0, l = clength; i < l; i++)
      this.mContacts[i].init(this.mGravity, Arcade.EPSILON);

    this.__solveCollisions();
    this.__integrateVelocities();
    this.__correctPositions();

    const length = this.mBodies.length;

    for (var i = 0; i < length; i++) {
      const body = this.mBodies[i];

      body.gameObject.x = body.position.x;
      body.gameObject.y = body.position.y;
    }
  }

  __find() {
    this.mContacts.splice(0, this.mContacts.length);

    const length = this.mBodies.length;
    for (let i = 0; i < length; i++) {
      let a = this.mBodies[i];

      for (let j = i + 1; j < length; j++) {
        let b = this.mBodies[j];

        if (a.im === 0 && b.im === 0)
          continue;

        if (a.aabb.isOverlapping(b.aabb)) {
          let c = new Manifold(a, b);

          if (c.solve())
            this.mContacts.push(c);
        }
      }
    }
  }

  __forces() {
    const length = this.mBodies.length;

    for (var i = 0; i < length; i++)
      this.mBodies[i].integrateForces(this.mGravity);
  }

  __solveCollisions() {
    for (let i = 0; i < this.mIterations; i++)
      for (let c = 0, l = this.mContacts.length; c < l; c++)
        this.mContacts[c].resolve(Arcade.EPSILON);
  }

  __integrateVelocities() {
    const length = this.mBodies.length;

    for (var i = 0; i < length; i++) {
      const body = this.mBodies[i];
      body.integrateVelocity(this.mGravity);
      body.clearForces();
      body.updateBounds();
    }
  }

  __correctPositions() {
    const clength = this.mContacts.length;

    for (let i = 0, l = clength; i < l; i++)
      this.mContacts[i].positionalCorrection();
  }
}

class Manifold {
  constructor(a, b) {
    this.a = a;
    this.b = b;

    this.e = Math.min(a.restitution, b.restitution);
    this.sf = 0;
    this.df = 0;

    this.normal = new Vector(0, 0);
    this.penetration = 0;
  }

  init(gravity, epsilon) {
    this.sf = Math.sqrt(this.a.staticFriction * this.b.staticFriction);
    this.df = Math.sqrt(this.a.dynamicFriction * this.b.dynamicFriction);
    const rx = this.b.velocity.x - this.a.velocity.x;
    const ry = this.b.velocity.y - this.a.velocity.y;

    if ((rx * rx + ry * ry) < (gravity.x * gravity.x + gravity.y * gravity.y) + epsilon)
      this.e = 0.0;
  }

  solve() {
    let a = this.a;
    let b = this.b;

    const nx = a.position.x - b.position.x;
    const ny = a.position.y - b.position.y;

    const aex = (a.aabb.maxX - a.aabb.minX) * 0.5;
    const bex = (b.aabb.maxX - b.aabb.minX) * 0.5;

    const xoverlap = aex + bex - Math.abs(nx);
    if (xoverlap > 0) {

      const aey = (a.aabb.maxY - a.aabb.minY) * 0.5;
      const bey = (b.aabb.maxY - b.aabb.minY) * 0.5;

      var yoverlap = aey + bey - Math.abs(ny);
      if (yoverlap) {

        if (xoverlap < yoverlap) {
          this.normal.x = nx < 0 ? 1 : -1;
          this.normal.y = 0;
          this.penetration = xoverlap;
          return true;
        } else {
          this.normal.x = 0;
          this.normal.y = ny < 0 ? 1 : -1;
          this.penetration = yoverlap;
          return true;
        }
      }
    }

    return false;
  }

  resolve(epsilon) {
    let a = this.a;
    let b = this.b;

    let rx = b.velocity.x - a.velocity.x;
    let ry = b.velocity.y - a.velocity.y;
    let velAlongNormal = rx * this.normal.x + ry * this.normal.y;

    if (velAlongNormal > 0)
      return;

    let j = -(1.0 + this.e) * velAlongNormal;
    j /= (a.im + b.im);

    a.applyImpulse(-j * this.normal.x, -j * this.normal.y);
    b.applyImpulse(j * this.normal.x, j * this.normal.y);

    let tx = rx - (this.normal.x * velAlongNormal);
    let ty = ry - (this.normal.y * velAlongNormal);
    let tl = Math.sqrt(tx * tx + ty * ty);

    if (tl > epsilon) {
      tx /= tl;
      ty /= tl;
    }

    let jt = -(rx * tx + ry * ty);
    jt /= (a.im + b.im);

    if (Math.abs(jt) < epsilon)
      return;

    if (Math.abs(jt) < j * this.sf) {
      tx = tx * jt;
      ty = ty * jt;
    } else {
      tx = tx * -j * this.df;
      ty = ty * -j * this.df;
    }

    a.applyImpulse(-tx, -ty);
    b.applyImpulse(tx, ty);
  }

  positionalCorrection() {
    let a = this.a;
    let b = this.b;

    const percent = 0.7;
    const slop = 0.05;
    var m = Math.max(this.penetration - slop, 0.0) / (a.im + b.im);

    const cx = m * this.normal.x * percent;
    const cy = m * this.normal.y * percent;

    a.position.x -= cx * a.im;
    a.position.y -= cy * a.im;

    b.position.x += cx * b.im;
    b.position.y += cy * b.im;
  }
}

Arcade.EPSILON = 0.0001;

/* @echo EXPORT */
class RigidBody extends Component {
  constructor(mass = 1) {
    super();

    this.mType = BodyType.DYNAMIC;

    this.mass = mass !== undefined ? mass : 0;
    this.im = mass === 0 ? 0 : 1 / mass;
    this.restitution = 0.1;
    this.staticFriction = 1;
    this.dynamicFriction = 0.3;

    this.velocity = new Vector(0, 0);
    this.position = new Vector(0, 0);
    this.size = new Vector(0, 0);

    this.force = new Vector(0, 0);
    this.aabb = new AABB(0, 0, 0, 0);
  }

  updateBounds() {
    this.aabb.minX = this.position.x;
    this.aabb.maxX = this.position.x + this.size.x;

    this.aabb.minY = this.position.y;
    this.aabb.maxY = this.position.y + this.size.y;
  }

  integrateForces(gravity) {
    if (this.im !== 0) {
      this.velocity.x += (this.force.x * this.im + gravity.x) * 0.5;
      this.velocity.y += (this.force.y * this.im + gravity.y) * 0.5;
    }
  }

  integrateVelocity(gravity) {
    if (this.im !== 0) {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.integrateForces(gravity);
    }
  }

  applyImpulse(x, y) {
    this.velocity.x += this.im * x;
    this.velocity.y += this.im * y;
  }

  applyForce(x, y) {
    this.force.x += x;
    this.force.y += y;
  }

  clearForces() {
    this.force.x = 0;
    this.force.y = 0;
  }
}

/* @echo EXPORT */
var BodyType = {
  STATIC: 'static',
  DYNAMIC: 'dynamic',
  KINEMATIC: 'kinematic'
};

/* @echo EXPORT */
class AABB {
  constructor(minX = 0, minY = 0, maxX = 0, maxY = 0) {
    this.minX = minX;
    this.minY = minY;

    this.maxX = maxX;
    this.maxY = maxY;
  }

  isOverlapping(b) {
    if (this.maxX < b.minX || this.minX > b.maxX)
      return false;

    if (this.maxY < b.minY || this.minY > b.maxY)
      return false;

    return true
  }
}