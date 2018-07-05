class ParserBase {
  constructor() {
    this.data = null;
  }

  parse(data) {
    this.data = data;
  }
}

class Style {
  constructor() {
    /*
    const CMD_STYLE_LINE = 'L';
    const CMD_STYLE_LINE_ALPHA = 'l';
    const CMD_STYLE_LINE_WIDTH = 'w';
    const CMD_STYLE_FILL = 'F';
    const CMD_STYLE_FILL_RULE = 'r';
    const CMD_STYLE_FILL_ALPHA = 'f';
    const CMD_STYLE_CAPS = 'c';
    const CMD_STYLE_JOINTS = 'j';
    const CMD_STYLE_MITER = 'm';
    const CMD_STYLE_ALPHA = 'a';
    */

    /*
    default values:
      this.L = 0;
      this.l = 1;
      this.w = 1;
      this.F = 0;
      this.f = 1;
      this.r = 1; // non zero
      this.c = 'r';
      this.j = 'r';
      this.m = 4;
      this.a = 1;
    */



    this.L = '-';
    this.l = 1;
    this.w = 1;
    this.F = 0;
    this.f = 1;
    this.r = 1; // non zero
    this.c = 'r';
    this.j = 'r';
    this.m = 4;
    this.a = 1;

    this.needsFill = true;
    this.needsStroke = true;

    this.fillColor = 0;
    this.fillAlpha = 1;

    this.lineColor = 0;
    this.lineAlpha = 1;
    this.lineWidth = 1;

    // this.L = null;
    // this.l = null;
    // this.w = null;
    // this.F = null;
    // this.f = null;
    // this.r = null; // non zero
    // this.c = null;
    // this.j = null;
    // this.m = null;
    // this.a = null;
  }

  merge(style) {
    if (style.F)
      this.F = style.F;

    if (style.L)
      this.L = style.L;

    if (style.w)
      this.w = style.w;

    if (style.l)
      this.l *= style.l;

    if (style.f)
      this.f *= style.f;
  }

  compute() {
    this.needsFill = this.F !== '-';

    if (this.needsFill)
      this.fillColor = parseInt(this.F, 16);

    this.lineWidth = +this.w;
    this.needsStroke = this.L !== '-' && this.lineWidth > 0;

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

class BSFParser extends ParserBase {
  constructor(name) {
    super();

    this.mName = name;

    this.mStyles = [];
    this.mGraphics = new Graphics();

    this.mCmds = null;
    this.mPathCmds = null;
  }

  parse(data) {
    super.parse(data);

    this.mStyles = this.__parseStyles();

    this.data.nodes.forEach(n => {
      let parentTransform = new Matrix();
      let parentStyle = new Style();

      this.__traverse(n, parentTransform, parentStyle)
    });
  }

  __traverse(node, parentTransform, parentStyle) {
    let transform = parentTransform.clone();
    let style = parentStyle.clone();
    let g = this.mGraphics;

    if (node.cmds) {
      this.mCmds = node.cmds.split(' ');

      while (this.mCmds.length > 0) {
        let cmd = this.mCmds.shift();
        let type = cmd[0] === '$' ? cmd.substr(0, 2) : cmd[0];

        g.beginPath();

        switch (type) {
          case '$S':
            let ix = this.getArg(cmd);
            let newStyle = this.mStyles[ix];
            style.merge(newStyle);
            style.compute();

            if (style.needsFill === true)
              g.fillStyle(style.fillColor, style.fillAlpha);

            if (style.needsStroke === true)
              g.lineStyle(style.lineWidth, style.lineColor, style.lineAlpha);

            break;
          case '$p':
          // remember last command
            let pathData = cmd.substr(2);
            this.mPathCmds = pathData.replace(/-/g, ' -').replace(/\B(?=[a-zA-Z])|,/g, ' ').split(' ');
            let ax = 0;
            let ay = 0;
            while (this.mPathCmds.length > 0) {
              let pc = this.mPathCmds.shift();
              let ct = pc[0];
              if (ct === 'M'){
                ax = this.getPathArg(pc);
                ay = this.getPathArg(0);
                this.mGraphics.moveTo(ax, ay);
              }
              if (ct === 's'){
                this.mGraphics.moveTo(this.getPathArg(pc), this.getPathArg(0));
              }
            }
            break;
          case '$T':
            transform = new Matrix(this.getArg(cmd), this.getArg(0), this.getArg(1), this.getArg(2), this.getArg(3), this.getArg(4));
            this.mGraphics.setTransform(transform);
            break;
          case '$r':
            this.mGraphics.rect(this.getArg(cmd), this.getArg(0), this.getArg(1), this.getArg(2));
            break;
          case '$c':
            this.mGraphics.circle(this.getArg(cmd), this.getArg(0), this.getArg(1));
            break;

          default:
            break;
        }

        if (style.needsFill === true)
          g.fill();

        if (style.needsStroke === true)
          g.stroke();
      }
    }

    if (!node.nodes)
      return;

    node.nodes.forEach(c => {
      this.__traverse(c, transform, style);
      g.setTransform(parentTransform);
    });
  }

  getArg(cmd) {
    return typeof cmd == 'number' ? +this.mCmds.shift() : +cmd.substring(cmd.startsWith('$') ? 2 : 1);
  }

  getPathArg(cmd) {
    return typeof cmd == 'number' ? +this.mPathCmds.shift() : +cmd.substring(1);
  }
  __parseStyles() {
    let obj = this.data;
    let out = [];

    if (!obj.styles)
      return;

    obj.styles.forEach(x => {
      const CMD_STYLE_LINE = 'L';
      const CMD_STYLE_LINE_ALPHA = 'l';
      const CMD_STYLE_LINE_WIDTH = 'w';
      const CMD_STYLE_FILL = 'F';
      const CMD_STYLE_FILL_RULE = 'r';
      const CMD_STYLE_FILL_ALPHA = 'f';
      const CMD_STYLE_CAPS = 'c';
      const CMD_STYLE_JOINTS = 'j';
      const CMD_STYLE_MITER = 'm';
      const CMD_STYLE_ALPHA = 'a';

      let style = {};
      let props = x.split(' ');
      props.forEach(p => {
        let cmd = p[0];
        let val = p.substring(1);
        style[cmd] = val;
      });

      out.push(style);
    });

    return out;
  }
}