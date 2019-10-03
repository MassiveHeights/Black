import { Debug } from "../core/Debug";

/**
 * The sound effect interface. Implementations can be attached to sound channel.
 * 
 * @cat audio
 */
export class SoundEffect {

  /**
   * Creates new instance of SoundEffect.
   */
  constructor() {
    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mInputNode = null;

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mOutputNode = null;
  }

  /**
   * @ignore
   * @return {AudioNode}
   */
  get _inputNode() {
    Debug.assert(this.mInputNode != null, 'Input node must be specified in descendant class');
    return this.mInputNode;
  }

  /**
   * @ignore
   * @return {AudioNode}
   */
  get _outputNode() {
    Debug.assert(this.mOutputNode != null, 'Output node must be specified in descendant class');
    return this.mOutputNode;
  }
}