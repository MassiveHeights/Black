/**
 * @extends Action
 */
/* @echo EXPORT */
class Acceleration extends Action {
  constructor(vectorScatter) {
    super();

    this.scatter = vectorScatter;
  }

  /**
   * @override
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */
  update(emmiter, particle, dt, t) {
    let v = this.scatter.getValue();

    particle.ax += v.x;
    particle.ay += v.y;
  }
}
