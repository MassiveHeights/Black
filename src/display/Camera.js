import { GameObject } from "../core/GameObject";
import { DirtyFlag } from "../core/DirtyFlag";
import { BlendMode } from "../drivers/BlendMode";
import { Black } from "../Black";
import { Rectangle } from "../geom/Rectangle";
import { Matrix } from "../geom/Matrix";
import { InputComponent } from "../input/InputComponent";
import { Vector } from "../geom/Vector";
import { Debug } from "../core/Debug";
import { MathEx } from "../math/MathEx";
import { DisplayObject } from "./DisplayObject";

/**
 * The base class for all renderable objects. Adds `alpha` and `visible` properties to GameObject.
 *
 * @cat display
 * @extends black-engine~DisplayObject
 */
export class Camera extends DisplayObject {
  constructor() {
    super();

    Black.camera = this;
  }

  get worldTransformation() {
    let wt = super.worldTransformation.clone();
    wt.prepend(this.stage.worldTransformationInverted);

    return wt;
  }
}

