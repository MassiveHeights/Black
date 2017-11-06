/* @echo EXPORT */
class TextRendererCanvas extends TextRenderer {
  render(driver) {
    super.render(driver);

    driver.drawTexture(this.texture);
  }
}
