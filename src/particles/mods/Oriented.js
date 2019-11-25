import { Modifier } from "../Modifier";
import { MathEx } from "../../math/MathEx";

/**
 * Rotates particle along velocity vector.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class Oriented extends Modifier {
  /**
   * Creates new instance of oriented modifier.
   */
  constructor(angleShift = 0) {
    super(false);

    /**
     * @type {number}
     */
    this.angleShift = angleShift;
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.r = (Math.atan2(particle.vy, particle.vx) * MathEx.RAD2DEG - (90 + this.angleShift)) * dt;
  }
}
