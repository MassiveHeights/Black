"use strict";

// Define own game object
class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = new AssetManager();
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueue('img-atlas', 'atlas.png');
    this.assets.enqueue('json-atlas', 'atlas.json');
    this.assets.enqueue('arrow', 'arrow32.png');

    // Pass on load complete handler and this for correct context
    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();

    this.gravitySources = [];
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);

    let atlas = new AtlasTexture(this.assets.getAsset('img-atlas'), this.assets.getAsset('json-atlas'));

    var tBg = atlas.getTexture('blueprint-landscape');

    this.asset_Heart = atlas.getTexture('heart');
    this.asset_Arrow = this.assets.getAsset('arrow');

    //Add background sprite
    var bg = new Sprite(tBg);
    this.view.addChild(bg);

    //Register input event handlers
    Input.on('pointerDown', this.onDown, this);

    this.createVectorField();
    this.updateVectorField();
  }

  createVectorField() {
    this.vectorField = [];
    this.vectorFieldWidth = 16;
    this.vectorFieldHeight = 10;
    this.vectorFieldCellSize = 60
    this.vectorFieldOffsetX = 20;
    this.vectorFieldOffsetY = 50;
    this.vectorFieldMinScale = 0.1;
    this.vectorFieldMaxScale = 2;

    //Uncomment to increase density
    //this.vectorFieldWidth *= 2;
    //this.vectorFieldHeight *= 2;
    //this.vectorFieldCellSize /= 2;

    var posX = this.vectorFieldOffsetX;
    var posY = this.vectorFieldOffsetY;

    for (var h = 0; h < this.vectorFieldHeight; h++) {
      for (var w = 0; w < this.vectorFieldWidth; w++) {
        var arrow = new Sprite(this.asset_Arrow);
        arrow.x = posX;
        arrow.y = posY;
        arrow.pivotX = 16;
        arrow.pivotY = 32;

        this.view.addChild(arrow);
        this.vectorField[w + '_' + h] = arrow;

        posX += this.vectorFieldCellSize;
      }
      posY += this.vectorFieldCellSize;
      posX = this.vectorFieldOffsetX;
    }
  }

  updateVectorField() {
    for (var h = 0; h < this.vectorFieldHeight; h++) {
      for (var w = 0; w < this.vectorFieldWidth; w++) {
        var arrow = this.vectorField[w + '_' + h];
        var posX = this.vectorFieldOffsetX + w * this.vectorFieldCellSize;
        var posY = this.vectorFieldOffsetY + h * this.vectorFieldCellSize;
        var vector = this.calculateFieldAtPosition(posX, posY);
        this.updateArrrow(arrow, vector);
      }
    }
  }

  updateArrrow(arrowObject, vector) {
    arrowObject.rotation = Math.atan2(vector.y, vector.x) + (Math.PI / 2.0);
    var scale = vector.length();
    if (scale > this.vectorFieldMaxScale) {
      scale = this.vectorFieldMaxScale;
    }
    if (scale < this.vectorFieldMinScale) {
      scale = this.vectorFieldMinScale;
    }
    arrowObject.scaleY = scale;
  }

  calculateFieldAtPosition(posX, posY) {

    var resultVector = new Vector();

    for (var i = 0; i < this.gravitySources.length; i++) {
      var source = this.gravitySources[i];

      var sourcePos = new Vector(source.x, source.y);
      var pointPos = new Vector(posX, posY);

      var sourceVector = sourcePos.substract(pointPos);
      var distanceToSource = sourceVector.length();
      var magnitude = this.calculateMagnitudeFromDistance(distanceToSource);
      sourceVector.normalize();
      sourceVector.multiplyScalar(magnitude);

      resultVector.add(sourceVector);
    }

    return resultVector;
  }

  calculateMagnitudeFromDistance(distance) {
    return 100.0 / distance;
  }

  addGravitySource(x, y) {
    var gs = new Sprite(this.asset_Heart);
    gs.x = x;
    gs.y = y;
    this.view.addChild(gs);
    gs.center();
    this.gravitySources.push(gs);

  }

  onDown() {
    let p = this.view.globalToLocal(Input.pointerPosition);
    this.addGravitySource(p.x, p.y);
    this.updateVectorField();
  }

  onPostUpdate(dt) {
    if (!this.emitter)
      return;

    let p = this.view.globalToLocal(Input.pointerPosition);
    let dx = p.x - this.emitter.x;
    let dy = p.y - this.emitter.y;
    this.emitter.rotation = Math.atan2(dy, dx);
  }
}

// Create and start engine
var black = new Black('container', MyGame, 'dom');
black.start();
