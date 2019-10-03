import { MessageDispatcher } from "../../messages/MessageDispatcher";
import { Message } from "../../messages/Message";

/**
 * Base class for loaders.
 *
 * @cat assets.loaders
 * @extends black-engine~MessageDispatcher
 */
export class AssetLoader extends MessageDispatcher {
  /**
   * Creates new AssetLoader instance.
   * 
   * @param {string} url
   */
  constructor(url) {
    super();

    /** 
     * @protected 
     * @type {string} 
     */
    this.mUrl = url;

    /** 
     * @protected 
     * @type {*|null} 
     */
    this.mData = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsLoaded = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mNumOwners = 0;
  }

  /**
   * When overridden loads data. Should not be called directly.
   * 
   * @public
   */
  load() { }

  /**
   * When overridden aborts loading process. Should not be called directly.
   * 
   * @returns {void}
   */
  abort() {
    // more than one owner means this loader was used by two assets, eg two assets has same url.
    if (this.mNumOwners > 1)
      return;

    this.onAbort();
  }

  /**
   * @protected
   * @returns {void}
   */
  onAbort() { }

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
   * @return {*}
   */
  get data() {
    return this.mData;
  }

  get url() {
    return this.mUrl;
  }
}