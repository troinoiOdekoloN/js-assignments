"use strict";

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ********************************************************************************************/

/**
 * Returns the lines sequence of "99 Bottles of Beer" song:
 *
 *  '99 bottles of beer on the wall, 99 bottles of beer.'
 *  'Take one down and pass it around, 98 bottles of beer on the wall.'
 *  '98 bottles of beer on the wall, 98 bottles of beer.'
 *  'Take one down and pass it around, 97 bottles of beer on the wall.'
 *  ...
 *  '1 bottle of beer on the wall, 1 bottle of beer.'
 *  'Take one down and pass it around, no more bottles of beer on the wall.'
 *  'No more bottles of beer on the wall, no more bottles of beer.'
 *  'Go to the store and buy some more, 99 bottles of beer on the wall.'
 *
 * See the full text at
 * http://99-bottles-of-beer.net/lyrics.html
 *
 * NOTE: Please try to complete this task faster then original song finished:
 * https://www.youtube.com/watch?v=Z7bmyjxJuVY   :)
 *
 *
 * @return {Iterable.<string>}
 *
 */
function* get99BottlesOfBeer() {
  let bottles = (i) => i === 1 ? `1 bottle` : `${i} bottles`;
  for (let i = 99; i >= 1; i--) {
    yield `${bottles(i)} of beer on the wall, ${bottles(i)} of beer.`;
    if (i === 1) {
      yield `Take one down and pass it around, no more bottles of beer on the wall.`;
    } else {
      yield `Take one down and pass it around, ${bottles(
        i - 1
      )} of beer on the wall.`;
    }
  }
  yield "No more bottles of beer on the wall, no more bottles of beer.";
  yield "Go to the store and buy some more, 99 bottles of beer on the wall.";
}

/**
 * Returns the Fibonacci sequence:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * See more at: https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * @return {Iterable.<number>}
 *
 */
function* getFibonacciSequence() {
  let values = [0, 1];
  for (let i = 0; i < 39; i++) {
    yield getNextValues(values, i);
  }
}

function getNextValues(values, index) {
  if (index >= values.length) {
    values.push(values[index - 2] + values[index - 1]);
  }
  return values[index];
}

/**
 * Traverses a tree using the depth-first strategy
 * See details: https://en.wikipedia.org/wiki/Depth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 * @example
 *
 *   var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 },
 *       node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
 *   node1.children = [ node2, node6, node7 ];
 *   node2.children = [ node3, node4 ];
 *   node4.children = [ node5 ];
 *   node7.children = [ node8 ];
 *
 *     source tree (root = 1):
 *            1
 *          / | \
 *         2  6  7
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       3   4     8
 *           |
 *           5
 *
 *  depthTraversalTree(node1) => node1, node2, node3, node4, node5, node6, node7, node8
 *
 */
function* depthTraversalTree(root) {
  let nodes = [root];
  while (nodes.length) {
    let curr = nodes.pop();
    yield curr;
    if (curr.children) {
      nodes.push(...curr.children.reverse());
    }
  }
}

/**
 * Traverses a tree using the breadth-first strategy
 * See details: https://en.wikipedia.org/wiki/Breadth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 * @example
 *     source tree (root = 1):
 *
 *            1
 *          / | \
 *         2  3  4
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       5   6     7
 *           |
 *           8
 *
 */
function* breadthTraversalTree(root) {
  let nodes = [root];
  for (let node of nodes) {
    yield node;
    if (node.children) {
      nodes.push(...node.children);
    }
  }
}

/**
 * Merges two yield-style sorted sequences into the one sorted sequence.
 * The result sequence consists of sorted items from source iterators.
 *
 * @params {Iterable.<number>} source1
 * @params {Iterable.<number>} source2
 * @return {Iterable.<number>} the merged sorted sequence
 *
 * @example
 *   [ 1, 3, 5, ... ], [2, 4, 6, ... ]  => [ 1, 2, 3, 4, 5, 6, ... ]
 *   [ 0 ], [ 2, 4, 6, ... ]  => [ 0, 2, 4, 6, ... ]
 *   [ 1, 3, 5, ... ], [ -1 ] => [ -1, 1, 3, 5, ...]
 */
function* mergeSortedSequences(source1, source2) {
  let seq1 = source1(), seq2 = source2();
  while (true) {
    let s1 = seq1.next().value,
      s2 = seq2.next().value;
    if (s1 === undefined) {
      yield s2;
    } else if (s2 === undefined) {
      yield s1;
    } else {
      yield Math.min(s1, s2);
      yield Math.max(s1, s2);
    }
  }
}

module.exports = {
  get99BottlesOfBeer: get99BottlesOfBeer,
  getFibonacciSequence: getFibonacciSequence,
  depthTraversalTree: depthTraversalTree,
  breadthTraversalTree: breadthTraversalTree,
  mergeSortedSequences: mergeSortedSequences
};
