import { Component } from "../core/Component";
import { Black } from "../Black";
import { Vector } from "../geom/Vector";

/**
 * The sound listener component, which controls one and only instance of AudioContext.listener.
 * 
 * @cat audio
 * @extends {black-engine~Component}
 */
export class SoundListener extends Component {
  /**
   * Creates new instance of SoundListener.
   */
  constructor() {
    super();
  }

  /**
   * @inheritDoc
   */
  onRemoved(gameObject) {
    this.loose();
  }

  /**
   * Starts controlling only instance of AudioContext.listener.
   */
  listen() {
    Black.audio.currentListener = this;
  }

  /**
   * Stops controlling AudioContext.listener.
   */
  loose() {
    Black.audio.looseListener();
  }

  /**
   * @inheritDoc
   */
  onRender() {
    if (Black.audio.currentListener === this) {
      let listener = Black.audio.context.listener;
      
      let stage = Black.stage;
      let pos = this.gameObject.localToGlobal(stage.globalToLocal(new Vector(this.gameObject.pivotX, this.gameObject.pivotY)));
      let px = (pos.x - stage.centerX) / stage.width * 2;
      let py = (pos.y - stage.centerY) / stage.height * 2;
      if (listener.positionX != null) {
        listener.positionX.setValueAtTime(px, 0);
        listener.positionY.setValueAtTime(py, 0);
        listener.positionZ.setValueAtTime(1, 0);
      } else {
        listener.setPosition(px ,py, 1);
      }
    }
  }
}