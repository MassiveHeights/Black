/**
 * Base class for loaders.
 *
 * @cat assets.loaders
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class AssetLoader extends MessageDispatcher {
  /**
   * Creates new AssetLoader instance.
   * 
   * @param {string} url
   */
  constructor(url) {
    super();

    /** @protected @type {string} */
    this.mUrl = url;

    /** @protected @type {?|null} */
    this.mData = null;

    /** @private @type {boolean} */
    this.mIsLoaded = false;

    /** @private @type {Asset} */
    this.mOwner = null;
  }

  /**
   * When overriden loads data. Should not be called directly.
   * 
   * @public
   */
  load() { }

  /**
   * When overriden aborts loading process. Should not be called directly.
   * 
   * @public
   */
  abort() { }

  /**
   * @protected
   */
  onLoad() {
    this.mIsLoaded = true;
    this.post(Message.COMPLETE);
  }

  /**
   * @protected
   */
  onError() {
    this.mIsLoaded = false;
    this.post(Message.ERROR);
  }

  /**
   * Returns native loaded data object associated with this loader.
   *
   * @return {?}
   */
  get data() {
    return this.mData;
  }

  /**
   * Returns the Asset owning this loader.
   * 
   * @returns {Asset}
   */
  get owner() {
    return this.mOwner;
  }
}