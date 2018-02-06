/**
 * Sound file asset class responsible for preloading audio atlas files.
 *
 * @cat loaders
 * @extends Asset
 */
/* @echo EXPORT */
class SoundAtlasAsset extends Asset {
  /**
   * Creates SoundAtlasAsset instance.
   *
   * @param {string} name Sound name.
   * @param {string} soundUrl  URL to load audio atlas from.
   * @param {string} dataUrl  URL to load atlas data from.
   */
  constructor(name, soundUrl, dataUrl) {
    super(name, soundUrl);

    /** @private @type {JSONAsset} */
    this.dataAsset = new JSONAsset(name, dataUrl);
    this.dataAsset.on('complete', this.onJsonLoaded, this);

    /** @private @type {Asset} */
    this.soundAsset = new Asset(name, soundUrl);
    this.soundAsset.on('complete', this.onSoundLoaded, this);
    this.soundAsset.mResponseType = 'arraybuffer';
  }

  /**
   * @ignore
   * @private
   */
  onJsonLoaded() {
    this.soundAsset.load();
  }

  /**
   * @inheritDoc
   */
  load() {
    this.dataAsset.load();
  }

  /**
   * @ignore
   * @private
   */
  onSoundLoaded() {
    let undecodedAudio = this.soundAsset.mRequest.response;

    Audio.context.decodeAudioData(undecodedAudio, (buffer) => {
      this.mData = new SoundAtlasClip(buffer, this.dataAsset.data);
      super.onLoaded();
    });
  }
}