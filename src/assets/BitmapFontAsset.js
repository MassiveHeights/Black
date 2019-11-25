import { Asset } from "./Asset";
import { Texture } from "../textures/Texture";
import { ImageAssetLoader } from "./loaders/ImageAssetLoader";
import { XHRAssetLoader } from "./loaders/XHRAssetLoader";
import { Rectangle } from "../geom/Rectangle";
import { AssetType } from "./AssetType";
import { LoaderType } from "./LoaderType";

/**
 * Bitmap Font Asset responsible for loading font image file and corresponding xml file.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
export class BitmapFontAsset extends Asset {
  /**
   * Creates new AtlasTextureAsset instance.
   *
   * @param {string} name     Name of the asset.
   * @param {string} imageUrl Image URL.
   * @param {string} xmlUrl   XML URL.
   */
  constructor(name, imageUrl, xmlUrl) {
    super(AssetType.BITMAP_FONT, name);

    /**
     * @private
     * @type {string}
     */
    this.mImageUrl = imageUrl;

    /**
     * @private
     * @type {string}
     */
    this.mXmlUrl = xmlUrl;

    /** @type {number} */
    this.mScale = 1 / Texture.getScaleFactorFromName(imageUrl);

    /** 
     * @private 
     * @type {black-engine~ImageAssetLoader|null}
     */
    this.mImageLoader = null;

    /** 
     * @private 
     * @type {XHRAssetLoader|null} 
     */
    this.mXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mImageLoader = factory.get(LoaderType.IMAGE, this.mImageUrl);
    this.addLoader(this.mImageLoader);

    this.mXHR = factory.get(LoaderType.XHR, this.mXmlUrl);
    this.mXHR.mimeType = 'text/xml';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    let xml = new DOMParser().parseFromString(/** @type {string} */(this.mXHR.data), 'text/xml');
    let texture = new Texture(this.mImageLoader.data, null, null, this.mScale);

    super.ready(BitmapFontAsset.parse(xml, texture));
  }

  /**
   *
   * @param {Document} xml
   * @param {black-engine~Texture} texture
   * @returns {black-engine~BitmapFontData}
   */
  static parse(xml, texture) {
    let data = new BitmapFontData();
    data.texture = texture;
    data.xml = xml;

    let info = xml.getElementsByTagName('info')[0];
    let common = xml.getElementsByTagName('common')[0];

    data.name = info.getAttribute('face');
    data.size = parseInt(info.getAttribute('size'), 10);
    data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10);
    data.baseline = parseInt(common.getAttribute('base'), 10);
    data.chars = {};

    let letters = xml.getElementsByTagName('char');

    for (let i = 0; i < letters.length; i++) {
      let letter = letters[i];
      let charCode = parseInt(letter.getAttribute('id'), 10);
      let x = parseInt(letter.getAttribute('x'), 10) + texture.region.x;
      let y = parseInt(letter.getAttribute('y'), 10) + texture.region.y;
      let w = parseInt(letter.getAttribute('width'), 10);
      let h = parseInt(letter.getAttribute('height'), 10);
      let xo = parseInt(letter.getAttribute('xoffset'), 10);
      let yo = parseInt(letter.getAttribute('yoffset'), 10);
      let xa = parseInt(letter.getAttribute('xadvance'), 10);
      let textureRect = new Rectangle(x, y, w, h);

      let charData = new BitmapFontCharData();
      charData.texture = new Texture(texture.native, textureRect);
      charData.xOffset = xo;
      charData.yOffset = yo;
      charData.width = w;
      charData.height = h;
      charData.xAdvance = xa;

      data.chars[charCode] = charData;
    }

    let kernings = xml.getElementsByTagName('kerning');

    for (let i = 0; i < kernings.length; i++) {
      let kerning = kernings[i];
      let first = parseInt(kerning.getAttribute('first'), 10);
      let second = parseInt(kerning.getAttribute('second'), 10);
      let amount = parseInt(kerning.getAttribute('amount'), 10);

      if (data.chars[second])
        data.chars[second].kerning[first] = amount;
    }

    return data;
  }
}

export class BitmapFontData {
  constructor() {
    /** @type {Texture} */
    this.texture = null;

    /** @type {Document} */
    this.xml = null;

    /** @type {string} */
    this.name = '';

    /** @type {number} */
    this.size = 0;

    /** @type {number} */
    this.lineHeight = 0;

    /** @type {Object.<number, BitmapFontCharData>} */
    this.chars = {};

    /** @type {number} */
    this.baseline = 0;
  }
}

export class BitmapFontCharData {
  constructor() {
    /** @type {Texture} */
    this.texture = null;

    /** @type {number} */
    this.xOffset = 0;

    /** @type {number} */
    this.yOffset = 0;

    /** @type {number} */
    this.width = 0;

    /** @type {number} */
    this.height = 0;

    /** @type {number} */
    this.xAdvance = 0;

    /** @type {Object.<number, number>} */
    this.kerning = {};
  }
}