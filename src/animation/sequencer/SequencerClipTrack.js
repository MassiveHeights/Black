/* @echo EXPORT */
class SequencerClipTrack extends SequencerTrack {
  constructor(name) {
    super(name);

    this.mStates = {};
  }

  getValue(dt, position, keyA, keyB, reversed) {
    if (position > this.duration)
      return;

    if (!keyA.isActiveOn(position))
      return;

    const objA = keyA.clip.update(dt, position - keyA.time, keyA, reversed);
    let resultingObj = objA;

    if (keyB !== this.mKeys.head.data && keyB.isActiveOn(position)) {
      const objB = keyB.clip.update(dt, position - keyB.time, keyB, reversed);
      const t = MathEx.mapRange(position, keyB.time, keyA.time + keyA.duration, 0, 1);
      resultingObj = this.blend(objA, objB, t);
    }

    return resultingObj;
  }

  applyObj(gameObject, propsObject) {
    for (let k in propsObject) {
      gameObject[k] = propsObject[k];
    }
  }

  blend(objA, objB, t) {
    for (let k in objA)
      if (k in objB)
        objA[k] = MathEx.lerp(objA[k], objB[k], t);

    return objA;
  }

  switchNode(node, position, toNext = true) {
    if (node === null)
      return null;

    if (toNext) {
      if (position >= node.data.time + node.data.duration)
        node = node.next;
    } else {
      if (position <= node.data.time)
        node = node.prev;
    }

    return node;
  }

  get duration() {
    return this.mKeys.tail.data.time + this.mKeys.tail.data.duration;
  }
}