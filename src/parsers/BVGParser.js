const pathCmds = {
  MOVETO     : 'M',
  MOVETO_REL : 'm',
  LINETO     : 'L',
  LINETO_REL : 'l',
  VLINE      : 'V',
  VLINE_REL  : 'v',
  HLINE      : 'H',
  HLINE_REL  : 'h',
  CURVE      : 'C',
  CURVE_REL  : 'c',
  SCURVE     : 'S',
  SCURVE_REL : 's',
  QCURVE     : 'Q',
  QCURVE_REL : 'q',
  SQCURVE    : 'T',
  SQCURVE_REL: 't',
  ARC        : 'A',
  ARC_REL    : 'a',
  CLOSE_PATH : 'Z',
};

const shapeCmds = {
  RECT    : 'r',
  CIRCLE  : 'c',
  ELLIPSE : 'e',
  LINE    : 'l',
  POLYLINE: 's',
  PATH    : 'p',
  POLYGON : 'g',
  CLIPPING: 'm',
};

/**
 * Black Vector Graphics parser.
 * Creates GraphicsData for Graphics from BVG format.
 *
 * @cat parsers
 * @extends ParserBase
 */

/* @echo EXPORT */
class BVGParser extends ParserBase {

  /**
   * @inheritDoc
   *
   * @return {GraphicsData} Data for Graphics renderer
   */
  parse(data) {
    super.parse(data);

    return this.__traverse(data, this.__parseStyles(), new GraphicsData(), new BVGStyle());
  }

  /**
   * Recursively goes through children nodes and builds final GraphicsData.
   *
   * @private
   * @param {Object} node BVG node.
   * @param {Array<BVGStyle>} styles Parsed BVG styles.
   * @param {GraphicsData} parent Parent node.
   * @param {BVGStyle} parentStyle Style for inheritance.
   *
   * @returns {GraphicsData} Parsed data root.
   */
  __traverse(node, styles, parent, parentStyle) {
    const graphicsData = new GraphicsData();
    let style = parentStyle.clone();
    parent.mNodes.push(graphicsData);

    if (node.id) {
      graphicsData.name = node.id;
    }

    if (node.t) {
      const x = node.t[0] || 0;
      const y = node.t[1] || 0;
      const sx = node.t[2] || 1;
      const sy = node.t[3] || 1;
      const px = node.t[5] || 0;
      const py = node.t[6] || 0;

      graphicsData.mTransform.rotate(node.t[4] || 0);
      graphicsData.mTransform.scale(sx, sy);
      graphicsData.mTransform.skew(node.t[7] || 0, node.t[8] || 0);

      graphicsData.mTransform.data[4] = x + px / sx;
      graphicsData.mTransform.data[5] = y + py / sy;

      graphicsData.mPivotX = px;
      graphicsData.mPivotY = py;
    }

    if (node.cmds) {
      const cmds = node.cmds.split('$').filter(v => v).reverse();

      while (cmds.length > 0) {
        const cmd = cmds.pop();
        const name = cmd[0];
        const args = cmd.slice(1).split(',').map(v => Number(v));

        graphicsData.beginPath();

        switch (name) {
          case 'S':
            const newStyle = styles[args[0]];
            style = parentStyle.clone();
            style.merge(newStyle);
            style.compute();

            if (style.needsFill === true)
              graphicsData.fillStyle(style.fillColor, style.fillAlpha);

            if (style.needsStroke === true)
              graphicsData.lineStyle(style.lineWidth, style.lineColor,
                style.lineAlpha, style.lineCap, style.lineJoin, style.miterLimit);

            break;
          case shapeCmds.PATH:
            this.__drawPath(cmd, graphicsData);
            break;
          case shapeCmds.RECT: {
            const x = args[0];
            const y = args[1];
            const width = args[2];
            const height = args[3];
            const rx = (args[4] === undefined ? args[5] : args[4]) || 0;
            const ry = (args[5] === undefined ? args[4] : args[5]) || 0;

            if (rx !== 0 && ry !== 0) {
              graphicsData.moveTo(x, y + ry);
              graphicsData.quadraticCurveTo(x, y, x + rx, y);
              graphicsData.lineTo(x + width - rx, y);
              graphicsData.quadraticCurveTo(x + width, y, x + width, y + ry);
              graphicsData.lineTo(x + width, y + height - ry);
              graphicsData.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
              graphicsData.lineTo(x + rx, y + height);
              graphicsData.quadraticCurveTo(x, y + height, x, y + height - ry);
              graphicsData.closePath();
            } else {
              graphicsData.rect(args[0], args[1], args[2], args[3]);
            }

            break;
          }
          case shapeCmds.CIRCLE:
            graphicsData.circle(args[0], args[1], args[2]);
            break;
          case shapeCmds.ELLIPSE:
            const x = args[0];
            const y = args[1];
            const rx = args[2];
            const ry = args[3];

            const curves = [
              ...this.__arcToBezier(x - rx, y, rx, ry, 0, 0, 0, x + rx, y),
              ...this.__arcToBezier(x + rx, y, rx, ry, 0, 0, 0, x - rx, y),
            ];

            graphicsData.moveTo(x - rx, y);

            for (let i = 0, l = curves.length; i < l; i++) {
              const c = curves[i];
              graphicsData.bezierCurveTo(c[2], c[3], c[4], c[5], c[6], c[7]);
            }

            // graphics.moveTo(x, y);
            break;
          case shapeCmds.LINE:
            const x1 = args[0];
            const y1 = args[1];
            const x2 = args[2];
            const y2 = args[3];

            graphicsData.moveTo(x1, y1);
            graphicsData.lineTo(x2, y2);
            break;
          case shapeCmds.POLYLINE:
          case shapeCmds.POLYGON:
            const points = cmd.slice(1).split(',');
            graphicsData.moveTo(points[0], points[1]);

            for (let i = 2, l = points.length; i < l; i += 2) {
              graphicsData.lineTo(points[i], points[i + 1]);
            }

            name === shapeCmds.POLYGON && graphicsData.closePath();
            break;
          default:
            break;
        }

        if (style.needsFill === true)
          graphicsData.fill(style.fillRule);

        if (style.needsStroke === true) {
          graphicsData.setLineDash(style.lineDash);
          graphicsData.stroke();
        }
      }
    }

    if (node.nodes) {
      node.nodes.forEach(c => {
        this.__traverse(c, styles, graphicsData, style);
      });
    }

    return graphicsData;
  }

  /**
   * BVG styles parser.
   *
   * @private
   *
   * @returns {Array<BVGStyle>|undefined} Parsed data styles.
   */
  __parseStyles() {
    const obj = this.data;

    if (!obj.styles)
      return;

    return obj.styles.map(s => {
      const style = {};
      const props = s.split(' ');

      props.forEach(p => {
        const cmd = p[0];
        style[cmd] = p.slice(1);
      });

      return style;
    });
  }

  /**
   * BVG path data parser.
   *
   * @private
   * @params {string} data Path data attribute value
   * @params {GraphicsData} graphicsData Graphics data to store parsed values to.
   *
   * @returns {Array<BVGStyle>} Parsed data styles.
   */
  __drawPath(data, graphicsData) {
    const values = [];

    data
      .split(',')
      .map(item => {
        while (item.length !== 0) {
          const arg = parseFloat(item);

          if (isNaN(arg)) {
            values.push(item.charAt(0));
            item = item.slice(1);
          } else {
            values.push(arg);

            for (let i = 1; true; i++) {
              if (parseFloat(item.slice(0, i)) === arg) {
                item = item.slice(i);
                break;
              }
            }
          }
        }
      });

    values.reverse();

    // Context position
    let x = 0;
    let y = 0;

    // Path start position, to return on close path
    let mx = 0;
    let my = 0;

    // Bezier curve control point 1 position, to draw next smoothed bezier curve
    let bcx = 0;
    let bcy = 0;

    // Quadratic curve control point 1 position, to draw next smoothed quadratic curve
    let qcx = 0;
    let qcy = 0;

    // Store last command
    let prevValue = '';

    // 0 for absolute path and x, y for relative
    let relX = 0;
    let relY = 0;

    while (values.length !== 0) {
      const last = values[values.length - 1];
      const v = last === last.toString() ? values.pop() : prevValue;
      prevValue = v;
      relX = relY = 0;

      if (v === v.toLowerCase()) {
        relX = x;
        relY = y;
      }

      switch (v) {
        case pathCmds.MOVETO:
        case pathCmds.MOVETO_REL:
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphicsData.moveTo(x, y);
          mx = x;
          my = y;
          break;
        case pathCmds.LINETO:
        case pathCmds.LINETO_REL:
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphicsData.lineTo(x, y);
          break;
        case pathCmds.VLINE:
        case pathCmds.VLINE_REL:
          y = values.pop() + relY;
          graphicsData.lineTo(x, y);
          break;
        case pathCmds.HLINE:
        case pathCmds.HLINE_REL:
          x = values.pop() + relX;
          graphicsData.lineTo(x, y);
          break;
        case pathCmds.CURVE:
        case pathCmds.CURVE_REL: {
          const cp1x = values.pop() + relX;
          const cp1y = values.pop() + relY;
          const cp2x = values.pop() + relX;
          const cp2y = values.pop() + relY;
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphicsData.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
          bcx = x * 2 - cp2x;
          bcy = y * 2 - cp2y;
          break;
        }
        case pathCmds.SCURVE:
        case pathCmds.SCURVE_REL: {
          const cp2x = values.pop() + relX;
          const cp2y = values.pop() + relY;
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphicsData.bezierCurveTo(bcx, bcy, cp2x, cp2y, x, y);
          bcx = x * 2 - cp2x;
          bcy = y * 2 - cp2y;
          break;
        }
        case pathCmds.QCURVE:
        case pathCmds.QCURVE_REL: {
          const cpx = values.pop() + relX;
          const cpy = values.pop() + relY;
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphicsData.quadraticCurveTo(cpx, cpy, x, y);
          qcx = x * 2 - cpx;
          qcy = y * 2 - cpy;
          break;
        }
        case pathCmds.SQCURVE:
        case pathCmds.SQCURVE_REL: {
          const cpx = values.pop();
          const cpy = values.pop();
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphicsData.quadraticCurveTo(cpx, cpy, x, y);
          qcx = x * 2 - cpx;
          qcy = y * 2 - cpy;
          break;
        }
        case pathCmds.ARC:
        case pathCmds.ARC_REL: {
          const px = x;
          const py = y;
          const rx = values.pop();
          const ry = values.pop();
          const xAxisRotation = values.pop();
          const largeArcFlag = values.pop();
          const sweepFlag = values.pop();
          x = values.pop() + relX;
          y = values.pop() + relY;

          const curves = this.__arcToBezier(px, py, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y);

          if (!curves) break;

          for (let i = 0, l = curves.length; i < l; i++) {
            const c = curves[i];
            graphicsData.bezierCurveTo(c[2], c[3], c[4], c[5], c[6], c[7]);
          }

          break;
        }
        case pathCmds.CLOSE_PATH:
          graphicsData.closePath();
          x = mx;
          y = my;
          break;
      }

      if (v !== pathCmds.CURVE && v !== pathCmds.CURVE_REL && v !== pathCmds.SCURVE && v !== pathCmds.SCURVE_REL) {
        bcx = x;
        bcy = y;
      }

      if (v !== pathCmds.QCURVE && v !== pathCmds.QCURVE_REL && v !== pathCmds.SQCURVE && v !== pathCmds.SQCURVE_REL) {
        qcx = x;
        qcy = y;
      }
    }
  }

  // ARC TO BEZIER START
  /**
   * Approximate curve corner. Single bezier shouldn't be longer than 90 degrees.
   *
   * @private
   * @params {number} theta Start angle.
   * @params {number} deltaTheta Angle from start to end.
   *
   * @returns {Array<number>} Center.
   */
  __approxUnitArc(theta, deltaTheta) {
    const alpha = 4 / 3 * Math.tan(deltaTheta / 4);
    const x1 = Math.cos(theta);
    const y1 = Math.sin(theta);
    const x2 = Math.cos(theta + deltaTheta);
    const y2 = Math.sin(theta + deltaTheta);

    return [
      x1, y1,
      x1 - y1 * alpha, y1 + x1 * alpha,
      x2 + y2 * alpha, y2 - x2 * alpha,
      x2, y2,
    ];
  }

  __vectorAngle(ux, uy, vx, vy) {
    const sign = (ux * vy - uy * vx < 0) ? -1 : 1;
    const dot = MathEx.clamp(ux * vx + uy * vy, -1, 1);

    return sign * Math.acos(dot);
  }

  /**
   * Find arc center.
   *
   * @private
   * @params {number} x1 Context current position x.
   * @params {number} y1 Context current position y.
   * @params {number} x2 Context target (next) position x.
   * @params {number} y2 Context target (next) position y.
   * @params {number} fa Flag to determine which arc to draw.
   * @params {number} fs Another flag to determine which arc to draw.
   * @params {number} rx Arc radius x.
   * @params {number} ry Arc radius y.
   * @params {number} sinPhi Sin of x axis rotation.
   * @params {number} cosPhi Cos of x axis rotation.
   *
   * @returns {Array<number>} Center.
   */
  __getArcCenter(x1, y1, x2, y2, fa, fs, rx, ry, sinPhi, cosPhi) {
    const x1p = cosPhi * (x1 - x2) / 2 + sinPhi * (y1 - y2) / 2;
    const y1p = -sinPhi * (x1 - x2) / 2 + cosPhi * (y1 - y2) / 2;

    const rxSq = rx * rx;
    const rySq = ry * ry;
    const x1pSq = x1p * x1p;
    const y1pSq = y1p * y1p;

    let radical = Math.max(0, (rxSq * rySq) - (rxSq * y1pSq) - (rySq * x1pSq));
    radical /= (rxSq * y1pSq) + (rySq * x1pSq);
    radical = Math.sqrt(radical) * (fa === fs ? -1 : 1);

    const cxp = radical * rx / ry * y1p;
    const cyp = radical * -ry / rx * x1p;

    const cx = cosPhi * cxp - sinPhi * cyp + (x1 + x2) / 2;
    const cy = sinPhi * cxp + cosPhi * cyp + (y1 + y2) / 2;

    const v1x = (x1p - cxp) / rx;
    const v1y = (y1p - cyp) / ry;
    const v2x = (-x1p - cxp) / rx;
    const v2y = (-y1p - cyp) / ry;

    const theta = this.__vectorAngle(1, 0, v1x, v1y);
    let deltaTheta = this.__vectorAngle(v1x, v1y, v2x, v2y);

    if (fs === 0 && deltaTheta > 0) {
      deltaTheta -= Math.PI * 2;
    }

    if (fs === 1 && deltaTheta < 0) {
      deltaTheta += Math.PI * 2;
    }

    return [cx, cy, theta, deltaTheta];
  }

  /**
   * BVG path data parser.
   *
   * @private
   * @params {number} px Context current position x.
   * @params {number} py Context current position y.
   * @params {number} rx Arc radius x.
   * @params {number} ry Arc radius y.
   * @params {number} xAxisRotation Rotation in degrees.
   * @params {number} largeFlag Flag to determine which arc to draw.
   * @params {number} sweepFlag Another flag to determine which arc to draw.
   * @params {number} x Context target (next) position x.
   * @params {number} y Context target (next) position y.
   *
   * @returns {Array<Array<number>>|undefined} Array of bezier curves attributes.
   */
  __arcToBezier(px, py, rx, ry, xAxisRotation, largeFlag, sweepFlag, x, y) {
    const sinPhi = Math.sin(xAxisRotation * Math.PI / 180);
    const cosPhi = Math.cos(xAxisRotation * Math.PI / 180);

    const x1p = cosPhi * (px - x) / 2 + sinPhi * (py - y) / 2;
    const y1p = -sinPhi * (px - x) / 2 + cosPhi * (py - y) / 2;

    if (x1p === 0 && y1p === 0 || rx === 0 || ry === 0)
      return;

    rx = Math.abs(rx);
    ry = Math.abs(ry);

    const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);

    if (lambda > 1) {
      const lambdaRt = Math.sqrt(lambda);
      rx *= lambdaRt;
      ry *= lambdaRt;
    }

    const center = this.__getArcCenter(px, py, x, y, largeFlag, sweepFlag, rx, ry, sinPhi, cosPhi);
    const curves = [];
    let theta = center[2];
    let deltaTheta = center[3];

    const segments = Math.max(Math.ceil(Math.abs(deltaTheta) / (Math.PI * 0.5)), 1);
    deltaTheta /= segments;

    for (let i = 0; i < segments; i++) {
      curves.push(this.__approxUnitArc(theta, deltaTheta));
      theta += deltaTheta;
    }

    return curves.map(function (curve) {
      for (let i = 0; i < curve.length; i += 2) {
        const x = curve[i] * rx;
        const y = curve[i + 1] * ry;
        const xp = cosPhi * x - sinPhi * y;
        const yp = sinPhi * x + cosPhi * y;

        curve[i] = xp + center[0];
        curve[i + 1] = yp + center[1];
      }

      return curve;
    });
  }
}
