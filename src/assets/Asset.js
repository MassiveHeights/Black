/**
 * Holds information about external assets.
 *
 * @fires Asset#error
 * @fires Asset#complete
 * 
 * @cat assets
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class Asset extends MessageDispatcher {
  /**
   * Creates new Asset instance.
   *
   * @param  {string} name Name of asset.
   */
  constructor(name) {
    super();

    /** @protected @type {string} */
    this.mName = name;

    /** @protected @type {Object|undefined} */
    this.mData = null;

    /** @protected @type {Array<AssetLoader>} */
    this.mLoaders = [];

    /** @private @type {number} */
    this.mNumLoaded = 0;

    /** @private @type {boolean} */
    this.mIsReady = false;
  }

  /**
   * Adds given loader to the list. Loader cannot be added to multiply Assets.
   * 
   * @param {AssetLoader} loader Loader to add.
   */
  addLoader(loader) {
    loader.mOwner = this;
    this.mLoaders.push(loader);

    loader.on(Message.COMPLETE, this.__onLoaderComplete, this);
    loader.on(Message.ERROR, this.__onLoaderError, this);
  }

  /**
   * @private
   * @param {Message} m 
   * @returns {void}
   */
  __onLoaderComplete(m) {
    this.mNumLoaded++;

    if (this.mNumLoaded === this.mLoaders.length) {
      for (let i = 0; i < this.mLoaders.length; i++)
        this.mLoaders[i].off(Message.COMPLETE, Message.ERROR);

      this.onAllLoaded();
    }
  }

  /**
   * @private
   * @param {Message} m 
   */
  __onLoaderError(m) {
    this.abort();

    /**
     * Posted when error occured during loading this asset.
     * @event Asset#error
     */
    this.post(Message.ERROR);
  }

  /**
   * @protected
   */
  onAllLoaded() {}

  /**
   * Aborts loading of this asset.
   * @public
   */
  abort() {
    this.mNumLoaded = 0;

    for (let i = 0; i < this.mLoaders.length; i++) {
      const loader = this.mLoaders[i];
      loader.off(Message.COMPLETE, Message.ERROR);
      loader.abort();
    }
  }

  /**
   * Protected method used to notify AssetManager about completition of loading this asset.
   * 
   * @protected
   * @param {Object=} data
   * @returns {void}
   */
  ready(data) {
    this.mData = data;
    this.mIsReady = true;

    /**
     * Posten when asset finished loading.
     * @event Asset#complete
     */
    this.post(Message.COMPLETE);
  }

  /**
   * Returns the name of this asset.
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }

  /**
   * Returns loaded data object associated with this asset.
   *
   * @return {?}
   */
  get data() {
    return this.mData;
  }

  /**
   * Returns `true` if this asset is loaded.
   *
   * @return {boolean}
   */
  get isReady() {
    return this.mIsReady;
  }

  /**
   * Returns array of loaders.
   * 
   * @returns {Array<AssetLoader>}
   */
  get loaders() {
    return this.mLoaders;
  }
}
