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
