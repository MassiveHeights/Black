/* @echo EXPORT */
class BitmapTextRendererCanvas extends BitmapTextRenderer {
  render(driver) {
    super.render(driver);

    driver.drawTexture(this.texture);
  }
}
