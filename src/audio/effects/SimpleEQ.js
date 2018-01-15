/* @echo EXPORT */
class SimpleEQ extends SoundEffect {
  constructor(...frequencies) {
    super();

    // default values from winamp
    frequencies = frequencies || [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];

    this.mFilters = [];

    for (let i = 0; i < frequencies.length; i++) {
      this.mFilters.push(this.createFilter(frequencies[i]));
      if (i > 0)
        this.mFilters[i - 1].connect(this.mFilters[i]);
    }

    this.mInputNode = this.mFilters[0];
    this.mOutputNode = this.mFilters[this.mFilters.length - 1];

    // todo: determine correct max value
    this.mMaxGainLevel = 16; // 18

    this.mPresets = {};
  }

  createFilter(freq) {
    let f = Audio.context.createBiquadFilter();
    f.type = 'peaking';
    f.frequency.setValueAtTime(freq, 0);
    f.Q.setValueAtTime(1, 0);
    f.gain.setValueAtTime(0, 0);
    return f;
  }

  setLevelByIndex(freqIndex, value) {
    value = MathEx.clamp(value, -1, 1);
    value *= this.mMaxGainLevel;
    this.mFilters[freqIndex].gain.setValueAtTime(value, 0);
  }

  setLevelByFrequency(freq, value) {
    for (let i = 0; i < this.mFilters.length; i++) {
      if (this.mFilters[i].frequency.value === freq) {
        this.setLevelByIndex(i, value);
      }
    }
  }

  // setLevelCurve(curve) {

  // }

  addPreset(name, ...values) {
    this.mPresets[name] = values;
  }

  savePreset(name) {
    this.mPresets[name] = [];
    this.mFilters.forEach(x => this.mPresets[name].push(x.frequency.value));
  }

  applyPreset(name) {
    if (this.mPresets[name] !== null) {
      for (let i in this.mPresets[name]) {
        this.setValue(i, this.mPresets[name][i]);
      }
    }
  }
}