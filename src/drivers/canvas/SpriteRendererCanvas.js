/* @echo EXPORT */
class SpriteRendererCanvas extends DisplayObjectRendererCanvas {
  render(driver) {
    if (this.texture !== null)
      driver.drawTexture(this.texture);
  }
}
