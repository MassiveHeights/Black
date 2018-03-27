/* @echo EXPORT */
class LinkedList {
  constructor(comparer) {
    this.mComparer = comparer || LinkedList.defaultComparer;
    this.mHead = null;
    this.mTail = null;

    this.allowDuplicates = false;
  }

  insert(data) {
    let current = null;
    let next = null;
    let node = new LinkedListNode(data);

    if (this.mHead == null) {
      this.mHead = node;
      this.mHead.next = node;
      this.mHead.prev = node;
      this.mTail = this.mHead;
      return node;
    }

    let diff = this.mComparer(this.mHead.data, node.data);
    if (this.allowDuplicates == false && diff === 0)
      Debug.throw('Duplicates are not allowed.')

    if (diff > 0) {
      this.__insertBefore(node, this.mHead);
    } else {
      current = this.mHead;

      while (current !== this.mTail) {
        next = current.next;
        diff = this.mComparer(next.data, node.data);
        if (this.allowDuplicates == false && diff === 0)
          Debug.throw('Duplicates are not allowed.')

        if (this.mComparer(next.data, node.data) > 0)
          break;

        current = current.next;
      }
      this.__insertAfter(node, current);
    }

    if (this.mComparer(node.data, this.mHead.data) < 0)
      this.mHead = node;

    if (this.mComparer(node.data, this.mTail.data) > 0)
      this.mTail = node;

    return node;
  }

  remove(data) {
    let current = this.mHead;

    while (this.mComparer(current.data, data) !== 0) {
      current = current.next;

      if (current === this.mHead)
        return;
    }

    if (current === this.mHead) {
      this.mHead = current.next;
      this.mTail.next = this.mHead;
      this.mHead.prev = this.mTail;
    } else {
      current.prev.next = current.next;
    }

    if (current === this.mTail) {
      this.mTail = current.prev;
      this.mHead.prev = this.mTail;
      return (this.mTail.next = this.mHead);
    } else {
      return (current.next.prev = current.prev);
    }
  }

  find(data) {
    if (this.mHead === null)
      return null;

    let current = this.mHead;
    while (current.next !== this.mHead) {
      if (this.mComparer(current.data, data) === 0)
        return current;

      current = current.next;
    }
    return null;
  }

  __insertBefore(a, b) {
    if (b === this.mHead) {
      a.prev = this.mTail;
      this.mHead = a;
      this.mTail.next = this.mHead;
    } else {
      a.prev = b.prev;
      b.prev.next = a;
    }
    a.next = b;
    return b.prev = a;
  }

  __insertAfter(a, b) {
    if (b === this.mTail) {
      a.next = this.mHead;
      this.mTail = a;
      this.mHead.prev = this.mTail;
    } else {
      a.next = b.next;
      b.next.prev = a;
    }
    a.prev = b;
    return b.next = a;
  }

  get head() {
    return this.mHead;
  }

  get tail() {
    return this.mTail;
  }
}

LinkedList.defaultComparer = (a, b) => { return a - b; };

/* @echo EXPORT */
class LinkedListNode {
  constructor(data, prev, next) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}