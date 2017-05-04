/*
TODO:
  1. propper error handling
  2. max parallel downloads
  3. check for name dublicates
  4. load progress
*/

/* @echo EXPORT */
class AssetManager extends MessageDispatcher {
  constructor() {
    super();

    /** @type {string} */
    this.mDefaultPath = '';

    /** @type {number} */
    this.mTotalLoaded = 0;

    /** @type {boolean} */
    this.mIsAllLoaded = false;

    /** @type {number} */
    this.mLoadingProgress = 0;

    /** @type {Array<Asset>} */
    this.mQueue = [];

    /** @dict */
    this.mTextures = {};

    /** @dict */
    this.mAtlases = {};

    /** @dict */
    this.mJsons = {};
  }

  enqueueImage(name, url) {
    this.mQueue.push(new TextureAsset(name, this.mDefaultPath + url));
  }

  enqueueAtlas(name, imageUrl, dataUrl) {
    this.mQueue.push(new AtlasTextureAsset(name, this.mDefaultPath + imageUrl, this.mDefaultPath + dataUrl));
  }

  enqueueJson(name, url) {
    this.mQueue.push(new JSONAsset(name, this.mDefaultPath + url));
  }

  /**
   * loadQueue
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
   * onAssetLoaded
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
    else
      console.error('Unable to handle asset type.', item);

    this.post(Message.PROGRESS, this.mLoadingProgress);

    if (this.mTotalLoaded === this.mQueue.length) {
      this.mQueue.splice(0, this.mQueue.length);

      this.mIsAllLoaded = true;
      this.post(Message.COMPLETE);
    }
  }

  /**
   * getTexture
   *
   * @param {string} name
   *
   * @return {Texture|null}
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
   * @param {string} name
   *
   * @return {AtlasTexture}
   */
  getAtlas(name) {
    return this.mAtlases[name];
  }

  /**
   * defaultPath
   *
   * @return {string}
   */
  get defaultPath() {
    return this.mDefaultPath;
  }

  /**
   * defaultPath
   *
   * @param {string} value
   *
   * @return {void}
   */
  set defaultPath(value) {
    this.mDefaultPath = value;
  }

  /**
   * isAllLoaded
   *
   * @return {boolean}
   */
  get isAllLoaded() {
    return this.mIsAllLoaded;
  }
}

/** @type {AssetManager} */
AssetManager.default = new AssetManager();
