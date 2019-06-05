/**
 * The particle!
 *
 * @cat particles
 */
export class Particle {
  constructor() {

    /** @type {number} The index of a texture. */
    this.textureIndex = 0;

    /** @type {number} The x scale of this particle. */
    this.scaleX = 1;

    /** @type {number} The x scale of this particle. */
    this.scaleY = 1;

    /** @type {number} An alpha value. */
    this.alpha = 1;

    /** @type {number} The life of this particle. */
    this.life = 1;

    /** @type {number} The age of this particle. */
    this.age = 0;

    /** @type {number} Relation of life to age. */
    this.energy = this.age / this.life;

    /** @type {number} The mass. */
    this.mass = 0;

    /** @type {number} X-component. */
    this.x = 0;

    /** @type {number} Y-component. */
    this.y = 0;

    /** @type {number} Rotation of this particle. */
    this.r = 0;

    /** @type {number} Velocity by x. */
    this.vx = 0;

    /** @type {number} Velocity by y. */
    this.vy = 0;

    /** @type {number} Particle x-acceleration. */
    this.ax = 0;

    /** @type {number} Particle y-acceleration. */
    this.ay = 0;

    /** @type {number|null} Particle tinting color. */
    this.color = null;

    /** @type {number} Particle origin point along x-axis. */
    this.anchorX = 0.5;

    /** @type {number} Particle origin point along y-axis. */
    this.anchorY = 0.5;
  }

  /**
   * Resets particle to default state.
   *
   * @returns {void}
   */
  reset() {
    this.scaleX = this.scaleY = this.alpha = this.life = 1;
    this.textureIndex = this.age = this.energy = this.mass = this.x = this.y = this.r = this.vx = this.vy = this.ax = this.ay = 0;
    this.anchorX = this.anchorY = 0.5;
  }

  /**
   * Internal update method.
   *
   * @param {number} dt Time since last update.
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
