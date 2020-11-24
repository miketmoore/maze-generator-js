const heapdump = require('heapdump')
const maze = require('../dist/index')
maze.mazeGenerator({ rows: 6, columns: 6 }, 'iterative')
heapdump.writeSnapshot(`maze-generator-js-${Date.now()}.heapsnapshot`)
