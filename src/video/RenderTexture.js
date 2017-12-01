/* @echo EXPORT */
class RenderTexture extends Texture {
  constructor(width, height) {
    super();

    let rsf = Black.driver.scaleFactor;

    this.renderTarget = Black.driver.getRenderTarget(width * rsf, height * rsf);
    this.resolution = rsf;
    this.update(this.renderTarget.native);
  }

  // get renderWidth() {
  //   return (this.mNativeWidth / this.resolution);
  // }

  // get renderHeight() {
  //   return (this.mNativeHeight / this.resolution);
  // }
}
