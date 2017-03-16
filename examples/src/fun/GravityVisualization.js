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

    this.gravitySources = [];
  }

  onAssetsLoadded() {
    let mr = new MRComponent(960, 640);
    this.view = new GameObject();
    this.view.addComponent(mr);
    this.addChild(this.view);

    //Add background sprite
    let bg = new Sprite('blueprint-landscape');
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
    this.vectorFieldCellSize = 60;
    this.vectorFieldOffsetX = 20;
    this.vectorFieldOffsetY = 50;
    this.vectorFieldMinScale = 0.1;
    this.vectorFieldMaxScale = 2;

    //Uncomment to increase density
    //this.vectorFieldWidth *= 2;
    //this.vectorFieldHeight *= 2;
    //this.vectorFieldCellSize /= 2;

    let posX = this.vectorFieldOffsetX;
    let posY = this.vectorFieldOffsetY;

    for (let h = 0; h < this.vectorFieldHeight; h++) {
      for (let w = 0; w < this.vectorFieldWidth; w++) {
        let arrow = new Sprite('arrow32');
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
    for (let h = 0; h < this.vectorFieldHeight; h++) {
      for (let w = 0; w < this.vectorFieldWidth; w++) {
        let arrow = this.vectorField[w + '_' + h];
        let posX = this.vectorFieldOffsetX + w * this.vectorFieldCellSize;
        let posY = this.vectorFieldOffsetY + h * this.vectorFieldCellSize;
        let vector = this.calculateFieldAtPosition(posX, posY);
        this.updateArrrow(arrow, vector);
      }
    }
  }

  updateArrrow(arrowObject, vector) {
    arrowObject.rotation = Math.atan2(vector.y, vector.x) + (Math.PI / 2.0);
    let scale = vector.length();
    if (scale > this.vectorFieldMaxScale) {
      scale = this.vectorFieldMaxScale;
    }
    if (scale < this.vectorFieldMinScale) {
      scale = this.vectorFieldMinScale;
    }
    arrowObject.scaleY = scale;
  }

  calculateFieldAtPosition(posX, posY) {

    let resultVector = new Vector();

    for (let i = 0; i < this.gravitySources.length; i++) {
      let source = this.gravitySources[i];

      let sourcePos = new Vector(source.x, source.y);
      let pointPos = new Vector(posX, posY);

      let sourceVector = sourcePos.subtract(pointPos);
      let distanceToSource = sourceVector.length();
      let magnitude = this.calculateMagnitudeFromDistance(distanceToSource);
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
    let gs = new Sprite('heart');
    gs.x = x;
    gs.y = y;
    this.view.addChild(gs);
    gs.alignPivot();
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
let black = new Black('container', MyGame, 'dom');
black.start();
