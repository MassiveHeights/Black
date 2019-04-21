export class ParserBase {
  constructor() {
    /** 
     * Input data to parse
     * @public 
     * @type {Object}
     */
    this.data = null;
  }

  /**
   * 
   * @param {Object} data
   *
   * @return {Object} Parsed data
   */
  parse(data) {
    this.data = data;

    return null;
  }
}