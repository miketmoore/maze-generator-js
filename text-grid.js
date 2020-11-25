const maze = require('../dist/index')
const rows = 8
const columns = 8
const grid = maze.mazeGenerator({ rows, columns }, 'iterative')
let final = ``
grid.forEachRow((row, rowIndex) => {
  if (rowIndex === 0) {
    row.forEach((cell, cellIndex) => {
      if (cellIndex === 0) {
        // left most
        final = final.concat('┏━━━━')
      } else if (cellIndex === row.length - 1) {
        // right most
        final = final.concat('┳━━━━┓')
      } else {
        // middle
        final = final.concat('┳━━━━')
      }
    })
    final = final.concat('\n')
  }
  row.forEach((cell, cellIndex) => {
    if (cellIndex === row.length - 1) {
      final = final.concat('┃    ┃')
    } else {
      final = final.concat('┃    ')
    }
  })
  final = final.concat('\n')
  if (rowIndex === rows - 1) {
    row.forEach((cell, cellIndex) => {
      if (cellIndex === 0) {
        // left most
        final = final.concat('┗━━━━')
      } else if (cellIndex === row.length - 1) {
        // right most
        final = final.concat('┻━━━━┛')
      } else {
        // middle
        final = final.concat('┻━━━━')
      }
    })
    final = final.concat('\n')
  } else {
    row.forEach((cell, cellIndex) => {
      if (cellIndex === 0) {
        // left most
        final = final.concat('┣━━━━')
      } else if (cellIndex === row.length - 1) {
        // right most
        final = final.concat('╋━━━━┫')
      } else {
        // middle
        final = final.concat('╋━━━━')
      }
    })
    final = final.concat('\n')
  }
})
console.log(final)
/*
┏━━━━┳━━━━┓
┃    ┃    ┃
┣━━━━╋━━━━┫
┃    ┃    ┃
┗━━━━┻━━━━┛

┏━━━━━━━━━┓
┃         ┃
┃    ╋    ┃
┃         ┃
┗━━━━━━━━━┛

┏━━━━━━━━━┓
┃         ┃
┃    ╋    ┃
┃         ┃
┗━━━━━━━━━┛

┏━━━━━━━━━┳━━━━┓
┃         ┃    ┃
┃    ╻    ╹    ┃
┃    ┃         ┃
┃    ┗━━━━━━━━━┫
┃              ┃
┗━━━━━━━━━━━━━━┛

*/
// Tips
// ╸
const left = '\u2578'
// ╹
const up = '\u2579'
// ╺
const right = '\u257A'
// ╻
const down = '\u257B'

// Corners
// ┏
const downAndRight = '\u250F'
// ┓
const downAndLeft = '\u2513'
// ┗
const upAndRight = '\u2517'
// ┛
const upAndLeft = '\u251B'

// Sides
// ┃
const vertical = '\u2503'
// ━
const horizontal = '\u2501'

// Connections
// ┳
const downAndHorizontal = '\u2533'
// ┻
const upAndHorizontal = '\u253B'
// ╋
const verticalAndHorizontal = '\u254B'
// ┫
const verticalAndLeft = '\u252B'
// ┣
const verticalAndRight = '\u2523'
