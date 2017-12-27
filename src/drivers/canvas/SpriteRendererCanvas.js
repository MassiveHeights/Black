/* @echo EXPORT */
class SpriteRendererCanvas extends DisplayObjectRendererCanvas {
  render(driver) {
    driver.drawTexture(this.texture);
  }

  get isRenderable(){
    return this.texture !== null;
  }
}
