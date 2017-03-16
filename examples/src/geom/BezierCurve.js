"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueueAtlas('atlas', 'atlas.png', 'atlas.json');

    // Pass on load complete handler and this for correct context
    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);

    // Add background sprite
    var bg = new Sprite('blueprint-landscape');
    this.view.addChild(bg);


    var heart = this.heart = new Sprite('heart');
    heart.alignPivot();
    heart.scaleX = heart.scaleY = 0.5;
    heart.rotation = Math.PI * 0.5;
    this.view.addChild(heart);

    this.start1 = new Vector(0, 400);
    this.cps1 = new Vector(0, 500);
    this.cpe1 = new Vector(200, 500);
    // this.end1 = new Vector(200, 400);
    this.start2 = new Vector(200, 400);
    this.cps2 = new Vector(200, 100);
    this.cpe2 = new Vector(500, 100);
    this.end2 = new Vector(480, 320);

    this.pointViews = [];
    for (let point of [this.start1, this.cps1, this.cpe1,
      this.start2, this.cps2, this.cpe2, this.end2]) {
      var sun = new Sprite('sun');
      sun.alignPivot();
      sun.scaleX = sun.scaleY = 0.1;
      this.pointViews.push(sun);
      this.view.addChild(sun);
    }
    this.resetPointViews();

    this.curve = new Curve();
    // this.curve.baked = true;
    this.resetCurve();

    this.t = 0;
    Input.on('pointerMove', this.onMove, this);
    Input.on('pointerDown', () => this.isDown = true, this);
    Input.on('pointerUp', () => this.isDown = false, this);
  }

  resetCurve() {
    this.curve.set(this.start1.x, this.start1.y, this.cps1.x, this.cps1.y, this.cpe1.x, this.cpe1.y,
      this.start2.x, this.start2.y, this.cps2.x, this.cps2.y, this.cpe2.x, this.cpe2.y, this.end2.x, this.end2.y)
  }

  resetPointViews() {
    let points = [this.start1, this.cps1, this.cpe1,
      this.start2, this.cps2, this.cpe2, this.end2];

    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      let pointView = this.pointViews[i];
      pointView.x = point.x;
      pointView.y = point.y;
    }
  }

  onMove() {
    if (!this.isDown) return;

    let p = this.view.globalToLocal(Input.pointerPosition);
    let nearest = this.start1;
    let minDistance = nearest.distance(p);
    let d;

    for (let point of [this.start1, this.cps1, this.cpe1,
      this.start2, this.cps2, this.cpe2, this.end2]) {
      if ((d = point.distance(p)) < minDistance) {
        nearest = point;
        minDistance = d;
      }
    }

    this.resetPointViews();
    nearest.copyFrom(p);
    this.resetCurve();
  }

  onPostUpdate(dt) {
    if (!this.heart) return;
    this.t = (this.t + dt) % 1;

    this.curve.interpolate(this.t, Vector.__cache);

    this.heart.x = Vector.__cache.x;
    this.heart.y = Vector.__cache.y;
  }
}

// Create and start engine
var black = new Black('container', MyGame, 'canvas');
black.start();
