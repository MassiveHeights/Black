'use strict';

'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);
  }

  onAdded() {
    this.g = new Graphics();
    this.add(this.g);
  }

  onUpdate() {
    const time = Black.time.now;

    let y1 = 250 + Math.sin(-time * 5) * 200;
    let y2 = 300 + Math.sin(time * 5) * 200;

    let color = ColorHelper.lerpHSV(0x42a5f5, 0xff00ff, (Math.sin(time * 10) + 1) * 0.5);
    let g = this.g;

    g.clear();
    g.lineStyle(18, color, 0.75, 'round');

    g.beginPath();
    g.circle(100, 250, 20);
    g.shadowBlur(20);
    g.shadowColor(color, 1);
    g.stroke();

    g.beginPath();
    g.circle(400, 250, 20);
    g.shadowBlur(20);
    g.shadowColor(color, 1);
    g.stroke();

    g.beginPath();
    g.moveTo(100, 250);
    g.bezierCurveTo(250, y1, 250, y2, 400, 250);
    g.shadowBlur(20);
    g.shadowColor(color, 1);
    g.stroke();
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();