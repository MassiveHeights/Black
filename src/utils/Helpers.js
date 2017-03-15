// function assert(title, condition) {
//   if (condition)
//     console.log('%s %c[  OK  ]', title + ' ' + '.'.repeat(88 - title.length), 'color:green;')
//   else
//     console.log('%s %c[FAILED]', title + ' ' + '.'.repeat(88 - title.length), 'color:red;')
// }
//
// function perfTest(testName, fn, ctx, count = 1000) {
//   let startTime = new Date().getTime();
//
//   for (var i = 0; i < count; i++)
//     fn.apply(ctx);
//     //fn();
//
//   return (new Date().getTime() - startTime);
// }
//
// function perfCompare(testsName, fn1, fn2, ctx, count = 1000) {
//   let t1 = perfTest(testsName, fn1, ctx, count);
//   let t2 = perfTest(testsName, fn2, ctx, count);
//
//   let c1 = 'color:green;'
//   let c2 = 'color:red;'
//
//   if (t1 > t2) {
//     c1 = c2;
//     c2 = 'color:green;'
//   }
//
//   console.log('%s:%c %dms %cvs%c %dms', testsName, c1, t1, 'color:black;', c2, t2);
// }
//
// function assertf(title, func) {
//   const r = func();
//
//   const statuses = ['[  OK  ]', '[FAILED]'];
//   const colors = ['color:green;', 'color:red;'];
//
//   console.log('%s %c%s', title + ' ' + '.'.repeat(88 - title.length), r ? colors[0] : colors[1], r ? statuses[0] : statuses[1]);
// }
