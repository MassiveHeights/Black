/* @echo EXPORT */
class StereoPanner extends SoundEffect {
  constructor() {
    super();
    this.mGainL = Audio.__newGainNode();
    this.mGainR = Audio.__newGainNode();
    this.mInputNode = this.mSplitter = Audio.context.createChannelSplitter(2);
    this.mSplitter.connect(this.mGainL, 0);
    this.mSplitter.connect(this.mGainR, 1);
    this.mOutputNode = this.mMerger = Audio.context.createChannelMerger(2);
    this.mGainL.connect(this.mMerger, 0, 0);
    this.mGainR.connect(this.mMerger, 0, 1);

    this.mValue = 0;
  }

  set pan(value) {
    this.mValue = MathEx.clamp(value, -1, 1);
    this.mGainL.gain.setValueAtTime(1 - MathEx.clamp(this.mValue, 0, 1), 0);
    this.mGainR.gain.setValueAtTime(1 + MathEx.clamp(this.mValue, -1, 0), 0);
  }

  get pan() {
    return this.mValue;
  }
}