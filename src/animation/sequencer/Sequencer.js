class SequencerSugar {
  constructor(property) {

  }

  key() {
    return this;
  }

  at(time, value) {
    return this;
  }

  then(property) {
    return this;
  }

  script() {

  }

  post() {

  }


}

/**
 * Sequncer (BETA).
 * 
 * A timeline based component allowing to animate object properties, post message and listen for callbacks.
 */
/* @echo EXPORT */
class Sequencer extends Component {
  constructor() {
    super();

    this.mSequences = {};

    this.mActiveSequence = null;
    this.mActiveProperty = null;
    this.mActiveKey = null;

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
   * @param {number} value 
   * @param {function(t:number):number} ease Easing function to use.
   * @returns {Sequencer}
   */
  addKey(property, value, ease = Ease.smootherStep) {
    return this.__addKey(property, this.mPosition, value, ease);
  }

  __addKey(property, absoluteTime, value, ease) {
    Debug.isNumber(value);

    if (property.indexOf('.') !== -1) {

    } else {

    }

    this.__checkCreateDefaultSequnenceTrack(property);

    this.mActiveKey = this.mActiveSequence.addKey(property, new NumberSequencerKey(absoluteTime, value, ease));
    this.mActiveProperty = property;
    return this;
  }

  appendKey(timeOffset, value, ease = Ease.smootherStep) {
    Debug.assert(this.mActiveProperty !== null, 'Use addKey first.');
    Debug.assert(this.mActiveKey !== null, 'Use addKey first.');

    return this.__addKey(this.mActiveProperty, this.mActiveKey.time + timeOffset, value, ease);
  }

  appendEmpty(timeOffset) {
    Debug.assert(this.mActiveProperty !== null, 'Use addKey first.');
    Debug.assert(this.mActiveKey !== null, 'Use addKey first.');

    return this.__addKey(this.mActiveProperty, this.mActiveKey.time + timeOffset, this.mActiveKey.value, Ease.linear);
  }

  // adds script to the script track
  addScript(time, fn, ...payload) {
    this.__checkCreateDefaultSequnenceTrack('script');

    this.mActiveSequence.addKey(property, new ScriptSequencerKey(absoluteTime, fn, ...payload));
    return this;
  }

  addMessage(timeOffset, message, ...payload) {
    let track = this.__checkCreateDefaultSequnenceTrack('message');

    track.addKey(new MessageSequencerKey(this.mActiveKey.time + timeOffset, message, ...payload));
    return this;
  }

  seek(absoluteTime) {
    Debug.isNumber(absoluteTime);
    Debug.assert(absoluteTime >= 0, 'Time cannot be negative.');

    // TODO: recalc

    this.mPosition = absoluteTime;
    this.mDirty = true;
    return this;
  }

  for(property) {
    return new SequencerSugar(property);
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

    let track = this.mActiveSequence.getTrack(trackName);
    if (track === null) {
      track = new SequencerTrack(trackName);
      this.mActiveSequence.addTrack(track);
    }

    return track;
  }

  onAdded() {
    this.mPosition = 0;
  }

  onUpdate(dt) {
    for (var k in this.mSequences)
      this.mSequences[k].update(dt, this.gameObject, this.mPosition, this.mDirty);

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