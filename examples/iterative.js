const maze = require('../dist/index')
const grid = maze.mazeGenerator({ rows: 6, columns: 6 }, 'iterative')
console.log(grid)
