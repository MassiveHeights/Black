/* @echo EXPORT */
class Sound extends Component {
  constructor(name, channel = null, spatialEffect = false, rolloff = 100) {
    super();
    this.mSoundClip = AssetManager.default.getSound(name);
    this.mRolloff = rolloff;
    this.mPlayOnAdded = true;
    this.mStopOnRemove = true;
    this.mSoundClip.channel = channel;
    this.mSoundInstance = null;
    this.mSpatialEffect = spatialEffect;
  }

  play(volume = 1, loop = false, overwrite = false) {
    overwrite && this.mSoundInstance && this.stop();
    if (!this.mSoundInstance || overwrite) {
      let i = this.mSoundClip.play(null, volume, loop);
      if (this.mSpatialEffect === true) {
        let p = i.enableSpacePan();
        p.rolloffFactor = this.mRolloff;
        p.refDistance = 1;
        p.distanceModel = 'inverse';
      }
      i.on('complete', this.__onSoundComplete, this);
      this.mSoundInstance = i;
    }
    return this.mSoundInstance;
  }

  stop() {
    if (this.mSoundInstance) {
      this.mSoundInstance.off('complete', this.__onSoundComplete, this);
      this.mSoundInstance.stop();
      this.mSoundInstance = null;
    }
  }

  __onSoundComplete() {
    this.mSoundInstance = null;
  }

  onAdded(gameObject) {
    if (this.mPlayOnAdded) {
      this.play();
    }
  }

  onRemoved(gameObject) {
    if (this.mStopOnRemove && this.mSoundInstance) {
      this.mSoundInstance.stop();
    }
  }

  onPostUpdate(dt) {
    if (this.s && this.s.mIsPlaying) {
      let stage = Black.stage;
      let pos = this.gameObject.localToGlobal(stage.globalToLocal(new Vector(this.gameObject.pivotX, this.gameObject.pivotY)));
      let px = (pos.x - stage.centerX) / stage.width * 2;
      let py = (pos.y - stage.centerY) / stage.height * 2;
      this.s.mSpatialPanner.setPosition(px, py, 0);
    }
  }

  set playOnAdded(value) {
    this.mPlayOnAdded = value;
  }

  get playOnAdded() {
    return this.mPlayOnAdded;
  }

  set stopOnRemove(value) {
    this.mStopOnRemove = value;
  }

  get stopOnRemove() {
    return this.mStopOnRemove;
  }

  set spatialEffect(value) {
    this.mSpatialEffect = value;
  }

  get spatialEffect() {
    return this.mSpatialEffect;
  }
}




/* @echo EXPORT */
class SoundListener extends Component {
  constructor(name) {
    super();
  }

  onRemoved(gameObject) {
    this.loose();
  }

  listen() {
    Audio.currentListener = this;
  }

  loose() {
    Audio.looseListener();
  }

  onPostUpdate(dt) {
    if (Audio.currentListener === this) {
      let stage = Black.stage;
      let pos = this.gameObject.localToGlobal(stage.globalToLocal(new Vector(this.gameObject.pivotX, this.gameObject.pivotY)));
      let px = (pos.x - stage.centerX) / stage.width * 2;
      let py = (pos.y - stage.centerY) / stage.height * 2;
      Audio.context.listener.setPosition(px, py, 1);
    }
  }
}