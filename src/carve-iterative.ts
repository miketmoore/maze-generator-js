import { IGrid } from './grid'
import { randInRange } from './rand'

export function carveIterative(grid: IGrid): void {
  const coord = grid.getRandCoord()
  const history = [coord]

  let running = true
  while (running) {
    const coord = history[history.length - 1]
    const cell = grid.getCell(coord)
    if (!cell) {
      throw new Error('cell not found')
    }

    // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
    const availableWalls = grid.getAvailableCellWalls(cell, coord)

    if (availableWalls.length === 0) {
      if (history.length >= 2) {
        history.pop()
      } else {
        running = false
      }
    } else {
      const wallIndex = randInRange(0, availableWalls.length)
      const availableWall = availableWalls[wallIndex]
      grid.carveCellWall(coord, availableWall)

      const adjacentCoord = grid.getAdjacentCoord(availableWall, coord)
      if (adjacentCoord) {
        const adjacentCell = grid.getCell(adjacentCoord)
        if (adjacentCell && !adjacentCell.isVisited()) {
          const oppDir = adjacentCell.getOppositeDirection(availableWall)
          grid.carveCellWall(adjacentCoord, oppDir)
          history.push(adjacentCoord)
        }
      }
    }
  }
}
