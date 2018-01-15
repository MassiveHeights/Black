/* @echo EXPORT */
class SoundEffect {
  constructor() {
    this.mInputNode = null;
    this.mOutputNode = null;

    this.mConnectedOutput = null;
  }

  get _inputNode() {
    return this.mInputNode;
  }

  get _outputNode() {
    return this.mOutputNode;
  }

  _connectToOutput(node) {
    this.mConnectedOutput = node;
    this._outputNode.connect(node);
  }

  _disconnectFromOutput() {
    if (this.mConnectedOutput)
      this._outputNode.disconnect(this.mConnectedOutput);
    this.mConnectedOutput = null;
  }
}