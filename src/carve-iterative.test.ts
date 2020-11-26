import { carveIterative } from './carve-iterative'
import { gridFactory } from './grid'

describe('carveIterative', () => {
  test('all cells should be carved', () => {
    const grid = gridFactory(4, 4)
    carveIterative(grid)
    let count = 0
    grid.forEachRow(row => {
      row.forEach(cell => {
        if (Object.values(cell.getWalls()).some(v => v === false)) {
          count++
        }
      })
    })
    expect(count).toEqual(4 * 4)
  })
})
