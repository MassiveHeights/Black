"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    this.name = 'root';
  }

  onAdded() {
    var s1 = new GameObject();
    s1.name = 's1';

    var s2 = new GameObject();
    s2.name = 's2';

    var s3 = new GameObject();
    s3.name = 's3';

    var s31 = new GameObject();
    s31.name = 's31';

    this.addChild(s1);
    this.addChild(s2);
    this.addChild(s3);

    s3.addChild(s31);

    console.log(s1.root);
    console.log(s1.path);
    console.log(s31.path);

    this.on('noop', this.onNoop, undefined);
    s1.on('noop', this.onNoop, this);
    s2.on('noop', this.onNoop, this);
    s3.on('noop', this.onNoop, this);
    s31.on('noop', this.onNoop, this);

    let startTime = new Date().getTime();

    s31.sendMessage('noop', 'Hey!');

    this.wait(1);

    this.co(function*() {
      console.log('a');
      yield this.wait(0.1);

      console.log('b');
      yield this.wait(0.5);

      console.log('done');
    });

    this.co(this.gen);
  }

  *gen(){
    console.log('a');
    yield this.wait(3);

    console.log('b');
    yield this.wait(0.5);

    console.log('done');
  }

  co(gen, ctx = null) {
    var iter = gen.apply(ctx == null ? this : ctx);

    function step(it) {
      if (it.done)
        return;

      if (typeof it.value === 'function')
        it.value(x => step(iter.next(x)));
      else
        step(iter.next(it.value));
    }

    step(iter.next());
    console.log(iter);
    return iter;
  }

  wait(seconds = 1) {
    return cb => setTimeout(cb.bind(this, seconds * 1000), seconds * 1000);
  }

  onNoop(msg, text) {
    console.log('message received:', text);
  }
}

// Create and start engine
var black = new Black('container', MyGame, 'canvas');
black.start();
