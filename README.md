<br /><br /><br />
<p align="center">
  <a href="http://blacksmith2d.io">
    <img alt="Blacksmith 2D" src="http://blacksmith2d.io/content/branding/gray-logo.svg" width="200" />
  </a>
</p>
<br /><br /><br />

# BLACKSMITH 2D
Black is a highly optimized 2D framework for web, mobile games, and playable ads.  

**Most valuable when size matters**  
All engine code is written in ES6, fully [GCC](https://developers.google.com/closure/compiler/) typed, allowing to eliminate all dead code from your app. For example the size of [Donuts](http://blacksmith2d.io/Docs/Tutorials/Donuts-Blitz) game is only 33KB gzipped for both engine and game code.

**Advanced scene graph and rendering pipeline**  
Dirty flag tracks scene changes and avoids unnecessary calculations and context calls. If no changes were made to the scene since last frame, no rendering will be done. Battery efficient.

**Cache as bitmap**  
Automatically detects changes and updates bitmap cache. Allows to gain even more performance on heavy scenes and runs smoothly on old devices.

For more information about how to use Black Engine, please check the [Blacksmith 2D](http://blacksmith2d.io/) website.

## FEATURES
✔️ [Extra lightweight](https://github.com/MassiveHeights/Black#size-and-performance-comparison)  
✔️ [Display Resolution Awareness](https://blacksmith2d.io/Docs/Examples/Stage/Letterbox)  
✔️ [Advanced Particle System](https://blacksmith2d.io/Docs/Examples/Particles/Vector-Field)  
✔️ [Vector Graphics](https://blacksmith2d.io/Docs/Examples/Vector-Graphics/Vector-As-a-Sprite)  
✔️ [Vector Graphics Baking](https://blacksmith2d.io/Docs/Examples/Vector-Graphics/Vector-As-a-Sprite)  
✔️ [Smart Cache As Bitmap](https://blacksmith2d.io/Docs/Examples/Sprites/Cache-As-Bitmap)  
✔️ [Tweens](https://blacksmith2d.io/Docs/Examples/Tweening/Chain)  
✔️ [Message Dispatcher](https://blacksmith2d.io/Docs/Examples/Input/Layers)  
✔️ [Sprite Animations](https://blacksmith2d.io/Docs/Examples/Sprites/Sprite-Animation)  
✔️ [Asset Manager](https://blacksmith2d.io/Docs/Examples/Basics/Load-images-from-atlas)  
✔️ [Advanced Font Rendering and font metrics](https://blacksmith2d.io/Docs/Examples/Text/Having-fun)  
✔️ [Texture Atlas](https://blacksmith2d.io/Docs/Examples/Basics/Load-images-from-atlas)  
✔️ [Input](https://blacksmith2d.io/Docs/Examples/Input/Pointer-Messages)  
✔️ [Clipping Rectangle](https://blacksmith2d.io/Docs/Examples/Sprites/Clipping-Rectangle)  
✔️ [Component System](https://blacksmith2d.io/Docs/Examples/Input/Drag-Sprite)  
✔️ [Audio Support](https://blacksmith2d.io/Docs/Examples/Audio/Spatial-Sound)  
✔️ [Audio Atlases](https://blacksmith2d.io/Docs/Examples/Audio/Sound-Atlas)  
✔️ [Bitmap Fonts](https://blacksmith2d.io/Docs/Examples/Text/Bitmap-Font)  
✔️ [Graphics](https://blacksmith2d.io/Docs/Examples/Graphics/Bezier)  
✔️ [Battery Efficient](https://blacksmith2d.io/Docs/Examples/Drivers/Skip-Unchanged-Frames)  
✔️ [Render Texture](https://blacksmith2d.io/Docs/Examples/Drivers/Render-Texture)  
✔️ [Arcade Physics](https://blacksmith2d.io/Docs/Examples/Arcade-Physics/Mario)  
✔️ [Texture Wrap and Repeat](https://blacksmith2d.io/Docs/Examples/Sprites/Texture-Repeat)  
✔️ [Nine slice grid](https://blacksmith2d.io/Docs/Examples/Sprites/Slice-9-Grid)  
✔️ GCC Ready  

## GETTING STARTED
The easiest way to start using Black Engine is by downloading ready-up game template:
```
git clone https://github.com/MassiveHeights/Black-Template
cd Black-Template
npm install
npm start
```
Then open `http://127.0.0.1:4245` in browser!

## SIZE AND PERFORMANCE COMPARISON
A Piggy Mark was made to compare basic sprite rendering performance and build size.

**Engine**|**60 FPS**|**50 FPS**|**40 FPS**|**30 FPS**|**Size kB**|**Load Time sec.***
:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:
Black|**3855**|**4870**|**5920**|**8605**|**41**|**2,3**
Phaser v2|2975|3475|4525|5995|207|17.7
Phaser v3|2680|3185|4040|5700|217|17.8

All tests are made on iPhone 6s Safari.  
\* How much time it takes to load a test. Tested using [UPTRENDS](https://www.uptrends.com) on iPhone 8 with bandwidth of 3G.

## SUPPORT
Feel free to chat with developers directly on [Facebook](https://www.facebook.com/Blacksmith2D/), [Discord](https://discord.gg/HWzzCcy) or [Telegram](https://t.me/joinchat/FOkhwRDEhoxI3cNDBdi6fQ). Have other questions? Feel free to contact support by <a href="mailto:support@blacksmith2d.io?subject=Hello">email</a>.
Remember to check [Documentation](http://blacksmith2d.io/Docs/) before asking questions.

## CONTRIBUTING TO BLACK ENGINE
Written something cool using Black Engine? Please tell us about it via <a href="mailto:support@blacksmith2d.io?subject=Hello">email</a>.  
Found a bug or issue — post them on [Issues](https://github.com/MassiveHeights/Black/issues) page.

## QUICK LINKS
[Getting Started](http://blacksmith2d.io/Docs/Tutorials/Getting-Started) —
[Examples](http://blacksmith2d.io/Docs/Examples) —
[Game Template](http://github.com/MassiveHeights/Black-Template) —
[EULA](https://github.com/MassiveHeights/Black/blob/master/LICENSE.md) 