/* @echo EXPORT */
class Sequence {
  constructor(name) {
    this.mName = name;
    this.mClips = {};
    this.mClipsData = {};
  }

  addClip(clip, data) {
    Debug.assert(this.mClips.hasOwnProperty(clip.name) === false, 'Clip with such name already exists.');

    this.mClips[clip.name] = clip;
    this.mClipsData[clip.name] = data;
    return clip;
  }

  removeClip(clip) {
    delete this.mClips[clip.name];
    delete this.mClipsData[clip.name];
    return clip;
  }

  getClip(name) {
    if (name in this.mClips)
      return this.mClips[name];

    return null;
  }

  getClipData(name) {
    if (name in this.mClipsData)
      return this.mClipsData[name];

    return null;
  }
}