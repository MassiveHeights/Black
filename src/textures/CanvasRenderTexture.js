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
    const bbs = Black.driver.finalScale;

    const w = width * bbs;
    const h = height * bbs;

    const renderTarget = new RenderTargetCanvas(w, h);

    super(renderTarget.native);
    this.set(renderTarget.native, null, null, 1 / bbs);

    this.renderTarget = renderTarget;
  }

  __dumpToDocument() {
    let img = new Image();
    img.style.position = 'fixed';
    img.style.top = '0px';
    img.style.left = '0px';
    img.style.background = '#333';
    img.style.width = '256px';
    img.style.height = 'auto';
    img.style.border = '1px solid crimson';
    img.src = this.mNative.toDataURL("image/png");
    document.body.appendChild(img);
  }
}
