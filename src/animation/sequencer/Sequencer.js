/* @echo EXPORT */
class Sequencer extends Component {
  constructor() {
    super();

    this.mSequences = {};

    this.mActiveSequence = null;

    this.mPosition = 0;
    this.mLoop = false;
    this.mDirty = true;
  }

  addSequence(sequence) {
    if (this.getSequence(sequence.name) === null)
      this.mSequences[sequence.name] = sequence;

    return sequence;
  }

  removeSequence(sequence) {
    if (this.getSequence(sequence.name) === null)
      return null;

    delete sequence[sequence.name];
    return sequence;
  }

  getSequence(name) {
    if (this.mSequences.hasOwnProperty(name))
      return this.mSequences[name];

    return null;
  }

  /**
   * Adds key with specified value at given time to the track equal to property name. In case there is no sequence or 
   * track they will be created automatically.
   * 
   * @param {string} property 
   * @param {number} absoluteTime 
   * @param {number} value 
   * @param {...number} timeOffsetValuePairs A pair of time-value values. Time is relative to absolute time.
   * @returns {Sequencer}
   */
  addKey(property, absoluteTime, value, ...timeOffsetValuePairs) {
    Debug.isNumber(absoluteTime);
    Debug.isNumber(value);
    Debug.assert(absoluteTime >= 0, 'timeOffset cannot be less then zero.');
    Debug.assert(timeOffsetValuePairs.length === 0 || timeOffsetValuePairs.length > 1);

    this.__checkCreateDefaultSequnenceTrack(property);

    this.mActiveSequence.addKey(property, new NumberSequencerKey(absoluteTime, value));

    return this;
  }

  appendKey(property, timeOffset, value, ...timeOffsetValuePairs) {
    this.addKey(property, this.mPosition + timeOffset, value, ...timeOffsetValuePairs);
  }

  // adds script to the script track
  addScript(time, fn, ...payload) {
    this.__checkCreateDefaultSequnenceTrack('script');

    this.mActiveSequence.addKey(property, new ScriptSequencerKey(absoluteTime, fn, ...payload));
    return this;
  }

  addMessage(absoluteTime, message, ...payload) {
    let track = this.__checkCreateDefaultSequnenceTrack('message');

    this.mActiveSequence.addKey(property, new MessageSequencerKey(absoluteTime, message, ...payload));
    return this;
  }

  seek(absoluteTime) {
    Debug.isNumber(absoluteTime);
    Debug.assert(absoluteTime > 0, 'Time cannot be negative.');

    // TODO: recalc

    this.mPostion = absoluteTime;
    this.mDirty = true;
    return this;
  }

  __checkCreateDefaultSequnenceTrack(trackName) {
    if (this.mActiveSequence === null) {
      let defaultSequence = this.getSequence('default');

      if (defaultSequence === null) {
        defaultSequence = new Sequence('default');
        this.addSequence(defaultSequence);
      }

      this.mActiveSequence = defaultSequence;
    }

    if (this.mActiveSequence.getTrack(trackName) === null) {
      let t = new SequencerTrack(trackName);
      this.mActiveSequence.addTrack(t);
    }
  }

  onUpdate(dt) {
    for (var k in this.mSequences)
      this.mSequences[k].update(dt, this.mPosition, this.mDirty);

    this.mPosition += dt;
    this.mDirty = false;
  }

  get activeSequence() {
    return this.mActiveSequence;
  }

  get position() {
    return this.mPosition;
  }

  set position(value) {
    this.seek(value);
  }
}