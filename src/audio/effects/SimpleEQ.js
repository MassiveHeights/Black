/**
 * Equalizer.
 * 
 * @cat audio.effects
 * @extends {SoundEffect}
 */
/* @echo EXPORT */
class SimpleEQ extends SoundEffect {

  /**
   * Creates new instance of equalizer.
   * 
   * @param {...number} frequencies List of frequencies to control sound with.
   */
  constructor(...frequencies) {
    super();

    // default values from winamp
    frequencies = frequencies || [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];

    /** 
     * @private 
     * @type {Array<BiquadFilterNode>} 
     */
    this.mFilters = [];

    for (let i = 0; i < frequencies.length; i++) {
      this.mFilters.push(this.__createFilter(frequencies[i]));
      if (i > 0)
        this.mFilters[i - 1].connect(/** @type {!AudioNode} */ (this.mFilters[i]));
    }

    /** @inheritDoc */
    this.mInputNode = this.mFilters[0];

    /** @inheritDoc */
    this.mOutputNode = this.mFilters[this.mFilters.length - 1];

    // todo: determine correct max value
    /** 
     * @private 
     * @type {number} 
     */
    this.mMaxGainLevel = 16; // 18

    /** 
     * @private 
     * @type {Object.<string, Array<number>>} 
     */
    this.mPresets = {};
  }

  /**
   * @ignore
   * @private
   * @param {number} freq 
   * @returns {BiquadFilterNode}
   */
  __createFilter(freq) {
    let f = MasterAudio.context.createBiquadFilter();
    f.type = 'peaking';
    f.frequency.setValueAtTime(freq, 0);
    f.Q.setValueAtTime(1, 0);
    f.gain.setValueAtTime(0, 0);
    return f;
  }

  /**
   * Sets level by index.
   * 
   * @public
   * @param {number} freqIndex Index of frequency from the list.
   * @param {number} value     Ranging from -1 to 1.
   * @returns {void}
   */
  setLevelByIndex(freqIndex, value) {
    Debug.assert(freqIndex >= 0 && freqIndex < this.mFilters.length, 'Frequency index is out of range');
    if (freqIndex < 0 || freqIndex >= this.mFilters.length)
      return;
    value = MathEx.clamp(value, -1, 1);
    value *= this.mMaxGainLevel;
    this.mFilters[freqIndex].gain.setValueAtTime(value, 0);
  }

  /**
   * Sets level by frequency if there is one in the list.
   * 
   * @public
   * @param {number} freq  Concrete frequency value.
   * @param {number} value Ranging from -1 to 1.
   * @returns {void}
   */
  setLevelByFrequency(freq, value) {
    for (let i = 0; i < this.mFilters.length; i++) {
      if (this.mFilters[i].frequency.value === freq) {
        this.setLevelByIndex(i, value);
      }
    }
  }

  /**
   * Adds new preset of levels.
   * 
   * @public
   * @param {string} name      The name of a preset.
   * @param {...number} values Frequency levels. Their number must be equal to frequencies number.
   * @returns {void}
   */
  addPreset(name, ...values) {
    Debug.assert(values.length != this.mFilters.length, 'Number of preset values must be equal to frequencies number');
    this.mPresets[name] = values;
  }

  /**
   * Saves current levels as new preset with given name.
   * 
   * @public
   * @param {string} name The name of a preset.
   * @returns {void}
   */
  savePreset(name) {
    this.mPresets[name] = [];
    this.mFilters.forEach(x => this.mPresets[name].push(x.frequency.value / this.mMaxGainLevel));
  }

  /**
   * Applies previously added or saved preset.
   * 
   * @public
   * @param {string} name The name of a preset.
   * @returns {void}
   */
  applyPreset(name) {
    if (this.mPresets[name] !== null) {
      for (let i = 0; i < this.mPresets[name].length; i++) {
        this.setLevelByIndex(i, this.mPresets[name][i]);
      }
    }
  }
}