import { SoundAtlasClip } from "../audio/SoundAtlasClip";
import { SoundClip } from "../audio/SoundClip";
import { GraphicsData } from "../display/GraphicsData";
import { MessageDispatcher } from "../messages/MessageDispatcher";
import { AtlasTexture } from "../textures/AtlasTexture";
import { Texture } from "../textures/Texture";
import { Asset } from "./Asset";
import { AssetManagerState } from "./AssetManagerState";
import { AtlasTextureAsset } from "./AtlasTextureAsset";
import { BitmapFontAsset, BitmapFontData } from "./BitmapFontAsset";
import { BVGAsset } from "./BVGAsset";
import { FontAsset } from "./FontAsset";
import { JSONAsset } from "./JSONAsset";
import { AssetLoader } from "./loaders/AssetLoader";
import { SoundAtlasAsset } from "./SoundAtlasAsset";
import { TextureAsset } from "./TextureAsset";
import { XMLAsset } from "./XMLAsset";
import { Message } from "../messages/Message";
import { Debug } from "../core/Debug";
import { Black } from "../Black";
import { SoundAsset } from "./SoundAsset";
import { FontFaceAssetLoader } from "./loaders/FontFaceAssetLoader";
import { ImageAssetLoader } from "./loaders/ImageAssetLoader";
import { XHRAssetLoader } from "./loaders/XHRAssetLoader";
import { AssetType } from "./AssetType";
import { LoaderType } from "./LoaderType";
import { VectorTextureAsset } from "./VectorTextureAsset";
import { LoaderFactory } from "./LoaderFactory";

/**
 * Responsible for loading assets and manages its in memory state.
 *
 * @fires AssetManager#progress
 * @fires AssetManager#complete
 * @fires AssetManager#error
 *
 * @cat assets
 * @extends black-engine~MessageDispatcher
 */
export class AssetManager extends MessageDispatcher {
  /**
   * Creates new AssetManager instance. AssetManager exposes static property
   * called 'default' and many internal classes uses default instance.
   */
  constructor() {
    super();

    if (Black.assets === null)
      Black.assets = this;

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
     * @type {number} 
     */
    this.mTotalPending = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mTotalErrors = 0;

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
     * @type {Array<black-engine~Asset>} 
     */
    this.mQueue = [];

    /** 
     * @private 
     * @type {Object.<string, black-engine~AssetLoader>} 
     */
    this.mLoadersQueue = {};

    /** 
     * @private 
     * @type {black-engine~AssetManagerState} 
     */
    this.mState = AssetManagerState.NONE;

    /**
     * @private
     * @type {black-engine~LoaderFactory}
     */
    this.mLoaderFactory = new LoaderFactory(this);

    this.mAssets = {};
    this.mAssetTypeMap = {};
    this.mLoaderTypeMap = {};

    this.registerDefaultTypes();
  }

  registerDefaultTypes() {
    // Textures
    this.mAssetTypeMap[AssetType.TEXTURE] = TextureAsset;
    this.mAssetTypeMap[AssetType.TEXTURE_ATLAS] = AtlasTextureAsset;

    // Vector
    this.mAssetTypeMap[AssetType.VECTOR_GRAPHICS] = BVGAsset;

    // Vector textures 
    this.mAssetTypeMap[AssetType.VECTOR_TEXTURE] = VectorTextureAsset;
    //this.mAssetTypeMap[AssetType.VECTOR_TEXTURE_ATLAS] = VectorTextureAsset;

    // Fonts
    this.mAssetTypeMap[AssetType.FONT] = FontAsset;
    this.mAssetTypeMap[AssetType.BITMAP_FONT] = BitmapFontAsset;

    // JSON & XML
    this.mAssetTypeMap[AssetType.XML] = XMLAsset;
    this.mAssetTypeMap[AssetType.JSON] = JSONAsset;

    // Sounds
    this.mAssetTypeMap[AssetType.SOUND] = SoundAsset;
    this.mAssetTypeMap[AssetType.SOUND_ATLAS] = SoundAtlasAsset;

    // Loaders
    this.mLoaderTypeMap[LoaderType.FONT_FACE] = FontFaceAssetLoader;
    this.mLoaderTypeMap[LoaderType.IMAGE] = ImageAssetLoader;
    this.mLoaderTypeMap[LoaderType.XHR] = XHRAssetLoader;
  }

  /**
   * Sets asset type. You can use this method to override Asset with your own.
   * 
   * @param {string} name 
   * @param {string} type 
   */
  setAssetType(name, type) {
    this.mAssetTypeMap[name] = type;
  }

  /**
   * Sets loader type. Use this method to override default loaders with custom ones.
   * 
   * @param {string} name 
   * @param {string} type 
   */
  setLoaderType(name, type) {
    this.mLoaderTypeMap[name] = type;
  }

  /**
   * Adds asset into the loading queue.
   * 
   * @param {string} name 
   * @param {black-engine~Asset} asset 
   * @returns {void}
   */
  enqueueAsset(name, asset) {
    this.__validateState();
    this.__validateName(asset.type, name);

    this.mQueue.push(asset);
  }

  /**
   * Returns new asset instance by given type.
   * 
   * @private
   * @param {string|black-engine~AssetType} type 
   * @param  {...any} args 
   */
  __getAsset(type, ...args) {
    return new this.mAssetTypeMap[type](...args);
  }

  /**
   * Adds or changes texture to the internal list for future reuse by given name.
   * @param {string} name
   * @param {black-engine~Texture} texture
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
    this.enqueueAsset(name, this.__getAsset(AssetType.TEXTURE, name, this.mDefaultPath + url));
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
    this.enqueueAsset(name, this.__getAsset(AssetType.TEXTURE_ATLAS, name, this.mDefaultPath + imageUrl, this.mDefaultPath + dataUrl));
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
    this.enqueueAsset(name, this.__getAsset(AssetType.BITMAP_FONT, name, this.mDefaultPath + imageUrl, this.mDefaultPath + xmlUrl));
  }

  /**
   * Adds single xml file to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   * @returns {void}
   */
  enqueueXML(name, url) {
    this.enqueueAsset(name, this.__getAsset(AssetType.XML, name, this.mDefaultPath + url));
  }

  /**
   * Adds single json file to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   * @returns {void}
   */
  enqueueJSON(name, url) {
    this.enqueueAsset(name, this.__getAsset(AssetType.JSON, name, this.mDefaultPath + url));
  }

  /**
   * Adds single Black Vector Graphics file to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   *
   * @returns {void}
   */
  enqueueVector(name, url) {
    this.enqueueAsset(name, this.__getAsset(AssetType.VECTOR_GRAPHICS, name, this.mDefaultPath + url));
  }

  /**
   * Adds single Black Vector Graphics file to the loading queue and bakes it into the Texture.
   * 
   * If baked both graphics data and baked texture will be stored inside this AssetManager.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   * @param {boolean=} [bakeSelf=false] Flag to bake full BVG as texture. If false root will not be baked.
   * @param {boolean=} [bakeChildren=false] Flag to bake each node with id to textures. If false none children nodes will be baked.
   * @param {Array<string>=} [namesToBake=null] Concrete nodes ids to bake. Works only if bakeChildren is set to true.
   *
   * @returns {void}
   */
  enqueueVectorTexture(name, url, bakeSelf = false, bakeChildren = false, namesToBake = null) {
    if (bakeSelf === true || bakeChildren === true)
      this.enqueueAsset(name, this.__getAsset(AssetType.VECTOR_TEXTURE, name, this.mDefaultPath + url, bakeSelf, bakeChildren, namesToBake));
  }

  // /**
  //  * Adds single Black Vector Graphics file to the loading queue and bakes it into the AtlasTexture.
  //  * 
  //  * If baked both graphics data and baked texture will be stored inside this AssetManager.
  //  *
  //  * @param {string} name Name of the asset.
  //  * @param {string} url  The URL of the json.
  //  * @param {boolean=} [bakeSelf=false] Flag to bake full BVG as texture. If false root will not be baked.
  //  * @param {boolean=} [bakeChildren=false] Flag to bake each node with id to textures. If false none children nodes will be baked.
  //  * @param {Array<string>=} [namesToBake=null] Concrete nodes ids to bake. Works only if bakeChildren is set to true.
  //  *
  //  * @returns {void}
  //  */
  // enqueueVectorAtlas(name, url, bakeSelf = false, bakeChildren = false, namesToBake = null) {
  //   if (bakeSelf === true || bakeChildren === true)
  //     this.enqueueAsset(name, this.__getAsset(AssetType.VECTOR_TEXTURE_ATLAS, name, this.mDefaultPath + url, bakeSelf, bakeChildren, namesToBake));
  // }

  /**
   * Adds single sound to the loading queue.
   *
   * @param {string} name Name of the sound.
   * @param {string} url  The URL of the sound.
   * @returns {void}
   */
  enqueueSound(name, url) {
    this.enqueueAsset(name, this.__getAsset(AssetType.SOUND, name, this.mDefaultPath + url));
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
    this.enqueueAsset(name, this.__getAsset(AssetType.SOUND_ATLAS, name, this.mDefaultPath + soundUrl, this.mDefaultPath + dataUrl));
  }

  /**
   * Adds local font to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL to the font.
   * @returns {void}
   */
  enqueueFont(name, url) {
    this.enqueueAsset(name, this.__getAsset(AssetType.FONT, name, this.mDefaultPath + url, true));
  }

  /**
   * Adds Google Font to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @returns {void}
   */
  enqueueGoogleFont(name) {
    this.enqueueAsset(name, this.__getAsset(AssetType.FONT, name, '', false));
  }

  /**
   * Starts loading all enqueued assets.
   *
   * @fires complete
   * @return {void}
   */
  loadQueue() {
    this.__validateState();

    if (this.mQueue.length === 0) {
      this.post(Message.COMPLETE);
      return;
    }

    this.mState = AssetManagerState.LOADING;

    for (let i = 0; i < this.mQueue.length; i++) {
      let item = this.mQueue[i];

      item.onLoaderRequested(this.mLoaderFactory);

      if (item.loaders.length > 0) {
        item.once(Message.COMPLETE, this.onAssetLoaded, this);
        item.once(Message.ERROR, this.onAssetError, this);

        this.mTotalPending++;

        item.loaders.forEach(x => {
          //this.mLoadersQueue[x.url] = x;
          x.load();
        });
      }
    }

    // Loader will notify Asset when its ready. Asset will notify AssetManager.
    // for (const key in this.mLoadersQueue) {
    //   if (this.mLoadersQueue.hasOwnProperty(key)) {
    //     const loader = this.mLoadersQueue[key];
    //     loader.load();
    //   }
    // }
  }

  /**
   * @protected
   * @ignore
   * @param {black-engine~Message} msg
   * @return {void}
   */
  onAssetLoaded(msg) {
    this.mTotalLoaded++;
    this.mLoadingProgress = this.mTotalLoaded / this.mTotalPending;

    let item = /** @type {Asset}*/ (msg.sender);
    item.off(Message.COMPLETE, Message.ERROR);

    if (this.mAssets[item.type] == null)
      this.mAssets[item.type] = {};

    if (Array.isArray(item.data)) {
      let objects = (item.data);

      objects.forEach(x => {
        this.__validateName(x.name);
        this.mAssets[item.type][x.name] = x.data;
      });
    }
    else
      this.mAssets[item.type][item.name] = item.data;

    /**
     * Posted when loading progress is changed.
     * @event AssetManager#progress
     */
    this.post(Message.PROGRESS, this.mLoadingProgress);

    if (this.mTotalLoaded === this.mTotalPending) {
      this.mQueue.splice(0, this.mQueue.length);
      this.mLoadersQueue = {};
      this.mState = AssetManagerState.FINISHED;
      this.mTotalLoaded = 0;
      this.mTotalErrors = 0;
      this.mTotalPending = 0;
      this.mIsAllLoaded = true;

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
     * Posted when error occurred while loading assets.
     * @event AssetManager#complete
     */
    this.post(Message.ERROR, item);

    if (total === this.mTotalPending) {
      this.mQueue.splice(0, this.mQueue.length);
      this.mLoadersQueue = {};
      this.mState = AssetManagerState.FINISHED;
      this.mTotalLoaded = 0;
      this.mTotalErrors = 0;
      this.mTotalPending = 0;
      this.mIsAllLoaded = true;
      this.post(Message.COMPLETE);
    }
  }

  /**
   * Returns BitmapFontData object by given name.
   *
   * @param {string} name The name of the Asset to search.
   * @return {black-engine~BitmapFontData|null} Returns a BitmapFontData if found or null.
   */
  getBitmapFont(name) {
    /** @type {black-engine~BitmapFontData} */
    let font = this.mAssets[AssetType.BITMAP_FONT][name];

    if (font != null)
      return font;

    Debug.warn(`[AssetManager] BitmapFontData '${name}' was not found.`);
    return null;
  }

  /**
   * Returns Texture object by given name.
   *
   * @param {string} name The name of the Asset.
   * @return {black-engine~Texture|null} Returns a Texture if found or null.
   */
  getTexture(name) {
    let textures = this.mAssets[AssetType.TEXTURE];
    if (textures != null) {
      /** @type {Texture} */
      let t = textures[name];

      if (t != null)
        return t;
    }

    let textureAtlases = this.mAssets[AssetType.TEXTURE_ATLAS];
    if (textureAtlases != null) {
      for (let key in textureAtlases) {
        let t = textureAtlases[key].subTextures[name];

        if (t != null)
          return t;
      }
    }

    let vectorTextures = this.mAssets[AssetType.VECTOR_TEXTURE];
    if (vectorTextures != null) {
      let t = vectorTextures[name];

      if (t != null)
        return t;
    }

    let vectorTextureAtlases = this.mAssets[AssetType.VECTOR_TEXTURE_ATLAS];
    if (vectorTextureAtlases != null) {
      for (let key in vectorTextureAtlases) {
        let t = vectorTextureAtlases[key].subTextures[name];

        if (t != null)
          return t;
      }
    }

    Debug.warn(`[AssetManager] Texture '${name}' was not found.`);
    return null;
  }

  /**
   * Returns Graphics data by given name.
   * @param {string} name 
   * @returns {black-engine~GraphicsData}
   */
  getGraphicsData(name) {
    let vectors = this.mAssets[AssetType.VECTOR_GRAPHICS];

    if (vectors == null)
      return null;

    /** @type {GraphicsData} */
    let data = vectors[name];

    if (data)
      return data;

    for (let key in vectors) {
      data = vectors[key].searchNode(name);

      if (data) {
        return data;
      }
    }

    Debug.warn(`[AssetManager] GraphicsData '${name}' was not found.`);
    return null;
  }

  /**
   * Returns array of Texture by given name mask.
   * Searches across all loaded images and atlases.
   *
   * @param {string} nameMask The name mask.
   * @returns {Array<black-engine~Texture>|null}
   */
  getTextures(nameMask) {
    let textures = this.mAssets[AssetType.TEXTURE];
    let textureAtlases = this.mAssets[AssetType.TEXTURE_ATLAS];
    let vectorTextures = this.mAssets[AssetType.VECTOR_TEXTURE];
    let vectorTextureAtlases = this.mAssets[AssetType.VECTOR_TEXTURE_ATLAS];

    let out = [];
    let names = [];

    let re = new RegExp('^' + nameMask.split('*').join('.*') + '$');

    // collect single textures
    if (textures != null) {
      for (let key in textures)
        if (re.test(key))
          names.push({ name: key, atlas: null, isBakedVector: false });
    }

    if (vectorTextures != null) {
      for (let key in vectorTextures)
        if (re.test(key))
          names.push({ name: key, atlas: null, isBakedVector: true });
    }

    // collect textures from all atlases
    if (textureAtlases != null) {
      for (let key in textureAtlases) {
        let atlas = textureAtlases[key];

        for (let key2 in atlas.subTextures)
          if (re.test(key2))
            names.push({ name: key2, atlas: atlas, isBakedVector: false });
      }
    }

    // collect texture from vector atlases
    if (vectorTextureAtlases != null) {
      for (let key in vectorTextureAtlases) {
        let atlas = vectorTextureAtlases[key];

        for (let key2 in atlas.subTextures)
          if (re.test(key2))
            names.push({ name: key2, atlas: atlas, isBakedVector: true });
      }
    }

    AtlasTexture.naturalSort(names, 'name');

    for (let i = 0; i < names.length; i++) {
      let ao = names[i];

      if (ao.atlas === null) {
        if (ao.isBakedVector === true)
          out.push(vectorTextures[ao.name]);
        else
          out.push(textures[ao.name]);
      }
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
   * @return {black-engine~AtlasTexture|null} Returns atlas or null.
   */
  getAtlas(name) {
    let atlasses = this.mAssets[AssetType.TEXTURE_ATLAS];
    if (atlasses == null)
      return null;

    if (atlasses[name] != null)
      return atlasses[name];

    Debug.warn(`[AssetManager] Atlas '${name}' was not found.`);
    return null;
  }

  /**
   * Returns `SoundClip` by given name.
   *
   * @param {string} name The name of the sound.
   * @return {black-engine~SoundClip} Returns sound or null.
   */
  getSound(name) {
    let sounds = this.mAssets[AssetType.SOUND];
    let soundAtlases = this.mAssets[AssetType.SOUND_ATLAS];

    if (sounds != null) {
      /** @type {SoundClip} */
      let s = sounds[name];

      if (s != null)
        return s;
    }

    if (soundAtlases != null) {
      for (let key in soundAtlases) {
        let s = soundAtlases[key].subSounds[name];
        if (s != null)
          return s;
      }
    }

    Debug.warn(`[AssetManager] Sound '${name}' was not found.`);
    return null;
  }

  /**
   * Returns `SoundAtlasClip` by given name.
   *
   * @param {string} name The name of the sound.
   * @return {black-engine~SoundClip} Returns sound or null.
   */
  getSoundAtlas(name) {
    if (this.mAssets[AssetType.SOUND_ATLAS] == null)
      return null;

    return this.mAssets[AssetType.SOUND_ATLAS][name];
  }

  /**
   * Returns Object parsed from JSON by given name.
   *
   * @param {string} name The name of the JSON asset.
   * @return {Object} Returns object or null.
   */
  getJSON(name) {
    if (this.mAssets[AssetType.JSON] == null)
      return null;

    return this.mAssets[AssetType.JSON][name];
  }

  /**
   * Returns Object parsed from `CutsomAsset` by given name.
   *
   * @param {string} type The type of the asset.
   * @param {string} name The name of the asset.
   * @return {Object|null} Returns object or null.
   */
  getCustomAsset(type, name) {
    if (this.mAssets[type] == null)
      return null;

    return this.mAssets[type][name];
  }

  __validateState() {
    Debug.assert(this.mState === AssetManagerState.NONE || this.mState === AssetManagerState.FINISHED, 'Illegal state.');
  }

  __validateName(type, name) {
    if (this.mAssets[type] && this.mAssets[type][name])
      Debug.assert(this.mDictionary[name] == null, 'Asset with such name is already added.');
  }

  /**
   * Destroys all loaded resources.
   */
  dispose() {
    // todo: for each asset call abort
    this.mQueue.forEach(x => {
      x.abort();
    });
  }

  /**
   * Gets/Sets default path for loading. Useful when URLs getting too long.
   * The asset path will be concatenated with defaultPath.
   *
   * @return {string}
   */
  get defaultPath() {
    return this.mDefaultPath;
  }

  /**
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
   * Returns number of errors occurred during loading.
   * @returns {number}
   */
  get numErrors() {
    return this.mTotalErrors;
  }

  /**
   * Returns current state.
   *
   * @returns {black-engine~AssetManagerState}
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