/**
 * @cat utils
 * @ignore
 */
/* @echo EXPORT */
class Glob {
  /**
   * @ignore
   * @param {string} pattern 
   */
  constructor(pattern) {
    this.mRegExp = new RegExp(`^${pattern.replace(/\./g, '\\.').replace(/\*\*$/g, '.+').replace(/(?:\*\*\/|\*\*|\*)/g, s => { return Glob.mPatterns[s]; })}$`);
  }

  /**
   * @ignore
   * @param {string} string 
   * @returns {boolean}
   */
  test(string) {
    return this.mRegExp.test(string);
  }
}

Glob.mPatterns = { '*': '[^/]+', '**': '.+/?[^/]+', '**/': '.+/?' };
