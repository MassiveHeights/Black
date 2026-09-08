'use strict';

class MyGame extends GameObject {
  constructor() {
    super();
    
    
    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.NO_SCALE;

    const assets = new AssetManager();

    assets.enqueueImage('square', '/assets/examples/shape/square.png');
    assets.enqueueImage('circle', '/assets/examples/shape/circle.png');
    assets.enqueueImage('cross', '/assets/examples/shape/cross.png');

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    const arcade = Black.engine.getSystem(Arcade);
    arcade.boundsEnabled = true;

    this.android = this.createAndroid();
    this.cross = this.createCross();
    this.circle = this.createCircle();
    this.square = this.createSquare();

    this.graphics = new Graphics();
    this.add(this.graphics);
  }

  createAndroid() {
    const android = new Sprite();
    android.x = 300;
    this.add(android);

    const top = new Sprite('circle');
    top.y = -50;
    top.width = 100;
    top.height = 100;
    top.alignAnchor();
    android.add(top);

    const bottom = new Sprite('circle');
    bottom.y = 50;
    bottom.width = 100;
    bottom.height = 100;
    bottom.alignAnchor();
    android.add(bottom);

    const middle = new Sprite('square');
    middle.alignAnchor();
    android.add(middle);

    android.addComponent(new CircleCollider(0, -50, 50));
    android.addComponent(new CircleCollider(0, 50, 50));
    android.addComponent(new BoxCollider(-50, -50, 100, 100));
    android.addComponent(new RigidBody());
    android.body = android.getComponent(RigidBody);

    return android;
  }

  createCross() {
    const cross = new Sprite('cross');
    cross.x = 400;
    cross.rotation = Math.PI / 4;
    cross.alignAnchor();
    this.add(cross);

    cross.addComponent(new BoxCollider(-55, -16, 110, 32));
    cross.addComponent(new BoxCollider(-16, -55, 32, 110));
    cross.addComponent(new RigidBody());
    cross.body = cross.getComponent(RigidBody);

    return cross;
  }

  createCircle() {
    const circle = new Sprite('circle');
    circle.x = 500;
    circle.alignAnchor();
    this.add(circle);

    circle.addComponent(new CircleCollider(0, 0, 50));
    circle.addComponent(new RigidBody());
    circle.body = circle.getComponent(RigidBody);

    return circle;
  }

  createSquare() {
    const square = new Sprite('square');
    square.x = 600;
    square.alignAnchor();
    this.add(square);

    square.addComponent(new BoxCollider(-50, -50, 100, 100));
    square.addComponent(new RigidBody());
    square.body = square.getComponent(RigidBody);

    return square;
  }

  onUpdate() {
    if (!this.android)
      return;

    this.graphics.clear();

    if (!Black.input.isPointerDown)
      return;

    const pos = this.globalToLocal(Black.input.pointerPosition);
    this.android.body.forceX = (pos.x - this.android.x) * 10;
    this.android.body.forceY = (pos.y - this.android.y) * 10;

    this.graphics.lineStyle(2, 0xffffff);
    this.graphics.moveTo(this.android.x, this.android.y);
    this.graphics.lineTo(pos.x, pos.y);
    this.graphics.stroke();
  }
}

const engine = new Engine('game-container', MyGame, CanvasDriver, [Input, Arcade]);
engine.start();
