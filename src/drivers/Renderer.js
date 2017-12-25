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
    this.clipRect = null;

    // internal
    this.endPassRequiredAt = -1;
    this.endPassRequired = false;

    this.skipChildren = false;
    this.skip = false;

    this.filters = null;
  }

  render(driver) { }

  renderFilters () {
    //if (this.dirty & DirtyFlag.FILTER) 
  }

  get isRenderable() {
    return this.alpha > 0 && this.visible === true && (this.clipRect !== null ? this.clipRect.isEmpty === false : true);
  }

  getTransform() {
    return this.transform;
  }

  getAlpha() {
    return this.alpha;
  }

  getBlendMode() {
    return this.blendMode;
  }
}