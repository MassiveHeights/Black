/**
 * The particle!
 *
 * @cat particles
 * @class
 */
/* @echo EXPORT */
class Particle {
  constructor() {
    this.reset();
  }

  /**
   * Resets particle to default state.
   *
   * @returns {void}
   */
  reset() {
    /**
     * The index of a texture.
     * @type {number}
     */
    this.textureIndex = 0;

    /**
     * The x/y scale of this particle.
     * @type {number}
     */
    this.scale = 1;

    /**
     * Alpha value.
     * @type {number}
     */
    this.alpha = 1;

    /**
     * The life of this particle.
     * @type {number}
     */
    this.life = 1;

    /**
     * The age of this particle.
     * @type {number}
     */
    this.age = 0;

    /**
     * Relation of life to age.
     * @type {number}
     */
    this.energy = this.age / this.life;

    /**
     * The mass.
     * @type {number}
     */
    this.mass = 0;

    /**
     * X-component.
     * @type {number}
     */
    this.x = 0;

    /**
     * Y-component.
     * @type {number}
     */
    this.y = 0;

    /**
     * Rotation of this particle.
     * @type {number}
     */
    this.r = 0

    /**
     * Velocity by x.
     * @type {number}
     */
    this.vx = 0;

    /**
     * Velocity by y.
     * @type {number}
     */
    this.vy = 0;

    /**
     * Particle x-acceleration.
     * @type {number}
     */
    this.ax = 0;

    /**
     * Particle y-acceleration.
     * @type {number}
     */
    this.ay = 0;
    
    this.pluginName = WebGLParticlesPlugin.name;
  }

  /**
   * Internal update method.
   *
   * @param {number} dt Time since last update.
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
