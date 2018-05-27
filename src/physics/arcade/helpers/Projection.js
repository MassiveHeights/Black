class Projection {
  constructor() {
    this.axis = null;
    this.verticesA = null;
    this.verticesB = null;
    this.rangeA = new Range();
    this.rangeB = new Range();
    this.offset = 0;
  }

  set(verticesA, verticesB, axis) {
    this.verticesA = verticesA;
    this.verticesB = verticesB;
    this.axis = axis;
    this.refresh();
  }

  refresh() {
    Projection.project(this.verticesA, this.axis, this.rangeA);
    Projection.project(this.verticesB, this.axis, this.rangeB);
  }

  static project(points, axis, range) {
    let min = Number.MAX_VALUE;
    let max = -Number.MAX_VALUE;

    for (let i = 0, l = points.length; i < l; i++) {
      const dot = points[i].dot(axis);
      min = dot < min ? dot : min;
      max = dot > max ? dot : max;
    }

    range.min = min;
    range.max = max;
  }
}

class Range {
  constructor() {
    this.min = 0;
    this.max = 0;
  }
}
