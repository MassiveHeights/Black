/* @echo EXPORT */
class DisplayObjectRendererDOM extends Renderer {
  constructor() {
    super();

    this.elements = [];
  }

  render(driver) {
  }

  childrenRendered(driver) {
  }

  cleanup() {

  }

  get hasVisibleArea() {
    return true;
  }
}
