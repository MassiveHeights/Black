/* @echo EXPORT */
class SpriteRendererCanvas extends Renderer {
  render(driver) {
    if (this.texture == null)
      return;
      
    driver.setTransform(this.transform);
    driver.globalAlpha = this.alpha;
    driver.globalBlendMode = this.blendMode;
    driver.drawTexture(this.texture);
  }
}
