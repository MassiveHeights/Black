/**
import { AssetManager } from './../../dist/black-es6-module';
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

    this.mBuffer = null;
    this.mResponseType = 'arraybuffer'
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
      this.mBuffer = buffer;
      this.mBuffer.name = this.mName;
      this.mData = this.mBuffer;
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
    if (Device.webAudioSupported === false)
      return;
    super.load();
  }
}

/* @echo EXPORT */
class SoundClip extends MessageDispatcher {
  constructor(nameOrBuffer) {
    super();

    if (nameOrBuffer.constructor == String)
      nameOrBuffer = AssetManager.default.getSound(nameOrBuffer);

    this.mBuffer = nameOrBuffer;
    this.mName = this.mBuffer.name;

    this.mGainNode = Audio.__newGainNode();
    this.mGainNode.connect(Audio.__masterGain);

    this.mIsPlaying = false;
    this.mIsPaused = false;

    this.mPausePosition = 0;
    this.mStartTime = 0;
    this.mPlayTime = 0;

    this.mDuration = this.mBuffer.duration;

    this.mVolume = 1;
    this.mLoop = false;

    Black.instance.on('paused', x => this.pause());
    Black.instance.on('unpaused', x => this.resume());
  }

  play(volume = 1, loop = false, delay = 0) {

    if (this.mIsPlaying)
      return;

    this.mVolume = volume;
    this.mLoop = loop;

    this.mStartTime = Audio.context.currentTime + delay;
    this.mIsPlaying = true;

    this.mGainNode.gain.setValueAtTime(volume, 0);

    this.mSrc = Audio.context.createBufferSource();
    this.mSrc.connect(this.mGainNode);
    this.mSrc.buffer = this.mBuffer;
    this.mSrc.loop = loop;
    this.mSrc.onended = () => this.__onComplete();
    this.mSrc.start(Audio.context.currentTime + delay, 0);

    return this;
  }

  resume() {
    if (this.mIsPaused === true) {
      this.mIsPaused = false;
      this.mPlayTime = this.mPausePosition;
      this.mStartTime = Audio.context.currentTime;
      this.mSrc = Audio.context.createBufferSource();
      this.mSrc.connect(this.mGainNode);
      this.mSrc.buffer = this.mBuffer;
      this.mSrc.loop = this.mLoop;
      this.mSrc.onended = () => this.__onComplete();
      this.mSrc.start(0, this.mPlayTime);
    }
    return this;
  }

  pause() {
    if (this.mIsPlaying) {
      this.mIsPaused = true;
      this.mPausePosition = Audio.context.currentTime - this.mStartTime + this.mPlayTime;
      this.mSrc.onended = null;
      this.stop();
    }
    return this;
  }

  stop() {
    if (this.mIsPlaying === true) {
      this.mGainNode.gain.cancelScheduledValues(0);
      this.mSrc.stop();
    }
    return this;
  }

  setVolume(value, duration = 0) {
    if (duration <= 0)
      this.mGainNode.gain.setValueAtTime(value, 0);
    else
      this.mGainNode.gain.linearRampToValueAtTime(value, Audio.context.currentTime + duration);
      // this.mGainNode.gain.exponentialRampToValueAtTime(Math.max(value, 0.01), Audio.context.currentTime + duration);
  }

  __onComplete() {
    Black.instance.off('unpaused');
    Black.instance.off('paused');
    this.mIsPlaying = false;
    this.mPlayTime = 0;
    this.mPausePosition = 0;
    this.post('complete');
  }

  get name() {
    return this.mName;
  }
}

/* @echo EXPORT */
class Audio extends System {
  constructor() {
    super();

    this.constructor.instance = this;

    this.__unlock();

    this.mContext = null;
    this.mMasterGainNode = null;

    try {
      this.mContext = new (window['AudioContext'] || window['webkitAudioContext'])();
    } catch (error) {
      Debug.warn('no audio support');
      return;
    }

    this.mMasterGainNode = Audio.__newGainNode();
    this.mMasterGainNode.connect(this.mContext.destination);
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

  static set masterVolume(value) {
      Audio.instance.mMasterGainNode.gain.setValueAtTime(value, 0);
  }

  static get masterVolume() {
    return Audio.instance.mMasterGainNode.gain.value;
  }

  static get context() {
    return Audio.instance.mContext;
  }

  static __newGainNode() {
    let gainNode;
    if (Audio.instance.mContext.createGain === undefined)
      gainNode = Audio.instance.mContext.createGainNode();
    else
      gainNode = Audio.instance.mContext.createGain();
    return gainNode;
  }

  static get __masterGain() {
    return Audio.instance.mMasterGainNode;
  }
}


// class AudioSource extends Component {
//   constructor(sound) {
//   }
// }

// class AudioListener extends Component {
// }
