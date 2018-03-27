/**
 * Simple sorted array.
 */
/* @echo EXPORT */
class SortedArray {
  /**
   * Creates new SortedArray instance.
   * @param {function(a:number, b:number):number} comparer Optional comparer function.
   */
  constructor(comparer) {
    /** @type {Array<*>} */
    this.mData = [];

    /** @type {function(a:number, b:number):number} */
    this.mComparer = comparer || SortedArray.defaultComparer;
  }

  /**
   * Adds element into the list.
   * @param {*} element Element to add.
   * @returns {SortedArray}
   */
  add(element) {
    let ix = this.mData.length;
    this.mData.push(element);

    while (ix > 0) {
      let i = ix;
      let j = --ix;
      let r = this.mComparer(this.mData[i], this.mData[j]);

      if (r < 0) {
        let tmp = this.mData[i];
        this.mData[i] = this.mData[j];
        this.mData[j] = tmp;
      }
    }

    return this;
  }

  /**
   * Removes element from the list.
   * @param {*} element Element to remove.
   */
  remove(element) {
    let index = this.search(element);
    if (index >= 0)
      this.mData.splice(index, 1);

    return this;
  }

  /**
   * Returns element index.
   * @param {*} element 
   * @returns {number}
   */
  get(element) {
    let high = this.mData.length;
    let low = 0;

    while (high > low) {
      debugger
      let index = (high + low) / 2 >>> 0;
      let ordering = this.mComparer(this.mData[index], element);

      if (ordering < 0)
        low = index + 1;
      else if (ordering > 0)
        high = index;
      else
        return index;
    }

    return -1;
  }

  /**
   * Returns element at given index,
   * @param {number} index 
   * @returns {*|undefined}
   */
  getAt(index) {
    return this.mData[index];
  }

  /**
   * Returns first element.
   * @returns {*|undefined}
   */
  get first() {
    if (this.mData.length > 0)
      return this.mData[0];
  }

  /**
   * Returns last element.
   * @returns {*|undefined}
   */
  get last() {
    if (this.mData.length > 0)
      return this.mData[this.mData.length - 1];
  }

  /**
   * Default comparer function.
   * @param {*} a 
   * @param {*} b 
   */
  static defaultComparer(a, b) {
    if (a === b)
      return 0;

    return a < b ? -1 : 1;
  }
}