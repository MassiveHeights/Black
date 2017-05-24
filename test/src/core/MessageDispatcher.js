describe('MessageDispatcher', function() {
  let shared = new GameObject();

  describe('.constructor()', function () {
    it('requires no arguments', () => {
      assert.doesNotThrow( () => { new GameObject(); } );
    });
  });
});
