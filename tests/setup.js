const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document, window } = (new JSDOM('<!doctype html><html><body></body></html>', { pretendToBeVisual: true })).window;
global.document = document;
global.window = window;
global.requestAnimationFrame = window.requestAnimationFrame;
global.performance = {
  now: function () { return new Date().getTime() }
};

let container = document.createElement('div');
container.id = 'game-container';
document.body.appendChild(container);