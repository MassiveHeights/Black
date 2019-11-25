import { SoundClip } from "./SoundClip";
import { SoundInstance } from "./SoundInstance";

/**
 * The class which stores audio buffer of sound atlas and information about sub sound clips.
 * 
 * @cat audio
 * @extends black-engine~SoundClip
 */
export class SoundAtlasClip extends SoundClip {

  /**
   * Creates instance of SoundAtlas.
   * 
   * @param {AudioBuffer} nativeBuffer Decoded audio buffer.
   * @param {Object} jsonObject        Data representing sub sounds name, duration and offset.
   */
  constructor(nativeBuffer, jsonObject) {
    super(nativeBuffer);

    /** 
     * @private 
     * @type {Object<string, black-engine~SoundClip>} 
     */
    this.mClips = {};
    
    if (jsonObject !== null)
      for (let key in jsonObject['sounds'])
        this.addSubSound(key, jsonObject['sounds'][key][0], jsonObject['sounds'][key][1]);
  }

  /**
   * Dynamically sets new sub sound info bypassing json.
   * 
   * @public
   * @param {string} name     The name of the sub sound.
   * @param {number} offset   The offset is seconds, where sub sound will be start playing from.
   * @param {number} duration The duration of sub sound.
   * @returns {black-engine~SoundClip}     New instance of SoundClip.
   */
  addSubSound(name, offset = 0, duration = NaN) {
    this.mClips[name] = new SoundClip(this.native, offset, duration, true);
    return this.mClips[name];
  }

  /**
   * Removes previously added sub sound info.
   * 
   * @public
   * @param {string} name The name of the sub sound.
   * @returns {void}
   */
  removeSubSound(name) {
    delete this.mClips[name];
  }

  /**
   * Directly plays sub sound by given name on specific channel.
   * 
   * @public
   * @param {string} name                The name of the sub sound.
   * @param {string=} [channel='master'] The name of channel.
   * @param {number=} [volume=1]         The volume level.
   * @param {boolean=} [loop=false]      Specifies if sound will repeat infinite times.
   * @param {number=} [pan=0]            The panning value.
   * @returns {black-engine~SoundInstance|null}       New sound instance to be played.
   */
  playSubSound(name, channel = 'master', volume = 1, loop = false, pan = 0) {
    let clip = this.mClips[name];
    if (clip == null)
      return null;
    
    let instance = new SoundInstance(clip);
    instance.channel = channel;
    instance.volume = volume;
    instance.loop = loop;
    instance.pan = pan;
    return instance._play();
  }

  /**
   * The dictionary of sub sounds.
   *
   * @public
   * @readonly
   * @returns {Object<string, black-engine~SoundClip>}
   */
  get subSounds() {
    return this.mClips;
  }
}