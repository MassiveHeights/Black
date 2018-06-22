/**
 * Helper glob matching class.
 * 
 * @cat utils
 */
/* @echo EXPORT */
class Glob {
  /**
   * Creates new Glob instance.
   * 
   * @ignore
   * @param {string} pattern 
   */
  constructor(pattern) {
    this.mRegExp = new RegExp(`^${pattern.replace(/\./g, '\\.').replace(/\*\*$/g, '.+').replace(/(?:\*\*\/|\*\*|\*)/g, s => { return Glob.mPatterns[s]; })}$`);
  }

  /**
   * 
   * @ignore
   * @param {string} string 
   * @returns {boolean}
   */
  test(string) {
    return this.mRegExp.test(string);
  }
}

Glob.mPatterns = { '*': '[^/]+', '**': '.+/?[^/]+', '**/': '.+/?' };
