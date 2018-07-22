/* @echo EXPORT */
class ParserBase {
  constructor() {
    /** 
     * Input data to parse
     * @public @type {Object}
     */
    this.data = null;
  }

  /**
   * 
   * @param {Object} data 
   */
  parse(data) {
    this.data = data;
  }
}