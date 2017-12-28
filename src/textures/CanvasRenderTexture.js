/* @echo EXPORT */
class CanvasRenderTexture extends Texture {
  constructor(width, height) {
    let bbs = Black.driver.finalScale;
    
    let w = width * bbs;
    let h = height * bbs;
    
    let renderTarget = new RenderTargetCanvas(w, h);

    super(renderTarget);

    this.set(renderTarget.native, null, null, 1 / bbs);

    this.renderTarget = renderTarget;
  }
}
