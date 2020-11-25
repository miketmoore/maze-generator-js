const heapdump = require('heapdump')
const maze = require('../dist/index')
const grid = maze.mazeGenerator({ rows: 500, columns: 500 }, 'iterative')
heapdump.writeSnapshot(`maze-generator-js-${Date.now()}.heapsnapshot`)
