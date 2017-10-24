/* @echo EXPORT */
class Renderer {
  constructor() {
    this.updateRequired = true;
    this.zIndex = 0;
    this.texture = null;
    this.alpha = 1;
    this.blendMode = BlendMode.AUTO;
    this.transform = null;
    this.visible = true;
    this.dirty = true;
  }

  render(driver) {
  }

  get isRenderable() {
    return this.alpha > 0 && this.visible === true;
  }
}