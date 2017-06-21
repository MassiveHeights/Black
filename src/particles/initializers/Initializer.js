/**
 * Base class for particle's initializators. Each initializer updates particle data once at start, eg when particle added to scene.
 *
 * @cat particles.initializers
 */
/* @echo EXPORT */
class Initializer {
  /**
   * Creates new Initializer instance.
   */
  constructor() {
  }

  /**
   * This method is called on every new particle and sets its starting values.
   * Override this method when creating custom initializers.
   *
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {}
}
