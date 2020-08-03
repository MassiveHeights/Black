import { Black } from "../Black";
import { DisplayObject } from "../display/DisplayObject";
import { Sprite } from "../display/Sprite";

function addTexture(name, texture) {
  if (!texture)
    return null;

  let pages = this.pages;

  let page = null;
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].baseTexture === texture.baseTexture) {
      page = pages[i];
      break;
    }
  }

  if (page === null) {
    page = new spine.TextureAtlasPage();
    page.name = 'texturePage';
    page.baseTexture = texture.native;
    pages.push(page);
  }

  let region = new spine.TextureAtlasRegion();
  region.name = name;
  region.page = page;
  region.texture = texture;
  region.index = -1;
  region.width = texture.width;
  region.height = texture.height;
  this.regions.push(region);
  return region;
}

/**
 * Esoteric Software SPINE wrapper for Black Engine
 *
 * @cat animation
 * @extends DisplayObject
 */
export class Spine extends DisplayObject {
  /**
   * Creates new instance of Spine.
   */
  constructor(name, texturesPath = '') {
    super();

    let json = Black.assets.getJSON(name);

    let fakeLoader = function (path, loaderFunction, callback) {
      console.log('FAKE LOADER', path);
    };

    let spineAtlas = new spine.TextureAtlas('', fakeLoader);
    spineAtlas.addTexture = addTexture;

    let regions = {};

    for (let skinName in json.skins) {
      let skin = json.skins[skinName];

      for (let slotName in skin) {
        let slot = skin[slotName];

        for (let entryName in slot) {
          let attachment = slot[entryName];

          if (attachment.type === 'point')
            continue;

          if (attachment.type === 'path')
            continue;
          
          if (attachment.type === 'clipping')
            continue;

          let textureName = attachment.path || entryName;

          if (attachment.name)
            textureName = attachment.name;

          if (regions[textureName])
            continue;

          regions[textureName] = spineAtlas.addTexture(textureName, Black.assets.getTexture(texturesPath + textureName));
        }
      }
    }

    let attachmentParser = new spine.AtlasAttachmentLoader(spineAtlas);
    let spineJsonParser = new spine.SkeletonJson(attachmentParser);
    let skeletonData = spineJsonParser.readSkeletonData(json);

    this.mSkeleton = new spine.Skeleton(skeletonData);
    this.mSkeleton.updateWorldTransform();

    this.mStateData = new spine.AnimationStateData(skeletonData);

    this.mState = new spine.AnimationState(this.mStateData);

    this.mTempClipContainers = [];
    this.mTexturesPath = texturesPath;

    for (let i = 0, len = this.mSkeleton.slots.length; i < len; i++) {
      let slot = this.mSkeleton.slots[i];
      let attachment = slot.attachment;

      let slotContainer = new DisplayObject();
      slot.container = slotContainer;

      this.addChild(slotContainer);
      this.mTempClipContainers.push(null);

      if (attachment instanceof spine.RegionAttachment) {
        let spriteName = attachment.region.name;

        let sprite = this._createSprite(slot, attachment, spriteName);
        slot.currentSprite = sprite;
        slot.currentSpriteName = spriteName;
        slotContainer.addChild(sprite);
      }
    }

    this.mState.addListener({ complete: x => this.post('animationComplete', x.animation.name) });
  }

  get skeleton() {
    return this.mSkeleton;
  }

  play(name, loop = false) {
    this.mState.setAnimation(0, name, loop);
  }

  setMixing(from, to, dur) {
    this.mStateData.setMix(from, to, dur);
  }

  setTransition(from, to, loop, dur = 0, viseversaDur = 0) {
    let h = (t) => {
      if (t.animation.name === from)
        this.play(to, loop);
    };

    this.mState.addListener({ complete: h });

    if (dur > 0)
      this.mStateData.setMix(from, to, dur);
    if (viseversaDur > 0)
      this.mStateData.setMix(to, from, viseversaDur);
  }

  changeSlotAttachment(slotName, attachmentName) {
    this.mSkeleton.setAttachment(slotName, attachmentName);
  }

  onUpdate() {
    let dt = Black.time.delta;
    this.mState.update(dt);
    this.mState.apply(this.mSkeleton);
    this.mSkeleton.updateWorldTransform();
    let slots = this.mSkeleton.slots;

    for (let i = 0, n = slots.length; i < n; i++) {
      let slot = slots[i];
      let attachment = slot.attachment;

      let sprite = slot.currentSprite;
      let wrapper = slot.container;

      if (!attachment) {
        wrapper.visible = false;
        continue;
      }

      wrapper.visible = true;

      if (attachment instanceof spine.RegionAttachment) {
        let region = attachment.region;

        if (region) {

          if (!slot.currentSpriteName || slot.currentSpriteName !== region.name) {
            let spriteName = region.name;
            if (slot.currentSprite) {
              slot.currentSprite.visible = false;
            }
            slot.sprites = slot.sprites || {};
            if (slot.sprites[spriteName] !== undefined) {
              slot.sprites[spriteName].visible = true;
            }
            else {
              let sprite = this._createSprite(slot, attachment, spriteName);
              wrapper.addChild(sprite);
            }
            slot.currentSprite = slot.sprites[spriteName];
            slot.currentSpriteName = spriteName;
            sprite = slot.currentSprite;
          }
        }

        let bone = slot.bone;
        let w = region.width;
        let h = region.height;

        let regionHeight = region.rotate ? region.width : region.height;

        sprite.scaleX = attachment.scaleX * (attachment.width / region.width);
        sprite.scaleY = attachment.scaleY * (attachment.height / region.height);

        let radians = -attachment.rotation * Math.PI / 180;
        sprite.rotation = radians;

        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let shiftX = -attachment.width / 2 * attachment.scaleX;
        let shiftY = -attachment.height / 2 * attachment.scaleY;
        sprite.x = attachment.x + shiftX * cos - shiftY * sin;
        sprite.y = -attachment.y + shiftX * sin + shiftY * cos;

        wrapper.x = bone.worldX;
        wrapper.y = -bone.worldY;

        wrapper.rotation = Math.atan2(-bone.c, bone.a);

        let flipX = 1;
        let flipY = 1;

        let wsx = Math.sqrt(bone.a * bone.a + bone.c * bone.c);
        let wsy = Math.sqrt(bone.b * bone.b + bone.d * bone.d);

        wrapper.scaleX = wsx * flipX;
        wrapper.scaleY = wsy * flipY;

        wrapper.alpha = this.mSkeleton.color.a * slot.color.a * attachment.color.a;

      } else if (attachment instanceof spine.PointAttachment) {
        wrapper.x = slot.bone.worldX + attachment.x;
        wrapper.y = -slot.bone.worldY - attachment.y;
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

    let sprite = new Sprite(this.mTexturesPath + name);
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
      sprite.scaleX = attachment.scaleX * attachment.width / region.width;
      sprite.scaleY = -attachment.scaleY * attachment.height / region.height;
    } else {
      //hacked!
      sprite.scaleX = region.size.width / region.width;
      sprite.scaleY = -region.size.height / region.height;
    }
  }
}
