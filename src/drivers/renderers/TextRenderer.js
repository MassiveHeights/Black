/* @echo EXPORT */
class TextRenderer extends Renderer {
  constructor() {
    super();

    this.text = null;
    
    // this.canvas = document.createElement('canvas');
    // this.context = cvs.getContext('2d');
  }

  render(driver) {
    if (this.text === null)
      return;

    if (this.dirty & DirtyFlag.RENDER_CACHE) {
      console.log('cache dirty');
      let cvs = document.createElement('canvas');
      cvs.width = 200;
      cvs.height = 200;

      let ctx = cvs.getContext('2d');
      ctx.font = '20px Georgia';
      ctx.fillStyle = '#ff0000';
      ctx.textBaseline = 'top';
      //ctx.fillRect(0, 0, 100, 100);
      ctx.fillText(this.text, 0, 0);
      this.texture = new Texture(cvs);
    }

    driver.setTransform(this.transform);
    driver.globalAlpha = this.alpha;
    driver.globalBlendMode = this.blendMode;

    //driver.drawTexture(t);

    // create canvas element  
    // get 2d context
    // new Texture(ctx)

    // TODO
    // create cache texture
    // draw to texture
    // save texture

    // driver.setTransform(this.transform);
    // driver.globalAlpha = this.alpha;
    // driver.globalBlendMode = this.blendMode;
    // driver.drawTexture(this.texture);
  }
}

/* @echo EXPORT */
class TextRendererCanvas extends TextRenderer {
  render(driver) {
    super.render(driver);

    driver.drawTexture(this.texture);
  }
}
