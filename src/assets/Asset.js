import { MessageDispatcher } from "../messages/MessageDispatcher";
import { AssetLoader } from "./loaders/AssetLoader";
import { Message } from "../messages/Message";
import { MessageBinding } from "../messages/MessageBinding";

/**
 * This is abstract class for custom assets. For example Asset can be used to load video or other data files.
 * Holds information about external assets.
 *
 * @fires Asset#error
 * @fires Asset#complete
 * 
 * @cat assets
 * @extends black-engine~MessageDispatcher
 */
export class Asset extends MessageDispatcher {
  /**
   * Creates new Asset instance.
   *
   * @param  {string} name Name of asset.
   */
  constructor(type, name) {
    super();

    /** 
     * @protected 
     * @type {string} 
     */
    this.mType = type;

    /** 
     * @protected 
     * @type {string} 
     */
    this.mName = name;

    /** 
     * @protected 
     * @type {Object|null} 
     */
    this.mData = null;

    /** 
     * @protected 
     * @type {Array<black-engine~AssetLoader>} 
     */
    this.mLoaders = [];

    /** 
     * @private 
     * @type {number} 
     */
    this.mNumLoaded = 0;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsReady = false;

    /** 
     * @private 
     * @type {Array<black-engine~MessageBinding>} 
     */
    this.mBindings = [];
  }

  /**
   * Adds given loader to the list. Loader cannot be added to multiply Assets.
   * 
   * @param {black-engine~AssetLoader} loader Loader to add.
   * @returns {black-engine~AssetLoader}
   */
  addLoader(loader) {
    this.mLoaders.push(loader);

    loader.mNumOwners++;

    this.mBindings.push(loader.on(Message.COMPLETE, this.__onLoaderComplete, this));
    this.mBindings.push(loader.on(Message.ERROR, this.__onLoaderError, this));

    return loader;
  }

  /**
   * Called when AssetManager is about to request loaders for this asset.
   * @param {black-engine~LoaderFactory} factory 
   */
  onLoaderRequested(factory) { }

  /**
   * @private
   * @param {Message} m 
   * @returns {void}
   */
  __onLoaderComplete(m) {
    this.mNumLoaded++;

    if (this.mNumLoaded === this.mLoaders.length) {
      this.mBindings.forEach(x => x.off());

      this.onAllLoaded();
    }
  }

  /**
   * @private
   * @param {black-engine~Message} m 
   */
  __onLoaderError(m) {
    this.abort();

    /**
     * Posted when error occurred during loading this asset. 
     * @event Asset#error
     */
    this.post(Message.ERROR);
  }

  /**
   * @protected
   */
  onAllLoaded() { }

  /**
   * Aborts loading of this asset.
   * @public
   */
  abort() {
    this.mNumLoaded = 0;

    this.mBindings.forEach(x => x.off());

    for (let i = 0; i < this.mLoaders.length; i++) {
      const loader = this.mLoaders[i];
      loader.abort();
    }
  }

  /**
   * Protected method used to notify AssetManager about completion of loading this asset.
   * 
   * @protected
   * @param {Object=} data
   * @returns {void}
   */
  ready(data) {
    this.mData = data;
    this.mIsReady = true;

    /**
     * Posted when asset finished loading.
     * @event Asset#complete
     */
    this.post(Message.COMPLETE);
  }

  /**
   * Returns the type of this asset.
   *
   * @return {string}
   */
  get type() {
    return this.mType;
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
   * @return {*}
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
   * @returns {Array<black-engine~AssetLoader>}
   */
  get loaders() {
    return this.mLoaders;
  }
}
