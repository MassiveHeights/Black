import { Modifier } from "../Modifier";
import { Vector } from "../../geom/Vector";

/**
 * @ignore
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class VectorField extends Modifier {
  /**
   * Creates new instance of VectorField.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number=} [resolution=0.1]
   */
  constructor(x, y, width, height, resolution = 0.1) {
    super(false);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.resolution = resolution;
    this.field = [];

    this.widthScaled = Math.floor(this.width * this.resolution);
    this.heightScaled = Math.floor(this.height * this.resolution);

    this.reset();
  }

  /**
   * Resets this vector field data.
   *
   * @returns {void}
   */
  reset() {    
    this.field.splice(0, this.field.length); // why?

    for (let y = 0; y < this.heightScaled; y++)
      for (let x = 0; x < this.widthScaled; x++)
        this.field.push(new Vector(0, 0));
  }

  /**
   * Updates field data with a given callback function.
   *
   * @param {Function} fn
   * @returns {void}
   */
  setData(fn) {
    for (let y = 0; y < this.heightScaled; y++) {
      for (let x = 0; x < this.widthScaled; x++) {
        const index = x + y * this.widthScaled;
        fn(x, y, this.field[index]);
      }
    }
  }

  /**
   * Returns value at given position.
   * 
   * @param {number} x
   * @param {number} y
   * @returns {black-engine~Vector|null}
   */
  getVectorAt(x, y) {
    x = Math.floor(x * this.resolution);
    y = Math.floor(y * this.resolution);
    let ix = ~~(x + y * this.widthScaled);

    if (ix < 0 || ix >= this.field.length)
      return null;

    return this.field[ix];
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    let v = this.getVectorAt(particle.x, particle.y);

    if (v === null)
      return;

    particle.ax = v.x;
    particle.ay = v.y;
  }
}
