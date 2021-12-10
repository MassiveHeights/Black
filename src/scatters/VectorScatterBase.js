import { Scatter } from "./Scatter";
import { Vector } from "../geom/Vector";

/**
 * A base class for Vector scatters.
 *
 * @cat scatters
 * @extends Scatter
 */
export class VectorScatterBase extends Scatter {
  /**
   * Creates new VectorScatter instance.
   */
  constructor() {
    super();

    /**
     * Cached last value of `getValueAt` result.
     * 
     * @public
     * @readonly
     * @type {Vector}
     */
    this.value = new Vector();
  }

  /**
   * Returns random value.
   *
   * @return {Vector}.
   */
  getValue() {
    return this.getValueAt(Math.random());
  }
}