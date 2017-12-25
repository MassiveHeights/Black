/* @echo EXPORT */
class CanvasRenderTexture extends Texture {
  constructor(width, height) {
    super();

    this.mOriginalWidth = width;
    this.mOriginalHeight = height;

    let bbs = Black.driver.backBufferScale;

    let w = width * bbs;
    let h = height * bbs;

    this.renderTarget = new RenderTargetCanvas(w, h);
    this.resolution = 1 / bbs;
    this.update(this.renderTarget.native);
  }

  get width() {
    return this.mOriginalWidth;
  }

  get height() {
    return this.mOriginalHeight;
  }
}
