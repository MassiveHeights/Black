/* @echo EXPORT */
class SoundClip {
  constructor(nativeBuffer, offset = 0, duration = undefined, isSubClip = false) {
    this.mNativeBuffer = nativeBuffer;
    this.mStartOffset = offset;
    this.mDuration = duration || nativeBuffer.duration;
    this.mIsSubClip = isSubClip;
  }

  play(channel = 'master', volume = 1, loop = false, pan = 0) {
    let instance = new SoundInstance(this);
    instance.channel = channel;
    instance.volume = volume;
    instance.loop = loop;
    instance.pan = pan;
    return instance._play();
  }

  get native() {
    return this.mNativeBuffer;
  }

  get offset() {
    return this.mStartOffset;
  }

  get duration() {
    return this.mDuration;
  }

  get isSubClip() {
    return this.mIsSubClip;
  }
}