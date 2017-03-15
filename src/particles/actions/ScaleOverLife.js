/**
 * @extends Action
 */
/* @echo EXPORT */
class ScaleOverLife extends Action {
  constructor(floatScatter) {
    super();

    this.scatter = floatScatter;
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
    particle.scale = this.scatter.getValueAt(particle.energy);
  }
}
