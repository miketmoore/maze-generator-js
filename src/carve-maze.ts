import { gridFactory, IGrid } from './grid'
import { ICell } from './cell'
import { randInRange } from './rand'
import { Direction } from './direction'
import { ICoord } from './coord'

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

const getOppositeDirection: (direction: Direction) => Direction = direction => {
  if (direction === 'north') {
    return 'south'
  } else if (direction === 'east') {
    return 'west'
  } else if (direction === 'south') {
    return 'north'
  }
  return 'east'
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
  cell.carveWall(availableWall)
  cell.markVisited()

  const adjacentCoord = carveableGrid.getAdjacentCoord(availableWall, coord)
  if (adjacentCoord) {
    const adjacentCell = carveableGrid.getAdjacentCell(availableWall, coord)
    if (adjacentCell) {
      if (!adjacentCell.isVisited()) {
        const oppDir = getOppositeDirection(availableWall)
        adjacentCell.carveWall(oppDir)
        adjacentCell.markVisited()
        history.push(adjacentCoord)

        carveRecursiveBacktracking(carveableGrid, history)
      }
    }
  }
}

function carveIterative(grid: IGrid): void {
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
      cell.carveWall(availableWall)
      cell.markVisited()

      const adjacentCoord = grid.getAdjacentCoord(availableWall, coord)
      if (adjacentCoord) {
        const adjacentCell = grid.getCell(adjacentCoord)
        if (adjacentCell && !adjacentCell.isVisited()) {
          const oppDir = getOppositeDirection(availableWall)
          adjacentCell.carveWall(oppDir)
          adjacentCell.markVisited()
          history.push(adjacentCoord)
        }
      }
    }
  }
}
