const heapdump = require('heapdump')
const maze = require('../dist/index')
const size = 500
const grid = maze.mazeGenerator({ rows: size, columns: size }, 'iterative')
heapdump.writeSnapshot('snapshot-01.heapsnapshot')
