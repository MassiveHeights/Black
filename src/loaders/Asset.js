// TODO: handle errors
// TODO: v2: parallel loading?
//
//
/* @echo EXPORT */
class Asset extends MessageDispatcher {
  /**
   * @param  {string} name description
   * @param  {string} url  description
   */
  constructor(name, url) {
    super();

    /** @type {string} */
    this.mName = name;

    /** @type {string} */
    this.mUrl = url;

    /** @type {*|null} */
    this.mData = null;

    /** @type {boolean} */
    this.mIsLoaded = false;

    /** @type {string|undefined} */
    this.mMimeType = undefined;

    /** @type {string} */
    this.mResponseType = '';

    /** @type {string} */
    this.mExtension = this.getExtension(url);

    /** @type {XMLHttpRequest|null} */
    this.mRequest = null;
  }

  /**
   * load
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
   * onLoaded
   *
   * @return {void}
   */
  onLoaded() {
    this.mIsLoaded = true;
    this.sendMessage('complete');
  }

  /**
   * name
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }

  /**
   * data
   *
   * @return {*}
   */
  get data() {
    return this.mData;
  }

  /**
   * isLoaded
   *
   * @return {boolean}
   */
  get isLoaded() {
    return this.mIsLoaded;
  }

  // TODO: finish
  dispose() {}

  /**
   * getExtension
   *
   * @param {string} url
   *
   * @return {string}
   */
  getExtension(url) {
    if (url.indexOf(".") === -1)
      return '';

    return url.substring(url.indexOf(".")).toLowerCase();
  }
}
