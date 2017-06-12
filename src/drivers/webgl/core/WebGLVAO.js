const attribTypeMap = {
  [WebGLConstants.FLOAT]            : {size: 1},
  [WebGLConstants.FLOAT_VEC2]       : {size: 2},
  [WebGLConstants.FLOAT_VEC3]       : {size: 3},
  [WebGLConstants.FLOAT_VEC4]       : {size: 4},
  [WebGLConstants.INT]              : {size: 1},
  [WebGLConstants.INT_VEC2]         : {size: 2},
  [WebGLConstants.INT_VEC3]         : {size: 3},
  [WebGLConstants.INT_VEC4]         : {size: 4},
  [WebGLConstants.UNSIGNED_INT]     : {size: 1},
  [WebGLConstants.UNSIGNED_INT_VEC2]: {size: 2},
  [WebGLConstants.UNSIGNED_INT_VEC3]: {size: 3},
  [WebGLConstants.UNSIGNED_INT_VEC4]: {size: 4},
  [WebGLConstants.BOOL]             : {size: 1},
  [WebGLConstants.BOOL_VEC2]        : {size: 2},
  [WebGLConstants.BOOL_VEC3]        : {size: 3},
  [WebGLConstants.BOOL_VEC4]        : {size: 4},
  // [WebGLConstants.FLOAT_MAT2]       : {size: 4, setter: matAttribSetter, count: 2},
  // [WebGLConstants.FLOAT_MAT3]       : {size: 9, setter: matAttribSetter, count: 3},
  // [WebGLConstants.FLOAT_MAT4]       : {size: 16, setter: matAttribSetter, count: 4}
};

/* @echo EXPORT */
class WebGLVAO {
  constructor(programInfo, attributesInfo) {
    const gl = programInfo.gl;
    const views = {};
    this.mBuffer = new ArrayBuffer(65532/* * this.mStride*/);

    const createSetter = attribInfo => {
      const view = views[attribInfo.Type.name] = views[attribInfo.Type.name] || new attribInfo.Type(this.mBuffer);
      const BYTES_PER_ELEMENT = view.BYTES_PER_ELEMENT;

      if (attribInfo.size === 1) {
        Object.defineProperty(this, attribInfo.name, {
          set: v => view[(attribInfo.offset + this.mBatchOffsetInBytes) / BYTES_PER_ELEMENT] = v
        });
      } else {
        this[attribInfo.name] = [];

        for (let i = 0; i < attribInfo.size; i++) {
          Object.defineProperty(this[attribInfo.name], i.toString(), {
            set: v => view[(attribInfo.offset + this.mBatchOffsetInBytes) / BYTES_PER_ELEMENT + i] = v
          });
        }
      }
    };


    let offset = 0;
    const program = programInfo.program;
    const attribsAmount = gl.getProgramParameter(programInfo.program, gl.ACTIVE_ATTRIBUTES);

    for (let i = 0; i < attribsAmount; i++) {
      const attrib = gl.getActiveAttrib(program, i);
      const name = attrib.name;
      const type = attrib.type;

      const attribInfo = attributesInfo[name] = attributesInfo[name] || {Type: Float32Array, normalize: false, type: gl.FLOAT};
      attribInfo.location = gl.getAttribLocation(program, name);
      attribInfo.size = attribTypeMap[type].size;
      attribInfo.name = name;

      offset += offset % attribInfo.Type.BYTES_PER_ELEMENT;
      attribInfo.offset = offset;
      offset += attribInfo.size * attribInfo.Type.BYTES_PER_ELEMENT;

      createSetter(attribInfo);
    }

    let mod = offset % 4;
    this.mStride = offset + (mod ? 4 - mod : 0);
    this.mBatchOffsetInBytes = 0;
    
    let infos = Object.values(attributesInfo);
    for (let i = 0, l = infos.length; i < l; i++) {
      const info = infos[i];
      gl.vertexAttribPointer(info.location, info.size, info.type, info.normalize, this.mStride, info.offset);
      gl.enableVertexAttribArray(info.location);
    }
  }

  nextVertex() {
    this.mBatchOffsetInBytes += this.mStride;
  }

  get data() {
    return this.mBuffer.slice(0, this.mBatchOffsetInBytes);
  }

  get countForElementsDraw() {
    return this.mBatchOffsetInBytes / this.mStride * 6 / 4 - 2;
  }

  get countForArraysDraw() {
    return this.mBatchOffsetInBytes / this.mStride;
  }

  clear() {
    this.mBatchOffsetInBytes = 0;
  }
}
