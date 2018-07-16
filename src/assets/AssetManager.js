/**
 * Responsible for preloading assets and manages its in memory state.
 *
 * @fires Message.PROGRESS
 * @fires Message.COMPLETE
 * @fires Message.ERROR
 * 
 * @cat assets
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

    /** @private @type {string} */
    this.mDefaultPath = '';

    /** @private @type {number} */
    this.mTotalLoaded = 0;

    /** @private @type {number} */
    this.mTotalPending = 0;

    /** @private @type {number} */
    this.mTotalErrors = 0;

    /** @private @type {boolean} */
    this.mIsAllLoaded = false;

    /** @private @type {number} */
    this.mLoadingProgress = 0;

    /** @private @type {Array<Asset>} */
    this.mQueue = [];

    /** @private @type {Array<AssetLoader>} */
    this.mLoadersQueue = [];

    /** @private @type {Object.<string, Texture>} */
    this.mTextures = {};

    /** @private @type {Object.<string, AtlasTexture>} */
    this.mAtlases = {};

    /** @private @type {Object.<string, JSONAsset>} */
    this.mJsons = {};

    /** @private @type {Object.<string, XMLAsset>} */
    this.mXMLs = {};

    /** @private @type {Object.<string, SoundClip>} */
    this.mSounds = {};

    /** @private @type {Object.<string, SoundAtlasClip>} */
    this.mSoundAtlases = {};

    /** @private @type {Object.<string, FontAsset>} */
    this.mFonts = {};

    /** @private @type {Object.<string, BitmapFontData>} */
    this.mBitmapFonts = {};

    /** @private @type {AssetManagerState} */
    this.mState = AssetManagerState.NONE;

    /** @private @type {Object.<string, boolean>} */
    this.mDictionary = {};
  }

  /**
   * Adds or changes texture to the internal list for future reuse by given name.
   * @param {string} name 
   * @param {Texture} texture 
   */
  addTexture(name, texture) {
    this.mTextures[name] = texture;
  }

  /**
   * Adds single image to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the image.
   * @returns {void}
   */
  enqueueImage(name, url) {
    this.__validateState();
    this.__validateName(name);
    this.mQueue.push(new TextureAsset(name, this.mDefaultPath + url));
  }

  /**
   * Adds atlas to the loading queue.
   *
   * @param {string} name     Name of the asset.
   * @param {string} imageUrl Atlas URL.
   * @param {string} dataUrl  URL to the .json file which describes the atlas.
   * @returns {void}
   */
  enqueueAtlas(name, imageUrl, dataUrl) {
    this.__validateState();
    this.__validateName(name);
    this.mQueue.push(new AtlasTextureAsset(name, this.mDefaultPath + imageUrl, this.mDefaultPath + dataUrl));
  }

  /**
   * Adds bitmap font to the loading queue.
   *
   * @param {string} name     Name of the font.
   * @param {string} imageUrl Image URL.
   * @param {string} xmlUrl   URL to the .xml file which describes the font.
   * @returns {void}
   */
  enqueueBitmapFont(name, imageUrl, xmlUrl) {
    this.__validateState();
    this.__validateName(name);
    this.mQueue.push(new BitmapFontAsset(name, this.mDefaultPath + imageUrl, this.mDefaultPath + xmlUrl));
  }

  /**
   * Adds single xml file to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   * @returns {void}
   */
  enqueueXML(name, url) {
    this.__validateState();
    this.__validateName(name);
    this.mQueue.push(new XMLAsset(name, this.mDefaultPath + url));
  }

  /**
   * Adds single json file to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   * @returns {void}
   */
  enqueueJSON(name, url) {
    this.__validateState();
    this.__validateName(name);
    this.mQueue.push(new JSONAsset(name, this.mDefaultPath + url));
  }

  /**
   * Adds single sound to the loading queue.
   *
   * @param {string} name Name of the sound.
   * @param {string} url  The URL of the sound.
   * @returns {void}
   */
  enqueueSound(name, url) {
    this.__validateState();
    this.__validateName(name);
    this.mQueue.push(new SoundAsset(name, this.mDefaultPath + url));
  }

  /**
   * Adds sound atlas to the loading queue.
   *
   * @param {string} name Name of the sound.
   * @param {string} soundUrl  The URL of the sound.
   * @param {string} dataUrl  The URL of the data JSON.
   * @returns {void}
   */
  enqueueSoundAtlas(name, soundUrl, dataUrl) {
    this.__validateState();
    this.__validateName(name);
    this.mQueue.push(new SoundAtlasAsset(name, this.mDefaultPath + soundUrl, this.mDefaultPath + dataUrl));
  }

  /**
   * Adds local font to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL to the font.
   * @returns {void}
   */
  enqueueFont(name, url) {
    this.__validateState();
    this.__validateName(name);
    this.mQueue.push(new FontAsset(name, this.mDefaultPath + url, true));
  }

  /**
   * Adds Google Font to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @returns {void}
   */
  enqueueGoogleFont(name) {
    this.__validateState();
    this.__validateName(name);
    this.mQueue.push(new FontAsset(name, '', false));
  }

  /**
   * Starts preloading all enqueued assets.
   *
   * @fires complete
   * @return {void}
   */
  loadQueue() {
    this.__validateState();
    this.mState = AssetManagerState.LOADING;

    for (let i = 0; i < this.mQueue.length; i++) {
      let item = this.mQueue[i];

      if (item.loaders.length > 0) {
        item.on(Message.COMPLETE, this.onAssetLoaded, this);
        item.on(Message.ERROR, this.onAssetError, this);
        this.mLoadersQueue.push(...item.loaders);

        this.mTotalPending++;
      }
    }

    // Loader will notify Asset when its ready. Asset will notify AssetManager.
    for (let i = 0; i < this.mLoadersQueue.length; i++) {
      let loader = this.mLoadersQueue[i];
      loader.load();
    }
  }

  /**
   * @protected
   * @ignore
   * @param {Message} msg
   * @return {void}
   */
  onAssetLoaded(msg) {
    this.mTotalLoaded++;
    this.mLoadingProgress = this.mTotalLoaded / this.mTotalPending;

    let item = /** @type {Asset}*/ (msg.sender);
    item.off(Message.COMPLETE, Message.ERROR);

    if (item.constructor === TextureAsset)
      this.mTextures[item.name] = item.data;
    else if (item.constructor === AtlasTextureAsset)
      this.mAtlases[item.name] = item.data;
    else if (item.constructor === JSONAsset)
      this.mJsons[item.name] = item.data;
    else if (item.constructor === SoundAsset)
      this.mSounds[item.name] = item.data;
    else if (item.constructor === SoundAtlasAsset)
      this.mSoundAtlases[item.name] = item.data;
    else if (item.constructor === FontAsset)
      this.mFonts[item.name] = item.data;
    else if (item.constructor === XMLAsset)
      this.mXMLs[item.name] = item.data;
    else if (item.constructor === BitmapFontAsset)
      this.mBitmapFonts[item.name] = item.data;
    else {
      Debug.error(`[AssetManager] Unable to handle asset type ${item}.`);
    }

    /**
     * Posted when loading progress is changed.
     * @event AssetManager#progress
     */
    this.post(Message.PROGRESS, this.mLoadingProgress);

    if (this.mTotalLoaded === this.mTotalPending) {
      this.mQueue.splice(0, this.mQueue.length);
      this.mLoadersQueue.splice(0, this.mLoadersQueue.length);
      this.mState = AssetManagerState.FINISHED;
      this.mTotalLoaded = 0;
      this.mTotalErrors = 0;
      this.mIsAllLoaded = true;
      this.mDictionary = {};

      /**
       * Posted when all assets finished loading.
       * @event AssetManager#complete
       */
      this.post(Message.COMPLETE);
    }
  }

  onAssetError(msg) {
    this.mTotalErrors++;

    let total = this.mTotalLoaded + this.mTotalErrors;
    this.mLoadingProgress = this.mTotalLoaded / this.mTotalPending;

    let item = /** @type {Asset}*/ (msg.sender);

    item.off(Message.COMPLETE, Message.ERROR);
    Debug.warn(`[AssetManager] Error loading asset '${item.name}'.`);

    /**
     * Posted when error occured while loading assets.
     * @event AssetManager#complete
     */
    this.post(Message.ERROR, item);

    if (total === this.mTotalPending) {
      this.mQueue.splice(0, this.mQueue.length);
      this.mLoadersQueue.splice(0, this.mLoadersQueue.length);
      this.mState = AssetManagerState.FINISHED;
      this.mTotalLoaded = 0;
      this.mTotalErrors = 0;
      this.mIsAllLoaded = true;
      this.mDictionary = {};
      this.post(Message.COMPLETE);
    }
  }

  /**
   * Returns BitmapFontData object by given name.
   *
   * @param {string} name The name of the Asset to search.
   * @return {BitmapFontData|null} Returns a BitmapFontData if found or null.
   */
  getBitmapFont(name) {
    /** @type {BitmapFontData} */
    let t = this.mBitmapFonts[name];

    if (t != null)
      return t;

    Debug.warn(`[AssetManager] BitmapFontData '${name}' was not found.`);
    return null;
  }

  /**
   * Returns Texture object by given name.
   *
   * @param {string} name The name of the Asset.
   * @return {Texture|null} Returns a Texture if found or null.
   */
  getTexture(name) {
    /** @type {Texture} */
    let t = this.mTextures[name];

    if (t != null)
      return t;

    for (let key in this.mAtlases) {
      t = this.mAtlases[key].subTextures[name];
      if (t != null)
        return t;
    }

    Debug.warn(`[AssetManager] Texture '${name}' was not found.`);
    return null;
  }


  /**
   * Returns array of Texture by given name mask.
   * Searches across all loaded images and atlases.
   *
   * @param {string} nameMask The name mask.
   * @returns {Array<Texture>|null}
   */
  getTextures(nameMask) {
    let out = [];
    let names = [];

    let re = new RegExp("^" + nameMask.split("*").join(".*") + "$");

    // collect single textures
    for (let key in this.mTextures)
      if (re.test(key))
        names.push({ name: key, atlas: null });

    // collect textures from all atlases
    for (let key in this.mAtlases) {
      let atlas = this.mAtlases[key];

      for (let key2 in atlas.subTextures)
        if (re.test(key2))
          names.push({ name: key2, atlas: atlas });
    }

    AtlasTexture.naturalSort(names, 'name');

    for (let i = 0; i < names.length; i++) {
      let ao = names[i];

      if (ao.atlas == null)
        out.push(this.mTextures[ao.name]);
      else
        out.push(ao.atlas.mSubTextures[ao.name]);
    }

    if (out.length > 0)
      return out;

    return null;
  }

  /**
   * Returns AtlasTexture by given name.
   *
   * @param {string} name The name of the Asset.
   * @return {AtlasTexture|null} Returns atlas or null.
   */
  getAtlas(name) {
    if (this.mAtlases[name] != null)
      return this.mAtlases[name];

    Debug.warn(`[AssetManager] Atlas '${name}' was not found.`);
    return null;
  }

  /**
   * Returns `SoundClip` by given name.
   *
   * @param {string} name The name of the sound.
   * @return {SoundClip} Returns sound or null.
   */
  getSound(name) {
    /** @type {SoundClip} */
    let t = this.mSounds[name];

    if (t != null)
      return t;

    for (let key in this.mSoundAtlases) {
      t = this.mSoundAtlases[key].subSounds[name];
      if (t != null)
        return t;
    }

    Debug.warn(`[AssetManager] Sound '${name}' was not found.`);
    return null;
  }

  /**
   * Returns `SoundAtlasClip` by given name.
   *
   * @param {string} name The name of the sound.
   * @return {SoundClip} Returns sound or null.
   */
  getSoundAtlas(name) {
    return this.mSoundAtlases[name];
  }

  /**
   * Returns Object parsed from JSON by given name.
   *
   * @param {string} name The name of the JSON asset.
   * @return {Object} Returns object or null.
   */
  getJSON(name) {
    return this.mJsons[name];
  }

  __validateState() {
    Debug.assert(this.mState === AssetManagerState.NONE || this.mState === AssetManagerState.FINISHED, 'Illegal state.');
  }

  __validateName(name) {
    Debug.assert(this.mDictionary[name] == null, 'Asset with such name is already added.');

    this.mDictionary[name] = true;
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

  /**
   * Returns number of errors occured during loading.
   * @returns {number}
   */
  get numErrors() {
    return this.mTotalErrors;
  }

  /**
   * Returns current state.
   * 
   * @returns {AssetManagerState}
   */
  get state() {
    return this.mState;
  }

  /**
   * Always returns 'AssetManager', can be used to overhear AssetManager's messages.
   *
   * @override
   * @readonly
   * @return {string|null}
   */
  get path() {
    return 'AssetManager';
  }
}

/**
 * Default instance. Sprite and other classes uses this instance to find textures by name.
 * @static
 * @type {AssetManager}
 */
AssetManager.default = new AssetManager();
