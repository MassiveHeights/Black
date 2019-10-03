import { AssetLoader } from "./AssetLoader";

var alternativeUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYmBgAAgwAAAMAAMjcmNcAAAAAElFTkSuQmCC';

/**
 * Responsible for loading images.
 *
 * @cat assets.loaders
 * @extends black-engine~AssetLoader
 */
export class ImageAssetLoader extends AssetLoader {
  /**
   * Creates new ImageAssetLoader instance.
   * @param {string} url 
   */
  constructor(url) {
    super(url);

    /** 
     * @private 
     * @type {Image} 
     */
    this.mImageElement = new Image();
    this.mImageElement.crossOrigin = 'anonymous';
  }

  /**
   * @inheritDoc
   */
  load() {
    this.mData = this.mImageElement;
    
    this.mImageElement.onload = () => this.onLoad();
    this.mImageElement.onerror = () => this.onError();
    this.mImageElement.src = this.mUrl;
  }

  /**
   * @inheritDoc
   */
  onAbort() {
    this.mImageElement.onload = this.mImageElement.onabort = this.mImageElement.onerror = function () { };
    this.mImageElement.src = alternativeUrl;
  }
}

