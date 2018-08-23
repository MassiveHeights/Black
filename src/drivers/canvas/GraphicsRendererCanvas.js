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

  /**
   * Prepare context to draw.
   *
   * @private
   * @param {VideoNullDriver} driver Driver to draw.
   * @param {number|null=} [color=null] Tint.
   *
   * @returns {BVGStyle} Created style.
   */
  __drawCommandBuffer(driver, color = null) {
    const gameObject = /** @type {Graphics} */ (this.gameObject);
    const ctx = driver.context;

    ctx.save();
    ctx.beginPath();

    const transform = Matrix.pool.get().copyFrom(gameObject.worldTransformation);
    transform.translate(-gameObject.mDataOffsetX, -gameObject.mDataOffsetY);

    this.__renderNode(driver, color, gameObject.mGraphicsData, transform);

    Matrix.pool.release(transform);
    ctx.restore();
  }

  /**
   * Recursively draws each node of GraphicsData.
   *
   * @private
   * @param {VideoNullDriver} driver Driver to draw.
   * @param {number} color Tint.
   * @param {GraphicsData} node Commands provider.
   * @param {Matrix} transform Graphics Data global transformation.
   *
   * @returns {BVGStyle} Created style.
   */
  __renderNode(driver, color, node, transform) {
    const commands = node.mCommandQueue;
    const ctx = driver.context;
    const len = commands.length;
    const r = driver.renderScaleFactor;
    const px = node.mPivotX;
    const py = node.mPivotY;

    transform = transform.clone().append(node.mTransform);
    driver.setTransform(transform);

    for (let i = 0; i < len; i++) {
      const cmd = commands[i];

      switch (cmd.type) {
        case GraphicsCommandType.LINE_STYLE: {
          ctx.lineWidth = cmd.getNumber(0) * r;
          ctx.strokeStyle = ColorHelper.intToRGBA(color === null ? cmd.getNumber(1) : color, cmd.getNumber(2));
          ctx.lineCap = cmd.getString(3);
          ctx.lineJoin = cmd.getString(4);
          ctx.miterLimit = cmd.getNumber(5);
          break;
        }

        case GraphicsCommandType.FILL_STYLE: {
          ctx.fillStyle = ColorHelper.intToRGBA(color === null ? cmd.getNumber(0) : color, cmd.getNumber(1));
          break;
        }

        case GraphicsCommandType.ARC: {
          ctx.arc(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py, cmd.getNumber(2) * r, cmd.getNumber(3), cmd.getNumber(4), cmd.getBoolean(5));
          break;
        }

        case GraphicsCommandType.RECT: {
          ctx.rect(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py, cmd.getNumber(2) * r, cmd.getNumber(3) * r);
          break;
        }
        case GraphicsCommandType.BEZIER_CURVE_TO: {
          ctx.bezierCurveTo(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py, cmd.getNumber(2) * r - px, cmd.getNumber(3) * r - py, cmd.getNumber(4) * r - px, cmd.getNumber(5) * r - py);
          break;
        }
        case GraphicsCommandType.QUADRATIC_CURVE_TO: {
          ctx.quadraticCurveTo(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py, cmd.getNumber(2) * r - px, cmd.getNumber(3) * r - py);
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
          ctx.fill(cmd.getBoolean(0) === true ? 'nonzero' : 'evenodd');
          break;
        }

        case GraphicsCommandType.LINE_TO: {
          ctx.lineTo(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py);
          break;
        }

        case GraphicsCommandType.MOVE_TO: {
          ctx.moveTo(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py);
          break;
        }

        case GraphicsCommandType.LINE_DASH: {
          ctx.setLineDash(cmd.getNumber(0));
          break;
        }

        case GraphicsCommandType.STROKE: {
          ctx.stroke();
          break;
        }

        case GraphicsCommandType.BOUNDS: {
          break;
        }

        default:
          Debug.error(`Unsupported canvas command '${cmd.type}'.`);
          break;
      }
    }

    for (let i = 0, l = node.mNodes.length; i < l; i++) {
      this.__renderNode(driver, color, node.mNodes[i], transform);
    }
  }
}
