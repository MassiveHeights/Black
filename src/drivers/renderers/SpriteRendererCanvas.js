/* @echo EXPORT */
class SpriteRendererCanvas extends DisplayObjectRendererCanvas {
  render(driver) {
    driver.setTransform(this.transform);
    driver.globalAlpha = this.alpha;
    driver.globalBlendMode = this.blendMode;

    if (this.clipRect !== null && this.clipRect.isEmpty === false) {
      this.endPassRequired = true;
      driver.beginClip();
    }

    if (this.texture !== null)
      driver.drawTexture(this.texture);
  }

  childrenRendered(driver) { 
    this.beginClip()
  }
}
