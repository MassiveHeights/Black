/**
 * A texture allowing game objects to be rendered onto it.
 *
 * @cat textures
 */
/* @echo EXPORT */
class CanvasRenderTexture extends Texture {
  /**
   * Creates new CanvasRenderTexture instance with given size.
   *
   * @param {number} width  The width of the texture in stage space.
   * @param {number} height The height of the texture in stage space.
   */
  constructor(width, height) {
    let bbs = Black.driver.finalScale;
    
    let w = width * bbs;
    let h = height * bbs;
    
    let renderTarget = new RenderTargetCanvas(w, h);

    super(renderTarget.native);
    this.set(renderTarget.native, null, null, 1 / bbs);

    this.renderTarget = renderTarget;
  }
}
