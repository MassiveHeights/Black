import { System } from "../core/System";
import { Debug } from "../core/Debug";
import { SoundChannel } from "./SoundChannel";
import { SoundInstance } from "./SoundInstance";
import { SoundClip } from "./SoundClip";
import { SoundAtlasClip } from "./SoundAtlasClip";
import { SoundListener } from "./SoundListener";
import { Black } from "./../Black";

/**
 * The main class, which is responsible for audio support.
 * 
 * @cat audio
 * @extends {System}
 */
export class MasterAudio extends System {
  /**
   * Singleton
   */
  constructor() {
    super();

    Black.audio = this;

    /** 
     * @private 
     * @type {AudioContext|null} 
     */
    this.mContext = null;

    /** 
     * @private 
     * @type {SoundListener|null} 
     */
    this.mCurrentListener = null;

    /** 
     * @private 
     * @type {Object<string, SoundChannel>} 
     */
    this.mChannels = {};

    /** 
     * @private 
     * @type {SoundChannel|null} 
     */
    this.mMasterChannel = null;

    this.__initialize();
  }

  /**
   * @inheritDoc
   */
  onPause() {
    if (this.mContext === null)
      return;

    if (this.mContext.state === 'running')
      this.mContext.suspend();
  }

  /**
   * @inheritDoc
   */
  onResume() {
    if (this.mContext === null)
      return;

    if (this.mContext.state === 'suspended')
      this.mContext.resume();
  }

  /**
   * @ignore
   */
  __initialize() {
    try {
      this.mContext = new (window['AudioContext'] || window['webkitAudioContext'])();
    } catch (error) {
      if (this.mContext == null) {
        Debug.warn('no audio support');
        return;
      }
    }

    this.__unlock();

    this.mMasterChannel = new SoundChannel('master');

    this.mMasterChannel._outputNode.connect(this.mContext.destination);
    this.mChannels['master'] = this.mMasterChannel;
  }

  dispose() {
    super.dispose();

    if (this.mContext !== null) {
      this.stopAll();
      this.mContext.close();
    }

    Black.audio = null;
  }

  /**
   * @ignore
   * @private
   * @return {void}
   */
  __unlock() {
    let f = () => {
      let buffer = this.mContext.createBuffer(1, 1, 22050);
      let unlockSource = this.mContext.createBufferSource();
      unlockSource.buffer = buffer;
      unlockSource.connect(this.mContext.destination);

      if (unlockSource.start === undefined)
        unlockSource.noteOn(0);
      else
        unlockSource.start(0);

      if (unlockSource.context.state === 'suspended')
        unlockSource.context.resume();

      document.removeEventListener('touchstart', f);
      document.removeEventListener('click', f);
    };

    document.addEventListener('touchstart', f);
    document.addEventListener('click', f);
  }

  /**
   * Creates or returns the channel with specific name.
   * 
   * @param {string} name The name of channel to create.
   * @returns {SoundChannel}
   */
  createChannel(name) {
    if (this.mChannels[name] == null) {
      let ch = new SoundChannel(name);
      ch._outputNode.connect(this.mMasterChannel._inputNode);
      this.mChannels[name] = ch;
    }

    return this.mChannels[name];
  }

  /**
   * Gets the channel with specific name.
   * 
   * @param {string} name The name of channel to get.
   * @returns {SoundChannel|null}
   */
  getChannel(name) {
    return this.mChannels[name];
  }

  /**
   * @ignore
   * @param {SoundInstance} snd 
   * @returns {SoundChannel}
   */
  _resolveChannel(snd) {
    for (let chName in this.mChannels)
      this.mChannels[chName].detachSound(snd);

    let chName = snd.channel == '' ? 'master' : snd.channel;
    let ch = this.mChannels[chName];
    ch.attachSound(snd);

    return ch;
  }

  /**
   * Plays sound on specific channel.
   * 
   * @public
   * @param {string|SoundAtlasClip} nameOrSound The name of sound or the instance of SoundInstance.
   * @param {string=} [channel='master']       The name of channel to play on.
   * @param {number=} [volume=1]               Volume level.
   * @param {boolean=} [loop=false]            Defines if sound will loop.
   * @param {number=} [pan=0]                  The panning of the sound, ranging from -1 (left) to 1 (right).
   * @returns {SoundInstance}                  New sound instance to be played.
   */
  play(nameOrSound, channel = 'master', volume = 1, loop = false, pan = 0) {
    Debug.assert(nameOrSound != null, `Param 'nameOrSound' cannot be null.`);

    let sound = null;
    if (nameOrSound.constructor === String)
      sound = (Black.assets.getSound( /** @type {string} */(nameOrSound)));

    return sound.play(channel, volume, loop, pan);
  }

  /**
   * Stops all sound on specific channel.
   * 
   * @public
   * @param {string|null} channelName The name of channel to stop sounds on. If empty, stops sounds on all channels.
   * @returns {void} 
   */
  stopAll(channelName = null) {
    if (channelName === null)
      for (let chName in this.mChannels)
        this.mChannels[chName].stopAll();
    else
      this.getChannel(channelName).stopAll();
  }

  /**
   * Pauses all the sounds on specific channel.
   * 
   * @public
   * @param {string|null} channelName The name of channel to pause sounds on. If empty, pauses all the sounds on all channels.
   * @returns {void}
   */
  pauseAll(channelName = null) {
    if (channelName === null)
      for (let chName in this.mChannels)
        this.mChannels[chName].pauseAll();
    else
      this.getChannel(channelName).pauseAll();
  }

  /**
   * Resumes all the sounds on specific channel.
   * 
   * @public
   * @param {string|null} channelName The name of channel to resume sounds on. If empty, resumes all the sounds on all channels.
   * @returns {void}
   */
  resumeAll(channelName = null) {
    if (channelName === null)
      for (let chName in this.mChannels)
        this.mChannels[chName].resumeAll();
    else
      this.getChannel(channelName).resumeAll();
  }

  /**
   * @param {number} value
   * @returns {void}
   */
  set masterVolume(value) {
    this.mMasterChannel.volume = value;
  }

  /**
   * Gets/Sets volume on master channel.
   * 
   * @public
   * @returns {number}
   */
  get masterVolume() {
    return this.mMasterChannel.volume;
  }

  /**
   * Gets the only instance of native AudioContext.
   * 
   * @readonly
   * @returns {AudioContext}
   */
  get context() {
    return this.mContext;
  }

  /**
   * Gets the master channel.
   * 
   * @readonly
   * @returns {SoundChannel}
   */
  get masterChannel() {
    return this.mMasterChannel;
  }

  /**
   * @param {SoundListener} value
   * @returns {void}
   */
  set currentListener(value) {
    this.mCurrentListener = value;
  }

  /**
   * Gets/Sets current listener for spatial sound effects.
   * 
   * @public
   * @returns {SoundListener}
   */
  get currentListener() {
    return this.mCurrentListener;
  }

  /**
   * Resets current listener to default AudioContext listener.
   * 
   * @public
   * @returns {void}
   */
  looseListener() {
    this.mContext.listener.setPosition(0, 0, 1);
    this.mCurrentListener = null;
  }

  /**
   * @ignore
   * @returns {!GainNode}
   */
  _newGainNode() {
    if (this.mContext.createGain === undefined)
      return this.mContext.createGainNode();

    return this.mContext.createGain();
  }
}