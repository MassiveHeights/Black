/* @echo EXPORT */
class RenderTexture extends Texture {
  constructor(width, height) {
    super();

    let scaleFactor = Black.driver.scaleFactor;
    
    this.renderTarget = Black.driver.getRenderTarget(width * scaleFactor, height * scaleFactor);
    this.resolution = scaleFactor;
    this.update(this.renderTarget.native);
  }
}
