/**
 * The sound listener component, which controls one and only instance of AudioContext.listener.
 * 
 * @cat audio
 * @extends {Component}
 */
/* @echo EXPORT */
class SoundListener extends Component {

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
    MasterAudio.currentListener = this;
  }

  /**
   * Stops controlling AudioContext.listener.
   */
  loose() {
    MasterAudio.looseListener();
  }

  /**
   * @inheritDoc
   */
  onPostUpdate(dt) {
    if (MasterAudio.currentListener === this) {
      let stage = Black.stage;
      let pos = this.gameObject.localToGlobal(stage.globalToLocal(new Vector(this.gameObject.pivotX, this.gameObject.pivotY)));
      let px = (pos.x - stage.centerX) / stage.width * 2;
      let py = (pos.y - stage.centerY) / stage.height * 2;
      if (MasterAudio.context.listener.positionX) {
        MasterAudio.context.listener.positionX.value = px;
        MasterAudio.context.listener.positionY.value = py;
        MasterAudio.context.listener.positionZ.value = 1;
      } else {
        MasterAudio.context.listener.setPosition(px ,py, 1);
      }
    }
  }
}