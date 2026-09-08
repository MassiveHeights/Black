'use strict';

class MyGame extends GameObject {
  constructor() {
    super();
  }

  onAdded(m) {
    let graphics = new Graphics();
    graphics.beginPath();
    graphics.fillStyle(0x000032);
    graphics.rect(0, 0, this.stage.width, this.stage.height);
    graphics.fill();
    graphics.closePath();


    graphics.lineStyle(0.5, 0xffffff, 1);
    graphics.beginPath();

    for (let i = 0; i < 700; i++) {
      let sa = (Math.random() * Math.PI);
      let ea = Math.random() * 8;

      if (i >= 250) {
        sa = -(Math.random() * Math.PI);
        ea = Math.random() * -2;
      }

      graphics.arc(this.stage.centerX, this.stage.centerY, 150, sa, ea);
    }

    graphics.stroke();

    this.graphics = this.addChild(graphics);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();
