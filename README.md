<p align="center">
  <a href="https://massiveheights.github.io/Black/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="media/logo/white.png">
      <img alt="Blacksmith 2D" src="media/logo/black.png" width="180">
    </picture>
  </a>
</p>

<h1 align="center">BLACKSMITH 2D</h1>

<p align="center">
  A highly optimized 2D framework for web, mobile games, and playable ads.
</p>

<p align="center">
  <a href="https://massiveheights.github.io/Black/examples/">Examples</a> &nbsp;·&nbsp;
  <a href="docs/Tutorials">Tutorials</a> &nbsp;·&nbsp;
  <a href="https://massiveheights.github.io/Black/docs/api/">API reference</a> &nbsp;·&nbsp;
  <a href="template">Game template</a>
</p>

---

**Most valuable when size matters**  
All engine code is written in ES6, fully [GCC](https://developers.google.com/closure/compiler/) typed, allowing to eliminate all dead code from your app. For example the size of the [Donuts](docs/Tutorials/Donuts%20Blitz.md) game is only 34KB gzipped for both engine and game code (GCC version).

**Advanced scene graph and rendering pipeline**  
Dirty flag tracks scene changes and avoids unnecessary calculations and context calls. If no changes were made to the scene since last frame, no rendering will be done. Battery efficient.

**Cache as bitmap**  
Automatically detects changes and updates bitmap cache. Allows to gain even more performance on heavy scenes and runs smoothly on old devices.

## FEATURES

Every link below opens a runnable example.

✔️ Extra lightweight  
✔️ [Display Resolution Awareness](https://massiveheights.github.io/Black/examples/?group=Stage&example=Letterbox.js)  
✔️ [Advanced Particle System](https://massiveheights.github.io/Black/examples/?group=Particles&example=Vector%20Field.js)  
✔️ [Vector Graphics](https://massiveheights.github.io/Black/examples/?group=Vector%20Graphics&example=Vector%20As%20a%20Sprite.js)  
✔️ [Vector Graphics Baking](https://massiveheights.github.io/Black/examples/?group=Vector%20Graphics&example=Vector%20As%20a%20Sprite.js)  
✔️ [Smart Cache As Bitmap](https://massiveheights.github.io/Black/examples/?group=Sprites&example=Cache%20As%20Bitmap.js)  
✔️ [Tweens](https://massiveheights.github.io/Black/examples/?group=Tweening&example=Chain.js)  
✔️ [Message Dispatcher](https://massiveheights.github.io/Black/examples/?group=Input&example=Layers.js)  
✔️ [Sprite Animations](https://massiveheights.github.io/Black/examples/?group=Sprites&example=Sprite%20Animation.js)  
✔️ [Asset Manager](https://massiveheights.github.io/Black/examples/?group=Basics&example=Load%20images%20from%20atlas.js)  
✔️ [Advanced Font Rendering and font metrics](https://massiveheights.github.io/Black/examples/?group=Text&example=Having%20fun.js)  
✔️ [Texture Atlas](https://massiveheights.github.io/Black/examples/?group=Basics&example=Load%20images%20from%20atlas.js)  
✔️ [Input](https://massiveheights.github.io/Black/examples/?group=Input&example=Pointer%20Messages.js)  
✔️ [Clipping Rectangle](https://massiveheights.github.io/Black/examples/?group=Sprites&example=Clipping%20Rectangle.js)  
✔️ [Component System](https://massiveheights.github.io/Black/examples/?group=Input&example=Drag%20Sprite.js)  
✔️ [Audio Support](https://massiveheights.github.io/Black/examples/?group=Audio&example=Spatial%20Sound.js)  
✔️ [Audio Atlases](https://massiveheights.github.io/Black/examples/?group=Audio&example=Sound%20Atlas.js)  
✔️ [Bitmap Fonts](https://massiveheights.github.io/Black/examples/?group=Text&example=Bitmap%20Font.js)  
✔️ [Graphics](https://massiveheights.github.io/Black/examples/?group=Graphics&example=Bezier.js)  
✔️ [Battery Efficient](https://massiveheights.github.io/Black/examples/?group=Drivers&example=Skip%20Unchanged%20Frames.js)  
✔️ [Render Texture](https://massiveheights.github.io/Black/examples/?group=Drivers&example=Render%20Texture.js)  
✔️ [Arcade Physics](https://massiveheights.github.io/Black/examples/?group=Arcade%20Physics&example=Mario.js)  
✔️ [Texture Wrap and Repeat](https://massiveheights.github.io/Black/examples/?group=Sprites&example=Texture%20Repeat.js)  
✔️ [Nine slice grid](https://massiveheights.github.io/Black/examples/?group=Sprites&example=Slice%209%20Grid.js)  
✔️ GCC Ready  

## GETTING STARTED

The game template lives in this repository under [`template/`](template):

```
git clone https://github.com/MassiveHeights/Black
cd Black/template
npm install
npm start
```

Then open `http://127.0.0.1:3000` in a browser.

Or install the engine on its own:

```
npm install black-engine
```

## REPOSITORY LAYOUT

| Path | Contents |
| --- | --- |
| [`src/`](src) | Engine source (ES6 modules) |
| [`dist/`](dist) | Prebuilt UMD, ES module, and minified bundles |
| [`examples/`](examples) | 91 runnable examples across 18 categories |
| [`assets/`](assets) | Assets used by the examples |
| [`docs/Tutorials/`](docs/Tutorials) | Written tutorials |
| [`template/`](template) | Ready-to-use game template |
| [`site/`](site) | Landing page for the published site |

## RUNNING THE EXAMPLES LOCALLY

The examples are plain static files, but they load assets over HTTP, so they need a
local server rather than opening `index.html` from disk:

```
npx serve .
```

Then open `http://localhost:3000/examples/`.

After adding or renaming an example, regenerate the sidebar index:

```
npm run examples:index
```

## BUILDING

```
npm run build              # bundles into dist/ (requires Java for the GCC step)
npm run docs               # regenerates docs/api/ (requires Node 20 or 22)
npm run examples:index  # regenerates examples/manifest.js and the README indexes
```

## SUPPORT

Found a bug or have a question? Open an issue on the
[Issues](https://github.com/MassiveHeights/Black/issues) page.

The project is also on [Facebook](https://www.facebook.com/Blacksmith2D/),
[Discord](https://discord.gg/HWzzCcy) and [Telegram](https://t.me/joinchat/FOkhwRDEhoxI3cNDBdi6fQ).

## LICENSE

See [LICENSE.md](LICENSE.md).
