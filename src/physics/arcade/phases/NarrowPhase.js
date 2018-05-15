class NarrowPhase extends Phase {
  update(pairs, changed) {
    for (let i = 0, l = pairs.length; i < l; i++)
      pairs[i].isColliding && pairs[i].test();
  }
}
