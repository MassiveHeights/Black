/* @echo EXPORT */
class SequencerTrack {
  constructor(name) {
    this.mName = name;
    this.mKeys = new LinkedList(SequencerKey.comparer);
  }

  // todo: do not allow same key on multiple tracks
  // isOnTrack boolean
  addKey(key) {
    this.mKeys.insert(key);
    return key;
  }

  removeKey(key) {
  }

  getKeyAt(index) {
  }

  update(dt, gameObject, position, keyA, keyB) {
  }

  switchNode(node, position) {
    return null;
  }

  findNode(position) {
    if (this.mKeys.head === null)
      return null;

    let best = this.mKeys.head;
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

  get duration() {
    return this.mKeys.tail.data.time;
  }
}