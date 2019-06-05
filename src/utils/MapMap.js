/**
 * A double key map.
 * @cat utils
 */
export class MapMap {
  constructor() {
    this.mMap = new Map();
  }

  /**
   * Returns true if value found.
   * 
   * @param {string} key1 
   * @param {string} key2 
   */
  has(key1, key2) {
    return this.mMap.has(key1) && this.mMap.get(key1).has(key2);
  }

  /**
   * Sets or updates value by given keys.
   * 
   * @param {string} key1 
   * @param {string} key2 
   * @param {*} value 
   */
  set(key1, key2, value) {
    let map = this.mMap.get(key1);

    if (map == null) {
      map = new Map();
      this.mMap.set(key1, map);
    }
    map.set(key2, value);
  }

  /**
   * Returns value by given keys.
   * 
   * @param {string} key1 
   * @param {string} key2 
   * @returns {*}
   */
  get(key1, key2) {
    let map = this.mMap.get(key1);
    if (map != null) {
      return this.mMap.get(key1) && this.mMap.get(key1).get(key2);
    }
    return null;
  }
}