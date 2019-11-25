import { AssetLoader } from "./AssetLoader";

/**
 * XHRAssetLoader responsible for loading data via XMLHttpRequest.
 *
 * @cat assets.loaders
 * @extends black-engine~AssetLoader
 */
export class XHRAssetLoader extends AssetLoader {
  constructor(url) {
    super(url);

    /** 
     * @protected 
     * @type {XMLHttpRequest} 
     */
    this.mRequest = new XMLHttpRequest();

    /** 
     * @type {string|undefined} 
     */
    this.mimeType = undefined;

    /** 
     * @type {string} 
     */
    this.responseType = '';
  }

  /**
   * @inheritDoc
   */
  load() {
    this.mRequest.open('GET', this.mUrl, true);

    if (this.responseType != '')
      this.mRequest.responseType = this.responseType;

    if (this.mRequest.overrideMimeType != undefined && this.mimeType)
      this.mRequest.overrideMimeType(this.mimeType);

    this.mRequest.onreadystatechange = () => {
      if (this.mRequest.readyState === 4) {
        if ((this.mRequest.status === 200) || ((this.mRequest.status === 0) && this.mRequest.responseText)) {
          if (this.responseType === '' || this.responseType === 'text')
            this.mData = this.mRequest.responseText;
          else
            this.mData = this.mRequest.response;

          this.onLoad();
        }
        else
          this.onError();
      }
    };

    this.mRequest.send(null);
  }

  /**
   * @inheritDoc
   */
  onAbort() {
    this.mRequest.abort();
  }
}