/**
 * Sound file asset class responsible for preloading audio files.
 *
 * @cat loaders
 * @extends Asset
 */
/* @echo EXPORT */
class SoundAsset extends Asset {
  /**
   * Creates SoundAsset instance.
   *
   * @param {string} name Sound name.
   * @param {string} url  URL to load audio from.
   */
  constructor(name, url) {
    super(name, url);

    /**
     * @private
     * @type {Audio}
     */
    this.mAudioElement = new Audio();
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */
  onLoaded() {
    this.mData = this.mAudioElement;

    super.onLoaded();
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */
  load() {
    this.mAudioElement.src = this.mUrl;
    this.mAudioElement.preload = 'auto';
    this.mAudioElement.oncanplaythrough = () => {
      if (this.mData != null) {
        this.onLoaded();
      }
    }
  }
}
