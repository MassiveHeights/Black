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
  constructor(time, value) {
    super(time);

    this.mValue = value;
  }

  get value() {
    return this.mValue;
  }
}

/* @echo EXPORT */
class MessageSequencerKey extends SequencerKey {
  constructor(time, message, ...payload) {
    super(time);

    this.mMessage = message;
    this.mPayload = payload;
  }

  get message() {
    return this.mMessage;
  }
}

/* @echo EXPORT */
class ScriptSequencerKey extends SequencerKey {
  constructor(time, fn, ...payload) {
    super(time);

    this.mFn = fn;
    this.mPayload = payload;
  }
}