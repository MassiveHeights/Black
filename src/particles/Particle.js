/* @echo EXPORT */
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    /** @type {number} */
    this.textureIndex = 0;

    /** @type {number} */
    this.scale = 1;

    /** @type {number} */
    this.alpha = 1;

    /** @type {number} */
    this.life = 1;

    /** @type {number} */
    this.age = 0;

    /** @type {number} */
    this.energy = this.age / this.life;

    /** @type {number} */
    this.mass = 0;

    /** @type {number} */
    this.x = 0;

    /** @type {number} */
    this.y = 0;

    /** @type {number} */
    this.r = 0

    /** @type {number} */
    this.vx = 0;

    /** @type {number} */
    this.vy = 0;

    /** @type {number} */
    this.ax = 0;

    /** @type {number} */
    this.ay = 0;
  }

  /**
   * update
   *
   * @param {number} dt
   *
   * @return {void}
   */
  update(dt) {
    if (this.life <= 0) {
      this.life = 0;
      return;
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if (this.mass > 0) {
      this.ax *= 1 / this.mass;
      this.ay *= 1 / this.mass;
    }

    this.vx += this.ax * dt;
    this.vy += this.ay * dt;

    this.ax = 0;
    this.ay = 0;

    this.life -= dt;
    this.age += dt;

    this.energy = this.age / (this.age + this.life);
  }
}
