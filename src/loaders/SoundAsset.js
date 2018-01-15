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
   * @override
   * @inheritDoc
   *
   * @return {void}
   */
  onLoaded() {
    let undecodedAudio = this.mRequest.response;
    Audio.context.decodeAudioData(undecodedAudio, (buffer) => {
      this.mData = new SoundClip(buffer);
      super.onLoaded();
    });
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */
  load() {
    if (Device.webAudioSupported === false || Audio.context == null)
      return;
    super.load();
  }
}




/* @echo EXPORT */
class SoundAtlasAsset extends Asset {
  constructor(name, soundUrl, dataUrl) {
    super(name, soundUrl);

    this.dataAsset = new JSONAsset(name, dataUrl);
    this.dataAsset.on('complete', this.onJsonLoaded, this);

    this.soundAsset = new Asset(name, soundUrl);
    this.soundAsset.on('complete', this.onSoundLoaded, this);
    this.soundAsset.mResponseType = 'arraybuffer';
  }

  onJsonLoaded() {
    this.soundAsset.load();
  }

  load() {
    this.dataAsset.load();
  }

  onSoundLoaded() {
    let undecodedAudio = this.soundAsset.mRequest.response;

    Audio.context.decodeAudioData(undecodedAudio, (buffer) => {
      this.mData = new SoundAtlasClip(buffer, this.dataAsset.data);
      super.onLoaded();
    });
  }
}