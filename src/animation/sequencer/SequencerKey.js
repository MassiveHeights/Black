/* @echo EXPORT */
class SequencerKey {
  constructor(time) {
    this.mTime = Math.round(time * 1000) / 1000;
  }

  get time() {
    return this.mTime;
  }
}

SequencerKey.comparer = (a, b) => { return a.time - b.time; };

/* @echo EXPORT */
class SequencerClipKey extends SequencerKey {
  constructor(time, clip, userDuration, repeats = Infinity, endBehavior = 'loop') {
    super(time);

    this.clip = clip;
    this.userDuration = userDuration;
    this.repeats = repeats;
    this.endBehavior = endBehavior;
  }

  get duration() {
    return this.userDuration != undefined ? this.userDuration : this.clip.duration;
  }

  isActiveOn(position) {
    return position >= this.time && position <= this.time + this.duration;
  }
}

/* @echo EXPORT */
class SequencerNumberKey extends SequencerKey {
  constructor(time, value, ease = null) {
    super(time);

    this.value = value;
    this.ease = ease;
  }
}

/* @echo EXPORT */
class SequencerMessageKey extends SequencerKey {
  constructor(time, message, ...payload) {
    super(time);

    this.message = message;
    this.payload = payload;
  }
}

/* @echo EXPORT */
class SequencerScriptKey extends SequencerKey {
  constructor(time, fn, ...payload) {
    super(time);

    this.fn = fn;
    this.payload = payload;
  }
}