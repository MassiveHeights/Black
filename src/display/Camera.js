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

var mActiveCamera = null;

/**
 * The base class for all renderable objects. Adds `alpha` and `visible` properties to GameObject.
 *
 * @cat display
 * @extends DisplayObject
 */
export class Camera extends DisplayObject {
  constructor() {
    super();

    mActiveCamera = this;
  }

  // get localTransformation() {
  //   if (this.mDirty & DirtyFlag.LOCAL) {
  //     this.mDirty ^= DirtyFlag.LOCAL;

  //     if (this.mSkewX === 0.0 && this.mSkewY === 0.0) {
  //       if (this.mRotation === 0) {
  //         return this.mLocalTransform.set(-this.mScaleX, 0, 0, -this.mScaleY, -this.mX - this.mPivotX * -this.mScaleX, -this.mY - this.mPivotY * -this.mScaleY);
  //       } else {
  //         let cos = Math.cos(-this.mRotation);
  //         let sin = Math.sin(-this.mRotation);
  //         let a = -this.mScaleX * cos;
  //         let b = -this.mScaleX * sin;
  //         let c = -this.mScaleY * -sin;
  //         let d = -this.mScaleY * cos;
  //         let tx = -this.mX - this.mPivotX * a - this.mPivotY * c;
  //         let ty = -this.mY - this.mPivotX * b - this.mPivotY * d;
  //         return this.mLocalTransform.set(a, b, c, d, tx, ty);
  //       }
  //     } else {
  //       this.mLocalTransform.identity();
  //       this.mLocalTransform.scale(-this.mScaleX, -this.mScaleY);
  //       this.mLocalTransform.skew(this.mSkewX, this.mSkewY);
  //       this.mLocalTransform.rotate(-this.mRotation);

  //       let a = this.mLocalTransform.data[0];
  //       let b = this.mLocalTransform.data[1];
  //       let c = this.mLocalTransform.data[2];
  //       let d = this.mLocalTransform.data[3];
  //       let tx = -this.mX;
  //       let ty = -this.mY;

  //       if (this.mPivotX !== 0.0 || this.mPivotY !== 0.0) {
  //         tx = -this.mX - a * this.mPivotX - c * this.mPivotY;
  //         ty = -this.mY - b * this.mPivotX - d * this.mPivotY;
  //       }

  //       this.mLocalTransform.data[4] = tx;
  //       this.mLocalTransform.data[5] = ty;
  //     }
  //   }

  //   return this.mLocalTransform;
  // }

  get worldTransformation() {
    if (this.mDirty & DirtyFlag.ANCHOR && (this.mAnchorX !== null || this.mAnchorY !== null)) {
      this.mDirty ^= DirtyFlag.ANCHOR;

      this.__updatePivots(this);

      this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.LOCAL | DirtyFlag.WIRB), true);
    }

    if (this.mDirty & DirtyFlag.WORLD) {
      this.mDirty ^= DirtyFlag.WORLD;

      if (this.mParent !== null && this.mParent !== Black.stage)
        this.mParent.worldTransformation.copyTo(this.mWorldTransform).append(this.localTransformation);
      else
        this.localTransformation.copyTo(this.mWorldTransform);
    }
    return this.mWorldTransform;
  }

  static get active() {
    if (mActiveCamera !== null && mActiveCamera.mAdded === true)
      return mActiveCamera;

    return null;
  }

  static set active(value) {
    mActiveCamera = value;
  }
}

