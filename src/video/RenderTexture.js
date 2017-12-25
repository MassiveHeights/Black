/* @echo EXPORT */
class RenderTexture extends Texture {
  constructor(width, height, resolution) {
    super();

    this.mOriginalWidth = width;
    this.mOriginalHeight = height;

    let bbs = Black.driver.backBufferScale;

    let w = width * bbs;
    let h = height * bbs;

    this.renderTarget = Black.driver.getRenderTarget(w, h);
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
