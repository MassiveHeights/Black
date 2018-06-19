// TODO: pretty much the emitter is always dirty and caching should not be applied onto it.
// TODO: q/a every property

/**
 * Particle emitter.
 *
 * @cat particles
 * @extends DisplayObject
 */
/* @echo EXPORT */
class Emitter extends DisplayObject {
  /**
   * Creates new Emitter instance.
   */
  constructor() {
    super();

    /** @private @type {Array<Texture>} */
    this.mTextures = null;

    /** @private @type {Array<Particle>} */
    this.mParticles = [];

    /** @private @type {Array<Particle>} */
    this.mRecycled = [];

    /** @private @type {Array<Modifier>} */
    this.mInitializers = [];

    /** @private @type {Array<Modifier>} */
    this.mActions = [];

    /** @private @type {GameObject} */
    this.mSpace = null;

    /** @private @type {boolean} */
    this.mIsLocal = true;

    /** @private @type {number} */
    this.mMaxParticles = 10000;

    /** @private @type {FloatScatter} */
    this.mEmitCount = new FloatScatter(10);

    /** @private @type {FloatScatter} */
    this.mEmitNumRepeats = new FloatScatter(Infinity);

    /** @private @type {number} */
    this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();

    /** @private @type {FloatScatter} */
    this.mEmitDuration = new FloatScatter(1 / 60);

    /** @private @type {number} */
    this.mEmitDurationLeft = this.mEmitDuration.getValue();

    /** @private @type {FloatScatter} */
    this.mEmitInterval = new FloatScatter(1 / 60);

    /** @private @type {number} */
    this.mEmitIntervalLeft = this.mEmitInterval.getValue();

    /** @private @type {FloatScatter} */
    this.mEmitDelay = new FloatScatter(1);

    /** @private @type {number} */
    this.mEmitDelayLeft = this.mEmitDelay.getValue();

    /** @private @type {number} */
    this.mNextUpdateAt = 0;

    /** @private @type {EmitterState} */
    this.mState = EmitterState.PENDING;

    /** @private @type {Matrix} */
    this.__tmpLocal = new Matrix();

    /** @private @type {Matrix} */
    this.__tmpWorld = new Matrix();

    /** @private @type {EmitterSortOrder} */
    this.mSortOrder = EmitterSortOrder.FRONT_TO_BACK;
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('Emitter');
  }

  /**
   * Sets the internal state to `EmitterState.PENDING`. Use this when you need to restart emitting.
   *
   * @returns {void}
   */
  resetState() {
    this.mState = EmitterState.PENDING;
  }

  /**
   * A helper method for quick adding modifiers.
   *
   * @param {...(GameObject|Component|Modifier)} modifiers The list of modifiers.
   * @returns {Emitter}
   */
  add(...modifiers) {
    for (let i = 0; i < modifiers.length; i++) {
      let ai = modifiers[i];

      if (ai instanceof Modifier)
        this.addModifier(ai);
      else
        super.add(ai);
    }
    return this;
  }

  /**
   * Adds Modifier to the end of the list.
   *
   * @param {Modifier} modifier Modifier to add.
   * @return {Modifier}
   */
  addModifier(modifier) {
    if (modifier.isInitializer)
      this.mInitializers.push(modifier);
    else
      this.mActions.push(modifier);

    return modifier;
  }

  /**
   * Updates delay, duration, interval. Use this function each time you change one of those values.
   *
   * @private
   * @param {number} [dt=0]
   * @return {void}
   */
  updateNextTick(dt = 0) {
    let t = Time.now;
    let firstEmit = false;

    if (this.mState === EmitterState.PENDING) {
      this.mNextUpdateAt = t + this.mEmitDelayLeft;
      this.mEmitDelayLeft -= dt;

      if (this.mEmitDelayLeft <= 0) {
        this.mEmitDelayLeft = this.mEmitDelay.getValue();
        this.mState = EmitterState.EMITTING;
        firstEmit = true;
      }
    }

    if (this.mState === EmitterState.EMITTING) {
      if (this.mEmitDurationLeft <= 0) {
        this.mEmitDurationLeft = this.mEmitDuration.getValue();

        this.mEmitNumRepeatsLeft--;

        if (this.mEmitNumRepeatsLeft <= 0) {
          this.mState = EmitterState.FINISHED;

          this.post(Message.COMPLETE);
          return;
        } else {
          this.mState = EmitterState.PENDING;
          return;
        }
      } else {
        // we are getting value here each update to make sure we are up to date!
        if (firstEmit) {
          // for a first emit we do not want to add an extra delay. emit now!
          this.mNextUpdateAt = t;
          this.mEmitIntervalLeft = this.mEmitInterval.getValue();
        }
        else {
          this.mEmitIntervalLeft -= dt;
          this.mNextUpdateAt = t + this.mEmitIntervalLeft;
          //console.log(this.mEmitIntervalLeft);

          // reset interval
          if (this.mEmitIntervalLeft <= 0)
            this.mEmitIntervalLeft = this.mEmitInterval.getValue();
        }
      }

      this.mEmitDurationLeft -= dt;
    }
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    let dt = Time.delta;
    
    // rate logic
    this.updateNextTick(dt);

    if (Time.now >= this.mNextUpdateAt && this.mState === EmitterState.EMITTING)
      this.__create(this.mEmitCount.getValue());

    // main update login
    const alength = this.mActions.length;
    const plength = this.mParticles.length;

    for (let k = 0; k < alength; k++)
      this.mActions[k].preUpdate(dt);

    let particle;

    let i = plength;
    while (i--) {
      particle = this.mParticles[i];

      for (let k = 0; k < alength; k++)
        this.mActions[k].update(this, particle, dt);

      particle.update(dt);

      if (particle.life === 0) {
        this.mRecycled.push(particle);
        this.mParticles.splice(i, 1);
      }
    }

    for (let k = 0; k < alength; k++)
      this.mActions[k].postUpdate(dt);

    // set dummy dirty flag so unchanged frames can be detected
    if (this.mVisible === true && this.mAlpha > 0)
      this.setDirty(DirtyFlag.LOCAL, false);
  }

  /**
   * @ignore
   * @private
   */
  __create(amount) {
    let matrix = this.worldTransformation.clone();
    let minv = null;

    if (this.mIsLocal === false) {
      minv = this.mSpace.worldTransformationInversed.clone();
      matrix.prepend(minv);
    }

    for (let i = 0; i < amount; i++) {
      let p = null;

      if (this.mRecycled.length > 0) {
        p = this.mRecycled.pop();
      } else {
        if (this.mParticles.length >= this.mMaxParticles)
          return;

        p = new Particle();
      }

      p.reset();

      for (let k = 0; k < this.mInitializers.length; k++)
        this.mInitializers[k].update(this, p, 0);

      if (this.mIsLocal === false) {
        matrix.transformXY(p.x, p.y, Vector.__cache);
        p.x = Vector.__cache.x;
        p.y = Vector.__cache.y;
      }

      this.mParticles.push(p);
    }
  }

  /**
   * Gets/Sets The maximum number of particles can be created.
   *
   * @return {number}
   */
  get maxParticles() {
    return this.mMaxParticles;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set maxParticles(value) {
    if (value < 0)
      throw new Error('Bad argument error.');

    this.mMaxParticles = value;
  }

  /**
   * Gets/Sets the number of particles to be emitted per {@link Emitter#emitInterval}
   *
   * @return {FloatScatter}
   */
  get emitCount() {
    return this.mEmitCount;
  }

  /**
   * @ignore
   * @param {FloatScatter} value
   * @return {void}
   */
  set emitCount(value) {
    this.mEmitCount = value;
  }

  /**
   * Gets/Sets the number of "durations" to to repeat. Use `Infinity` to emit particles endlessly.
   *
   * @return {FloatScatter}
   */
  get emitNumRepeats() {
    return this.mEmitNumRepeats;
  }

  /**
   * @ignore
   * @param {FloatScatter} value
   * @return {void}
   */
  set emitNumRepeats(value) {
    this.mEmitNumRepeats = value;
    this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();
  }

  /**
   * Gets/Sets
   *
   * @return {FloatScatter}
   */
  get emitDuration() {
    return this.mEmitDuration;
  }

  /**
   * @ignore
   * @param {FloatScatter} value
   * @return {void}
   */
  set emitDuration(value) {
    this.mEmitDuration = value;
    this.mEmitDurationLeft = this.mEmitDuration.getValue();
  }


  /**
   * Gets/Sets
   *
   * @return {FloatScatter}
   */
  get emitInterval() {
    return this.mEmitInterval;
  }

  /**
   * @ignore
   * @param {FloatScatter} value
   * @return {void}
   */
  set emitInterval(value) {
    this.mEmitInterval = value;
    this.mEmitIntervalLeft = this.mEmitInterval.getValue();
  }


  /**
   * Gets/Sets
   *
   * @return {FloatScatter}
   */
  get emitDelay() {
    return this.mEmitDelay;
  }

  /**
   * @ignore
   * @param {FloatScatter} value
   * @return {void}
   */
  set emitDelay(value) {
    this.mEmitDelay = value;
    this.mEmitDelayLeft = this.mEmitDelay.getValue();
  }


  /**
   * Gets/Sets the space where emitting simulation will happen, ignoring space transformation, so all forces are relative to global.
   *
   * @return {GameObject}
   */
  get space() {
    return this.mSpace;
  }

  /**
   * @ignore
   * @param {GameObject} gameObject
   * @return {void}
   */
  set space(gameObject) {
    this.mSpace = gameObject;
    this.mIsLocal = this.mSpace === null || this.mSpace === this;
    this.setRenderDirty();
  }

  /**
   * Gets/Sets a list of textures to use.
   *
   * @return {Array<Texture>}
   */
  get textures() {
    return this.mTextures;
  }

  /**
   * @ignore
   * @param {Array<Texture>} value
   * @return {void}
   */
  set textures(value) {
    this.mTextures = value;

    Debug.assert(!(this.mTextures === null || this.mTextures.length === 0), 'At least one texture must be provided.');

    this.setRenderDirty();
  }

   /**
   * Sets the list of textures with given string. It uses AssetManager to find textures. Wildcard supported.
   * 
   * @param {string} value
   * @return {void}
   */
  set texturesName(value) {
    this.textures = AssetManager.default.getTextures(value);
  }

  /**
   * Gets/Sets the order in which particles will be sorted when rendering.
   *
   * @return {EmitterSortOrder}
   */
  get sortOrder() {
    return this.mSortOrder;
  }

  /**
   * @ignore
   * @param {EmitterSortOrder} value
   * @return {void}
   */
  set sortOrder(value) {
    this.mSortOrder = value;
    this.setRenderDirty();
  }
}