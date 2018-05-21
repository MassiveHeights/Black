class NarrowPhase extends Phase {
  test(pairs) {
    for (let i = 0, l = pairs.length; i < l; i++)
      pairs[i].mInCollision && pairs[i].test();
  }
}
