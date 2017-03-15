class MyGame extends GameObject {
  constructor() {
    super();

    // Create own asset manager
    this.assets = AssetManager.default;
    this.assets.defaultPath = '/examples/assets/';

    // Preload some images
    this.assets.enqueueImage('s160x160', '160x160.png');
    this.assets.enqueueImage('rect64', 'rect64.png');

    this.assets.on('complete', this.onAssetsLoadded, this);
    this.assets.loadQueue();
  }

  onAssetsLoadded() {

    var main = new GameObject();
    var view = new GameObject();
    var subGroup = new GameObject();
    var g2 = new Sprite();
		var g3 = new Sprite();

    var s160 = new Sprite('s160x160');
    s160.x = 0;
    s160.y = 0;

    var s64_1 = new Sprite('rect64');
    s64_1.x = 100;
    s64_1.y = 200;
    s64_1.scaleX = s64_1.scaleY = 2;

    var s64_2 = new Sprite('rect64');
    s64_2.x = 500;
    s64_2.y = 500;

    main.addChild(view);
    view.addChild(s160);
    view.addChild(subGroup);

    subGroup.addChild(s64_1);
    subGroup.addChild(s64_2);

    this.addChild(main);

    var s64_5 = new Sprite('rect64');
    s64_5.x = 10;
		s64_5.y = 10;

		var s64_6 = new Sprite('rect64');
    s64_6.x = -10;
		s64_6.y = -10;

		g2.addChild(s64_5);
		g3.addChild(s64_6);

		this.addChild(g2);
		this.addChild(g3);
    main.rotation = Math.PI / 16;
    g2.rotation = -Math.PI / 16;
		g3.rotation = Math.PI / 16;

    // LOGGING
    console.log('');
    this.log(main.getBounds(null, true), '(x=-31.214451522580518, y=0, w=486.83218866193835, h=663.1938397645183)');
    this.log(main.getBounds(main, true), '(x=0, y=0, w=564, h=564)');
    this.log(main.getBounds(view, true), '(x=0, y=0, w=564, h=564)');

    console.log('');
    this.log(view.getBounds(null, true), '(x=-31.214451522580518, y=0, w=486.83218866193835, h=663.1938397645183)');
		this.log(view.getBounds(main, true), '(x=0, y=0, w=564, h=564)');
		this.log(view.getBounds(s64_2, true), '(x=-500, y=-500, w=564, h=564)');

    console.log('');
    this.log(s64_1.getBounds(null, true), '(x=34.08890241903298, y=215.66608828225893, w=150.5120771096779, h=150.5120771096779)');
		this.log(s64_2.getBounds(null, true), '(x=380.3616985845189, y=587.9378012096794, w=75.25603855483894, h=75.25603855483894)');

    console.log('');
    this.log(s64_5.getBounds(null, true), '(x=11.758756024193588, y=-4.628831025161186, w=75.25603855483895, h=75.25603855483897)');
    this.log(s64_6.getBounds(null, true), '(x=-20.34273019290323, y=-11.758756024193588, w=75.25603855483895, h=75.25603855483895)');
    this.log(s64_5.getBounds(s64_5, true), '(x=0, y=0, w=64, h=64)');
    this.log(s64_6.getBounds(s64_6, true), '(x=0, y=0, w=64, h=64)');
    this.log(s64_5.getBounds(s64_5.parent, true), '(x=10, y=10, w=64, h=64)');
    this.log(s64_6.getBounds(s64_6.parent, true), '(x=-10, y=-10, w=64, h=64)');
    this.log(s64_5.getBounds(s64_6, true), '(x=23.065629648763764, y=-9.079778669903774, w=83.6200297520881, h=83.62002975208809)');
    this.log(s64_6.getBounds(s64_5, true), '(x=-39.90370067282771, y=-23.065629648763764, w=83.6200297520881, h=83.6200297520881)');
    this.log(main.getBounds(s64_6, true), '(x=10, y=10, w=564, h=564)');

    console.log('');
    g2.rotation = 0;
		this.log(s64_5.getBounds(null, true), '(x=10, y=10, w=64, h=64)');
		this.log(s64_5.getBounds(s64_5, true), '(x=0, y=0, w=64, h=64)'); // local actually
		this.log(s64_5.getBounds(s64_5.parent, true), '(x=10, y=10, w=64, h=64)');

    console.log('');

    let c = new Sprite();
    c.scaleX = 0.1;
    c.scaleY = 0.1;
    this.addChild(c);

    let s2 = new Sprite('s160x160');
		s2.x = 100;
		s2.y = 100;
    c.addChild(s2);

    console.log(s2.width, c.width);

    console.log(s2.getBounds());
    console.log(s2.getBounds(null));
		console.log(s2.getBounds(s2));
		console.log(s2.getBounds(s2.parent));
  }

  log(o, c) {
    let pX = c.indexOf('x=');
    let pY = c.indexOf('y=');
    let pW = c.indexOf('w=');
    let pH = c.indexOf('h=');

    let xx = parseFloat(c.substring(pX + 2, pY - 2));
    let yy = parseFloat(c.substring(pY + 2, pW - 2));
    let ww = parseFloat(c.substring(pW + 2, pH - 2));
    let hh = parseFloat(c.substring(pH + 2, c.length - 1));

    let fxx = xx.toFixed(2);
    let fyy = yy.toFixed(2);
    let fww = ww.toFixed(2);
    let fhh = hh.toFixed(2);

    let kxx = o.x.toFixed(2);
    let kyy = o.y.toFixed(2);
    let kww = o.width.toFixed(2);
    let khh = o.height.toFixed(2);

    if (!this.almosteq(fxx, kxx))
      console.log('x- is wrong', kxx, fxx);
    else if (!this.almosteq(fyy, kyy))
      console.log('y- is wrong', kyy, fyy);
    else if (!this.almosteq(fww, kww))
      console.log('w- is wrong', kww, fww);
    else if (!this.almosteq(fhh, khh))
      console.log('h- is wrong', khh, fhh);
    else
      console.log('good', kxx, kyy, kww, khh);
  }

  almosteq(v1, v2, epsilon) {
    if (epsilon == null)
      epsilon = 0.01;
    return Math.abs(v1 - v2) < epsilon;
  }
}

// Create and start engine
var black = new Black('container', MyGame, 'dom');
black.start();
