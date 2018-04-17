/* @echo EXPORT */
class SequencerKeyTrack extends SequencerTrack {
  constructor(name) {
    super(name);
  }  

  getValue(dt, position, keyA, keyB, reversed) {
    if (position > this.duration)
      return null;

    if (position < keyA.time || position > keyB.time)
      return null;

    let t = MathEx.mapRange(position, keyA.time, keyB.time, 0, 1);

    if ((position + dt) - keyB.time > 0)
      t = 1;
    
    if (keyB.ease !== null)
      t = keyB.ease(t);

    return MathEx.lerp(keyA.value, keyB.value, t);
  }

  switchNode(node, position, toNext = true) {
    if (node === null)
      return null;

    if (toNext) {
      if (position >= node.next.data.time) {
        node = node.next;
      }
    } else {
      if (position < node.next.data.time) {
        node = node.prev;
      }
    }

    return node;
  }
}