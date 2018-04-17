/* @echo EXPORT */
class SequencerClip {
  constructor(name) {
    this.mName = name;
    this.mStates = {};
    this.mTracks = {};

    this.mActionTrack = new SequencerActionTrack('actions');
  }

  addTrack(track) {
    Debug.assert(this.mTracks.hasOwnProperty(track.name) === false, 'Track with such name already exists.');

    this.mTracks[track.name] = track;
    return track;
  }

  removeTrack(track) {
    delete this.mTracks[track.name];
    delete this.mStates[track.name];
    return track;
  }

  getTrack(name) {
    if (name in this.mTracks)
      return this.mTracks[name];

    return null;
  }

  getState(name) {
    if (name in this.mStates)
      return this.mStates[name];

    return null;
  }

  update(dt, position, key, reversed) {
    const dur = key.duration;

    position = position % dur;

    const result = {};

    for (var k in this.mTracks) {
      let state = this.mStates[k];

      if (state == null) {
        state = new TrackState(this.mTracks[k], key);
        this.mStates[k] = state;
      }

      if (state.repeatsLeft < 0)
        continue;

      reversed = reversed || state.isReversed;
      const truePosition = state.isReversed ? dur - position : position;
      
      state.update(truePosition);
      const value = this.mTracks[k].getValue(dt, truePosition, state.keyA, state.keyB, reversed);

      if (value !== null) {
        result[k] = value;
      }

      if (position + dt > dur) {
        state.onComplete(key);
      }
    }

    return result;
  }

  get duration() {
    let d = 0;
    for (var k in this.mTracks)
      d = Math.max(d, this.mTracks[k].duration);

    return d;
  }

  get name() {
    return this.mName;
  }
}

/* @echo EXPORT */
class TrackState {
  constructor(track, key) {
    this.track = track;
    this.key = key;
    this.isReversed = false;
    this.reset();
  }

  reset(key) {
    this.repeatsLeft = this.key.repeats;
    this.currentNode = this.track.findNode(0);
  }

  onComplete() {
    this.repeatsLeft--;
    if (this.key.endBehavior === 'yoyo') {
      this.isReversed = !this.isReversed;
    } 
    this.currentNode = this.track.findNode(!this.isReversed ? 0 : this.track.duration);
  }

  update(position) {
    this.currentNode = this.track.switchNode(this.currentNode, position, !this.isReversed);
  }

  get keyA() {
    return this.currentNode.data;
  }

  get keyB() {
    return this.isReversed ? this.currentNode.prev.data : this.currentNode.next.data;
  }
}