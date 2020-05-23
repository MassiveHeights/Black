import { MessageDispatcher } from "../messages/MessageDispatcher";
import { SoundState } from "./SoundState";
import { Black } from "../Black";
import { StereoPanner } from "./effects/StereoPanner";
import { Message } from "../messages/Message";

/**
 * @ignore
 * @private
 */
let ID = 0;

/**
 * The sound
 * 
 * @cat audio
 * @extends {black-engine~MessageDispatcher}
 */
export class SoundInstance extends MessageDispatcher {
  /**
   * Creates instance
   * @param {black-engine~SoundClip} sound `SoundClip` instance taken from `AssetManager`.
   */
  constructor(sound) {
    super();

    /** 
     * @private 
     * @type {number} 
     */
    this.mId = ++ID;

    /** 
     * @private 
     * @type {black-engine~SoundClip} 
     */
    this.mSound = sound;

    /** 
     * @private 
     * @type {black-engine~SoundState} 
     */
    this.mState = SoundState.NEWBORN;

    /** 
     * @private 
     * @type {string} 
     */
    this.mChannel = 'master';

    /** 
     * @private 
     * @type {number} 
     */
    this.mVolume = 1;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mLoop = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStartTime = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mPausePosition = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStopPosition = 0;

    /** 
     * @private 
     * @type {AudioBufferSourceNode} 
     */
    this.mSrc = null;

    /** 
     * @private 
     * @type {GainNode} 
     */
    this.mGainNode = Black.audio._newGainNode();

    /** 
     * @private 
     * @type {AudioNode} The node to connect audio source 
     */
    this.mFirstNode = this.mGainNode;

    /** 
     * @private 
     * @type {AudioNode} The node the source is connected to 
     */
    this.mPlayNode = null;

    /** 
     * @private 
     * @type {PannerNode} 
     */
    this.mSpatialPanner = null;

    /** 
     * @private 
     * @type {StereoPanner} 
     */
    this.mStereoPanner = null;

    /** 
     * @private 
     * @type {AnalyserNode} 
     */
    this.mAnalyser = null;
  }

  /**
   * Enables spatial effect if not enabled previously.
   * 
   * @public
   * @returns {PannerNode}
   */
  enableSpacePan() {
    if (this.mSpatialPanner == null) {
      this.mSpatialPanner = Black.audio.context.createPanner();
      if (this.mFirstNode) {
        this.mSpatialPanner.connect(this.mFirstNode);
        this.mFirstNode = this.mSpatialPanner;
      }
      this.__reconnectSource();
    }
    return this.mSpatialPanner;
  }

  /**
   * Enables stereo panning effect if not enabled previously.
   * 
   * @public
   * @returns {StereoPanner}
   */
  enableStereoPan() {
    if (this.mStereoPanner == null) {
      this.mStereoPanner = new StereoPanner();
      if (this.mFirstNode) {
        this.mStereoPanner._outputNode.connect(this.mFirstNode);
        this.mFirstNode = this.mStereoPanner._inputNode;
      }
      this.__reconnectSource();
    }
    return this.mStereoPanner;
  }

  /**
   * Enables analyser node if not enabled previously.
   * 
   * @public
   * @returns {AnalyserNode}
   */
  enableAnalyser() {
    if (this.mAnalyser == null) {
      this.mAnalyser = Black.audio.context.createAnalyser();
      if (this.mFirstNode) {
        this.mAnalyser.connect(this.mFirstNode);
        this.mFirstNode = this.mAnalyser;
      }
      this.__reconnectSource();
    }
    return this.mAnalyser;
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  __reconnectSource() {
    if (this.mSrc != null && this.mPlayNode != null && this.mFirstNode != null) {
      this.mSrc.disconnect(this.mPlayNode);
      this.mSrc.connect(this.mFirstNode);
      this.mPlayNode = this.mFirstNode;
    }
  }

  /**
   * @ignore
   * @returns {black-engine~SoundInstance}
   */
  _play() {
    if (this.mState === SoundState.PLAYING)
      return this;

    this.mState = SoundState.PLAYING;

    let duration = this.mSound.isSubClip && !this.mLoop ? this.mSound.duration - this.mPausePosition : undefined;
    this.mGainNode.gain.setValueAtTime(this.mVolume, 0);

    let src = Black.audio.context.createBufferSource();
    src.buffer = this.mSound.native;
    src.loop = this.mLoop;
    src.onended = () => this.__onComplete();
    this.mFirstNode && src.connect(this.mFirstNode);
    this.mPlayNode = this.mFirstNode;
    this.mStartTime = Black.audio.context.currentTime - this.mPausePosition;

    if (this.mLoop && this.mSound.isSubClip) {
      src.loopStart = this.mSound.offset;
      src.loopEnd = this.mSound.offset + this.mSound.duration;
    }

    src.start(Black.audio.context.currentTime, this.mSound.offset + this.mPausePosition, duration);
    Black.audio._resolveChannel(this);
    this.mSrc = src;

    return this;
  }

  /**
   * Stops playing.
   * 
   * @public
   * @param {number=} [duration=0] Time offset in seconds specifying when the sound will completely stop.
   * @returns {void}
   */
  stop(duration = 0) {
    if (this.mState === SoundState.PLAYING) {
      this.mStopPosition = this.currentPosition;

      this.mGainNode.gain.cancelScheduledValues(0);
      this.mSrc.stop(Black.audio.context.currentTime + duration);

      this.mState = SoundState.STOPPED;
    }
  }

  /**
   * Pauses current sound.
   * 
   * @public
   * @returns {void}
   */
  pause() {
    if (this.mState === SoundState.PLAYING) {
      this.mPausePosition = this.currentPosition;
      this.stop();
      
      this.mState = SoundState.PAUSED;
    }
  }

  /**
   * Resumes current sound, if it has been paused.
   * 
   * @public
   * @returns {void}
   */
  resume() {
    if (this.mState === SoundState.PAUSED)
      this._play();
  }

  /**
   * Changes the volume of sound in given time.
   * 
   * @param {number} from            Initial volume level.
   * @param {number} to              Target volume level.
   * @param {number=} [duration=0]   In seconds. If '0' changes the volume instantly.
   * @param {string} [type='linear'] Possible types: 'linear', 'exp'.
   */
  fade(from, to, duration = 0, type = 'linear') {
    if (duration <= 0) {
      this.mGainNode.gain.setValueAtTime(to, 0);
    } else {
      this.mGainNode.gain.setValueAtTime(from, 0);
      if (type === 'exp')
        this.mGainNode.gain.exponentialRampToValueAtTime(Math.max(to, 0.01), Black.audio.context.currentTime + duration);
      else
        this.mGainNode.gain.linearRampToValueAtTime(to, Black.audio.context.currentTime + duration);
    }
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  __onComplete() {
    this.mSrc = null;

    if (this.mState !== SoundState.PAUSED) {
      this.mStartTime = 0;
      this.mState = SoundState.COMPLETED;
      this.post(Message.COMPLETE);
    }
  }

  /**
   * Gets current position of sound in seconds.
   * 
   * @public
   * @readonly
   * @returns {number}
   */
  get currentPosition() {
    switch (this.mState) {
      case SoundState.PLAYING:
        return (Black.audio.context.currentTime - this.mStartTime) % (this.mSound.duration + 0.01);
      case SoundState.PAUSED:
        return this.mPausePosition;
      case SoundState.COMPLETED:
        return this.mSound.duration;
      case SoundState.STOPPED:
        return this.mStopPosition;
    }
    
    return 0;
  }

  /**
   * @ignore
   * @readonly
   * @returns {AudioNode}
   */
  get _outputNode() {
    return this.mGainNode;
  }

  /**
   * Gets/Sets current channel to play by name.
   * 
   * @public
   * @returns {string}
   */
  get channel() {
    return this.mChannel;
  }

  /**
   * @public
   * @param {string} value
   * @returns {void}
   */
  set channel(value) {
    if (this.mChannel === value)
      return;
    this.mChannel = value;
    if (this.mState === SoundState.PLAYING) {
      Black.audio._resolveChannel(this);
    }
  }

  /**
   * Gets/Sets sound volume. Ranging from 0 to 1.
   * 
   * @public
   * @returns {number}
   */
  get volume() {
    return this.mVolume;
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set volume(value) {
    this.mVolume = value;
    this.mGainNode.gain.setValueAtTime(this.mVolume, 0);
  }

  /**
   * Gets/Sets whether the sound will be looped.
   * 
   * @public
   * @returns {boolean}
   */
  get loop() {
    return this.mLoop;
  }

  /**
   * @public
   * @param {boolean} value
   * @returns {void}
   */
  set loop(value) {
    this.mLoop = value;
  }

  /**
   * Gets/Sets pan stereo effect. Ranging from -1 (left) to 1 (right).
   * 
   * @public
   * @returns {number}
   */
  get pan() {
    return this.mStereoPanner.pan;
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set pan(value) {
    if (value !== 0 && this.mStereoPanner == null)
      this.enableStereoPan();

    if (this.mStereoPanner)
      this.mStereoPanner.pan = value;
  }

  /**
   * Gets whether sound is playing.
   * 
   * @public
   * @readonly
   * @returns {boolean}
   */
  get isPlaying() {
    return this.mState === SoundState.PLAYING;
  }

  /**
   * Gets total duration of sound clip.
   * 
   * @public
   * @readonly
   * @returns {number}
   */
  get duration() {
    return this.mSound.duration;
  }
}
