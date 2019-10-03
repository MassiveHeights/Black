import { Texture } from "./Texture";
import { Rectangle } from "../geom/Rectangle";
import { Vector } from "../geom/Vector";
import { Debug } from "../core/Debug";

/**
 * A texture atlas.
 *
 * @cat textures
 * @extends black-engine~Texture
 */
export class AtlasTexture extends Texture {
  constructor(nativeElement, jsonObject, scale = 1) {
    super(nativeElement, null, null, scale);

    /** 
     * @private 
     * @type {Object.<string, black-engine~Texture>} 
     */
    this.mSubTextures = {};

    this.__parseAtlasData(jsonObject, scale);
  }

  /**
   * @ignore
   * @private
   * @param {{meta: *, frames: Object}} o
   * @param {number} scale
   * @return {void}
   */
  __parseAtlasData(o, scale) {
    for (let key in o.frames) {
      const data = /** @type {Array<number>} */ (o.frames[key]);
      const region = new Rectangle(data[0], data[1], data[2], data[3]);
      const untrimmedRect = new Rectangle(data[4], data[5], data[6], data[7]);

      let registrationPoint = null;
      let slice9borders = null;

      if (data.length === 8 + 2) {
        // we got pivots
        registrationPoint = new Vector(data[8], data[9]);
      } else if (data.length === 8 + 4) {
        // we got 9 slice but no pivots
        slice9borders = new Rectangle(data[8], data[9], data[10], data[11]);
      } else if (data.length === 8 + 6) {
        // we got both pivots and 9 slice
        registrationPoint = new Vector(data[8], data[9]);
        slice9borders = new Rectangle(data[10], data[11], data[12], data[13]);
      }
      
      this.mSubTextures[key] = new Texture(this.native, region, untrimmedRect, scale, registrationPoint, slice9borders);
    }
  }

  /**
   * Returns the texture by a given name.
   *
   * @param {string} name The name of the texture to find.
   * @return {black-engine~Texture} The Texture or null if not found.
   */
  getTexture(name) {
    /** @type {Texture} */
    let t = this.mSubTextures[name];
    Debug.assertWarn(t !== undefined, `Texture '${name}' was not found`);

    return /** @type {Texture} */ (t);
  }

  /**
   * Returns array of Texture by given name or wildcard mask.
   * If `nameMask` is null then all textures will be returned.
   * This method sorts all resulting textures using neutral sort algorith.
   *
   * @param {string|null} [nameMask=null] The mask to filter by.
   * @param {Array<black-engine~Texture>|null}         outTextures If passed will be overwritten by result object.
   * @return {Array<black-engine~Texture>}             The list of found textures.
   */
  getTextures(nameMask = null, outTextures = null) {
    let out = outTextures || [];
    if (nameMask === null) {
      for (let key in this.mSubTextures)
        out.push(this.mSubTextures[key]);

      return /** @type {Array<Texture>} */ (out);
    }

    let names = [];

    // TODO: make helper wild function
    let re = new RegExp("^" + nameMask.split("*").join(".*") + "$");
    for (let key in this.mSubTextures)
      if (re.test(key))
        names.push(key);

    //names.sort(AtlasTexture.__naturalComparer);
    AtlasTexture.naturalSort(names);

    for (let i = 0; i < names.length; i++)
      out.push(this.mSubTextures[names[i]]);

    return out;
  }

  /**
   * Gets dictionary of sub textures.
   *
   * @returns {Object} The list of sub textures.
   */
  get subTextures() {
    return this.mSubTextures;
  }

  /**
   * Sorts set of data in natural order
   *
   * @ignore
   * @param {Array<Object>} dataset
   * @param {string|null} [field=null]
   */
  static naturalSort(dataset, field = null) {
    dataset.sort(AtlasTexture.__naturalComparer(field));
  }

  /**
   * @ignore
   * @private
   * @param {string|null} field
   * @param {boolean} useAbs
   * @returns {function(?, ?):number}
   */
  static __naturalComparer(field = null, useAbs = true) {
    return function (a, b) {
      const NUMBER_GROUPS = /(-?\d*\.?\d+)/g;
      let aa = String(field == null ? a : a[field]).split(NUMBER_GROUPS);
      let bb = String(field == null ? b : b[field]).split(NUMBER_GROUPS);
      let min = Math.min(aa.length, bb.length);

      for (let i = 0; i < min; i++) {
        let x = 0;
        let y = 0;

        if (useAbs) {
          x = Math.abs(parseFloat(aa[i])) || aa[i].toLowerCase();
          y = Math.abs(parseFloat(bb[i])) || bb[i].toLowerCase();
        } else {
          x = parseFloat(aa[i]) || aa[i].toLowerCase();
          y = parseFloat(bb[i]) || bb[i].toLowerCase();
        }

        if (x < y)
          return -1;
        else if (x > y)
          return 1;
      }

      return 0;
    }
  }
}
