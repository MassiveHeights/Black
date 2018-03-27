/* @echo EXPORT */
class Sequence {
  constructor(name) {
    this.mName = name;
    this.mTracks = {};
  }

  addTrack(track) {
    Debug.assert(this.mTracks.hasOwnProperty(track.name) === false, 'Track with such name already exists.');

    this.mTracks[track.name] = track;
  }

  removeTrack(track) {
  }

  getTrack(name) {
    if (this.mTracks.hasOwnProperty(name))
      return this.mTracks;

    return null;
  }

  addKey(trackName, key) {
    this.mTracks[trackName].addKey(key);
  }

  update(dt, position, dirty) {
    for (var k in this.mTracks)
      this.mTracks[k].update(dt, position, dirty);
  }

  get name() {
    return this.mName;
  }
}