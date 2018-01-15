/* @echo EXPORT */
class GraphicsRendererCanvas extends GraphicsRenderer {
  constructor() {
    super();
    //this.mTexture 
  }

  render(driver) {
    if (this.dirty === DirtyFlag.CLEAN) {
      driver.drawTexture(this.texture);
      return;
    }

    let texture = new CanvasRenderTexture(this.bounds.width, this.bounds.height);
    const ctx = texture.renderTarget.context;
    const len = this.commands.length;

    for (let i = 0; i < len; i++) {
      const cmd = this.commands[i];


      switch (cmd.type) {
        case GraphicsCommandType.LINE: {
          this.__setLineStyle(cmd, ctx);

          ctx.beginPath();
          ctx.moveTo(cmd.data[0], cmd.data[1]);
          ctx.lineTo(cmd.data[2], cmd.data[3]);
          ctx.stroke();
          break;
        }
        case GraphicsCommandType.RECTANGLE: {
          ctx.beginPath();
          ctx.rect(cmd.data[0], cmd.data[1], cmd.data[2], cmd.data[3]);

          this.__setFillStyle(cmd, ctx);
          ctx.fill();

          this.__setLineStyle(cmd, ctx);
          ctx.stroke();
          
          break;
        }
        case GraphicsCommandType.CIRCLE: {
          ctx.beginPath();
          ctx.arc(cmd.data[0], cmd.data[1], cmd.data[2], 0, 2 * Math.PI);

          this.__setFillStyle(cmd, ctx);
          ctx.fill();

          this.__setLineStyle(cmd, ctx);
          ctx.stroke();
          break;
        }

        default:
          Debug.error('Unsupported canvas command.');
          break;
      }
    }

    this.texture = texture;
    driver.drawTexture(texture);
  }

  get isRenderable() {
    return this.commands.length > 0;
  }

  __setLineStyle(cmd, ctx) {
    ctx.lineWidth = cmd.lineWidth;
    ctx.strokeStyle = VideoNullDriver.hexColorToString(cmd.lineColor);
    ctx.globalAlpha = cmd.lineAlpha * this.alpha;
  }

  __setFillStyle(cmd, ctx) {
    ctx.globalAlpha = cmd.fillAlpha * this.alpha;
    ctx.fillStyle = VideoNullDriver.hexColorToString(cmd.fillColor);
  }
}
