/**
 * An video driver that draw everything into DOM elements itself.
 * @ignore
 * @cat drivers
 * @extends VideoNullDriver
 */
/* @echo EXPORT */
class DOMDriver extends VideoNullDriver {
  /**
   * @param  {HTMLElement} containerElement The DOM element to draw into.
   * @param  {number} width                 The width of the viewport.
   * @param  {number} height                The height of the viewport.
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    /** @type {Array<Element>} */
    this.mCache = [];

    /** @type {number} */
    this.mCounter = 0;

    this.mRenderersPrev = null;

    /** @type {boolean} */
    this.mPixelated = true;

    this.mNumRenderersZIndex = 0;

    this.__initCSS();

    this.mRendererMap = {
      DisplayObject: DisplayObjectRendererDOM,
      Sprite: SpriteRendererDOM,
      Emitter: EmitterRendererDOM,
      Text: TextRendererDOM
    };
  }

  // render(driver) {
  //   for (let i = 0, len = this.mRenderers.length; i !== len; i++) {
  //     let renderer = this.mRenderers[i];

  //     renderer.render(driver);
  //     renderer.dirty = 0;

  //     if (renderer.endPassRequired === true) {
  //       this.mEndPassStack.push(renderer);
  //       this.mEndPassRenderer = renderer;
  //       renderer.endPassRequired = false;
  //     }

  //     if (this.mEndPassRenderer !== null && this.mEndPassRenderer.endPassRequiredAt === i) {
  //       this.mEndPassRenderer.childrenRendered(driver);

  //       this.mEndPassStack.pop();
  //       this.mEndPassRenderer = null;
  //     }
  //   }
  // }

  registerRenderer(renderer) {
    this.mRenderers.push(renderer);
    renderer.zIndex = ++this.mNumRenderersZIndex;

    return renderer;
  }

  beginFrame() {
    super.beginFrame();

    this.mNumRenderersZIndex = 0;
  }

  endFrame() {
    if (this.mRenderersPrev !== null) {
      let diff = this.mRenderersPrev.filter(x => this.mRenderers.indexOf(x) == -1);
      for (let i = 0; i < diff.length; i++)
        diff[i].cleanup(this);
    }
    this.mRenderersPrev = this.mRenderers.slice(0);

    super.endFrame();
  }

  /**
   * @ignore
   * @param {HTMLElement} canvas
   *
   * @return {Texture|null}
   */
  getTextureFromCanvas(canvas) {
    return Texture.fromCanvasAsImage(canvas);
  }

  /**
   * @private
   *
   * @return {void}  description
   */
  __initCSS() {
    let imgRendering = 'image-rendering:optimizeSpeed; image-rendering:optimize-contrast; image-rendering:crisp-edges; image-rendering:pixelated';

    let sSprite = document.createElement('style');
    sSprite.type = 'text/css';
    sSprite.innerHTML = '.sprite { position: absolute; background-repeat: no-repeat; cursor: default !important; -webkit-transform-origin: 0px 0px;}';
    document.getElementsByTagName('head')[0].appendChild(sSprite);

    let sSpritePixelated = document.createElement('style');
    sSpritePixelated.type = 'text/css';
    sSpritePixelated.innerHTML = '.sprite-p { position: absolute; background-repeat: no-repeat; cursor: default !important; -webkit-transform-origin: 0px 0px; ' + imgRendering + '}';
    document.getElementsByTagName('head')[0].appendChild(sSpritePixelated);

    let sText = document.createElement('style');
    sText.type = 'text/css';
    sText.innerHTML = '.text { position: absolute; white-space: pre; overflow: hidden; cursor: default !important; -webkit-transform-origin: 0px 0px;}';
    document.getElementsByTagName('head')[0].appendChild(sText);

    let sViewport = document.createElement('style');
    sViewport.type = 'text/css';
    sViewport.innerHTML = '.viewport { width: 100%; height: 100%; position: relative; overflow: hidden; cursor: default; }';
    document.getElementsByTagName('head')[0].appendChild(sViewport);

    this.mContainerElement.className = 'viewport';
  }

  __createElement(type, className) {
    let element = document.createElement(type);
    element.className = className;
    this.mContainerElement.appendChild(element);
    return element;
  }

  __removeElement(element) {
    this.mContainerElement.removeChild(element);
  }
}
