/**
 * The class which stores audio buffer and its all sounds data.
 * 
 * @cat audio
 */
/* @echo EXPORT */
class SoundClip {
  /**
   * Creates new instance of SoundClip.
   * 
   * @param {AudioBuffer} nativeBuffer     Decoded audio buffer.
   * @param {number=} [offset=0]           Determines at which position of buffer the sound will be played.
   * @param {number=} [duration=undefined] If undefined, gets duration value from native audio buffer.
   * @param {boolean=} [isSubClip=false]   Specifies whether this sound clip is part of a sound atlas.
   */
  constructor(nativeBuffer, offset = 0, duration = NaN, isSubClip = false) {

    /** @private @type {AudioBuffer} */
    this.mNativeBuffer = nativeBuffer;

    /** @private @type {number} */
    this.mStartOffset = offset;

    /** @private @type {number} */
    this.mDuration = duration || nativeBuffer.duration;

    /** @private @type {boolean} */
    this.mIsSubClip = isSubClip;
  }

  /**
   * Creates sound instance and starts to play on specific channel
   * 
   * @public
   * @param {string=} [channel='master'] The name of channel.
   * @param {number=} [volume=1]         The volume level.
   * @param {boolean=} [loop=false]      Specifies if sound will repeat infinite times.
   * @param {number=} [pan=0]            The panning value.
   * @returns {SoundInstance}            New sound instance to be played.
   */
  play(channel = 'master', volume = 1, loop = false, pan = 0) {
    let instance = new SoundInstance(this);
    instance.channel = channel;
    instance.volume = volume;
    instance.loop = loop;
    instance.pan = pan;
    return instance._play();
  }

  /**
   * Creates an array of blocks filled with average amplitude gathered in certain interval
   * 
   * @public
   * @param {number} blockNum Number of blocks to divide data to
   * @returns {Float32Array}
   */
  collectWaveData(blockNum) {
    let channels = [];
    for (let i = 0; i < this.mNativeBuffer.numberOfChannels; i++)
      channels[i] = this.mNativeBuffer.getChannelData(i);

    const playPercent = this.mDuration / this.mNativeBuffer.duration;
    const startPercent = this.mStartOffset / this.mNativeBuffer.duration;
    const startPos = ~~(channels[0].length * startPercent);
    const endPos = startPos + ~~(channels[0].length * playPercent);
    const values = new Float32Array(blockNum);
    const blockWidth = ~~(channels[0].length * playPercent / blockNum);
    let dataBlock = [];

    for (let i = startPos, c = 0; i < endPos ; i++) {
      dataBlock.push(this.__averagePeak(channels, i));

      if (dataBlock.length >= blockWidth) {
        let max = Math.max(...dataBlock);
        let min = Math.min(...dataBlock);
        values[c++] = (max + min) / 2;
        dataBlock = [];
      }
    }

    return values;
  }

  /**
   * @ignore
   * @private
   * @param {*} channels 
   * @param {number} ix 
   */
  __averagePeak(channels, ix) {
    let sum = 0;
    channels.forEach(ch => sum += Math.abs(ch[ix]));
    return sum / channels.length;
  }

  /**
   * Gets the decoded audio buffer.
   * 
   * @public
   * @readonly
   * @returns {AudioBuffer}
   */
  get native() {
    return this.mNativeBuffer;
  }

  /**
   * Gets the position in seconds, where the sound should start to play.
   * 
   * @public
   * @readonly
   * @returns {number}
   */
  get offset() {
    return this.mStartOffset;
  }

  /**
   * Gets sound clip duration.
   * 
   * @public
   * @readonly
   * @returns {number}
   */
  get duration() {
    return this.mDuration;
  }

  /**
   * Represents whether this sound clip is a part of sound atlas clip.
   * 
   * @public
   * @readonly
   * @returns {boolean}
   */
  get isSubClip() {
    return this.mIsSubClip;
  }
}