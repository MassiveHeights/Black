/* @echo EXPORT */
class RenderTexture extends Texture {
  constructor(width, height) {
    super();

    let scaleFactor = Black.driver.scaleFactor;
    
    let w = width * scaleFactor;
    let h = height * scaleFactor;

    // if (w > Texture.MAX_SIZE || h > Texture.MAX_SIZE) {
    //   let scale = Math.min(Texture.MAX_SIZE / w, Texture.MAX_SIZE / h);

    //   w *= scale;
    //   h *= scale;
    //   scaleFactor *= scale;
    // }

    this.renderTarget = Black.driver.getRenderTarget(w, h); 
    this.resolution = 1 / scaleFactor;
    this.update(this.renderTarget.native);
  }
}
