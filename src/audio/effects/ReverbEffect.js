import { SoundEffect } from "../SoundEffect";
import { MathEx } from "../../math/MathEx";
import { Black } from "../../Black";

/**
 * Reverberation sound effect.
 * 
 * @cat audio.effects
 * @extends {black-engine~SoundEffect}
 */
export class ReverbEffect extends SoundEffect {
  /**
   * Creates instance of ReverbEffect.
   * 
   * @param {AudioBuffer} IRBuffer Impulse Response audio buffer.
   */
  constructor(IRBuffer) {
    super();

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mInputNode = Black.audio._newGainNode();

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mOutputNode = Black.audio._newGainNode();

    /** 
     * @private 
     * @type {ConvolverNode} 
     */
    this.mConvolver = Black.audio.context.createConvolver();

    /** 
     * @private 
     * @type {GainNode} 
     */
    this.mDry = Black.audio._newGainNode();

    /** 
     * @private 
     * @type {GainNode} 
     */
    this.mWet = Black.audio._newGainNode();

    /** 
     * @private 
     * @type {BiquadFilterNode} 
     */
    this.mTone = Black.audio.context.createBiquadFilter();

    this.mConvolver.buffer = IRBuffer;

    this.mInputNode.connect(this.mDry);
    this.mDry.connect(this.mOutputNode);

    this.mInputNode.connect(this.mTone);
    this.mTone.connect(this.mConvolver);
    this.mConvolver.connect(this.mWet);
    this.mWet.connect(this.mOutputNode);

    this.mDry.gain.setValueAtTime(1, 0);
    this.mWet.gain.setValueAtTime(0, 0);
    this.mTone.type = 'lowpass';
    this.mTone.frequency.setValueAtTime(350, 0);
    this.mTone.Q.setValueAtTime(Math.SQRT1_2, 0);
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set wet(value) {
    value = MathEx.clamp(value, 0, 1);
    this.mWet.gain.setValueAtTime(value, 0);
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set dry(value) {
    value = MathEx.clamp(value, 0, 1);
    this.mDry.gain.setValueAtTime(value, 0);
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set tone(value) {
    value = MathEx.clamp(value, 10, Black.audio.context.sampleRate / 2);
    this.mTone.frequency.setValueAtTime(value, 0);
  }

  /**
   * Gets/Sets level of convolved sound.
   * 
   * @public
   * @returns {number}
   */
  get wet() {
    return this.mWet.gain.value;
  }

  /**
   * Gets/Sets level of original sound with no effect.
   * 
   * @public
   * @returns {number}
   */
  get dry() {
    return this.mDry.gain.value;
  }

  /**
   * Gets/Sets frequency effect is applied on.
   * 
   * @public
   * @returns {number}
   */
  get tone() {
    return this.mTone.frequency.value;
  }
}