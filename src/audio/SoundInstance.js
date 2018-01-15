let count = 0;

/* @echo EXPORT */
class SoundInstance extends MessageDispatcher {
  constructor(sound) {
    super();

    this.mId = ++count;

    this.mSound = sound;
    this.mIsPlaying = false;

    this.mChannel = null;
    this.mVolume = 1;
    this.mLoop = false;

    this.mSrc = null;

    this.mGainNode = Audio.__newGainNode();
    // node to connect audio source
    this.mFirstNode = this.mGainNode;
    // node the source is connected to
    this.mPlayNode = null;
  }

  enableSpacePan() {
    this.mSpatialPanner = Audio.context.createPanner();
    this.mSpatialPanner.connect(this.mFirstNode);
    this.mFirstNode = this.mSpatialPanner;
    this.__reconnectSource();
    return this.mSpatialPanner;
  }

  enableStereoPan() {
    this.mStereoPanner = new StereoPanner();
    this.mStereoPanner._outputNode.connect(this.mFirstNode);
    this.mFirstNode = this.mStereoPanner._inputNode;
    this.__reconnectSource();
    return this.mStereoPanner;
  }

  enableAnalyser() {
    this.mAnalyser = Audio.context.createAnalyser();
    this.mAnalyser.connect(this.mFirstNode);
    this.mFirstNode = this.mAnalyser;
    this.__reconnectSource();
    return this.mAnalyser;
  }

  __reconnectSource() {
    if (this.mSrc) {
      this.mSrc.disconnect(this.mPlayNode);
      this.mSrc.connect(this.mFirstNode);
      this.mPlayNode = this.mFirstNode;
    }
  }

  _play() {

    if (this.mIsPlaying)
      return;

    // todo
    let delay = 0;
    let duration = undefined;

    this.mIsPlaying = true;

    this.mGainNode.gain.setValueAtTime(this.mVolume, 0);

    let src = Audio.context.createBufferSource();
    src.buffer = this.mSound.native;
    src.loop = this.mLoop;
    src.onended = () => this.__onComplete();
    src.connect(this.mFirstNode);
    this.mPlayNode = this.mFirstNode;

    if (this.mLoop && this.mSound.isSubClip) {
      src.loopStart = this.mSound.offset;
      src.loopEnd = this.mSound.offset + this.mSound.duration;
      duration = this.mSound.duration;
    }

    src.start(Audio.context.currentTime + delay, this.mSound.offset, duration);
    Audio._resolveChannel(this);
    this.mSrc = src;

    return this;
  }

  stop(duration = 0) {
    if (this.mIsPlaying === true) {
      this.mGainNode.gain.cancelScheduledValues(0);
      this.mSrc.stop(Audio.context.currentTime + duration);
    }
  }

  _connectToOutput(node) {
    this.mConnectedOutput = node;
    this._outputNode.connect(node);
  }

  _disconnectFromOutput() {
    if (this.mConnectedOutput)
      this._outputNode.disconnect(this.mConnectedOutput);
    this.mConnectedOutput = null;
  }

  fade(from, to, duration = 0, type = 'linear') {
    if (duration <= 0) {
      this.mGainNode.gain.setValueAtTime(to, 0);
    } else {
      this.mGainNode.gain.setValueAtTime(from, 0);
      if (type === 'exp')
        this.mGainNode.gain.exponentialRampToValueAtTime(Math.max(to, 0.01), Audio.context.currentTime + duration);
      else
        this.mGainNode.gain.linearRampToValueAtTime(to, Audio.context.currentTime + duration);
    }
  }

  __onComplete() {
    this.mIsPlaying = false;
    this.mSrc = null;
    console.log('complete');
    this.post('complete');
  }

  get _outputNode() {
    return this.mGainNode;
  }

  get channel() {
    return this.mChannel;
  }

  set channel(value) {
    this.mChannel = value;
    if (this.mIsPlaying) {
      Audio._resolveChannel(this);
    }
  }

  get volume() {
    return this.mVolume;
  }

  set volume(value) {
    this.mVolume = value;
    this.mGainNode.gain.setValueAtTime(this.mVolume, 0);
  }

  get loop() {
    return this.mLoop;
  }

  set loop(value) {
    this.mLoop = value;
  }

  get pan() {
    return this.mStereoPanner.pan;
  }

  set pan(value) {
    if (value !== 0 && !this.mStereoPanner) 
      this.enableStereoPan();
    
    if (this.mStereoPanner)
      this.mStereoPanner.pan = value;
  }

  get isPlaying() {
    return this.mIsPlaying;
  }
}