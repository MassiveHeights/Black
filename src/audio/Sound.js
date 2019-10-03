import { Component } from "../core/Component";
import { SoundClip } from "./SoundClip";
import { SoundInstance } from "./SoundInstance";
import { MessageBinding } from "../messages/MessageBinding";
import { Black } from "../Black";
import { Vector } from "../geom/Vector";
import { Message } from "../messages/Message";

/**
 * The sound component.
 * 
 * @cat audio
 * @extends {black-engine~Component}
 */
export class Sound extends Component {
  /**
   * Creates new instance of SoundComponent.
   * 
   * @param {string} name                    The name of sound. Uses Black.assets only.
   * @param {string=} [channel='master']     The name of channel, to play sound on.
   * @param {boolean=} [spatialEffect=false] Specifies if spatial effect is enabled.
   * @param {number=} [rolloff=100]          Determines how far from the listener the volume reduces.
   */
  constructor(name, channel = 'master', spatialEffect = false, rolloff = 100) {
    super();

    /** 
     * @private 
     * @type {black-engine~SoundClip} 
     */
    this.mSoundClip = Black.assets.getSound(name);

    /** 
     * @private 
     * @type {number} 
     */
    this.mRolloff = rolloff;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mPlayOnAdded = true;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mStopOnRemove = true;

    /** 
     * @private 
     * @type {black-engine~SoundInstance} 
     */
    this.mSoundInstance = null;

    /** 
     * @private 
     * @type {black-engine~MessageBinding|null}  
     */
    this.mCompleteBinding = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mSpatialEffect = spatialEffect;

    /** 
     * @private 
     * @type {string} 
     */
    this.mChannelName = channel;
  }

  /**
   * Starts playing sound.
   * 
   * @public
   * @param {number=} [volume=1]         The volume level.
   * @param {boolean=} [loop=false]      Specifies if sound repeats infinite times.
   * @param {boolean=} [overwrite=false] If true, stops previously started sound, if there is one.
   * @returns {black-engine~SoundInstance}            Newly created sound instance or already playing sound.
   */
  play(volume = 1, loop = false, overwrite = false) {
    overwrite && this.mSoundInstance && this.stop();
    if (!this.mSoundInstance || overwrite) {
      this.mSoundInstance = this.mSoundClip.play(this.mChannelName, volume, loop);
      this.mCompleteBinding = this.mSoundInstance.on(Message.COMPLETE, this.__onSoundComplete, this);
      this.spatialEffect = this.mSpatialEffect;
    }
    return this.mSoundInstance;
  }

  /**
   * Stops current sound instance if there is playing one.
   * 
   * @public
   * @returns {void}
   */
  stop() {
    if (this.mSoundInstance) {
      this.mCompleteBinding.off();
      this.mSoundInstance.stop();
      this.mSoundInstance = null;
    }
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  __onSoundComplete() {
    this.mSoundInstance = null;
  }

  /**
   * @inheritDoc
   */
  onAdded(gameObject) {
    if (this.mPlayOnAdded) {
      this.play();
    }
  }

  /**
   * @inheritDoc
   */
  onRemoved(gameObject) {
    if (this.mStopOnRemove && this.mSoundInstance) {
      this.mSoundInstance.stop();
    }
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    if (this.mSpatialEffect && this.mSoundInstance != null && this.mSoundInstance.isPlaying === true) {
      const stage = Black.stage;
      const pos = this.gameObject.localToGlobal(stage.globalToLocal(new Vector(this.gameObject.pivotX, this.gameObject.pivotY)));
      const px = (pos.x - stage.centerX) / stage.width * 2;
      const py = (pos.y - stage.centerY) / stage.height * 2;

      this.mSoundInstance.mSpatialPanner.setPosition(px, py, 0);
    }
  }

  /**

   * @param {boolean} value
   * @return {void}
   */
  set playOnAdded(value) {
    this.mPlayOnAdded = value;
  }

  /**
   * Gets/Sets whether the sound should start playing when added to stage. Default value is true.
   * 
   * @return {boolean}
   */
  get playOnAdded() {
    return this.mPlayOnAdded;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set stopOnRemove(value) {
    this.mStopOnRemove = value;
  }

  /**
   * Sets/Gets whether the sound should be stopped if the owner GameObject is being removed form the stage. Default value is true.
   *
   * @return {boolean}
   */
  get stopOnRemove() {
    return this.mStopOnRemove;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set spatialEffect(value) {
    this.mSpatialEffect = value;

    if (value && this.mSoundInstance != null && this.mSoundInstance.isPlaying === true) {
      let p = this.mSoundInstance.enableSpacePan();
      p.rolloffFactor = this.mRolloff;
      p.refDistance = 1;
      p.distanceModel = 'inverse';
    }
  }

  /**
   * Sets/Gets whether the sound should have spatial effect. Default value is false.
   *
   * @return {boolean}
   */
  get spatialEffect() {
    return this.mSpatialEffect;
  }
}