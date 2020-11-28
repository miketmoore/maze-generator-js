const heapdump = require('heapdump')
const maze = require('../dist/index')
/*
 * This is the minimum size (at least for a square grid) that will trigger an out of memory error
 */
const size = 1016
const grid = maze.mazeGenerator({ rows: size, columns: size }, 'iterative')
heapdump.writeSnapshot('snapshot-01.heapsnapshot')
