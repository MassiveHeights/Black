/* @echo EXPORT */
class SpriteRendererWebGL extends Renderer {
  constructor() {
    super();

    //this.material = new Material();
    this.vertexData = [];
  }

  render() {
    // if (this.dirty == false)
    //   return;

  }

  refreshVertexData() {
    const vertexData = this.vertexData;
    const transform = this.transform.value;
    const a = transform[0];
    const b = transform[1];
    const c = transform[2];
    const d = transform[3];
    const tx = transform[4];
    const ty = transform[5];
    const texture = this.texture;
    const region = texture.mRegion;
    const w = region.width;
    const h = region.height;

    if (texture.isTrimmed) {
      const untrimmedRegion = texture.untrimmedRect;
      const left = untrimmedRegion.x;
      const top = untrimmedRegion.y;
      const right = left + w;
      const bottom = top + h;

      // left top
      vertexData[0] = a * left + c * top + tx;
      vertexData[1] = d * top + b * left + ty;

      // right top
      vertexData[2] = a * right + c * top + tx;
      vertexData[3] = d * top + b * right + ty;

      // left bottom
      vertexData[4] = a * left + c * bottom + tx;
      vertexData[5] = d * bottom + b * left + ty;

      // right bottom
      vertexData[6] = a * right + c * bottom + tx;
      vertexData[7] = d * bottom + b * right + ty;
    } else {

      // left top
      vertexData[0] = tx;
      vertexData[1] = ty;

      // right top
      vertexData[2] = a * w + tx;
      vertexData[3] = b * w + ty;

      // left bottom
      vertexData[4] = c * h + tx;
      vertexData[5] = d * h + ty;

      // right bottom
      vertexData[6] = a * w + c * h + tx;
      vertexData[7] = d * h + b * w + ty;
    }
  }
}
