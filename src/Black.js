/**
 * Connects all the dots.
 */
class Black {
  constructor() {
    /**
     * @type {Engine}
     * Returns current instance of Black Engine.
     */
    this.engine = null;

    /**
     * @type {Input}
     * Returns current instance of Input system.
     */
    this.input = null;

    /**
     * @type {MasterAudio}
     * Returns current instance of MasterAudio system.
     */
    this.audio = null;

    /**
     * @type {Time}
     * Returns current instance of Time.
     */
    this.time = null;

    /**
     * @type {Device}
     * Returns current instance of Device.
     */
    this.device = null;

    /**
     * Default instance. Sprite and other classes uses this instance to find textures by name.
     * It will be automatically assigned when new AssetManager is created.
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
   * @readonly
   * @returns {number}
   */
  static get magic() {
    return Math.random();
  }
}

const black = new Black();
export { black as Black };