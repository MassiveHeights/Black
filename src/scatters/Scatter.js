/**
 * Base class for distribution objects.
 *
 * @cat scatters
 */
export class Scatter {
  /**
   * Creates new Scatter instance.
   */
  constructor() {}

  /**
   * Returns random value.
   *
   * @return {*} Any object.
   */
  getValue() {}

  /**
   * Returns value at given position.
   *
   * @param {number} t Position to get value at.
   * @return {*} Any object.
   */
  getValueAt(t) {}
}
