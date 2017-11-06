/* @echo EXPORT */
class Renderer {
  constructor() {
    this.texture = null;
    this.alpha = 1;
    this.blendMode = BlendMode.AUTO;
    this.transform = null;
    this.visible = true;
    this.pivotX = 0;
    this.pivotY = 0;
    this.dirty = DirtyFlag.DIRTY;

    this.mClipRect = null;

    this.endPassRequiredAt = -1;
    this.endPassRequired = false;
  }

  render(driver) { }

  childrenRendered(driver) { }

  get isRenderable() {
    return this.alpha > 0 && this.visible === true;
  }

  get clipRect() {
    return this.mClipRect;
  }

  set clipRect(value) {
    this.mClipRect = value;
    this.endPassRequired = value !== null;
  }
}