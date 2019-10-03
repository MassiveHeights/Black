import { BitmapTextRenderer } from "../BitmapTextRenderer";
import { Renderer } from "../Renderer";

/**
 * Renders `BitmapTextField` objects on canvas.
 *
 * @extends black-engine~BitmapTextRenderer
 * @cat drivers.canvas
 */
export class BitmapTextRendererCanvas extends BitmapTextRenderer {
  /** @inheritDoc */
  render(driver, session) {
    super.render(driver, session);

    driver.drawTexture(Renderer.getColoredTexture(this.texture, this.gameObject.mColor));
  }
}
