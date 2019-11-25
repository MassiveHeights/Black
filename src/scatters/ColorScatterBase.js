import { Scatter } from "./Scatter";
import { ColorHelper } from "../utils/ColorHelper";

/**
 * A base class for color scatters.
 *
 * @cat scatters
 * @extends Scatter
 */
export class ColorScatterBase extends Scatter {  
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
