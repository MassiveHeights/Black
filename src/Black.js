/** @type {Black} */
var mInstance = null;

/**
 * Connects all the dots.
 * 
 * @static
 * @staticClass
 */
class Black {
  constructor() {
    mInstance = this;

    /**
     * @private
     * @type {Engine}
     */
    this.mEngine = null;

    /**
     * @private
     * @type {Input}
     */
    this.mInput = null;

    /**
     * @private
     * @type {MasterAudio}
     */
    this.mAudio = null;

    /**
     * @private
     * @type {Time}
     */
    this.mTime = null;

    /**
     * @private
     * @type {Device}
     */
    this.mDevice = null;

    /**
     * @private
     * @type {AssetManager}
     */
    this.mAssets = null;

    /**
     * Active camera instance.
     * 
     * @private
     * @type {Camera}
     */
    this.mCamera = null;
  }
  
  /**
   * Returns current Black Engine instance.
   * 
   * @returns {Engine}
   */
  static get engine() {
    return mInstance.mEngine;
  }

  /**
   * Sets new Engine instance.
   * @param {Engine} value
   */
  static set engine(value) {
    mInstance.mEngine = value;
  }

  /**
   * Returns current active Input System instance.
   * 
   * @returns {Input}
   */
  static get input() {
    return mInstance.mInput;
  }

  /**
   * Sets new Input System.
   * @param {Input} value
   */
  static set input(value) {
    mInstance.mInput = value;
  }

  /**
   * Returns current active Audio System instance.
   * 
   * @returns {MasterAudio}
   */
  static get audio() {
    return mInstance.mAudio;
  }

  /**
   * Sets new Audio System.
   * @param {MasterAudio} value
   */
  static set audio(value) {
    mInstance.mAudio = value;
  }
  
  /**
   * Returns current Time management instance.
   * 
   * @returns {Time}
   */
  static get time() {
    return mInstance.mTime;
  }

  /**
   * Sets new Time instance.
   * @param {Time} value
   */
  static set time(value) {
    mInstance.mTime = value;
  }  

  /**
   * Returns current Device instance.
   * 
   * @returns {Device}
   */
  static get device() {
    return mInstance.mDevice;
  }

  /**
   * Sets new Device instance.
   * @param {Device} value
   */
  static set device(value) {
    mInstance.mDevice = value;
  }

  /**
   * Default AssetManager instance. Sprite and other classes uses this instance to find textures by name.
   * It will be automatically re-assigned when new AssetManager is created.
   * 
   * @returns {AssetManager}
   */
  static get assets() {
    return mInstance.mAssets;
  }

  /**
   * Sets new AssetManager.
   * @param {AssetManager} value
   */
  static set assets(value) {
    mInstance.mAssets = value;
  }

  /**
   * Returns current stage.
   *
   * @readonly
   * @returns {Stage}
   */
  static get stage() {
    return mInstance.mEngine.mStage;
  }

  /**
   * Returns current video driver.
   *
   * @readonly
   * @returns {VideoNullDriver}
   */
  static get driver() {
    return mInstance.mEngine.mVideo;
  }

  /**
   * Returns active camera instance.
   * 
   * @returns {Camera}
   */
  static get camera() {
    if (mInstance.mCamera !== null && mInstance.mCamera.mAdded === true)
      return mInstance.mCamera;

    return null;
  }

  /**
   * Sets default camera;
   * @param {Camera} value
   */
  static set camera(value) {
    mInstance.mCamera = value;
  }

  /**
   * @readonly
   * @returns {number}
   */
  static get magic() {
    return Math.random();
  }
}

new Black();
export { Black };