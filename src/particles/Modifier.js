/* @echo EXPORT */
class Modifier {
  constructor(isInitializer = true) {
    this.mIsInitializer = isInitializer;
  }

  preUpdate(dt) { }

  update(emitter, particle, dt) { }

  postUpdate(dt) { }

  get isInitializer() {
    return this.mIsInitializer;
  }
}

class VectorField extends Modifier {
  constructor(x, y, width, height, resolution = 0.1) {
    super(false);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.resolution = resolution;
    this.field = [];

    this.widthScaled = Math.floor(this.width * this.resolution);
    this.heightScaled = Math.floor(this.height * this.resolution);

    this.reset();
  }

  reset() {    
    this.field.splice(0, this.field.length); // why?

    for (var y = 0; y < this.heightScaled; y++)
      for (var x = 0; x < this.widthScaled; x++)
        this.field.push(new Vector(0, 0));
  }

  setData(fn) {
    for (let y = 0; y < this.heightScaled; y++) {
      for (let x = 0; x < this.widthScaled; x++) {
        const index = x + y * this.widthScaled;
        fn(x, y, this.field[index]);
      }
    }
  }

  getVectorAt(x, y) {
    x = Math.floor(x * this.resolution);
    y = Math.floor(y * this.resolution);
    let ix = ~~(x + y * this.widthScaled);

    if (ix < 0 || ix >= this.field.length)
      return null;

    return this.field[ix];
  }

  update(emitter, particle, dt) {
    let v = this.getVectorAt(particle.x, particle.y);

    if (v === null)
      return;

    particle.ax = v.x;
    particle.ay = v.y;
  }
}


// Acceleration (vel += acc * dt;)
// InitialPosition (box)
// InitialCiclePosition
// InitialGameObjectPosition
// InitialPolygonPosition
// InitialSpineBonePosition
// RotationOverLife
// RotationOverProperty
// InitialSize
// SizeOverLife
// vector field
// InitialVelocity
// VelocityOverLife/Property
