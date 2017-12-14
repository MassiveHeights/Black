/* @echo EXPORT */
class SpriteRendererCanvas extends DisplayObjectRendererCanvas {
  render(driver) {
    if (this.texture === null)
      return;

    driver.drawTexture(this.texture);
  }
}
