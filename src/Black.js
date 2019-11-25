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
     * @type {black-engine~Engine}
     */
    this.mEngine = null;

    /**
     * @private
     * @type {black-engine~Input}
     */
    this.mInput = null;

    /**
     * @private
     * @type {black-engine~MasterAudio}
     */
    this.mAudio = null;

    /**
     * @private
     * @type {black-engine~Time}
     */
    this.mTime = null;

    /**
     * @private
     * @type {black-engine~Device}
     */
    this.mDevice = null;

    /**
     * @private
     * @type {black-engine~AssetManager}
     */
    this.mAssets = null;

    /**
     * Active camera instance.
     * 
     * @private
     * @type {black-engine~Camera}
     */
    this.mCamera = null;
  }
  
  /**
   * Returns current Black Engine instance.
   * 
   * @returns {black-engine~Engine}
   */
  static get engine() {
    return mInstance.mEngine;
  }

  /**
   * Sets new Engine instance.
   * @param {black-engine~Engine} value
   */
  static set engine(value) {
    mInstance.mEngine = value;
  }

  /**
   * Returns current active Input System instance.
   * 
   * @returns {black-engine~Input}
   */
  static get input() {
    return mInstance.mInput;
  }

  /**
   * Sets new Input System.
   * @param {black-engine~Input} value
   */
  static set input(value) {
    mInstance.mInput = value;
  }

  /**
   * Returns current active Audio System instance.
   * 
   * @returns {black-engine~MasterAudio}
   */
  static get audio() {
    return mInstance.mAudio;
  }

  /**
   * Sets new Audio System.
   * @param {black-engine~MasterAudio} value
   */
  static set audio(value) {
    mInstance.mAudio = value;
  }
  
  /**
   * Returns current Time management instance.
   * 
   * @returns {black-engine~Time}
   */
  static get time() {
    return mInstance.mTime;
  }

  /**
   * Sets new Time instance.
   * @param {black-engine~Time} value
   */
  static set time(value) {
    mInstance.mTime = value;
  }  

  /**
   * Returns current Device instance.
   * 
   * @returns {black-engine~Device}
   */
  static get device() {
    return mInstance.mDevice;
  }

  /**
   * Sets new Device instance.
   * @param {black-engine~Device} value
   */
  static set device(value) {
    mInstance.mDevice = value;
  }

  /**
   * Default AssetManager instance. Sprite and other classes uses this instance to find textures by name.
   * It will be automatically re-assigned when new AssetManager is created.
   * 
   * @returns {black-engine~AssetManager}
   */
  static get assets() {
    return mInstance.mAssets;
  }

  /**
   * Sets new AssetManager.
   * @param {black-engine~AssetManager} value
   */
  static set assets(value) {
    mInstance.mAssets = value;
  }

  /**
   * Returns current stage.
   *
   * @readonly
   * @returns {black-engine~Stage}
   */
  static get stage() {
    return mInstance.mEngine.mStage;
  }

  /**
   * Returns current video driver.
   *
   * @readonly
   * @returns {black-engine~VideoNullDriver}
   */
  static get driver() {
    return mInstance.mEngine.mVideo;
  }

  /**
   * Returns active camera instance.
   * 
   * @returns {black-engine~Camera}
   */
  static get camera() {
    if (mInstance.mCamera !== null && mInstance.mCamera.mAdded === true)
      return mInstance.mCamera;

    return null;
  }

  /**
   * Sets default camera;
   * @param {black-engine~Camera} value
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