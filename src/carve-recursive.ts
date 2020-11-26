import { IGrid } from './grid'
import { randInRange } from './rand'
import { ICoord } from './coord'

export function carveRecursiveBacktracking(grid: IGrid) {
  const coord = grid.getRandCoord()
  _carveRecursiveBacktracking(grid, [coord])
}

function _carveRecursiveBacktracking(
  carveableGrid: IGrid,
  history: ICoord[]
): void {
  const coord = history[history.length - 1]

  // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
  const cell = carveableGrid.getCell(coord)
  if (!cell) {
    throw new Error('cell not found')
  }
  const availableWalls = carveableGrid.getAvailableCellWalls(cell, coord)

  if (availableWalls.length === 0) {
    if (history.length >= 2) {
      history.pop()
      _carveRecursiveBacktracking(carveableGrid, history)
      return
    }
    return
  }

  const wallIndex = randInRange(0, availableWalls.length)
  const availableWall = availableWalls[wallIndex]
  carveableGrid.carveCellWall(coord, availableWall)

  const adjacentCoord = carveableGrid.getAdjacentCoord(availableWall, coord)
  if (adjacentCoord) {
    const adjacentCell = carveableGrid.getAdjacentCell(availableWall, coord)
    if (adjacentCell) {
      if (!adjacentCell.isVisited()) {
        const oppDir = adjacentCell.getOppositeDirection(availableWall)
        carveableGrid.carveCellWall(adjacentCoord, oppDir)
        // adjacentCell.carveWall(oppDir)
        // adjacentCell.markVisited()
        history.push(adjacentCoord)

        _carveRecursiveBacktracking(carveableGrid, history)
      }
    }
  }
}
