/* @echo EXPORT */
class MapMap {
  constructor() {
    this.mMap = new Map();

    // TODO implement maximum map capacity
    // this.mCapacity = capacity;
  }

  has(key1, key2) {
    return this.mMap.has(key1) && this.mMap.get(key1).has(key2);
  }

  set(key1, key2, value) {

    let map = this.mMap.get(key1);

    if (map == null) {
      map = new Map();
      this.mMap.set(key1, map);
    }
    map.set(key2, value);
  }

  get(key1, key2) {
    let map = this.mMap.get(key1);
    if (map != null) {
      return this.mMap.get(key1) && this.mMap.get(key1).get(key2);
    }
    return null;
  }
}