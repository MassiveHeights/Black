import { DisplayObject } from "../display/DisplayObject";
import { FloatScatter } from "../scatters/FloatScatter";
import { EmitterState } from "./EmitterState";
import { Matrix } from "../geom/Matrix";
import { EmitterSortOrder } from "./EmitterSortOrder";
import { Debug } from "../core/Debug";
import { Black } from "../Black";
import { Modifier } from "./Modifier";
import { Particle } from "./Particle";
import { Vector } from "../geom/Vector";
import { DirtyFlag } from "../core/DirtyFlag";
import { Message } from "../messages/Message";

// TODO: pretty much the emitter is always dirty and caching should not be applied onto it.
// TODO: q/a every property

/**
 * Particle emitter.
 *
 * @cat particles
 * @extends black-engine~DisplayObject
 */
export class Emitter extends DisplayObject {
  /**
   * Creates new Emitter instance.
   */
  constructor() {
    super();

    /** 
     * @private 
     * @type {Array<black-engine~Texture>} 
     */
    this.mTextures = [];

    /** 
     * @private 
     * @type {Array<black-engine~Particle>} 
     */
    this.mParticles = [];

    /** 
     * @private 
     * @type {Array<black-engine~Particle>} 
     */
    this.mRecycled = [];

    /** 
     * @private 
     * @type {Array<black-engine~Modifier>} 
     */
    this.mInitializers = [];

    /** 
     * @private 
     * @type {Array<black-engine~Modifier>} 
     */
    this.mActions = [];

    /** 
     * @private 
     * @type {black-engine~GameObject} 
     */
    this.mSpace = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsLocal = true;

    /** 
     * @private 
     * @type {number} 
     */
    this.mMaxParticles = 10000;

    /** 
     * @private 
     * @type {black-engine~FloatScatter} 
     */
    this.mEmitCount = new FloatScatter(10);

    /** 
     * @private 
     * @type {black-engine~FloatScatter} 
     */
    this.mEmitNumRepeats = new FloatScatter(0, Number.MAX_SAFE_INTEGER);

    /** 
     * @private 
     * @type {number} 
     */
    this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();

    /** 
     * @private 
     * @type {black-engine~FloatScatter} 
     */
    this.mEmitDuration = new FloatScatter(1 / 60);

    /** 
     * @private 
     * @type {number} 
     */
    this.mEmitDurationLeft = this.mEmitDuration.getValue();

    /** 
     * @private 
     * @type {black-engine~FloatScatter} 
     */
    this.mEmitInterval = new FloatScatter(1 / 60);

    /** 
     * @private 
     * @type {number} 
     */
    this.mEmitIntervalLeft = this.mEmitInterval.getValue();

    /** 
     * @private 
     * @type {black-engine~FloatScatter} 
     */
    this.mEmitDelay = new FloatScatter(1);

    /** 
     * @private 
     * @type {number} 
     */
    this.mEmitDelayLeft = this.mEmitDelay.getValue();

    /** 
     * @private 
     * @type {number} 
     */
    this.mNextUpdateAt = 0;

    /** 
     * @private 
     * @type {black-engine~EmitterState} 
     */
    this.mState = EmitterState.PENDING;

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.__tmpLocal = new Matrix();

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.__tmpWorld = new Matrix();

    /** 
     * @private 
     * @type {black-engine~EmitterSortOrder} 
     */
    this.mSortOrder = EmitterSortOrder.FRONT_TO_BACK;

    /**
     * @private
     * @type {Array<string>|null}
     */
    this.mTextureNames = null;

    /**
     * @private
     * @type {number}
     */
    this.mPresimulateSeconds = 0;

    /**
     * @private
     * @type {number}
     */
    this.mCurrentPresimulationTime = 0;
  }

  /**
   * Starts emitting particles. By default emitter will start emitting automatically.
   */
  play() {
    if (this.mState === EmitterState.EMITTING)
      return;

    // resume or restart
    if (this.mState !== EmitterState.PAUSED) {
      this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();
      this.mEmitDurationLeft = this.mEmitDuration.getValue();
      this.mEmitIntervalLeft = this.mEmitInterval.getValue();
      this.mEmitDelayLeft = this.mEmitDelay.getValue();

      this.mState = EmitterState.PENDING;
    }
  }

  /**
   * Pauses the emitting process.
   */
  pause() {
    this.mState = EmitterState.PAUSED;
  }

  /** 
   * Stops emitting process and destroys all particles.
   */
  stop() {
    this.mParticles = [];
    this.mRecycled = [];

    this.mState = EmitterState.FINISHED;
  }

  /**
   * Simulates current emmitter for a given amount of time (seconds).
   * 
   * @param {number} time Time in secounds
   * @returns {void}
   */
  simulate(time) {
    Debug.isNumber(time);
    Debug.assert(time > 0);

    this.mCurrentPresimulationTime = 0;
    this.mPresimulateSeconds = time;

    while (this.mCurrentPresimulationTime <= this.mPresimulateSeconds) {
      this.onUpdate();
      this.mCurrentPresimulationTime += Black.time.delta;
    }

    this.mPresimulateSeconds = 0;
    this.mCurrentPresimulationTime = 0;
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('Emitter', this);
  }

  /**
   * A helper method for quick adding modifiers.
   *
   * @param {...(black-engine~GameObject|black-engine~Component|black-engine~Modifier)} modifiers The list of modifiers.
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
   * Adds modifier to the end of the list.
   *
   * @param {black-engine~Modifier} modifier Modifier to add.
   * @return {black-engine~Modifier}
   */
  addModifier(modifier) {
    if (modifier.isInitializer)
      this.mInitializers.push(modifier);
    else
      this.mActions.push(modifier);

    return modifier;
  }

  /**
   * Removes given modifier.
   *
   * @param {black-engine~Modifier} modifier Modifier to remove.
   * @return {boolean} True if modifier was removed.
   */
  removeModifier(modifier) {
    let array = this.mActions;

    if (modifier.isInitializer)
      array = this.mInitializers;

    let ix = array.indexOf(modifier);
    if (ix >= 0) {
      array.splice(ix, 1);
      return true;
    }

    return false;
  }

  /**
   * Hacky method which returns time now or presimulation time depending on a case.
   */
  __getTime() {
    return Black.time.now;
  }

  /**
   * Updates delay, duration, interval. Use this function each time you change one of those values.
   *
   * @private
   * @param {number} [dt=0]
   * @return {void}
   */
  updateNextTick(dt = 0) {
    let t = Black.time.now;
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
    if (this.mState === EmitterState.PAUSED)
      return;

    let dt = Black.time.delta;

    // rate logic
    this.updateNextTick(dt);

    if (Black.time.now >= this.mNextUpdateAt && this.mState === EmitterState.EMITTING) {
      this.__create(this.mEmitCount.getValue());
    }

    // main update login
    const alength = this.mActions.length;
    const plength = this.mParticles.length;

    for (let k = 0; k < alength; k++)
      if (this.mActions[k].isActive === true)
        this.mActions[k].preUpdate(dt);

    let particle;

    let i = plength;
    while (i--) {
      particle = this.mParticles[i];

      for (let k = 0; k < alength; k++)
        if (this.mActions[k].isActive === true)
          this.mActions[k].update(this, particle, dt);

      particle.update(dt);

      if (particle.life === 0) {
        this.mRecycled.push(particle);
        this.mParticles.splice(i, 1);
      }
    }

    for (let k = 0; k < alength; k++)
      if (this.mActions[k].isActive === true)
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
      minv = this.mSpace.worldTransformationInverted.clone();
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
        if (this.mInitializers[k].isActive === true)
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
   * Gets current emitter state.
   *
   * @return {black-engine~EmitterState}
   */
  get state() {
    return this.mState;
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
   * @return {black-engine~FloatScatter}
   */
  get emitCount() {
    return this.mEmitCount;
  }

  /**
   * @param {black-engine~FloatScatter} value
   * @return {void}
   */
  set emitCount(value) {
    this.mEmitCount = value;
  }

  /**
   * Gets/Sets the number of "durations" to to repeat.
   *
   * @return {black-engine~FloatScatter}
   */
  get emitNumRepeats() {
    return this.mEmitNumRepeats;
  }

  /**
   * @param {black-engine~FloatScatter} value
   * @return {void}
   */
  set emitNumRepeats(value) {
    this.mEmitNumRepeats = value;
    this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();
  }

  /**
   * Gets/Sets
   *
   * @return {black-engine~FloatScatter}
   */
  get emitDuration() {
    return this.mEmitDuration;
  }

  /**
   * @param {black-engine~FloatScatter} value
   * @return {void}
   */
  set emitDuration(value) {
    this.mEmitDuration = value;
    this.mEmitDurationLeft = this.mEmitDuration.getValue();
  }


  /**
   * Gets/Sets
   *
   * @return {black-engine~FloatScatter}
   */
  get emitInterval() {
    return this.mEmitInterval;
  }

  /**
   * @param {black-engine~FloatScatter} value
   * @return {void}
   */
  set emitInterval(value) {
    this.mEmitInterval = value;
    this.mEmitIntervalLeft = this.mEmitInterval.getValue();
  }


  /**
   * Gets/Sets
   *
   * @return {black-engine~FloatScatter}
   */
  get emitDelay() {
    return this.mEmitDelay;
  }

  /**
   * @param {black-engine~FloatScatter} value
   * @return {void}
   */
  set emitDelay(value) {
    this.mEmitDelay = value;
    this.mEmitDelayLeft = this.mEmitDelay.getValue();
  }


  /**
   * Gets/Sets the space where emitting simulation will happen, ignoring space transformation, so all forces are relative to global.
   *
   * @return {black-engine~GameObject}
   */
  get space() {
    return this.mSpace;
  }

  /**
   * @param {black-engine~GameObject} gameObject
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
   * @return {Array<black-engine~Texture>}
   */
  get textures() {
    return this.mTextures;
  }

  /**
   * @param {Array<black-engine~Texture>} value
   * @return {void}
   */
  set textures(value) {
    this.mTextures = value;

    Debug.assert(!(this.mTextures === null || this.mTextures.length === 0), 'At least one texture must be provided.');

    this.setRenderDirty();
  }

  /**
   * Returns list of textures used by this emitter.
   * @returns {Array<string>}
   */
  get textureNames() {
    return this.mTextureNames;
  }

  /**
    * Sets the list of textures with given string. It uses AssetManager to find textures.
    * 
    * @param {Array<string>} value
    * @return {void}
    */
  set textureNames(value) {
    this.mTextureNames = value;

    this.textures = value.map(x => Black.assets.getTexture(x));
  }

  /**
   * Gets/Sets the order in which particles will be sorted when rendering.
   *
   * @return {black-engine~EmitterSortOrder}
   */
  get sortOrder() {
    return this.mSortOrder;
  }

  /**
   * @param {black-engine~EmitterSortOrder} value
   * @return {void}
   */
  set sortOrder(value) {
    this.mSortOrder = value;
    this.setRenderDirty();
  }
}