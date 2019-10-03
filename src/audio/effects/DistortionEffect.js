import { SoundEffect } from "../SoundEffect";
import { Black } from "../../Black";
import { MathEx } from "../../math/MathEx";

/**
 * Distortion sound effect.
 * 
 * @cat audio.effects
 * @extends {black-engine~SoundEffect}
 */
export class DistortionEffect extends SoundEffect {

  /**
   * Creates new instance of DistortionEffect
   * 
   * @param {number} value Level of distortion.
   */
  constructor(value = 0.5) {
    super();

    /** 
     * @private 
     * @type {WaveShaperNode} 
     */
    this.mWaveShaperNode = Black.audio.context.createWaveShaper();

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mInputNode = this.mWaveShaperNode;

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mOutputNode = this.mWaveShaperNode;

    /** 
     * @private 
     * @type {number} 
     */
    this.mSamples = 44100;

    /** 
     * @private 
     * @type {Float32Array} 
     */
    this.mCurve = new Float32Array(this.mSamples);

    /** 
     * @private 
     * @type {number}
     */
    this.mValue = value;

    this.distortion = value;
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set distortion(value) {
    this.mValue = MathEx.clamp(value, 0, 1);
    this.__makeDistortionCurve(this.mValue, this.mSamples, this.mCurve);
    this.mWaveShaperNode.curve = this.mCurve;
  }

  /**
   * Gets/Sets level of distortion
   * 
   * @public
   * @returns {number}
   */
  get distortion() {
    return this.mValue;
  }

  // https://stackoverflow.com/a/22313408
  /**
   * @ignore
   * @private
   * @param {number} amount 
   * @param {number} n_samples 
   * @param {Float32Array} curve 
   * @returns {Float32Array}
   */
  __makeDistortionCurve(amount, n_samples, curve) {
    let k = ~~(amount * 100);
    let deg = Math.PI / 180;
    let x = 0;
    for (let i = 0; i < n_samples; ++i) {
      x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
  };

  // tuna.js

//   makeDistortionCurve2(amount, n_samples, curve) {
//     amount = Math.min(amount, 0.9999);
//     let k = 2 * amount / (1 - amount),
//         i, x;
//     for (i = 0; i < n_samples; i++) {
//         x = i * 2 / n_samples - 1;
//         curve[i] = (1 + k) * x / (1 + k * Math.abs(x));
//     }
//   }

//   makeDistortionCurve3(amount, n_samples, curve) {
//     let i, x, y;
//     for (i = 0; i < n_samples; i++) {
//         x = i * 2 / n_samples - 1;
//         y = ((0.5 * Math.pow((x + 1.4), 2)) - 1) * y >= 0 ? 5.8 : 1.2;
//         curve[i] = tanh(y);
//     }
//   }

//   makeDistortionCurve4(amount, n_samples, curve) {
//     let i, x, y, a = 1 - amount;
//     for (i = 0; i < n_samples; i++) {
//         x = i * 2 / n_samples - 1;
//         y = x < 0 ? -Math.pow(Math.abs(x), a + 0.04) : Math.pow(x, a);
//         curve[i] = tanh(y * 2);
//     }
//   }

//   // is it working?
//   makeDistortionCurve5(amount, n_samples, curve) {
//     let i, x, y, abx, a = 1 - amount > 0.99 ? 0.99 : 1 - amount;
//     for (i = 0; i < n_samples; i++) {
//         x = i * 2 / n_samples - 1;
//         abx = Math.abs(x);
//         if (abx < a) y = abx;
//         else if (abx > a) y = a + (abx - a) / (1 + Math.pow((abx - a) / (1 - a), 2));
//         else if (abx > 1) y = abx;
//         curve[i] = sign(x) * y * (1 / ((a + 1) / 2));
//     }
//   }

//   makeDistortionCurve6(amount, n_samples, curve) {
//     let i, x;
//     for (i = 0; i < n_samples; i++) {
//         x = i * 2 / n_samples - 1;
//         if (x < -0.08905) {
//             curve[i] = (-3 / 4) * (1 - (Math.pow((1 - (Math.abs(x) - 0.032857)), 12)) + (1 / 3) * (Math.abs(x) - 0.032847)) + 0.01;
//         } else if (x >= -0.08905 && x < 0.320018) {
//             curve[i] = (-6.153 * (x * x)) + 3.9375 * x;
//         } else {
//             curve[i] = 0.630035;
//         }
//     }
//   }

//   // is it working?
//   makeDistortionCurve7(amount, n_samples, curve) {
//     let a = 2 + Math.round(amount * 14),
//     bits = Math.round(Math.pow(2, a - 1)),
//     i, x;
//     for (i = 0; i < n_samples; i++) {
//         x = i * 2 / n_samples - 1;
//         curve[i] = Math.round(x * bits) / bits;
//     }
//   }
}

// function sign(x) {
//   if (x === 0) {
//       return 1;
//   } else {
//       return Math.abs(x) / x;
//   }
// }

// function tanh(n) {
//   return (Math.exp(n) - Math.exp(-n)) / (Math.exp(n) + Math.exp(-n));
// }