/* jshint ignore:start */
"use strict";
var add = require('./src/index');

function printStatus(fn) {
  switch(%GetOptimizationStatus(fn)) {
    case 1: console.log("Function is optimized"); break;
    case 2: console.log("Function is not optimized"); break;
    case 3: console.log("Function is always optimized"); break;
    case 4: console.log("Function is never optimized"); break;
    case 6: console.log("Function is maybe deoptimized"); break;
  }
  }

//Fill type-info
  add("//;\n1;2;3\n4");
// 2 calls are needed to go from uninitialized -> pre-monomorphic -> monomorphic
  add("//;\n1;2;3\n4");

%OptimizeFunctionOnNextCall(add);
//The next call
  add("//;\n1;2;3\n4");

//Check
  printStatus(add);
/* jshint ignore:end */
