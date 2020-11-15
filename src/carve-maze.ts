import { IGrid } from './grid'
import { randInRange } from './rand'
import { Direction } from './direction'
import { ICoord } from './coord'

export type Strategy = 'recursive-backtracking' | 'iterative'

export function carveMaze(
  grid: IGrid,
  strategy: Strategy = 'recursive-backtracking'
) {
  switch (strategy) {
    case 'recursive-backtracking':
      const coord = grid.getRandCoord()
      carveRecursiveBacktracking(grid, [coord])
    case 'iterative':
      carveIterative(grid)
  }
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

function carveRecursiveBacktracking(grid: IGrid, history: ICoord[]): void {
  const coord = history[history.length - 1]
  const cell = grid.getCell(coord)
  if (!cell) {
    throw new Error('could not find cell')
  }

  // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
  const walls = grid.getAvailableCellWalls(cell, coord)

  if (walls.length === 0) {
    if (history.length >= 2) {
      history.pop()
      carveRecursiveBacktracking(grid, history)
      return
    }
    return
  }

  const wallIndex = randInRange(0, walls.length)
  const wall = walls[wallIndex]
  wall.carve()
  cell.markVisited()

  const adjacentCoord = grid.getAdjacentCoord(wall.getDirection(), coord)
  if (adjacentCoord) {
    const adjacentCell = grid.getCell(adjacentCoord)
    if (adjacentCell) {
      if (!adjacentCell.isVisited()) {
        const oppDir = getOppositeDirection(wall.getDirection())
        adjacentCell.getWalls()[oppDir].carve()
        adjacentCell.markVisited()

        history.push(adjacentCoord)

        carveRecursiveBacktracking(grid, history)
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
    const walls = grid.getAvailableCellWalls(cell, coord)

    if (walls.length === 0) {
      if (history.length >= 2) {
        history.pop()
      } else {
        running = false
      }
    } else {
      const wallIndex = randInRange(0, walls.length)
      const wall = walls[wallIndex]
      wall.carve()
      cell.markVisited()

      const adjacentCoord = grid.getAdjacentCoord(wall.getDirection(), coord)
      if (adjacentCoord) {
        const adjacentCell = grid.getCell(adjacentCoord)
        if (adjacentCell && !adjacentCell.isVisited()) {
          const oppDir = getOppositeDirection(wall.getDirection())
          adjacentCell.getWalls()[oppDir].carve()
          adjacentCell.markVisited()
          history.push(adjacentCoord)
        }
      }
    }
  }
}
