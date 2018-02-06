/**
 * The main class, which is responsible for audio support.
 * 
 * @cat audio
 * @extends {System}
 */
/* @echo EXPORT */
class Audio extends System {
  /**
   * Singleton
   */
  constructor() {
    super();

    this.constructor.instance = this;

    this.__unlock();

    /** @private @type {AudioContext|null} */
    this.mContext = null;

    try {
      this.mContext = new (window['AudioContext'] || window['webkitAudioContext'])();
    } catch (error) {
      Debug.warn('no audio support');
      return;
    }

    /** @private @type {SoundListener|null} */
    this.mCurrentListener = null;

    /** @private @type {Object<string, SoundChannel>} */
    this.mChannels = {};

    /** @private @type {SoundChannel} */
    this.mMasterChannel = new SoundChannel('master');

    this.mMasterChannel._outputNode.connect(this.mContext.destination);
    this.mChannels['master'] = this.mMasterChannel;
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
    };

    document.addEventListener('touchstart', f);
  }

  /**
   * Creates or returns the channel with specific name.
   * 
   * @param {string} name The name of channel to create.
   * @returns {SoundChannel}
   */
  static createChannel(name) {
    if (Audio.instance.mChannels[name] == null) {
      let ch = new SoundChannel(name);
      ch._outputNode.connect(Audio.instance.mMasterChannel._inputNode);
      Audio.instance.mChannels[name] = ch;
    }
    return Audio.instance.mChannels[name];
  }

  /**
   * Gets the channel with specific name.
   * 
   * @param {string} name The name of channel to get.
   * @returns {SoundChannel|null}
   */
  static getChannel(name) {
    return Audio.instance.mChannels[name];
  }

  /**
   * @ignore
   * @internal
   * @param {SoundInstance} snd 
   * @returns {SoundChannel}
   */
  static _resolveChannel(snd) {
    for (let chName in Audio.instance.mChannels)
      Audio.instance.mChannels[chName].detachSound(snd);
    let chName = snd.channel == '' ? 'master' : snd.channel;
    let ch = Audio.instance.mChannels[chName];
    ch.attachSound(snd);
    return ch;
  }

  /**
   * Plays sound on specific channel.
   * 
   * @public
   * @param {string|SoundClip} nameOrSound The name of sound or the instance of SoundInstance.
   * @param {string=} [channel='master']       The name of channel to play on.
   * @param {number=} [volume=1]               Volume level.
   * @param {boolean=} [loop=false]            Defines if sound will loop.
   * @param {number=} [pan=0]                  The panning of the sound, ranging from -1 (left) to 1 (right).
   * @returns {SoundInstance}                  New sound instance to be played.
   */
  static play(nameOrSound, channel = 'master', volume = 1, loop = false, pan = 0) {
    Debug.assert(nameOrSound != null, `Param 'nameOrSound' cannot be null.`);

    if (nameOrSound.constructor === String) {
      nameOrSound = /** @type {SoundClip} */ AssetManager.default.getSound(nameOrSound);
    }

    return nameOrSound._play(channel, volume, loop, pan);
  }

  /**
   * Stops all sound on specific channel.
   * 
   * @public
   * @param {string|null} channelName The name of channel to stop sounds on. If empty, stops sounds on all channels.
   * @returns {void} 
   */
  static stopAll(channelName = '') {
    if (channelName === '') {
      for (let chName in Audio.instance.mChannels) {
        Audio.instance.mChannels[chName].stopAll();
      }
    } else {
      Audio.getChannel(channelName).stopAll();
    }
  }

  /**
   * @ignore
   * @param {number} value
   * @returns {void}
   */
  static set masterVolume(value) {
    Audio.instance.mMasterChannel.volume = value;
  }

  /**
   * Gets/Sets volume on master channel.
   * 
   * @public
   * @returns {number}
   */
  static get masterVolume() {
    return Audio.instance.mMasterChannel.volume;
  }

  /**
   * Gets the only instance of native AudioContext.
   * 
   * @readonly
   * @returns {AudioContext}
   */
  static get context() {
    return Audio.instance.mContext;
  }

  /**
   * Gets the master channel.
   * 
   * @readonly
   * @returns {SoundChannel}
   */
  static get masterChannel() {
    return Audio.instance.mMasterChannel;
  }

  /**
   * @ignore
   * @param {SoundListener} value
   * @returns {void}
   */
  static set currentListener(value) {
    Audio.instance.mCurrentListener = value;
  }

  /**
   * Gets/Sets current listener for spatial sound effects.
   * 
   * @public
   * @returns {SoundListener}
   */
  static get currentListener() {
    return Audio.instance.mCurrentListener;
  }

  /**
   * Resets current listener to default AudioContext listener.
   * 
   * @public
   * @returns {void}
   */
  static looseListener() {
    Audio.context.listener.setPosition(0, 0, 1);
    Audio.currentListener = null;
  }

  /**
   * @ignore
   * @internal
   * @returns {GainNode}
   */
  static _newGainNode() {
    if (Audio.context.createGain === undefined)
      return Audio.context.createGainNode();

    return Audio.context.createGain();
  }
}