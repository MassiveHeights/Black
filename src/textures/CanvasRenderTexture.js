import { Texture } from "./Texture";
import { RenderTargetCanvas } from "../drivers/canvas/RenderTargetCanvas";

/**
 * A texture allowing game objects to be rendered onto it.
 *
 * @cat textures
 */
export class CanvasRenderTexture extends Texture {
  /**
   * Creates new CanvasRenderTexture instance with given size and scale.
   *
   * @param {number} width  The width of the texture in stage space.
   * @param {number} height The height of the texture in stage space.
   * @param {number} scale  The scale factor of the internal texture
   */
  constructor(width, height, scale) {
    const renderTarget = new RenderTargetCanvas(width * scale, height * scale);

    super(renderTarget.native);
    this.set(renderTarget.native, null, null, 1 / scale);

    this.renderTarget = renderTarget;
  }

  /**
   * Updates this instance with given size and scale.
   *
   * @param {number} width  The width of the texture in stage space.
   * @param {number} height The height of the texture in stage space.
   * @param {number} scale  The scale factor of the internal texture
   */
  resize(width, height, scale) {
    this.renderTarget.resize(width * scale, height * scale);
    this.set(this.renderTarget.native, null, null, 1 / scale);
  }

  __dumpToDocument() {
    let img = new Image();
    img.style.position = 'fixed';
    img.style.top = '0px';
    img.style.left = '0px';
    img.style.background = '#333';
    img.style.width = '256px';
    img.style.height = 'auto';
    //img.style.border = '1px solid crimson';
    img.src = /** @type {HTMLCanvasElement} */(this.mNative).toDataURL('image/png');
    document.body.appendChild(img);
  }
}
