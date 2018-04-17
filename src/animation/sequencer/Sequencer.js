/**
 * Sequncer (BETA).
 * 
 * @beta
 * A timeline based component allowing to animate object properties, post message and listen for callbacks.
 */
/* @echo EXPORT */
class Sequencer extends Component {
  constructor(sequence) {
    super();

    this.mSequence = sequence;
    this.mActiveClip = null;
    this.mActiveClipData = null;

    if (sequence !== null && sequence.constructor === String) {
      this.mSequence = AssetManager.default.getSequence(/** @type {string} */(sequence));
    } else {
      this.mSequence = /** @type {Sequence} */ (sequence);
    }
  }

  seek(absoluteTime) {
    Debug.isNumber(absoluteTime);
    Debug.assert(absoluteTime >= 0, 'Time cannot be negative.');

    this.mPosition = absoluteTime;
    return this;
  }

  play(animationClipName) {
    this.mActiveClip = this.mSequence.getClip(animationClipName);
    this.mActiveClipData = this.mSequence.getClipData(animationClipName);

    if (this.mActiveClip !== null)
      this.reset();
  }

  onAdded() {
    this.reset();
  }

  reset() {
    this.mPosition = 0;
  }

  __applyProps(obj, props) {
    for (let k in props) {
      if (typeof props[k] === 'object') {
        const nextObj = k === 'this' || k === 'self' ? obj : obj[k];
        this.__applyProps(nextObj, props[k]);
      } else if (props[k] !== undefined) {
        obj[k] = props[k];
      }
    }
  }

  onUpdate(dt) {
    if (this.mActiveClip === null)
      return;

    let animationResult = this.mActiveClip.update(dt, this.mPosition - this.mActiveClipData.time, this.mActiveClipData, false);
    this.__applyProps(this.gameObject, animationResult);

    this.mPosition += dt;
  }

  get position() {
    return this.mPosition;
  }

  set position(value) {
    this.seek(value);
  }
}