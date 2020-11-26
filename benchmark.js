const Benchmark = require('benchmark')
const maze = require('./dist/index')
const suite = new Benchmark.Suite()
const options = { rows: 50, columns: 50 }

suite
  .add('recursive', function() {
    maze.mazeGenerator(options, 'recursive-backtracking')
  })
  .add('iterative', function() {
    maze.mazeGenerator(options, 'iterative')
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ async: true })
