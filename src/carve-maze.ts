import { gridFactory, IGrid } from './grid'
import { randInRange } from './rand'
import { ICoord } from './coord'
import { carveIterative } from './carve-iterative'

export type Strategy = 'recursive-backtracking' | 'iterative'

export function carveMaze(
  rows: number,
  columns: number,
  strategy: Strategy = 'recursive-backtracking'
) {
  const grid = gridFactory(rows, columns)
  switch (strategy) {
    case 'recursive-backtracking':
      const coord = grid.getRandCoord()
      carveRecursiveBacktracking(grid, [coord])
    case 'iterative':
      carveIterative(grid)
  }
  return grid
}

function carveRecursiveBacktracking(
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
      carveRecursiveBacktracking(carveableGrid, history)
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

        carveRecursiveBacktracking(carveableGrid, history)
      }
    }
  }
}
