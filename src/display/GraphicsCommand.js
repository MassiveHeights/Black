/**
 * A helper class for Graphics.
 *
 * @cat display
 */
/* @echo EXPORT */
class GraphicsCommand {

  /**
   * Creates new instance of GraphicsCommand
   * 
   * @param {GraphicsCommandType} type 
   * @param {Array<*>} data 
   * @param {number} lineColor 
   * @param {number} lineAlpha 
   * @param {number} lineWidth 
   * @param {number} fillColor 
   * @param {number} fillAlpha 
   * @param {CapsStyle} caps 
   * @param {JointStyle} joints 
   * @param {number} miterLimit 
   */
  constructor(type, data, lineColor = 0, lineAlpha = 1, lineWidth = 0, fillColor = 0, fillAlpha = 1, caps = CapsStyle.NONE, joints = JointStyle.MITER, miterLimit = 3) {

    /** @public @type {Array<*>} */
    this.data = data;

    /** @public @type {GraphicsCommandType} */
    this.type = type;

    // stroke
    /** @public @type {number} */
    this.lineColor = lineColor;

    /** @public @type {number} */
    this.lineAlpha = lineAlpha;

    /** @public @type {number} */
    this.lineWidth = lineWidth;

    /** @public @type {CapsStyle} */
    this.caps = caps;

    /** @public @type {JointStyle} */
    this.joints = joints;

    /** @public @type {number} */
    this.miterLimit = miterLimit;

    // fill
    /** @public @type {number} */
    this.fillColor = fillColor;

    /** @public @type {number} */
    this.fillAlpha = fillAlpha;
  }
}