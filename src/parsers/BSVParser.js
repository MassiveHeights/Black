const styleCmds = {
  LINE      : 'L',
  LINE_ALPHA: 'l',
  LINE_WIDTH: 'w',
  FILL      : 'F',
  FILL_RULE : 'r',
  FILL_ALPHA: 'f',
  CAPS      : 'c',
  JOINTS    : 'j',
  MITER     : 'm',
  ALPHA     : 'a',
};

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

class Style {
  constructor() {
    this.L = 0; // stroke color
    this.l = 1; // stroke alpha
    this.w = 1; // line width
    this.F = 0; // fill color
    this.f = 1; // fill alpha
    this.r = 1; // fill rule  {nonzero: 1, evenodd: 0}
    this.c = 'b'; // line cap {butt: 'b', round: 'r', square: 's'}
    this.j = 'm'; // line join {miter: 'm', round: 'r', bevel: 'b'}
    this.m = 4; // miter limit
    this.a = 1; // global alpha

    this.needsFill = false;
    this.needsStroke = false;

    this.fillColor = 0;
    this.fillAlpha = 1;

    this.lineColor = 0;
    this.lineAlpha = 1;
    this.lineWidth = 1;
  }

  merge(style) {
    if (style.hasOwnProperty('F'))
      this.F = style.F;

    if (style.hasOwnProperty('L'))
      this.L = style.L;

    if (style.hasOwnProperty('w'))
      this.w = style.w;

    if (style.hasOwnProperty('l'))
      this.l *= style.l;

    if (style.hasOwnProperty('f'))
      this.f *= style.f;
  }

  compute() {
    this.needsFill = !!this.F;

    if (this.needsFill)
      this.fillColor = parseInt(this.F, 16);

    this.lineWidth = +this.w;
    this.needsStroke = !!this.L && this.lineWidth > 0;

    if (this.needsStroke)
      this.lineColor = parseInt(this.L, 16);

    this.lineAlpha = this.l;
    this.fillAlpha = this.f;

    // this.fillAlpha = 1;
    // this.lineColor = 0;
    // this.lineAlpha = 1;
    // this.lineWidth = 1;
  }

  clone() {
    let s = new Style();
    s.L = this.L;
    s.l = this.l;
    s.w = this.w;
    s.F = this.F;
    s.f = this.f;
    s.r = this.r;
    s.c = this.c;
    s.j = this.j;
    s.m = this.m;
    s.a = this.a;
    return s;
  }
}

class BSVParser extends ParserBase {
  constructor(name) {
    super();

    this.mName = name;

    this.mStyles = [];
    this.mGraphics = new Graphics();
  }

  parse(data) {
    super.parse(data);

    this.mStyles = this.__parseStyles();
    this.__traverse(this.data, new Style(), this.mGraphics);
  }

  __traverse(node, parentStyle, graphics) {
    const style = parentStyle.clone();

    if (node.id || node.t) {
      const g = new Graphics();

      if (node.id) {
        g.name = node.id;
      }

      if (node.t) {
        g.x = node.t[0] || 0;
        g.y = node.t[1] || 0;
        g.scaleX = node.t[2] || 1;
        g.scaleY = node.t[3] || 1;
        g.rotation = node.t[4] || 0;
        g.mPivotX = node.t[5] || 0;
        g.mPivotY = node.t[6] || 0;
        g.mSkewX = node.t[7] || 0;
        g.mSkewY = node.t[8] || 0;

        g.x += g.mPivotX / g.scaleX;
        g.y += g.mPivotY / g.scaleY;
      }

      graphics.addChild(g);
      graphics = g;
    }

    if (node.cmds) {
      const cmds = node.cmds.split('$').filter(v => v).reverse();

      while (cmds.length > 0) {
        const cmd = cmds.pop();
        const name = cmd[0];
        const args = cmd.slice(1).split(',').map(v => Number(v));

        graphics.beginPath();

        switch (name) {
          case 'S':
            const newStyle = this.mStyles[args[0]];
            style.merge(newStyle);
            style.compute();

            if (style.needsFill === true)
              graphics.fillStyle(style.fillColor, style.fillAlpha);

            if (style.needsStroke === true)
              graphics.lineStyle(style.lineWidth, style.lineColor, style.lineAlpha);

            break;
          case shapeCmds.PATH:
            this.__drawPath(cmd, graphics);
            break;
          case shapeCmds.RECT:
            graphics.rect(args[0], args[1], args[2], args[3]);
            break;
          case shapeCmds.CIRCLE:
            graphics.circle(args[0], args[1], args[2]);
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

            graphics.moveTo(x - rx, y);

            for (let i = 0, l = curves.length; i < l; i++) {
              const c = curves[i];
              graphics.bezierCurveTo(c[2], c[3], c[4], c[5], c[6], c[7]);
            }

            // graphics.moveTo(x, y);
            break;
          case shapeCmds.LINE:
            const x1 = args[0];
            const y1 = args[1];
            const x2 = args[2];
            const y2 = args[3];

            graphics.moveTo(x1, y1);
            graphics.lineTo(x2, y2);
            break;
          case shapeCmds.POLYLINE:
          case shapeCmds.POLYGON:
            const points = cmd.slice(1).split(',');
            graphics.moveTo(points[0], points[1]);

            for (let i = 2, l = points.length; i < l; i += 2) {
              graphics.lineTo(points[i], points[i + 1]);
            }

            name === shapeCmds.POLYGON && graphics.closePath();
            break;
          default:
            break;
        }

        if (style.needsFill === true)
          graphics.fill();

        if (style.needsStroke === true)
          graphics.stroke();
      }
    }

    if (!node.nodes)
      return;

    node.nodes.forEach(c => {
      this.__traverse(c, style, graphics);
    });
  }

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

  // ARC TO BEZIER START
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

  // ARC TO BEZIER END

  __drawPath(data, graphics) {
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
          graphics.moveTo(x, y);
          mx = x;
          my = y;
          break;
        case pathCmds.LINETO:
        case pathCmds.LINETO_REL:
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphics.lineTo(x, y);
          break;
        case pathCmds.VLINE:
        case pathCmds.VLINE_REL:
          y = values.pop() + relY;
          graphics.lineTo(x, y);
          break;
        case pathCmds.HLINE:
        case pathCmds.HLINE_REL:
          x = values.pop() + relX;
          graphics.lineTo(x, y);
          break;
        case pathCmds.CURVE:
        case pathCmds.CURVE_REL: {
          const cp1x = values.pop() + relX;
          const cp1y = values.pop() + relY;
          const cp2x = values.pop() + relX;
          const cp2y = values.pop() + relY;
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphics.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
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
          graphics.bezierCurveTo(bcx, bcy, cp2x, cp2y, x, y);
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
          graphics.quadraticCurveTo(cpx, cpy, x, y);
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
          graphics.quadraticCurveTo(cpx, cpy, x, y);
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
            graphics.bezierCurveTo(c[2], c[3], c[4], c[5], c[6], c[7]);
          }

          break;
        }
        case pathCmds.CLOSE_PATH:
          graphics.closePath();
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
}
