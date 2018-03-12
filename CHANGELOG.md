Black Engine: Changelog
=======================

v0.3.4
- Added BitmapTextField
- Added Audio support (spatial, audio atlas, sound effects)
- Added Stage, stage scale modes and orientations
- Added `ObjectPool` class
- Added Spine support
- Added rich feature to the TextField
- Added `DisplayObject#cacheAsBitmap` property
- Added anchorX/anchorY and now they updates automatically
- Added pivotOffsetX/pivotOffsetY
- Added `AssetManager#addTexture` method
- Added basic Graphics class
- Added `RadialScatter`
- Added render to texture support
- Added Font and Text metrics classes
- Added Colliders support (box and circle)
- Fixed incorrect blending for clipped sprites
- Fixed incorrect bounds calculations
- Improved Emitter and modifiers API and perforamnce
- Improved `getBounds` performance by caching results
- Improved performance for some classes that using math
- Reworked drivers, now only required calls will be made to drawing context (~50% less requests are made)
- Removed pivotX/pivotY, use pivotOffsetX/pivotOffsetY instead
- Typed 95% for GCC

v0.0.12a
--------
- Fixed TextField align issues caused by new pivot logic
- Fixed DOMDriver align issues caused by new pivot logic
- Fixed `Matrix::translate` broken logic
- Changed `VideoDriver::DrawImage` now accepts bounds
- Minor jsdoc fixess

v0.0.11a
--------
- Reworked `Input`
  - Now `Input` is single target system
  - Added `pointerIn` and `pointerOut` messages
  - Added `PointerInfo` classes, posted as second argument
- Added `GameObject::add` sugar method, accepts array of `GameObject` and/or `Component`   
- Added JSDoc's for most classes
- Added new JSDoc template
- Added message overhearing
- Added `FontAsset` class
- Added `Black::isPaused` method
- Added `GameObject::displayDepth` method - returns z-depth of GameObject.
- Massive input fixes
- Fixed many GCC comments
- Fixed `GameObject::index` not working method
- Fixed `GameObject::setChildIndex` not workign method
- Updated `Viewport`, now it will automatically add missing CSS styles on start.


v0.0.10a
--------
- Added dist folder to github
- Added `touchable` to the `Sprite`
- Fixed package.json version mess
- Fixed bundling mess
- Fixed by adding missing `GameObject::onAdded` call
-
- Moved examples to external repo
- Renamed `Assert` to `Debug`

v0.0.8a
------------------------
- Initial commit
