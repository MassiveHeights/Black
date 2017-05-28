describe('MessageDispatcher', function () {
  class SampleComponent extends Component {
    onAdded() {
      this.post('added');
    }
  }

  let head = new GameObject();
  head.name = 'head';

  let nose = new GameObject();
  nose.name = 'nose';

  let body = new GameObject();
  body.name = 'body';

  class RootObject extends GameObject {
    constructor() {
      super();

      this.name = 'document';
      this.add(head, body);

      head.addChild(nose);
    }

    onAdded() {}
  }

  let black = new Black('container', RootObject, VideoNullDriver);
  black.start();

  let root = black.root;

  describe('#constructor', function () {
    it('Should create new instance', function () {
      assert.doesNotThrow(() => {
        new MessageDispatcher();
      });
    });
  });

  describe('#on', function () {
    it('Should add local listener', function () {
      let dis = new MessageDispatcher();
      dis.on('ready', x => {});

      assert.isDefined(dis.mListeners['ready']);
    });

    it('Should add global listener', function () {
      let dis = new MessageDispatcher();
      dis.on('ready@', x => {});
      assert.isDefined(MessageDispatcher.mGlobalHandlers['ready']);
    });
  });

  describe('#hasOn', function () {
    it('Should return True if listener exists', function () {
      let dis = new MessageDispatcher();
      dis.on('ready', x => {});

      assert.isTrue(dis.hasOn('ready'));
    });

    it('Should return False if listener is not exist', function () {
      let dis = new MessageDispatcher();
      dis.on('ready', x => {});

      assert.isFalse(dis.hasOn('reFakeady'));
    });

    it('Should return True if global (overheared) listener exists', function () {
      body.on('ready@*', x => {});
      assert.isTrue(body.hasOn('ready@*'));
    });

    it('Should return False if global (overheared) listener does not exists', function () {
      //body.on('missing@*', x => {});
      assert.isFalse(body.hasOn('missing@*'));
    });
  });

  describe('#post', function () {
    it('Should deliver local message', function (done) {
      let dis = new MessageDispatcher();
      dis.on('ready', x => {
        done();
      });
      dis.post('ready');
    });

    it('Should deliver local message with params', function (done) {
      let dis = new MessageDispatcher();
      dis.on('ready', (msg, arg0, arg1) => {
        assert.equal(arg0, 42);
        assert.equal(arg1, 14);
        head.removeOn('ready');
        done();
      });
      dis.post('ready', 42, 14);
    });

    it('Should deliver private message with given path mask', function (done) {
      root.on('shot', x => {
        assert.fail();
      });

      head.on('shot', x => {
        head.removeOn('shot');
        done();
      });

      root.post('shot@root/head');
    });

    it('Should deliver private message with given component mask', function (done) {
      root.on('shot', x => {
        assert.fail();
      });

      let c = head.addComponent(new SampleComponent());
      c.on('shot', x => {
        c.removeOn('shot');
        done();
      });

      root.post('shot@root/head#SampleComponent');
    });

    it('Should deliver private message with given pathMask', function (done) {
      head.on('shot', x => {
        done();
      });

      root.post('shot@root/head');
    });

    it('Should overhear any message', function (done) {
      head.on('ready@*', x => {
        head.removeOn('ready@*');
        done();
      });

      body.post('ready');
    });

    it('Should deliver private message', function (done) {
      head.on('ready', x => {
        head.removeOn('ready');
        done();
      });

      body.post('ready@root/head');
    });

    it('Should bubble the message', function (done) {
      head.on('sniff', x => {
        head.removeOn('sniff');
        done();
      });

      nose.post('~sniff');
    });

    it('Should inverse bubble the message', function (done) {
      head.on('sniff', x => {
        nose.on('sniff', x => {
          head.removeOn('sniff');
          nose.removeOn('sniff');
          done();
        });
      });

      nose.post('~sniff@');
    });

  });

  after(function () {
    black.stop();
    black.dispose();
  });
});

/* NAME DEFINITION TABLE
           
LOCAL - will be only invoked on this
DIRECT - 
GLOBAL - 
PRIVATE - if path mask applied
OVERHEARED
*/


// EXAMPLES:
//  this.post('clicked', data); // Sends to all listeners of this
//  this.post('~clicked', data); // Sends to all listeners of this and to each parent of this object
//  this.post('clicked@mySprite'); // From top to bottom looking for mySprite
//  this.post('~clicked@mySprite'); // From this to top over each parent looks for mySprite
//  this.post('clicked@mySprite#ColliderComponent'); // message to a component with type of ColliderComponent
//  this.post('~clicked@mySprite#ColliderComponent');

// DIRECTIONS
// clicked - none, direct
// ~clicked - up, bubbling
// clicked@ - down starting from root, with no filter to everyone
// clicked@mySpriter - down with 'mySprite' filter
// ~clicked@ - inversed bubbling starting from the root, ending at this