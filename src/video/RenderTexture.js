/* @echo EXPORT */
class RenderTexture extends Texture {
  constructor(width, height) {
    super();

    this.mOriginalWidth = width;
    this.mOriginalHeight = height;

    let bbs = Black.driver.backBufferScale;

    let w = width * bbs;
    let h = height * bbs;

    
    
    this.renderTarget = Black.driver.getRenderTarget(w, h);
    this.scale = 1 / bbs;
    this.update(this.renderTarget.native);
  }
}
