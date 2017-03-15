/* @echo EXPORT */
class Scale extends Initializer {
  /**
   * constructor - Description
   *
   * @param {FloatScatter} floatScatter Description
   *
   * @return {void} Description
   */
  constructor(floatScatter) {
    super();

    /** @type {FloatScatter} */
    this.scatter = floatScatter;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.scale = this.scatter.getValue();
  }
}
