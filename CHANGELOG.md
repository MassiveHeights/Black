Black Engine: Changelog
=======================

v0.0.12a
--------

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
