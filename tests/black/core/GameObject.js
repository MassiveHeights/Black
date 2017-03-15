describe('GameObject', function() {
  describe('#constructor()', function () {
    it('requires no arguments', () => {
      assert.doesNotThrow( () => { new GameObject(); } );
    });
  });

  describe('#addChild(child)', function () {
    it('adds child to its children', () => {
      let a = new GameObject();
      let b = new GameObject();

      a.addChild(b);

      assert.equal(a.numChildren, 1, 'numChildren');
      assert.equal(a.parent, b, 'parent');
    });
  });

});
