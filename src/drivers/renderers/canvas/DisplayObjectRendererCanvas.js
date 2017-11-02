/* @echo EXPORT */
class DisplayObjectRendererCanvas extends Renderer {
  render(driver) {

    driver.setTransform(this.transform);

    if (this.clipRect !== null && this.clipRect.isEmpty === false) {
      this.endPassRequired = true;

      driver.beginClip(this.clipRect);
    }
  }

  childrenRendered(driver) {
    driver.endClip();
  }
}
