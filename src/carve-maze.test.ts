import { carveMaze } from './carve-maze'

describe('recursive-backtracking', () => {
  test('all cells should be carved', () => {
    const grid = carveMaze(4, 4, 'recursive-backtracking')
    let count = 0
    grid.forEachRow(row => {
      row.forEach(cell => {
        if (cell.isCarved()) {
          count++
        }
      })
    })
    expect(count).toEqual(4 * 4)
  })
})

describe('iterative', () => {
  test('all cells should be carved', () => {
    const grid = carveMaze(4, 4, 'iterative')
    let count = 0
    grid.forEachRow(row => {
      row.forEach(cell => {
        if (cell.isCarved()) {
          count++
        }
      })
    })
    expect(count).toEqual(4 * 4)
  })
})
