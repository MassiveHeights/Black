/**
 * Holds information about external assets.
 *
 * @cat loaders
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class Asset extends MessageDispatcher {
  /**
   * Creates new Assets instance.
   * @param  {string} name Name of asset.
   * @param  {string} url  URL of the asset to load it from.
   */
  constructor(name, url) {
    super();

    /**
     * @private
     * @type {string}
     */
    this.mName = name;

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /**
     * @private
     * @type {*|null}
     */
    this.mData = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsLoaded = false;

    /**
     * @private
     * @type {string|undefined}
     */
    this.mMimeType = undefined;

    /**
     * @private
     * @type {string}
     */
    this.mResponseType = '';

    /**
     * @private
     * @type {string}
     */
    this.mExtension = this.getExtension(url);

    /**
     * @private
     * @type {XMLHttpRequest|null}
     */
    this.mRequest = null;
  }

  /**
   * Loads asset from an external source.
   *
   * @return {void}
   */
  load() {
    //console.log('Asset: loading asset \'%s\' from \'%s\'', this.mName, this.mUrl);

    this.mRequest = new XMLHttpRequest();
    //this.mRequest.onprogress = (pe) => this.onProgressChanged(pe);

    if (this.mRequest.overrideMimeType && this.mMimeType)
      this.mRequest.overrideMimeType(this.mMimeType);

    this.mRequest.responseType = this.mResponseType;
    this.mRequest.open("GET", this.mUrl, true);
    this.mRequest.onreadystatechange = () => {
      if (this.mRequest.readyState === 4) {
        if ((this.mRequest.status === 200) || ((this.mRequest.status === 0) && this.mRequest.responseText))
          this.onLoaded();
        else
          throw new Error('Error loading ' + this.mUrl + " (" + this.mRequest.status + ":"+ this.mRequest.responseText + ")"); //TODO handle errors
      }
    };

    this.mRequest.send(null);
  }

  /**
   * Called when asset is fully loaded.
   *
   * @protected
   * @fires complete
   *
   * @return {void}
   */
  onLoaded() {
    this.mIsLoaded = true;
    this.post('complete');
  }

  /**
   * Returns the name of this asset.
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }

  /**
   * Returns loaded data object associated with this asset.
   *
   * @return {*}
   */
  get data() {
    return this.mData;
  }

  /**
   * Returns true if asset is preloaded.
   *
   * @return {boolean}
   */
  get isLoaded() {
    return this.mIsLoaded;
  }

  // TODO: finish
  dispose() {}

  /**
   * Helper function. Returns the file extension.
   *
   * @param {string} url Url to get extension from.
   *
   * @return {string} Empty string if no extension were found or extension itself.
   */
  getExtension(url) {
    if (url.indexOf('.') === -1)
      return '';

    return url.substring(url.indexOf('.')).toLowerCase();
  }
}
