const maze = require('../dist/index')
const grid = maze.mazeGenerator({ rows: 2, columns: 2 }, 'iterative')
console.log(grid)
