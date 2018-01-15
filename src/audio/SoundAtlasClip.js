/* @echo EXPORT */
class SoundAtlasClip extends SoundClip {
  constructor(nativeBuffer, jsonObject) {
    super(nativeBuffer);
    this.mClips = {};
    if (jsonObject !== null)
      for (let key in jsonObject)
        this.addSubSound(key, jsonObject[key][0], jsonObject[key][1]);
  }

  addSubSound(name, offset = 0, duration = undefined) {
    this.mClips[name] = new SoundClip(this.mNativeBuffer, offset, duration, true);
  }

  removeSubSounds(name) {
    delete this.mClips[name];
  }

  get subSounds() {
    return this.mClips;
  }
}