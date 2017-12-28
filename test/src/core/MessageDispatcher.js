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
      this.addChild(body);
      body.addChild(head);
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
      assert.isDefined(MessageDispatcher.mOverheardHandlers['ready']);
    });``
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

      assert.isFalse(dis.hasOn('fakeReady'));
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

  // describe('#cancel', function () {
  //   it('Should stop propagation', function () {
  //     body.on('sniff', x => {
  //       console.log('body sniff');
  //     });

  //     head.on('sniff', x => {
  //       console.log('head sniff');
  //       x.cancel();
  //     });

  //     nose.post('~sniff');
  //   });
  // });

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

      root.post('shot@root/body/head');
    });

    it('Should deliver top-to-bottom private message to all components by given component type name', function (done) {
      root.on('shot', x => {
        assert.fail();
      });

      let c = head.addComponent(new SampleComponent());
      c.on('shot', x => {
        c.removeOn('shot');
        done();
      });

      root.post('shot@*#SampleComponent');
    });

    it('Should deliver regular message to all components by given component type name', function (done) {
      root.on('shot', x => {
        assert.fail();
      });

      let c = head.addComponent(new SampleComponent());
      c.on('shot', x => {
        c.removeOn('shot');
        done();
      });
      
      root.post('shot@*#SampleComponent');
    });

    it('Should deliver inverse bubbled message to all components by given component type name', function (done) {
      root.on('shot', x => {
        assert.fail();
      });

      let c = head.addComponent(new SampleComponent());
      c.on('shot', x => {
        c.removeOn('shot');
        done();
      });

      nose.post('~shot@*#SampleComponent');
    });

    it('Should deliver regular message with given path and component mask', function (done) {
      root.on('shot', x => {
        assert.fail();
      });

      let c = head.addComponent(new SampleComponent());
      c.on('shot', x => {
        c.removeOn('shot');
        done();
      });

      root.post('shot@root/body/head#SampleComponent');
    });

    it('Should deliver private message with given pathMask', function (done) {
      head.on('shot', x => {
        done();
      });

      root.post('shot@root/body/head');
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

      body.post('ready@root/body/head');
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
           
REGULAR
DIRECTED
OVERHEARD

If path is specified then message is directed else regular

'clicked' - a regular message. just invoke.

'clicked@' - regular top 2 bottom
'clicked@mySprite' - directed message

'~clicked' - regular bubbled message
'~clicked@' - regular inverse bubbled message
'~clicked@mySprite' - directed inverse bubbled message

'~clicked@mySprite#SampleComponent' - directed inverse bubbled message to a components
'clicked@#SampleComponent' - directed to components
'~clicked@#SampleComponent' - inverse bubbled to components with name "SampleComponent"

'clicked@#*' - regular from top to bottom to all components
'clicked@#*' - regular from top to bottom to all components

'~clicked@#*' - IB to all components

'~clicked@#' - IB to all components - not legal
`clicked#SampleComponent' - not legal

'~clicked@`

<?BUBBLING><NAME>(<@><PATH>(#<COMPONENT>))

and 100 masks test...
mask will be applied onto message path split by /
*/
