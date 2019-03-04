/**
 * Sound file asset class responsible for loading audio files.
 *
 * @cat assets
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
    super(name);

    if (Device.webAudioSupported === false)
      return;

    if (Black.instance.hasSystem(MasterAudio) === false) {
      Debug.warn('[SoundAsset] Loading sound files without MasterAudio system.');
      return;
    }

    /** 
     * @private 
     * @type {XHRAssetLoader} 
     */
    this.mXHR = new XHRAssetLoader(url);
    this.mXHR.responseType = 'arraybuffer';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    let undecodedAudio = /** @type {!ArrayBuffer} */ (this.mXHR.data);
    MasterAudio.context.decodeAudioData(undecodedAudio, (buffer) => {
      super.ready(new SoundClip(buffer));
    });
  }
}