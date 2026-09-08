class Player extends GameObject {
  constructor() {
    super();

    this.hp = 100;
  }

  makeDamage(hp) {
    this.hp -= hp;

    if (this.hp <= 0) {
      this.hp = 0;

      // send 'kill' message
      this.post('kill');
    }
  }
}

class MyGame extends GameObject {
  onAdded() {
    let player = new Player();
    this.add(player);

    // listens for 'kill' message
    player.on('kill', x => {
      console.log('Killed');
    });

    player.makeDamage(50);
    player.makeDamage(100);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();