/* @echo EXPORT */
class ReverbEffect extends SoundEffect {
  constructor(IRBuffer) {
    super();
    this.mInputNode = Audio.__newGainNode();
    this.mOutputNode = Audio.__newGainNode();

    this.mConvolver = Audio.context.createConvolver();
    this.mDry = Audio.__newGainNode();
    this.mWet = Audio.__newGainNode();
    this.mTone = Audio.context.createBiquadFilter();

    this.mConvolver.buffer = IRBuffer;

    this.mInputNode.connect(this.mDry);
    this.mDry.connect(this.mOutputNode);

    this.mInputNode.connect(this.mTone);
    this.mTone.connect(this.mConvolver);
    this.mConvolver.connect(this.mWet);
    this.mWet.connect(this.mOutputNode);

    this.mDry.gain.setValueAtTime(1, 0);
    this.mWet.gain.setValueAtTime(0, 0);
    this.mTone.type = 'lowpass';
    this.mTone.frequency.setValueAtTime(350, 0);
    this.mTone.Q.setValueAtTime(Math.SQRT1_2, 0);
  }

  set wet(value) {
    value = MathEx.clamp(value, 0, 1);
    this.mWet.gain.setValueAtTime(value, 0);
  }

  set dry(value) {
    value = MathEx.clamp(value, 0, 1);
    this.mDry.gain.setValueAtTime(value, 0);
  }

  set tone(value) {
    value = MathEx.clamp(value, 10, Audio.context.sampleRate / 2);
    this.mTone.frequency.setValueAtTime(value, 0);
  }

  get wet() {
    return this.mWet.gain.value;
  }

  get dry() {
    return this.mDry.gain.value;
  }

  get tone() {
    return this.mTone.frequency.value;
  }
}