/**
 * Sound channel
 * 
 * @cat audio
 */
/* @echo EXPORT */
class SoundChannel {
  /**
   * Creates instance of SoundChannel with specific name
   * 
   * @param {string} name The name of the channel.
   */
  constructor(name) {

    /** 
     * @private 
     * @type {string} 
     */
    this.mName = name;

    /** 
     * @private 
     * @type {!GainNode} 
     */
    this.mGain = MasterAudio._newGainNode();

    /** 
     * @private 
     * @type {Array<SoundInstance>} 
     */
    this.mSounds = [];

    /** 
     * @private 
     * @type {Array<SoundEffect>} 
     */
    this.mEffects = [];
  }

  /**
   * Allows the sound to be played on this channel
   * 
   * @public
   * @param {SoundInstance} soundInstance Concrete SoundInstance.
   * @returns {void}
   */
  attachSound(soundInstance) {
    Debug.assert(soundInstance != null, 'Sound cannot be null');

    soundInstance._outputNode.connect(this._inputNode);
    this.mSounds.push(soundInstance);

    soundInstance.on(Message.COMPLETE, () => {
      this.mSounds.splice(this.mSounds.indexOf(soundInstance), 1);
      soundInstance._outputNode.disconnect(0);
    });
  }

  /**
   * Removes given sound instance from this channel
   * 
   * @public
   * @param {SoundInstance} soundInstance Concrete SoundInstance.
   * @returns {void}
   */
  detachSound(soundInstance) {
    Debug.assert(soundInstance != null, 'Sound cannot be null');
    
    let ix = this.mSounds.indexOf(soundInstance);
    if (ix > -1) {
      this.mSounds.splice(ix, 1);
      soundInstance._outputNode.disconnect(0);
    }
  }

  /**
   * Stops all sounds on this channel
   * 
   * @public
   * @returns {void}
   */
  stopAll() {
    for (let snd = this.mSounds[0]; this.mSounds.length; snd = this.mSounds.shift()) {
      snd.stop();
    }
  }

  /**
   * Adds sound effect to this channel
   * 
   * @public
   * @param {SoundEffect} effect SoundEffect instance.
   * @returns {SoundEffect}
   */
  addEffect(effect) {
    Debug.assert(effect != null, 'Effect cannot be null');

    effect._outputNode.connect(this._inputNode);
    this.mEffects.unshift(effect);
    this.__reconnectSounds();
    return effect;
  }

  /**
   * Removes sound effect from this channel
   * 
   * @public
   * @param {SoundEffect} effect SoundEffect instance.
   * @returns {SoundEffect}
   */
  removeEffect(effect) {
    Debug.assert(effect != null, 'Effect cannot be null');

    effect._outputNode.disconnect(0);
    this.mEffects.splice(this.mEffects.indexOf(effect), 1);
    this.__reconnectSounds();
    return effect;
  }

  /**
   * Removes all sound effect from this channel
   * 
   * @public
   * @returns {void}
   */
  removeAllEffects() {
    for (; this.mEffects.length; this.mEffects.shift()) {
      this.mEffects[0]._outputNode.disconnect(0);
    }
    this.__reconnectSounds();
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  __reconnectSounds() {
    this.mSounds.forEach(x => {
      x._outputNode.disconnect(0);
      x._outputNode.connect(this._inputNode);
    });
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set volume(value) {
    this.mGain.gain.setValueAtTime(value, 0);
  }

  /**
   * Gets/Sets the volume for this channel
   * 
   * @public
   * @returns {number}
   */
  get volume() {
    return this.mGain.gain.value;
  }

  /**
   * @ignore
   * @readonly
   * @returns {!AudioNode}
   */
  get _inputNode() {
    return this.mEffects.length ? /** @type {!AudioNode} */ (this.mEffects[0]._inputNode) : this.mGain;
  }

  /**
   * @ignore
   * @readonly
   * @returns {!AudioNode}
   */
  get _outputNode() {
    return this.mGain;
  }
}