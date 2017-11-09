/* @echo EXPORT */
class RenderTexture extends Texture {
  constructor(width, height) {
    super();

    this.renderTarget = Black.instance.video.getRenderTarget(width, height);
    this.update(this.renderTarget.native);
  }
}
