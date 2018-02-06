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

    this.mResponseType = 'arraybuffer';
  }

  /**
   * @inheritDoc
   */
  onLoaded() {
    let undecodedAudio = this.mRequest.response;
    Audio.context.decodeAudioData(undecodedAudio, (buffer) => {
      this.mData = new SoundClip(buffer);
      super.onLoaded();
    });
  }

  /**
   * @inheritDoc
   */
  load() {
    if (Device.webAudioSupported === false || Audio.context == null) {
      super.onLoaded();
      return;
    }
    super.load();
  }
}