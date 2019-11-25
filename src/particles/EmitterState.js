/**
 * Represents current state of the emitter.
 * @cat particles
 * @static
 * @constant
 * @enum {number}
 */
const EmitterState = {
  PENDING: 0,
  EMITTING: 1,
  PAUSED: 2,
  FINISHED: 3,
};

export { EmitterState };