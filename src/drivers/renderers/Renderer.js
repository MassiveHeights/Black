/* @echo EXPORT */
class Renderer {
  constructor() {
    this.texture = null;
    this.alpha = 1;
    this.blendMode = BlendMode.AUTO;
    this.transform = null;
    this.visible = true;
    this.clipRect = null;
    this.dirty = DirtyFlag.DIRTY;

    this.index = 0;
    this.endPassRequiredAt = -1;
    this.endPassRequired = false;
  }

  render(driver) { }

  childrenRendered(driver) { }

  get isRenderable() {
    return this.alpha > 0 && this.visible === true;
  }
}