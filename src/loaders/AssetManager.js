/*
TODO:
  1. propper error handling
  2. max parallel downloads
  3. check for name dublicates
  4. load progress
*/

/**
 * Reponsible for preloading assets and manages its in memory state.
 *
 * @cat loaders
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class AssetManager extends MessageDispatcher {
  /**
   * Creates new AssetManager instance. AssetManager exposes static property
   * called 'default' and many internal classes uses default instance.
   */
  constructor() {
    super();

    /**
     * @private
     * @type {string}
     */
    this.mDefaultPath = '';

    /**
     * @private
     * @type {number}
     */
    this.mTotalLoaded = 0;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsAllLoaded = false;

    /**
     * @private
     * @type {number}
     */
    this.mLoadingProgress = 0;

    /**
     * @private
     * @type {Array<Asset>}
     */
    this.mQueue = [];

    /**
     * @private
     * @member
     * @dict
     */
    this.mTextures = {};

    /**
     * @private
     * @member
     * @dict
     */
    this.mAtlases = {};

    /**
     * @private
     * @member
     * @dict
     */
    this.mJsons = {};
  }

  /**
   * Adds single image to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the image.
   *
   * @returns {void}
   */
  enqueueImage(name, url) {
    this.mQueue.push(new TextureAsset(name, this.mDefaultPath + url));
  }

  /**
   * Adds atlas to the loading queue.
   *
   * @param {string} name     Name of the asset.
   * @param {string} imageUrl Atlas URL.
   * @param {string} dataUrl  URL to the .json file which describes the atlas.
   *
   * @returns {void}
   */
  enqueueAtlas(name, imageUrl, dataUrl) {
    this.mQueue.push(new AtlasTextureAsset(name, this.mDefaultPath + imageUrl, this.mDefaultPath + dataUrl));
  }

  /**
   * Adds single json file to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   *
   * @returns {void}
   */
  enqueueJson(name, url) {
    this.mQueue.push(new JSONAsset(name, this.mDefaultPath + url));
  }

  enqueueLocalFont(name, url) {
    this.mQueue.push(new FontAsset(name, this.mDefaultPath + url, true));
  }

  enqueueGoogleFont(name, url) {
    this.mQueue.push(new FontAsset(name, url, false));
  }

  /**
   * Starts preloading all enqueued assets.
   * @fires complete
   *
   * @return {void}
   */
  loadQueue() {
    for (let i = 0; i < this.mQueue.length; i++) {
      let item = this.mQueue[i];

      item.on(Message.COMPLETE, this.onAssetLoaded, this);
      item.load();
    }
  }

  /**
   * @protected
   * @ignore
   *
   * @param {Message} msg
   *
   * @return {void}
   */
  onAssetLoaded(msg) {
    this.mTotalLoaded++;
    this.mLoadingProgress = this.mTotalLoaded / this.mQueue.length;

    let item = msg.sender;

    // TODO: rework this
    // TODO: check for dups
    if (item.constructor === TextureAsset)
      this.mTextures[item.name] = item.data;
    else if (item.constructor === AtlasTextureAsset)
      this.mAtlases[item.name] = item.data;
    else if (item.constructor === JSONAsset)
      this.mJsons[item.name] = item.data;
    else if (item.constructor === FontAsset) {} else
      console.error('Unable to handle asset type.', item);

    this.post(Message.PROGRESS, this.mLoadingProgress);

    if (this.mTotalLoaded === this.mQueue.length) {
      this.mQueue.splice(0, this.mQueue.length);

      this.mIsAllLoaded = true;
      this.post(Message.COMPLETE);
    }
  }

  /**
   * Returns Texture object by given name.
   *
   * @param {string} name The name of the Asset.
   *
   * @return {Texture|null} Returns a Texture if found or null.
   */
  getTexture(name) {
    /** @type {Texture} */
    let t = this.mTextures[name];

    if (t != null)
      return t;

    for (let key in this.mAtlases) {
      t = this.mAtlases[key].getTexture(name);
      if (t != null)
        return t;
    }

    return null;
  }


  /**
   * Returns AtlasTexture by given name.
   *
   * @param {string} name The name of the Asset.
   *
   * @return {AtlasTexture} Returns atlas or null.
   */
  getAtlas(name) {
    return this.mAtlases[name];
  }

  /**
   * Gets/Sets default path for preloading. Usefull when url's getting too long.
   * The asset path will be concatenated with defaultPath.
   *
   * @return {string}
   */
  get defaultPath() {
    return this.mDefaultPath;
  }

  /**
   * @ignore
   * @param {string} value
   *
   * @return {void}
   */
  set defaultPath(value) {
    this.mDefaultPath = value;
  }

  /**
   * Returns True if all assets were loaded.
   *
   * @return {boolean}
   */
  get isAllLoaded() {
    return this.mIsAllLoaded;
  }
}

/**
 * Default instance. Sprite and other classes uses this instance to find textures by name.
 * @static
 * @type {AssetManager}
 */
AssetManager.default = new AssetManager();
