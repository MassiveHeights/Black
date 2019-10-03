import { Asset } from "./Asset";
import { Black } from "../Black";
import { Debug } from "../core/Debug";
import { XHRAssetLoader } from "./loaders/XHRAssetLoader";
import { MasterAudio } from "../audio/MasterAudio";
import { SoundClip } from "../audio/SoundClip";
import { AssetType } from "./AssetType";
import { LoaderType } from "./LoaderType";

/**
 * Sound file asset class responsible for loading audio files.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
export class SoundAsset extends Asset {
  /**
   * Creates SoundAsset instance.
   *
   * @param {string} name Sound name.
   * @param {string} url  URL to load audio from.
   */
  constructor(name, url) {
    super(AssetType.SOUND, name);

    if (Black.device.webAudioSupported === false)
      return;

    if (Black.engine.hasSystem(MasterAudio) === false) {
      Debug.warn('[SoundAsset] Loading sound files without MasterAudio system.');
      return;
    }

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /** 
     * @private 
     * @type {black-engine~XHRAssetLoader|null} 
     */
    this.mXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mXHR = factory.get(LoaderType.XHR, this.mUrl);
    this.mXHR.responseType = 'arraybuffer';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    let undecodedAudio = /** @type {!ArrayBuffer} */ (this.mXHR.data);
    Black.audio.context.decodeAudioData(undecodedAudio, (buffer) => {
      super.ready(new SoundClip(buffer));
    });
  }
}