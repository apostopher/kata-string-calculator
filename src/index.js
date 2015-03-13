"use strict";

module.exports = add;

// http://osherove.com/tdd-kata-1/
function add(args) {
  return performAdd(fixLargeNumbers(checkNegatives(stringToNumbers(args))));
}

// This is a simple reducer to add numbers
function performAdd(numbers) {
  return numbers.reduce(function (memo, num) {
    return memo + num;
  }, 0);
}

// Split the specs into array of numbers
function stringToNumbers(args) {
  var config = getConfig(args);
  var numbers = config.input.split("\n");
  return splitOnDelimiters(numbers, config.delimiters);
}

function splitOnDelimiters(numbers, delimiters) {
  if (delimiters.length === 0) {
    // The string input is now split on all the delimiters
    // However the numbers will be in the form '2'
    // convert string to number and return.
    return numbers.map(function (num) {
      return (+num || 0); // If +num is NaN be lenient and return 0
    });
  }
  var delimiter = delimiters.pop();
  var newNums = numbers.reduce(function (memo, num) {
    return memo.concat(num.split(delimiter));
  }, []);
  return splitOnDelimiters(newNums, delimiters);
}

function checkNegatives(numbers) {
  var negatives = numbers.filter(function (num) {
    return num < 0;
  });
  if (negatives.length > 0) {
    throw new Error("negatives not allowed. Found [" + negatives.join(" , ") + "]");
  } else {
    return numbers;
  }
}

function fixLargeNumbers(numbers) {
  return numbers.filter(function (num) {
    return num < 1000;
  });
}

function getConfig(args) {
  var matcher = /\/\/(.*?)\n/;
  var result = matcher.exec(args);
  if (result) {
    return {delimiters: getDelimiters(result[1]), input: args.slice(matcher.lastIndex)};
  } else {
    return {delimiters: [","], input: args};
  }
}

/*
  This function extracts the delimiters from specs
  e.g.
  '[**]'    -> ['**']
  '[**][%]' -> ['**', '%']
 */
function getDelimiters(args){
  return args.split(/\[|\]/).filter(function(delim){
    return !!delim.length;
  });
}
