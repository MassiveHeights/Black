/* @echo EXPORT */
class RenderSession {
  constructor() {
    this.renderers = [];
    this.skipChildren = false;
    this.endPassRenderer = null;
    this.rendererIndex = 0;
  }

  clean() {
    this.renderers.splice(0, this.renderers.length);
  }

  reset() {
    this.renderers.splice(0, this.renderers.length);
    this.endPassRenderer = null;
    this.rendererIndex = 0;
    this.skipChildren = false;
  }
}