/* @echo EXPORT */
class CanvasRenderTexture extends Texture {
  constructor(width, height) {
    super();

    this.mOriginalWidth = width;
    this.mOriginalHeight = height;

    let bbs = Black.driver.finalScale;

    let w = width * bbs;
    let h = height * bbs;

    this.renderTarget = new RenderTargetCanvas(w, h);
    this.scale = 1 / bbs;

    this.update(this.renderTarget.native);
  }
}
