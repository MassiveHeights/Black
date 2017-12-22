/* @echo EXPORT */
class CanvasRenderTexture extends Texture {
  constructor(width, height) {
    super();

    let scaleFactor = Black.driver.scaleFactor;

    this.renderTarget = new RenderTargetCanvas(width * scaleFactor, height * scaleFactor);
    this.resolution = scaleFactor;
    this.update(this.renderTarget.native);
  }
}
