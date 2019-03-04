/**
 * Responsible for loading images.
 *
 * @cat assets.loaders
 * @extends AssetLoader
 */
/* @echo EXPORT */
class ImageAssetLoader extends AssetLoader {
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
    this.mImageElement.src = this.mUrl;
    this.mImageElement.onload = () => this.onLoad();
    this.mImageElement.onerror = () => this.onError();
    this.mData = this.mImageElement;
  }

  /**
   * @inheritDoc
   */
  abort() {
    this.mImageElement.onload = this.mImageElement.onabort = this.mImageElement.onerror = function () { };
    this.mImageElement.src = ImageAssetLoader.ALT_URL;
  }
}

ImageAssetLoader.ALT_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYmBgAAgwAAAMAAMjcmNcAAAAAElFTkSuQmCC';