/* @echo EXPORT */
class SequencerKey {
  constructor(time) {
    this.mTime = Math.round(time * 1000) / 1000;
  }

  get time() {
    return this.mTime;
  }
}

/* @echo EXPORT */
class NumberSequencerKey extends SequencerKey {
  constructor(time, value, ease) {
    super(time);

    this.value = value;
    this.ease = ease;
  }
}

/* @echo EXPORT */
class MessageSequencerKey extends SequencerKey {
  constructor(time, message, ...payload) {
    super(time);

    this.message = message;
    this.payload = payload;
  }
}

/* @echo EXPORT */
class ScriptSequencerKey extends SequencerKey {
  constructor(time, fn, ...payload) {
    super(time);

    this.fn = fn;
    this.payload = payload;
  }
}