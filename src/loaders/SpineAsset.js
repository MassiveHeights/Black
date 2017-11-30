/**
 * Spine file asset class responsible for preloading Image file, coresponding Json and Json for Spine animation.
 *
 * @cat loaders
 * @extends Asset
 */
/* @echo EXPORT */
class SpineAsset extends Asset {
  /**
   * Creates SpineAsset instance.
   *
   * @param {string} name Sound name.
   * @param {string} url  URL to load audio from.
   */
  constructor(name, imageUrl, atlasDataUrl, dataUrl) {
    super(name, imageUrl);

    /**
     * @private
     * @type {AtlasTextureAsset}
     */
     this.mAtlassDataAsset = new AtlasTextureAsset(name, imageUrl, atlasDataUrl);
     this.mAtlassDataAsset.on('complete', () => this.onAtlasLoaded(name, dataUrl), this);

     /**
     * @private
     * @type {JSONAsset|undefined}
     */
     this.mSpineDataAsset = undefined;
  }

  /**
   * @ignore
   * @returns {void}
   */
  onAtlasLoaded(name, dataUrl) {
    this.mSpineDataAsset = new JSONAsset(name, dataUrl);
    this.mSpineDataAsset.on('complete', this.onLoaded, this);
    this.mSpineDataAsset.load();
  }

  /**
   * @override
   * @inheritDoc
   * @return {void}
   */
  onLoaded() {
    this.mData = this.mSpineDataAsset.data;

    super.onLoaded();
  }

  /**
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  load() {
    this.mAtlassDataAsset.load();
  }

  /**
   * Returns loaded atlas for spine animation.
   *
   * @return {AtlasTextureAsset}
   */
  get atlas() {
    return this.mAtlassDataAsset.data;
  }
}
