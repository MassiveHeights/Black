/* @echo EXPORT */
class SequencerTrack {
  constructor(name) {
    this.mName = name;
    this.mKeys = new LinkedList(SequencerTrack.keyComparer);

    this.mKeyA = null;
    this.mKeyB = null;
  }

  addKey(key) {
    this.mKeys.insert(key);
    return key;
  }

  removeKey(key) {
  }

  getKeyAt(index) {
  }

  update(dt, gameObject, position, dirty) {
    // TODO: cache keys
    let node = this.findKey(position);

    if (node === null || node.next === null)
      return;

    let startNode = node;
    let endNode = node.next;

    if (endNode === this.mKeys.head)
      return;

    let startKey = startNode.data;
    let endKey = endNode.data;

    let t = MathEx.mapRange(position, startKey.time, endKey.time, 0, 1);
    if ((position + dt) - endKey.time > 0)
      t = 1;

    if (startKey.ease)
      t = startKey.ease(t);

    let value = MathEx.lerp(startKey.value, endKey.value, t);
    gameObject[this.mName] = value;
  }

  findKey(position) {
    if (this.mKeys.head === null)
      return null;

    let best = null;
    let current = this.mKeys.head;
    while (current.next !== this.mKeys.head) {
      if (position >= current.data.time)
        best = current;

      current = current.next;

      if (position >= current.data.time)
        best = current;
    }

    return best;
  }

  get keys() {
    return this.mKeys;
  }

  get name() {
    return this.mName;
  }
}

SequencerTrack.keyComparer = (a, b) => { return a.time - b.time; };