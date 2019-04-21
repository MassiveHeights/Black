/**
 * @private
 * @ignore
 */
const patterns = { '*': '[^/]+', '**': '.+/?[^/]+', '**/': '.+/?' };

/**
 * Helper glob matching class.
 * 
 * @cat utils
 */
export class Glob {
  /**
   * Creates new Glob instance.
   * 
   * @param {string} pattern 
   */
  constructor(pattern) {
    this.mRegExp = new RegExp(`^${pattern.replace(/\./g, '\\.').replace(/\*\*$/g, '.+').replace(/(?:\*\*\/|\*\*|\*)/g, s => { return patterns[s]; })}$`);
  }

  /**
   * Tests whenever string matches the glob.
   * 
   * @param {string} string 
   * @returns {boolean}
   */
  test(string) {
    return this.mRegExp.test(string);
  }
}