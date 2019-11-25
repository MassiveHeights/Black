import { Scatter } from "./Scatter";

/**
 * A base class for number scatters.
 *
 * @cat scatters
 * @extends black-engine~Scatter
 */
export class FloatScatterBase extends Scatter {
  /**
   * Creates new FloatScatter instance.
   */
  constructor() {
    super();

    /**
     * Cached last value of `getValueAt` result.
     * 
     * @readonly
     * @type {number}
     */
    this.value = 0;
  }
  
  /**
   * Returns random value.
   *
   * @return {number}
   */
  getValue() {
    return this.getValueAt(Math.random());
  }
}
