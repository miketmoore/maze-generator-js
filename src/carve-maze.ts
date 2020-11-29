import { IGrid } from './grid'
import { ICell } from './cell'
import { carveGridFactory, ICarveableGrid } from './carveable-grid'
import { randInRange } from './rand'
import { Direction } from './direction'
import { ICoord } from './coord'

export type Strategy = 'recursive-backtracking' | 'iterative'

export function carveMaze(
  grid: IGrid,
  strategy: Strategy = 'recursive-backtracking'
) {
  const carveableGrid = carveGridFactory(grid)
  switch (strategy) {
    case 'recursive-backtracking':
      const coord = grid.getRandCoord()
      carveRecursiveBacktracking(carveableGrid, [coord])
    case 'iterative':
      carveIterative(carveableGrid)
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

function carveRecursiveBacktracking(
  carveableGrid: ICarveableGrid,
  history: ICoord[]
): void {
  const coord = history[history.length - 1]
  const cell = carveableGrid.getCell(coord)
  if (!cell) {
    throw new Error('cell not found for coord')
  }

  // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
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
  // cell.carveWall(availableWall.direction)
  carveableGrid.carveWall(coord, availableWall.direction)

  const adjacentCoord = carveableGrid.getAdjacentCoord(
    availableWall.direction,
    coord
  )
  if (adjacentCoord) {
    const adjacentCell = carveableGrid.getCell(adjacentCoord)
    if (!adjacentCell) {
      throw new Error('adjacent cell not found for coord')
    }
    if (!adjacentCell.isVisited()) {
      const oppDir = getOppositeDirection(availableWall.direction)
      // adjacentCell.carveWall(oppDir)
      carveableGrid.carveWall(adjacentCoord, oppDir)
      history.push(adjacentCoord)

      carveRecursiveBacktracking(carveableGrid, history)
    }
  }
}

function carveIterative(grid: ICarveableGrid): void {
  const coord = grid.getGrid().getRandCoord()
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
        const backtrackedCoord = history.pop()
        if (!backtrackedCoord) {
          throw new Error('backtracked coord not found')
        }
      } else {
        running = false
      }
    } else {
      const wallIndex = randInRange(0, availableWalls.length)
      const availableWall = availableWalls[wallIndex]
      // cell.carveWall(availableWall.direction)
      grid.carveWall(coord, availableWall.direction)

      const adjacentCoord = grid.getAdjacentCoord(
        availableWall.direction,
        coord
      )
      // const adjacentCell = grid.getAdjacentCell(availableWall.direction, coord)
      if (adjacentCoord) {
        const adjacentCell = grid.getCell(adjacentCoord)
        if (adjacentCell && !adjacentCell.isVisited()) {
          const oppDir = getOppositeDirection(availableWall.direction)
          // adjacentCell.carveWall(oppDir)
          grid.carveWall(adjacentCoord, oppDir)
          history.push(adjacentCoord)
        }
      }
    }
  }
}
