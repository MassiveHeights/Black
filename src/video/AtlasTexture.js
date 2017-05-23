/**
 * A number scatter for defining a range in 2D space.
 *
 * @cat video
 * @extends Texture
 */
/* @echo EXPORT */
class AtlasTexture extends Texture {
  /**
   * Creates new AtlasTexture instance.
   *
   * @param {Texture}              texture A base texture object.
   * @param {{meta: *, frames: *}} Black json object.
   */
  constructor(texture, jsonObject) {
    super(texture.native);

    /** @type {Object} */
    this.mMeta = {};

    /** @dict */
    this.mSubTextures = {}; // dictionary

    this.__parseJson(jsonObject);
  }

  /**
   * @private
   *
   * @param  {{meta: *, frames: *}} o
   * @return {void}
   */
  __parseJson(o) {
    const NEGATIVE_HALF_PI = -(Math.PI / 2);

    // if (o.meta.format)
    //   this.mMeta.format = o.meta.format;
    //
    // if (o.meta.scale)
    //   this.mMeta.scale = parseFloat(o.meta.scale);

    for (let key in o.frames) {
      let data = /** @type {Array<number>} */ (o.frames[key]);

      let region = new Rectangle(data[0], data[1], data[2], data[3]);
      let untrimmedRect = new Rectangle(data[4], data[5], data[6], data[7]);

      this.mSubTextures[key] = new Texture(this.native, region, untrimmedRect);
    }
  }

  // addRegion(name, region, frame) {}
  //
  // removeRegion() {}

  /**
   * Returns the texture by a given name.
   *
   * @param {string} name The name of the texture to find.
   *
   * @return {Texture} The Texture or null if not found.
   */
  getTexture(name) {
    /** @type {Texture} */
    let t = this.mSubTextures[name];
    if (t === undefined)
      console.warn('Texture \'%s\' was not found in cache.', name);

    return /** @type {Texture} */ (t);
  }

  /**
   * Returns array of Texture by given name or wildcard mask.
   * If `nameMask` is null then all textures will be returned.
   * This method sorts all resulting textures using neurural sort algorith.
   *
   * @param {string|null} [nameMask=null] The mask to filter by.
   * @param {Array<Texture>|null}         outTextures If passed will be
   * overwritten by result object.
   *
   * @return {Array<Texture>} The list of found textures.
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

  static naturalSort(dataset, field = null) {
    dataset.sort(AtlasTexture.__naturalComparer(field));
  }

  static __naturalComparer(field = null, useAbs = true) {
    return function(a, b) {
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

  //dispose() {}
}
