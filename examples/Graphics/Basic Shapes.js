'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

    Black.stage.scaleMode = StageScaleMode.NO_SCALE;
    Black.stage.setSize(500, 500);
  }

  onAdded() {
    // Create new graphics instance
    let g = new Graphics();

    // rectangle
    g.beginPath();
    
    g.lineStyle(10, 0xf9b626);
    g.rect(this.stage.centerX - 100, this.stage.centerY - 100, 200, 200);
    g.stroke();

    // circle
    g.beginPath();
    g.lineStyle(10, 0xf0f0f0);
    g.circle(this.stage.centerX, this.stage.centerY, 70);
    g.stroke();
    this.add(g);

    // cross
    g.beginPath();
    g.lineStyle(10, 0xf0f0f0);
    g.moveTo(this.stage.centerX - 70, this.stage.centerY);
    g.lineTo(this.stage.centerX + 70, this.stage.centerY);
    g.stroke();

    g.moveTo(this.stage.centerX, this.stage.centerY - 70);
    g.lineTo(this.stage.centerX, this.stage.centerY + 70);    
    g.stroke();
    this.add(g);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();
