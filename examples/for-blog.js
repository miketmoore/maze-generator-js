const maze = require('../dist/index')
const size = 1016
const grid = maze.mazeGenerator({ rows: size, columns: size }, 'iterative')
