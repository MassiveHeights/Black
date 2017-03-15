/* @echo EXPORT */
class Emitter extends DisplayObject {
  constructor() {
    super();

    /** @type {Array<Texture>} */
    this.mTextures = null;

    /** @type {Array<Particle>} */
    this.mParticles = [];

    /** @type {Array<Particle>} */
    this.mRecycled = [];

    /** @type {Array<Initializer>} */
    this.mInitializers = [];

    /** @type {Array<Action>} */
    this.mActions = [];

    /** @type {GameObject} */
    this.mSpace = null;

    /** @type {boolean} */
    this.mIsLocal = true;

    /** @type {number} */
    this.mMaxParticles = 10000;

    /** @type {FloatScatter} */
    this.mEmitCount = new FloatScatter(10);

    /** @type {FloatScatter} */
    this.mEmitNumRepeats = new FloatScatter(10);

    /** @type {number} */
    this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();

    /** @type {FloatScatter} */
    this.mEmitDuration = new FloatScatter(1);

    /** @type {number} */
    this.mEmitDurationLeft = this.mEmitDuration.getValue();

    /** @type {FloatScatter} */
    this.mEmitInterval = new FloatScatter(0.1);

    /** @type {number} */
    this.mEmitIntervalLeft = this.mEmitInterval.getValue();

    /** @type {FloatScatter} */
    this.mEmitDelay = new FloatScatter(1);

    /** @type {number} */
    this.mEmitDelayLeft = this.mEmitDelay.getValue();

    /** @type {number} */
    this.mNextUpdateAt = 0;

    /** @type {EmitterState} */
    this.mState = EmitterState.PENDING;

    // /** @type {function(a:Particle, b:Particle):number} */
    // this.mComparer = null;

    /** @type {Matrix} */
    this.__tmpLocal = new Matrix();

    /** @type {Matrix} */
    this.__tmpWorld = new Matrix();
  }

  // reset() {
  //   this.mState = 0;
  //
  //   // todo: reset simulation
  //   // todo: clear all particles
  //   this.updateNextTick(0);
  // }

  resetState() {
    this.mState = EmitterState.PENDING;
  }

  /**
   * updateNextTick - Updates delay, duration, interval. Use this function each time you change one of those values.
   *
   * @param {number} [dt=0]
   *
   * @return {void}
   */
  updateNextTick(dt = 0) {
    let t = Black.instance.uptime;
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

          this.sendMessage('complete');
          return;
        } else {
          this.mState = EmitterState.PENDING;
          return;
        }
      } else {
        // we are getting value here each update to make sure we are up to date!
        if (firstEmit) {
          // for a first emit we do not want to add an extra delay. emit now!
          this.mNextUpdateAt = t
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
   * addInitializer - Adds Initializer to the end of the list.
   *
   * @param {Initializer} initializer
   *
   * @return {Initializer}
   */
  addInitializer(initializer) {
    this.mInitializers.push(initializer);
    return initializer;
  }


  /**
   * addAction - Adds action to the end of the list.
   *
   * @param {Action} action
   *
   * @return {Action}
   */
  addAction(action) {
    this.mActions.push(action);
    return action;
  }

  __render(video, time, parentAlpha, parentBlendMode) {
    video.save(this);

    // set blend mode
    let tmpBlendMode = BlendMode.AUTO;
    video.globalBlendMode = tmpBlendMode = this.blendMode === BlendMode.AUTO ? parentBlendMode : this.blendMode;

    // tmp matrices
    let localTransform = this.__tmpLocal;
    let worldTransform = this.__tmpWorld;
    localTransform.identity();

    let texture = null;

    if (this.mTextures.length > 0) {
      let plength = this.mParticles.length;
      let particle;
      for (let i = 0; i < plength; i++) {
      //for (let i = plength - 1; i > 0; i--) {
        particle = this.mParticles[i];
        texture = this.mTextures[particle.textureIndex];

        let tw = texture.width * 0.5;
        let th = texture.height * 0.5;

        if (particle.r === 0) {
          let tx = particle.x - tw * particle.scale;
          let ty = particle.y - th * particle.scale;
          localTransform.set(particle.scale, 0, 0, particle.scale, tx, ty);
        } else {
          let cos = Math.cos(particle.r);
          let sin = Math.sin(particle.r);
          let a = particle.scale * cos;
          let b = particle.scale * sin;
          let c = particle.scale * -sin;
          let d = particle.scale * cos;

          let tx = particle.x - tw * a - th * c;
          let ty = particle.y - tw * b - th * d;
          localTransform.set(a, b, c, d, tx, ty);
        }

        if (this.mIsLocal === true) {
          worldTransform.identity();
          worldTransform.copyFrom(localTransform);
          worldTransform.prepend(this.worldTransformation);
        } else {
          this.mSpace.worldTransformation.copyTo(worldTransform);
          worldTransform.append(localTransform);
        }

        video.setTransform(worldTransform);
        video.globalAlpha = parentAlpha * this.mAlpha * particle.alpha;
        video.drawImage(texture);
      }
    }

    video.restore();
    super.__render(video, time, parentAlpha, parentBlendMode);
  }

  onUpdate(dt) {
    // rate logic
    this.updateNextTick(dt);

    if (Black.instance.uptime >= this.mNextUpdateAt && this.mState === EmitterState.EMITTING)
      this.__create(this.mEmitCount.getValue());

    // main update login
    let alength = this.mActions.length;
    let plength = this.mParticles.length;

    let t = Black.instance.uptime;

    for (let i = 0; i < alength; i++)
      this.mActions[i].preUpdate(dt, t);

    let particle;

    let i = this.mParticles.length;
    while (i--) {
      particle = this.mParticles[i];

      for (let k = 0; k < alength; k++)
        this.mActions[k].update(this, particle, dt, t);

      particle.update(dt);

      if (particle.life === 0) {
        this.mRecycled.push(particle);
        this.mParticles.splice(i, 1);
      }
    }

    for (let j = 0; j < alength; j++)
      this.mActions[j].postUpdate(dt, t);
  }

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

      for (let k = 0; k < this.mInitializers.length; k++) {
        let initer = this.mInitializers[k];
        initer.initialize(p);
      }

      if (this.mIsLocal === false) {
        matrix.transformDirectionXY(p.ax, p.ay, Vector.__cache);
        p.ax = Vector.__cache.x;
        p.ay = Vector.__cache.y;

        matrix.transformDirectionXY(p.vx, p.vy, Vector.__cache);
        p.vx = Vector.__cache.x;
        p.vy = Vector.__cache.y;

        matrix.transformXY(p.x, p.y, Vector.__cache);
        p.x = Vector.__cache.x;
        p.y = Vector.__cache.y;
      }

      this.mParticles.push(p);
    }
  }


  /**
   * maxParticles
   *
   * @return {number}
   */
  get maxParticles() {
    return this.mMaxParticles;
  }


  /**
   * maxParticles
   *
   * @param {number} value
   *
   * @return {void}
   */
  set maxParticles(value) {
    if (value < 0)
      throw new Error('Bad argument error.');

    this.mMaxParticles = value;
  }


  /**
   * emitCount
   *
   * @return {FloatScatter}
   */
  get emitCount() {
    return this.mEmitCount;
  }


  /**
   * emitCount
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitCount(value) {
    this.mEmitCount = value;
  }


  /**
   * emitNumRepeats
   *
   * @return {FloatScatter}
   */
  get emitNumRepeats() { return this.mEmitNumRepeats; }

  /**
   * emitNumRepeats
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitNumRepeats(value) { this.mEmitNumRepeats = value; this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue(); }


  /**
   * emitDuration
   *
   * @return {FloatScatter}
   */
  get emitDuration() { return this.mEmitDuration; }

  /**
   * emitDuration
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitDuration(value) { this.mEmitDuration = value; this.mEmitDurationLeft = this.mEmitDuration.getValue(); }


  /**
   * emitInterval
   *
   * @return {FloatScatter}
   */
  get emitInterval() { return this.mEmitInterval; }

  /**
   * emitInterval
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitInterval(value) { this.mEmitInterval = value; this.mEmitIntervalLeft = this.mEmitInterval.getValue(); }


  /**
   * emitDelay
   *
   * @return {FloatScatter}
   */
  get emitDelay() { return this.mEmitDelay; }

  /**
   * emitDelay
   *
   * @param {FloatScatter} value
   *
   * @return {void}
   */
  set emitDelay(value) { this.mEmitDelay = value; this.mEmitDelayLeft = this.mEmitDelay.getValue(); }


  /**
   * space
   *
   * @return {GameObject}
   */
  get space() { return this.mSpace; }

  /**
   * space
   *
   * @param {GameObject} gameObject
   *
   * @return {void}
   */
  set space(gameObject) {
    this.mSpace = gameObject;
    this.mIsLocal = this.mSpace === null || this.mSpace === this;
  }


  /**
   * textures
   *
   * @return {Array<Texture>}
   */
  get textures() {
    return this.mTextures;
  }


  /**
   * textures
   *
   * @param {Array<Texture>} value
   *
   * @return {void}
   */
  set textures(value) {
    if (value.length === 0)
      throw new Error('At least one texture must be provided.');

    this.mTextures = value;
  }
}
