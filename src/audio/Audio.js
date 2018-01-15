/* @echo EXPORT */
class Audio extends System {
  constructor() {
    super();

    this.constructor.instance = this;

    this.__unlock();

    this.mContext = null;

    try {
      this.mContext = new (window['AudioContext'] || window['webkitAudioContext'])();
    } catch (error) {
      Debug.warn('no audio support');
      return;
    }

    this.mCurrentListener = null;

    this.mChannels = {};
    this.mMasterChannel = new SoundChannel('master');
    this.mMasterChannel._outputNode.connect(this.mContext.destination);
    this.mChannels['master'] = this.mMasterChannel;
  }

  static createChannel(name) {
    if (Audio.instance.mChannels[name] == null) {
      let ch = new SoundChannel(name);
      ch._outputNode.connect(Audio.instance.mMasterChannel._inputNode);
      Audio.instance.mChannels[name] = ch;
      return ch;
    }
    return null;
  }

  static getChannel(name) {
    return Audio.instance.mChannels[name];
  }

  static _resolveChannel(snd) {
    for (let chName in Audio.instance.mChannels) 
      Audio.instance.mChannels[chName].detachSound(snd);
    let chName = snd.channel == null ? 'master' : snd.channel;
    let ch = Audio.instance.mChannels[chName];
    ch.attachSound(snd);
  }

  static play(nameOrSound, channel = 'master', volume = 1, loop = false, pan = 0) {
    if (nameOrSound.constructor === String) {
      nameOrSound = AssetManager.default.getSound(nameOrSound);
    }

    let snd = nameOrSound.play(channel, volume, loop, pan);
    return snd;
  }

  static stopAll(channelName = null) {
    if (channelName != null) {
      for (let chName in Audio.instance.mChannels) {
        Audio.instance.mChannels[chName].stopAll();
      }
    } else {
      Audio.getChannel(channelName).stopAll();
    }
  }

  static set masterVolume(value) {
    Audio.instance.mMasterChannel.volume = value;
  }

  static get masterVolume() {
    return Audio.instance.mMasterChannel.volume;
  }

  static get context() {
    return Audio.instance.mContext;
  }

  static get masterChannel() {
    return Audio.instance.mMasterChannel;
  }

  static set currentListener(value) {
    Audio.instance.mCurrentListener = value;
  }

  static get currentListener() {
    return Audio.instance.mCurrentListener;
  }

  static __newGainNode() {
    if (Audio.context.createGain === undefined)
      return Audio.context.createGainNode();
    
    return Audio.context.createGain();
  }

  static looseListener() {
    Audio.context.listener.setPosition(0, 0, 1)
    Audio.currentListener = null;
  }

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
}