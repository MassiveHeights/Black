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
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {}
}
