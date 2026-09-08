import { CanvasDriver, Input, Engine, StageScaleMode } from "black-engine";
import { GameSpine } from "./game-spine";
import { Game } from "./game";

// Game will be our starting class and rendering will be done on Canvas
const engine = new Engine('container', Game, CanvasDriver, [Input]);

// Spine example
//const engine = new Engine('container', GameSpine, CanvasDriver, [Input]);

// Pause simulation when container loses focus
engine.pauseOnBlur = false;

// Pause simulation when page is getting hidden
engine.pauseOnHide = false;

// Wroom, wroom!
engine.start();

// Set default stage size
engine.stage.setSize(900, 500);

// Makes stage always centered
engine.stage.scaleMode = StageScaleMode.LETTERBOX;

