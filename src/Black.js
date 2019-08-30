/**
 * Connects all the dots.
 */
class Black {
  constructor() {
    /**
     * Returns current instance of Black Engine.
     * 
     * @type {Engine}
     */
    this.engine = null;

    /**
     * Returns current instance of Input system.
     * 
     * @type {Input}
     */
    this.input = null;

    /**
     * Returns current instance of MasterAudio system.
     * 
     * @type {MasterAudio}
     */
    this.audio = null;

    /**
     * Returns current instance of Time.
     * 
     * @type {Time}
     */
    this.time = null;

    /**
     * Returns current instance of Device.
     * 
     * @type {Device}
     */
    this.device = null;

    /**
     * Default instance. Sprite and other classes uses this instance to find textures by name.
     * It will be automatically assigned when new AssetManager is created.
     * 
     * @type {AssetManager}
     */
    this.assets = null;

    /**
     * Active camera instance.
     * 
     * @private
     * @type {Camera}
     */
    this.mCamera = null;
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
   * Returns active camera instance.
   * 
   * @returns {Camera}
   */
  get camera() {
    if (this.mCamera !== null && this.mCamera.mAdded === true)
      return this.mCamera;

    return null;
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