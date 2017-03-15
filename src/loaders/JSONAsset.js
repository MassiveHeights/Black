/* @echo EXPORT */
class JSONAsset extends Asset {
  /**
   * constructor
   *
   * @param {string} name
   * @param {string} url
   *
   * @return {void}
   */
  constructor(name, url) {
    super(name, url);
    this.mimeType = "application/json";
  }

  /**
   * onLoaded
   *
   * @return {void}
   */
  onLoaded(){
    this.mData = JSON.parse(/** @type {string} */ (this.mRequest.responseText) );
    super.onLoaded();
  }
}
