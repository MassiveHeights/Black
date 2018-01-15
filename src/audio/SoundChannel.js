/* @echo EXPORT */
class SoundChannel {
  constructor(name) {
    this.mName = name;
    this.mId = 0;

    this.mGain = Audio.__newGainNode();

    this.mSounds = [];
    this.mEffects = [];
  }

  attachSound(snd) {
    snd._connectToOutput(this._inputNode);
    this.mSounds.push(snd);
    snd.on('complete', () => {
      this.mSounds.splice(this.mSounds.indexOf(snd), 1);
      snd._disconnectFromOutput();
    });
  }

  detachSound(snd) {
    let ix = this.mSounds.indexOf(snd);
    if (ix > -1) {
      this.mSounds.splice(ix, 1);
      snd._disconnectFromOutput();
    }
  }

  stopAll() {
    for(let snd = this.mSounds[0]; this.mSounds.length; snd = this.mSounds.shift()) {
      snd.stop();
    }
  }

  addEffect(effect) {
    effect._connectToOutput(this._inputNode);
    this.mEffects.unshift(effect);
    this.__reconnectSounds();
    return effect;
  }

  removeEffect(effect) {
    effect._disconnectFromOutput();
    this.mEffects.splice(this.mEffects.indexOf(effect), 1);
    this.__reconnectSounds();
  }

  removeAllEffects() {
    for(; this.mEffects.length; this.mEffects.shift()) {
      this.mEffects[0]._disconnectFromOutput();
    }
    this.__reconnectSounds();
  }

  __reconnectSounds() {
    this.mSounds.forEach(x => { 
      x._disconnectFromOutput();
      x._connectToOutput(this._inputNode);
    });
  }

  set volume(value) {
    this.mGain.gain.setValueAtTime(value, 0);
}

  get volume() {
    this.mGain.gain.value;
  }

  get _inputNode() {
    return this.mEffects.length ? this.mEffects[0]._inputNode : this.mGain;
  }

  get _outputNode() {
    return this.mGain;
  }
}