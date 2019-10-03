import { Asset } from "./Asset";
import { Black } from "../Black";
import { Debug } from "../core/Debug";
import { XHRAssetLoader } from "./loaders/XHRAssetLoader";
import { MasterAudio } from "../audio/MasterAudio";
import { SoundAtlasClip } from "../audio/SoundAtlasClip";
import { AssetType } from "./AssetType";
import { LoaderType } from "./LoaderType";

/**
 * Sound file asset class responsible for loading audio atlas files.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
export class SoundAtlasAsset extends Asset {
  /**
   * Creates new SoundAtlasAsset instance.
   *
   * @param {string} name Sound name.
   * @param {string} soundUrl  URL to load audio atlas from.
   * @param {string} dataUrl  URL to load atlas data from.
   */
  constructor(name, soundUrl, dataUrl) {
    super(AssetType.SOUND_ATLAS, name);

    /**
     * @private
     * @type {string}
     */
    this.mSoundUrl = soundUrl;

    /**
     * @private
     * @type {string}
     */
    this.mDataUrl = dataUrl;

    if (Black.device.webAudioSupported === false)
      return;

    if (Black.engine.hasSystem(MasterAudio) === false) {
      Debug.warn('[SoundAsset] Loading sound files without MasterAudio system.');
      return;
    }

    /** 
     * @private 
     * @type {black-engine~XHRAssetLoader|null} 
     */
    this.mAudioXHR = null;

    /** 
     * @private 
     * @type {black-engine~XHRAssetLoader|null} 
     */
    this.mDataXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mAudioXHR = factory.get(LoaderType.XHR, this.mSoundUrl);
    this.mAudioXHR.responseType = 'arraybuffer';
    this.addLoader(this.mAudioXHR);

    this.mDataXHR = factory.get(LoaderType.XHR, this.mDataUrl);
    this.mDataXHR.mimeType = 'application/json';
    this.mDataXHR.responseType = 'json';
    this.addLoader(this.mDataXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    let undecodedAudio = /** @type {!ArrayBuffer} */ (this.mAudioXHR.data);
    Black.audio.context.decodeAudioData(undecodedAudio, (buffer) => {
      super.ready(new SoundAtlasClip(buffer, this.mDataXHR.data));
    });
  }
}