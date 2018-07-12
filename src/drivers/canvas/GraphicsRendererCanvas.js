/**
 * Renders `Graphics` objects on canvas.
 *
* @extends GraphicsRenderer
* @cat drivers.canvas
*/
/* @echo EXPORT */
class GraphicsRendererCanvas extends GraphicsRenderer {
  /**
   * Creates new instance of GraphicsRendererCanvas.
   */
  constructor() {
    super();
  }

  /** @inheritDoc */
  render(driver, session) {
    let gameObject = /** @type {Graphics} */ (this.gameObject);
    this.__drawCommandBuffer(driver);

    if (gameObject.mColor !== null && gameObject.mColor !== 0xFFFFFF) {
      driver.context.globalCompositeOperation = 'multiply';
      this.__drawCommandBuffer(driver, gameObject.mColor);
    }
  }

  __drawCommandBuffer(driver, color = null) {
    let gameObject = /** @type {Graphics} */ (this.gameObject);
    let commands = gameObject.mCommandQueue;

    const ctx = driver.context;
    const len = commands.length;
    const r = driver.renderScaleFactor;
    ctx.save();
    ctx.beginPath();

    for (let i = 0; i < len; i++) {
      const cmd = commands[i];

      switch (cmd.type) {
        case GraphicsCommandType.LINE_STYLE: {
          ctx.lineWidth = cmd.getNumber(0) * r;
          ctx.strokeStyle = ColorHelper.intToRGBA(color || cmd.getNumber(1), cmd.getNumber(2));
          ctx.lineCap = cmd.getString(3);
          ctx.lineJoin = cmd.getString(4);
          ctx.mitterLimit = cmd.getNumber(5);
          break;
        }

        case GraphicsCommandType.FILL_STYLE: {
          ctx.fillStyle = ColorHelper.intToRGBA(color || cmd.getNumber(0), cmd.getNumber(1));
          break;
        }

        case GraphicsCommandType.ARC: {
          ctx.arc(cmd.getNumber(0) * r, cmd.getNumber(1) * r, cmd.getNumber(2) * r, cmd.getNumber(3), cmd.getNumber(4), cmd.getBoolean(5));
          break;
        }

        case GraphicsCommandType.RECT: {
          ctx.rect(cmd.getNumber(0) * r, cmd.getNumber(1) * r, cmd.getNumber(2) * r, cmd.getNumber(3) * r);
          break;
        }
        case GraphicsCommandType.BEZIER_CURVE_TO: {
          ctx.bezierCurveTo(cmd.getNumber(0) * r, cmd.getNumber(1) * r, cmd.getNumber(2) * r, cmd.getNumber(3) * r, cmd.getNumber(4) * r, cmd.getNumber(5) * r);
          break;
        }
        case GraphicsCommandType.QUADRATIC_CURVE_TO: {
          ctx.quadraticCurveTo(cmd.getNumber(0) * r, cmd.getNumber(1) * r, cmd.getNumber(2) * r, cmd.getNumber(3) * r);
          break;
        }
        case GraphicsCommandType.BEGIN_PATH: {
          ctx.beginPath();
          break;
        }
        case GraphicsCommandType.CLOSE_PATH: {
          ctx.closePath();
          break;
        }
        case GraphicsCommandType.FILL: {
          ctx.fill();
          break;
        }

        case GraphicsCommandType.LINE_TO: {
          ctx.lineTo(cmd.getNumber(0) * r, cmd.getNumber(1) * r);
          break;
        }

        case GraphicsCommandType.MOVE_TO: {
          ctx.moveTo(cmd.getNumber(0) * r, cmd.getNumber(1) * r);
          break;
        }

        case GraphicsCommandType.STROKE: {
          ctx.stroke();
          break;
        }

        case GraphicsCommandType.BOUNDS: {
          break;
        }

        case GraphicsCommandType.TRANSFORM: {
          const v = /** @type {Matrix} */ (cmd.data[0]).value;
          ctx.setTransform(v[0], v[1], v[2], v[3], v[4], v[5]);
          break;
        }

        default:
          Debug.error(`Unsupported canvas command '${cmd.type}'.`);
          break;
      }
    }

    ctx.restore();
  }
}