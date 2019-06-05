import { AssetLoader } from "./loaders/AssetLoader";
import { LoaderType } from "./LoaderType";

/**
 * A factory object used to get or create a loader.
 */
export class LoaderFactory {
  /**
   * 
   * @param {AssetManager} assetManager 
   */
  constructor(assetManager) {
    this.mAssetManager = assetManager;
  }

  /**
   * Returns an existing instance of the loader if url is already in queue or creates new instance if not.
   * 
   * @param {string} type 
   * @param {string|LoaderType} url 
   * @param {...any}
   * 
   * @returns {AssetLoader}
   */
  get(type, url, ...args) {
    let am = this.mAssetManager;
    let loader = am.mLoadersQueue[url];

    if (loader != undefined)
      return loader;

    return new am.mLoaderTypeMap[type](url, ...args);
  }
}