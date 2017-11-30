/**
 * Esoteric Software SPINE wrapper for Black Engine
 *
 * @cat core
 * @unrestricted
 * @extends GameObject
 */
/* @echo EXPORT */
class Spine extends GameObject {
  /**
   * Creates new instance of Spine.
   */
   constructor(name) {
    super();

    this.mData = AssetManager.default.getSpine(name);

    this.mSkeleton = spine.Skeleton(this.mData);
    this.mSkeleton.updateWorldTransform();

    this.mStateData = new spine.AnimationStateData(this.mData);

    this.mState = new spine.AnimationState(this.mStateData);

    this.mSlotContainers = [];

    this.mTempClipContainers = [];

    for (let i = 0, len = this.mSkeleton.slots.length; i < len; i++) {
      let slot = this.mSkeleton.slots[i];
      let attachment = slot.attachment;
      let slotContainer = new GameObject();
      this.mSlotContainers.push(slotContainer);
      this.addChild(slotContainer);
      this.mTempClipContainers.push(null);

      if (attachment instanceof spine.RegionAttachment) {
        let spriteName = attachment.region.name;
        let sprite = this._createSprite(slot, attachment, spriteName);
        slot.currentSprite = sprite;
        slot.currentSpriteName = spriteName;
        slotContainer.addChild(sprite);
      } else {
        continue;
      }
    }
  }

  _createSprite(slot, attachment, name) {
    let region = attachment.region;
    if (slot.tempAttachment === attachment) {
      region = slot.tempRegion;
      slot.tempAttachment = null;
      slot.tempRegion = null;
    }
    let sprite = new Sprite(name);
    sprite.x = attachment.y;
    sprite.y = attachment.y;
    sprite.rotation = attachment.rotation * core.MathUtils.degRad;
    sprite.alignPivot();
    sprite.alpha = attachment.color.a;

    sprite.region = attachment.region;
    this._setSpriteRegion(attachment, sprite, attachment.region);

    slot.sprites = slot.sprites || {};
    slot.sprites[name] = sprite;
    return sprite;
  }

  _setSpriteRegion(attachment, sprite, region) {
    sprite.region = region;
    if (!region.size) {
      sprite.scaleX = attachment.scaleX * attachment.width / region.originalWidth;
      sprite.scaleY = -attachment.scaleY * attachment.height / region.originalHeight;
    } else {
      //hacked!
      sprite.scaleX = region.size.width / region.originalWidth;
      sprite.scaleY = -region.size.height / region.originalHeight;
    }
  }
}
