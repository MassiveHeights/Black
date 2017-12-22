class GraphicsCommand {
  constructor(type, data, lineColor = 0, lineAlpha = 1, lineWidth = 0, fillColor = 0, fillAlpha = 1, caps = CapsStyle.NONE, joints = JointStyle.MITER, miterLimit = 3) {
    this.data = data;

    this.type = type;

    // stroke
    this.lineColor = lineColor;
    this.lineAlpha = lineAlpha;
    this.lineWidth = lineWidth;
    this.caps = caps;
    this.joints = joints;
    this.miterLimit = miterLimit;

    // fill
    this.fillColor = fillColor;
    this.fillAlpha = fillAlpha;
  }
}