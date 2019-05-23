/**
 * Connects all the dots.
 */
class Black {
  constructor() {
    /**
     * @type {Engine}
     */
    this.engine = null;

    /**
     * @type {Input}
     */
    this.input = null;

    /**
     * @type {MasterAudio}
     */
    this.audio = null;

    /**
     * @type {Time}
     */
    this.time = null;

    /**
     * Default instance. Sprite and other classes uses this instance to find textures by name.
     * 
     * @private
     * @static
     * @type {AssetManager}
     */
    this.assets = null;
  }

  /**
   * Returns current stage.
   *
   * @readonly
   * @returns {Stage}
   */
  get stage() {
    return this.engine.mStage;
  }

  /**
   * Returns current video driver.
   *
   * @readonly
   * @returns {VideoNullDriver}
   */
  get driver() {
    return this.engine.mVideo;
  }

  /**
   * `Black.magic`! Got it? Got it?!?! Same as `Math.random()` but much cooler.
   * 
   * @readonly
   * @returns {number}
   */
  static get magic() {
    return Math.random();
  }
}

const black = new Black();
export { black as Black };